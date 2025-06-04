// utils/session.ts
import { v4 as uuidv4 } from 'uuid';

export function getSessionId(): string {
  if (typeof window === 'undefined') return '';

  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
}
