import React, { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { styled } from "@stitches/react";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { Manifest } from "@iiif/presentation-3";

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
    <FigureStyled>
      <Placeholder>
        <AspectRatio.Root ratio={1}>
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
        </AspectRatio.Root>
      </Placeholder>
    </FigureStyled>
  );
};

const Placeholder = styled("div", {
  display: "flex",
  width: "100px",
  height: "100px",
  backgroundColor: "#aaa",
  borderRadius: "5px",
  boxShadow: "3px 3px 8px #0003",
});

const FigureStyled = styled("figure", {
  display: "flex",
  padding: "0",
  margin: "0",
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
