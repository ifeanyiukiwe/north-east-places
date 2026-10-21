<script lang="ts">
	import type { Place } from '#lib/places';

	let {
		places,
		selectedId,
		onSelect
	}: {
		places: Place[];
		selectedId: string | null;
		onSelect: (id: string) => void;
	} = $props();
</script>

<section aria-labelledby="places-heading">
	<h2 id="places-heading" class="mb-3 text-xl font-bold">Places</h2>
	<ul class="flex flex-col gap-2">
		{#each places as place (place.id)}
			{@const isSelected = selectedId === place.id}

			<li>
				<button
					type="button"
					onclick={() => onSelect(place.id)}
					aria-pressed={isSelected}
					class={`w-full rounded border border-gray-300 p-3 text-left  ${isSelected ? 'bg-[#1f4e5f] text-white' : 'hover:bg-gray-100'}`}
				>
					<span class="block font-semibold">{place.name}</span>
					<span class={`block text-sm ${isSelected ? 'text-white' : 'text-gray-700'}`}
						>{place.area}</span
					>
				</button>
			</li>
		{/each}
	</ul>
</section>
