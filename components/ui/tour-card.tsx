"use client";
import Link from "next/link";
import { Tour } from "@/lib/types/tour";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

interface TourCardProps {
  tour: Tour;
}

export default function TourCard({ tour }: TourCardProps) {
  return (
    <Link
      href={`/tours/${tour.id}`}
      className="block rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
    >
      {/* Image container with fixed aspect ratio */}
      <div className="relative h-48 w-full">
        <img
          src={tour.imageUrl}
          alt={tour.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Card content with flex-grow */}
      <div className="p-4 bg-white flex-grow flex flex-col">
        <div className="mb-2">
          <span className="text-sm text-gray-600">{tour.location}</span>
        </div>

        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {tour.title}
        </h3>

        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <span key={i}>
                {i < Math.floor(tour.rating || 0) ? "★" : "☆"}
              </span>
            ))}
          </div>
          <span className="text-sm ml-1">{tour.rating}</span>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <FontAwesomeIcon
            icon={faCircleCheck}
            className="text-green-500 w-3 h-3"
          />
          <span className="text-sm">{tour.cancellationPolicy}</span>
        </div>

        {/* This will push the price to the bottom */}
        <div className="mt-auto">
          <span className="font-bold text-lg">from ${tour.price}</span>
        </div>
      </div>
    </Link>
  );
}
