import { Manifest } from "@iiif/presentation-3";
import React from "react";
import useSWR from "swr";
import Figure from "./Figure";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Gallery = () => {
  const { data, error, isLoading } = useSWR("/api/collection", fetcher);

  if (!data) return <></>;

  return (
    <>
      {data.items.map((item: Manifest) => (
        <Figure item={item} key={item.id} />
      ))}
    </>
  );
};

export default Gallery;
