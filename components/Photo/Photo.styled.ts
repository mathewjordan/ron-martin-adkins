import Image from "next/image";
import { styled } from "../../stitches";

const PhotoBackdrop = styled("div", {
  width: "100%",
  height: "100%",
  position: "fixed",
  top: "0",
  left: "0",
  zIndex: "-1",
  opacity: "0.5",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
});

const PhotoImageWrapper = styled("div", {
  width: "600px",
  height: "600px",
  maxWidth: "100%",
  position: "relative",
  margin: "3rem auto",
  zIndex: "1",
});

const PhotoImage = styled(Image, {
  boxShadow: "8px 8px 200px #fff3",
  borderRadius: "5px",
  objectFit: "cover",
});

const Underlay = styled("div", {
  background: "linear-gradient(0deg, #fff 0%, #fff0 100%);",
  width: "100%",
  height: "61.8vh",
  position: "fixed",
  bottom: "0",
  left: "0",
});

export { PhotoBackdrop, PhotoImage, PhotoImageWrapper, Underlay };
