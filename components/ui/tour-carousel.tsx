"use client";

import { featuredTours } from "@/lib/data/tours";
import TourCard from "@/components/ui/tour-card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function TourCarousel() {
  return (
    <div className="relative px-4 py-8">
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {featuredTours.map((tour) => (
          <SwiperSlide key={tour.id}>
            <div className="h-full">
              <TourCard tour={tour} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
