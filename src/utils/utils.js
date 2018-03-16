export const singular = str => {
  if (!str) return str;
  if (str.charAt(str.length - 1) !== "s") return str;
  if (str.charAt(str.length - 2) === "e")
    return str.substring(0, str.length - 2);
  return str.substring(0, str.length - 1);
};

export const postTypeFromPath = (path, opts) => {
  const matches = path.match(/src\/pages\/([^\/]+)/);
  return singular(matches && matches[1]);
};
