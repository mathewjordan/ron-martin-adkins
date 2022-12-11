import React, { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { Label } from "@samvera/nectar-iiif";
import { styled } from "@stitches/react";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";

const Figure = ({ item }) => {
  const [loaded, setLoaded] = useState(false);

  const thumbnail = new URL(item.thumbnail[0].id);
  return (
    <FigureStyled>
      <Placeholder ratio={1}>
        <Image
          src={thumbnail.pathname}
          alt="0001"
          fill={true}
          onLoad={() => setLoaded(true)}
          className={clsx("source", loaded && "loaded")}
        />
        <Image
          src={thumbnail.pathname.replace("300", "2")}
          alt="0001"
          fill={true}
          className={clsx("placeholder", loaded && "loaded")}
        />
      </Placeholder>
      <figcaption>
        <Label label={item.label} />
      </figcaption>
    </FigureStyled>
  );
};

const FigureStyled = styled("figure", {
  width: "150px",
  "img.source": {
    opacity: 0,
    transition: "all 1s ease-in-out",

    "&.loaded": {
      opacity: 1,
    },
  },

  "img.placeholder": {
    opacity: 1,
    transition: "all 1s ease-in-out",

    "&.loaded": {
      opacity: 0,
    },
  },
});

const Placeholder = styled(AspectRatio.Root, {
  display: "flex",
  width: "150",
  height: "150",
  backgroundColor: "#aaa",
});

export default Figure;
