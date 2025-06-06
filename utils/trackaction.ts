// utils/trackAction.ts
export async function trackAction(action: string) {
  try {
    const res = await fetch("https://e-backend-2-hrwb.onrender.com/track/action", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ action }),
    });
    if (!res.ok) {
      const data = await res.json();
      console.error("Tracking action failed:", data.error || res.statusText);
    } else {
      console.log("Tracked action:", action);
    }
  } catch (err) {
    console.error("Error sending tracking action:", err);
  }
}
