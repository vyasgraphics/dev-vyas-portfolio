import { claimsRows } from "@/data/claimsAnalysis";

export function ClaimsTable() {
  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <h4 style={{ fontSize: "22px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>Design Rationale: Claims Analysis</h4>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", maxWidth: "520px", margin: "0 auto" }}>
          Evaluating the psychological trade-offs of our key features (Method: Carroll &amp; Rosson).
        </p>
      </div>

      <div style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", overflow: "hidden", background: "rgba(255,255,255,0.02)" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                {["Feature", "Current User Practice", "Claim (+) Positive Consequence", "Claim (\u2212) Negative Consequence"].map((h, i) => (
                  <th
                    key={h}
                    style={{
                      padding: "16px 14px", fontWeight: 700, fontSize: "10.5px", letterSpacing: "0.05em", textTransform: "uppercase",
                      textAlign: "left", color: i === 2 ? "#34d399" : i === 3 ? "#f87171" : "rgba(255,255,255,0.45)",
                      width: i === 0 ? "18%" : i === 1 ? "24%" : "29%",
                      whiteSpace: i === 0 ? "nowrap" : undefined,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {claimsRows.map((row, i) => (
                <tr key={row.feature} style={{ borderTop: i > 0 ? "1px solid rgba(255,255,255,0.06)" : undefined }}>
                  <td style={{ padding: "16px 14px", fontWeight: 700, color: "#fff", verticalAlign: "top", whiteSpace: "nowrap" }}>{row.feature}</td>
                  <td style={{ padding: "16px 14px", color: "rgba(255,255,255,0.65)", lineHeight: 1.55, verticalAlign: "top" }}>{row.practice}</td>
                  <td style={{ padding: "16px 14px", verticalAlign: "top" }}>
                    <strong style={{ color: "#34d399", display: "block", marginBottom: "4px" }}>{row.positiveTitle}</strong>
                    <span style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.55 }}>{row.positiveText}</span>
                  </td>
                  <td style={{ padding: "16px 14px", verticalAlign: "top" }}>
                    <strong style={{ color: "#f87171", display: "block", marginBottom: "4px" }}>{row.negativeTitle}</strong>
                    <span style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.55 }}>{row.negativeText}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
