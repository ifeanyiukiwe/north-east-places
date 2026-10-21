<script lang="ts">
	import Map from '#lib/components/Map.svelte';
	import { places } from '#lib/places';
	import PlaceList from '#lib/components/PlaceList.svelte';
	import { filterPlaces } from '#lib/filter';
	let selectedId = $state<string | null>(null);
	let query = $state('');
	const filteredPlaces = $derived(filterPlaces(places, query));
	function onSelect(id: string) {
		selectedId = id;
	}
</script>

<main class="mx-auto max-w-6xl p-6">
	<h1 class="mb-4 text-3xl font-bold">North East Places</h1>
	<div class="grid gap-6 md:grid-cols-[1fr_280px]">
		<Map {places} {selectedId} {onSelect} />

		<div class="flex flex-col gap-4">
			<div>
				<label for="place-search" class="mb-1 block font-semibold">Search places</label>
				<input
					id="place-search"
					type="search"
					bind:value={query}
					autocomplete="off"
					class="w-full rounded border border-gray-500 p-2"
				/>
			</div>

			<PlaceList places={filteredPlaces} {selectedId} {onSelect} />
		</div>
	</div>
</main>
