import { DARK_ACCENT, LIGHT_ACCENT, YELLOW } from "../style";

export const singular = str => {
  if (!str) return str;
  if (str.charAt(str.length - 1) !== "s") return str;
  if (str.charAt(str.length - 2) === "e")
    return str.substring(0, str.length - 2);
  return str.substring(0, str.length - 1);
};

export const postTypeFromPath = (path, opts = {}) => {
  const matches = path.match(/src\/pages\/([^\/]+)/);
  return opts.plural ? matches && matches[1] : singular(matches && matches[1]);
};

export const postTypeColors = {
  project: DARK_ACCENT,
  post: LIGHT_ACCENT,
  featured: YELLOW
};
