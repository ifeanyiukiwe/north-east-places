<script lang="ts">
	import { onMount } from 'svelte';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import type { Place } from '#lib/places';

	// Props passed in from the page (Svelte 5 "runes" syntax)
	let { places }: { places: Place[] } = $props();

	// The <div> the map will be drawn into

	let container: HTMLDivElement;

	onMount(() => {
		let map: import('maplibre-gl').Map | undefined;

		(async () => {
			// Load MapLibre only in the browser (it needs `window`)
			const maplibregl = await import('maplibre-gl');

			map = new maplibregl.Map({
				container,
				style: 'https://tiles.openfreemap.org/styles/liberty',
				center: [-1.65, 55.0], // [longitude, latitude]
				zoom: 7.5
			});

			map.addControl(new maplibregl.NavigationControl(), 'top-right');

			for (const place of places) {
				new maplibregl.Marker()
					.setLngLat([place.lng, place.lat])
					.setPopup(new maplibregl.Popup().setText(`${place.name}, ${place.area}`))
					.addTo(map);
			}
			const bounds = new maplibregl.LngLatBounds();
			for (const place of places) bounds.extend([place.lng, place.lat]);
			map.fitBounds(bounds, { padding: 60 });
		})();

		// Clean up when the component is removed
		return () => map?.remove();
	});
</script>

<div
	bind:this={container}
	class="h-[500px] w-full rounded border border-gray-300"
	role="region"
	aria-label="Map of places in North East England. The same places are listed beside the map."
></div>
