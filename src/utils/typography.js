import Typography from "typography";
import { TEXT_COLOR, LIGHT_SHADE } from "../style";

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
    body: { backgroundColor: LIGHT_SHADE },
    "h1,h2,h3,h4,h5,h6": { letterSpacing: "1px" },
    a: { textDecoration: "none", color: TEXT_COLOR },
    "a:hover": { textDecoration: "underline" }
  })
});

export default typography;
