import React from "react";
import useSWR from "swr";
import Figure from "./Figure";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Gallery: React.FC = () => {
  const { data, error, isLoading } = useSWR("/api/collection", fetcher);

  if (error) return "An error has occurred.";
  if (!data) return <></>;

  return (
    <>
      {data.items.map((item) => (
        <Figure item={item} key={item.id} />
      ))}
    </>
  );
};

export default Gallery;
