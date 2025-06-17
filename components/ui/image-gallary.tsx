// components/ui/image-gallary.tsx
"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import clsx from "clsx";

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleThumbnails = 5;
  const showOverlay = images.length > visibleThumbnails;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="flex gap-4">
      {/* Thumbnails column */}
      <div className="flex flex-col gap-2 w-24">
        {images.slice(0, 5).map((img, i) => (
          <div
            key={i}
            className="relative w-full h-[20%] aspect-square cursor-pointer overflow-hidden rounded"
            onClick={() => setCurrentIndex(i)}
          >
            <Image
              src={img}
              alt={`Thumb ${i}`}
              fill
              className="object-cover hover:opacity-90"
            />
            {i === 4 && images.length > 5 && (
              <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center text-white text-sm font-semibold">
                +{images.length - 5} more
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Main Image with Navigation */}
      <div className="relative flex-1 h-[500px] rounded overflow-hidden shadow">
        <Image
          src={images[currentIndex]}
          alt={`Main Image ${currentIndex + 1}`}
          fill
          className="object-cover"
        />
        {/* Carousel Controls */}
        <button
          onClick={goToPrevious}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 hover:bg-opacity-60"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 hover:bg-opacity-60"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
