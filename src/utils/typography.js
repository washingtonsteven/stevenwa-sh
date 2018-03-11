import Typography from "typography";

const typography = new Typography({
  baseFontSize: "18px",
  baseLineHeight: 1.4,
  googleFonts: [
    {
      name: "Open Sans",
      styles: ["regular", "bold"]
    },
    {
      name: "Lato",
      styles: ["regular", "bold", "900"]
    }
  ],
  headerFontFamily: ["Lato", "sans-serif"],
  headerWeight: "900",
  bodyFontFamily: ["Open Sans", "sans-serif"],
  includeNormalize: true,
  overrideStyles: ({ rhythm }, options, styles) => ({
    "h1,h2,h3,h4,h5,h6": { letterSpacing: "1px" }
  })
});

export default typography;
