import { describe, it, expect } from 'vitest';
import { filterPlaces } from './filter';
import { places } from './places';

describe('filterPlaces', () => {
	it('returns every place when the search is empty', () => {
		const result = filterPlaces(places, '');
		expect(result).toHaveLength(10);
	});

	it('returns every place when the search is only spaces', () => {
		const result = filterPlaces(places, '  ');
		expect(result).toHaveLength(10);
	});
	it('ignores capital letters', () => {
		const result = filterPlaces(places, 'DUR');
		const name = result.map((place) => place.name);
		expect(name).toContain('Durham');
	});
	it('matches the area as well as the name', () => {
		const result = filterPlaces(places, 'northumberland');
		expect(result).toHaveLength(4);
	});

	it('returns an empty list when nothing matches', () => {
		const result = filterPlaces(places, 'xyz');
		expect(result).toEqual([]);
	});
});
