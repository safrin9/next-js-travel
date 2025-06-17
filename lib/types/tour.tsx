// types/tour.ts
export interface Tour {
  // types/tour.ts

  id: string | number;
  title: string;
  description: string;
  location: string;
  city: string;
  region: string;
  duration: string;
  price: number;
  originalPrice?: number | string;
  cancellationPolicy: string;
  imageUrl: string;
  images: string[];
  href: string;
  rating: number;
  reviewCount: number;
  availableDates: string[];
  highlights: string[];
  included: string[];
  notIncluded: string[];
  meetingPoint: string;
  category: string;
  featuredOrder: number;
  durationInHours: number;
}

export interface Destination {
  name: string;
  image: string;
  region?: string;
}

export interface SearchParams {
  q?: string;
  page?: number;
  sort?: "price" | "rating" | "popularity";
  // Add other search parameters as needed
}

export interface SearchResults {
  query: string;
  tours: Tour[];
  total: number;
}
