import { getSessionId } from './session';
import { getDeviceInfo } from './deviceInfo';

export async function sendTrackingData(interactions: any[], userId = '', isLoggedIn = false) {
  const sessionId = getSessionId();
  const deviceInfo = getDeviceInfo();

  const payload = {
    sessionId,
    userId,
    isLoggedIn,
    deviceInfo,
    interactions,
  };

  try {
    const res = await fetch('http://localhost:5000/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Tracking failed');
    return data;
  } catch (err) {
    console.error('Tracking error:', err);
  }
}
