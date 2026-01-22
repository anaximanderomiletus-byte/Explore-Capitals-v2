import { TourData } from "../../types";

export const toursD: Record<string, TourData> = {
  "DR Congo": {
    tourTitle: "The Forest Giant",
    introText: "One of the most biodiverse places on Earth. Trek to the edge of a bubbling lava lake and track mountain gorillas in the mist.",
    stops: [
      {
        stopName: "Virunga National Park",
        imageKeyword: "Virunga National Park",
        description: [
          "This is Africa's oldest national park and a UNESCO World Heritage site. It is famous for its exceptional biodiversity, containing more bird, mammal, and reptile species than any protected area on the African continent.",
          "It is one of the last refuges for the critically endangered Mountain Gorilla. Approximately one-third of the world's remaining population lives in the park's lush volcanic forests.",
          "The park's rangers are world-famous for their bravery, risking their lives daily to protect the animals from poachers and militia groups. Their dedication has kept the park alive through decades of conflict."
        ],
        question: "Virunga National Park is a critical refuge for which endangered primate?",
        options: [
          "Mountain Gorilla.",
          "Orangutan.",
          "Lemur.",
          "Baboon."
        ],
        answer: "Mountain Gorilla.",
        explanation: "The park protects a significant portion of the global population of these rare great apes."
      },
      {
        stopName: "Mount Nyiragongo",
        imageKeyword: "Mount Nyiragongo",
        description: [
          "Located inside Virunga National Park, this active stratovolcano contains the world's largest persistent lava lake. The lake of molten rock inside the crater churns and bubbles constantly, glowing a fiery red at night.",
          "The lava here is unusually fluid because it contains very little silica. This means when it erupts, the lava can flow downhill at speeds of up to 100 km/h (60 mph), making it incredibly dangerous.",
          "Visitors can hike to the rim of the crater and sleep in small shelters, watching the mesmerizing, violent churning of the magma below. It is one of the most spectacular volcanic sights on Earth."
        ],
        question: "What makes the lava of Mount Nyiragongo unusually dangerous?",
        options: [
          "It is extremely fluid and flows very fast.",
          "It is colder than normal lava.",
          "It is invisible.",
          "It turns into gas instantly."
        ],
        answer: "It is extremely fluid and flows very fast.",
        explanation: "Low silica content allows the lava to move at highway speeds, giving people little time to escape."
      },
      {
        stopName: "Lola ya Bonobo Sanctuary",
        imageKeyword: "Lola ya Bonobo Sanctuary",
        description: [
          "Located near Kinshasa, this is the world's only sanctuary for orphaned bonobos. Bonobos are great apes that are closely related to chimpanzees but are known for being much more peaceful and matriarchal.",
          "They are found only in the DRC. The sanctuary rescues infants whose mothers were killed for bushmeat and rehabilitates them in a protected forest environment.",
          "Bonobos share 98.7% of their DNA with humans. The sanctuary provides a unique opportunity to observe their complex social behavior, which relies on empathy and cooperation rather than aggression."
        ],
        question: "Bonobos are unique to which country?",
        options: [
          "Democratic Republic of the Congo.",
          "Brazil.",
          "India.",
          "Australia."
        ],
        answer: "Democratic Republic of the Congo.",
        explanation: "These great apes are endemic to the DRC and found nowhere else in the wild."
      },
      {
        stopName: "Boyoma Falls",
        imageKeyword: "Boyoma Falls",
        description: [
          "Formerly known as Stanley Falls, this is a series of seven cataracts spread over 100 kilometers on the Lualaba River, which becomes the Congo River after the falls. By volume of water, it is one of the largest waterfall systems in the world.",
          "The Wagenia fishermen who live here are famous for their unique fishing technique. They build massive wooden scaffolds and baskets directly into the raging rapids to catch large fish swimming upstream.",
          "The daring agility required to maintain these traps in the violent water is a tradition passed down through generations."
        ],
        question: "How do the Wagenia people fish in the Boyoma Falls?",
        options: [
          "Using wooden scaffolds and baskets in the rapids.",
          "With giant nets from helicopters.",
          "Using trained otters.",
          "With spear guns."
        ],
        answer: "Using wooden scaffolds and baskets in the rapids.",
        explanation: "They construct elaborate wooden structures anchored in the rocks to lower traps into the powerful current."
      },
      {
        stopName: "Salonga National Park",
        imageKeyword: "Salonga National Park",
        description: [
          "This is Africa's largest tropical rainforest reserve. It is isolated and accessible only by water, making it one of the most pristine and unexplored ecosystems on the planet.",
          "It plays a crucial role in regulating the global climate by absorbing massive amounts of carbon dioxide. It is the habitat of the Congo Peacock, a bird that was only discovered by scientists in 1936 because it is so elusive.",
          "The forest is so dense and the rivers so complex that much of the park has never been visited by western researchers, holding secrets of biodiversity yet to be discovered."
        ],
        question: "Salonga National Park is Africa's largest reserve of what type?",
        options: [
          "Tropical rainforest.",
          "Desert.",
          "Savanna.",
          "Coral reef."
        ],
        answer: "Tropical rainforest.",
        explanation: "It covers a massive area of the Congo Basin's dense, equatorial jungle."
      }
    ]
  },
  "Denmark": {
    tourTitle: "The Happiest Nation",
    introText: "The Little Mermaid statue sits quietly on a rock in the harbor. Cycle through a flat and happy land of colorful harbor towns.",
    stops: [
      {
        stopName: "The Little Mermaid",
        imageKeyword: "The Little Mermaid",
        description: [
          "Based on the fairy tale by Hans Christian Andersen, this bronze statue has become the national symbol of Denmark. Visitors are often surprised by its size; it is quite small, standing only 1.25 meters (about 4 feet) tall, sitting modestly on a rock just offshore.",
          "The statue has had a turbulent existence, serving as a magnet for political protests and vandalism. Over the last 50 years, she has been decapitated twice, had her arm sawn off, and been covered in paint multiple times, but she is always restored.",
          "It was commissioned in 1909 by Carl Jacobsen, the son of the founder of Carlsberg beer. He was so enchanted by a ballet performance of the fairy tale that he asked the prima ballerina to model for the statue, though she refused to pose nude, so the sculptor used his wife for the body."
        ],
        question: "Who wrote the original fairy tale that inspired the statue?",
        options: [
          "Hans Christian Andersen.",
          "The Brothers Grimm.",
          "Charles Dickens.",
          "J.K. Rowling."
        ],
        answer: "Hans Christian Andersen.",
        explanation: "The famous Danish author wrote the story in 1837."
      },
      {
        stopName: "Nyhavn",
        imageKeyword: "Nyhavn",
        description: [
          "This 17th-century waterfront district is the most photographed spot in Copenhagen. The canal is lined with brightly colored townhouses dating back to the 1600s and 1700s, which were historically the homes of sailors, merchants, and artists.",
          "Hans Christian Andersen lived here for many years. He wrote his first fairy tales while living at house number 20, later moved to number 67, and spent his final years at number 18, making the street a literary landmark.",
          "The canal is packed with historical wooden ships. The Veteran Ship and Museum Harbour acts as a living museum, where beautifully restored vessels from the past are docked permanently, adding to the maritime atmosphere."
        ],
        question: "What does the Danish name \"Nyhavn\" translate to in English?",
        options: [
          "New Harbor.",
          "Old Port.",
          "Blue Canal.",
          "King's Landing."
        ],
        answer: "New Harbor.",
        explanation: "Despite being very old now, it was named \"New Harbor\" when it was dug in the 1670s."
      },
      {
        stopName: "Tivoli Gardens",
        imageKeyword: "Tivoli Gardens",
        description: [
          "Opened in 1843, this is the second-oldest operating amusement park in the world. Unlike modern theme parks made of plastic and concrete, Tivoli is a lush garden filled with exotic architecture, thousands of colored lights, and historic rides.",
          "It famously inspired Walt Disney. After visiting Tivoli in 1951, Disney was so impressed by the clean, family-friendly atmosphere and the beautiful gardens that he used it as a primary blueprint for creating Disneyland in California.",
          "The park features one of the world's oldest wooden roller coasters, the Rutschebanen, built in 1914. It is one of the few coasters left that still employs a \"brakeman\" who sits on the train to manually control the speed during the ride."
        ],
        question: "Which famous American filmmaker used Tivoli as inspiration for his own theme park?",
        options: [
          "Walt Disney.",
          "Steven Spielberg.",
          "George Lucas.",
          "Alfred Hitchcock."
        ],
        answer: "Walt Disney.",
        explanation: "Disney visited Tivoli to study its design and atmosphere before building Disneyland."
      },
      {
        stopName: "LEGOLAND Billund",
        imageKeyword: "LEGOLAND Billund",
        description: [
          "Located in the small town of Billund, this is the original park that started a global empire. It was built next to the original LEGO factory to showcase the intricate models created by the company, which revolutionized the toy industry.",
          "The name \"LEGO\" is an abbreviation of the two Danish words leg godt, which mean \"play well.\" Coincidentally, the word also means \"I put together\" in Latin, fitting the nature of the interlocking plastic bricks perfectly.",
          "The heart of the park is Miniland, where millions of bricks are used to recreate famous sights from around the world at a 1:20 scale. It features moving parts like trains, ships, and airplanes, all constructed meticulously from standard bricks."
        ],
        question: "What do the Danish words \"Leg Godt\" (the origin of Lego) mean?",
        options: [
          "Play Well.",
          "Build High.",
          "Plastic Brick.",
          "Fun Time."
        ],
        answer: "Play Well.",
        explanation: "The founder, Ole Kirk Christiansen, combined the words to name his toy company."
      },
      {
        stopName: "Kronborg Castle",
        imageKeyword: "Kronborg Castle",
        description: [
          "Situated on the extreme northeastern tip of the island of Zealand, this castle guards the narrow sound between Denmark and Sweden. For centuries, the Danish kings forced every ship passing through this strait to pay a toll called the \"Sound Dues,\" which made the kingdom incredibly wealthy.",
          "The castle is immortalized in literature as \"Elsinore,\" the setting of William Shakespeare's play Hamlet. While it is unknown if Shakespeare ever visited, the castle hosts live performances of the play in the courtyard every summer.",
          "Deep in the dark casemates (underground tunnels) sits a statue of Holger Danske, a legendary hero. Myth says he is sleeping, but if Denmark is ever in grave danger, he will wake up, draw his sword, and defend the country."
        ],
        question: "Which Shakespeare play is set at Kronborg Castle (Elsinore)?",
        options: [
          "Hamlet.",
          "Macbeth.",
          "Romeo and Juliet.",
          "King Lear."
        ],
        answer: "Hamlet.",
        explanation: "Shakespeare used the castle as the setting for his famous tragedy about the Prince of Denmark."
      }
    ]
  },
  "Djibouti": {
    tourTitle: "The Land of Extremes",
    introText: "Whale sharks gather to feed in the nutrient-rich waters of the gulf. Float in a lake of salt that feels like drifting in outer space.",
    stops: [
      {
        stopName: "Lake Assal",
        imageKeyword: "Lake Assal",
        description: [
          "This crater lake is a geological extreme; it sits at 155 meters (509 feet) below sea level, making it the lowest point on the African continent. The intense heat evaporates the water, leaving behind a blinding white crust of salt that rings the turquoise water.",
          "It is the most saline body of water in the world outside of Antarctica, even saltier than the Dead Sea. The water is so dense with minerals that the moment you step in, your legs float up to the surface, making it impossible to sink.",
          "For centuries, the local Afar people have harvested the \"white gold\" from the lake shores. Camel caravans still trek here to load up slabs of salt to trade in the highlands of Ethiopia, a practice that has continued unchanged for generations."
        ],
        question: "Lake Assal holds which geographical record for the African continent?",
        options: [
          "It is the lowest point in Africa.",
          "It is the deepest lake.",
          "It is the largest freshwater lake.",
          "It is the hottest place on Earth."
        ],
        answer: "It is the lowest point in Africa.",
        explanation: "Sitting at 155 meters below sea level, it is the deepest depression on the continent."
      },
      {
        stopName: "The Gulf of Tadjoura",
        imageKeyword: "The Gulf of Tadjoura",
        description: [
          "Every year between October and January, this bay becomes one of the best places on Earth to swim with whale sharks. These gentle giants, which can grow up to 12 meters long, migrate here to feed on the plankton blooms that explode in the nutrient-rich waters.",
          "Despite their massive size, whale sharks are filter feeders that are harmless to humans. They swim slowly near the surface with their mouths wide open, allowing snorkelers to drift alongside them in the clear water.",
          "The gulf is also renowned for its coral reefs. Because Djibouti receives very few tourists compared to the Red Sea resorts in Egypt, the reefs remain pristine and largely untouched by human activity."
        ],
        question: "What is the primary diet of the massive whale sharks found in the gulf?",
        options: [
          "Plankton.",
          "Seals.",
          "Large fish.",
          "Seaweed."
        ],
        answer: "Plankton.",
        explanation: "They are filter feeders that consume tiny microscopic organisms and small fish, not large prey."
      },
      {
        stopName: "Lac Abbé",
        imageKeyword: "Lac Abbé",
        description: [
          "Located on the border with Ethiopia, this landscape is so alien that it was used as a filming location for the movie Planet of the Apes. It features hundreds of jagged limestone chimneys, some rising 50 meters high, that spew steam and sulfur into the air.",
          "These chimneys are formed by hot springs reacting with the lake water and calcium carbonate. As the water evaporates, it leaves behind mineral deposits that build up into these strange, hollow towers over thousands of years.",
          "Despite the harsh, hellish environment, the lake is a sanctuary for wildlife. Thousands of pink flamingos gather here to feed in the shallow waters, creating a startling contrast of soft pink feathers against the jagged, apocalyptic rock formations."
        ],
        question: "What geological feature defines the landscape of Lac Abbé?",
        options: [
          "Limestone chimneys.",
          "Icebergs.",
          "Sand dunes.",
          "Granite boulders."
        ],
        answer: "Limestone chimneys.",
        explanation: "The area is covered in hundreds of steam-venting mineral towers formed by hot springs."
      },
      {
        stopName: "Grand Bara Desert",
        imageKeyword: "Grand Bara Desert",
        description: [
          "This vast, desolate plain is the dried-up bed of an ancient lake that existed thousands of years ago. It is made of hard-packed clay that is so perfectly flat and featureless that you can see the curvature of the Earth on the horizon.",
          "Because the surface is so smooth and hard, it is often used for land sailing (sand yachting). These vehicles use sails to catch the wind and race across the desert floor at high speeds without an engine.",
          "The desert is home to a surprising array of wildlife that has adapted to the heat. It serves as a habitat for the Beira antelope, a small, fragile-looking gazelle with oversized ears that is endemic to the Horn of Africa and found almost nowhere else."
        ],
        question: "The Grand Bara is the dried remains of what geographical feature?",
        options: [
          "An ancient lake.",
          "A glacier.",
          "A river delta.",
          "A volcano."
        ],
        answer: "An ancient lake.",
        explanation: "The flat clay plain was once the floor of a large lake that evaporated as the climate changed."
      },
      {
        stopName: "Moucha Island",
        imageKeyword: "Moucha Island",
        description: [
          "Located just a short boat ride from the capital city, this small coral island sits in the middle of the Gulf of Tadjoura. It is surrounded by extensive mangrove forests, which grow directly in the salt water and serve as a nursery for young fish and sharks.",
          "The island has a curious history of occupation. In the 19th century, it was briefly occupied by the British before the French took control of the mainland, serving as a strategic pawn in the colonial struggle for control of the Red Sea shipping lanes.",
          "Today, it is a quiet escape with no paved roads or large hotels. At low tide, sandbars emerge from the sea, allowing visitors to walk hundreds of meters out into the ocean on strips of white sand surrounded by deep blue water."
        ],
        question: "What type of forest grows directly in the saltwater around Moucha Island?",
        options: [
          "Mangrove forests.",
          "Pine forests.",
          "Oak forests.",
          "Bamboo forests."
        ],
        answer: "Mangrove forests.",
        explanation: "These trees are adapted to live in saline coastal conditions, with roots that stick out of the water."
      }
    ]
  },
  "Dominica": {
    tourTitle: "The Nature Island",
    introText: "Boiling Lake bubbles constantly due to the volcanic heat below. Hike through the wildest rainforests left in the Caribbean Sea.",
    stops: [
      {
        stopName: "Boiling Lake",
        imageKeyword: "Boiling Lake",
        description: [
          "This flooded fumarole is the second-largest boiling lake in the world, measuring about 60 meters (200 feet) across. The water is heated by molten magma deep beneath the rock, keeping the temperature at a rolling boil of around 90°C (194°F) at the edges and even hotter in the center.",
          "Reaching the lake requires a grueling hike through the \"Valley of Desolation.\" This landscape changes from lush rainforest to a harsh, rocky terrain filled with sulfur vents, hot springs, and multicolored streams stained by volcanic minerals.",
          "The lake's water level can fluctuate dramatically. In 2004, the lake suddenly drained almost completely empty due to seismic shifts, only to refill weeks later, proving that the island's geology is still active and unpredictable."
        ],
        question: "What heats the water in the Boiling Lake?",
        options: [
          "Molten magma beneath the ground.",
          "Solar radiation.",
          "A chemical reaction.",
          "Friction from tectonic plates."
        ],
        answer: "Molten magma beneath the ground.",
        explanation: "The lake is essentially a flooded opening in the earth's crust that sits above a magma chamber."
      },
      {
        stopName: "Trafalgar Falls",
        imageKeyword: "Trafalgar Falls",
        description: [
          "Located just a short drive from the capital, Roseau, these twin waterfalls are affectionately known as the \"Father\" (on the left) and the \"Mother\" (on the right). The Father fall is taller at 85 meters, while the Mother fall is wider and stronger.",
          "The geology here offers a natural spa experience. At the base of the waterfalls, run-off from the cold river mixes with hot sulfur springs emerging from the ground, allowing visitors to switch between hot and cold natural pools.",
          "The cliff face behind the falls is stained orange and yellow. This coloration comes from the high iron and sulfur content in the volcanic water that has flowed over the rocks for centuries."
        ],
        question: "What are the local nicknames for the two waterfalls at Trafalgar?",
        options: [
          "Father and Mother.",
          "Brother and Sister.",
          "King and Queen.",
          "Sun and Moon."
        ],
        answer: "Father and Mother.",
        explanation: "Locals distinguish the taller fall as the \"Father\" and the wider, shorter one as the \"Mother.\""
      },
      {
        stopName: "Champagne Reef",
        imageKeyword: "Champagne Reef",
        description: [
          "This unique marine reserve offers the experience of swimming in a glass of champagne. Tiny streams of bubbles constantly rise from the sea floor, created by volcanic geothermal vents releasing gases from the earth below.",
          "The bubbles attract a variety of marine life. The reef is vibrant with sponges, trumpet fish, and sea horses that thrive in the warm, mineral-rich water created by the vents.",
          "Unlike many dive sites that require a boat, this reef is accessible directly from the shore. Swimmers can walk off the pebble beach and be surrounded by the fizzing volcanic water within just a few feet."
        ],
        question: "What creates the \"fizzing\" effect at Champagne Reef?",
        options: [
          "Geothermal vents releasing volcanic gas.",
          "Fish breathing.",
          "Scuba divers below.",
          "Carbonated water springs."
        ],
        answer: "Geothermal vents releasing volcanic gas.",
        explanation: "Gas escapes from cracks in the ocean floor, creating continuous streams of bubbles."
      },
      {
        stopName: "Titou Gorge",
        imageKeyword: "Titou Gorge",
        description: [
          "The name \"Titou\" means \"Little Throat\" in the local Creole language, a fitting description for this narrow, winding canyon filled with deep water. Light filters down from the rainforest canopy high above, creating an eerie, beautiful green glow inside.",
          "The gorge was formed by molten lava cooling and cracking open, which was then eroded by water over thousands of years. Visitors must swim upstream through the cold mountain water to reach a hidden waterfall inside the cave.",
          "It gained international fame as a filming location for the movie Pirates of the Caribbean: Dead Man's Chest. This is the spot where Captain Jack Sparrow and his crew fall into a gorge while escaping from the indigenous tribe."
        ],
        question: "What does the name \"Titou\" translate to?",
        options: [
          "Little Throat.",
          "Deep Water.",
          "Dark Cave.",
          "Green Dragon."
        ],
        answer: "Little Throat.",
        explanation: "The name refers to the narrow, throat-like shape of the water-filled canyon."
      },
      {
        stopName: "The Kalinago Territory",
        imageKeyword: "The Kalinago Territory",
        description: [
          "This 3,700-acre district on the east coast is the only dedicated territory for indigenous people in the entire Caribbean. It is home to the Kalinago (formerly known as Caribs), the pre-Columbian inhabitants who resisted European colonization for centuries.",
          "The community preserves ancient traditions that have been lost elsewhere. Artisans here are famous for weaving waterproof baskets from larouma reeds, a craft that has been passed down unchanged for generations.",
          "The territory operates with its own chief and council, maintaining a degree of autonomy from the central government. Visiting the model village, Barana Aute, offers a glimpse into how the Caribbean looked before Columbus arrived."
        ],
        question: "The Kalinago Territory is the home of which indigenous group?",
        options: [
          "The Kalinago (Caribs).",
          "The Taino.",
          "The Aztec.",
          "The Inca."
        ],
        answer: "The Kalinago (Caribs).",
        explanation: "It is the last remaining community of the pre-colonial indigenous people of the Caribbean islands."
      }
    ]
  },
  "Dominican Republic": {
    tourTitle: "The Land of Highs and Lows",
    introText: "The highest peak in the Caribbean looks down on the tropical coast. Dance to the beat of merengue on the white sandy beaches.",
    stops: [
      {
        stopName: "Pico Duarte",
        imageKeyword: "Pico Duarte",
        description: [
          "Standing at 3,098 meters (10,164 feet), this is the highest mountain in the entire Caribbean. While the country is famous for tropical heat, the temperatures at this summit can drop below freezing at night, covering the ground in morning frost.",
          "The peak is named after Juan Pablo Duarte, one of the founding fathers of the Dominican Republic. A bronze bust of the patriot sits at the very top, facing east toward the capital city of Santo Domingo.",
          "Climbing the mountain usually takes two to three days by mule or foot. The trail passes through pine forests and cloud forests that feel more like the Alps than the Caribbean, offering a dramatic contrast to the beaches below."
        ],
        question: "Pico Duarte holds which geographical record for the Caribbean region?",
        options: [
          "It is the highest peak.",
          "It is the most active volcano.",
          "It is the oldest mountain.",
          "It is the lowest point."
        ],
        answer: "It is the highest peak.",
        explanation: "Reaching over 3,000 meters, it is the tallest mountain on any Caribbean island."
      },
      {
        stopName: "Zona Colonial",
        imageKeyword: "Zona Colonial",
        description: [
          "Founded in 1496 by Bartholomew Columbus (Christopher Columbus's brother), this is the oldest permanent European settlement in the Americas. It is the site of the first cathedral, the first hospital, the first custom house, and the first university in the New World.",
          "The city layout was built using a grid pattern, which became the model for almost all future town planners in the Americas. The streets are lined with coral limestone buildings that have survived hurricanes and earthquakes for over 500 years.",
          "The Alcázar de Colón, located here, was the home of Diego Columbus, Christopher’s son. It has been restored as a museum filled with period furniture, showing exactly how the colonial elite lived in the 16th century."
        ],
        question: "Who founded the city of Santo Domingo?",
        options: [
          "Bartholomew Columbus.",
          "Christopher Columbus.",
          "Juan Ponce de León.",
          "Hernán Cortés."
        ],
        answer: "Bartholomew Columbus.",
        explanation: "The brother of Christopher Columbus established the settlement in 1496."
      },
      {
        stopName: "Lake Enriquillo",
        imageKeyword: "Lake Enriquillo",
        description: [
          "This rift valley lake is a geographical anomaly; it sits 46 meters below sea level, making it the lowest point in the Caribbean. Because it has no outlet to the sea, the water has become hypersaline—three times saltier than the ocean.",
          "Despite the harsh, salty conditions, it supports a massive population of American crocodiles. It is one of the largest concentrations of wild crocodiles in the world, who can be seen sunning themselves on the shores with their mouths open.",
          "The lake surrounds Isla Cabritos, an island famous for its two species of large iguanas: the Rhinoceros Iguana and the Ricord's Iguana. These prehistoric-looking lizards thrive in the dry, desert-like scrubland of the island."
        ],
        question: "How does the salt content of Lake Enriquillo compare to the ocean?",
        options: [
          "It is three times saltier.",
          "It is half as salty.",
          "It is fresh water.",
          "It has no salt."
        ],
        answer: "It is three times saltier.",
        explanation: "Evaporation concentrates the minerals, making the water much more saline than the sea."
      },
      {
        stopName: "The 27 Waterfalls of Damajagua",
        imageKeyword: "27 Waterfalls of Damajagua",
        description: [
          "Hidden in the Northern Corridor mountain range, the Damajagua River has carved a natural limestone canyon filled with 27 distinct waterfalls. Over thousands of years, the water has smoothed the rock into natural slides and chutes.",
          "Visiting the falls is an active adventure. Instead of just looking at them, tourists hike to the top and then make their way down by jumping off cliffs and sliding down the rock chutes into the deep turquoise pools below.",
          "The geology of the canyon includes \"God's Pool,\" a calm swimming area surrounded by high vertical walls of white limestone. The mineral-rich water gives the pools a distinct bright blue color that glows in the sunlight."
        ],
        question: "How do visitors typically descend the 27 waterfalls?",
        options: [
          "By sliding and jumping.",
          "By taking an elevator.",
          "By riding a boat.",
          "By flying a drone."
        ],
        answer: "By sliding and jumping.",
        explanation: "The smooth limestone formations act as natural water slides, allowing people to slide from one pool to the next."
      },
      {
        stopName: "Altos de Chavón",
        imageKeyword: "Altos de Chavón",
        description: [
          "This village looks like a 16th-century Mediterranean town, complete with cobblestone streets, terracotta roofs, and a Roman-style amphitheater. However, it is actually a modern architectural project built in the late 1970s and early 1980s.",
          "It was designed by a former Paramount Pictures set designer, which explains its theatrical and photogenic appearance. Every stone was cut by hand, and the ironwork was forged by local artisans to ensure it looked authentically ancient.",
          "The 5,000-seat Grecian amphitheater was inaugurated in 1982 with a televised concert by Frank Sinatra. Today, it serves as a cultural center, housing an archaeological museum and a prestigious school of design affiliated with Parsons in New York."
        ],
        question: "Which famous singer inaugurated the amphitheater at Altos de Chavón in 1982?",
        options: [
          "Frank Sinatra.",
          "Elvis Presley.",
          "Michael Jackson.",
          "Freddie Mercury."
        ],
        answer: "Frank Sinatra.",
        explanation: "The legendary crooner performed the \"Concert for the Americas\" to open the venue."
      }
    ]
  }
};