"use client";

import { useEffect, useRef } from "react";

// Animated GLSL "hills" - a 256x256 plane displaced in the vertex shader by
// layered Perlin noise, drifting toward the camera, rendered translucent so
// it reads as mist rather than terrain.
//
// Written against raw WebGL rather than three.js on purpose. The reference
// this came from is a three.js sketch, but everything it actually used from
// the library is a PerspectiveCamera, a PlaneGeometry and a RawShaderMaterial
// - i.e. two matrices, a vertex buffer and a shader program, all of which are
// ~120 lines by hand. Pulling three.js in for that would have added roughly
// 120KB gzipped to the homepage bundle for a decorative background, on a site
// whose whole first impression is how quickly it loads. The shader itself is
// unchanged from the reference apart from the fragment colour (see below).
//
// The geometry is generated in three.js's exact PlaneGeometry vertex/index
// order (first row nearest the camera, ending furthest away). That ordering is
// load-bearing, not incidental: the mesh is alpha-blended with depth writes
// on, so the order triangles are submitted in decides what blends over what.
// Generating the rows the other way round produces a visibly different, murkier
// image even though the geometry is identical.

type Props = {
    className?: string;
    /** Camera distance from the origin along +Z. */
    cameraZ?: number;
    /** How fast the terrain drifts. 1 = the reference's own speed. */
    speed?: number;
};

const PLANE_SIZE = 256;
const SEGMENTS = 256;

const VERTEX_SHADER = `
attribute vec3 position;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform float time;
varying vec3 vPosition;

mat4 rotateMatrixX(float radian) {
  return mat4(
    1.0, 0.0, 0.0, 0.0,
    0.0, cos(radian), -sin(radian), 0.0,
    0.0, sin(radian), cos(radian), 0.0,
    0.0, 0.0, 0.0, 1.0
  );
}

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec3 fade(vec3 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

float cnoise(vec3 P) {
  vec3 Pi0 = floor(P);
  vec3 Pi1 = Pi0 + vec3(1.0);
  Pi0 = mod289(Pi0);
  Pi1 = mod289(Pi1);
  vec3 Pf0 = fract(P);
  vec3 Pf1 = Pf0 - vec3(1.0);
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 * (1.0 / 7.0);
  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 * (1.0 / 7.0);
  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
  return 2.2 * n_xyz;
}

void main(void) {
  vec3 updatePosition = (rotateMatrixX(radians(90.0)) * vec4(position, 1.0)).xyz;
  float sin1 = sin(radians(updatePosition.x / 128.0 * 90.0));
  vec3 noisePosition = updatePosition + vec3(0.0, 0.0, time * -30.0);
  float noise1 = cnoise(noisePosition * 0.08);
  float noise2 = cnoise(noisePosition * 0.06);
  float noise3 = cnoise(noisePosition * 0.4);
  vec3 lastPosition = updatePosition + vec3(0.0,
    noise1 * sin1 * 8.0
    + noise2 * sin1 * 8.0
    + noise3 * (abs(sin1) * 2.0 + 0.5)
    + pow(sin1, 2.0) * 40.0, 0.0);

  vPosition = lastPosition;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(lastPosition, 1.0);
}
`;

// The only real departure from the reference, which shaded the whole mesh a
// flat vec3(0.6) grey. Here the valley floor stays a cool near-neutral and the
// slopes rising out of it pick up --primary (#00DE51 = 0.0, 0.871, 0.318), so
// the mesh belongs to this site's palette instead of looking like a pasted-in
// demo. Deliberately height-driven rather than uniform: the copy sits over the
// middle of the frame, which is the flat part of the terrain, so the green
// lands in the left/right thirds and leaves the text on a quiet background.
const FRAGMENT_SHADER = `
precision highp float;
varying vec3 vPosition;

void main(void) {
  float opacity = (96.0 - length(vPosition)) / 256.0 * 0.6;
  float ridge = smoothstep(1.0, 20.0, vPosition.y);
  vec3 valley = vec3(0.34, 0.38, 0.36);
  vec3 crest = vec3(0.0, 0.871, 0.318);
  vec3 color = mix(valley, crest, ridge * 0.72);
  gl_FragColor = vec4(color, opacity);
}
`;

function perspective(out: Float32Array, fovyRad: number, aspect: number, near: number, far: number) {
    const f = 1 / Math.tan(fovyRad / 2);
    out.fill(0);
    out[0] = f / aspect;
    out[5] = f;
    out[10] = (far + near) / (near - far);
    out[11] = -1;
    out[14] = (2 * far * near) / (near - far);
}

function lookAt(
    out: Float32Array,
    eye: readonly [number, number, number],
    center: readonly [number, number, number],
    up: readonly [number, number, number]
) {
    let z0 = eye[0] - center[0];
    let z1 = eye[1] - center[1];
    let z2 = eye[2] - center[2];
    let len = Math.hypot(z0, z1, z2);
    z0 /= len; z1 /= len; z2 /= len;

    let x0 = up[1] * z2 - up[2] * z1;
    let x1 = up[2] * z0 - up[0] * z2;
    let x2 = up[0] * z1 - up[1] * z0;
    len = Math.hypot(x0, x1, x2);
    if (len === 0) { x0 = 0; x1 = 0; x2 = 0; } else { x0 /= len; x1 /= len; x2 /= len; }

    // z and x are orthonormal, so their cross product is already unit length.
    const y0 = z1 * x2 - z2 * x1;
    const y1 = z2 * x0 - z0 * x2;
    const y2 = z0 * x1 - z1 * x0;

    out[0] = x0; out[1] = y0; out[2] = z0; out[3] = 0;
    out[4] = x1; out[5] = y1; out[6] = z1; out[7] = 0;
    out[8] = x2; out[9] = y2; out[10] = z2; out[11] = 0;
    out[12] = -(x0 * eye[0] + x1 * eye[1] + x2 * eye[2]);
    out[13] = -(y0 * eye[0] + y1 * eye[1] + y2 * eye[2]);
    out[14] = -(z0 * eye[0] + z1 * eye[1] + z2 * eye[2]);
    out[15] = 1;
}

function compile(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("GlslHills shader failed to compile:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

export function GlslHills({ className, cameraZ = 125, speed = 0.5 }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // WebGL2 first purely for 32-bit indices: the plane has 257x257 =
        // 66,049 vertices, past what a Uint16 index buffer can address. WebGL1
        // can do it too via OES_element_index_uint, hence the fallback. The
        // shaders stay GLSL ES 1.00 either way - a WebGL2 context compiles
        // those unchanged as long as there is no "#version 300 es" line.
        const gl = (canvas.getContext("webgl2", { alpha: true, antialias: false }) ||
            canvas.getContext("webgl", { alpha: true, antialias: false })) as
            (WebGL2RenderingContext | WebGLRenderingContext | null);

        if (!gl) return;
        const isWebGL2 = typeof WebGL2RenderingContext !== "undefined" && gl instanceof WebGL2RenderingContext;
        if (!isWebGL2 && !gl.getExtension("OES_element_index_uint")) return;

        const vs = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
        const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
        if (!vs || !fs) return;

        const program = gl.createProgram();
        if (!program) return;
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error("GlslHills program failed to link:", gl.getProgramInfoLog(program));
            return;
        }
        gl.useProgram(program);

        // Geometry, in three.js PlaneGeometry order - see the note at the top
        // of this file for why the row order matters.
        const g = SEGMENTS + 1;
        const half = PLANE_SIZE / 2;
        const step = PLANE_SIZE / SEGMENTS;
        const positions = new Float32Array(g * g * 3);
        let p = 0;
        for (let iy = 0; iy < g; iy++) {
            const y = iy * step - half;
            for (let ix = 0; ix < g; ix++) {
                positions[p++] = ix * step - half;
                positions[p++] = -y;
                positions[p++] = 0;
            }
        }
        const indices = new Uint32Array(SEGMENTS * SEGMENTS * 6);
        let i = 0;
        for (let iy = 0; iy < SEGMENTS; iy++) {
            for (let ix = 0; ix < SEGMENTS; ix++) {
                const a = ix + g * iy;
                const b = ix + g * (iy + 1);
                const c = ix + 1 + g * (iy + 1);
                const d = ix + 1 + g * iy;
                indices[i++] = a; indices[i++] = b; indices[i++] = d;
                indices[i++] = b; indices[i++] = c; indices[i++] = d;
            }
        }

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
        const positionLoc = gl.getAttribLocation(program, "position");
        gl.enableVertexAttribArray(positionLoc);
        gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);

        const indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

        const projectionLoc = gl.getUniformLocation(program, "projectionMatrix");
        const modelViewLoc = gl.getUniformLocation(program, "modelViewMatrix");
        const timeLoc = gl.getUniformLocation(program, "time");

        const projectionMatrix = new Float32Array(16);
        const modelViewMatrix = new Float32Array(16);

        gl.clearColor(0, 0, 0, 0);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        const resize = () => {
            // The reference rendered at a flat DPR of 1. Retina displays make
            // that visibly soft, but the mesh is heavily overdrawn translucent
            // geometry so fill rate is the real cost - 1.5 is the compromise,
            // and phones stay at 1 where the pixel budget is tightest.
            const cap = window.innerWidth < 768 ? 1 : 1.5;
            const dpr = Math.min(window.devicePixelRatio || 1, cap);
            const w = canvas.clientWidth || window.innerWidth;
            const h = canvas.clientHeight || window.innerHeight;
            canvas.width = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
            gl.viewport(0, 0, canvas.width, canvas.height);

            const aspect = w / h;
            perspective(projectionMatrix, (45 * Math.PI) / 180, aspect, 1, 10000);
            gl.uniformMatrix4fv(projectionLoc, false, projectionMatrix);

            // The camera pulls back on narrow viewports. A fixed 45deg
            // vertical field of view frames far less of the terrain's WIDTH
            // as the aspect ratio drops, and width is where the interesting
            // part is: the displacement is scaled by sin(x), so the raised,
            // green-lit ridges only exist out towards the left and right
            // edges of the plane. At a phone's aspect the reference's own
            // camera distance framed nothing but the flat centre line, which
            // is why it read as grey haze there rather than as hills.
            // Distance costs nothing here, unusually - the fragment shader
            // fades on length(vPosition), the distance from the world
            // ORIGIN, so moving the camera reframes the scene without
            // fading any of it.
            // Clamped at 1 on the low side so this only ever pulls BACK, and
            // only once the viewport is taller than it is wide: every desktop
            // and tablet aspect lands on the clamp and gets the reference's
            // own framing, untouched.
            const distance = cameraZ * Math.min(1.6, Math.max(1, 1 / aspect));

            // Pulling back alone would also flatten the camera's pitch, which
            // walks the horizon up into the middle of the screen and leaves
            // the terrain floating as a band with empty black above AND
            // below it. Holding the reference's rise-over-run constant as the
            // distance changes keeps the horizon at the same height on screen
            // at every aspect ratio, so the only thing that varies is how
            // much width is in frame. At distance === cameraZ this resolves
            // to exactly the reference's own [0,16,125] -> [0,28,0].
            const pitch = (28 - 16) / cameraZ;
            lookAt(modelViewMatrix, [0, 16, distance], [0, 16 + pitch * distance, 0], [0, 1, 0]);
            gl.uniformMatrix4fv(modelViewLoc, false, modelViewMatrix);
        };
        resize();

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        let time = 0;
        let last = 0;
        let frame = 0;
        // Rendering is gated on the canvas actually being on screen. Without
        // this the mesh keeps burning GPU for the entire rest of the page,
        // which on a long single-page portfolio is most of the visit.
        let visible = true;
        let running = false;

        const draw = () => {
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            gl.uniform1f(timeLoc, time);
            gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_INT, 0);
        };

        const loop = (now: number) => {
            const delta = last ? (now - last) / 1000 : 0;
            last = now;
            // A backgrounded tab or a long main-thread block can hand back a
            // huge delta on the next frame, which would jump the terrain.
            time += Math.min(delta, 0.1) * speed;
            draw();
            frame = requestAnimationFrame(loop);
        };

        const start = () => {
            if (running || reduceMotion) return;
            running = true;
            last = 0;
            frame = requestAnimationFrame(loop);
        };
        const stop = () => {
            if (!running) return;
            running = false;
            cancelAnimationFrame(frame);
        };

        if (reduceMotion) {
            // One static frame: the terrain is still there as an image, it
            // just never moves.
            draw();
        } else {
            start();
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                visible = entry.isIntersecting;
                if (visible && !document.hidden) start();
                else stop();
            },
            { threshold: 0 }
        );
        observer.observe(canvas);

        const onVisibilityChange = () => {
            if (document.hidden) stop();
            else if (visible) start();
        };
        document.addEventListener("visibilitychange", onVisibilityChange);

        const onResize = () => {
            resize();
            if (reduceMotion) draw();
        };
        window.addEventListener("resize", onResize);

        // A lost context (GPU reset, driver hiccup, too many live contexts)
        // otherwise leaves a frozen canvas and a console full of errors.
        const onContextLost = (e: Event) => {
            e.preventDefault();
            stop();
        };
        canvas.addEventListener("webglcontextlost", onContextLost);

        return () => {
            stop();
            observer.disconnect();
            document.removeEventListener("visibilitychange", onVisibilityChange);
            window.removeEventListener("resize", onResize);
            canvas.removeEventListener("webglcontextlost", onContextLost);
            gl.deleteBuffer(positionBuffer);
            gl.deleteBuffer(indexBuffer);
            gl.deleteProgram(program);
            gl.deleteShader(vs);
            gl.deleteShader(fs);
        };
    }, [cameraZ, speed]);

    return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
