import { UAParser } from 'ua-parser-js';

export function getDeviceInfo() {
  if (typeof window === 'undefined') return {};
  const parser = new UAParser();
  return parser.getResult();
}
