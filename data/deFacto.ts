
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
    description: 'Officially the Republic of China, Taiwan is a self-governing democratic island separated from mainland China by the Taiwan Strait. It produces over 90% of the world\'s advanced semiconductors through companies like TSMC, making it pivotal to the global tech supply chain. Lush mountains, night markets, and a thriving arts scene define its cultural landscape.',
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
    description: 'Having declared independence from Serbia in 2008, Kosovo is a partially recognized state in the Balkans recognized by over 100 UN member countries. Its young population makes it one of Europe\'s most youthful nations, with a median age under 30. Ottoman-era mosques, medieval Serbian monasteries, and rugged mountain terrain shape its cultural and geographic identity.',
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
    description: 'One of the world\'s most sparsely populated territories, Western Sahara is a disputed region on Africa\'s northwest coast largely controlled by Morocco, with the Sahrawi independence movement seeking self-determination. Most of the terrain is flat, arid Saharan desert. The territory possesses significant phosphate reserves and rich Atlantic fishing grounds.',
    area: '266K', 
    currency: 'Moroccan dirham', 
    languages: ['Arabic', 'Spanish'], 
    gdp: '$900M', 
    timeZone: 'UTC+1', 
    callingCode: '+212', 
    driveSide: 'Right' 
  }
];
