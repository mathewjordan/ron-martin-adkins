import React, { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { styled } from "@stitches/react";
import { Manifest } from "@iiif/presentation-3";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";

interface FigureProps {
  item: Manifest;
}

const Figure: React.FC<FigureProps> = ({ item }) => {
  const [loaded, setLoaded] = useState(false);
  const [thumbnail, setThumbnail] = useState<string | undefined>();

  useEffect(() => {
    if (item.thumbnail?.length !== 0 && item.thumbnail)
      setThumbnail(item.thumbnail[0].id as string);
  }, [item]);

  if (!thumbnail) return <></>;

  const src = new URL(thumbnail);

  return (
    <AspectRatio.Root ratio={1}>
      <FigureStyled>
        <Placeholder>
          <Image
            src={src.pathname}
            alt="0001"
            fill={true}
            onLoad={() => setLoaded(true)}
            className={clsx("source", loaded && "loaded")}
          />
          <Image
            src={src.pathname.replace("300", "3")}
            alt="0001"
            fill={true}
            className={clsx("placeholder", loaded && "loaded")}
          />
        </Placeholder>
      </FigureStyled>
    </AspectRatio.Root>
  );
};

const Placeholder = styled("div", {
  display: "flex",
  backgroundColor: "#aaa",
  borderRadius: "5px",
  width: "100%",
  height: "100%",
  boxShadow: "3px 3px 8px #0003",
});

const FigureStyled = styled("figure", {
  display: "flex",
  padding: "0",
  margin: "0",
  width: "100%",
  height: "100%",
  cursor: "pointer",

  img: {
    borderRadius: "5px",

    "&.source": {
      opacity: 0,
      transition: "all 0.5s ease-in-out",

      "&.loaded": {
        opacity: 1,
      },
    },

    "&.placeholder": {
      opacity: 1,
      transition: "all 1s ease-in-out",

      "&.loaded": {
        opacity: 0,
      },
    },
  },
});

export default Figure;
