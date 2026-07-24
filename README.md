# Memory Card Game

[Live Demo](https://memory-card-top-project.vercel.app)

This is a fast-paced memory card game built with React. I created this project to master React state management, asynchronous data fetching, and asset performance optimisation as part of The Odin Project's React curriculum.

The main goal was to build a game where players click cards without selecting the same item twice. Every click shuffles the deck, so you have to keep track of your choices while aiming for the highest score.

---

## Features

- **Dynamic Theme Selection**: Switch seamlessly between a static 'One Piece' theme and a dynamic 'Cat' theme that fetches live image data asynchronously.
- **Persistent Score Engine**: Tracks your current streak and automatically syncs your personal best score to `localStorage` so your record stays intact when you refresh.
- **Optimised Asset Pipeline**: Converts multi-megabyte UI graphics into compressed AVIF assets inside `src/assets/`, cutting initial load times down dramatically.
- **Accessible Native Controls**: Utilises semantic `<button>` elements with descriptive `aria-label` tags and keyboard listeners, making the whole game fully playable via keyboard navigation.
- **Defensive End-Game Overlays**: Features modal win and loss screens that blur the backdrop and disable underlying card buttons to prevent ghost clicks or keypresses during end states.

---

## What I Learned

Building this game helped me move beyond basic React mechanics and focus on performance, accessibility, and stable state updates.

Key takeaways from this project include:

- **Asynchronous Logic with `useRef`**: I solved state synchronisation bugs during API fetches by pairing `useRef` with `useState`. Using a ref to track the active theme inside asynchronous callbacks meant I could safely read the latest user selection without triggering extra re-renders or suffering from stale closures.
- **Asset Optimisation and Modern Formats**: I moved static graphics out of the `public/` directory and into `src/assets/` to take full advantage of Vite's build pipeline. By scaling images down to 2x display sizes and converting them to AVIF format, I reduced 4 MB graphics to under 80 kB with zero noticeable loss in visual quality.
- **Accessible Graphic Buttons**: I learned how to turn image-heavy interface elements into clean, accessible buttons. Stripping native browser styles using CSS resets allowed me to keep custom graphic styling while retaining native keyboard focus, hover transitions, and screen reader compatibility.
- **Predictable Event-Driven State**: Instead of relying on `useEffect` side-effects to manage win states and score checks, I moved the calculation logic directly inside event handlers. This kept the state predictable, prevented infinite render loops, and made the code much easier to debug.

---

## Acknowledgements

- This project is based on the [Memory Card assignment](https://www.theodinproject.com/lessons/node-path-react-new-memory-card) from The Odin Project.
- Cat images fetched via the Cat API.
- Custom fonts: 'Averia Libre', 'Inter', 'Courgette', and 'Merienda' hosted locally for fast rendering.
