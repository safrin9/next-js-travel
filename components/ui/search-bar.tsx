"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

interface SearchBarProps {
  currentLocation?: string;
  pageTitle?: string;
}

export default function SearchBar({
  currentLocation = "Japan",
  pageTitle = "",
}: SearchBarProps) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Determine if we're on homepage, search page, or location page
  const isHomePage = pathname === "/";
  const isSearchPage = pathname.startsWith("/search");
  const isLocationPage =
    pathname.includes("/things-to-do/") || pathname.includes("/tours/");

  // Get display text based on page type
  useEffect(() => {
    if (isSearchPage) {
      // Extract search term from URL for search results page
      const searchTerm = decodeURIComponent(
        pathname.split("/search/")[1] || ""
      );
      setSearchQuery(searchTerm);
    } else if (isLocationPage && pageTitle) {
      // For location pages, use the page title (e.g., "Kasuga Taisha")
      const locationName = pageTitle.split("(")[0].trim();
      setSearchQuery(locationName);
    } else {
      setSearchQuery("");
    }
  }, [pathname, pageTitle, isSearchPage, isLocationPage]);

  // Load recent searches from localStorage
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();

    if (query) {
      // Update recent searches
      const updatedSearches = [
        query,
        ...recentSearches.filter(
          (item) => item.toLowerCase() !== query.toLowerCase()
        ),
      ].slice(0, 5);

      setRecentSearches(updatedSearches);
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));

      router.push(`/search/${encodeURIComponent(query)}`);
      setShowSuggestions(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    inputRef.current?.focus();
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.setItem("recentSearches", JSON.stringify([]));
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    router.push(`/search/${encodeURIComponent(suggestion)}`);
    setShowSuggestions(false);
  };

  const filteredRecentSearches = recentSearches.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Determine placeholder and input behavior
  const getPlaceholder = () => {
    if (isHomePage) return "Search for place or activity";
    if (isLocationPage) return `Search in ${currentLocation}`;
    return "Search...";
  };

  const shouldShowClearButton = searchQuery && !isLocationPage;

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      <form onSubmit={handleSearch}>
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder={getPlaceholder()}
            className={`block w-full pl-4 pr-12 py-3 border border-gray-200 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              isLocationPage ? "font-medium text-gray-800" : ""
            }`}
          />

          {shouldShowClearButton && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute inset-y-0 right-12 flex items-center pr-3"
            >
              <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}

          <button
            type="submit"
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-white bg-blue-600 rounded-r-full hover:bg-blue-700 h-full px-4"
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
        </div>
      </form>

      {showSuggestions &&
        (filteredRecentSearches.length > 0 || searchQuery) && (
          <div className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200">
            {filteredRecentSearches.length > 0 && (
              <>
                <div className="px-4 py-2 text-sm font-medium text-gray-500 border-b flex justify-between items-center">
                  <span>Recent Searches</span>
                  <button
                    onClick={clearRecentSearches}
                    className="text-xs text-gray-400 hover:text-gray-600"
                  >
                    Clear
                  </button>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {filteredRecentSearches.map((item, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSuggestionClick(item)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                    >
                      <ClockIcon className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{item}</span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {searchQuery && !isLocationPage && (
              <button
                type="button"
                onClick={() => handleSuggestionClick(searchQuery)}
                className="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center font-medium border-t border-gray-100"
              >
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 mr-2" />
                <span>{'Search for "${searchQuery}"'}</span>
              </button>
            )}
          </div>
        )}
    </div>
  );
}
