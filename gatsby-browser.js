export const onClientEntry = async () => {
  if (
    typeof window !== "null" &&
    typeof window.IntersectionObserver === "undefined"
  ) {
    require("intersection-observer");
  }
};
