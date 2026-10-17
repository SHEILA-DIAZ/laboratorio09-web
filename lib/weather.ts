export const cities = { Tokyo: { lat: 35.6762, lon: 139.6503 }, 'New York': { lat: 40.7128, lon: -74.006 }, London: { lat: 51.5074, lon: -0.1278 }, Sydney: { lat: -33.8688, lon: 151.2093 } };
export function weatherUrl(lat: number, lon: number) { return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`; }
