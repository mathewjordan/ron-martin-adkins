import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay, Keyboard, Navigation } from "swiper";
import { Manifest } from "@iiif/presentation-3";
import React, { useState } from "react";
import useSWR from "swr";
import Figure from "./Figure";
import { styled } from "../stitches";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Gallery = ({ isHome }: { isHome?: boolean }) => {
  const [swiperRef, setSwiperRef] = useState<any>();

  const { data } = useSWR("/api/collection", fetcher);

  const slideTo = () => {
    swiperRef.slideTo(swiperRef.clickedIndex);
  };

  if (!data) return <></>;

  return (
    <GalleryStyled>
      <Swiper
        onSwiper={setSwiperRef}
        keyboard={{ enabled: true }}
        loop={true}
        modules={[Autoplay, Keyboard, Navigation]}
        slidesPerView={7}
        centeredSlides={true}
        initialSlide={42}
        navigation={true}
        spaceBetween={19}
        speed={800}
      >
        {data.items.map((item: Manifest, index: number) => (
          <SwiperSlide key={item.id}>
            <Link
              href={
                item?.homepage && item?.homepage[0] && item?.homepage[0].id
                  ? item?.homepage[0].id
                  : "/"
              }
              key={item.id}
              onClick={() => slideTo()}
            >
              <Figure item={item} />
            </Link>
            <GalleryItemSpacer>&nbsp;</GalleryItemSpacer>
          </SwiperSlide>
        ))}
      </Swiper>
    </GalleryStyled>
  );
};

const GalleryItemSpacer = styled("span", {
  display: "flex",
  height: "0",
  width: "100%",
});

const GalleryStyled = styled("div", {
  position: "absolute",
  zIndex: "1",
  width: "100%",
  bottom: "0",
  display: "flex",
  transition: "500ms all ease-in-out",
  boxShadow: "5px 5px 11px #000a",
  backgroundColor: "$sageA10",
  padding: "$gr3 0",

  ".swiper-slide": {
    "&-active": {
      opacity: "1",
    },
  },

  a: {
    display: "flex",
    transform: "translate(0) scale(1)",
    transition: "transform 100ms ease-in-out",

    "&:hover": {
      transform: "translate(-3px) scale(1.05)",
    },
  },
});

export default Gallery;
