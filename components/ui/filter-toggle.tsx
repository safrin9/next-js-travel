"use client";

import { useState, useEffect, useRef } from "react";
import Filters from "@/components/ui/filters";
import { CalendarDays, SlidersHorizontal, X } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function FilterToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<string | null>(null);
  const [clearTrigger, setClearTrigger] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  // Close on outside click
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  // “Clear All” only triggers filters to clear
  const handleClearAll = () => {
    setClearTrigger(true);
    // Reset trigger after a short delay so that it can be re-triggered later.
    setTimeout(() => setClearTrigger(false), 100);
  };

  const handleSeeResults = () => {
    console.log("Date:", date);
    setIsOpen(false);
  };

  return (
    <>
      {/* Top filter bar */}
      <div className="flex items-center gap-3 mb-4">
        {/* Date Picker */}
        <div className="relative w-48">
          <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 pointer-events-none" />
          <DatePicker
            selected={date ? new Date(date) : null}
            onChange={(d: Date | null) =>
              setDate(d ? d.toISOString().split("T")[0] : null)
            }
            placeholderText="Select date"
            className="w-full pl-10 pr-3 py-1.5 border rounded-full text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            dateFormat="dd/MM/yyyy"
          />
        </div>

        {/* Filter Toggle Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-start gap-2 w-48 px-3 py-1.5 border rounded-full hover:bg-gray-100 text-sm text-gray-700"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }} // light transparent gray background
        >
          <div
            ref={modalRef}
            className="relative max-w-md max-h-[80vh] bg-white rounded-lg shadow-lg flex flex-col pointer-events-auto mx-4"
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white z-10 px-6 pt-6 pb-2 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-black"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Filters Content */}
            <div className="flex-1 overflow-y-auto px-6 py-2">
              <Filters clear={clearTrigger} />
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white z-10 px-6 py-4 border-t">
              <div className="flex justify-between items-center">
                <button
                  onClick={handleClearAll}
                  className="text-blue-500 text-sm hover:text-blue-700"
                >
                  Clear all
                </button>
                <button
                  onClick={handleSeeResults}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  See results
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
