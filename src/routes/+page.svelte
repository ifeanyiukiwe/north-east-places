<script lang="ts">
	import Map from '#lib/components/Map.svelte';
	import { places } from '#lib/places';
	import PlaceList from '#lib/components/PlaceList.svelte';
	let selectedId = $state<string | null>(null);
</script>

<main class="mx-auto max-w-6xl p-6">
	<h1 class="mb-4 text-3xl font-bold">North East Places</h1>
	<div class="grid gap-6 md:grid-cols-[1fr_280px]">
		<Map {places} />
		<PlaceList {places} {selectedId} onSelect={(id) => (selectedId = id)} />
	</div>
</main>
