export type ColorSwatch = {
  label: string;
  mode: "light" | "dark";
  className: string;
  bodyClass: string;
};

export const colorSwatches: ColorSwatch[] = [
  {
      label: "Default",
      mode: "light",
      className: "type-body-default",
      bodyClass: "body-default",
  },
  {
      label: "Silver Dawn",
      mode: "light",
      className: "type-body-v1",
      bodyClass: "body-v1",
  },
  {
      label: "Lavender Stone",
      mode: "light",
      className: "type-body-v2",
      bodyClass: "body-v2",
  },
  {
      label: "Ocean Breeze",
      mode: "light",
      className: "type-body-v3",
      bodyClass: "body-v3",
  },
  {
      label: "Midnight Fade",
      mode: "dark",
      className: "type-dark-v1",
      bodyClass: "dark-v1",
  },
  {
      label: "Charcoal Mist",
      mode: "dark",
      className: "type-dark-v2",
      bodyClass: "dark-v2",
  },
  {
      label: "Forest Shadow",
      mode: "dark",
      className: "type-dark-v3",
      bodyClass: "dark-v3",
  },
];