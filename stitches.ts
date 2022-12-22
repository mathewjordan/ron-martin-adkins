import { createStitches } from "@stitches/react";
import {
  colors,
  fontSizes,
  fonts,
  media,
  sizes,
  transitions,
} from "./styles/theme";

export const theme = {
  colors: { ...colors },
  fontSizes: { ...fontSizes },
  fonts: { ...fonts },
  sizes: { ...sizes },
  space: { ...sizes },
  transitions: { ...transitions },
};

export const { styled, css, keyframes, createTheme } = createStitches({
  media,
  theme,
});
