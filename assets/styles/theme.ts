import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

// Scale font size dynamically based on screen width
const scaleFont = (size: number) => (width / 375) * size;

export const COLORS = {
  primary: "#53B175",
  facebook: "#4A66AC",
  google: "#5383EC",
  textDark: "#181725",
  dark: "#030303",
  textGray: "#7C7C7C",
  gray: "#828282",
  light: "#FCFCFC",
  textLight: "#777",
  border: "#ddd",
  background: "#f9f9f9",
  bright: "#FFFFFF",
};

export const FONTS = {
  bold: "Gilroy-Bold",
  semiBold: "Gilroy-SemiBold",
  medium: "Gilroy-Medium",
  regular: "Gilroy-Regular",
  normal: "Gilroy",
};

export const SIZES = {
  big: scaleFont(48),
  h1: scaleFont(26),
  h2: scaleFont(20),
  h3: scaleFont(18),
  body: scaleFont(16),
  small: scaleFont(14),
};