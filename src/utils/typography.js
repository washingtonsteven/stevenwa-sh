import Typography from "typography";

const typography = new Typography({
  baseFontSize: "18px",
  baseLineHeight: 1.4,
  googleFonts: [
    {
      name: "PT Sans",
      styles: ["regular", "bold"]
    },
    {
      name: "Lato",
      styles: ["regular"]
    }
  ],
  headerFontFamily: ["PT Sans", "sans-serif"],
  headerWeight: "normal",
  bodyFontFamily: ["Lato", "sans-serif"],
  includeNormalize: true
});

export default typography;
