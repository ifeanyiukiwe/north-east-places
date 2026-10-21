# North East Places

An accessible map of towns in North East England, built with SvelteKit and MapLibre GL JS.

Choose a place from the list or click a marker on the map, and the two stay in sync. A search box filters the list by town name or county.

**Live site:** _coming soon_

## Features

- Interactive map with markers and popups for 10 towns across Northumberland, Tyne and Wear, County Durham and North Yorkshire
- Two-way sync: selecting a place in the list flies the map to it and opens its popup; clicking a marker highlights the place in the list
- Search that matches the town name or the county, ignoring capital letters
- Results count announced to screen readers as you type

## Accessibility

A map on its own isn't usable with a keyboard or a screen reader, so every place on the map is also available in a list of real buttons beside it. The list is the equivalent alternative, not an afterthought.

- **Buttons, not clickable divs:** the list works with Tab and Enter out of the box
- **`aria-pressed`:** the selected place is announced as "pressed", so selection isn't shown by colour alone
- **Visible label on the search box:** not a placeholder, which disappears as you type
- **`aria-live="polite"` results count:** screen readers hear "3 places found" without losing their place
- **Empty state:** a clear message when nothing matches, instead of a blank space
- **Contrast:** the selected state uses white text on dark petrol, and input borders meet the 3:1 non-text contrast requirement
- **Reduced motion:** MapLibre skips the fly-to animation when the user's device is set to reduce motion

## Tech stack

- [SvelteKit](https://svelte.dev/docs/kit) with Svelte 5 runes (`$state`, `$derived`, `$effect`, `$props`)
- TypeScript
- [MapLibre GL JS](https://maplibre.org/) with [OpenFreeMap](https://openfreemap.org/) tiles (no API key needed)
- Tailwind CSS
- [Vitest](https://vitest.dev/) for unit tests

## How it works

The selected place is held in one piece of state on the page (`selectedId`) and passed down to both the map and the list, along with an `onSelect` callback. Neither component knows about the other.

The search logic lives in a plain TypeScript function, `filterPlaces` in `src/lib/filter.ts`, kept separate from the components so it can be unit tested on its own. The page uses `$derived` to recalculate the filtered list whenever the search changes.

## Testing

`src/lib/filter.spec.ts` has one test for each rule the search follows:

- an empty search returns every place
- a search of only spaces returns every place
- names match, ignoring capital letters
- counties match as well as names
- a search with no matches returns an empty list

To check the tests could catch a real bug, I removed the lower-casing from the function on purpose and confirmed the relevant tests failed.

## Running it locally

You'll need Node.js 22.17 or later.

```bash
npm install
npm run dev          # start the development server
npm run test:unit    # run the tests in watch mode
```

## Limitations and next steps

- The search filters the list only; the map always shows every place
- Place coordinates are approximate town centres
- The map tiles need an internet connection

## Credits

Map data © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors. Tiles by OpenFreeMap.
