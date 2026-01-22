import { TourData } from "../../types";

export const toursP: Record<string, TourData> = {
  "Pakistan": {
    tourTitle: "The Land of Pure",
    introText: "The Karakoram Highway is the highest paved international road in the world. Stand before the massive Badshahi Mosque in the cultural heart of Lahore.",
    stops: [
      {
        stopName: "Badshahi Mosque",
        imageKeyword: "Badshahi Mosque",
        description: [
          "Built in 1673 by the Mughal Emperor Aurangzeb, this was the largest mosque in the world for over 300 years. Its courtyard can hold 100,000 worshippers.",
          "The exterior is made of red sandstone, while the three massive domes are pure white marble. This contrast was intended to represent the power (red) and purity (white) of the Mughal Empire.",
          "It holds a small museum containing relics attributed to the Prophet Muhammad, including a strand of his hair and his sandals. These relics make the mosque a significant site for religious pilgrimage beyond its architectural beauty."
        ],
        question: "Which Mughal Emperor commissioned the Badshahi Mosque?",
        options: [
          "Aurangzeb.",
          "Shah Jahan.",
          "Akbar.",
          "Babur."
        ],
        answer: "Aurangzeb.",
        explanation: "He built it to commemorate his military campaigns and project imperial power."
      },
      {
        stopName: "The Karakoram Highway",
        imageKeyword: "The Karakoram Highway",
        description: [
          "Known as the \"Eighth Wonder of the World,\" this highway connects Pakistan and China. It crosses the Khunjerab Pass at an elevation of 4,693 meters (15,397 feet), making it the highest paved international border crossing on Earth.",
          "The road passes through the Hunza Valley, famous for the longevity of its people. The valley is surrounded by \"The Cathedral of Mountains,\" including Rakaposhi, a peak that rises so sharply it creates an uninterrupted 6,000-meter vertical wall of rock and ice.",
          "Construction was incredibly difficult. Nearly 1,000 workers died during the 20 years it took to blast the road out of the sheer granite cliffs, a sacrifice honored by monuments along the route."
        ],
        question: "The Karakoram Highway holds the record for being the highest what?",
        options: [
          "Paved international road (border crossing).",
          "Railway line.",
          "Suspension bridge.",
          "Ski resort."
        ],
        answer: "Paved international road (border crossing).",
        explanation: "It reaches nearly 4,700 meters at the China-Pakistan border."
      },
      {
        stopName: "Mohenjo-daro",
        imageKeyword: "Mohenjo-daro",
        description: [
          "Dating back to 2500 BC, this was one of the largest settlements of the ancient Indus Valley Civilization. It was contemporary with Ancient Egypt and Mesopotamia but was lost for thousands of years until its rediscovery in the 1920s.",
          "The city was incredibly advanced for its time. It had a planned grid layout, a complex sewage system with covered drains, and even public toilets—amenities that many European cities didn't achieve until the modern era.",
          "The \"Great Bath\" is the most famous structure. It is a large, waterproof brick pool believed to have been used for ritual purification, suggesting that cleanliness was a spiritual concept for this mysterious culture."
        ],
        question: "What advanced urban feature did Mohenjo-daro possess 4,000 years ago?",
        options: [
          "A complex sewage/drainage system.",
          "Electric streetlights.",
          "Skyscrapers.",
          "Subway trains."
        ],
        answer: "A complex sewage/drainage system.",
        explanation: "Every house was connected to a drainage network that removed waste from the city."
      },
      {
        stopName: "Fairy Meadows and Nanga Parbat",
        imageKeyword: "Fairy Meadows and Nanga Parbat",
        description: [
          "Fairy Meadows is a lush alpine pasture that offers the best view of Nanga Parbat, the ninth-highest mountain in the world (8,126 meters).",
          "Nanga Parbat is nicknamed the \"Killer Mountain.\" It is notoriously difficult to climb and has a high fatality rate; historically, many climbers died trying to scale its sheer, icy face before the first successful ascent in 1953.",
          "The meadow itself was named by German climbers who thought the landscape looked like something out of a fairy tale. It is accessible only by a terrifying jeep ride on a narrow cliff road followed by a steep hike."
        ],
        question: "What is the nickname of the mountain Nanga Parbat?",
        options: [
          "The Killer Mountain.",
          "The White Giant.",
          "The Shining Peak.",
          "The Holy Mother."
        ],
        answer: "The Killer Mountain.",
        explanation: "It earned this name due to the high number of climber fatalities in the early 20th century."
      },
      {
        stopName: "Lahore Fort",
        imageKeyword: "Lahore Fort",
        description: [
          "Located opposite the Badshahi Mosque, this massive fortress was built, destroyed, and rebuilt by successive Mughal Emperors. It is a timeline of Mughal architecture, evolving from red sandstone to white marble.",
          "The jewel of the fort is the Sheesh Mahal (Palace of Mirrors). Built by Shah Jahan (who also built the Taj Mahal), the walls and ceiling are covered in thousands of tiny convex glass mirrors that reflect candlelight to create a starry sky effect.",
          "The \"Picture Wall\" on the exterior is the world's largest picture wall. It is 450 meters long and decorated with glazed tiles depicting elephant fights, polo games, and angels, which violated the usual Islamic prohibition on animal imagery."
        ],
        question: "What distinctive decoration covers the interior of the Sheesh Mahal?",
        options: [
          "Thousands of tiny mirrors.",
          "Gold leaf.",
          "Precious gems.",
          "Silk tapestries."
        ],
        answer: "Thousands of tiny mirrors.",
        explanation: "The glass mosaic was designed to reflect light and create a glittering effect for the royal court."
      }
    ]
  },
  "Palau": {
    tourTitle: "The Pristine Paradise",
    introText: "Millions of harmless jellyfish fill a marine lake isolated from the sea. Kayak through the rock islands that look like mushrooms in the water.",
    stops: [
      {
        stopName: "Jellyfish Lake",
        imageKeyword: "Jellyfish Lake",
        description: [
          "This marine lake is cut off from the ocean, connected only by fissures in the limestone rock. Over 12,000 years of isolation, the Golden Jellyfish living here have lost their ability to sting humans because they have no natural predators.",
          "Millions of jellyfish migrate across the lake every day. They follow the arc of the sun to feed the symbiotic algae living inside their tissues, which provide them with energy through photosynthesis.",
          "Swimming here offers a surreal experience. You can swim through a thick cloud of pulsing, soft orange bells without wearing a wetsuit or fearing a sting."
        ],
        question: "Why have the Golden Jellyfish in this lake lost their sting?",
        options: [
          "Lack of natural predators.",
          "The water is too cold.",
          "They eat plants.",
          "Pollution."
        ],
        answer: "Lack of natural predators.",
        explanation: "Isolated in the lake, they had no need for defense mechanisms, so the sting evolved away."
      },
      {
        stopName: "The Rock Islands",
        imageKeyword: "The Rock Islands",
        description: [
          "This UNESCO World Heritage site consists of over 400 limestone islands scattered in a turquoise lagoon. They are famous for their mushroom shape; grazing sea creatures and wave erosion have undercut the base of the islands, making them look top-heavy.",
          "The lagoon is a maze of hidden coves and marine lakes. It is one of the most biodiverse places on Earth, home to complex coral reefs, dugongs, and thirteen different species of sharks.",
          "Kayaking is the best way to explore. The shallow water and calm lagoon allow paddlers to glide silently under the overhangs of the mushroom islands and into secret caves."
        ],
        question: "What natural force gives the Rock Islands their mushroom shape?",
        options: [
          "Erosion (by waves/creatures).",
          "Volcanic growth.",
          "Man-made carving.",
          "Falling sea levels."
        ],
        answer: "Erosion (by waves/creatures).",
        explanation: "The water wears away the limestone at the waterline, leaving the top covered in vegetation wider than the base."
      },
      {
        stopName: "The Milky Way",
        imageKeyword: "The Milky Way Palau",
        description: [
          "This is a cove within the Rock Islands where the bottom is covered in thick, white limestone mud. The constant motion of the water churns up the white silt, turning the water a distinctive opaque, milky-blue color.",
          "It is a natural spa. Guides dive down to retrieve buckets of the white mud, and tourists cover themselves in it. The sulfur-rich mud is rumored to exfoliate the skin and make you look ten years younger.",
          "After the mud dries in the sun, visitors jump into the turquoise water to rinse off, leaving their skin feeling incredibly soft."
        ],
        question: "What gives the water in the \"Milky Way\" lagoon its opaque color?",
        options: [
          "White limestone mud (silt).",
          "Milk.",
          "Pollution.",
          "White sand."
        ],
        answer: "White limestone mud (silt).",
        explanation: "The fine white sediment on the bottom is suspended in the water, creating the milky effect."
      },
      {
        stopName: "Blue Corner",
        imageKeyword: "Blue Corner",
        description: [
          "Rated as one of the best dive sites in the world, Blue Corner is an underwater plateau that juts out into the deep ocean. Strong currents hit the wall, bringing up nutrient-rich water that attracts massive schools of fish and sharks.",
          "It is famous for \"Reef Hook\" diving. Because the current is so strong, divers use a metal hook attached to a rope to anchor themselves to a rock. They then inflate their vest and fly like a kite in the current, watching the \"shark show\" pass by.",
          "You can see Grey Reef Sharks, eagle rays, tuna, and Napoleon Wrasse all in one dive, congregating at the edge of the drop-off to feed in the current."
        ],
        question: "What tool do divers use at Blue Corner to stay in place against the current?",
        options: [
          "A Reef Hook.",
          "A heavy anchor.",
          "A net.",
          "Magnetic boots."
        ],
        answer: "A Reef Hook.",
        explanation: "It anchors them to the reef so they can watch the marine life without exhausting themselves swimming."
      },
      {
        stopName: "Peleliu",
        imageKeyword: "Peleliu WWII Tank",
        description: [
          "This island was the site of one of the fiercest battles of World War II. In 1944, US Marines fought to take the island from the Japanese; the battle was expected to take 4 days but lasted over 2 months.",
          "The island is a living museum. It has been left largely untouched since 1944, meaning visitors can walk past rusted tanks, crashed Zero fighter planes, and hidden caves that still contain the canteens and boots of soldiers.",
          "Bloody Nose Ridge is the central high point where the Japanese defenders held out in a network of tunnels. The steep coral ridges made it a nightmare for the attacking Marines, resulting in the highest casualty rate of any amphibious assault in US history."
        ],
        question: "Why is Peleliu historically significant?",
        options: [
          "Site of a major WWII battle.",
          "Birthplace of the first King.",
          "Site of a nuclear test.",
          "Capital of the ancient empire."
        ],
        answer: "Site of a major WWII battle.",
        explanation: "The island preserves the wreckage and caves from the 1944 conflict between the US and Japan."
      }
    ]
  },
  "Panama": {
    tourTitle: "The Bridge of the World",
    introText: "The famous canal connects the Atlantic and Pacific oceans for giant ships. Spot sloths and monkeys in the jungle right next to the city.",
    stops: [
      {
        stopName: "The Panama Canal",
        imageKeyword: "The Panama Canal",
        description: [
          "This engineering marvel is an 82-kilometer waterway that cuts through the isthmus of Panama, saving ships the treacherous 8,000-mile journey around the tip of South America.",
          "The Miraflores Locks serve as a \"water elevator.\" They use gravity to raise massive ships 26 meters (85 feet) above sea level to the level of Gatun Lake, then lower them back down on the other side.",
          "The system is powered by rain. The freshwater from Gatun Lake is used to fill the locks; every time a ship passes through, millions of gallons of fresh water are flushed out to sea, which is why water conservation is critical for the canal's operation."
        ],
        question: "What is the primary function of the locks in the Panama Canal?",
        options: [
          "To raise and lower ships (like an elevator).",
          "To clean the ships.",
          "To inspect cargo.",
          "To refuel ships."
        ],
        answer: "To raise and lower ships (like an elevator).",
        explanation: "They lift vessels over the continental divide using water pressure."
      },
      {
        stopName: "Casco Viejo",
        imageKeyword: "Casco Viejo",
        description: [
          "This is the historic district of Panama City, built in 1673 after the original city was destroyed by the pirate Henry Morgan. It is a UNESCO World Heritage site known for its mix of French, Spanish, and American architecture.",
          "The neighborhood is a study in contrasts. Beautifully restored colonial mansions stand right next to crumbling ruins that are being reclaimed by nature, though gentrification is rapidly restoring the entire area.",
          "It houses the Golden Altar (Altar de Oro) in the Church of San José. Legend says that when the pirate Henry Morgan attacked, a priest painted the massive gold altar black to disguise it as wood, saving it from being looted."
        ],
        question: "How did the priest allegedly save the Golden Altar from pirate Henry Morgan?",
        options: [
          "He painted it black.",
          "He buried it.",
          "He hid it in a cave.",
          "He melted it down."
        ],
        answer: "He painted it black.",
        explanation: "Disguising the gold as worthless wood prevented the pirates from stealing it."
      },
      {
        stopName: "San Blas Islands",
        imageKeyword: "San Blas Islands",
        description: [
          "This archipelago consists of 365 islands (one for every day of the year) inhabited by the indigenous Guna people. They have full autonomy over the region and have successfully resisted western development, meaning there are no luxury hotels or resorts.",
          "The Guna are famous for their Molas. These are colorful, intricate textile panels made by the women using a reverse appliqué technique, often depicting geometric patterns or animals.",
          "Visitors stay in simple thatched huts on the sand. The islands are so low-lying that global warming is a major threat; the Guna may become some of the first climate refugees to be forced to move to the mainland."
        ],
        question: "The San Blas Islands are governed by which indigenous group?",
        options: [
          "The Guna (Guna Yala).",
          "The Maya.",
          "The Inca.",
          "The Embera."
        ],
        answer: "The Guna (Guna Yala).",
        explanation: "They have an autonomous territory and strictly control tourism on the islands."
      },
      {
        stopName: "Bocas del Toro",
        imageKeyword: "Bocas del Toro",
        description: [
          "Located on the Caribbean coast, this archipelago is a laid-back tropical paradise famous for its biodiversity. The islands are covered in rainforest and surrounded by calm, clear water.",
          "Starfish Beach (Playa Estrella) is the most famous spot. The shallow water is filled with giant orange starfish (sea stars). Visitors can wade among them, but touching or lifting them out of the water is strictly forbidden as it kills them.",
          "The islands are home to the Red Frog Beach, named after the tiny Strawberry Poison-Dart Frog found in the jungle here. These frogs are endemic to this specific region of Panama."
        ],
        question: "What animal is abundant in the shallow waters of Playa Estrella?",
        options: [
          "Starfish (Sea Stars).",
          "Jellyfish.",
          "Seahorses.",
          "Clownfish."
        ],
        answer: "Starfish (Sea Stars).",
        explanation: "The beach is famous for the population of large orange starfish resting on the sand."
      },
      {
        stopName: "Soberanía National Park",
        imageKeyword: "Soberanía National Park",
        description: [
          "Located just 25 kilometers from Panama City, this park is one of the most accessible rainforests in the world. It is a birdwatcher's holy grail, specifically the \"Pipeline Road.\"",
          "The Pipeline Road was built during WWII to maintain an oil pipeline that was never used. Today, the road cuts through the heart of the jungle, creating a clear viewing corridor where birders can spot over 400 species, including toucans and harpy eagles.",
          "Because the park borders the canal, it protects the watershed. The forest acts as a sponge, ensuring that enough rainwater flows into Gatun Lake to keep the canal locks operating during the dry season."
        ],
        question: "Pipeline Road is world-famous for what activity?",
        options: [
          "Birdwatching.",
          "Drag racing.",
          "Mountain biking.",
          "Zip-lining."
        ],
        answer: "Birdwatching.",
        explanation: "It holds records for the number of bird species spotted in a 24-hour period."
      }
    ]
  },
  "Papua New Guinea": {
    tourTitle: "The Land of a Thousand Cultures",
    introText: "Tribes in the highlands still practice traditions thousands of years old. Dive onto pristine coral reefs in the remote Bismarck Sea.",
    stops: [
      {
        stopName: "Mount Hagen",
        imageKeyword: "Mount Hagen Cultural Show",
        description: [
          "The Mount Hagen Cultural Show is one of the largest tribal gatherings (Sing-Sing) in the world. Over 100 different tribes gather to share their cultural traditions through dance and music, promoting peace between groups that were historically enemies.",
          "The costumes are incredibly elaborate. Dancers wear headdresses made from the feathers of the Bird of Paradise, paint their bodies with clay and charcoal, and wear shells and boar tusks to represent their wealth and status.",
          "It takes place in the Western Highlands. This region was unknown to the outside world until the 1930s, when gold prospectors stumbled upon the fertile valleys and discovered over a million people living there in isolation."
        ],
        question: "What is the primary purpose of the Mount Hagen Cultural Show?",
        options: [
          "To share culture and promote peace between tribes.",
          "To trade gold.",
          "To elect a new chief.",
          "To prepare for war."
        ],
        answer: "To share culture and promote peace between tribes.",
        explanation: "It brings disparate groups together to celebrate heritage rather than fight."
      },
      {
        stopName: "The Sepik River",
        imageKeyword: "The Sepik River",
        description: [
          "The Sepik is the longest river in PNG and is often compared to the Amazon. It winds through swamps and jungles that are home to tribes famous for their intricate wood carvings and \"Spirit Houses\" (Haus Tambaran).",
          "The Spirit House is the center of village life for men. It contains the sacred masks and carvings of the ancestors. The architecture is striking, often featuring a towering triangular facade decorated with painted faces.",
          "The river tribes revere the crocodile. In a rite of passage, young men undergo a scarification ceremony where their backs are cut with razor blades to create scars that resemble the scales of a crocodile, symbolizing the spirit of the river swallowing them and spitting them out as men."
        ],
        question: "What animal do the Sepik River tribes revere and imitate through scarification?",
        options: [
          "The Crocodile.",
          "The Shark.",
          "The Snake.",
          "The Eagle."
        ],
        answer: "The Crocodile.",
        explanation: "They believe they are descended from the crocodile and mark their skin to look like scales."
      },
      {
        stopName: "Kokoda Track",
        imageKeyword: "Kokoda Track",
        description: [
          "This 96-kilometer single-file trail crosses the rugged Owen Stanley Mountain Range. It is the site of a brutal World War II campaign where Australian soldiers stopped the Japanese advance toward Port Moresby in 1942.",
          "Hiking the track is a pilgrimage for Australians. It takes 8 to 10 days of grueling trekking through mud, steep inclines, and humid jungle, passing by old battlefields and war memorials.",
          "The terrain is unforgiving. Soldiers nicknamed the steep steps \"The Golden Staircase\"—logs cut into the mud that were agonizing to climb while carrying heavy packs and fighting malaria."
        ],
        question: "The Kokoda Track is the site of a WWII battle between which two nations?",
        options: [
          "Australia and Japan.",
          "USA and Germany.",
          "Britain and Italy.",
          "China and Japan."
        ],
        answer: "Australia and Japan.",
        explanation: "Australian troops successfully defended the track against the Japanese army."
      },
      {
        stopName: "Tavurvur Volcano",
        imageKeyword: "Tavurvur Volcano",
        description: [
          "Rabaul was once the \"Pearl of the Pacific\" until 1994, when the twin volcanoes Tavurvur and Vulcan erupted simultaneously, burying the city in ash.",
          "Today, Rabaul is a Pompeii-like ghost town. Visitors can drive through streets covered in meters of gray ash and explore the ruins of buildings that were crushed by the weight of the debris.",
          "The volcanoes are still active. Tavurvur frequently belches steam and ash clouds, and the ground around the harbor is hot to the touch. The locals dig holes in the hot earth to cook the eggs of the Megapode bird, which buries its eggs in the volcanic soil to incubate."
        ],
        question: "What happened to the city of Rabaul in 1994?",
        options: [
          "It was buried by a volcanic eruption.",
          "It was destroyed by a tsunami.",
          "It was bombed.",
          "It sank into the sea."
        ],
        answer: "It was buried by a volcanic eruption.",
        explanation: "Twin eruptions destroyed the city, leaving it covered in ash."
      },
      {
        stopName: "Tufi Fjords",
        imageKeyword: "Tufi Fjords",
        description: [
          "These are \"tropical fjords,\" a rare geological feature. Unlike Norwegian fjords carved by ice, these were formed by ancient volcanic eruptions that spewed lava into the sea. The lava cooled and cracked, allowing the sea to flood the deep valleys.",
          "The cliffs are covered in moss and rainforest, dropping vertically into the water. Beneath the surface, the fjords are lined with spectacular coral reefs and sponges, making it a unique diving location.",
          "The area is known for its tapa cloth. Local women make cloth from the bark of the mulberry tree, soaking and beating it until it is soft, then painting it with traditional clan designs using natural dyes."
        ],
        question: "How were the \"tropical fjords\" of Tufi formed?",
        options: [
          "By volcanic eruptions (lava flows).",
          "By glaciers.",
          "By river erosion.",
          "By meteor impact."
        ],
        answer: "By volcanic eruptions (lava flows).",
        explanation: "Lava flowed into the sea and cracked open, creating deep channels that flooded with water."
      }
    ]
  },
  "Paraguay": {
    tourTitle: "The Heart of South America",
    introText: "The massive Itaipú Dam generates nearly all the electricity for the nation. Drink tereré with locals in the shade of a lapacho tree.",
    stops: [
      {
        stopName: "Itaipú Dam",
        imageKeyword: "Itaipú Dam",
        description: [
          "Shared with Brazil, this is one of the largest hydroelectric dams in the world. It produces so much energy that it supplies nearly 90% of Paraguay’s entire electricity demand and about 15% of Brazil’s.",
          "The amount of concrete used to build the dam could build 210 football stadiums. The iron and steel used was enough to build 380 Eiffel Towers.",
          "It is considered one of the Seven Wonders of the Modern World by the American Society of Civil Engineers. The dam is so large that the workers had to shift the course of the Paraná River—the seventh biggest river in the world—to build it."
        ],
        question: "Itaipú Dam provides approximately what percentage of Paraguay's electricity?",
        options: [
          "Nearly 90%.",
          "50%.",
          "10%.",
          "100%."
        ],
        answer: "Nearly 90%.",
        explanation: "The dam produces a massive surplus of energy for the small nation, which exports the rest to Brazil."
      },
      {
        stopName: "Jesuit Missions of La Santísima Trinidad de Paraná",
        imageKeyword: "Jesuit Missions Paraguay",
        description: [
          "These ruins are the remnants of the \"Jesuit Reductions\"—mini-societies built in the 17th and 18th centuries to convert the indigenous Guaraní people to Christianity while protecting them from slave traders.",
          "Unlike other colonial missions, these were communal societies where the Guaraní and Jesuits lived and worked together in relative equality, producing music, art, and architecture that blended European and indigenous styles.",
          "The church at Trinidad was massive, featuring a pulpit made of stone and elaborate friezes of angels playing indigenous instruments, symbolizing the cultural fusion of the mission."
        ],
        question: "What was the primary purpose of the Jesuit Reductions?",
        options: [
          "To convert/protect the Guaraní people.",
          "To mine gold.",
          "To build forts.",
          "To farm tobacco."
        ],
        answer: "To convert/protect the Guaraní people.",
        explanation: "They served as sanctuaries against slave raiders and centers for religious conversion."
      },
      {
        stopName: "Saltos del Monday",
        imageKeyword: "Saltos del Monday",
        description: [
          "Often overshadowed by Iguazu Falls nearby, Saltos del Monday is a spectacular 40-meter tall waterfall located entirely within Paraguay. The name \"Monday\" comes from the Guaraní word meaning \"water that steals the river.\"",
          "The falls crash down over jagged basalt rock steps, creating a constant cloud of mist that nourishes the surrounding Atlantic Forest vegetation.",
          "It is a popular spot for adventure sports. Visitors can rappel down the rocky walls next to the falls or take an elevator down to the riverbank to feel the spray of the water up close."
        ],
        question: "What does the Guaraní word \"Monday\" mean in the context of the falls?",
        options: [
          "Water that steals the river.",
          "Thunder water.",
          "White smoke.",
          "Angry river."
        ],
        answer: "Water that steals the river.",
        explanation: "It describes how the river suddenly disappears over the precipice."
      },
      {
        stopName: "The Chaco Wilderness",
        imageKeyword: "The Chaco Wilderness",
        description: [
          "The Gran Chaco is a vast, sparsely populated region that covers about 60% of Paraguay's land area but contains less than 5% of its population. It is a harsh landscape of dry forests and thorny scrub.",
          "It is known as the \"Green Hell\" due to its extreme temperatures and impenetrable vegetation. However, it is a wildlife paradise, home to pumas, tapirs, giant anteaters, and the highest concentration of jaguars in the country.",
          "The region was the site of the Chaco War (1932-1935) between Paraguay and Bolivia. It was the bloodiest conflict in South America in the 20th century, fought over rumors of oil that turned out to be largely false."
        ],
        question: "What is the nickname for the harsh Chaco region?",
        options: [
          "The Green Hell.",
          "The Red Desert.",
          "The Dead Zone.",
          "The Empty Quarter."
        ],
        answer: "The Green Hell.",
        explanation: "The name refers to the difficult terrain, heat, and dense thorny vegetation."
      },
      {
        stopName: "Tereré Culture",
        imageKeyword: "Tereré Culture",
        description: [
          "Tereré is the national drink of Paraguay. It is an infusion of yerba mate and medicinal herbs (yuyos), similar to hot mate but prepared with ice-cold water to combat the sweltering heat.",
          "It is more than just a drink; it is a social ritual. A group sits in a circle, and the \"cebador\" (server) fills the designated cup (guampa) and passes it around. It is an insult to say \"thank you\" until you are finished and don't want any more.",
          "The tradition is so important that Paraguay has a \"National Tereré Day\" (the last Saturday of February), and the practice is recognized by UNESCO as Intangible Cultural Heritage."
        ],
        question: "How does Tereré differ from traditional Yerba Mate?",
        options: [
          "It is made with ice-cold water.",
          "It uses milk.",
          "It has alcohol.",
          "It is eaten as a paste."
        ],
        answer: "It is made with ice-cold water.",
        explanation: "While traditional mate is hot, tereré is cold to suit Paraguay's hot climate."
      }
    ]
  },
  "Peru": {
    tourTitle: "The Land of the Incas",
    introText: "The ruins of Machu Picchu sit hidden high in the Andes clouds. Walk through the colonial streets of Cusco built on Inca stones.",
    stops: [
      {
        stopName: "Machu Picchu",
        imageKeyword: "Machu Picchu",
        description: [
          "This \"Lost City of the Incas\" sits at 2,430 meters (7,970 feet) above sea level. It was built around 1450 but abandoned a century later during the Spanish Conquest. The Spanish never found it, which is why it remained intact and was not destroyed like other Inca sites.",
          "The stonework is an engineering marvel. The Incas used the \"ashlar\" technique, cutting stones so precisely that they fit together without mortar. The fit is so tight that not even a knife blade can fit between the rocks.",
          "It was brought to international attention in 1911 by American historian Hiram Bingham, who was actually looking for a different lost city (Vilcabamba) when local farmers led him to the ruins."
        ],
        question: "Why did the Spanish never destroy Machu Picchu?",
        options: [
          "They never found it.",
          "It was too high.",
          "They respected it.",
          "They used it as a fort."
        ],
        answer: "They never found it.",
        explanation: "Its remote location high in the mountains kept it hidden from the conquistadors."
      },
      {
        stopName: "Cusco",
        imageKeyword: "Cusco Inca Walls",
        description: [
          "Cusco was the capital of the Inca Empire. When the Spanish conquered the city, they tore down the Inca temples but kept the foundations, building their colonial churches and mansions directly on top of the indestructible Inca walls.",
          "The most famous example is the \"12-Angled Stone\" on Hatun Rumiyoc Street. It is a massive boulder in a wall that has twelve perfectly carved corners fitting like a jigsaw puzzle with the surrounding stones.",
          "The Qorikancha (Temple of the Sun) was once the richest temple in the empire. Its walls were covered in 700 sheets of solid gold, which the Spanish melted down. Today, you can see the smooth, dark grey Inca stone walls inside the colonial Convent of Santo Domingo."
        ],
        question: "What is unique about the colonial buildings in Cusco?",
        options: [
          "They are built on top of Inca foundations/walls.",
          "They are made of wood.",
          "They are painted blue.",
          "They have no windows."
        ],
        answer: "They are built on top of Inca foundations/walls.",
        explanation: "The Spanish utilized the superior earthquake-proof Inca stonework as bases for their own structures."
      },
      {
        stopName: "Lake Titicaca",
        imageKeyword: "Lake Titicaca Uros",
        description: [
          "Sitting at 3,812 meters (12,507 feet), this is the highest navigable lake in the world. It is the legendary birthplace of the first Inca king, Manco Cápac, who emerged from the waters to found the empire.",
          "The Uros people live on artificial islands made entirely of totora reeds. The islands float on the water, and the residents must constantly add fresh layers of reeds to the top as the bottom layers rot away.",
          "The reeds are used for everything: building the islands, constructing boats (balsas), building houses, and even as food (the white lower part of the reed is edible and tastes like celery)."
        ],
        question: "What material are the floating islands of the Uros people made from?",
        options: [
          "Totora reeds.",
          "Bamboo.",
          "Palm leaves.",
          "Recycled plastic."
        ],
        answer: "Totora reeds.",
        explanation: "The dried reeds are bundled together to create the buoyant islands."
      },
      {
        stopName: "The Nazca Lines",
        imageKeyword: "The Nazca Lines",
        description: [
          "These are a series of ancient geoglyphs etched into the Nazca Desert between 500 BC and 500 AD. They depict animals like a hummingbird, a spider, a monkey, and a condor, some measuring up to 370 meters long.",
          "They were made by removing the reddish-brown iron oxide pebbles from the surface to reveal the light-colored clay earth underneath. Because the desert is windless and dry, the lines have remained visible for 2,000 years.",
          "The purpose of the lines is still debated. Theories range from an astronomical calendar to a map of underground water sources, or walking paths for religious processions to ask the gods for rain."
        ],
        question: "How were the Nazca Lines created?",
        options: [
          "By removing the top layer of dark rocks to reveal lighter soil.",
          "By painting the ground.",
          "By planting trees.",
          "By burning the sand."
        ],
        answer: "By removing the top layer of dark rocks to reveal lighter soil.",
        explanation: "The contrast between the dark surface stones and the pale ground creates the image."
      },
      {
        stopName: "Rainbow Mountain",
        imageKeyword: "Rainbow Mountain",
        description: [
          "Located in the Andes near Cusco, this mountain is famous for its natural multi-colored stripes. The colors are created by mineral deposits: iron (red), sulfur (yellow), copper (green), and manganese (purple).",
          "It was only \"discovered\" recently. The mountain was historically covered by a glacier, which melted due to climate change around 2015, revealing the colorful soil underneath to the world.",
          "The hike is challenging not because of the terrain, but the altitude. The summit sits at 5,200 meters (17,060 feet)—almost the same height as Everest Base Camp—leaving many tourists gasping for air."
        ],
        question: "What caused the Rainbow Mountain to become visible in recent years?",
        options: [
          "Melting glaciers (Climate Change).",
          "An earthquake.",
          "A landslide.",
          "Volcanic eruption."
        ],
        answer: "Melting glaciers (Climate Change).",
        explanation: "The ice cap that previously hid the colors melted away, exposing the mineral stripes."
      }
    ]
  },
  "Philippines": {
    tourTitle: "The Pearl of the Orient Seas",
    introText: "The Chocolate Hills turn brown in the dry season and look like mounds. Swim in the clear lagoons hidden by sharp limestone cliffs.",
    stops: [
      {
        stopName: "The Chocolate Hills",
        imageKeyword: "The Chocolate Hills",
        description: [
          "This geological formation consists of at least 1,260 perfectly cone-shaped hills spread over an area of 50 square kilometers. They range in height from 30 to 50 meters.",
          "They are covered in green grass that turns chocolate brown during the dry season, making them look like rows of giant Hershey's Kisses, which gives them their name.",
          "Geologically, they are marine limestone coral reefs that were uplifted from the sea millions of years ago and eroded by rain and water into their current smooth, conical shapes."
        ],
        question: "Why are they called the \"Chocolate Hills\"?",
        options: [
          "The grass turns brown in the dry season.",
          "They are made of cocoa.",
          "A chocolate factory is nearby.",
          "They are covered in mud."
        ],
        answer: "The grass turns brown in the dry season.",
        explanation: "When the grass dies back, the hills resemble giant chocolate mounds."
      },
      {
        stopName: "El Nido",
        imageKeyword: "El Nido",
        description: [
          "El Nido is famous for its dramatic karst scenery. Massive black limestone cliffs rise vertically out of the crystal-clear turquoise water, guarding hidden lagoons and secret beaches.",
          "The \"Big Lagoon\" and \"Small Lagoon\" are the highlights. Visitors often kayak through narrow cracks in the rock walls to enter these calm, enclosed pools of water that feel like natural cathedrals.",
          "The name El Nido means \"The Nest\" in Spanish. It refers to the edible nests of swiftlets found in the limestone caves, which are harvested to make the expensive delicacy Bird's Nest Soup."
        ],
        question: "What does the name \"El Nido\" refer to?",
        options: [
          "The Nest (edible bird's nests).",
          "The Island.",
          "The Paradise.",
          "The Lagoon."
        ],
        answer: "The Nest (edible bird's nests).",
        explanation: "The area is a source of swiftlet nests used for soup."
      },
      {
        stopName: "Banaue Rice Terraces",
        imageKeyword: "Banaue Rice Terraces",
        description: [
          "Often called the \"Eighth Wonder of the World,\" these terraces were carved into the mountains of Ifugao by ancestors of the indigenous people 2,000 years ago.",
          "They were built largely by hand using minimal tools. If the walls were laid end-to-end, they would stretch halfway around the globe. The terraces follow the natural contours of the mountain to maximize the planting area.",
          "They use an ancient irrigation system that taps water from the rainforests above the terraces. The water is channeled down through the steps, ensuring every level receives hydration for the rice."
        ],
        question: "If the walls of the Banaue Rice Terraces were laid end-to-end, how far would they reach?",
        options: [
          "Halfway around the globe.",
          "Across Asia.",
          "To the moon.",
          "Around the island of Luzon."
        ],
        answer: "Halfway around the globe.",
        explanation: "The sheer scale of the engineering covers a massive distance."
      },
      {
        stopName: "Taal Volcano",
        imageKeyword: "Taal Volcano",
        description: [
          "Taal is one of the most complex volcanoes in the world. It is famously described as \"an island within a lake, on an island within a lake, on an island.\"",
          "Vulcan Point is a tiny rock island inside the Main Crater Lake, which sits on Volcano Island, which sits in Taal Lake, which is on the island of Luzon. This Russian-doll geography makes it a unique geological curiosity.",
          "It is the second most active volcano in the Philippines. Despite its small size, it has erupted 34 times since 1572, often causing evacuations of the surrounding towns."
        ],
        question: "What is the unique geographic feature of Vulcan Point?",
        options: [
          "It is an island in a lake on an island in a lake on an island.",
          "It is the largest crater in the world.",
          "It is a floating island.",
          "It is made of pure sulfur."
        ],
        answer: "It is an island in a lake on an island in a lake on an island.",
        explanation: "It sits at the center of a recursive geological formation."
      },
      {
        stopName: "Tubbataha Reefs Natural Park",
        imageKeyword: "Tubbataha Reefs Natural Park",
        description: [
          "Located in the middle of the Sulu Sea, this remote marine park is accessible only by liveaboard boat. It is a UNESCO World Heritage site and is widely considered the best diving spot in the Philippines.",
          "The park consists of two huge atolls that rise from the deep ocean depths. Because it is so isolated, the coral reefs are pristine and cover over 10,000 hectares, hosting 600 species of fish and 360 species of coral.",
          "It is a shark sanctuary. Whitetip reef sharks, grey reef sharks, and hammerheads are common here, patrolling the spectacular vertical walls that drop thousands of meters into the abyss."
        ],
        question: "How can tourists visit the Tubbataha Reefs?",
        options: [
          "Only by liveaboard boat.",
          "By plane.",
          "By swimming from shore.",
          "By car."
        ],
        answer: "Only by liveaboard boat.",
        explanation: "The reef is too far from land for day trips, requiring a multi-day boat expedition."
      }
    ]
  },
  "Poland": {
    tourTitle: "The Phoenix of Europe",
    introText: "The medieval market square of Kraków is the largest in Europe. Descend into the salt mine that features an entire underground cathedral.",
    stops: [
      {
        stopName: "Kraków Old Town",
        imageKeyword: "Kraków Market Square",
        description: [
          "Rynek Główny is the largest medieval town square in Europe, dating back to the 13th century. It survived World War II largely intact, preserving its historic architecture.",
          "The centerpiece is the Cloth Hall (Sukiennice), a Renaissance-style market hall that was once a major center of international trade. Today, the stalls inside sell amber jewelry, wood carvings, and lace.",
          "From the taller tower of St. Mary's Basilica, a trumpeter plays a tune (the Hejnał) every hour. The music stops abruptly mid-note to honor a legendary 13th-century trumpeter who was shot in the throat by a Mongol arrow while sounding the alarm."
        ],
        question: "Why does the trumpet call from St. Mary's Basilica stop abruptly mid-note?",
        options: [
          "To honor a trumpeter shot in the throat.",
          "The trumpeter gets tired.",
          "It is a musical mistake.",
          "To signal the end of the hour."
        ],
        answer: "To honor a trumpeter shot in the throat.",
        explanation: "Legend says he died while warning the city of a Mongol invasion."
      },
      {
        stopName: "Wieliczka Salt Mine",
        imageKeyword: "Wieliczka Salt Mine",
        description: [
          "This mine produced table salt continuously from the 13th century until 2007. It is a vast underground complex with over 300 kilometers of tunnels and reaches a depth of 327 meters.",
          "The highlight is the Chapel of St. Kinga. It is a full-sized cathedral carved entirely out of salt rock by the miners. Everything, including the altar, the reliefs on the walls, and the intricate chandeliers, is made of salt.",
          "The air inside is free of pollutants and allergens. The microclimate is so healthy that there is a subterranean health resort deep in the mine for treating people with asthma and respiratory issues."
        ],
        question: "What are the chandeliers in the Chapel of St. Kinga made of?",
        options: [
          "Salt crystals.",
          "Glass.",
          "Diamonds.",
          "Plastic."
        ],
        answer: "Salt crystals.",
        explanation: "Miners carved the crystals to look like glass, but they are pure rock salt."
      },
      {
        stopName: "Auschwitz-Birkenau Memorial",
        imageKeyword: "Auschwitz-Birkenau",
        description: [
          "Located near Oświęcim, this was the largest of the German Nazi concentration camps and extermination centers. Over 1.1 million men, women, and children lost their lives here during the Holocaust.",
          "The site is preserved as a museum and memorial. Visitors walk through the iron gate marked Arbeit Macht Frei (\"Work Sets You Free\") and see the brick barracks, piles of victims' shoes and suitcases, and the ruins of the gas chambers.",
          "It serves as a solemn warning to humanity. The camp was left largely as it was found at liberation to provide undeniable evidence of the industrial scale of the genocide."
        ],
        question: "What is the purpose of preserving the Auschwitz-Birkenau site?",
        options: [
          "To serve as a memorial and warning (evidence of genocide).",
          "To house refugees.",
          "As a movie set.",
          "To generate electricity."
        ],
        answer: "To serve as a memorial and warning (evidence of genocide).",
        explanation: "It stands as a testament to the atrocities committed to ensure they are never forgotten."
      },
      {
        stopName: "Malbork Castle",
        imageKeyword: "Malbork Castle",
        description: [
          "This is the largest castle in the world by land area. It was built in the 13th century by the Teutonic Knights, a German Roman Catholic religious order of crusaders.",
          "It is a masterpiece of brick gothic architecture. It is estimated that the castle contains over 30 million bricks.",
          "The castle was designed as a fortress-monastery. It includes defensive walls, a palace for the Grand Master, and a sophisticated underfloor heating system that used hot air from stoves to warm the large halls during the freezing winters."
        ],
        question: "Malbork Castle was the headquarters of which religious order?",
        options: [
          "The Teutonic Knights.",
          "The Templars.",
          "The Hospitallers.",
          "The Jesuits."
        ],
        answer: "The Teutonic Knights.",
        explanation: "The crusading order built the fortress to control the region."
      },
      {
        stopName: "Białowieża Forest",
        imageKeyword: "Białowieża Forest",
        description: [
          "This UNESCO World Heritage site is the last remaining primeval forest in lowland Europe. It preserves the landscape as it looked thousands of years ago, with massive oak trees that are centuries old.",
          "It is the home of the European Bison (Żubr). This is the heaviest land animal in Europe. The species was hunted to extinction in the wild in the 1920s but was successfully reintroduced into this forest from zoo populations.",
          "A section of the forest is strictly protected. Access is only allowed with a guide to ensure that the ancient ecosystem, complete with dead wood and rare fungi, remains completely undisturbed by humans."
        ],
        question: "Białowieża Forest is famous for the reintroduction of which large mammal?",
        options: [
          "The European Bison.",
          "The Woolly Mammoth.",
          "The Saber-toothed Tiger.",
          "The Moose."
        ],
        answer: "The European Bison.",
        explanation: "It is the last refuge of Europe's heaviest land animal."
      }
    ]
  },
  "Portugal": {
    tourTitle: "The Sailor's Home",
    introText: "The yellow trams of Lisbon climb the steep hills of the capital. Listen to the soulful fado music while tasting a custard tart.",
    stops: [
      {
        stopName: "Lisbon",
        imageKeyword: "Lisbon Tram 28",
        description: [
          "Lisbon is built on seven steep hills. The iconic yellow Remodelado trams date back to the 1930s and are the only vehicles capable of navigating the tight turns and steep gradients of the historic Alfama district.",
          "Riding Tram 28 is a classic tourist experience. It rattles through the oldest neighborhoods, passing inches away from the walls of buildings and offering views of the Tagus River.",
          "The streets are paved with Calçada Portuguesa. These are limestone cobblestones laid by hand in intricate black and white mosaic patterns, depicting waves, ships, and geometric shapes."
        ],
        question: "Why are the vintage 1930s trams still used in Lisbon?",
        options: [
          "Modern trams cannot handle the steep hills and tight turns.",
          "They are cheaper to run.",
          "They are faster.",
          "There is no money for new ones."
        ],
        answer: "Modern trams cannot handle the steep hills and tight turns.",
        explanation: "The historic mechanics are uniquely suited for the difficult geography of the old quarters."
      },
      {
        stopName: "Sintra",
        imageKeyword: "Pena Palace",
        description: [
          "Sintra is a fairy-tale town located just outside Lisbon. Its crown jewel is the Pena Palace, a Romanticist castle that mixes Gothic, Manueline, and Moorish architectural styles in a riot of bright yellow, red, and blue colors.",
          "It served as the summer residence of the Portuguese royal family. The park surrounding the palace is filled with exotic plants imported from all over the world, creating a misty, magical forest.",
          "Also in Sintra is the Quinta da Regaleira, famous for its \"Initiation Well.\" This is an inverted tower that sinks 27 meters into the ground, with a spiral staircase used for Tarot and Masonic initiation rites."
        ],
        question: "What makes the Pena Palace visually distinct?",
        options: [
          "Its bright colors (yellow/red) and mixed architectural styles.",
          "It is made of glass.",
          "It is underground.",
          "It is invisible."
        ],
        answer: "Its bright colors (yellow/red) and mixed architectural styles.",
        explanation: "It is a whimsical mash-up of styles that contrasts with traditional grey stone castles."
      },
      {
        stopName: "The Algarve",
        imageKeyword: "Benagil Cave",
        description: [
          "The southern coast of Portugal is famous for its golden limestone cliffs and beaches. The most iconic spot is the Benagil Sea Cave, a massive dome-shaped cavern with a natural skylight (the \"eye\") in the ceiling.",
          "The cave is accessible only by water. Visitors swim, kayak, or take a boat to reach the hidden beach inside the grotto, where the sun spotlights the sand through the hole above.",
          "The coastline features \"sea stacks.\" These are pillars of rock left standing in the ocean after the surrounding cliffs have eroded away, often serving as nesting sites for storks."
        ],
        question: "How does sunlight enter the Benagil Sea Cave?",
        options: [
          "Through a natural hole (skylight) in the ceiling.",
          "Through the front door.",
          "Electric lights.",
          "Reflected from the water."
        ],
        answer: "Through a natural hole (skylight) in the ceiling.",
        explanation: "Erosion created a circular opening in the roof of the cave."
      },
      {
        stopName: "Douro Valley",
        imageKeyword: "Douro Valley",
        description: [
          "This is the oldest demarcated wine region in the world (established in 1756). It is the only place in the world that can legally produce Port wine.",
          "The landscape is defined by steep, man-made terraces. For centuries, farmers carved steps into the schist rock mountainsides to plant vines, creating a geometric pattern that follows the curves of the Douro River.",
          "Port wine is fortified. During fermentation, brandy is added to the wine, which stops the fermentation process, preserves the natural sugar of the grapes, and boosts the alcohol content."
        ],
        question: "What type of wine is exclusively produced in the Douro Valley?",
        options: [
          "Port wine.",
          "Champagne.",
          "Bordeaux.",
          "Chianti."
        ],
        answer: "Port wine.",
        explanation: "Only fortified wine from this specific region can bear the name \"Port.\""
      },
      {
        stopName: "Belém Tower",
        imageKeyword: "Belém Tower",
        description: [
          "Built in the early 16th century, this tower sits on the bank of the Tagus River. It was the starting point for many of the voyages of the Age of Discovery, where explorers like Vasco da Gama set sail to find sea routes to India.",
          "It is a prime example of Manueline architecture. The stonework features maritime motifs like twisted ropes, armillary spheres, and crosses, celebrating Portugal's power as a sea-faring nation.",
          "It contains the first European carving of a rhinoceros. Inspired by a rhino brought to Lisbon from India in 1515, a stonemason carved the animal's head into one of the tower's turrets."
        ],
        question: "Belém Tower is associated with which historical era?",
        options: [
          "The Age of Discovery.",
          "The Industrial Revolution.",
          "The Roman Empire.",
          "The Cold War."
        ],
        answer: "The Age of Discovery.",
        explanation: "It was the ceremonial gateway for explorers sailing to the New World and India."
      }
    ]
  }
};