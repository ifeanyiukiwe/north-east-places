import type { Place } from '#lib/places';

export function filterPlaces(places: Place[], query: string): Place[] {
	// your code here
	const search = query.trim().toLocaleLowerCase();
	if (search === '') return places;
	return places.filter(
		(place) =>
			place.name.toLocaleLowerCase().includes(search) ||
			place.area.toLocaleLowerCase().includes(search)
	);
}
