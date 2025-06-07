"use client";

import { useEffect, useState } from "react";

interface AnalyticsData {
  totalSessions: number;
  avgSessionsPerUser?: number;
  topPages: { _id: string; count: number }[];
  avgTimeSpent: { _id: string; avgTime: number }[];
  topActions: { _id: string; count: number }[];
  loggedStats: { _id: boolean; count: number }[];
  topDevices: { _id: string; count: number }[];
}

export default function AdminDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [range, setRange] = useState("7d");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetch(`${apiUrl}/admin/analytics?range=${range}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(setData)
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("⚠️ Failed to load analytics. Please try again later.");
      });
  }, [range]);

  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!data) return <div className="p-6 text-xl">Loading analytics...</div>;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">📊 Admin Analytics Dashboard</h1>

      <div className="mb-4">
        <label className="mr-2 font-semibold">Filter by Date:</label>
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="today">Today</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="all">All Time</option>
        </select>
      </div>

      <div className="bg-gray-100 p-4 rounded-xl shadow space-y-2">
        <h2 className="text-lg font-semibold">User Sessions</h2>
        <p>Total Sessions: {data.totalSessions}</p>
        <p>
          Average Sessions Per User:{" "}
          {data.avgSessionsPerUser !== undefined
            ? data.avgSessionsPerUser.toFixed(2)
            : "N/A"}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <AnalyticsSection title="Top Visited Pages" items={data.topPages} />
        <AnalyticsSection
          title="Average Time Per Page"
          items={data.avgTimeSpent}
          format="ms"
        />
        <AnalyticsSection title="Top Clicked Actions" items={data.topActions} />
        <AnalyticsSection title="Top Devices" items={data.topDevices} />
        <AnalyticsSection
          title="Logged In vs Logged Out"
          items={data.loggedStats}
          format="bool"
        />
      </div>
    </div>
  );
}

function AnalyticsSection({
  title,
  items,
  format,
}: {
  title: string;
  items: { _id: any; count?: number; avgTime?: number }[];
  format?: "ms" | "bool";
}) {
  const sortedItems = [...items].sort((a, b) => {
    const aVal = a.count ?? a.avgTime ?? 0;
    const bVal = b.count ?? b.avgTime ?? 0;
    return bVal - aVal;
  });

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-medium text-md mb-2">{title}</h3>

      {sortedItems.length === 0 ? (
        <p className="text-gray-500 italic">No data available</p>
      ) : (
        <ul className="space-y-1 text-sm text-gray-700">
          {sortedItems.map((item, i) => (
            <li key={i} className="flex justify-between">
              <span>
                {format === "bool"
                  ? item._id
                    ? "Logged In"
                    : "Guest"
                  : item._id}
              </span>
              <span>
                {format === "ms"
                  ? `${Math.round((item.avgTime ?? 0) / 1000)} sec`
                  : item.count ?? Math.round(item.avgTime ?? 0)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
