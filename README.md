# GlobeTrax 🌍

Your world, mapped. A shareable travel profile built around an interactive 3D globe.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## What's here (frontend only)

- **Rotating 3D globe** (react-globe.gl / three.js) with night-earth texture and atmosphere glow
- **Glowing clusters** for visited locations — pink = favorites, blue = everything else
- **Animated travel routes** arcing between destinations
- **Timeline slider** — drag to replay travels through 2019 → now
- **Location panel** — click any point to fly to it and browse its photo grid
- **Stats bar** — countries, cities, national parks, miles, photos
- **Profile header** with shareable `globetrax.com/kyle` link

All data is mocked in `src/data/mockData.js` (placeholder photos via picsum.photos). Swap that file for a real API when you build the backend.

## Structure

```
src/
├── App.jsx                 # Layout + state (selection, timeline filter)
├── data/mockData.js        # User, stats, locations, routes — replace with API
└── components/
    ├── GlobeView.jsx       # 3D globe: points, rings, arcs, fly-to
    ├── ProfileHeader.jsx   # Brand + profile card + share button
    ├── StatsBar.jsx        # Travel stats
    ├── TimelineSlider.jsx  # Year filter
    └── LocationPanel.jsx   # Photo grid drawer
```

## Ideas queued for later

EXIF auto-import, privacy controls, heatmap mode, collections, collaborative globes, landing page, upload flow.
