import { TourData } from "../../types";

export const toursI: Record<string, TourData> = {
  "Iceland": {
    tourTitle: "The Land of Fire and Ice",
    introText: "Geysers shoot boiling water into the freezing air of the valley. Watch the northern lights dance above the jagged volcanic rock.",
    stops: [
      {
        stopName: "The Great Geysir",
        imageKeyword: "The Great Geysir",
        description: [
          "Located in the Haukadalur Valley, this geothermal field is the home of the original \"Geysir,\" the hot spring that gave its name to all other geysers in the world. While the Great Geysir is mostly dormant today, its neighbor Strokkur is very reliable.",
          "Strokkur erupts every 6 to 10 minutes, blasting boiling water up to 20 meters (65 feet) into the air. Visitors gather around the roped-off perimeter, holding their cameras ready for the massive blue bubble that forms just seconds before the explosion.",
          "The water smells strongly of sulfur (rotten eggs) due to the geothermal activity below. The ground is colored red, yellow, and green by minerals and heat-loving algae that thrive in the steaming runoff channels."
        ],
        question: "Which hot spring gave the English word \"geyser\" its name?",
        options: [
          "The Great Geysir.",
          "Old Faithful.",
          "Steamboat Geyser.",
          "Pohutu."
        ],
        answer: "The Great Geysir.",
        explanation: "Though now dormant, it was the first geyser described in printed sources, lending its name to the phenomenon globally."
      },
      {
        stopName: "Reynisfjara Black Sand Beach",
        imageKeyword: "Reynisfjara Black Sand Beach",
        description: [
          "This is the most famous beach in Iceland, but it is not for swimming. The sand is jet black, formed by lava flowing into the ocean and shattering into tiny fragments upon cooling.",
          "The cliffside features stunning hexagonal basalt columns that look like a giant pipe organ carved by hand. These shapes form naturally when lava cools and contracts, cracking into perfect geometric pillars.",
          "The ocean here is incredibly dangerous due to \"sneaker waves.\" These are massive waves that appear suddenly without warning, surging far up the beach and dragging unsuspecting tourists into the freezing, turbulent Atlantic."
        ],
        question: "What creates the perfect hexagonal shape of the basalt columns?",
        options: [
          "Cooling lava.",
          "Erosion by wind.",
          "Man-made carving.",
          "Fossilized trees."
        ],
        answer: "Cooling lava.",
        explanation: "As thick lava cools, it contracts and cracks into geometric pillars, usually hexagons."
      },
      {
        stopName: "Jökulsárlón Glacier Lagoon",
        imageKeyword: "Jökulsárlón Glacier Lagoon",
        description: [
          "This massive lagoon sits at the base of the Breiðamerkurjökull glacier. As the glacier melts, large chunks of blue ice break off and float in the lagoon before drifting out to sea.",
          "The icebergs wash up on the nearby black sand beach, known as \"Diamond Beach.\" The contrast between the crystal-clear, glistening ice chunks and the matte black sand makes them look like giant diamonds scattered on velvet.",
          "The lagoon is actually becoming larger every year due to climate change. It has quadrupled in size since the 1970s as the glacier retreats, making it the deepest lake in Iceland."
        ],
        question: "What is the nickname for the black beach where icebergs wash ashore?",
        options: [
          "Diamond Beach.",
          "Crystal Coast.",
          "Pearl Shore.",
          "Ice Bay."
        ],
        answer: "Diamond Beach.",
        explanation: "The chunks of clear glacial ice sitting on the black sand resemble sparkling diamonds."
      },
      {
        stopName: "Thingvellir National Park",
        imageKeyword: "Thingvellir National Park",
        description: [
          "This is one of the only places on Earth where you can see the Mid-Atlantic Ridge above sea level. It is the meeting point of the North American and Eurasian tectonic plates, which are slowly pulling apart by about 2 centimeters per year.",
          "It is historically significant as the site of the Althing, the world's oldest surviving parliament. Established in 930 AD, Viking chieftains gathered here in the rift valley to make laws and settle disputes in an open-air assembly.",
          "The park contains the Silfra Fissure, a crack between the continents filled with glacial meltwater. The water is filtered through lava rock for decades, making it so clear that divers have visibility of over 100 meters."
        ],
        question: "Which two tectonic plates meet (and pull apart) at Thingvellir?",
        options: [
          "North American and Eurasian plates.",
          "African and South American plates.",
          "Pacific and Nazca plates.",
          "Australian and Indian plates."
        ],
        answer: "North American and Eurasian plates.",
        explanation: "The rift valley is the physical gap created by these two massive continents drifting away from each other."
      },
      {
        stopName: "The Blue Lagoon",
        imageKeyword: "The Blue Lagoon",
        description: [
          "This world-famous spa is actually man-made. The water is runoff from a nearby geothermal power plant; it is pumped up from deep underground, used to generate electricity, and then fed into the lagoon for bathing.",
          "The water has a unique milky-blue color due to its high silica content. The silica forms a soft white mud on the bottom of the lagoon, which bathers apply to their faces as a skin mask.",
          "Because the water is a mix of freshwater and seawater heated to 39°C (102°F), it is rich in minerals and algae. This unique composition means that common bacteria cannot survive in the water, keeping the lagoon naturally clean."
        ],
        question: "What mineral gives the Blue Lagoon its milky-blue color and white mud?",
        options: [
          "Silica.",
          "Copper.",
          "Sulfur.",
          "Iron."
        ],
        answer: "Silica.",
        explanation: "The dissolved silica reflects sunlight to create the blue color and precipitates to form the white mud."
      }
    ]
  },
  "India": {
    tourTitle: "The Land of Colors",
    introText: "The white marble dome of the Taj Mahal glows in the morning light. Lose yourself in the colors and spices of a busy market.",
    stops: [
      {
        stopName: "The Taj Mahal",
        imageKeyword: "The Taj Mahal",
        description: [
          "Commissioned in 1632 by the Mughal emperor Shah Jahan, this mausoleum houses the tomb of his favorite wife, Mumtaz Mahal. It is widely considered the most beautiful building in the world and the finest example of Mughal architecture.",
          "The structure is built entirely of white marble inlaid with semi-precious stones like jade, crystal, and turquoise. The marble changes color depending on the light, appearing pink at sunrise, blinding white at noon, and golden by moonlight.",
          "Legend says Shah Jahan planned to build a matching \"Black Taj Mahal\" for himself across the river. However, he was overthrown by his son before he could begin construction and was imprisoned in a fort with a view of his wife's tomb."
        ],
        question: "Who commissioned the building of the Taj Mahal?",
        options: [
          "Emperor Shah Jahan.",
          "Akbar the Great.",
          "Aurangzeb.",
          "Mahatma Gandhi."
        ],
        answer: "Emperor Shah Jahan.",
        explanation: "He built it as a monument of eternal love for his deceased wife, Mumtaz Mahal."
      },
      {
        stopName: "Varanasi",
        imageKeyword: "Varanasi Ghats",
        description: [
          "Varanasi is one of the oldest continuously inhabited cities in the world. It is the spiritual heart of India, where millions of pilgrims come to wash away their sins in the sacred waters of the Ganges River.",
          "The riverfront is lined with \"ghats\" (stone steps). Some are used for bathing and prayer, while others, like Manikarnika Ghat, are used exclusively for cremation ceremonies, where funeral pyres burn 24 hours a day, 365 days a year.",
          "Every evening, the Ganga Aarti ceremony takes place. Priests perform a synchronized ritual using large brass lamps and incense to honor the river goddess, creating a mesmerizing display of fire and chanting."
        ],
        question: "What are the stone steps leading down to the river called?",
        options: [
          "Ghats.",
          "Stupas.",
          "Mandirs.",
          "Ashrams."
        ],
        answer: "Ghats.",
        explanation: "The riverfront is divided into these stepped sections, each serving a different religious or daily function."
      },
      {
        stopName: "Hawa Mahal",
        imageKeyword: "Hawa Mahal",
        description: [
          "Known as the \"Palace of Winds,\" this unique five-story structure is famous for its 953 small windows (Jharokhas). It was built in 1799 from red and pink sandstone, which gives Jaipur its nickname, \"The Pink City.\"",
          "It is not a traditional palace but essentially a massive screen wall. It was built so the royal ladies could watch street festivals and daily life without being seen by the public, adhering to the strict purdah (seclusion) customs of the time.",
          "The honeycomb design acts as a natural air conditioner. The shape of the windows accelerates the wind passing through them (the Venturi effect), keeping the interior cool even during the scorching Rajasthan summers."
        ],
        question: "Why does the Hawa Mahal have 953 small windows?",
        options: [
          "To allow royal women to watch the street unseen.",
          "To shoot arrows at enemies.",
          "To grow plants.",
          "To catch birds."
        ],
        answer: "To allow royal women to watch the street unseen.",
        explanation: "The windows allowed the women to observe the city while maintaining their modesty and seclusion."
      },
      {
        stopName: "Kerala Backwaters",
        imageKeyword: "Kerala Backwaters",
        description: [
          "The Backwaters are a massive network of 900 kilometers of interconnected canals, rivers, and lakes running parallel to the Arabian Sea. It is a unique ecosystem where freshwater from the rivers meets seawater from the ocean.",
          "The traditional way to explore is by \"Kettuvallam\" (houseboat). These boats were originally grain barges used to transport rice but have been converted into floating hotels made entirely of wood and bamboo held together with coir knots—not a single nail is used.",
          "Life here happens on the water. You will see children going to school by canoe, floating supermarkets selling groceries, and farmers tending to paddy fields that lie below sea level, protected by earthen dikes."
        ],
        question: "What distinctive feature holds the traditional Kettuvallam houseboats together?",
        options: [
          "Coir knots (coconut fiber ropes).",
          "Iron nails.",
          "Superglue.",
          "Steel bolts."
        ],
        answer: "Coir knots (coconut fiber ropes).",
        explanation: "The planks are stitched together with rope; no metal nails or screws are used in the hull."
      },
      {
        stopName: "Hampi",
        imageKeyword: "Hampi Stone Chariot",
        description: [
          "This UNESCO World Heritage site was once the capital of the Vijayanagara Empire. In the 1500s, it was the second-largest city in the world (after Beijing), incredibly wealthy and filled with grand temples and markets.",
          "The landscape is surreal, covered in millions of giant granite boulders that look like they were stacked by giants. The ancient builders used this local stone to construct everything, including the famous Stone Chariot, which is actually a shrine with stone wheels that could originally rotate.",
          "The city was destroyed and abandoned in 1565 after a defeat in battle. It remains a \"ghost city\" of stunning ruins, including the Musical Pillars of the Vithala Temple, which are carved to sound like different instruments when tapped."
        ],
        question: "In the 16th century, Hampi was the capital of which wealthy empire?",
        options: [
          "The Vijayanagara Empire.",
          "The Mughal Empire.",
          "The British Empire.",
          "The Gupta Empire."
        ],
        answer: "The Vijayanagara Empire.",
        explanation: "It was a prosperous Hindu empire that dominated South India before the city was sacked."
      }
    ]
  },
  "Indonesia": {
    tourTitle: "The Emerald of the Equator",
    introText: "Komodo dragons roam the beaches of their isolated volcanic islands. Discover the spiritual calm of a temple hidden in the mist.",
    stops: [
      {
        stopName: "Komodo National Park",
        imageKeyword: "Komodo National Park",
        description: [
          "This national park is the only place in the world to find the Komodo Dragon in the wild. These are the world's largest living lizards, growing up to 3 meters (10 feet) long and weighing as much as a human.",
          "The dragons are apex predators with a venomous bite. They hunt deer and buffalo by ambushing them, delivering a bite that prevents the blood from clotting, and then patiently tracking the weakened animal until it dies.",
          "The park also includes Pink Beach (Pantai Merah). The sand gets its rare pink hue from microscopic red coral animals called Foraminifera, which mix with the white sand to create a cotton-candy color."
        ],
        question: "What gives the Pink Beach in Komodo National Park its color?",
        options: [
          "Red coral fragments (Foraminifera).",
          "Volcanic ash.",
          "Pollution.",
          "Pink quartz."
        ],
        answer: "Red coral fragments (Foraminifera).",
        explanation: "Microscopic red organisms mix with white sand to create the pink tint."
      },
      {
        stopName: "Borobudur Temple",
        imageKeyword: "Borobudur Temple",
        description: [
          "Located on the island of Java, this is the largest Buddhist temple in the world. Built in the 9th century, it consists of nine stacked platforms topped by a central dome, designed to represent the path to Nirvana.",
          "The structure contains 2,672 relief panels and 504 Buddha statues. The upper levels feature 72 bell-shaped stupas; if you look through the diamond-shaped holes, you can see a Buddha statue seated inside each one.",
          "The temple was abandoned and buried under volcanic ash and thick jungle for centuries. It was only rediscovered in 1814 by Sir Thomas Stamford Raffles, who heard rumors of a \"mountain of statues\" deep in the forest."
        ],
        question: "Borobudur holds the world record for being the largest temple of which religion?",
        options: [
          "Buddhism.",
          "Hinduism.",
          "Islam.",
          "Christianity."
        ],
        answer: "Buddhism.",
        explanation: "It is the single largest Buddhist monument on the planet."
      },
      {
        stopName: "Mount Bromo",
        imageKeyword: "Mount Bromo",
        description: [
          "Mount Bromo is an active somma volcano in East Java. It sits inside a massive \"Sea of Sand,\" a desolate, desert-like plain formed by an ancient super-eruption that blew the top off the original mountain.",
          "Visitors usually hike to the crater rim at sunrise. The landscape is often described as lunar or otherworldly, with the smoking cone of Bromo sitting next to the perfect cone of Mount Batok and the towering Mount Semeru in the background.",
          "The local Tengger people consider the mountain sacred. Every year during the Yadnya Kasada festival, they climb to the crater rim and throw offerings of fruit, rice, vegetables, and livestock into the smoking mouth of the volcano to appease the mountain gods."
        ],
        question: "What sits at the base of Mount Bromo?",
        options: [
          "The Sea of Sand.",
          "A large lake.",
          "A dense jungle.",
          "A city."
        ],
        answer: "The Sea of Sand.",
        explanation: "A vast, protected plain of volcanic sand surrounds the active cone."
      },
      {
        stopName: "Tegalalang Rice Terraces",
        imageKeyword: "Tegalalang Rice Terraces",
        description: [
          "Located near Ubud, these terraces are famous for their vibrant green color and dramatic slopes. They use the Subak system, a traditional Balinese cooperative irrigation method that dates back to the 9th century.",
          "The Subak system is not just about farming; it is a spiritual philosophy. Water is managed by temples, ensuring that it is shared fairly among all farmers, embodying the concept of Tri Hita Karana (harmony between people, nature, and God).",
          "The landscape is carved by hand. Farmers maintain the mud walls of the terraces manually to prevent erosion, creating a landscape that looks like a giant green staircase leading down the valley."
        ],
        question: "What is the name of the traditional Balinese irrigation system used here?",
        options: [
          "Subak.",
          "Paddy.",
          "Monsoon.",
          "Canal."
        ],
        answer: "Subak.",
        explanation: "It is a community-managed water system recognized by UNESCO for its cultural significance."
      },
      {
        stopName: "Raja Ampat Islands",
        imageKeyword: "Raja Ampat Islands",
        description: [
          "Located off the coast of West Papua, this archipelago is considered the global epicenter of marine biodiversity. It holds the record for the most fish species recorded on a single dive.",
          "The islands are famous for their karst topography. Thousands of jungle-covered limestone islets rise from the turquoise water, many undercut by the waves so they look like mushrooms floating on the sea.",
          "It is one of the few places to see the Birds of Paradise in the wild. Early explorers who saw the skins of these birds (which had their feet removed) believed they never landed and lived entirely in the air, feeding on heavenly dew."
        ],
        question: "Raja Ampat is world-famous among divers for having the highest recorded level of what?",
        options: [
          "Marine biodiversity.",
          "Salt content.",
          "Water temperature.",
          "Shark population."
        ],
        answer: "Marine biodiversity.",
        explanation: "The reefs here contain more species of coral and fish than anywhere else on Earth."
      }
    ]
  },
  "Iran": {
    tourTitle: "The Jewel of Persia",
    introText: "The ruins of Persepolis remind the world of the Persian Empire. Walk through the intricate tile work of a quiet mosque courtyard.",
    stops: [
      {
        stopName: "Persepolis",
        imageKeyword: "Persepolis",
        description: [
          "Founded by Darius the Great in 518 BC, this was the ceremonial capital of the Achaemenid Empire. It was designed to impress; delegates from all 23 nations of the empire came here to pay tribute to the \"King of Kings.\"",
          "The ruins feature the Gate of All Nations, guarded by massive Lamassu statues—bulls with the heads of bearded men and the wings of eagles. They were meant to ward off evil and represent the power of the empire.",
          "The city was destroyed by Alexander the Great in 330 BC. Historians still debate whether he burned it down accidentally during a drunken party or deliberately as revenge for the Persian burning of the Acropolis in Athens."
        ],
        question: "Which famous conqueror destroyed Persepolis in 330 BC?",
        options: [
          "Alexander the Great.",
          "Genghis Khan.",
          "Napoleon Bonaparte.",
          "Julius Caesar."
        ],
        answer: "Alexander the Great.",
        explanation: "His army looted and burned the palace complex, ending its era of glory."
      },
      {
        stopName: "Naqsh-e Jahan Square",
        imageKeyword: "Naqsh-e Jahan Square",
        description: [
          "This is the second-largest public square in the world (after Tiananmen Square). Built in the early 17th century, it was the center of the Safavid dynasty, designed to unite the three main components of power: the clergy (Mosque), the ruler (Palace), and the merchants (Bazaar).",
          "The square was originally used as a royal polo field. You can still see the original stone goalposts at either end of the plaza, where the Shah and his nobles played the sport 400 years ago.",
          "The acoustics in the Shah Mosque (located on the square) are legendary. Under the center of the main dome, a sound is reflected back up to 49 times, allowing a speaker to be heard clearly by everyone in the massive hall without a microphone."
        ],
        question: "What sport was originally played in the center of this massive square?",
        options: [
          "Polo.",
          "Cricket.",
          "Soccer.",
          "Archery."
        ],
        answer: "Polo.",
        explanation: "The square served as a royal stadium, and the original stone goalposts remain standing today."
      },
      {
        stopName: "Nasir al-Mulk Mosque",
        imageKeyword: "Nasir al-Mulk Mosque",
        description: [
          "Located in Shiraz, this mosque is famous for its kaleidoscope interior. The facade uses extensive pink tiles (rare in Islamic architecture), giving it the nickname \"The Pink Mosque.\"",
          "The magic happens in the morning. As the sun rises, light shines through the extensive stained-glass windows, projecting a dazzling array of rainbow patterns onto the Persian carpets covering the floor.",
          "It was built in the late 19th century during the Qajar dynasty. Unlike many mosques designed for external grandeur, this one was designed with a focus on the internal spiritual experience created by light and color."
        ],
        question: "What is the best time of day to visit the Pink Mosque to see the light effects?",
        options: [
          "Morning.",
          "Noon.",
          "Afternoon.",
          "Night."
        ],
        answer: "Morning.",
        explanation: "The sun hits the stained glass directly only in the early hours, creating the famous rainbow projection."
      },
      {
        stopName: "Yazd",
        imageKeyword: "Yazd Windcatchers",
        description: [
          "Yazd is a desert city built almost entirely of adobe (mud brick). To survive the blistering heat, the ancient engineers developed Badgirs (windcatchers)—tall towers that catch the slightest breeze and funnel it down into the house to cool the rooms below.",
          "It is the center of the Zoroastrian religion in Iran. The city houses the Atash Behram (Fire of Victory), a sacred flame that has been burning continuously since 470 AD, having been moved to safety multiple times over the centuries.",
          "The city also features \"Towers of Silence\" on the outskirts. These raised circular structures were used for sky burials, where the dead were left exposed to vultures, as Zoroastrians believed burying bodies would pollute the sacred earth."
        ],
        question: "What is the function of the Badgirs towers seen on the rooftops of Yazd?",
        options: [
          "Air conditioning (cooling).",
          "Religious prayer calls.",
          "Storing grain.",
          "Watchtowers."
        ],
        answer: "Air conditioning (cooling).",
        explanation: "They catch the wind to ventilate and cool the homes in the desert heat naturally."
      },
      {
        stopName: "The Lut Desert",
        imageKeyword: "The Lut Desert",
        description: [
          "The Lut Desert holds the record for the hottest surface temperature ever recorded on Earth: 70.7°C (159.3°F). It is so hot and dry that in the central parts, even bacteria cannot survive, leaving dead animals preserved but desiccated.",
          "The landscape is defined by the Kaluts—massive yardangs (sand castles) carved by the wind. These ridges can stand as tall as skyscrapers and stretch for miles, looking like the ruins of a phantom city.",
          "Despite the heat, it is a UNESCO World Heritage site. The extreme conditions create a landscape of incredible beauty, especially at sunset when the sand ridges turn deep shades of red and purple."
        ],
        question: "The Lut Desert holds the world record for what?",
        options: [
          "Hottest surface temperature on Earth.",
          "Driest place on Earth.",
          "Lowest point on Earth.",
          "Highest sand dunes."
        ],
        answer: "Hottest surface temperature on Earth.",
        explanation: "Satellite data recorded temperatures exceeding 70°C, making it the hottest place on the planet."
      }
    ]
  },
  "Iraq": {
    tourTitle: "The Cradle of Civilization",
    introText: "The Tigris and Euphrates rivers meet in the cradle of civilization. Stand before the ancient Ziggurat of Ur in the desert sand.",
    stops: [
      {
        stopName: "The Ziggurat of Ur",
        imageKeyword: "The Ziggurat of Ur",
        description: [
          "Located near the modern city of Nasiriyah, this massive structure is one of the best-preserved ziggurats in the world. Built around 2100 BC by King Ur-Nammu, it was a temple dedicated to Nanna, the moon god.",
          "The structure was originally part of a larger temple complex that served as the administrative center of the city of Ur. It is believed to be the biblical birthplace of Abraham, a patriarch of Judaism, Christianity, and Islam.",
          "It has been restored twice: once by the ancient King Nabonidus in the 6th century BC, and again by Saddam Hussein in the 1980s, who encased the lower layer in modern brick to protect the original ancient core."
        ],
        question: "The Ziggurat of Ur was a temple dedicated to which deity?",
        options: [
          "Nanna (the Moon God).",
          "Marduk.",
          "Ishtar.",
          "Enlil."
        ],
        answer: "Nanna (the Moon God).",
        explanation: "The Sumerians built the massive platform to bring the priests closer to the moon god."
      },
      {
        stopName: "Babylon",
        imageKeyword: "Babylon Ishtar Gate",
        description: [
          "Babylon was the largest city in the world between 1770 and 1670 BC. It was the home of the Hanging Gardens (one of the Seven Wonders) and the Tower of Babel, though both are now lost to history.",
          "The entrance to the inner city was the Ishtar Gate, a stunning blue structure decorated with golden dragons and bulls. While the original gate was taken to a museum in Berlin in the early 20th century, a reconstruction stands on the original site today.",
          "Alexander the Great died here in 323 BC. He planned to make Babylon the capital of his massive empire, but he fell ill and passed away in the palace of Nebuchadnezzar II before he could realize his vision."
        ],
        question: "Which famous ancient wonder was located in Babylon?",
        options: [
          "The Hanging Gardens.",
          "The Great Pyramid.",
          "The Colossus.",
          "The Lighthouse."
        ],
        answer: "The Hanging Gardens.",
        explanation: "Though no archaeological evidence has been found, it was famed as a terraced garden built by the king for his wife."
      },
      {
        stopName: "Erbil Citadel",
        imageKeyword: "Erbil Citadel",
        description: [
          "Rising 30 meters above the modern city, this citadel claims to be the oldest continuously inhabited settlement in the world, with a history stretching back at least 6,000 years.",
          "The mound itself is artificial. It was created by thousands of years of people building mud-brick houses on top of the ruins of previous houses, slowly raising the level of the city generation by generation.",
          "It has survived empires including the Sumerians, Assyrians, Mongols, and Ottomans. Today, one family is permanently employed to live there just to keep the \"continuously inhabited\" status alive while the rest is being renovated."
        ],
        question: "How was the hill that the Erbil Citadel sits on formed?",
        options: [
          "By layers of ruined buildings (human accumulation).",
          "It is a natural volcano.",
          "It was built by giants.",
          "It is a sand dune."
        ],
        answer: "By layers of ruined buildings (human accumulation).",
        explanation: "It is a \"tell,\" a mound created by millennia of civilizations building on top of the debris of the past."
      },
      {
        stopName: "The Mesopotamian Marshes",
        imageKeyword: "Mesopotamian Marshes",
        description: [
          "Known as the \"Venice of the Middle East,\" this vast wetland is located at the confluence of the Tigris and Euphrates rivers. It is the home of the Ma'dan (Marsh Arabs), who have lived here for 5,000 years.",
          "They build incredible architectural structures called Mudhif entirely out of reeds without using wood or nails. These cathedral-like guest houses are woven from the same reeds that grow in the water around them.",
          "The marshes were nearly destroyed in the 1990s when the government drained them to punish the locals for a rebellion. Since 2003, local activists have broken the dams, and the water—and the wildlife—has miraculously returned."
        ],
        question: "What are the traditional reed guest houses of the Marsh Arabs called?",
        options: [
          "Mudhif.",
          "Yurt.",
          "Igloo.",
          "Tipi."
        ],
        answer: "Mudhif.",
        explanation: "These large, arched structures are a hallmark of Sumerian-descended architecture in the marshes."
      },
      {
        stopName: "Great Mosque of Samarra",
        imageKeyword: "Great Mosque of Samarra",
        description: [
          "Built in the 9th century, this was once the largest mosque in the world. Its most famous feature is the Malwiya (\"The Twisted\") Minaret, a unique spiral tower that stands 52 meters (171 feet) tall.",
          "The design is unusual for a minaret because the spiral ramp is on the outside of the tower. There are no handrails, so the Muezzin (who calls the prayer) had to climb the steep, exposed spiral path five times a day.",
          "It is a symbol of the Abbasid Caliphate's power. At the time, Samarra was the capital of the Islamic world, and the sheer size of the tower was meant to demonstrate the dominance of the faith visible from miles away in the flat valley."
        ],
        question: "What is unique about the stairs of the Malwiya Minaret?",
        options: [
          "They spiral around the outside of the tower.",
          "They are inside.",
          "There are no stairs.",
          "They are made of wood."
        ],
        answer: "They spiral around the outside of the tower.",
        explanation: "Unlike most minarets with internal stairs, this one features an external spiral ramp."
      }
    ]
  },
  "Ireland": {
    tourTitle: "The Emerald Isle",
    introText: "The Cliffs of Moher drop hundreds of feet into the Atlantic surf. Listen to traditional fiddle music in a cozy village pub.",
    stops: [
      {
        stopName: "Cliffs of Moher",
        imageKeyword: "Cliffs of Moher",
        description: [
          "Rising 214 meters (702 feet) out of the Atlantic Ocean, these cliffs offer one of the most dramatic views in Europe. On a clear day, visitors can see the Aran Islands, the Maumturks, and the Twelve Pins mountain ranges in Connemara.",
          "The site is a major nesting ground for seabirds. Between April and July, the cliffs are home to one of the largest colonies of Atlantic Puffins in Ireland, who build their nests in grassy burrows on the cliff face.",
          "They have served as the backdrop for many famous films. Scenes for Harry Potter and the Half-Blood Prince and The Princess Bride (as the \"Cliffs of Insanity\") were filmed against this rugged coastline."
        ],
        question: "Which famous seabird nests in the grassy slopes of the cliffs?",
        options: [
          "The Atlantic Puffin.",
          "Seagulls.",
          "Pelicans.",
          "Albatross."
        ],
        answer: "The Atlantic Puffin.",
        explanation: "Thousands of these colorful birds nest here during the spring and summer months."
      },
      {
        stopName: "The Book of Kells",
        imageKeyword: "Book of Kells",
        description: [
          "Housed in the Old Library of Trinity College Dublin, this 9th-century manuscript is a masterpiece of calligraphy and insular art. It contains the four Gospels of the New Testament, lavishly decorated with colorful Celtic knotwork and figures.",
          "The \"Long Room\" of the library is an architectural marvel in itself. It is a 65-meter-long chamber filled with 200,000 of the library's oldest books and lined with marble busts of great philosophers and writers.",
          "Also displayed here is the \"Brian Boru Harp,\" which dates back to the 15th century. It is the oldest surviving harp in Ireland and served as the model for the emblem on Irish coins and the Guinness logo."
        ],
        question: "What national symbol of Ireland is preserved in the Long Room library?",
        options: [
          "The Brian Boru Harp.",
          "The Stone of Destiny.",
          "The Crown of Tara.",
          "St. Patrick's Staff."
        ],
        answer: "The Brian Boru Harp.",
        explanation: "This ancient instrument is the official national emblem of Ireland."
      },
      {
        stopName: "Newgrange",
        imageKeyword: "Newgrange",
        description: [
          "This prehistoric passage tomb is older than both Stonehenge and the Great Pyramids of Giza, dating back to 3200 BC. It consists of a massive circular mound with a stone passageway leading to a central burial chamber.",
          "The monument is a feat of ancient astronomy. A \"roof box\" above the entrance is perfectly aligned with the rising sun on the Winter Solstice (December 21st), allowing a beam of light to illuminate the inner chamber for just 17 minutes a year.",
          "The surrounding large kerbstones are carved with megalithic art. The most famous design is the triple spiral (triskele), which is carved deep into the entrance stone and remains one of the most recognizable symbols of ancient Ireland."
        ],
        question: "Newgrange is famous for its solar alignment with which annual event?",
        options: [
          "The Winter Solstice.",
          "The Summer Solstice.",
          "The Spring Equinox.",
          "The Harvest Moon."
        ],
        answer: "The Winter Solstice.",
        explanation: "The inner chamber is illuminated by the sun only on the shortest days of the year."
      },
      {
        stopName: "The Rock of Cashel",
        imageKeyword: "The Rock of Cashel",
        description: [
          "Rising from the flat Golden Vale plains, this limestone hill is crowned with the most impressive cluster of medieval buildings in Ireland. For centuries, it was the traditional seat of the High Kings of Munster before being gifted to the church.",
          "According to legend, this is where St. Patrick converted King Aengus to Christianity in the 5th century. It is said that during the baptism, Patrick accidentally drove his sharp crozier through the King's foot, but the King didn't scream because he thought it was part of the ritual.",
          "The complex includes a 12th-century round tower, a high cross, a Gothic cathedral, and a Romanesque chapel. The site was historically a symbol of royal power rivaling the High Kings at Tara."
        ],
        question: "Which patron saint is said to have converted the King of Munster at this site?",
        options: [
          "St. Patrick.",
          "St. Brigid.",
          "St. Columba.",
          "St. Kevin."
        ],
        answer: "St. Patrick.",
        explanation: "Legend holds that St. Patrick visited the rock to baptize King Aengus."
      },
      {
        stopName: "Killarney National Park",
        imageKeyword: "Killarney National Park",
        description: [
          "Established in 1932, this was Ireland's first national park. It protects the last remaining stretch of ancient native oak woodland in the country, known as the Reenadinna Wood.",
          "It is the only place in Ireland with a native herd of Red Deer. These animals have lived in the valley continuously since the last Ice Age, surviving while other populations were hunted to extinction.",
          "The park contains the Muckross House and Gardens. This Victorian mansion hosted Queen Victoria in 1861; the owners spent so much money preparing the house for her visit that it eventually bankrupted the family."
        ],
        question: "Killarney National Park is home to the last native herd of which animal?",
        options: [
          "Red Deer.",
          "Wolves.",
          "Bears.",
          "Wild Boar."
        ],
        answer: "Red Deer.",
        explanation: "They are the only deer population in Ireland that has existed there since the Ice Age without being reintroduced."
      }
    ]
  },
  "Israel": {
    tourTitle: "The Holy Land",
    introText: "The golden Dome of the Rock shines above the walls of Jerusalem. Float effortlessly in the salty waters of the lowest point on Earth.",
    stops: [
      {
        stopName: "The Dome of the Rock",
        imageKeyword: "The Dome of the Rock",
        description: [
          "Located on the Temple Mount in the Old City of Jerusalem, this shrine is one of the oldest and most recognizable works of Islamic architecture. The golden dome covers the Foundation Stone, which holds immense sacred significance for both Jews (as the site of the Holy of Holies) and Muslims (as the site of Muhammad's Night Journey).",
          "The exterior is decorated with intricate Iznik tiles from the Ottoman era, featuring geometric patterns and calligraphy. These were added in the 16th century by Suleiman the Magnificent to replace the original mosaics.",
          "It dominates the skyline of Jerusalem. Laws and traditions have historically limited the height of other buildings in the vicinity to ensure the dome remains the crowning jewel of the city view."
        ],
        question: "The Dome of the Rock covers which sacred geological feature?",
        options: [
          "The Foundation Stone.",
          "The Wailing Wall.",
          "The Mount of Olives.",
          "The Stone of Unction."
        ],
        answer: "The Foundation Stone.",
        explanation: "It protects the rock believed to be the spot where the world was created and where Abraham prepared to sacrifice his son."
      },
      {
        stopName: "The Dead Sea",
        imageKeyword: "The Dead Sea",
        description: [
          "Sitting at 430 meters (1,412 feet) below sea level, this is the lowest land elevation on Earth. The water is nearly ten times saltier than the ocean, which increases the density so much that it is physically impossible to sink; you float effortlessly on the surface.",
          "The mud along the shores is rich in minerals like magnesium and bromide. Visitors traditionally cover their bodies in this black mud, which acts as a natural skin cleanser and has been used in cosmetics since the time of Cleopatra.",
          "It is technically a \"terminal lake,\" meaning water flows in from the Jordan River but never flows out. The only way water leaves is through evaporation in the intense desert heat, which leaves behind the massive concentration of salt crystals."
        ],
        question: "Why is it impossible to sink in the Dead Sea?",
        options: [
          "High salt concentration increases water density.",
          "The water is very shallow.",
          "There is no gravity there.",
          "You wear a special suit."
        ],
        answer: "High salt concentration increases water density.",
        explanation: "The water is denser than the human body, creating extreme buoyancy."
      },
      {
        stopName: "Masada",
        imageKeyword: "Masada",
        description: [
          "This ancient stone fortress was built by King Herod the Great on top of an isolated rock plateau overlooking the Dead Sea. It was designed as a palace complex complete with bathhouses, swimming pools, and massive storerooms in the middle of the desert.",
          "It is famous for the Siege of Masada in 73 AD. According to the historian Josephus, 960 Jewish rebels chose to commit mass suicide rather than surrender to the Roman legion that had spent months building a massive earthen ramp to breach the walls.",
          "Today, visitors can hike the \"Snake Path,\" a winding trail that zigzags up the sheer cliff face. It is a popular tradition to climb the path before dawn to watch the sunrise over the mountains of Jordan across the rift valley."
        ],
        question: "What Roman engineering structure was built to breach the walls of Masada?",
        options: [
          "A massive earthen ramp.",
          "A wooden horse.",
          "A giant catapult.",
          "A tunnel."
        ],
        answer: "A massive earthen ramp.",
        explanation: "The Romans piled up thousands of tons of earth and stone to push a siege tower up the steep cliff."
      },
      {
        stopName: "Bahá'í Gardens",
        imageKeyword: "Bahai Gardens Haifa",
        description: [
          "Located on the slopes of Mount Carmel, these hanging gardens form the spiritual center of the Bahá'í Faith. The design features 19 majestic terraces that stretch for a kilometer up the mountain, representing the first disciples of the religion.",
          "The centerpiece is the Shrine of the Báb, identifiable by its golden dome. The gardens are designed to lead the eye naturally toward the shrine and the Mediterranean Sea beyond, creating an atmosphere of perfect peace and order.",
          "The landscaping is maintained with extreme precision. Gardeners do not use heavy machinery, instead working by hand to ensure that not a single blade of grass or flower is out of place in the geometric patterns."
        ],
        question: "How many terraces make up the Bahá'í Gardens?",
        options: [
          "Nineteen.",
          "Twelve.",
          "Seven.",
          "Fifty."
        ],
        answer: "Nineteen.",
        explanation: "The terraces represent the Báb and his eighteen original disciples."
      },
      {
        stopName: "Yad Vashem",
        imageKeyword: "Yad Vashem Hall of Names",
        description: [
          "This is Israel's official memorial to the victims of the Holocaust. The complex is designed to take the visitor on a journey, cutting through the mountain in a triangular concrete prism that opens up to the sky at the end, symbolizing hope.",
          "The most striking room is the Hall of Names. It features a massive conical ceiling composed of 600 photographs of Holocaust victims, reflecting into a pool of water below to represent the millions of victims whose names remain unknown.",
          "The site also includes the Garden of the Righteous Among the Nations. Trees are planted here to honor non-Jews who risked their lives to save Jews during the war, such as Oskar Schindler."
        ],
        question: "What is the purpose of the Hall of Names?",
        options: [
          "To memorialize the individual victims of the Holocaust.",
          "To honor soldiers.",
          "To list famous scientists.",
          "To display art."
        ],
        answer: "To memorialize the individual victims of the Holocaust.",
        explanation: "It collects the names and photos of the millions who were murdered, attempting to restore their individual identities."
      }
    ]
  },
  "Italy": {
    tourTitle: "The Bel Paese",
    introText: "The Colosseum stands as a monument to the power of Rome. Taste the fresh pasta in a piazza filled with Renaissance art.",
    stops: [
      {
        stopName: "The Colosseum",
        imageKeyword: "The Colosseum",
        description: [
          "Completed in 80 AD, this is the largest amphitheater ever built and the symbol of the Roman Empire. It could hold up to 80,000 spectators who watched gladiatorial contests, animal hunts, and even mock sea battles when the arena was flooded with water.",
          "The floor of the arena was originally made of wood and covered in sand (the Latin word for sand is harena). Underneath was the hypogeum, a complex two-story underground labyrinth of tunnels and cages where gladiators and animals waited to be hoisted up by elevators.",
          "The concrete and stone structure has survived earthquakes and stone robbers for nearly 2,000 years. In the Middle Ages, it was used as a quarry; much of the marble that once covered the facade was stripped away to build St. Peter's Basilica and other palaces in Rome."
        ],
        question: "What was the hypogeum located under the arena floor used for?",
        options: [
          "Holding gladiators and animals.",
          "Storing grain.",
          "A water cistern.",
          "The Emperor's bedroom."
        ],
        answer: "Holding gladiators and animals.",
        explanation: "It was the backstage area with tunnels and elevators to bring fighters up to the surface."
      },
      {
        stopName: "Venice Canals",
        imageKeyword: "Venice Canals",
        description: [
          "Venice is a marvel of engineering built on 118 small islands separated by canals and linked by over 400 bridges. There are no cars or roads in the historic center; the entire city relies on boats for transportation, from police boats to garbage barges.",
          "The buildings are supported by millions of wooden stakes driven deep into the mud. Surprisingly, the wood does not rot because it is submerged in oxygen-poor mud, which petrifies the timber over centuries, turning it rock-hard.",
          "The city is famous for Acqua Alta (high water). During certain tides, the Adriatic Sea rises and floods St. Mark's Square, forcing tourists and locals to walk on raised wooden platforms to keep their feet dry."
        ],
        question: "Why do the wooden foundations of Venice not rot?",
        options: [
          "The mud is oxygen-poor.",
          "The wood is painted.",
          "The water is too salty.",
          "They are made of stone."
        ],
        answer: "The mud is oxygen-poor.",
        explanation: "The lack of oxygen prevents bacteria and fungi from decaying the wood, preserving it for centuries."
      },
      {
        stopName: "Florence Cathedral",
        imageKeyword: "Florence Cathedral",
        description: [
          "The Cattedrale di Santa Maria del Fiore dominates the skyline of Florence. Its massive red-tiled dome, designed by Filippo Brunelleschi, was the largest in the world when it was finished in 1436 and remains the largest brick dome ever constructed.",
          "Brunelleschi built the dome without using scaffolding from the ground, which was considered impossible at the time. He invented a herringbone brick pattern and an inner/outer shell design that allowed the structure to support its own weight as it rose.",
          "The facade is covered in pink, white, and green marble, matching the colors of the Italian flag (though the flag came centuries later). It is the birthplace of the Renaissance, symbolizing the rebirth of art and science in Europe."
        ],
        question: "Brunelleschi's dome holds the record for being the largest dome made of what material?",
        options: [
          "Brick.",
          "Concrete.",
          "Steel.",
          "Glass."
        ],
        answer: "Brick.",
        explanation: "It remains the largest masonry dome in the world, built without modern steel reinforcements."
      },
      {
        stopName: "Pompeii",
        imageKeyword: "Pompeii Ruins",
        description: [
          "In 79 AD, the eruption of Mount Vesuvius buried the thriving Roman city of Pompeii under meters of volcanic ash and pumice. The ash hermetically sealed the city, preserving buildings, frescoes, and streets exactly as they were nearly 2,000 years ago.",
          "Archaeologists found voids in the hardened ash where victims' bodies had decomposed. By pouring plaster into these hollows, they created detailed casts of the citizens in their final moments, capturing their expressions and clothing.",
          "The site offers an unparalleled look at daily Roman life. You can see ancient fast-food counters (thermopolia), political graffiti on the walls, and grooves in the stone streets worn down by the wheels of chariots."
        ],
        question: "How did archaeologists create the statues of the victims in Pompeii?",
        options: [
          "By pouring plaster into the hollow ash molds.",
          "By carving stone.",
          "By using 3D printers.",
          "By wrapping skeletons."
        ],
        answer: "By pouring plaster into the hollow ash molds.",
        explanation: "The ash hardened around the bodies, which later decayed, leaving a perfect negative mold that could be filled."
      },
      {
        stopName: "Cinque Terre",
        imageKeyword: "Cinque Terre Manarola",
        description: [
          "Cinque Terre (\"Five Lands\") is a string of five fishing villages perched high on the rugged Italian Riviera coastline. The villages are connected by the Sentiero Azzurro (Blue Trail), a walking path that offers breathtaking views of the vineyards and the sea.",
          "The houses are painted in bright pastel colors. Tradition says the fishermen painted their homes in distinct colors so they could see their houses from the sea while working on their boats, guiding them home safely.",
          "The region is famous for its terraced vineyards carved into the steep cliffs. Farmers use monorail trains to transport the harvested grapes up the vertical slopes, producing the local white wine known as Sciacchetrà."
        ],
        question: "According to tradition, why are the houses in Cinque Terre painted bright colors?",
        options: [
          "So fishermen could see their homes from the sea.",
          "To repel insects.",
          "To reflect the sun.",
          "It was a law."
        ],
        answer: "So fishermen could see their homes from the sea.",
        explanation: "The distinct colors acted as landmarks for sailors returning to the rocky coast."
      }
    ]
  }
};