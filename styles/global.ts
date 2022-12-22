import { globalCss } from "@stitches/react";

const defaults = {
  body: {
    margin: 0,
    padding: 0,
    backgroundColor: "$grass1",
    color: "$sage12",
  },

  html: {
    fontSize: "19px",
    fontSmooth: "always",
    webKitFontSmothing: "antialiased",
    mozOsxFontSmoth: "grayscale",
  },

  "a, a:visited": {
    color: "$grass12",
    textDecoration: "none",
  },
};

const globalStyles = globalCss({
  ...defaults,
});

export default globalStyles;
