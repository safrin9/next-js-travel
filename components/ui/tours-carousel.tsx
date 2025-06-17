// components/ui/tours-carousel.tsx
"use client";

import { useState } from "react";
import TourCard from "./tour-card";
import { Tour } from "@/lib/types/tour";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ToursCarouselProps {
  tours: Tour[];
  title?: string;
}

export default function ToursCarousel({ tours, title }: ToursCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === tours.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? tours.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="relative mb-12">
      {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-2"
            >
              <TourCard tour={tour} />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="flex justify-center mt-4 space-x-2">
        {tours.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full ${
              currentIndex === index ? "bg-blue-600" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
