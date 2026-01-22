
import { Territory } from '../types';

export const DE_FACTO_COUNTRIES: Territory[] = [
  { 
    id: 'DF-1', 
    name: 'Taiwan', 
    sovereignty: 'Limited Recognition', 
    capital: 'Taipei', 
    population: '23.9M', 
    region: 'Asia', 
    flag: '🇹🇼', 
    lat: 25.0401, 
    lng: 121.5119, 
    description: 'A self-ruling island democracy in East Asia. It is a global leader in technology and chip manufacturing, with lush mountains and bustling night markets.', 
    area: '36.1K', 
    currency: 'New Taiwan dollar', 
    languages: ['Mandarin'], 
    gdp: '$790B', 
    timeZone: 'UTC+8', 
    callingCode: '+886', 
    driveSide: 'Right' 
  },
  { 
    id: 'DF-2', 
    name: 'Kosovo', 
    sovereignty: 'Limited Recognition', 
    capital: 'Pristina', 
    population: '1.8M', 
    region: 'Europe', 
    flag: '🇽🇰', 
    lat: 42.6639, 
    lng: 21.1634, 
    description: 'A landlocked country in the Balkans that declared independence from Serbia in 2008. It features rugged mountains and Ottoman-era architecture.', 
    area: '10.8K', 
    currency: 'Euro', 
    languages: ['Albanian', 'Serbian'], 
    borders: ['Serbia', 'North Macedonia', 'Albania', 'Montenegro'],
    gdp: '$9.4B', 
    timeZone: 'UTC+1', 
    callingCode: '+383', 
    driveSide: 'Right' 
  },
  { 
    id: 'T-42', 
    name: 'Western Sahara', 
    sovereignty: 'Disputed', 
    capital: 'Laayoune', 
    population: '576K', 
    region: 'Africa', 
    flag: '🇪🇭', 
    lat: 27.1500, 
    lng: -13.1990, 
    description: 'A disputed territory on the northwest coast and in the Maghreb region of North and West Africa. Mostly desert flatlands.', 
    area: '266K', 
    currency: 'Moroccan dirham', 
    languages: ['Arabic', 'Spanish'], 
    gdp: '$900M', 
    timeZone: 'UTC+1', 
    callingCode: '+212', 
    driveSide: 'Right' 
  }
];
