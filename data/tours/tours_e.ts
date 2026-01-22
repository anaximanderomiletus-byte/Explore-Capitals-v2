import { TourData } from "../../types";

export const toursE: Record<string, TourData> = {
  "Ecuador": {
    tourTitle: "The Middle of the World",
    introText: "Giant tortoises roam slowly across the isolated Galapagos Islands. Stand with a foot in each hemisphere on the high mountain line.",
    stops: [
      {
        stopName: "The Galapagos Islands",
        imageKeyword: "The Galapagos Islands",
        description: [
          "Located 1,000 kilometers off the coast, this isolated archipelago is a living museum of evolution. Because the animals here evolved without natural predators, they show almost no fear of humans, allowing visitors to walk right up to blue-footed boobies and marine iguanas.",
          "The islands are famous for inspiring Charles Darwin's Theory of Natural Selection. Darwin noticed that finches on different islands had developed different beak shapes to eat specific types of food, proving that species adapt to their environment over time.",
          "The giant tortoises found here are the largest living turtles in the world, weighing up to 417 kg (919 lbs). They can live for over 100 years, and historically, sailors used them as a fresh meat source because they could survive in a ship's hold for a year without food or water."
        ],
        question: "Which scientist developed a famous theory after visiting the Galapagos?",
        options: [
          "Charles Darwin.",
          "Isaac Newton.",
          "Albert Einstein.",
          "Galileo Galilei."
        ],
        answer: "Charles Darwin.",
        explanation: "His observations of the unique wildlife here formed the basis for his groundbreaking work, On the Origin of Species."
      },
      {
        stopName: "Mitad del Mundo",
        imageKeyword: "Mitad del Mundo",
        description: [
          "Located just outside the capital, this site marks the equatorial line that divides the Earth into the Northern and Southern Hemispheres. A yellow line painted on the ground allows tourists to stand with one foot in the north and one foot in the south at the same time.",
          "The 30-meter-tall monument honors the French Geodesic Mission of the 18th century, which came here to measure the curvature of the Earth. Their calculations proved that the Earth is not a perfect sphere but bulges at the equator.",
          "Strange physical phenomena are said to occur here due to the centrifugal force of the Earth's rotation. Guides demonstrate tricks like balancing an egg on a nail or watching water drain in different directions, though modern GPS shows the \"true\" equator is actually about 240 meters away."
        ],
        question: "What does the yellow line at the monument represent?",
        options: [
          "The Equator (0 degrees latitude).",
          "The Prime Meridian.",
          "The International Date Line.",
          "The Tropic of Cancer."
        ],
        answer: "The Equator (0 degrees latitude).",
        explanation: "It marks the division between the Northern and Southern Hemispheres."
      },
      {
        stopName: "Cotopaxi Volcano",
        imageKeyword: "Cotopaxi Volcano",
        description: [
          "Rising to 5,897 meters (19,347 feet), this is one of the highest active volcanoes in the world. It is famous for its almost perfect symmetrical cone shape, which looks like a child's drawing of a mountain come to life.",
          "Despite being located near the equator, the mountain is so high that it is covered in a permanent glacier. This ice cap is crucial for the water supply of the capital city, Quito, but it also poses a danger of massive mudflows (lahars) if the volcano erupts.",
          "It sits in the \"Avenue of the Volcanoes,\" a dramatic valley flanked by two parallel lines of mountain peaks. The German explorer Alexander von Humboldt coined this name in 1802 after being awestruck by the sheer density of volcanoes in the region."
        ],
        question: "Who coined the name \"Avenue of the Volcanoes\"?",
        options: [
          "Alexander von Humboldt.",
          "Christopher Columbus.",
          "Marco Polo.",
          "Ferdinand Magellan."
        ],
        answer: "Alexander von Humboldt.",
        explanation: "The famous explorer gave the valley its poetic name during his expedition in the early 19th century."
      },
      {
        stopName: "Quito Historic Center",
        imageKeyword: "Quito Historic Center",
        description: [
          "Founded in the 16th century on the ruins of an Inca city, Quito has the best-preserved historic center in the Americas. It was the very first city to be declared a UNESCO World Heritage Site in 1978 (along with Krakow, Poland).",
          "At an elevation of 2,850 meters (9,350 feet), it is the second-highest capital city in the world. Visitors often find themselves out of breath just walking up the steep, cobblestone streets due to the thin mountain air.",
          "The architecture is a blend of indigenous and Spanish styles known as the \"Baroque School of Quito.\" The Church of the Compañía de Jesús is the finest example; its interior is so ornate that it is almost completely covered in gold leaf."
        ],
        question: "Quito was the first city to receive what designation in 1978?",
        options: [
          "UNESCO World Heritage Site.",
          "Capital of Culture.",
          "Olympic Host City.",
          "Safest City in the World."
        ],
        answer: "UNESCO World Heritage Site.",
        explanation: "The UN recognized its exceptionally preserved colonial center as the first of its kind to be protected."
      },
      {
        stopName: "The Devil's Cauldron",
        imageKeyword: "The Devil's Cauldron",
        description: [
          "Located near the town of Baños, this is one of the most powerful waterfalls in the Andes. The Pastaza River forces itself through a narrow crack in the rocks, creating a violent explosion of water that plunges 80 meters down.",
          "Visitors can get terrifyingly close to the water by descending a staircase carved directly into the cliff face. The stairs are famously slippery and steep, leading to a viewing platform where you are constantly drenched by the spray of the falls.",
          "The name comes from a rock formation behind the falls that is said to look like the face of the Devil. The constant roar of the water and the mist create an intense, almost overwhelming sensory experience."
        ],
        question: "Where are the stairs located that allow visitors to view the waterfall?",
        options: [
          "Carved directly into the cliff face.",
          "Inside a glass elevator.",
          "On a wooden suspension bridge.",
          "Underneath the water."
        ],
        answer: "Carved directly into the cliff face.",
        explanation: "A narrow, winding staircase is cut into the rock wall, allowing people to descend right next to the falling water."
      }
    ]
  },
  "Egypt": {
    tourTitle: "The Gift of the Nile",
    introText: "The Great Pyramid of Giza is the last wonder of the ancient world. Sail down the river that sustained an empire for ages past.",
    stops: [
      {
        stopName: "The Great Pyramids of Giza",
        imageKeyword: "The Great Pyramids of Giza",
        description: [
          "These colossal structures were built over 4,500 years ago as elaborate tombs for the Pharaohs Khufu, Khafre, and Menkaure. The Great Pyramid of Khufu is the oldest and only surviving member of the original Seven Wonders of the Ancient World.",
          "The engineering precision is baffling; the millions of limestone blocks, some weighing as much as 80 tons, were cut and transported from quarries miles away without the use of wheels or iron tools. The Great Pyramid is aligned almost perfectly to true north, a feat of astronomical accuracy.",
          "Guarding the complex is the Great Sphinx, a mythical creature with the body of a lion and the head of a human. It was carved directly from the bedrock of the Giza plateau and is believed to bear the likeness of the Pharaoh Khafre."
        ],
        question: "Which of the Pyramids is the only surviving Wonder of the Ancient World?",
        options: [
          "The Great Pyramid of Khufu (Cheops).",
          "The Pyramid of Khafre.",
          "The Pyramid of Menkaure.",
          "The Step Pyramid of Djoser."
        ],
        answer: "The Great Pyramid of Khufu (Cheops).",
        explanation: "Of the original Seven Wonders listed by ancient Greeks, it is the only one still standing today."
      },
      {
        stopName: "The Valley of the Kings",
        imageKeyword: "The Valley of the Kings",
        description: [
          "Located on the west bank of the Nile near Luxor, this desert canyon was the burial ground for Pharaohs of the New Kingdom for 500 years. Unlike the visible pyramids, these tombs were hidden underground to protect the royal mummies and treasures from grave robbers.",
          "The most famous discovery here was the tomb of Tutankhamun (King Tut) in 1922. While most other tombs had been looted in ancient times, Tutankhamun’s was found nearly intact, filled with over 5,000 artifacts, including his iconic solid gold death mask.",
          "The walls of the tombs are covered in vivid hieroglyphs and paintings that are still brightly colored today. These texts, known as the \"Book of the Dead,\" provided the deceased king with instructions on how to navigate the dangers of the underworld to reach the afterlife."
        ],
        question: "Why did the Pharaohs switch from building pyramids to hidden underground tombs?",
        options: [
          "To protect their bodies and treasures from robbers.",
          "It was cheaper.",
          "They ran out of stone.",
          "The sand was too soft for pyramids."
        ],
        answer: "To protect their bodies and treasures from robbers.",
        explanation: "Pyramids were giant advertisements for thieves, so later kings chose secret hidden locations in the valley."
      },
      {
        stopName: "Abu Simbel Temples",
        imageKeyword: "Abu Simbel Temples",
        description: [
          "These two massive temples were carved directly into a mountainside by Ramesses II to intimidate his Nubian neighbors and commemorate his victory at the Battle of Kadesh. The facade features four 20-meter statues of the king sitting on his throne.",
          "The temple is famous for a modern engineering miracle. In the 1960s, the construction of the Aswan High Dam threatened to flood the site. An international UNESCO team cut the entire mountain into huge blocks and moved the temples 65 meters higher to save them from the rising water.",
          "Twice a year, on February 22 and October 22, a phenomenon occurs called the \"Solar Alignment.\" The morning sun shines through the temple entrance and travels 60 meters deep into the rock to illuminate the statues of the gods in the inner sanctuary, leaving the god of darkness in the shadow."
        ],
        question: "Why were the temples of Abu Simbel moved in the 1960s?",
        options: [
          "To save them from being flooded by the Aswan High Dam.",
          "To be closer to the capital.",
          "To make them face Mecca.",
          "Because of an earthquake."
        ],
        answer: "To save them from being flooded by the Aswan High Dam.",
        explanation: "The creation of Lake Nasser would have submerged the temples forever if they hadn't been relocated."
      },
      {
        stopName: "Karnak Temple Complex",
        imageKeyword: "Karnak Temple Complex",
        description: [
          "This vast open-air museum in Luxor was the most important religious site in ancient Egypt, dedicated to the god Amun-Ra. It was built, added to, and modified by approximately 30 different pharaohs over a period of 1,500 years.",
          "The centerpiece is the Great Hypostyle Hall, a forest of 134 gigantic stone columns. The columns are so wide that it takes six grown men holding hands to encircle a single one, and the roof was once high enough to hold the Notre Dame Cathedral inside.",
          "Near the sacred lake stands a giant granite statue of a scarab beetle. Ancient tradition says that if you walk around the scarab seven times counter-clockwise, you will be granted good luck or marriage in the near future."
        ],
        question: "How long did it take to complete the Karnak Temple Complex?",
        options: [
          "Over 1,500 years.",
          "20 years.",
          "100 years.",
          "500 years."
        ],
        answer: "Over 1,500 years.",
        explanation: "It was not built by one king, but expanded continuously by 30 successive pharaohs over more than a millennium."
      },
      {
        stopName: "The Nile River",
        imageKeyword: "The Nile River (Felucca Sail)",
        description: [
          "The Nile is the longest river in the world and the lifeblood of Egyptian civilization. For thousands of years, the annual flooding of the river deposited rich black silt onto the banks, turning the desert into fertile farmland that fed the empire.",
          "The traditional way to experience the river is by sailing on a felucca, a simple wooden boat with a single triangular canvas sail. These boats have no engines and rely entirely on the wind and current, offering a silent and timeless journey.",
          "The river flows from south to north, emptying into the Mediterranean Sea. This geography confused ancient explorers because the \"Upper Egypt\" region is actually in the south (up-river), while \"Lower Egypt\" is in the north (down-river)."
        ],
        question: "In which direction does the Nile River flow?",
        options: [
          "South to North.",
          "North to South.",
          "East to West.",
          "West to East."
        ],
        answer: "South to North.",
        explanation: "It flows from the highlands of East Africa in the south to the Mediterranean Sea in the north."
      }
    ]
  },
  "El Salvador": {
    tourTitle: "The Land of Volcanoes",
    introText: "Surfers ride the long waves at beaches made of black volcanic sand. Hike up the steep slopes of a land shaped by the fire within.",
    stops: [
      {
        stopName: "Santa Ana Volcano",
        imageKeyword: "Santa Ana Volcano",
        description: [
          "Rising to 2,381 meters (7,812 feet), this is the highest and most active volcano in the country. The hike to the summit is a journey through diverse ecosystems, transitioning from a cloud forest full of birds to a stark, vegetation-free landscape of volcanic rock near the top.",
          "The reward at the rim is a view of the steaming crater lake, which is a brilliant shade of turquoise green due to the high sulfur content. The liquid is boiling hot and extremely acidic, bubbling constantly to remind visitors of the mountain's power.",
          "From the summit, you can see a stunning lineup of the \"volcanic complex,\" including the blue waters of Lake Coatepeque and the perfectly cone-shaped Izalco Volcano, which was once known as the \"Lighthouse of the Pacific\" because its eruptions guided sailors at sea."
        ],
        question: "What color is the acidic lake inside the crater of Santa Ana?",
        options: [
          "Turquoise green.",
          "Red.",
          "Black.",
          "Clear."
        ],
        answer: "Turquoise green.",
        explanation: "Dissolved sulfur and other minerals turn the hot water a vibrant green color."
      },
      {
        stopName: "Joya de Cerén",
        imageKeyword: "Joya de Cerén",
        description: [
          "Known as the \"Pompeii of the Americas,\" this is a pre-Columbian Mayan farming village that was buried under 14 layers of volcanic ash around 600 AD. Unlike the famous stone temples of Tikal or Chichén Itzá, this site preserves the humble, everyday lives of common people.",
          "The eruption happened so quickly that everything was frozen in time. Archaeologists have found half-eaten meals sitting in bowls, furniture in place, and even footprints of residents fleeing the disaster, providing a rare snapshot of ancient domestic life.",
          "It is the only UNESCO World Heritage Site in El Salvador. Because the structures were made of adobe (mud brick), they would have dissolved in the rain centuries ago if the volcanic ash hadn't hermetically sealed them for 1,400 years."
        ],
        question: "Why is Joya de Cerén compared to the Roman city of Pompeii?",
        options: [
          "It was a village buried and preserved by volcanic ash.",
          "It was destroyed by an earthquake.",
          "It was a gladiatorial arena.",
          "It was a port city."
        ],
        answer: "It was a village buried and preserved by volcanic ash.",
        explanation: "Like Pompeii, a volcanic eruption froze the town in time, preserving details that would otherwise have been lost."
      },
      {
        stopName: "El Tunco Beach",
        imageKeyword: "El Tunco Beach",
        description: [
          "This is the surfing capital of the country, attracting wave riders from all over the globe to its world-class breaks. The beach is famous for its striking black sand, created by the erosion of dark volcanic basalt rocks found along the coastline.",
          "The town is named after a distinctive rock formation that juts out of the ocean. \"Tunco\" is Salvadoran slang for \"pig,\" and locals believe the shape of the rock resembles a pig lying on its back with its legs in the air.",
          "The waves here are consistent year-round, making El Salvador a premier destination for international surf competitions. The \"point break\" creates long, smooth rides that are perfect for both beginners and professionals."
        ],
        question: "What does the slang word \"Tunco\" mean in English?",
        options: [
          "Pig.",
          "Turtle.",
          "Shark.",
          "Rock."
        ],
        answer: "Pig.",
        explanation: "The town is named after a rock that looks like a pig lying in the water."
      },
      {
        stopName: "Ruta de las Flores",
        imageKeyword: "Ruta de las Flores",
        description: [
          "This winding road trip through the Apaneca-Ilamatepec mountain range connects five picturesque colonial towns. The cool, high-altitude climate is perfect for growing coffee, and the route is lined with plantations producing some of the world's finest beans.",
          "The town of Ataco is the artistic heart of the route. Almost every wall in the town is covered in vibrant, colorful murals depicting cats, coffee pickers, and local folklore, turning the entire village into an open-air art gallery.",
          "The \"Flowers\" in the name refers to the explosion of wild blooms that line the road, especially between October and February. However, the true economic flower of the region is the white coffee blossom, which signals the start of the harvest season."
        ],
        question: "What major crop is grown along the Ruta de las Flores?",
        options: [
          "Coffee.",
          "Bananas.",
          "Corn.",
          "Rice."
        ],
        answer: "Coffee.",
        explanation: "The high altitude and volcanic soil create the perfect environment for coffee plantations."
      },
      {
        stopName: "Lake Coatepeque",
        imageKeyword: "Lake Coatepeque",
        description: [
          "This massive crater lake was formed tens of thousands of years ago by the collapse of a group of volcanoes. The result is a deep, oval-shaped basin filled with water that sits directly next to the Santa Ana Volcano.",
          "In the center of the lake sits Teopan Island, which was a sacred site for the ancient Maya. They built a temple there to worship the goddess Itzqueye, and artifacts are still occasionally found in the water by divers.",
          "The lake is known for a mysterious phenomenon where the water occasionally changes color from deep blue to bright turquoise. This \"turnover\" is caused by algae blooms or volcanic minerals shifting in the water, creating a spectacular visual transformation."
        ],
        question: "How was the basin of Lake Coatepeque formed?",
        options: [
          "By the collapse of ancient volcanoes.",
          "By a meteor impact.",
          "It is a man-made reservoir.",
          "By a glacier."
        ],
        answer: "By the collapse of ancient volcanoes.",
        explanation: "It is a caldera, created when the ground collapsed after a massive volcanic eruption."
      }
    ]
  },
  "Equatorial Guinea": {
    tourTitle: "The Spanish Jewel of Africa",
    introText: "This is the only African nation where Spanish is the official tongue. Explore the lush jungles that drop down to the Atlantic shore.",
    stops: [
      {
        stopName: "Malabo",
        imageKeyword: "Malabo Cathedral",
        description: [
          "Located on the northern rim of a sunken volcano on Bioko Island, Malabo is the nation's capital. It has a distinctly European feel due to its history; the city is filled with well-preserved Spanish colonial architecture, including the stunning yellow Cathedral of Santa Isabel.",
          "The city's geography is unique for an African capital because it isn't on the mainland continent at all. It sits on an island closer to Cameroon and Nigeria than to its own country's mainland territory, Rio Muni.",
          "The harbor sits inside the rim of the ancient volcanic crater. Because the water is so deep right up to the shore, it historically served as a crucial port for deep-draft naval ships patrolling the West African coast."
        ],
        question: "What makes Malabo's location unique for an African capital city?",
        options: [
          "It is located on an island, not the mainland.",
          "It is built on a glacier.",
          "It is underground.",
          "It is floating on a lake."
        ],
        answer: "It is located on an island, not the mainland.",
        explanation: "The capital sits on Bioko Island, separated from the rest of the African continent by the ocean."
      },
      {
        stopName: "Pico Basile",
        imageKeyword: "Pico Basile",
        description: [
          "This towering shield volcano is the highest mountain in Equatorial Guinea, rising 3,011 meters (9,878 feet) above sea level. From the summit, on a clear day, you can see all the way across the ocean to Mount Cameroon on the African mainland.",
          "The mountain is covered in lush rainforest that changes as you ascend, eventually turning into heathland near the top. This isolation has created a unique ecosystem filled with rare primates, including the drill and the black colobus monkey.",
          "Access to the very top is restricted because it houses military transmission stations. However, the road leading up is one of the steepest paved roads in the world, offering terrifying but spectacular views of the dense jungle canopy below."
        ],
        question: "On a clear day, what can be seen from the summit of Pico Basile?",
        options: [
          "Mount Cameroon on the mainland.",
          "The Pyramids of Giza.",
          "The coast of Brazil.",
          "The South Pole."
        ],
        answer: "Mount Cameroon on the mainland.",
        explanation: "The view stretches across the Gulf of Guinea to the neighboring country's highest peak."
      },
      {
        stopName: "Ureca",
        imageKeyword: "Ureca Bioko",
        description: [
          "Located on the southern tip of Bioko Island, Ureca is one of the wettest places on Earth. It receives over 10 meters (33 feet) of rainfall annually, creating a landscape that is perpetually green and dripping with water.",
          "The village is famous for its sea turtles. During the dry season, four different species of leatherback turtles come to the black volcanic sand beaches to lay their eggs, monitored by local conservationists.",
          "The jungle here literally falls into the sea. Numerous waterfalls tumble out of the rainforest and crash directly onto the beach, creating freshwater showers for swimmers right next to the salty ocean waves."
        ],
        question: "Ureca is known for being one of the global leaders in what climate statistic?",
        options: [
          "Rainfall.",
          "Snowfall.",
          "Wind speed.",
          "Temperature."
        ],
        answer: "Rainfall.",
        explanation: "It is one of the wettest inhabited places on the planet, receiving massive amounts of rain every year."
      },
      {
        stopName: "Monte Alén National Park",
        imageKeyword: "Monte Alén National Park",
        description: [
          "This national park is located on the mainland (Rio Muni) and is a rugged, mountainous wilderness. It is a secret stronghold for Central African wildlife, including forest elephants, gorillas, chimpanzees, and leopards.",
          "The terrain is difficult and rocky, which has helped protect it from logging. The \"Monte Alén\" itself is a granite massif that rises out of the jungle, offering panoramic views over the vast canopy of the Congo Basin rainforest.",
          "Exploring this park is not a luxury safari; it requires hiking on foot through humid, dense vegetation. It offers a raw and authentic experience of the African jungle as it existed centuries ago."
        ],
        question: "How does the rocky terrain of Monte Alén help the forest?",
        options: [
          "It protects it from logging.",
          "It makes trees grow faster.",
          "It attracts tourists.",
          "It creates gold."
        ],
        answer: "It protects it from logging.",
        explanation: "The steep, granite mountains make it too difficult for heavy machinery to enter, saving the trees."
      },
      {
        stopName: "Bata",
        imageKeyword: "Bata Equatorial Guinea",
        description: [
          "Bata is the largest city on the mainland and serves as the country's economic hub. It is famous for its Paseo Marítimo, a long, beautiful promenade that hugs the coastline, where locals gather to walk and socialize in the evenings.",
          "The city is a blend of modern infrastructure and colonial history. The \"Freedom Tower\" is a new monument that dominates the skyline, housing a revolving restaurant that offers views of the expanding port and city.",
          "The markets here are vibrant and chaotic, selling everything from fresh fish caught that morning to \"bushmeat\" from the nearby forests. It serves as the gateway for travelers heading deep into the interior of the continent."
        ],
        question: "What is the Paseo Marítimo in Bata?",
        options: [
          "A seaside promenade/boardwalk.",
          "A mountain trail.",
          "A historic castle.",
          "A famous museum."
        ],
        answer: "A seaside promenade/boardwalk.",
        explanation: "It is a long paved walkway along the oceanfront, popular for strolling and social gatherings."
      }
    ]
  },
  "Eritrea": {
    tourTitle: "The Secret of Africa",
    introText: "Art Deco buildings from the 1930s fill the streets of Asmara. Dive into the untouched coral reefs of the warm coastal waters.",
    stops: [
      {
        stopName: "Asmara",
        imageKeyword: "Fiat Tagliero Building",
        description: [
          "The capital city is often called \"Little Rome\" because it possesses one of the highest concentrations of Modernist and Art Deco architecture in the world. It was entirely redesigned by Italian architects in the 1930s who used the city as a blank canvas to experiment with futuristic designs.",
          "The most famous structure is the Fiat Tagliero service station, designed to look like a soaring airplane. The concrete wings stretch out 15 meters without any support pillars; local legend says the architect held a gun to the builder's head to force him to remove the wooden supports, proving the design would stand.",
          "In 2017, the entire city center was declared a UNESCO World Heritage site. It serves as a perfectly preserved time capsule of early 20th-century urban planning, remaining largely unchanged for decades."
        ],
        question: "What does the Fiat Tagliero building resemble?",
        options: [
          "An airplane.",
          "A boat.",
          "A bird.",
          "A spaceship."
        ],
        answer: "An airplane.",
        explanation: "The futuristic gas station was designed with cantilevered wings to mimic the shape of a plane taking flight."
      },
      {
        stopName: "Massawa",
        imageKeyword: "Massawa",
        description: [
          "Located on the Red Sea coast, this ancient port city has been a gateway for trade between Africa and Arabia for over a thousand years. The old town is a maze of alleys lined with buildings made from coral block, blending Ottoman and Italian architectural styles.",
          "It is historically known as the \"Pearl of the Red Sea,\" but it is also one of the hottest inhabited places on Earth. Average summer highs regularly exceed 43°C (109°F), forcing the city to sleep during the day and come alive only at night.",
          "The city still bears the scars of the War of Independence. Many of the grand palaces and mosques remain in a state of arrested decay, with bullet holes and bomb damage visible on the beautiful coral facades."
        ],
        question: "What unique material was used to construct the old buildings in Massawa?",
        options: [
          "Coral stone.",
          "Granite.",
          "Bamboo.",
          "Mud brick."
        ],
        answer: "Coral stone.",
        explanation: "The local builders used blocks cut from fossilized coral reefs to construct the city's walls and homes."
      },
      {
        stopName: "Dahlak Archipelago",
        imageKeyword: "Dahlak Archipelago",
        description: [
          "This group of over 350 islands in the Red Sea is one of the least visited and most pristine marine environments in the world. Because of Eritrea's isolation, the coral reefs have not suffered from mass tourism or pollution, remaining exactly as they were centuries ago.",
          "Historically, these islands were the center of a major pearl diving industry. For nearly 2,000 years, divers harvested pearls here to be sold to Roman emperors and Ottoman sultans.",
          "Today, the waters are a diver's paradise, teeming with dugongs, dolphins, and manta rays. The islands themselves are stark and desolate, serving as a nesting ground for thousands of seabirds."
        ],
        question: "For 2,000 years, what luxury item was harvested in the Dahlak Archipelago?",
        options: [
          "Pearls.",
          "Gold.",
          "Diamonds.",
          "Silk."
        ],
        answer: "Pearls.",
        explanation: "The islands were famous in the ancient world as a source of high-quality natural pearls."
      },
      {
        stopName: "Qohaito",
        imageKeyword: "Qohaito",
        description: [
          "Located high on a plateau, these ruins are all that remain of a major city of the Aksumite Empire. The site is dotted with upright stone columns that once supported grand temples or palaces dating back to 700 BC.",
          "The city sits on the edge of a spectacular canyon that drops dramatically down to the coastal plains. In ancient times, this was a crucial stop on the trade route connecting the port of Adulis to the highland capital of Aksum.",
          "Nearby caves contain ancient rock art that is thousands of years old. These paintings depict cattle and daily life, proving that this area has been inhabited by pastoral communities for millennia."
        ],
        question: "Qohaito was a major city of which ancient civilization?",
        options: [
          "The Aksumite Empire.",
          "The Roman Empire.",
          "The Ottoman Empire.",
          "The Mayan Empire."
        ],
        answer: "The Aksumite Empire.",
        explanation: "It flourished as a trade hub connecting the Red Sea coast to the empire's capital in the highlands."
      },
      {
        stopName: "The Tank Graveyard",
        imageKeyword: "The Tank Graveyard",
        description: [
          "On the outskirts of Asmara lies a massive, open-air junkyard filled with the rusting metal carcasses of tanks, armored vehicles, and jets. These are the remnants of the 30-year War of Independence against Ethiopia.",
          "Rather than cleaning it up, the site has been kept as a poignant memorial to the struggle. It symbolizes the sheer amount of military hardware that was thrown against the Eritrean fighters, who ultimately won despite being outgunned.",
          "Locals have repurposed the site in unique ways. Families sometimes live in shipping containers amidst the wreckage, and cactus plants grow out of the gun turrets, symbolizing life returning after war."
        ],
        question: "What conflict left behind the vehicles in the Tank Graveyard?",
        options: [
          "The War of Independence.",
          "World War II.",
          "The Cold War.",
          "The Gulf War."
        ],
        answer: "The War of Independence.",
        explanation: "The debris comes from the 30-year conflict that ended with Eritrea gaining independence in 1993."
      }
    ]
  },
  "Estonia": {
    tourTitle: "The Singing Nation",
    introText: "The medieval old town of Tallinn is surrounded by original stone walls. Roam through the bogs and the forests of this northern Baltic land.",
    stops: [
      {
        stopName: "Tallinn Old Town",
        imageKeyword: "Tallinn Old Town",
        description: [
          "This UNESCO World Heritage site is one of the best-preserved medieval cities in Northern Europe. It is divided into two distinct parts: Toompea Hill, where the nobility and rulers lived, and the Lower Town, which was the center of trade and commerce for the merchants.",
          "It was a key member of the Hanseatic League, a powerful medieval trading alliance that dominated the Baltic Sea. The wealth from this trade built the opulent merchant houses and the massive limestone walls that still encircle the city today.",
          "Walking through the cobblestone streets feels like entering a fairy tale. The skyline is dominated by the spire of St. Olaf’s Church, which was effectively the tallest building in the world from 1549 to 1625, acting as a lightning rod and a beacon for ships."
        ],
        question: "Which powerful medieval trading alliance was Tallinn a part of?",
        options: [
          "The Hanseatic League.",
          "The Roman Empire.",
          "The Silk Road.",
          "The British Empire."
        ],
        answer: "The Hanseatic League.",
        explanation: "The city grew wealthy and influential as a major port in this Northern European trading network."
      },
      {
        stopName: "Lahemaa National Park",
        imageKeyword: "Lahemaa National Park",
        description: [
          "Covering over 700 square kilometers, this is the largest national park in Estonia. It is famous for its bogs—ancient, waterlogged wetlands that have been forming for thousands of years as moss decays and compresses into peat.",
          "To allow visitors to explore this spongy, wet terrain without sinking, the park has constructed a network of wooden boardwalks. These paths wind through a landscape of stunted bonsai-like pine trees and deep, dark bog pools that are perfect for swimming in the summer.",
          "The park is also strewn with massive erratic boulders. These giant rocks were carried here from Scandinavia by glaciers during the last Ice Age, and ancient folklore claimed they were tossed there by giants."
        ],
        question: "How were the massive boulders in Lahemaa transported there?",
        options: [
          "By glaciers during the Ice Age.",
          "By giants.",
          "By volcanic eruption.",
          "By human slaves."
        ],
        answer: "By glaciers during the Ice Age.",
        explanation: "The ice sheets carried the rocks from Finland and Sweden and dropped them in Estonia when the ice melted."
      },
      {
        stopName: "Kaali Meteorite Crater",
        imageKeyword: "Kaali Meteorite Crater",
        description: [
          "Located on the island of Saaremaa, this perfectly circular depression is the site of a cataclysmic event. About 3,500 years ago, a massive meteorite broke apart in the atmosphere and slammed into the earth with the force of a small nuclear bomb.",
          "It is one of the few meteorite impact sites in the world that occurred in a populated area during recorded human history. The event was likely witnessed by Bronze Age inhabitants and may have inspired regional mythology about the sun falling from the sky.",
          "Today, the main crater is filled with a greenish lake known as Kaali Lake. In ancient times, the site was considered sacred; archaeologists have found the remains of a stone wall and animal sacrifices, suggesting it was used as a shrine."
        ],
        question: "Approximately when did the Kaali meteorite impact occur?",
        options: [
          "About 3,500 years ago (Bronze Age).",
          "65 million years ago.",
          "100 years ago.",
          "1 million years ago."
        ],
        answer: "About 3,500 years ago (Bronze Age).",
        explanation: "It is a rare example of a crater formed while humans were already living in the area to witness it."
      },
      {
        stopName: "The Song Festival Grounds",
        imageKeyword: "The Song Festival Grounds",
        description: [
          "This massive outdoor amphitheater is the spiritual birthplace of modern Estonia. It features a gigantic arched stage capable of holding 15,000 singers at once, while the sloping grounds can accommodate an audience of over 100,000 people.",
          "It was the center of the \"Singing Revolution\" in the late 1980s. Hundreds of thousands of Estonians gathered here to sing forbidden patriotic songs as a form of non-violent protest against Soviet occupation, eventually leading to the restoration of independence in 1991.",
          "The acoustics are specifically designed to carry the sound of the massive human choir. Every five years, the Laulupidu (Song Festival) takes place here, a tradition that is protected by UNESCO as a Masterpiece of the Oral and Intangible Heritage of Humanity."
        ],
        question: "What non-violent protest movement is associated with this site?",
        options: [
          "The Singing Revolution.",
          "The Velvet Revolution.",
          "The Orange Revolution.",
          "The French Revolution."
        ],
        answer: "The Singing Revolution.",
        explanation: "Estonians used mass singing demonstrations to peacefully protest for their independence from the Soviet Union."
      },
      {
        stopName: "Soomaa National Park",
        imageKeyword: "Soomaa National Park",
        description: [
          "This park is famous for a unique weather phenomenon known as the \"Fifth Season.\" Every spring, the melting snow from the highlands causes the rivers to overflow, flooding the meadows and forests with meters of water.",
          "During this time, roads disappear and cars become useless. The only way to navigate the region is by canoe or traditional dugout boats called haabjas, allowing visitors to paddle through the forest, weaving between the trunks of birch and oak trees.",
          "The locals have adapted their architecture and lifestyle to this annual flood. Farms are built on higher mounds, and the traditional dugout canoe building is a skill that is still taught and preserved by the community."
        ],
        question: "What is the \"Fifth Season\" in Soomaa National Park?",
        options: [
          "The annual spring flood.",
          "The winter freeze.",
          "The summer drought.",
          "The autumn harvest."
        ],
        answer: "The annual spring flood.",
        explanation: "It is a period of high water levels caused by melting snow that transforms the landscape into a water world."
      }
    ]
  },
  "Eswatini": {
    tourTitle: "Kingdom of the Swazi",
    introText: "The king chooses a new wife during the annual Reed Dance ceremony. Watch the rhinos grazing peacefully in the protected reserves.",
    stops: [
      {
        stopName: "Mlilwane Wildlife Sanctuary",
        imageKeyword: "Mlilwane Wildlife Sanctuary",
        description: [
          "Located in the \"Valley of Heaven,\" this was the first protected conservation area established in the country. It is famous for its accommodation, where visitors sleep in traditional guqa (beehive) huts made of grass and saplings arranged in a semi-circle.",
          "The sanctuary is unique because it lacks major predators like lions or buffalo. This allows visitors to explore the park on foot, by mountain bike, or on horseback, walking safely alongside zebras, warthogs, and impalas.",
          "At the center of the park is a \"Hippo Pool.\" While the land is safe for hiking, the water is inhabited by hippos and crocodiles, which can be viewed safely from the deck of the restaurant overlooking the water."
        ],
        question: "Why are visitors allowed to walk and bike freely in Mlilwane?",
        options: [
          "There are no dangerous predators (lions, etc.) in the main area.",
          "The animals are tame.",
          "Visitors carry weapons.",
          "The park is empty."
        ],
        answer: "There are no dangerous predators (lions, etc.) in the main area.",
        explanation: "The absence of \"Big Five\" predators makes it safe for humans to roam without a vehicle."
      },
      {
        stopName: "Sibebe Rock",
        imageKeyword: "Sibebe Rock",
        description: [
          "Rising majestically out of the pine forests, this is the second-largest exposed granite monolith in the world, second only to Uluru in Australia. It is a volcanic \"pluton\"—a bubble of magma that cooled underground and was exposed by millions of years of erosion.",
          "Unlike Uluru, which is red and sits in a desert, Sibebe is grey and lush. During the rainy season, water cascades down the bare rock face in shimmering sheets, and wild orchids bloom in the cracks of the granite.",
          "Climbing the rock is a test of endurance. There are no designated trails or stairs; hikers must walk up the steep, smooth face of the stone, often scrambling on hands and knees to reach the summit for a view of the capital, Mbabane."
        ],
        question: "Sibebe Rock is the second-largest example of what geological feature?",
        options: [
          "An exposed granite monolith.",
          "A sandstone pillar.",
          "A limestone cave.",
          "A dormant volcano."
        ],
        answer: "An exposed granite monolith.",
        explanation: "It is the largest single rock dome in the world after Australia's Uluru."
      },
      {
        stopName: "Hlane Royal National Park",
        imageKeyword: "Hlane Royal National Park",
        description: [
          "The name \"Hlane\" translates to \"Wilderness\" in the local SiSwati language. This park is the largest protected area in the country and serves as the personal hunting ground of the Swazi Royal Family.",
          "It is home to the largest population of rhinos in Eswatini. The park is divided into fenced sections to keep the lions separate from the herbivores, ensuring that the expensive and endangered rhinos are not eaten.",
          "Because the park is managed for royalty, the symbol of the lion is strictly protected. It is the only place in the country where you can see lions, which are the symbol of the King (the Ngwenyama or \"Lion\")."
        ],
        question: "What does the word \"Hlane\" translate to?",
        options: [
          "Wilderness.",
          "Paradise.",
          "Hunting Ground.",
          "Lion's Den."
        ],
        answer: "Wilderness.",
        explanation: "The name reflects the rugged and untamed nature of the royal hunting grounds."
      },
      {
        stopName: "Ludzidzini Royal Village",
        imageKeyword: "Ludzidzini Royal Village",
        description: [
          "This village is the spiritual and cultural capital of the nation, home to the Queen Mother. Every year in August or September, it hosts the Umhlanga (Reed Dance), where tens of thousands of unmarried women gather to celebrate their culture.",
          "The ceremony involves the women cutting tall reeds from the riverbanks and carrying them in a massive procession to the palace. These reeds are used to repair the windbreaks around the Queen Mother's royal compound.",
          "While the event is famous internationally because the King occasionally chooses a new bride from the dancers, its primary purpose is to encourage unity among the women and to pay tribute to the Queen Mother (Indlovukazi or \"Great She-Elephant\")."
        ],
        question: "What are the reeds cut during the ceremony used for?",
        options: [
          "To repair the Queen Mother's windbreaks.",
          "To weave baskets.",
          "To build boats.",
          "To make musical instruments."
        ],
        answer: "To repair the Queen Mother's windbreaks.",
        explanation: "The reeds serve a practical purpose in maintaining the fences and structures of the royal village."
      },
      {
        stopName: "Ngwenya Mine",
        imageKeyword: "Ngwenya Mine",
        description: [
          "Located on the western border, this site holds the Guinness World Record as the oldest mine in the world. Radiocarbon dating proves that humans were extracting minerals here as far back as 43,000 years ago.",
          "The ancient miners were not looking for gold or diamonds, but for specular hematite (red ochre). This glittering red mineral was ground into a paste and used for ceremonial body paint and ritual burial purposes by Stone Age people.",
          "Today, the area is famous for the nearby Ngwenya Glass factory. Artisans collect used glass bottles from all over the country and melt them down in a furnace to hand-blow beautiful glass animals, turning modern trash into art near the ancient pit."
        ],
        question: "What material were ancient miners extracting at Ngwenya 43,000 years ago?",
        options: [
          "Red ochre (Hematite).",
          "Gold.",
          "Diamonds.",
          "Coal."
        ],
        answer: "Red ochre (Hematite).",
        explanation: "They mined the iron ore to create cosmetic and ritual pigments, not for metal tools."
      }
    ]
  },
  "Ethiopia": {
    tourTitle: "The Land of Origins",
    introText: "Churches cut from solid rock stand deep in the ground at Lalibela. Drink the coffee where the bean was first discovered long ago.",
    stops: [
      {
        stopName: "Rock-Hewn Churches of Lalibela",
        imageKeyword: "Rock-Hewn Churches of Lalibela",
        description: [
          "These eleven medieval churches are unique because they were not built up from the ground, but carved down into it. Workers chiseled away the volcanic rock of the mountain to liberate the massive block of stone, then hollowed it out to create doors, windows, and columns.",
          "King Lalibela commissioned the site in the 12th century as a \"New Jerusalem.\" After Muslim conquests halted pilgrimages to the Holy Land, he wanted to create a symbolic replica on African soil, complete with a river named Jordan.",
          "The most famous structure is the Church of Saint George (Bete Giyorgis), which is carved in the shape of a perfect Greek cross. The roof is level with the ground, making the church invisible from a distance until you are standing directly over the pit."
        ],
        question: "How were the churches of Lalibela constructed?",
        options: [
          "They were carved downward into solid rock.",
          "They were built with bricks.",
          "They were made of wood.",
          "They were molded from clay."
        ],
        answer: "They were carved downward into solid rock.",
        explanation: "They are monolithic structures, meaning each church is made from a single piece of rock that remains attached to the ground."
      },
      {
        stopName: "The Danakil Depression",
        imageKeyword: "The Danakil Depression",
        description: [
          "This geological depression is one of the hottest, lowest, and driest places on Earth. It looks like a landscape from another planet, filled with bubbling acid pools, neon-yellow sulfur vents, and vast salt pans.",
          "It is the home of the Afar people, who have survived this brutal environment for centuries. They traditionally mine \"amole\" (salt bars) from the dried lake beds, loading them onto massive camel caravans to trek out of the desert.",
          "The region also contains Erta Ale, a shield volcano famous for holding a persistent lava lake. It is one of the few places in the world where tourists can hike to the rim and look directly down into a churning cauldron of molten magma."
        ],
        question: "What traditional currency is mined in the Danakil Depression?",
        options: [
          "Salt bars (Amole).",
          "Gold coins.",
          "Cowrie shells.",
          "Silver beads."
        ],
        answer: "Salt bars (Amole).",
        explanation: "Slabs of salt cut from the desert floor were used as currency in Ethiopia for centuries."
      },
      {
        stopName: "Simien Mountains National Park",
        imageKeyword: "Simien Mountains National Park",
        description: [
          "Often called the \"Roof of Africa,\" this mountain range contains Ras Dashen, one of the highest peaks on the continent. The landscape is defined by massive jagged peaks and deep precipices formed by millions of years of erosion.",
          "It is the exclusive home of the Gelada baboon, also known as the \"bleeding-heart monkey\" because of the bright red patch of skin on its chest. They are the only primates in the world that graze on grass, often gathering in peaceful herds of several hundred.",
          "The cliffs are also the sanctuary of the Walia Ibex, a mountain goat found nowhere else. They can be seen defying gravity as they run along the vertical cliff faces to escape predators like the Ethiopian wolf."
        ],
        question: "What is the nickname of the Gelada baboon?",
        options: [
          "The bleeding-heart monkey.",
          "The golden monkey.",
          "The lion monkey.",
          "The ghost monkey."
        ],
        answer: "The bleeding-heart monkey.",
        explanation: "They are named for the distinctive hourglass-shaped patch of red skin on their chests."
      },
      {
        stopName: "Fasil Ghebbi",
        imageKeyword: "Fasil Ghebbi",
        description: [
          "Known as the \"Camelot of Africa,\" this fortress-city was the permanent capital of Ethiopia in the 17th and 18th centuries. It is filled with fairy-tale stone castles that look more like medieval Europe than East Africa.",
          "The architecture is a unique fusion of Nubian, Arab, and Baroque styles. This mix occurred because Emperor Fasilides employed Indian and Portuguese engineers to help build the complex, blending foreign techniques with local traditions.",
          "The site includes the famous Fasilides' Bath. While it looks like a swimming pool, it was actually built for religious ceremonies; it is still filled with water once a year for the Timkat festival, where thousands jump in to renew their baptismal vows."
        ],
        question: "Why is Gondar often called the \"Camelot of Africa\"?",
        options: [
          "Because of its collection of medieval-style stone castles.",
          "Because of its round tables.",
          "Because of its lush forests.",
          "Because of its foggy weather."
        ],
        answer: "Because of its collection of medieval-style stone castles.",
        explanation: "The architecture strongly resembles the romanticized castles of European Arthurian legends."
      },
      {
        stopName: "The Obelisks of Axum",
        imageKeyword: "The Obelisks of Axum",
        description: [
          "Axum was the center of the Aksumite Empire, a naval and trading power that dominated the region from 100 to 940 AD. The city is famous for its massive stelae (obelisks), which were carved from single pieces of granite to mark the underground tombs of kings.",
          "The largest of these, the Great Stele, fell and broke during construction, but it would have stood 33 meters tall and weighed 520 tons. It is considered one of the largest single stones ever quarried and moved by humans in the ancient world.",
          "According to the Ethiopian Orthodox Church, the Chapel of the Tablet in Axum houses the original Ark of the Covenant. A single guardian monk is appointed for life to watch over the relic, and no one else is ever allowed to see it."
        ],
        question: "What is traditionally believed to be hidden in the Chapel of the Tablet in Axum?",
        options: [
          "The Ark of the Covenant.",
          "The Holy Grail.",
          "The Golden Fleece.",
          "The Rosetta Stone."
        ],
        answer: "The Ark of the Covenant.",
        explanation: "Ethiopian tradition holds that the biblical artifact was brought to Ethiopia by Menelik I, the son of King Solomon and the Queen of Sheba."
      }
    ]
  }
};