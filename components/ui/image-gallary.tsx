// components/ui/image-gallary.tsx
"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleThumbnails = 5;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex gap-4">
      {/* Thumbnails column */}
      <div className="flex flex-col gap-2 w-24">
        {images.slice(0, visibleThumbnails).map((img, i) => (
          <div
            key={i}
            className="relative w-full aspect-square cursor-pointer overflow-hidden rounded"
            onClick={() => setCurrentIndex(i)}
          >
            <Image
              src={img}
              alt={`Thumbnail ${i + 1}`}
              fill
              className="object-cover hover:opacity-90"
              sizes="100px"
            />
            {i === visibleThumbnails - 1 &&
              images.length > visibleThumbnails && (
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center text-white text-sm font-semibold">
                  +{images.length - visibleThumbnails} more
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
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Carousel Controls */}
        <button
          onClick={goToPrevious}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 hover:bg-opacity-60 transition-all"
          aria-label="Previous image"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 hover:bg-opacity-60 transition-all"
          aria-label="Next image"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
