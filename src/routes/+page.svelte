<script lang="ts">
	import Map from '#lib/components/Map.svelte';
	import { places } from '#lib/places';
</script>

<main class="mx-auto max-w-6xl p-6">
	<h1 class="mb-4 text-3xl font-bold">North East Places</h1>
	<Map {places} />
</main>
