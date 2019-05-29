export const onClientEntry = async () => {
  if (
    typeof window !== "undefined" &&
    typeof window.IntersectionObserver === "undefined"
  ) {
    require("intersection-observer");
  }
};
