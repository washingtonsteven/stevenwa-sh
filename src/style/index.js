export const LIGHT_SHADE = `#efeef1`;
export const BG_COLOR = LIGHT_SHADE;
export const TEXT_COLOR = `#333`;
export const LIGHT_ACCENT = `#6dacdd`;
export const BLOG_COLOR = LIGHT_ACCENT;
export const MAIN_COLOR = `#4e83b4`;
export const PROJECT_COLOR = MAIN_COLOR;
export const DARK_ACCENT = `#a53bcc`;
export const DARK_SHADE = `#302e4d`;

export const border_gradient = dir =>
  `linear-gradient(to ${dir}, ${LIGHT_ACCENT}, ${DARK_ACCENT})`;
export const BORDER_GRADIENT = border_gradient("bottom");

export const box_shadow = ({ x = 0, y = 4, b = 6 } = {}) =>
  `${x}px ${y}px ${b}px rgba(0,0,0,0.2)`;
export const BOX_SHADOW = box_shadow();

export const transition = prop => `${prop} 0.2s linear`;
export const TRANSITION_ALL = transition("all");

export const TEXT_FONT = `Lato, sans-serif`;
export const HEADER_FONT = `'PT Sans', sans-serif`;
export const STYLE_FONT = ``;

export const MAX_WIDTH = `768px`;
