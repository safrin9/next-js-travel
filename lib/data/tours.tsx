// data/tours.ts
import { Tour } from "@/lib/types/tour";

interface TourFilters {
  types?: string | string[]; // For tour type categories
  duration?: string; // e.g. "1-4", "4-24"
  price_min?: string; // Minimum price as string (from URL params)
  price_max?: string; // Maximum price as string
  rating?: string; // Minimum rating
}

export const featuredTours: Tour[] = [
  {
    id: "1",
    title:
      "Mt Fuji & Hakone Cruise, Drum Show & Bullet Train Day Tour from Tokyo",
    location: "Tokyo, Kanto",
    duration: "11 hours 50 minutes",
    price: 192,
    rating: 4.9,
    imageUrl:
      "https://media.tacdn.com/media/attractions-splice-spp-674x446/13/bc/24/45.jpg",
    cancellationPolicy: "Free Cancellation",

    category: "Tokyo Tours",

    city: "Tokyo",
    region: "Kanto",

    originalPrice: "",

    images: [
      "/images/bullet_train.jpeg",
      "/images/cruise.jpeg",
      "/images/drum show.jpeg",
      "/images/tokyo4.jpeg",
      "/images/images.jpeg",
      "/images/ally.jpeg",
    ],
    href: "",
    description: "",
    reviewCount: 103,
    availableDates: [],
    highlights: [],
    included: [],
    notIncluded: [],
    meetingPoint: "",
    featuredOrder: 3,
    durationInHours: 11,
  },
  {
    id: "2",
    title: "Traditional Kyoto Cultural Experience",
    location: "Kyoto, Kyoto Prefecture",
    duration: "6 hours",
    price: 150,
    rating: 4.6,

    imageUrl:
      "https://www.datocms-assets.com/101439/1700744781-kyoto.jpg?auto=format&fit=crop&h=800&w=1200",
    cancellationPolicy: "Free Cancellation",
    href: "",
    category: "Kyoto Tours",

    city: "kyoto",
    region: "Kansai",

    originalPrice: "",

    images: [
      "/images/kyoto1.jpg",
      "/images/kyoto2.jpg",
      "/images/kyoto3.jpg",
      "/images/kyoto4.jpg",
      "/images/kyoto5.jpg",
      "/images/kyoto6.jpg",
    ],

    description: "",
    reviewCount: 207,
    availableDates: [],
    highlights: [],
    included: [],
    notIncluded: [],
    meetingPoint: "",
    featuredOrder: 5,
    durationInHours: 6,
  },
  {
    id: "3",
    title: "Nagoya Castle and Cultural Walk",
    location: "Nagoya, Aichi Prefecture",
    duration: "5 hours",
    price: 120,
    rating: 4.8,

    imageUrl: "https://www.gpsmycity.com/img/gd_cover/1722.jpg",
    cancellationPolicy: "Free Cancellation",
    href: "",
    category: "Nagoya Tours",
    city: "Nagoya",
    region: "Chubu",

    originalPrice: "",

    images: [
      "/images/nagoya1.jpg",
      "/images/nagoya2.jpg",
      "/images/nagoya3.jpeg",
      "/images/nagoya4.jpg",
      "/images/nagoya5.jpeg",
    ],

    description: "",
    reviewCount: 156,
    availableDates: [],
    highlights: [],
    included: [],
    notIncluded: [],
    meetingPoint: "",
    featuredOrder: 4,
    durationInHours: 5,
  },
  {
    id: "4",
    title: "Scenic Spots of Mt Fuji & Lake Kawaguchiko 1-Day Bus Tour w/ Meal",
    location: "Fujikawaguchiko-machi,Yamanashi Prefecture,",
    duration: "5 hours",
    price: 134,
    rating: 4.5,

    imageUrl: "/images/Lake-Kawaguchiko.jpg",
    cancellationPolicy: "Free Cancellation",
    href: "",
    category: "Fujikawaguchiko-machi Tours",

    city: "Fujikawaguchiko-machi",
    region: "Yamanashi Prefecture",

    originalPrice: "",

    images: [
      "/images/fujiku3.jpg",
      "/images/fujiku7.jpg",
      "/images/fujiku6.jpg",
      "/images/fujiku8.jpg",
      "/images/fujiku9.jpg",
    ],

    description: "",
    reviewCount: 87,
    availableDates: [],
    highlights: [],
    included: [],
    notIncluded: [],
    meetingPoint: "",
    featuredOrder: 3,
    durationInHours: 5,
  },
  // Add more tours...
];

export const popularTours: Tour[] = [
  // Different set of tours...
];

export const getTourById = (id: string): Tour | undefined => {
  if (!id) return undefined;
  return featuredTours.find((tour) => tour.id === id);
};

// Add this function to your existing tours.ts
export async function searchTours(
  searchTerm: string,
  filters: TourFilters = {}
): Promise<Tour[]> {
  // Decode search term if it's URL-encoded
  const term = searchTerm.toLowerCase();

  // First filter by search term (matches location, region, or title)
  let results = featuredTours.filter(
    (tour) =>
      tour.title.toLowerCase().includes(term) ||
      tour.location.toLowerCase().includes(term) ||
      tour.region.toLowerCase().includes(term)
  );

  // Apply tour type filters
  if (filters.types) {
    const types = Array.isArray(filters.types)
      ? filters.types
      : [filters.types];
    results = results.filter((tour) =>
      types.some((type) => tour.category.includes(type))
    );
  }

  // Apply duration filter (updated version)
  if (filters.duration) {
    results = results.filter((tour) => {
      const duration = filters.duration;
      switch (duration) {
        case "0-1":
          return tour.durationInHours <= 1;
        case "1-4":
          return tour.durationInHours > 1 && tour.durationInHours <= 4;
        case "4-24":
          return tour.durationInHours > 4 && tour.durationInHours <= 24;
        case "24-72":
          return tour.durationInHours > 24 && tour.durationInHours <= 72;
        case "72+":
          return tour.durationInHours > 72;
        default:
          return true;
      }
    });
  }

  // Apply price filters
  if (filters.price_min) {
    const minPrice = Number(filters.price_min);
    results = results.filter((tour) => tour.price >= minPrice);
  }

  if (filters.price_max) {
    const maxPrice = Number(filters.price_max);
    results = results.filter((tour) => tour.price <= maxPrice);
  }

  // Apply rating filter
  if (filters.rating) {
    const minRating = Number(filters.rating);
    results = results.filter((tour) => tour.rating >= minRating);
  }

  return results;
}
export const getTour = () => {
  return featuredTours;
};
/*import { sql } from '@vercel/postgres'; // or your database client



export async function getTourById(id: string): Promise<Tour | undefined> {
  try {
    const result = await sql`
      SELECT * FROM tours WHERE id = ${id}
    `;
    return result.rows[0] as Tour;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tour.');
  }
}
  */
