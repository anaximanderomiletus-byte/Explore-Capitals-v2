
export const COUNTRY_ALIASES: Record<string, string[]> = {
  '1': ['AFG'], // Afghanistan
  '3': ['DZA'], // Algeria
  '5': ['AGO'], // Angola
  '6': ['ATG'], // Antigua and Barbuda
  '7': ['ARG'], // Argentina
  '8': ['ARM'], // Armenia
  '9': ['AU', 'AUS'], // Australia
  '10': ['AUT'], // Austria
  '11': ['AZE'], // Azerbaijan
  '12': ['BHS'], // Bahamas
  '13': ['BHR'], // Bahrain
  '14': ['BGD'], // Bangladesh
  '15': ['BRB'], // Barbados
  '16': ['BLR'], // Belarus
  '17': ['BEL'], // Belgium
  '18': ['BLZ'], // Belize
  '19': ['BEN'], // Benin
  '20': ['BTN'], // Bhutan
  '21': ['BOL'], // Bolivia
  '22': ['BIH', 'Bosnia'], // Bosnia and Herzegovina
  '23': ['BWA'], // Botswana
  '24': ['BRA', 'Brasil'], // Brazil
  '25': ['BRN'], // Brunei
  '26': ['BGR'], // Bulgaria
  '27': ['BFA'], // Burkina Faso
  '28': ['BDI'], // Burundi
  '29': ['CPV', 'Cape Verde'], // Cabo Verde
  '30': ['KHM'], // Cambodia
  '31': ['CMR'], // Cameroon
  '32': ['CA', 'CAN'], // Canada
  '33': ['CAF'], // Central African Republic
  '34': ['TCD'], // Chad
  '35': ['CHL'], // Chile
  '36': ['CHN', 'PRC', 'Peoples Republic of China'], // China
  '37': ['COL'], // Colombia
  '38': ['COM'], // Comoros
  '39': ['COG', 'Congo', 'Congo-Brazzaville'], // Republic of the Congo
  '40': ['COD', 'DRC', 'Democratic Republic of the Congo', 'Congo-Kinshasa'], // DR Congo
  '41': ['CRI'], // Costa Rica
  '42': ['CIV', 'Ivory Coast'], // Côte d'Ivoire
  '43': ['HRV'], // Croatia
  '44': ['CUB'], // Cuba
  '45': ['CYP'], // Cyprus
  '46': ['CZE', 'Czech Republic'], // Czechia
  '47': ['DNK'], // Denmark
  '48': ['DJI'], // Djibouti
  '49': ['DMA'], // Dominica
  '50': ['DOM', 'Dominican Rep'], // Dominican Republic
  '51': ['TLS', 'East Timor'], // Timor-Leste
  '52': ['ECU'], // Ecuador
  '53': ['EGY'], // Egypt
  '54': ['SLV'], // El Salvador
  '55': ['GNQ'], // Equatorial Guinea
  '56': ['ERI'], // Eritrea
  '57': ['EST'], // Estonia
  '58': ['SWZ', 'Swaziland'], // Eswatini
  '59': ['ETH'], // Ethiopia
  '60': ['FJI'], // Fiji
  '61': ['FIN'], // Finland
  '62': ['FRA', 'French Republic'], // France
  '63': ['GAB'], // Gabon
  '64': ['GMB'], // Gambia
  '65': ['GEO'], // Georgia
  '66': ['DE', 'GER', 'Germany', 'Deutschland'], // Germany
  '67': ['GHA'], // Ghana
  '68': ['GRC'], // Greece
  '69': ['GRD'], // Grenada
  '70': ['GTM'], // Guatemala
  '71': ['GIN'], // Guinea
  '72': ['GNB'], // Guinea-Bissau
  '73': ['GUY'], // Guyana
  '74': ['HTI'], // Haiti
  '75': ['HND'], // Honduras
  '76': ['HUN'], // Hungary
  '77': ['ISL'], // Iceland
  '78': ['IND', 'Bharat'], // India
  '79': ['IDN', 'Indo'], // Indonesia
  '80': ['IRN'], // Iran
  '81': ['IRQ'], // Iraq
  '82': ['IE', 'IRL', 'Eire'], // Ireland
  '83': ['ISR'], // Israel
  '84': ['ITA'], // Italy
  '85': ['JAM'], // Jamaica
  '86': ['JP', 'JPN', 'Nippon'], // Japan
  '87': ['JOR'], // Jordan
  '88': ['KAZ'], // Kazakhstan
  '89': ['KEN'], // Kenya
  '90': ['KIR'], // Kiribati
  '91': ['KWT'], // Kuwait
  '92': ['KGZ'], // Kyrgyzstan
  '93': ['LAO'], // Laos
  '94': ['LVA'], // Latvia
  '95': ['LBN'], // Lebanon
  '96': ['LSO'], // Lesotho
  '97': ['LBR'], // Liberia
  '98': ['LBY'], // Libya
  '99': ['LIE'], // Liechtenstein
  '100': ['LTU'], // Lithuania
  '101': ['LUX'], // Luxembourg
  '102': ['MDG'], // Madagascar
  '103': ['MWI'], // Malawi
  '104': ['MYS', 'Malay'], // Malaysia
  '105': ['MDV'], // Maldives
  '106': ['MLI'], // Mali
  '107': ['MLT'], // Malta
  '108': ['MHL'], // Marshall Islands
  '109': ['MRT'], // Mauritania
  '110': ['MUS'], // Mauritius
  '111': ['MX', 'MEX', 'Mexico'], // Mexico
  '112': ['FSM', 'Federated States of Micronesia'], // Micronesia
  '113': ['MDA'], // Moldova
  '114': ['MCO'], // Monaco
  '115': ['MNG'], // Mongolia
  '116': ['MNE'], // Montenegro
  '117': ['MAR'], // Morocco
  '118': ['MOZ'], // Mozambique
  '119': ['MMR', 'Burma'], // Myanmar
  '120': ['NAM'], // Namibia
  '121': ['NRU'], // Nauru
  '122': ['NPL'], // Nepal
  '123': ['NL', 'NLD', 'Holland'], // Netherlands
  '124': ['NZ', 'NZL'], // New Zealand
  '125': ['NIC'], // Nicaragua
  '126': ['NER'], // Niger
  '127': ['NGA'], // Nigeria
  '128': ['PRK', 'DPRK', 'North Korea'], // North Korea
  '129': ['MKD', 'Macedonia', 'North Macedonia'], // North Macedonia
  '130': ['NOR'], // Norway
  '131': ['OMN'], // Oman
  '132': ['PAK'], // Pakistan
  '133': ['PLW'], // Palau
  '134': ['PSE', 'Palestine', 'State of Palestine'], // Palestine
  '135': ['PAN'], // Panama
  '136': ['PNG'], // Papua New Guinea
  '137': ['PRY'], // Paraguay
  '138': ['PER'], // Peru
  '139': ['PH', 'PHL', 'Philippines'], // Philippines
  '140': ['POL'], // Poland
  '141': ['PRT'], // Portugal
  '142': ['QAT'], // Qatar
  '143': ['ROU'], // Romania
  '144': ['RUS', 'Russia', 'Russian Federation', 'Soviet Union', 'USSR'], // Russia
  '145': ['RWA'], // Rwanda
  '146': ['KNA', 'St Kitts'], // Saint Kitts and Nevis
  '147': ['LCA', 'St Lucia'], // Saint Lucia
  '148': ['VCT', 'St Vincent'], // Saint Vincent and the Grenadines
  '149': ['WSM'], // Samoa
  '150': ['SMR'], // San Marino
  '151': ['STP', 'Sao Tome'], // São Tomé and Príncipe
  '152': ['SAU', 'Saudi'], // Saudi Arabia
  '153': ['SEN'], // Senegal
  '154': ['SRB'], // Serbia
  '155': ['SYC'], // Seychelles
  '156': ['SLE'], // Sierra Leone
  '157': ['SGP'], // Singapore
  '158': ['SVK', 'Slovakia'], // Slovakia
  '159': ['SVN'], // Slovenia
  '160': ['SLB'], // Solomon Islands
  '161': ['SOM'], // Somalia
  '162': ['ZA', 'ZAF'], // South Africa
  '163': ['KR', 'KOR', 'South Korea', 'Republic of Korea', 'ROK'], // South Korea
  '164': ['SSD'], // South Sudan
  '165': ['ES', 'ESP'], // Spain
  '166': ['LKA'], // Sri Lanka
  '167': ['SDN'], // Sudan
  '168': ['SUR'], // Suriname
  '169': ['SWE'], // Sweden
  '170': ['CH', 'CHE', 'Swiss'], // Switzerland
  '171': ['SYR'], // Syria
  '172': ['TJK'], // Tajikistan
  '173': ['TZA'], // Tanzania
  '174': ['THA'], // Thailand
  '175': ['TGO'], // Togo
  '176': ['TON'], // Tonga
  '177': ['TTO'], // Trinidad
  '178': ['TUN'], // Tunisia
  '179': ['TR', 'TUR', 'Turkiye'], // Turkey
  '180': ['TKM'], // Turkmenistan
  '181': ['TUV'], // Tuvalu
  '182': ['UGA'], // Uganda
  '183': ['UKR'], // Ukraine
  '184': ['UAE', 'Emirates'], // United Arab Emirates
  '185': ['UK', 'GB', 'GBR', 'United Kingdom', 'Britain', 'Great Britain', 'England', 'Scotland', 'Wales', 'Northern Ireland'], // United Kingdom
  '186': ['US', 'USA', 'United States', 'America', 'United States of America'], // United States
  '187': ['URY'], // Uruguay
  '188': ['UZB'], // Uzbekistan
  '189': ['VUT'], // Vanuatu
  '190': ['VAT', 'Vatican', 'Holy See'], // Vatican City
  '191': ['VEN'], // Venezuela
  '192': ['VNM'], // Vietnam
  '193': ['YEM'], // Yemen
  '194': ['ZMB'], // Zambia
  '195': ['ZWE'], // Zimbabwe
  'DF-1': ['TW', 'TWN', 'Republic of China', 'ROC'], // Taiwan
  'DF-2': ['XK', 'XKX'], // Kosovo
  'T-3': ['HK', 'HKG'], // Hong Kong
  'T-9': ['MO', 'MAC'], // Macau
  'T-2': ['GL', 'GRL'], // Greenland
  'T-1': ['PR', 'PRI'], // Puerto Rico
  'T-13': ['GI', 'GIB'], // Gibraltar
};
