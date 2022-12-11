import React, { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { Label } from "@samvera/nectar-iiif";
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
      <Placeholder ratio={1}>
        <Image
          src={src.pathname}
          alt="0001"
          fill={true}
          onLoad={() => setLoaded(true)}
          className={clsx("source", loaded && "loaded")}
        />
        <Image
          src={src.pathname.replace("300", "2")}
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
