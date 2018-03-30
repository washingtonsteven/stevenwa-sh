export const LIGHT_SHADE = `#efeef1`;
export const BG_COLOR = LIGHT_SHADE;
export const TEXT_COLOR = `#333`;
export const LIGHT_ACCENT = `#6dacdd`;
export const BLOG_COLOR = LIGHT_ACCENT;
export const MAIN_COLOR = `#4e83b4`;
export const PROJECT_COLOR = MAIN_COLOR;
export const DARK_ACCENT = `#af7dc1`; //`#a53bcc`;
export const DARK_SHADE = `#302e4d`;

export const YELLOW = `#ffb700`;

export const SOCIAL_ICON_GRAY = `#98a2ac`;
export const TWITTER_BLUE = `#1da1f2`;
export const GITHUB_BLACK = `#191717`;

export const border_gradient = dir =>
  `linear-gradient(to ${dir}, ${DARK_ACCENT}, ${LIGHT_ACCENT})`;
export const BORDER_GRADIENT = border_gradient("bottom");

export const box_shadow = ({
  x = 0,
  y = 3,
  b = 6,
  c = "rgba(0,0,0,0.12)"
} = {}) => `${x}px ${y}px ${b}px ${c}, ${x}px ${y}px ${b - 2}px ${c}`;
export const BOX_SHADOW = box_shadow();

export const transition = prop => `${prop} 0.2s linear`;
export const TRANSITION_ALL = transition("all");

export const TEXT_FONT = `Lato, sans-serif`;
export const HEADER_FONT = `'PT Sans', sans-serif`;
export const STYLE_FONT = ``;

export const MAX_WIDTH = `1024px`;
export const MOBILE_WIDTH = `768px`;
