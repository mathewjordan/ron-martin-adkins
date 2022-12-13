import React, { useEffect, useState } from "react";
import OpenSeadragon from "openseadragon";
import { styled } from "@stitches/react";
import { getInfoResponse } from "../services/iiif";
import { v4 as uuidv4 } from "uuid";

const PanZoom = ({ uri }: { uri: string }) => {
  const [osdUri, setOsdUri] = useState<string>();
  const [instance, setInstance] = useState<string>();

  useEffect(() => {
    setInstance(uuidv4());
    if (uri !== osdUri) setOsdUri(uri);
  }, [uri, osdUri]);

  useEffect(() => {
    if (osdUri)
      getInfoResponse(osdUri).then((tileSource) =>
        OpenSeadragon({
          id: `openseadragon-viewport`,
        }).addTiledImage({
          tileSource: tileSource,
        })
      );
  }, [osdUri]);

  return (
    <Wrapper>
      <Viewport id={`openseadragon-viewport`} key={instance} />
    </Wrapper>
  );
};

const Viewport = styled("div", {
  width: "100%",
  height: "100%",
  zIndex: "0",
});

const Wrapper = styled("div", {
  width: "100%",
  height: "100vh",
  background: "transparent",
  position: "absolute",
  top: "0",
  left: "0",
});

export default PanZoom;
