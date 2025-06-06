export function trackAction(action: string) {
  fetch("https://e-backend-2-hrwb.onrender.com/track/action", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ action }),
  });
}
