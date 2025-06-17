"use client";
import Link from "next/link";
//import SearchBar from "./search-bar";
import { usePathname } from "next/navigation";
import SearchBar from "@/components/ui/search-bar";

export default function Header() {
  const pathname = usePathname();

  // Extract location context from URL
  const getLocationContext = () => {
    if (pathname?.startsWith("/things-to-do/")) {
      const parts = pathname.split("/");
      if (parts.length >= 4) {
        // /things-to-do/[region]/[city]
        const region = decodeURIComponent(parts[2]);
        const city = decodeURIComponent(parts[3]);
        return `${city}, ${region}`;
      } else if (parts.length >= 3) {
        // /things-to-do/[region]
        return decodeURIComponent(parts[2]);
      }
    }
    return undefined;
  };

  // Extract page title from URL for attraction pages
  const getPageTitle = () => {
    if (pathname?.match(/\/things-to-do\/.+\/.+\/.+/)) {
      // URL pattern like /things-to-do/region/city/attraction
      const parts = pathname.split("/");
      return decodeURIComponent(parts[4]?.replace(/-/g, " ") || "");
    }
    return undefined;
  };

  const locationContext = getLocationContext();
  const pageTitle = getPageTitle();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row gap-4 md:gap-0 md:items-center">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-blue-600">
            WanderLife.com
          </Link>
          <button className="md:hidden">
            {/* Hamburger menu icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 px-0 md:px-8">
          <SearchBar currentLocation={locationContext} pageTitle={pageTitle} />
        </div>

        <nav className="hidden md:flex space-x-6">
          <Link
            href="/experiences"
            className="text-gray-700 hover:text-blue-600"
          >
            Our Experiences
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-600">
            About Us
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-blue-600">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
