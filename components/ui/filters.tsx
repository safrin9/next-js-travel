"use client";

import { useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

interface FiltersProps {
  clear?: boolean;
}

export default function Filters({ clear }: FiltersProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // List the keys that belong to your filters.
  const filterKeys = [
    "types",
    "duration",
    "price_min",
    "price_max",
    "rating",
    "specials",
    "languages",
    "time",
  ];

  // When clear becomes true, remove all filter-related keys.
  useEffect(() => {
    if (clear) {
      const params = new URLSearchParams(searchParams);
      filterKeys.forEach((key) => params.delete(key));
      replace(`${pathname}?${params.toString()}`);
    }
  }, [clear, pathname, replace, searchParams]);

  // ... your existing Filters JSX remains unchanged

  return (
    <div className="space-y-6">
      {/* Tour Types filter */}
      <div>
        <h3 className="font-medium mb-2">Tour Types</h3>
        <div className="space-y-2">
          {[
            { label: "Best Seller", value: "best-seller" },
            { label: "Art & Culture", value: "art-culture" },
            { label: "Sightseeing", value: "sightseeing" },
            { label: "Adventure", value: "adventure" },
          ].map((option) => (
            <label key={option.value} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={searchParams.getAll("types").includes(option.value)}
                onChange={(e) => {
                  const params = new URLSearchParams(searchParams);
                  const types = params.getAll("types");

                  if (e.target.checked) {
                    params.append("types", option.value);
                  } else {
                    params.delete("types");
                    types.forEach((type) => {
                      if (type !== option.value) params.append("types", type);
                    });
                  }

                  replace(`${pathname}?${params.toString()}`);
                }}
                className="rounded border-gray-300 text-blue-600"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Duration filter */}
      <div>
        <h3 className="font-medium mb-2">Duration</h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Up to 1 hour", value: "0-1" },
            { label: "1 to 4 hours", value: "1-4" },
            { label: "4 hours to 1 day", value: "4-24" },
            { label: "1 to 3 days", value: "24-72" },
            { label: "3+ days", value: "72+" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => {
                const params = new URLSearchParams(searchParams);
                if (option.value) {
                  params.set("duration", option.value);
                } else {
                  params.delete("duration");
                }
                replace(`${pathname}?${params.toString()}`);
              }}
              className={`text-sm px-3 py-2 rounded-md border ${
                searchParams.get("duration") === option.value
                  ? "bg-blue-100 border-blue-300"
                  : "bg-white border-gray-300"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price filter */}
      <div>
        <h3 className="font-medium mb-2">Price</h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="$0"
            className="w-full p-2 border rounded-md"
            value={searchParams.get("price_min") || ""}
            onChange={(e) => {
              const params = new URLSearchParams(searchParams);
              if (e.target.value) {
                params.set("price_min", e.target.value);
              } else {
                params.delete("price_min");
              }
              replace(`${pathname}?${params.toString()}`);
            }}
          />
          <span>to</span>
          <input
            type="number"
            placeholder="$500+"
            className="w-full p-2 border rounded-md"
            value={searchParams.get("price_max") || ""}
            onChange={(e) => {
              const params = new URLSearchParams(searchParams);
              if (e.target.value) {
                params.set("price_max", e.target.value);
              } else {
                params.delete("price_max");
              }
              replace(`${pathname}?${params.toString()}`);
            }}
          />
        </div>
      </div>

      {/* Rating filter */}
      <div>
        <h3 className="font-medium mb-2">Rating</h3>
        <div className="space-y-1">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="rating"
              value="4"
              checked={searchParams.get("rating") === "4"}
              onChange={() =>
                replace(
                  `${pathname}?${(() => {
                    const params = new URLSearchParams(searchParams);
                    if (params.get("rating") === "4") {
                      params.delete("rating");
                    } else {
                      params.set("rating", "4");
                    }
                    return params.toString();
                  })()}`
                )
              }
            />
            <span>★★★★☆ & up</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="rating"
              value="3"
              checked={searchParams.get("rating") === "3"}
              onChange={() =>
                replace(
                  `${pathname}?${(() => {
                    const params = new URLSearchParams(searchParams);
                    if (params.get("rating") === "3") {
                      params.delete("rating");
                    } else {
                      params.set("rating", "3");
                    }
                    return params.toString();
                  })()}`
                )
              }
            />
            <span>★★★☆☆ & up</span>
          </label>
        </div>
      </div>

      {/* Specials filter */}
      <div>
        <h3 className="font-medium mb-2">Specials</h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Deals & Discounts", value: "deals" },
            { label: "Free Cancellation", value: "free-cancel" },
            { label: "Likely to Sell Out", value: "sell-out" },
            { label: "Skip-The-Line", value: "skip-line" },
          ].map((option) => (
            <label key={option.value} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={searchParams.getAll("specials").includes(option.value)}
                onChange={(e) => {
                  const params = new URLSearchParams(searchParams);
                  const values = params.getAll("specials");

                  params.delete("specials");
                  const newValues = e.target.checked
                    ? [...values, option.value]
                    : values.filter((v) => v !== option.value);

                  newValues.forEach((v) => params.append("specials", v));
                  replace(`${pathname}?${params.toString()}`);
                }}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Languages filter */}
      <div>
        <h3 className="font-medium mb-2">Languages</h3>
        <div className="grid grid-cols-2 gap-2">
          {["English", "Chinese", "Dutch", "French"].map((lang) => (
            <label key={lang} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={searchParams.getAll("languages").includes(lang)}
                onChange={(e) => {
                  const params = new URLSearchParams(searchParams);
                  const values = params.getAll("languages");

                  params.delete("languages");
                  const newValues = e.target.checked
                    ? [...values, lang]
                    : values.filter((v) => v !== lang);

                  newValues.forEach((v) => params.append("languages", v));
                  replace(`${pathname}?${params.toString()}`);
                }}
              />
              <span>{lang}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Time of Day filter */}
      <div>
        <h3 className="font-medium mb-2">Time of Day</h3>
        <div className="space-y-1">
          {[
            { label: "Morning (before 12pm)", value: "morning" },
            { label: "Afternoon (after 12pm)", value: "afternoon" },
            { label: "Evening and night (after 5pm)", value: "evening" },
          ].map((option) => (
            <label key={option.value} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={searchParams.getAll("time").includes(option.value)}
                onChange={(e) => {
                  const params = new URLSearchParams(searchParams);
                  const values = params.getAll("time");

                  params.delete("time");
                  const newValues = e.target.checked
                    ? [...values, option.value]
                    : values.filter((v) => v !== option.value);

                  newValues.forEach((v) => params.append("time", v));
                  replace(`${pathname}?${params.toString()}`);
                }}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
