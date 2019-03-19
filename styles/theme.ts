export const colors = {
  // Colors
  white: "#FFFFFF",
  liteGrey: "#F9F9F9",
  blue: "#0082df",

  // Text
  liteText: "#CCCCCC",
  text: "#8A8A8A",
  darkText: "#3D4B50",

  // Border
  border: "#EDEDED",

  // Status
  success: "#2AD955",
  warn: "#FFBB00",
  error: "#FF6D26",
};

export const fonts = {
  base:
    '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
};

export const sizes: { [key: string]: number } = {
  xlarge: 1280,
  large: 1024,
  medium: 768,
  small: 568,
};

export interface StyledTheme {
  colors: { [key in keyof typeof colors]: string };
  fonts: { [key in keyof typeof fonts]: string };
  sizes: { [key in keyof typeof sizes]: number };
}

const theme: StyledTheme = {
  colors,
  fonts,
  sizes,
};

export default theme;
