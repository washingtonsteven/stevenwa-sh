import Typography from "typography";
import { TEXT_COLOR, LIGHT_ACCENT } from "../style";

const typography = new Typography({
  baseFontSize: "16px",
  baseLineHeight: 1.75,
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
    body: { backgroundColor: LIGHT_ACCENT, boxSizing: "border-box" },
    "h1,h2,h3,h4,h5,h6": { letterSpacing: "1px", fontWeight: "400" },
    a: { color: TEXT_COLOR },
    "a:hover": { textDecoration: "underline" },
    "body *": { boxSizing: "inherit" }
  })
});

const { rhythm, scale } = typography;

export { rhythm, scale, typography as default };
