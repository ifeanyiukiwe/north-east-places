<script lang="ts">
	import { onMount } from 'svelte';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import type { Place } from '#lib/places';

	// Props passed in from the page (Svelte 5 "runes" syntax)
	let {
		places,
		selectedId,
		onSelect
	}: {
		places: Place[];
		selectedId: string | null;
		onSelect: (id: string) => void;
	} = $props();

	// The <div> the map will be drawn into
	let container: HTMLDivElement;

	// NEW: the map now lives up here, so the $effect below can reach it
	let map = $state.raw<import('maplibre-gl').Map>();

	// NEW: look up any marker by place id, e.g. markers['durham']
	const markers: Record<string, import('maplibre-gl').Marker> = {};

	onMount(() => {
		// (the old "let map" line has been removed from here)

		(async () => {
			// Load MapLibre only in the browser (it needs `window`)
			const maplibregl = await import('maplibre-gl');

			const newMap = new maplibregl.Map({
				container,
				style: 'https://tiles.openfreemap.org/styles/liberty',
				center: [-1.65, 55.0], // [longitude, latitude]
				zoom: 7.5
			});

			newMap.addControl(new maplibregl.NavigationControl(), 'top-right');

			for (const place of places) {
				// NEW: keep the marker in a variable instead of chaining straight to addTo
				const marker = new maplibregl.Marker()
					.setLngLat([place.lng, place.lat])
					.setPopup(new maplibregl.Popup().setText(`${place.name}, ${place.area}`))
					.addTo(newMap);

				// NEW: store it, and tell the page when it's clicked
				markers[place.id] = marker;
				marker.getElement().addEventListener('click', () => onSelect(place.id));
			}

			const bounds = new maplibregl.LngLatBounds();
			for (const place of places) bounds.extend([place.lng, place.lat]);
			newMap.fitBounds(bounds, { padding: 60 });

			// NEW: only hand the map to the rest of the component once it's set up
			map = newMap;
		})();

		// Clean up when the component is removed
		return () => map?.remove();
	});

	// NEW: whenever selectedId changes, fly to that place and open its popup
	$effect(() => {
		if (!map || !selectedId) return;

		const place = places.find((p) => p.id === selectedId);
		if (!place) return;

		map.flyTo({ center: [place.lng, place.lat], zoom: 11 });

		for (const [id, marker] of Object.entries(markers)) {
			const isOpen = marker.getPopup()?.isOpen();
			if (id === selectedId && !isOpen) marker.togglePopup();
			if (id !== selectedId && isOpen) marker.togglePopup();
		}
	});
</script>

<div
	bind:this={container}
	class="h-[500px] w-full rounded border border-gray-300"
	role="region"
	aria-label="Map of places in North East England. The same places are listed beside the map."
></div>
