import { useEffect, useState } from "react";

export default function TestFetchPage() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // 1. Send Tracking Data (POST)
    fetch("https://e-backend-2-hrwb.onrender.com/api/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sessionId: "deepu-test-session",
        page: "/test-fetch",
        interactions: ["clicked:TryNow"],
        timeSpent: 2000,
        scroll: 500,
        device: "Mobile",
        ip: "test-ip"
      })
    })
      .then(() => {
        console.log("✅ Tracking sent!");
      })
      .catch((err) => {
        console.error("❌ Tracking failed: " + err.message);
      });

    // 2. Get Analytics Data (GET)
    fetch("https://e-backend-2-hrwb.onrender.com/admin/analytics", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed: " + res.status);
        return res.json();
      })
      .then(setData)
      .catch(err => setError(err.message));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Test Fetch</h1>
      {error && <p className="text-red-500">Error: {error}</p>}
      <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
