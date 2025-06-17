"use client";

import { useSearchParams } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const filterItems = [
  { name: "Sightseeing Tours", value: "sightseeing" },
  { name: "Private Sightseeing Tours", value: "private" },
  { name: "Art & Culture", value: "art-culture" },
  { name: "Walking Tours", value: "walking" },
  { name: "Half-day Tours", value: "half-day" },
  { name: "Day Trips", value: "day-trips" },
  { name: "Full-day Tours", value: "full-day" },
  { name: "Multi-day Tours", value: "multi-day" },
  { name: "Adventure Tours", value: "adventure" },
  { name: "Food Tours", value: "food" },
];

export function FilterCarousel() {
  const searchParams = useSearchParams();
  const activeFilter = searchParams.get("filter") || "";
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    setShowLeftArrow(scrollLeft > 10);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
  };

  const scroll = (direction: "left" | "right") => {
    const container = containerRef.current;
    if (!container) return;

    const scrollAmount = container.offsetWidth * 0.8;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    checkScroll();
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", checkScroll);
    const observer = new ResizeObserver(checkScroll);
    observer.observe(container);

    return () => {
      container.removeEventListener("scroll", checkScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative flex items-center w-full h-[44px]">
      {showLeftArrow && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 z-10 bg-white rounded-full p-1 shadow-sm border border-gray-200 hover:shadow-md transition-all"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
      )}

      <div
        ref={containerRef}
        className="overflow-x-auto whitespace-nowrap px-8 w-full hide-scrollbar"
      >
        <div className="inline-flex gap-2">
          {filterItems.map((item) => (
            <Link
              key={item.value}
              href={`?filter=${item.value}`}
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === item.value
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {showRightArrow && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 z-10 bg-white rounded-full p-1 shadow-sm border border-gray-200 hover:shadow-md transition-all"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      )}
    </div>
  );
}
