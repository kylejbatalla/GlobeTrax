// Mock data for the GlobeTrax profile page.
// Replace with real API/backend data later.

export const user = {
  name: 'Kyle Batalla',
  handle: 'kyle',
  avatar: 'https://i.pravatar.cc/150?img=12',
  bio: 'Chasing sunsets, national parks, and street food. 🌍',
  joined: 2018,
}

export const stats = {
  countries: 18,
  cities: 94,
  nationalParks: 14,
  milesTraveled: 42000,
  photos: 3127,
}

// Each location = one glowing cluster on the globe.
// photos use picsum placeholder images seeded per location.
const photo = (seed, i) => ({
  id: `${seed}-${i}`,
  url: `https://picsum.photos/seed/${seed}${i}/600/400`,
  thumb: `https://picsum.photos/seed/${seed}${i}/300/200`,
})

const photosFor = (seed, count) =>
  Array.from({ length: count }, (_, i) => photo(seed, i + 1))

export const locations = [
  { id: 'tokyo', city: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503, year: 2023, photoCount: 214, favorite: true, photos: photosFor('tokyo', 8) },
  { id: 'kyoto', city: 'Kyoto', country: 'Japan', lat: 35.0116, lng: 135.7681, year: 2023, photoCount: 127, favorite: true, photos: photosFor('kyoto', 8) },
  { id: 'osaka', city: 'Osaka', country: 'Japan', lat: 34.6937, lng: 135.5023, year: 2023, photoCount: 89, favorite: false, photos: photosFor('osaka', 6) },
  { id: 'monterey', city: 'Monterey', country: 'USA', lat: 36.6002, lng: -121.8947, year: 2019, photoCount: 64, favorite: false, photos: photosFor('monterey', 6) },
  { id: 'yosemite', city: 'Yosemite', country: 'USA', lat: 37.8651, lng: -119.5383, year: 2020, photoCount: 152, favorite: true, photos: photosFor('yosemite', 8) },
  { id: 'honolulu', city: 'Honolulu', country: 'USA', lat: 21.3069, lng: -157.8583, year: 2021, photoCount: 178, favorite: true, photos: photosFor('honolulu', 8) },
  { id: 'vancouver', city: 'Vancouver', country: 'Canada', lat: 49.2827, lng: -123.1207, year: 2019, photoCount: 73, favorite: false, photos: photosFor('vancouver', 6) },
  { id: 'paris', city: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522, year: 2022, photoCount: 196, favorite: true, photos: photosFor('paris', 8) },
  { id: 'rome', city: 'Rome', country: 'Italy', lat: 41.9028, lng: 12.4964, year: 2022, photoCount: 143, favorite: false, photos: photosFor('rome', 8) },
  { id: 'barcelona', city: 'Barcelona', country: 'Spain', lat: 41.3874, lng: 2.1686, year: 2022, photoCount: 118, favorite: false, photos: photosFor('barcelona', 6) },
  { id: 'reykjavik', city: 'Reykjavík', country: 'Iceland', lat: 64.1466, lng: -21.9426, year: 2024, photoCount: 167, favorite: true, photos: photosFor('reykjavik', 8) },
  { id: 'bangkok', city: 'Bangkok', country: 'Thailand', lat: 13.7563, lng: 100.5018, year: 2025, photoCount: 132, favorite: false, photos: photosFor('bangkok', 6) },
  { id: 'bali', city: 'Bali', country: 'Indonesia', lat: -8.3405, lng: 115.092, year: 2025, photoCount: 201, favorite: true, photos: photosFor('bali', 8) },
  { id: 'sydney', city: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093, year: 2024, photoCount: 96, favorite: false, photos: photosFor('sydney', 6) },
  { id: 'cusco', city: 'Cusco', country: 'Peru', lat: -13.5319, lng: -71.9675, year: 2021, photoCount: 108, favorite: true, photos: photosFor('cusco', 8) },
  { id: 'cairo', city: 'Cairo', country: 'Egypt', lat: 30.0444, lng: 31.2357, year: 2026, photoCount: 84, favorite: false, photos: photosFor('cairo', 6) },
]
