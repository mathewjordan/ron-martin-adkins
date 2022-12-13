import { Manifest } from "@iiif/presentation-3";
import React from "react";
import useSWR from "swr";
import Figure from "./Figure";
import { styled } from "@stitches/react";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Gallery = () => {
  const { data, error, isLoading } = useSWR("/api/collection", fetcher);

  if (!data) return <></>;

  return (
    <GalleryStyled>
      {data.items.map((item: Manifest) => (
        <Link
          href={
            item?.homepage && item?.homepage[0] && item?.homepage[0].id
              ? item?.homepage[0].id
              : "/"
          }
          key={item.id}
        >
          <Figure item={item} />
        </Link>
      ))}
    </GalleryStyled>
  );
};

const GalleryStyled = styled("div", {
  padding: "2.618rem",
  position: "absolute",
  zIndex: "1",
  width: "100%",
  bottom: "0",
  overflowX: "scroll",
  display: "flex",

  a: {
    display: "flex",
    marginRight: "1.618rem",
    transform: "translateY(0) scale(1)",
    transition: "transform 100ms ease-in-out",

    "&:hover": {
      transform: "translateY(-1px) scale(1.04)",
      borderRadius: "3px",
      boxShadow: "2px 2px 5px #0004",
    },

    "&:last-child": {
      marginRight: "0",
    },
  },
});

export default Gallery;
