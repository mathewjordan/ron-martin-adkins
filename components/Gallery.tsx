import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay, Keyboard, Navigation, Pagination } from "swiper";
import { Manifest } from "@iiif/presentation-3";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Figure from "./Figure";
import { styled } from "@stitches/react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/router";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Gallery = ({ isHome }: { isHome?: boolean }) => {
  const router = useRouter();
  const [swiperRef, setSwiperRef] = useState<any>();

  const { data, error, isLoading } = useSWR("/api/collection", fetcher);

  useEffect(() => {
    console.log(swiperRef?.activeIndex);
    // if (data) router.push(data?.items[swiperRef?.activeIndex].homepage[0].id);
  }, [swiperRef?.activeIndex]);

  const slideTo = (index: number) => {
    swiperRef.slideTo(swiperRef.clickedIndex);
  };

  if (!data) return <></>;

  return (
    <GalleryStyled isHome={isHome}>
      <Swiper
        onSwiper={setSwiperRef}
        keyboard={{ enabled: true }}
        loop={true}
        modules={[Autoplay, Keyboard, Pagination, Navigation]}
        preloadImages={true}
        slidesPerView={9}
        centeredSlides={true}
        navigation={true}
        spaceBetween={19}
        mousewheel={true}
        speed={800}
        pagination={{
          dynamicBullets: true,
        }}
      >
        {data.items.map((item: Manifest, index: number) => (
          <SwiperSlide key={item.id} style={{ padding: "2.618rem 0" }}>
            <Link
              href={
                item?.homepage && item?.homepage[0] && item?.homepage[0].id
                  ? item?.homepage[0].id
                  : "/"
              }
              key={item.id}
              onClick={() => slideTo(index)}
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

  ".swiper-slide": {
    filter: "grayscale(1) contrast(0.5)",

    "&-active": {
      filter: "grayscale(0) brightness(1)",
      opacity: "1",
    },
  },

  variants: {
    isHome: {
      true: {
        transform: "scale(1.618)",
        bottom: "38.2%",
      },
    },
  },

  a: {
    display: "flex",
    transform: "translate(0) scale(1)",
    transition: "transform 100ms ease-in-out",

    "&:hover": {
      transform: "translate(-3px) scale(1.05)",
      borderRadius: "3px",
      // boxShadow: "2px 2px 5px #0004",
    },
  },
});

export default Gallery;
