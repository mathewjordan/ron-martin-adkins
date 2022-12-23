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
  width: "100%",
  height: "100%",
  maxWidth: "100%",
  position: "fixed",
  top: "0",
  zIndex: "0",
});

const PhotoImage = styled(Image, {
  boxShadow: "8px 8px 200px #fff3",
  borderRadius: "5px",
  objectFit: "cover",
});

const Underlay = styled("div", {
  background: "linear-gradient(180deg, #fff 0,  #fffc 38.2%, #fff0 100%);",
  width: "100%",
  height: "300px",
  position: "fixed",
  top: "0",
  left: "0",
});

export { PhotoBackdrop, PhotoImage, PhotoImageWrapper, Underlay };
