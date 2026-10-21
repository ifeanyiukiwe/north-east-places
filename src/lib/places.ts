export type Place = {
	id: string;
	name: string;
	area: string;
	lat: number;
	lng: number;
};

export const places: Place[] = [
	{
		id: 'newcastle',
		name: 'Newcastle upon Tyne',
		area: 'Tyne and Wear',
		lat: 54.9783,
		lng: -1.6178
	},
	{ id: 'sunderland', name: 'Sunderland', area: 'Tyne and Wear', lat: 54.9069, lng: -1.3838 },
	{ id: 'durham', name: 'Durham', area: 'County Durham', lat: 54.7761, lng: -1.5733 },
	{ id: 'darlington', name: 'Darlington', area: 'County Durham', lat: 54.5236, lng: -1.5595 },
	{ id: 'hartlepool', name: 'Hartlepool', area: 'County Durham', lat: 54.6863, lng: -1.2129 },
	{
		id: 'middlesbrough',
		name: 'Middlesbrough',
		area: 'North Yorkshire',
		lat: 54.5742,
		lng: -1.235
	},
	{ id: 'morpeth', name: 'Morpeth', area: 'Northumberland', lat: 55.168, lng: -1.688 },
	{ id: 'hexham', name: 'Hexham', area: 'Northumberland', lat: 54.9719, lng: -2.101 },
	{ id: 'alnwick', name: 'Alnwick', area: 'Northumberland', lat: 55.413, lng: -1.706 },
	{ id: 'berwick', name: 'Berwick-upon-Tweed', area: 'Northumberland', lat: 55.77, lng: -2.007 }
];
