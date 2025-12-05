import { useState } from "react";

export default function MapSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const parseNaturalQuery = async () => {
    const resp = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: "You are an assistant that converts natural real estate search queries into structured JSON filters including: city, minPrice, maxPrice, bedroomsMin, bathroomsMin, propertyType, keywords."
          },
          {
            role: "user",
            content: query
          }
        ]
      })
    });
    const gpt = await resp.json();
    const content = gpt.choices?.[0]?.message?.content || "{}";
    return JSON.parse(content);
  };

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    try {
      const filters = await parseNaturalQuery();
      const res = await fetch("/api/search-mls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(filters)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Search failed");
      setResults(data.results || []);
    } catch (err) {
      console.error("Search error:", err);
      setError("Search failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-black text-white py-20 text-center">
      <h2 className="text-3xl font-bold mb-4">Find Your Perfect Home</h2>
      <p className="mb-8 text-gray-300">
        Use our AI-powered search to discover listings tailored to you.
      </p>
      <div className="max-w-2xl mx-auto flex rounded-full overflow-hidden">
        <input
          type="text"
          className="flex-1 px-6 py-3 text-black outline-none"
          placeholder="Search homes (e.g. '2 bedroom condo in Toronto under $800k')"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-orange-500 text-white px-6 py-3 font-semibold hover:bg-orange-600 transition-all"
        >
          {loading ? "Searching…" : "Search"}
        </button>
      </div>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      <div className="mt-10 max-w-3xl mx-auto space-y-4 text-left">
        {results.map(listing => (
          <div key={listing.ListingKey} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div className="font-semibold text-black dark:text-white">{listing.UnparsedAddress}</div>
            <div className="text-sm text-gray-500">
              {listing.City} — ${listing.ListPrice?.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">
              Beds: {listing.BedroomsTotal ?? "N/A"}, Baths: {listing.BathroomsTotalInteger ?? "N/A"}
            </div>
          </div>
        ))}
        {(!results.length && !loading) && <div className="text-gray-500">No results yet. Try a search above.</div>}
      </div>
    </section>
  );
}
