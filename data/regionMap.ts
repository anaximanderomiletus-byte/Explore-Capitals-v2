/**
 * Lightweight country ID to region mapping
 * This is extracted from constants.ts to avoid loading the full 92KB file
 * on every page load through UserContext
 */
export const COUNTRY_REGIONS: Record<string, string> = {
  '1': 'Asia', '2': 'Europe', '3': 'Africa', '4': 'Europe', '5': 'Africa',
  '6': 'North America', '7': 'South America', '8': 'Asia', '9': 'Oceania', '10': 'Europe',
  '11': 'Asia', '12': 'North America', '13': 'Asia', '14': 'Asia', '15': 'North America',
  '16': 'Europe', '17': 'Europe', '18': 'North America', '19': 'Africa', '20': 'Asia',
  '21': 'South America', '22': 'Europe', '23': 'Africa', '24': 'South America', '25': 'Asia',
  '26': 'Europe', '27': 'Africa', '28': 'Africa', '29': 'Africa', '30': 'Asia',
  '31': 'Africa', '32': 'North America', '33': 'Africa', '34': 'Africa', '35': 'South America',
  '36': 'Asia', '37': 'South America', '38': 'Africa', '39': 'Africa', '40': 'Africa',
  '41': 'North America', '42': 'Africa', '43': 'Europe', '44': 'North America', '45': 'Europe',
  '46': 'Europe', '47': 'Europe', '48': 'Africa', '49': 'North America', '50': 'North America',
  '51': 'Asia', '52': 'South America', '53': 'Africa', '54': 'North America', '55': 'Africa',
  '56': 'Africa', '57': 'Europe', '58': 'Africa', '59': 'Africa', '60': 'Oceania',
  '61': 'Europe', '62': 'Europe', '63': 'Africa', '64': 'Africa', '65': 'Asia',
  '66': 'Europe', '67': 'Africa', '68': 'Europe', '69': 'North America', '70': 'North America',
  '71': 'Africa', '72': 'Africa', '73': 'South America', '74': 'North America', '75': 'North America',
  '76': 'Europe', '77': 'Europe', '78': 'Asia', '79': 'Asia', '80': 'Asia',
  '81': 'Asia', '82': 'Europe', '83': 'Asia', '84': 'Europe', '85': 'North America',
  '86': 'Asia', '87': 'Asia', '88': 'Asia', '89': 'Africa', '90': 'Oceania',
  '91': 'Asia', '92': 'Asia', '93': 'Asia', '94': 'Europe', '95': 'Asia',
  '96': 'Africa', '97': 'Africa', '98': 'Africa', '99': 'Europe', '100': 'Europe',
  '101': 'Europe', '102': 'Africa', '103': 'Africa', '104': 'Asia', '105': 'Asia',
  '106': 'Africa', '107': 'Europe', '108': 'Oceania', '109': 'Africa', '110': 'Africa',
  '111': 'North America', '112': 'Oceania', '113': 'Europe', '114': 'Europe', '115': 'Asia',
  '116': 'Europe', '117': 'Africa', '118': 'Africa', '119': 'Asia', '120': 'Africa',
  '121': 'Oceania', '122': 'Asia', '123': 'Europe', '124': 'Oceania', '125': 'North America',
  '126': 'Africa', '127': 'Africa', '128': 'Asia', '129': 'Europe', '130': 'Europe',
  '131': 'Asia', '132': 'Asia', '133': 'Oceania', '134': 'Asia', '135': 'North America',
  '136': 'Oceania', '137': 'South America', '138': 'South America', '139': 'Asia', '140': 'Europe',
  '141': 'Europe', '142': 'Asia', '143': 'Europe', '144': 'Europe', '145': 'Africa',
  '146': 'North America', '147': 'North America', '148': 'North America', '149': 'Oceania', '150': 'Europe',
  '151': 'Africa', '152': 'Asia', '153': 'Africa', '154': 'Europe', '155': 'Africa',
  '156': 'Africa', '157': 'Asia', '158': 'Europe', '159': 'Europe', '160': 'Oceania',
  '161': 'Africa', '162': 'Africa', '163': 'Asia', '164': 'Africa', '165': 'Europe',
  '166': 'Asia', '167': 'Africa', '168': 'South America', '169': 'Europe', '170': 'Europe',
  '171': 'Asia', '172': 'Asia', '173': 'Africa', '174': 'Asia', '175': 'Africa',
  '176': 'Oceania', '177': 'North America', '178': 'Africa', '179': 'Asia', '180': 'Asia',
  '181': 'Oceania', '182': 'Africa', '183': 'Europe', '184': 'Asia', '185': 'Europe',
  '186': 'North America', '187': 'South America', '188': 'Asia', '189': 'Oceania', '190': 'Europe',
  '191': 'South America', '192': 'Asia', '193': 'Asia', '194': 'Africa', '195': 'Africa'
};

// Helper function to get region by country ID
export const getCountryRegion = (countryId: string): string | undefined => {
  return COUNTRY_REGIONS[countryId];
};
