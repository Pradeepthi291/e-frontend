import { useEffect, useState } from "react";

export default function TestFetchPage() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/admin/analytics", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
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
      <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
