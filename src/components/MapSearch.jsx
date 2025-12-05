// src/components/MapSearch.jsx
import { useState } from "react";

export default function MapSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    try {
      const resp = await fetch("http://localhost:5000/api/search-mls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keywords: query }),
      });

      const data = await resp.json();
      if (!resp.ok) {
        throw new Error(data.error || "Search failed");
      }
      setResults(data.results || []);
    } catch (err) {
      console.error("Search error:", err);
      setError("Search failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Find Your Perfect Home</h2>
      <p className="text-center text-gray-600 mb-6">
        Use our AI-powered search to discover listings tailored to you.
      </p>
      <div className="flex justify-center mb-6">
        <input
          type="text"
          className="flex-1 max-w-md p-3 rounded-l-full shadow border text-sm"
          placeholder="Search homes (e.g. '2 bedroom condo in Toronto under $800K')"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 rounded-r-full text-sm"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Searching…" : "Search"}
        </button>
      </div>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <div className="space-y-4">
        {results.map((listing) => (
          <div
            key={listing.ListingKey}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
          >
            <div className="font-semibold">{listing.UnparsedAddress}</div>
            <div className="text-sm text-gray-500">
              {listing.City} — ${listing.ListPrice?.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">
              Beds: {listing.BedroomsTotal ?? "N/A"}, Baths:{" "}
              {listing.BathroomsTotalInteger ?? "N/A"}
            </div>
          </div>
        ))}
        {!results.length && !loading && (
          <div className="text-gray-500 text-center">No results yet. Try a search above.</div>
        )}
      </div>
    </div>
  );
}
