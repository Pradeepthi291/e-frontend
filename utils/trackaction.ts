export function trackAction(action: string) {
  fetch("http://localhost:5000/track/action", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ action }),
  });
}
