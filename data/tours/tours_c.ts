import { TourData } from "../../types";

export const toursC: Record<string, TourData> = {
  "Cabo Verde": {
    tourTitle: "The Islands of Morabeza",
    introText: "An active volcano rises dramatically from the black sand of Fogo. Soak up the soulful island rhythms on a windswept sandy beach.",
    stops: [
      {
        stopName: "Pico do Fogo",
        imageKeyword: "Pico do Fogo",
        description: [
          "Dominated by a nearly 3,000-meter active volcano, the island of Fogo is essentially one giant mountain emerging from the sea. The summit rises out of an ancient, massive collapse crater known as Chã das Caldeiras, creating a landscape that looks like the surface of the moon.",
          "Despite the constant threat of eruption, a small community lives inside the crater caldera. They take advantage of the incredibly fertile, mineral-rich volcanic soil to grow grapes, producing a unique and highly prized local wine called Manecom.",
          "The volcano is still very active, with major eruptions occurring as recently as 2014. When lava flows destroyed their homes, the villagers returned almost immediately to rebuild on top of the cooling rock, demonstrating a profound attachment to their land."
        ],
        question: "What unique product is farmed inside the volcanic crater of Fogo?",
        options: [
          "Wine grapes.",
          "Coffee beans.",
          "Pineapples.",
          "Wheat."
        ],
        answer: "Wine grapes.",
        explanation: "Locals use the fertile volcanic soil inside the crater to grow grapes for wine production."
      },
      {
        stopName: "Cidade Velha",
        imageKeyword: "Cidade Velha",
        description: [
          "Located on the island of Santiago, this was the first European colonial outpost ever built in the tropics. Founded in 1462, it served as a crucial provisioning stop for legendary explorers like Vasco da Gama and Christopher Columbus on their voyages across the Atlantic.",
          "In the center of the town square stands the Pelourinho, a marble pillory column that has stood since the 1500s. This was the site where rebellious slaves were publicly punished, serving as a brutal symbol of the town's history as a major hub of the transatlantic slave trade.",
          "Overlooking the town is the massive Royal Fortress of São Filipe, built to defend the city against pirates. Its construction was ordered after the famous English privateer Sir Francis Drake sacked the city in 1585."
        ],
        question: "Cidade Velha holds the distinction of being the first European colonial outpost in which region?",
        options: [
          "The tropics.",
          "South America.",
          "The Pacific Ocean.",
          "The Arctic."
        ],
        answer: "The tropics.",
        explanation: "It was the first permanent European settlement established in the tropical zone of the globe."
      },
      {
        stopName: "Pedra de Lume Salt Crater",
        imageKeyword: "Pedra de Lume Salt Crater",
        description: [
          "Located on the island of Sal, whose name literally means \"Salt,\" this site is the crater of an extinct volcano. The bottom of the crater sits below sea level, allowing seawater to seep through the porous rock, where the desert sun evaporates it to leave behind thick crusts of salt.",
          "For centuries, this was the economic engine of the island, exporting salt to Brazil and Africa. Remnants of the old wooden cable car system that used to transport the salt out of the crater still stand as ghostly skeletons against the sky.",
          "Today, the salt ponds are a natural spa. The concentration of salt in the water is so high—similar to the Dead Sea—that swimmers cannot sink; they float effortlessly on the surface of the warm, pinkish water."
        ],
        question: "Why can swimmers float effortlessly in the water at Pedra de Lume?",
        options: [
          "The water has an extremely high salt concentration.",
          "The water is full of gas bubbles.",
          "The crater has strong updrafts.",
          "The water is frozen."
        ],
        answer: "The water has an extremely high salt concentration.",
        explanation: "The high salinity increases the water's density, making human bodies remarkably buoyant."
      },
      {
        stopName: "Buracona Blue Eye",
        imageKeyword: "Buracona Blue Eye",
        description: [
          "On the rugged, volcanic coast of Sal lies a natural cave pool connected to the ocean by an underwater tunnel. At a specific time around midday, when the sun is directly overhead, a beam of light hits the water at the perfect angle.",
          "This beam of sunlight illuminates the underwater tunnel, creating a glowing, electric turquoise circle that looks exactly like a giant glowing eye staring up from the deep.",
          "Surrounding the \"eye\" are natural lava rock pools filled by the crashing waves of the Atlantic. These jagged black rocks contrast sharply with the calm, iridescent blue of the water, showcasing the island's volcanic origins."
        ],
        question: "What causes the \"Blue Eye\" effect to appear in the cave?",
        options: [
          "Sunlight hitting the water at a specific angle.",
          "Bioluminescent plankton.",
          "Underwater volcanic vents.",
          "Blue minerals in the rock."
        ],
        answer: "Sunlight hitting the water at a specific angle.",
        explanation: "The phenomenon only happens when the sun is positioned directly over the underwater tunnel, illuminating the sand below."
      },
      {
        stopName: "Cova de Paúl",
        imageKeyword: "Cova de Paúl",
        description: [
          "While many of Cabo Verde's islands are dry and brown, the island of Santo Antão is lush and green. This massive extinct volcanic crater has been transformed by local farmers into a patchwork quilt of corn, sugarcane, and coffee fields.",
          "The crater acts as a natural moisture trap. Clouds rolling in from the ocean get stuck against the high mountain walls, condensing into mist and rain that keeps the crater floor fertile and green year-round.",
          "Standing on the rim of the crater offers one of the most dramatic views in the archipelago. On one side, you see the lush, green farmland inside the volcano, and on the other, a sheer drop down dry, rocky cliffs to the deep blue sea."
        ],
        question: "How does the shape of the Cova de Paúl crater help agriculture?",
        options: [
          "It traps clouds and moisture.",
          "It blocks the sun.",
          "It prevents wind erosion.",
          "It is below sea level."
        ],
        answer: "It traps clouds and moisture.",
        explanation: "The high walls of the crater catch passing clouds, providing the water needed to grow crops in the mountains."
      }
    ]
  },
  "Cambodia": {
    tourTitle: "Kingdom of Wonder",
    introText: "The largest religious monument in the world rises from the jungle dawn. Explore the mysterious ruins of a lost ancient empire.",
    stops: [
      {
        stopName: "Angkor Wat",
        imageKeyword: "Angkor Wat",
        description: [
          "This is the largest religious monument in the world, originally built in the early 12th century as a Hindu temple dedicated to the god Vishnu before transforming into a Buddhist site. The sheer scale is staggering; the complex covers over 400 acres and is surrounded by a massive moat that is nearly 200 meters wide.",
          "The temple was designed to represent Mount Meru, the home of the gods in Hindu mythology. The five central towers symbolize the peaks of the mountain, while the surrounding moat represents the cosmic ocean, creating a physical model of the universe on Earth.",
          "It is the heart and soul of the nation, appearing on the Cambodian national flag. Unlike many ancient ruins that were abandoned, Angkor Wat has remained a functioning religious center for nearly 900 years, surviving wars and the encroaching jungle."
        ],
        question: "What mythological location was Angkor Wat designed to represent?",
        options: [
          "Mount Meru.",
          "Mount Olympus.",
          "The Garden of Eden.",
          "Atlantis."
        ],
        answer: "Mount Meru.",
        explanation: "The temple's layout is a physical representation of the sacred mountain that serves as the home of the gods in Hindu mythology."
      },
      {
        stopName: "Ta Prohm",
        imageKeyword: "Ta Prohm",
        description: [
          "Unlike the other temples of Angkor which were cleared and restored, this site was intentionally left largely as it was found by French explorers. Enormous silk-cotton and strangler fig trees have grown directly out of the ruins, their roots spilling over the stone walls like melted wax.",
          "This location demonstrates the awesome power of nature reclaiming civilization. The trees and the stones are now locked in a deadly embrace; if the trees are cut, the temple would collapse, but if the trees keep growing, they will eventually crush the building.",
          "It gained worldwide fame as the setting for the movie Tomb Raider. The atmospheric blend of dappled sunlight, green moss, and crumbling grey stone creates a feeling of discovering a lost world."
        ],
        question: "Why was Ta Prohm left in its overgrown condition by archaeologists?",
        options: [
          "To show the power of nature reclaiming the ruins.",
          "They ran out of money.",
          "The trees are sacred and cannot be cut.",
          "It was too dangerous to restore."
        ],
        answer: "To show the power of nature reclaiming the ruins.",
        explanation: "Conservators decided to leave the trees to demonstrate the state in which the temples were discovered and the dynamic between nature and architecture."
      },
      {
        stopName: "The Bayon Temple",
        imageKeyword: "The Bayon Temple",
        description: [
          "Located in the center of the ancient city of Angkor Thom, this temple is famous for its 54 Gothic towers decorated with 216 gargantuan smiling faces. Wherever you stand in the complex, at least a dozen of these stone faces are gazing down at you with a serene expression.",
          "Built by King Jayavarman VII, the temple represents a shift from Hinduism to Mahayana Buddhism. Most historians believe the faces are depictions of the Bodhisattva of compassion, Avalokiteshvara, though they also bear a striking resemblance to the King himself.",
          "The architecture is chaotic and crowded compared to the perfect symmetry of Angkor Wat. It was built in a rush, resulting in a maze of narrow corridors, steep stairs, and dark galleries that feel like a psychological puzzle made of stone."
        ],
        question: "What emotion is depicted on the hundreds of stone faces at the Bayon?",
        options: [
          "Serenity (or a peaceful smile).",
          "Anger.",
          "Fear.",
          "Sadness."
        ],
        answer: "Serenity (or a peaceful smile).",
        explanation: "The faces are famous for their \"Archaic Smile,\" representing a state of enlightened peace and compassion."
      },
      {
        stopName: "Tonlé Sap Lake",
        imageKeyword: "Tonlé Sap Lake",
        description: [
          "This massive body of water is known as the \"beating heart of Cambodia\" due to a unique hydrological phenomenon found nowhere else in the world. During the dry season, the Tonlé Sap River flows out of the lake and into the Mekong River.",
          "However, during the monsoon season, the Mekong River swells so much that it forces the water to flow backward, pushing water up the Tonlé Sap River and into the lake. This causes the lake to expand to five times its normal size, flooding the surrounding forests and fields.",
          "To survive these drastic changes in water level, local communities live in \"floating villages.\" Houses are built on towering stilts or floating bamboo rafts that rise and fall with the water, allowing life to continue regardless of the season."
        ],
        question: "What unique event happens to the Tonlé Sap River during the monsoon season?",
        options: [
          "The flow of the river reverses direction.",
          "It dries up completely.",
          "It freezes over.",
          "It turns red."
        ],
        answer: "The flow of the river reverses direction.",
        explanation: "The massive volume of water from the Mekong pushes the river backward, causing it to flow into the lake instead of out of it."
      },
      {
        stopName: "The Royal Palace of Phnom Penh",
        imageKeyword: "The Royal Palace of Phnom Penh",
        description: [
          "Situated on the riverfront of the capital, Phnom Penh, this glittering complex serves as the official residence of the King of Cambodia. The architecture is a classic example of Khmer style, featuring steep tiled roofs, golden spires, and the signature yellow and white walls symbolizing Buddhism and Hinduism.",
          "Within the complex stands the famous Silver Pagoda, named for its floor which is covered in over 5,000 solid silver tiles. Each tile weighs over a kilogram, making the floor itself a priceless treasure.",
          "The temple houses the Emerald Buddha of Cambodia and a life-sized gold Buddha encrusted with 9,584 diamonds. It miraculously survived the Khmer Rouge era largely intact, preserving a glimpse of the royal grandeur that existed before the country's turbulent wars."
        ],
        question: "What material is used to cover the floor of the Silver Pagoda?",
        options: [
          "Solid silver tiles.",
          "Gold bars.",
          "Marble.",
          "Jade."
        ],
        answer: "Solid silver tiles.",
        explanation: "The floor is paved with more than 5,000 tiles made of pure silver, giving the building its name."
      }
    ]
  },
  "Cameroon": {
    tourTitle: "Africa in Miniature",
    introText: "Geographers call this nation \"Africa in miniature\" due to its diverse terrain. Experience the entire spirit of the continent in one diverse nation.",
    stops: [
      {
        stopName: "Mount Cameroon",
        imageKeyword: "Mount Cameroon",
        description: [
          "Known locally as \"The Chariot of the Gods,\" this is one of Africa's largest active volcanoes and the highest peak in West and Central Africa, standing at 4,040 meters. It rises almost directly from the coastline, creating a massive climatic barrier that makes the surrounding area one of the wettest places on Earth.",
          "The volcano is still very active, with its most recent major eruptions occurring in 2000 and 2012. The lava flows from previous centuries have hardened into black rivers of rock that cut through the dense tropical rainforest on the mountain's flanks.",
          "Every year, hundreds of athletes compete in the \"Race of Hope,\" a grueling marathon where runners sprint up the steep, rocky slopes to the freezing summit and back down. It is a supreme test of endurance that draws competitors from around the world."
        ],
        question: "What is the local nickname for Mount Cameroon?",
        options: [
          "The Chariot of the Gods.",
          "The Sleeping Giant.",
          "The Fire Mountain.",
          "The Roof of Africa."
        ],
        answer: "The Chariot of the Gods.",
        explanation: "The mountain was named \"Mongo ma Ndemi\" (Chariot of the Gods) by the local people due to its size and fiery eruptions."
      },
      {
        stopName: "Waza National Park",
        imageKeyword: "Waza National Park",
        description: [
          "Located in the far north of the country, this park protects a vital part of the Sahel ecosystem, the transition zone between the Sahara Desert and the tropical savanna. It was originally created as a hunting reserve in the 1930s but is now a UNESCO Biosphere Reserve.",
          "It is famous for its large populations of giraffe, elephant, and lion, which gather around the few remaining waterholes during the dry season. The flat, golden landscape allows for excellent visibility, making it one of the best places in Central Africa for wildlife viewing.",
          "The park is also a birdwatcher's paradise, hosting vast flocks of crowned cranes and ostriches. The dry, open terrain contrasts sharply with the dense rainforests found in the southern part of Cameroon, highlighting the country's diverse geography."
        ],
        question: "Waza National Park is located in which ecological zone?",
        options: [
          "The Sahel.",
          "The Congo Rainforest.",
          "The Kalahari Desert.",
          "The Mediterranean Coast."
        ],
        answer: "The Sahel.",
        explanation: "It sits in the semi-arid transition zone between the Sahara Desert to the north and the savannas to the south."
      },
      {
        stopName: "The Lobé Waterfalls",
        imageKeyword: "The Lobé Waterfalls",
        description: [
          "Located near the beach town of Kribi, this is a geological rarity: it is one of the few waterfalls in the world that plunges directly into the sea. The Lobé River cascades over a series of black volcanic rocks before mixing its fresh water with the salty Atlantic Ocean.",
          "The falls are culturally significant to the local Pygmy peoples, who perform purification rituals in the water. The surrounding riverbanks are lined with dense equatorial forest and mangroves, creating a stunning visual contrast with the sandy beach.",
          "Visitors can take traditional dugout canoes right up to the base of the falls to feel the spray. The area is also famous for its giant freshwater shrimp, which thrive in the brackish water where the river meets the ocean."
        ],
        question: "What makes the Lobé Waterfalls geologically unique?",
        options: [
          "They fall directly into the ocean.",
          "They flow upwards.",
          "They are made of ice.",
          "They are the tallest in the world."
        ],
        answer: "They fall directly into the ocean.",
        explanation: "Unlike most waterfalls that flow into a river or lake, the Lobé falls empty straight into the Atlantic Ocean."
      },
      {
        stopName: "The Royal Palace of Foumban",
        imageKeyword: "Royal Palace of Foumban",
        description: [
          "This palace is the heart of the Bamoun Kingdom, one of the oldest and most significant dynasties in Cameroon, founded in the 14th century. The current building was completed in 1917 by the famous King Ibrahim Njoya.",
          "King Njoya was a brilliant intellectual who invented his own alphabet (the Bamoun script) to record the history of his people. The palace museum houses his original manuscripts, along with royal war gear, jewelry, and a throne decorated with cowrie shells.",
          "The architecture is a fascinating mix of styles, blending traditional Bamoun designs with German colonial influences. The region is renowned for its artisans, and the streets around the palace are filled with bronze casters and woodcarvers producing intricate art."
        ],
        question: "What major cultural invention is King Ibrahim Njoya famous for?",
        options: [
          "Inventing an alphabet (the Bamoun script).",
          "Inventing gunpowder.",
          "Building the first ship.",
          "Discovering gold."
        ],
        answer: "Inventing an alphabet (the Bamoun script).",
        explanation: "He created a unique writing system to document the history and laws of the Bamoun kingdom."
      },
      {
        stopName: "Rhumsiki Peaks",
        imageKeyword: "Rhumsiki Peaks",
        description: [
          "Hidden in the Mandara Mountains on the border with Nigeria, this landscape looks like something from a science fiction movie. The terrain is dotted with dramatic volcanic plugs—ancient cores of volcanoes that have been exposed after the surrounding softer rock eroded away.",
          "The most famous is the Kapsiki Peak, a sheer needle of rock that rises vertically from the valley floor. It is considered one of the most romantic and photographic landscapes in Africa due to the stark silhouette it cuts against the sunset.",
          "The local Kapsiki people live in small villages scattered among these giant rocks. They are known for their crab divination, a traditional practice where a blacksmith predicts the future by interpreting the way a freshwater crab moves objects in a pot of sand."
        ],
        question: "What geological feature forms the needle-like towers at Rhumsiki?",
        options: [
          "Volcanic plugs.",
          "Glacial ice.",
          "Sandstone dunes.",
          "Coral reefs."
        ],
        answer: "Volcanic plugs.",
        explanation: "They are the hardened lava cores of ancient volcanoes that remained standing after the rest of the mountain eroded away."
      }
    ]
  },
  "Canada": {
    tourTitle: "The Great White North",
    introText: "Polar bears roam the frozen tundra in the vast northern territories. Explore the rugged beauty of the mountains and the endless lakes.",
    stops: [
      {
        stopName: "Banff National Park",
        imageKeyword: "Moraine Lake",
        description: [
          "This iconic lake in the Canadian Rockies is world-famous for its startlingly bright turquoise water. The color is not a trick of the light but is caused by \"rock flour\"—fine particles of rock ground up by moving glaciers that float in the water and refract sunlight.",
          "Established in 1885, Banff is Canada's oldest national park. It was created after railway workers discovered natural hot springs in the area, leading the government to protect the region as a public treasure rather than selling it for private development.",
          "The area is a prime habitat for grizzly bears and elk. To protect the wildlife from the millions of tourists and the trans-continental highway that cuts through the park, engineers have built massive grass-covered \"animal overpasses\" to let creatures cross the road safely."
        ],
        question: "What substance gives Moraine Lake its bright turquoise color?",
        options: [
          "Rock flour (glacial sediment).",
          "Blue algae.",
          "Copper deposits.",
          "Reflection of the sky."
        ],
        answer: "Rock flour (glacial sediment).",
        explanation: "Fine rock particles created by grinding glaciers float in the water and scatter blue-green light."
      },
      {
        stopName: "The CN Tower",
        imageKeyword: "CN Tower",
        description: [
          "Dominating the Toronto skyline, this 553-meter concrete tower was the tallest free-standing structure in the world for over 30 years. It was originally built not just for tourism, but to solve a major problem: new skyscrapers in the 1970s were blocking radio and TV signals, so a taller antenna was needed.",
          "The tower is an engineering marvel designed to be flexible. In strong winds, the upper antenna can sway nearly two meters (six feet) from center without sustaining damage, bending like a tree rather than breaking.",
          "One of its most terrifying features is the glass floor, located 342 meters in the air. The glass is strong enough to hold the weight of 35 moose, but looking straight down to the streets below still tests the bravery of almost every visitor."
        ],
        question: "What was the primary practical reason for building the CN Tower?",
        options: [
          "To transmit radio and TV signals above skyscrapers.",
          "For tourism revenue.",
          "To watch for forest fires.",
          "As a landing pad for blimps."
        ],
        answer: "To transmit radio and TV signals above skyscrapers.",
        explanation: "The tower was built to raise antennas higher than the other tall buildings that were blocking signals in the growing city."
      },
      {
        stopName: "Old Quebec",
        imageKeyword: "Old Quebec",
        description: [
          "Founded in 1608, this is the only walled city in North America north of Mexico. The massive stone ramparts and gates, stretching for nearly 4.6 kilometers, were built by the French and later reinforced by the British to defend the strategic cliff overlooking the St. Lawrence River.",
          "The skyline is dominated by the Château Frontenac, a massive hotel with copper roofs and turrets that looks like a French castle. It was built by the Canadian Pacific Railway to encourage luxury tourism and is claimed to be the most photographed hotel in the world.",
          "Walking the cobblestone streets feels like stepping into 17th-century Europe. The city preserves its French heritage fiercely; it is the center of Francophone culture in the Americas, where French is the primary language of daily life."
        ],
        question: "Old Quebec holds which unique distinction in North America (north of Mexico)?",
        options: [
          "It is the only walled city.",
          "It is the oldest city.",
          "It has the largest port.",
          "It is an independent country."
        ],
        answer: "It is the only walled city.",
        explanation: "It is the only city in the region that has preserved its original defensive ramparts and fortress walls."
      },
      {
        stopName: "The Bay of Fundy",
        imageKeyword: "Hopewell Rocks",
        description: [
          "This bay, located between New Brunswick and Nova Scotia, is famous for having the highest tides on Earth. The unique funnel shape of the bay causes the water to rise and fall by as much as 16 meters (52 feet)—the height of a five-story building—every single day.",
          "At low tide, visitors can walk on the ocean floor around massive \"flowerpot rocks.\" These sandstone towers have trees growing on top but are narrow at the base because the water erodes the bottom of the rock twice a day.",
          "The tide comes in with incredible power and speed. In some river channels connected to the bay, the incoming tide creates a \"tidal bore,\" a literal wall of water that flows upstream against the river current, which people can actually surf on."
        ],
        question: "What geological record does the Bay of Fundy hold?",
        options: [
          "The highest tides in the world.",
          "The deepest ocean trench.",
          "The largest whirlpool.",
          "The warmest water in Canada."
        ],
        answer: "The highest tides in the world.",
        explanation: "The water level changes more drastically here than anywhere else on the planet, rising up to 16 meters."
      },
      {
        stopName: "L'Anse aux Meadows",
        imageKeyword: "L'Anse aux Meadows",
        description: [
          "Located on the northern tip of Newfoundland, this archaeological site proves that Christopher Columbus was not the first European to arrive in the Americas. It is the ruins of a Viking settlement dating back to the year 1000 AD—500 years before Columbus set sail.",
          "The site was discovered in the 1960s when locals led researchers to what they thought were old indigenous mounds. Excavations revealed Norse-style iron nails and a bronze pin, proving that Norse explorers, likely led by Leif Erikson, had crossed the Atlantic.",
          "The buildings are reconstructed \"sod houses,\" made by cutting blocks of grassy earth and stacking them to form thick, insulated walls. This construction technique was essential for surviving the brutal, freezing winters of the North Atlantic."
        ],
        question: "Which group of explorers built the settlement at L'Anse aux Meadows?",
        options: [
          "The Vikings (Norse).",
          "The Spanish.",
          "The British.",
          "The French."
        ],
        answer: "The Vikings (Norse).",
        explanation: "The site is the only confirmed Norse settlement in North America, proving they arrived centuries before other Europeans."
      }
    ]
  },
  "Central African Republic": {
    tourTitle: "The Heart of the Continent",
    introText: "Forest elephants gather in the clearings of the remote Dzanga-Sangha reserve. Observe the wild nature in a land of dense and untouched green.",
    stops: [
      {
        stopName: "Dzanga-Sangha Special Reserve",
        imageKeyword: "Dzanga-Sangha Special Reserve",
        description: [
          "This reserve is part of the massive Sangha Trinational protected area, a UNESCO World Heritage site shared with Cameroon and Congo. It is one of the last true wildernesses on Earth, covered in ancient, dense tropical rainforests that have been logged.",
          "The park is world-famous for the Dzanga Bai, a large sandy clearing in the middle of the jungle. It is known as the \"Village of Elephants\" because hundreds of shy forest elephants gather here daily to drink mineral-rich water and socialize in the open.",
          "It is also one of the few places in the world where you can track Western Lowland Gorillas. Unlike their mountain cousins, these gorillas live in the thick, steamy lowlands and are known for being more elusive and smaller in size."
        ],
        question: "What is the \"Dzanga Bai\" famous for?",
        options: [
          "It is a clearing where hundreds of forest elephants gather.",
          "It is the tallest mountain in the country.",
          "It is a city made of gold.",
          "It is a large waterfall."
        ],
        answer: "It is a clearing where hundreds of forest elephants gather.",
        explanation: "The \"Bai\" is a mineral-rich clearing that attracts elephants who come to drink the salty water."
      },
      {
        stopName: "Boali Waterfalls",
        imageKeyword: "Boali Waterfalls",
        description: [
          "Known as the \"Niagara of Central Africa,\" these falls are impressive not just for their height (50 meters) but for their incredible width (250 meters). The Mbali River crashes over a wide cliff face, creating a thunderous roar and a permanent mist.",
          "The energy of the falls is harnessed by a hydroelectric dam located just upstream. This single power station is critical to the nation, as it provides electricity to the capital city, Bangui, and much of the surrounding region.",
          "The appearance of the falls changes drastically depending on the day. On weekdays, the dam holds back most of the water for power generation, reducing the falls to a trickle. On weekends, the gates are opened, releasing the full, terrifying power of the river for visitors to see."
        ],
        question: "Why do the Boali Waterfalls look different on weekdays compared to weekends?",
        options: [
          "A dam holds back water on weekdays to generate electricity.",
          "The river dries up naturally.",
          "Local farmers use the water for irrigation.",
          "It only rains on weekends."
        ],
        answer: "A dam holds back water on weekdays to generate electricity.",
        explanation: "The water flow is controlled by a hydroelectric dam; the full flow is usually only released on weekends for tourism."
      },
      {
        stopName: "Notre-Dame of Bangui",
        imageKeyword: "Notre-Dame of Bangui",
        description: [
          "Standing in the heart of the capital, this cathedral is a striking example of colonial architecture adapted to local materials. It is built entirely from baked red bricks, giving it a distinctive warm, earthy color that matches the laterite soil of the region.",
          "Completed in the 1930s during the French colonial era, it has stood witness to the country's entire modern history. It is the seat of the Archdiocese of Bangui and remains the most recognizable landmark in the city.",
          "In recent years, the cathedral has taken on a significant role as a place of refuge and peace-building in a city often divided by conflict."
        ],
        question: "What distinctive material was used to build the Notre-Dame of Bangui?",
        options: [
          "Baked red bricks.",
          "White marble.",
          "Timber.",
          "Blue stone."
        ],
        answer: "Baked red bricks.",
        explanation: "The cathedral is constructed from local red bricks, giving it its characteristic color."
      },
      {
        stopName: "The Oubangui River",
        imageKeyword: "The Oubangui River",
        description: [
          "This massive river forms the border between the Central African Republic and the Democratic Republic of the Congo. It is the largest tributary of the Congo River and serves as the country's main commercial highway.",
          "Bangui, the capital city, is located on its northern bank. The river is vital for transportation, with barges carrying timber and goods downriver to Brazzaville and Kinshasa.",
          "Fishermen in dugout canoes ply the waters daily. Despite its importance, the river is shrinking due to climate change, threatening the livelihood of millions who depend on it."
        ],
        question: "The Oubangui River forms the border between CAR and which other country?",
        options: [
          "Democratic Republic of the Congo.",
          "Chad.",
          "Sudan.",
          "Cameroon."
        ],
        answer: "Democratic Republic of the Congo.",
        explanation: "The river marks the southern border, separating CAR from the DR Congo."
      },
      {
        stopName: "Manovo-Gounda St. Floris National Park",
        imageKeyword: "Manovo-Gounda St. Floris National Park",
        description: [
          "Located in the north, this UNESCO World Heritage site is the largest park in the Central African savannas. It covers a vast area of grassy plains, floodplains, and rocky massifs.",
          "Historically, it was teeming with wildlife, including black rhinos, elephants, and cheetahs. However, heavy poaching during periods of instability has severely reduced animal numbers, placing the park on the List of World Heritage in Danger.",
          "Despite the challenges, it remains a critical ecosystem. Conservation efforts are ongoing to protect the remaining wildlife and restore the park to its former glory as a haven for biodiversity."
        ],
        question: "Why is Manovo-Gounda St. Floris National Park on the List of World Heritage in Danger?",
        options: [
          "Heavy poaching and instability.",
          "Volcanic eruptions.",
          "Flooding.",
          "Urban development."
        ],
        answer: "Heavy poaching and instability.",
        explanation: "Illegal hunting and civil conflict have decimated wildlife populations, threatening the park's value."
      }
    ]
  },
  "Chad": {
    tourTitle: "The Desert Crossroads",
    introText: "Ancient camel caravans still cross the dunes of the Ennedi Plateau. Watch the sun set over the shrinking but vital waters of Lake Chad.",
    stops: [
      {
        stopName: "Ennedi Plateau",
        imageKeyword: "Ennedi Plateau",
        description: [
          "This UNESCO World Heritage site is a sandstone masterpiece located in the middle of the Sahara Desert. Wind and sand have sculpted the rock into thousands of natural arches, pillars, and deep canyons.",
          "Hidden within the plateau is the Guelta d'Archei, a permanent waterhole surrounded by towering cliffs. It is famous for its population of dwarf Nile crocodiles, a relic species that has survived here since the Sahara was a lush savannah.",
          "For centuries, camel caravans have stopped here to water their animals. The sight of hundreds of camels drinking in the canyon, their grunts echoing off the ancient rock walls, is a scene unchanged since biblical times."
        ],
        question: "What ancient reptile species survives in the Guelta d'Archei?",
        options: [
          "Dwarf Nile crocodiles.",
          "Komodo dragons.",
          "Giant tortoises.",
          "Sea snakes."
        ],
        answer: "Dwarf Nile crocodiles.",
        explanation: "These crocodiles are isolated survivors from a time when the Sahara was wet and green."
      },
      {
        stopName: "Lake Chad",
        imageKeyword: "Lake Chad",
        description: [
          "Once one of the largest lakes in the world, Lake Chad is a vital lifeline for millions of people across four countries. It is an endorheic basin, meaning the water flows in but has no outlet to the sea, disappearing only through evaporation.",
          "The lake is famous for its shrinking size due to climate change and irrigation, having lost 90% of its water since the 1960s. Despite this, it remains a bustling hub of fishing and agriculture, dotted with islands made of floating reeds.",
          "Local fishermen use traditional canoes to navigate the shallow, marshy waters. The lake's ecosystem is unique, supporting diverse birdlife and serving as a crucial stopover for migrating birds crossing the desert."
        ],
        question: "What is the major environmental challenge facing Lake Chad?",
        options: [
          "It has shrunk by 90% since the 1960s.",
          "It is freezing over.",
          "It is becoming too deep.",
          "It is full of sharks."
        ],
        answer: "It has shrunk by 90% since the 1960s.",
        explanation: "Climate change and water usage have drastically reduced the surface area of this critical water source."
      },
      {
        stopName: "Zakouma National Park",
        imageKeyword: "Zakouma National Park",
        description: [
          "Located in the southeast, Zakouma is one of Africa's greatest conservation success stories. In the early 2000s, poachers decimated the elephant population, reducing it by 90%.",
          "Thanks to strict protection and community engagement, the park is now safe and thriving. The elephant herds have stabilized and are growing again, often seen moving in massive groups of hundreds of individuals for safety.",
          "During the dry season, wildlife congregates around the shrinking pans in the center of the park. It creates a density of animals—giraffes, buffaloes, and lions—that rivals the more famous parks of East Africa."
        ],
        question: "Zakouma National Park is known for the recovery of which animal population?",
        options: [
          "Elephants.",
          "Polar bears.",
          "Kangaroos.",
          "Tigers."
        ],
        answer: "Elephants.",
        explanation: "After being nearly wiped out by poachers, the elephant population has made a remarkable recovery due to conservation efforts."
      },
      {
        stopName: "Emi Koussi",
        imageKeyword: "Emi Koussi",
        description: [
          "Rising 3,415 meters above sea level, Emi Koussi is the highest mountain in both Chad and the entire Sahara Desert. It is a massive, extinct shield volcano with a base that spans 60 by 80 kilometers.",
          "The summit features a spectacular caldera (crater) that is 12 kilometers wide and filled with smaller craters and lava flows. The dark, black volcanic rock contrasts sharply with the surrounding golden desert sands.",
          "The mountain is sacred to the Toubou people who live in the region. Climbing it is extremely difficult due to the remoteness, lack of water, and extreme heat, making it an adventure for only the most dedicated explorers."
        ],
        question: "Emi Koussi holds the title of being the highest point in which desert?",
        options: [
          "The Sahara Desert.",
          "The Gobi Desert.",
          "The Kalahari Desert.",
          "The Atacama Desert."
        ],
        answer: "The Sahara Desert.",
        explanation: "This massive shield volcano towers over the rest of the Sahara landscape."
      },
      {
        stopName: "Gaoui Village",
        imageKeyword: "Gaoui Village",
        description: [
          "Located just outside the capital N'Djamena, Gaoui is the ancient capital of the Sao civilization. It is famous for its traditional architecture made of mud and straw.",
          "The houses are beautifully decorated with bright, colorful geometric paintings. These designs are created by the local women, who repaint the structures after every rainy season to keep them vibrant.",
          "The village is also a center for pottery making. Visitors can see the restored palace of the Sultan, which now serves as a museum displaying the history and art of the Sao culture."
        ],
        question: "What artistic tradition is Gaoui Village famous for?",
        options: [
          "Colorful painted mud houses and pottery.",
          "Glass blowing.",
          "Silk weaving.",
          "Ice sculpting."
        ],
        answer: "Colorful painted mud houses and pottery.",
        explanation: "The village is renowned for its vibrant, painted traditional architecture and ceramic crafts."
      }
    ]
  },
  "Chile": {
    tourTitle: "Where the Earth Ends",
    introText: "From the driest desert on Earth to the icy fjords of Patagonia. Stand before the mysterious stone giants of Easter Island.",
    stops: [
      {
        stopName: "Torres del Paine",
        imageKeyword: "Torres del Paine",
        description: [
          "This national park in Patagonia is famous for its three distinctive granite peaks, or \"Torres,\" that pierce the sky like jagged teeth. They rise 2,800 meters above the Patagonian steppe.",
          "The landscape is a dramatic mix of turquoise glacial lakes, roaring rivers, and golden grasslands called pampas. It is home to guanacos (relatives of the llama), rheas, and the elusive puma.",
          "The \"W Trek\" is one of the most famous hiking routes in the world, taking visitors to the base of the towers and past the massive Grey Glacier, a wall of blue ice that calves into the water."
        ],
        question: "What geological feature gives Torres del Paine its name?",
        options: [
          "Three jagged granite peaks (towers).",
          "A deep canyon.",
          "A large volcano.",
          "A series of waterfalls."
        ],
        answer: "Three jagged granite peaks (towers).",
        explanation: "The name refers to the three distinctive granite towers that dominate the landscape."
      },
      {
        stopName: "Rapa Nui",
        imageKeyword: "Rapa Nui",
        description: [
          "Located 3,700 km off the coast, this is one of the most isolated inhabited islands in the world. It is famous for the Moai, nearly 900 massive stone statues carved by the Rapa Nui people between 1250 and 1500 AD.",
          "The statues were carved from volcanic tuff at the Rano Raraku quarry and transported miles to the coast to stand on platforms called ahu. They represent the living faces of deified ancestors.",
          "How the heavy statues were moved remains a subject of debate, with theories ranging from rolling logs to \"walking\" them with ropes. The island is a powerful testament to human ingenuity and the fragility of isolated ecosystems."
        ],
        question: "What do the Moai statues on Easter Island represent?",
        options: [
          "Deified ancestors.",
          "Alien visitors.",
          "Local animals.",
          "Types of food."
        ],
        answer: "Deified ancestors.",
        explanation: "The statues were carved to honor chieftains and ancestors, believing they would project protective power over the tribe."
      },
      {
        stopName: "Valparaíso",
        imageKeyword: "Valparaíso",
        description: [
          "This historic port city is built on dozens of steep hills overlooking the Pacific Ocean. It is known as the \"Jewel of the Pacific\" and is a UNESCO World Heritage site famous for its bohemian culture and street art.",
          "Because the hills are so steep, the city is connected by a unique system of funicular elevators (ascensores). Built in the late 19th century, these rickety wooden cars still carry locals up and down the cliffs daily.",
          "The houses are painted in a chaotic riot of colors. Legend says sailors painted their homes with leftover ship paint to make them visible from the sea, creating the vibrant patchwork we see today."
        ],
        question: "How do residents typically travel up the steep hills of Valparaíso?",
        options: [
          "Using historic funicular elevators.",
          "By helicopter.",
          "On giant slides.",
          "Riding donkeys."
        ],
        answer: "Using historic funicular elevators.",
        explanation: "The city's famous 'ascensores' are inclined railways that lift people up the steep slopes."
      },
      {
        stopName: "The Atacama Desert",
        imageKeyword: "The Atacama Desert",
        description: [
          "The Atacama is the driest non-polar desert on Earth. Some weather stations here have never recorded a single drop of rain. The landscape is so alien that NASA uses it to test Mars rovers.",
          "The \"Valle de la Luna\" (Moon Valley) features bizarre rock formations and sand dunes encrusted with white salt. At sunset, the landscape glows in shades of purple and pink.",
          "Because of the high altitude, zero humidity, and lack of light pollution, it is the best place in the world for astronomy. Massive international telescopes like ALMA are located here to peer into deep space."
        ],
        question: "Why does NASA use the Atacama Desert for testing?",
        options: [
          "It resembles the surface of Mars.",
          "It is close to Florida.",
          "It has low gravity.",
          "It is covered in ice."
        ],
        answer: "It resembles the surface of Mars.",
        explanation: "The extreme dryness and soil composition make it the closest match on Earth to the Martian environment."
      },
      {
        stopName: "The Marble Caves",
        imageKeyword: "The Marble Caves",
        description: [
          "Located in the center of General Carrera Lake, these caves have been carved out of solid marble by 6,000 years of crashing waves. The swirling patterns on the cave walls look like psychedelic paintings.",
          "The color of the caves changes depending on the water level and time of year. The reflection of the glacial blue water on the white marble creates an intense, glowing azure light inside the caverns.",
          "They are only accessible by boat. Gliding through the marble tunnels in a small kayak offers a surreal experience, surrounded by smooth, polished stone that looks soft to the touch."
        ],
        question: "What created the Marble Caves?",
        options: [
          "Erosion by lake waves over thousands of years.",
          "Ancient miners.",
          "Volcanic lava.",
          "Coral growth."
        ],
        answer: "Erosion by lake waves over thousands of years.",
        explanation: "The constant action of the water carved the solid marble peninsula into intricate cave systems."
      }
    ]
  },
  "China": {
    tourTitle: "The Middle Kingdom",
    introText: "The Great Wall snakes thousands of miles along the mountain ridges. Stand before the silent, terracotta gaze of the Emperor's army.",
    stops: [
      {
        stopName: "The Great Wall of China",
        imageKeyword: "The Great Wall of China",
        description: [
          "This series of fortifications stretches over 21,000 kilometers from east to west. It was built by various dynasties over 2,000 years to protect the Chinese Empire from nomadic invasions from the north.",
          "Contrary to popular belief, it is not a single continuous wall but a network of walls, trenches, and natural barriers. The most famous sections near Beijing were built during the Ming Dynasty using bricks and stone.",
          "It served not just as a wall, but as a highway for troops and a communication network. Smoke signals from the watchtowers could transmit messages about enemy movements across the country in hours."
        ],
        question: "What was the primary purpose of the Great Wall?",
        options: [
          "Defense against northern invasions.",
          "To mark the equator.",
          "To keep farm animals inside.",
          "A decorative garden wall."
        ],
        answer: "Defense against northern invasions.",
        explanation: "It was built to stop raids and invasions from nomadic groups like the Mongols and Xiongnu."
      },
      {
        stopName: "The Forbidden City",
        imageKeyword: "The Forbidden City",
        description: [
          "Located in the heart of Beijing, this was the imperial palace for 24 emperors during the Ming and Qing dynasties. It is the world's largest palace complex, consisting of 980 buildings and reportedly 9,999.5 rooms.",
          "For 500 years, it was forbidden for commoners to enter without permission, on pain of death. The architecture is a masterpiece of traditional Chinese design, featuring yellow glazed roof tiles (symbolizing the Emperor) and red walls.",
          "The layout follows strict feng shui principles and axial symmetry, designed to reinforce the Emperor's role as the Son of Heaven, connecting the human world with the divine."
        ],
        question: "Why are the roof tiles of the Forbidden City yellow?",
        options: [
          "Yellow was the exclusive color of the Emperor.",
          "It was the cheapest paint.",
          "To reflect the sun.",
          "They ran out of red tiles."
        ],
        answer: "Yellow was the exclusive color of the Emperor.",
        explanation: "Yellow represented the supreme power of the Emperor, and commoners were forbidden from using it."
      },
      {
        stopName: "The Terracotta Army",
        imageKeyword: "The Terracotta Army",
        description: [
          "Discovered by farmers digging a well in 1974, this is a collection of over 8,000 life-sized clay soldiers buried with the first Emperor of China, Qin Shi Huang, to protect him in the afterlife.",
          "Amazingly, every single soldier has a unique face, hairstyle, and expression. They were originally painted in bright colors, though the paint disintegrated when exposed to air after excavation.",
          "The army includes infantry, archers, and chariots with horses. It demonstrates the incredible organization and industrial capability of the Qin Dynasty over 2,200 years ago."
        ],
        question: "What is unique about the thousands of soldiers in the Terracotta Army?",
        options: [
          "Each soldier has a unique face.",
          "They are made of solid gold.",
          "They are holding real guns.",
          "They are all identical."
        ],
        answer: "Each soldier has a unique face.",
        explanation: "The artisans handcrafted each face individually, likely modeling them after real soldiers of the time."
      },
      {
        stopName: "The Li River",
        imageKeyword: "The Li River",
        description: [
          "The landscape of Guilin and the Li River is famous for its thousands of karst mountains—steep limestone peaks covered in green vegetation that rise abruptly from the flat rice paddies.",
          "This scenery is so iconic that it appears on the back of the 20 Yuan banknote. It has inspired Chinese poets and painters for centuries with its misty, dreamlike quality.",
          "Fishermen on the river still practice the ancient tradition of cormorant fishing. They use trained birds to dive and catch fish, which the birds then bring back to the boat instead of swallowing."
        ],
        question: "The landscape of the Li River appears on which Chinese banknote?",
        options: [
          "The 20 Yuan note.",
          "The 100 Dollar bill.",
          "The 1 Yuan coin.",
          "The 50 Yuan note."
        ],
        answer: "The 20 Yuan note.",
        explanation: "The famous image of the karst mountains reflecting in the river is featured on the 20 RMB bill."
      },
      {
        stopName: "Chengdu Research Base",
        imageKeyword: "Chengdu Research Base of Giant Panda Breeding",
        description: [
          "This facility is the world's leading center for the conservation of the Giant Panda, China's national treasure. It mimics the panda's natural habitat with bamboo forests and caves.",
          "Visitors can see pandas of all ages, from tiny, pink newborns in incubators to adults munching on bamboo. The base has been crucial in saving the species from extinction through successful breeding programs.",
          "Although pandas are classified as carnivores, their diet consists almost entirely of bamboo. They have to eat for up to 14 hours a day to get enough energy because bamboo offers very little nutrition."
        ],
        question: "What is the primary diet of the Giant Panda?",
        options: [
          "Bamboo.",
          "Fish.",
          "Insects.",
          "Rice."
        ],
        answer: "Bamboo.",
        explanation: "Despite having the digestive system of a carnivore, pandas have evolved to eat almost exclusively bamboo."
      }
    ]
  },
  "Colombia": {
    tourTitle: "The Rhythm of the Andes",
    introText: "The river of five colors flows through the ancient rock of the shield. Discover a lost city hidden high in the coastal jungle mountains.",
    stops: [
      {
        stopName: "Caño Cristales",
        imageKeyword: "Caño Cristales",
        description: [
          "Often called the \"River of Five Colors\" or the \"Liquid Rainbow,\" this river in the Serranía de la Macarena transforms into a kaleidoscope of color between July and November.",
          "The vibrant reds, yellows, greens, and blues are caused by a unique aquatic plant called Macarenia clavigera that grows on the riverbed. The plant changes color depending on the sunlight and water depth.",
          "It flows through a remote area where the Amazon rainforest, the Andes, and the Orinoco plains meet, creating a unique biodiversity hotspot. For years it was inaccessible, but it is now a symbol of Colombia's ecotourism."
        ],
        question: "What gives Caño Cristales its vibrant colors?",
        options: [
          "A unique aquatic plant called Macarenia clavigera.",
          "Chemical pollution.",
          "Colored lights installed underwater.",
          "Reflections of colorful birds."
        ],
        answer: "A unique aquatic plant called Macarenia clavigera.",
        explanation: "The red, pink, and green colors come from this endemic plant adhering to the rocks in the riverbed."
      },
      {
        stopName: "The Walled City of Cartagena",
        imageKeyword: "The Walled City of Cartagena",
        description: [
          "Cartagena de Indias is a gem of colonial architecture on the Caribbean coast. Its historic center is enclosed by 11 kilometers of massive stone walls, originally built to protect the city's immense wealth from pirates and foreign navies.",
          "Inside the walls, the streets are lined with colorful colonial mansions, flower-filled balconies, and leafy plazas. It feels like stepping into a romance novel—in fact, it was the home and inspiration for Nobel Prize author Gabriel García Márquez.",
          "The city was the main port for the Spanish empire in South America, where gold and silver were stored before being shipped to Europe. The San Felipe de Barajas fortress dominating the city is the greatest fortress the Spanish ever built in the Americas."
        ],
        question: "Why was the massive wall around Cartagena originally built?",
        options: [
          "To protect the city's wealth from pirates.",
          "To keep wild animals out.",
          "As a decorative garden feature.",
          "To prevent flooding."
        ],
        answer: "To protect the city's wealth from pirates.",
        explanation: "As the main port for shipping gold to Spain, it was a prime target for pirates like Sir Francis Drake."
      },
      {
        stopName: "Monserrate",
        imageKeyword: "Monserrate",
        description: [
          "Rising 3,152 meters above sea level, this mountain dominates the skyline of the capital, Bogotá. At the summit sits a white 17th-century church containing a shrine dedicated to \"El Señor Caído\" (The Fallen Lord).",
          "It is a major pilgrim site; many devotees climb the steep path on their knees as an act of penance. For tourists, a cable car and funicular train offer an easier way to reach the top.",
          "The view from the peak is breathtaking, offering a panoramic look at the sprawling metropolis of 8 million people below. It is the best place to understand the sheer scale of Bogotá."
        ],
        question: "How do religious pilgrims traditionally ascend Monserrate?",
        options: [
          "Climbing the path on their knees.",
          "Riding a donkey.",
          "Taking a helicopter.",
          "Walking backwards."
        ],
        answer: "Climbing the path on their knees.",
        explanation: "Many faithful climb the steep stone path on their knees to ask for miracles or show devotion."
      },
      {
        stopName: "Las Lajas Sanctuary",
        imageKeyword: "Las Lajas Sanctuary",
        description: [
          "This Gothic Revival basilica is built inside the canyon of the Guáitara River near the border with Ecuador. It looks like a fairy-tale castle suspended in mid-air.",
          "The church was built to commemorate a miracle where the Virgin Mary reportedly appeared on a storm-struck rock to a woman and her deaf-mute daughter, who was instantly cured. The main altar is actually the rock face where the image appeared.",
          "A massive stone bridge connects the church to the other side of the canyon, rising 100 meters above the river. It is considered one of the most beautiful churches in the world."
        ],
        question: "Where is the main altar of Las Lajas Sanctuary located?",
        options: [
          "It is the natural rock face of the canyon.",
          "It is made of imported gold.",
          "It is floating on the river.",
          "It is in a separate building."
        ],
        answer: "It is the natural rock face of the canyon.",
        explanation: "The church was built around the specific rock wall where the miraculous image was said to have appeared."
      },
      {
        stopName: "Guatapé and El Peñol",
        imageKeyword: "Guatapé and El Peñol",
        description: [
          "The town of Guatapé is famous for being the most colorful town in the world. Every building is decorated with \"zócalos\"—brightly colored bas-reliefs on the lower walls depicting animals, people, or shapes.",
          "Towering over the town is \"El Peñol,\" a massive 220-meter high granite monolith. It looks like a giant stone stitched together with a zipper—which is actually a 740-step staircase built into a crack in the rock.",
          "Climbing to the top rewards visitors with a stunning view of a man-made reservoir that snakes around green hills. The landscape looks like a jigsaw puzzle of water and land."
        ],
        question: "What is \"El Peñol\"?",
        options: [
          "A massive granite monolith stone.",
          "A famous cathedral.",
          "A type of spicy food.",
          "A traditional dance."
        ],
        answer: "A massive granite monolith stone.",
        explanation: "It is a gigantic, smooth rock formation that visitors can climb via a staircase built into a crevice."
      }
    ]
  },
  "Comoros": {
    tourTitle: "The Perfume Islands",
    introText: "The scent of ylang-ylang flowers fills the air on these volcanic islands. Dive deep to find the prehistoric coelacanth fish in the dark blue sea.",
    stops: [
      {
        stopName: "Mount Karthala",
        imageKeyword: "Mount Karthala",
        description: [
          "This active shield volcano dominates the main island of Grande Comore. It rises 2,361 meters from the sea and has one of the largest active craters in the world, measuring 3 by 4 kilometers.",
          "The volcano is notorious for its frequent eruptions, which have created a landscape of dark, solidified lava flows contrasting with the tropical green vegetation. The climb to the rim takes hikers through dense rainforests into a lunar-like summit.",
          "Legend says the crater is the gateway to hell for djinns (spirits). Despite the danger, the volcanic soil is incredibly fertile, supporting the island's vanilla and spice agriculture."
        ],
        question: "What type of volcano is Mount Karthala?",
        options: [
          "Active shield volcano.",
          "Extinct cinder cone.",
          "Underwater volcano.",
          "Ice volcano."
        ],
        answer: "Active shield volcano.",
        explanation: "It is a broad, domed volcano built up by repeated lava flows, similar to those in Hawaii."
      },
      {
        stopName: "Mohéli Marine Park",
        imageKeyword: "Mohéli Marine Park",
        description: [
          "Established in 2001, this was the first protected marine area in the Comoros. It surrounds the island of Mohéli and is a sanctuary for diverse marine life, including dolphins, manta rays, and dugongs.",
          "It is one of the most important nesting sites in the Indian Ocean for the Green Sea Turtle. Visitors can watch giant turtles laying eggs on the beaches at night and swim with them during the day.",
          "The park is a model of eco-tourism, managed by local village communities who directly benefit from protecting the environment rather than overfishing it."
        ],
        question: "Mohéli Marine Park is a major nesting site for which animal?",
        options: [
          "Green Sea Turtles.",
          "Penguins.",
          "Crocodiles.",
          "Seagulls."
        ],
        answer: "Green Sea Turtles.",
        explanation: "Thousands of these endangered turtles come to the pristine beaches of Mohéli to lay their eggs."
      },
      {
        stopName: "Lac Salé",
        imageKeyword: "Lac Salé",
        description: [
          "Located on the northern tip of Grande Comore, this crater lake lies adjacent to the ocean but is reputed to be bottomless. The water is extremely salty and changes color throughout the day due to algae.",
          "Local legend claims that a village once stood here. A holy man asked for water but was refused by everyone except one woman. The village was then swallowed by the lake as punishment, sparing only the woman.",
          "The landscape is stark and beautiful, with the calm, flat lake bordering the rough, crashing waves of the Indian Ocean, separated only by a thin ridge of rock."
        ],
        question: "According to local legend, what lies beneath Lac Salé?",
        options: [
          "A sunken village.",
          "A dragon's cave.",
          "A pirate ship.",
          "A portal to another world."
        ],
        answer: "A sunken village.",
        explanation: "Myths say the lake was formed to punish a village for being inhospitable to a holy traveler."
      },
      {
        stopName: "Ylang-Ylang Plantations",
        imageKeyword: "Ylang-Ylang Plantations",
        description: [
          "Comoros is the world's largest producer of Ylang-Ylang, a yellow flower whose essential oil is a key ingredient in many famous perfumes, including Chanel No. 5.",
          "The islands are covered in twisted, gnarled ylang-ylang trees. They are kept pruned short so pickers can reach the flowers. The scent is heavy and sweet, hanging over the entire island during harvest.",
          "Visitors can tour the distilleries to see the traditional copper stills used to extract the oil. This industry gave Comoros its nickname, \"The Perfume Islands.\""
        ],
        question: "Ylang-Ylang oil from Comoros is a key ingredient in what product?",
        options: [
          "Perfume (like Chanel No. 5).",
          "Chocolate.",
          "Rubber tires.",
          "Medicine."
        ],
        answer: "Perfume (like Chanel No. 5).",
        explanation: "The essential oil is highly enlarged in the fragrance industry for its floral scent."
      },
      {
        stopName: "The Coelacanth Discovery",
        imageKeyword: "The Coelacanth Discovery",
        description: [
          "The waters off Comoros are the home of the Coelacanth, a prehistoric fish that was believed to have gone extinct 65 million years ago with the dinosaurs.",
          "In 1938, one was caught alive, shocking the scientific world. It is known as a \"living fossil\" because its anatomy has barely changed in 400 million years. It has limb-like fins that suggest how fish might have first walked onto land.",
          "While you are unlikely to see one while snorkeling (they live very deep), the National Museum in Moroni displays preserved specimens, celebrating the island's link to ancient evolutionary history."
        ],
        question: "Why is the Coelacanth fish famous?",
        options: [
          "It was thought extinct for millions of years but found alive.",
          "It is the largest fish in the world.",
          "It can fly.",
          "It glows in the dark."
        ],
        answer: "It was thought extinct for millions of years but found alive.",
        explanation: "Scientists believed it died out with the dinosaurs until a specimen was discovered in the 20th century."
      }
    ]
  },
  "Congo (Brazzaville)": {
    tourTitle: "The Green Heart",
    introText: "Western lowland gorillas dwell in the dense, steaming rainforests. Watch the mighty Congo River rushing past the city banks.",
    stops: [
      {
        stopName: "Odzala-Kokoua National Park",
        imageKeyword: "Odzala-Kokoua National Park",
        description: [
          "This is one of Africa's oldest national parks, protecting a vast area of the Congo Basin rainforest. It is distinctive for its \"bais\"—swampy, grassy clearings in the middle of the dense forest.",
          "These bais attract immense numbers of wildlife. It is one of the best places in the world to spot Western Lowland Gorillas, who come to the clearings to eat roots and socialize.",
          "The park is also home to forest elephants and flocks of thousands of green pigeons. It represents the raw, untouched wilderness of Central Africa."
        ],
        question: "What attracts gorillas to the 'bais' in Odzala-Kokoua?",
        options: [
          "Roots and social opportunities in the open clearings.",
          "Tourists feeding them.",
          "Protection from rain.",
          "To sleep in the sun."
        ],
        answer: "Roots and social opportunities in the open clearings.",
        explanation: "The bais provide rich minerals and plants, as well as an open space for social interaction."
      },
      {
        stopName: "The Congo River Rapids",
        imageKeyword: "The Congo River Rapids",
        description: [
          "Near Brazzaville, the mighty Congo River—the second most powerful river in the world—narrows and accelerates through the 'Rapides du Djoué'.",
          "The water churns violently as it rushes towards the Livingstone Falls downstream. Brazzaville sits directly across the river from Kinshasa (DRC), making them the two closest capital cities in the world.",
          "Locals fish in these dangerous waters using traditional traps. The sight of the massive river rushing by is a reminder of the raw natural power that defines the region."
        ],
        question: "Brazzaville sits directly across the river from which other capital city?",
        options: [
          "Kinshasa.",
          "Luanda.",
          "Bangui.",
          "Yaoundé."
        ],
        answer: "Kinshasa.",
        explanation: "Kinshasa, the capital of the DRC, is visible on the opposite bank of the Congo River."
      },
      {
        stopName: "Diosso Gorge",
        imageKeyword: "Diosso Gorge",
        description: [
          "Located near the coast, this spectacular gorge is often called the \"Grand Canyon of the Congo.\" It was formed by the erosion of soft red rock by wind and rain.",
          "The gorge features dramatic ridges and cliffs covered in lush green rainforest vegetation. The contrast between the red earth and the green jungle is stunning.",
          "Local legends say the gorge is inhabited by spirits. It is a geological anomaly in a region mostly known for flat rainforests and wetlands."
        ],
        question: "What is a common nickname for the Diosso Gorge?",
        options: [
          "The Grand Canyon of the Congo.",
          "The Devil's Throat.",
          "The Red Valley.",
          "The Green Abyss."
        ],
        answer: "The Grand Canyon of the Congo.",
        explanation: "Its dramatic, eroded red cliffs resemble the famous American canyon, but covered in jungle."
      },
      {
        stopName: "Basilique Sainte-Anne",
        imageKeyword: "Basilique Sainte-Anne",
        description: [
          "This incredible church in Brazzaville is a masterpiece of architectural fusion. Built in 1949 by a French architect, it combines European gothic concepts with local African materials and shapes.",
          "The roof is covered in emerald-green tiles that look like the scales of a giant snake or the skin of a crocodile. The spire is shaped like a traditional African spear.",
          "Inside, the arches are not traditional Roman style but are shaped to resemble the hands of people joined in prayer. It is considered one of the most beautiful modern churches in Africa."
        ],
        question: "What do the green roof tiles of the Basilique Sainte-Anne resemble?",
        options: [
          "Scales of a snake.",
          "Leaves of a tree.",
          "Waves of the ocean.",
          "Emeralds."
        ],
        answer: "Scales of a snake.",
        explanation: "The green tiled roof was designed to evoke the texture of a reptile native to the Congo."
      },
      {
        stopName: "Nouabalé-Ndoki National Park",
        imageKeyword: "Nouabalé-Ndoki National Park",
        description: [
          "This park is known as the \"Last Eden.\" It is so remote and pristine that when biological surveys were first conducted in the 1990s, the animals (like chimps and elephants) had never seen humans and did not run away.",
          "It contains distinct populations of \"naive\" animals that show no fear of people. The park is a swampy forest that is extremely difficult to access, which has protected it from logging and poaching.",
          "It is a stronghold for gorillas, elephants, and bongo antelopes. Staying here usually involves sleeping in research camps deep in the jungle."
        ],
        question: "Why is Nouabalé-Ndoki often called the \"Last Eden\"?",
        options: [
          "The animals had never seen humans and showed no fear.",
          "It is full of apple trees.",
          "It has no snakes.",
          "It is a man-made garden."
        ],
        answer: "The animals had never seen humans and showed no fear.",
        explanation: "Its extreme isolation meant wildlife had no learned fear of humans, creating a pristine, Eden-like state."
      }
    ]
  },
  "Costa Rica": {
    tourTitle: "The Living Eden",
    introText: "Mist clings to the mossy trees of the high cloud forests. Watch lava glowing at night or sea turtles nesting on the dark sand.",
    stops: [
      {
        stopName: "Arenal Volcano",
        imageKeyword: "Arenal Volcano",
        description: [
          "Arenal is a perfectly cone-shaped volcano that dominates the northern lowlands. Until 2010, it was one of the most active volcanoes in the world, regularly spewing lava and ash.",
          "Although it is currently in a resting phase, the volcano is still geothermally active. The area around the base is famous for its natural hot springs, heated by the magma deep underground.",
          "The surrounding rainforest is lush and full of wildlife. Hiking the old hardened lava flows offers a stark contrast between the black volcanic rock and the vibrant green jungle."
        ],
        question: "What heats the natural springs around Arenal Volcano?",
        options: [
          "Underground volcanic magma.",
          "Solar panels.",
          "Electric heaters.",
          "Friction from earthquakes."
        ],
        answer: "Underground volcanic magma.",
        explanation: "The geothermal activity of the volcano naturally heats the groundwater."
      },
      {
        stopName: "Monteverde Cloud Forest",
        imageKeyword: "Monteverde Cloud Forest",
        description: [
          "This rare ecosystem is located high in the mountains where the clouds hang low, constantly bathing the forest in mist. This moisture allows plants to grow on top of other plants—every tree trunk is covered in mosses, orchids, and ferns.",
          "It is one of the few places to spot the Resplendent Quetzal, a bird with brilliant green feathers and a long tail that was sacred to the ancient Maya and Aztecs.",
          "Visitors can explore the canopy by walking on hanging bridges suspended high above the forest floor, seeing the ecosystem from the perspective of the monkeys and birds."
        ],
        question: "What defines a \"Cloud Forest\" ecosystem?",
        options: [
          "Constant low-level cloud cover and mist.",
          "It rains frogs.",
          "The trees are made of clouds.",
          "It is located above the atmosphere."
        ],
        answer: "Constant low-level cloud cover and mist.",
        explanation: "The forest is characterized by persistent fog and mist that provides constant moisture."
      },
      {
        stopName: "Tortuguero National Park",
        imageKeyword: "Tortuguero National Park",
        description: [
          "Located on the Caribbean coast, this park is often called the \"Amazon of Costa Rica\" because it is a web of navigable canals and rivers rather than roads. It is accessible only by boat or plane.",
          "Its name means \"Place of Turtles.\" It is the most important nesting site in the western Caribbean for the endangered Green Sea Turtle. Thousands of turtles come ashore to lay eggs from July to October.",
          "The dark, black volcanic sand beaches are strictly protected. At night, guided tours allow visitors to watch the nesting process in total silence to avoid disturbing these ancient creatures."
        ],
        question: "How do visitors primarily travel within Tortuguero National Park?",
        options: [
          "By boat through canals.",
          "By car on highways.",
          "By subway.",
          "On camels."
        ],
        answer: "By boat through canals.",
        explanation: "The park is a wetland labyrinth with no roads, so travel is done via boat."
      },
      {
        stopName: "Rio Celeste",
        imageKeyword: "Rio Celeste",
        description: [
          "Hidden in the Tenorio Volcano National Park, this river is famous for its unbelievable turquoise-blue color. It looks like paint has been spilled into the water.",
          "The color is created by a chemical reaction. Two clear rivers meet at a point called \"El Teñidero\" (The Dyer). The mixing of volcanic minerals (sulfur and calcium carbonate) changes the pH and creates the vivid blue optical effect.",
          "Local legend says that when God finished painting the sky, he washed his paintbrushes in this river, turning it blue."
        ],
        question: "What causes the vibrant blue color of Rio Celeste?",
        options: [
          "A chemical reaction between minerals where two rivers meet.",
          "Blue algae.",
          "Dye from a factory.",
          "Reflection of blue macaws."
        ],
        answer: "A chemical reaction between minerals where two rivers meet.",
        explanation: "The physical mixing of minerals creates particles that scatter sunlight to look blue."
      },
      {
        stopName: "The Stone Spheres of Diquís",
        imageKeyword: "The Stone Spheres of Diquís",
        description: [
          "Scattered across the Diquís Delta are over 300 perfectly spherical stone balls. They range in size from a few centimeters to over 2 meters in diameter and weigh up to 16 tons.",
          "They were carved by the pre-Columbian Diquís culture between 500 and 1500 AD. The spheres are nearly geometrically perfect, but their purpose remains a mystery—whether they were status symbols, navigational aids, or astronomical tools.",
          "Many were moved or destroyed by fruit companies in the 20th century, but they remain a symbol of the country's indigenous heritage and engineering skill."
        ],
        question: "What is mysterious about the Stone Spheres of Diquís?",
        options: [
          "Their original purpose and near-perfect roundness.",
          "They glow at night.",
          "They are magnetic.",
          "They float in water."
        ],
        answer: "Their original purpose and near-perfect roundness.",
        explanation: "Archaeologists still debate how they were made so perfectly round and exactly what they were used for."
      }
    ]
  },
  "Côte d'Ivoire": {
    tourTitle: "The Ivory Coast",
    introText: "The largest church in the world rises from the jungle in Yamoussoukro. Walk the decaying colonial streets of the old capital.",
    stops: [
      {
        stopName: "Basilica of Our Lady of Peace",
        imageKeyword: "Basilica of Our Lady of Peace",
        description: [
          "Located in the capital Yamoussoukro, this massive church holds the Guinness World Record as the largest church in the world, surpassing even St. Peter's Basilica in Rome (which it was modeled after).",
          "It was built in the late 1980s by President Félix Houphouët-Boigny. The dome stretches 158 meters into the sky, topped by a massive gold cross. It sits in the middle of the bush, a stark contrast to the surrounding landscape.",
          "Despite its grandeur and 7,000 seats, it is often nearly empty during services. It stands as a controversial but undeniable monument to the country's post-independence ambition."
        ],
        question: "The Basilica of Our Lady of Peace is modeled after which famous building?",
        options: [
          "St. Peter's Basilica in the Vatican.",
          "Notre Dame in Paris.",
          "The Hagia Sophia.",
          "The White House."
        ],
        answer: "St. Peter's Basilica in the Vatican.",
        explanation: "Its design is a direct homage to the Vatican's basilica, though built on a slightly larger scale."
      },
      {
        stopName: "Grand-Bassam",
        imageKeyword: "Grand-Bassam",
        description: [
          "This town was the first French colonial capital of Côte d'Ivoire. It is a UNESCO World Heritage site known for its late 19th-century colonial architecture.",
          "The historic district, known as \"France,\" is filled with elegant but decaying mansions built for colonial administrators. Nature is slowly reclaiming the buildings, giving the town a ghostly, atmospheric charm.",
          "It is also a center for local culture, famous for the N'zima people's Abissa festival and its vibrant craft markets selling pottery and textiles."
        ],
        question: "What distinguishes the architecture of Grand-Bassam?",
        options: [
          "19th-century French colonial mansions.",
          "Mud brick huts.",
          "Modern skyscrapers.",
          "Ancient Roman ruins."
        ],
        answer: "19th-century French colonial mansions.",
        explanation: "The town preserves the layout and buildings of the original French colonial administration."
      },
      {
        stopName: "Taï National Park",
        imageKeyword: "Taï National Park",
        description: [
          "This is one of the last major remnants of the primary tropical rainforest of West Africa. It is a UNESCO World Heritage site and a biodiversity hotspot.",
          "The park is famous for its chimpanzees, which have been studied for decades. These chimps are known for unique behaviors, such as using tools to crack nuts, which is a sign of high intelligence.",
          "It is also the home of the Pygmy Hippo, a rare, solitary, and nocturnal relative of the river hippo that is endemic to this region."
        ],
        question: "Taï National Park is a sanctuary for which rare mammal?",
        options: [
          "Pygmy Hippo.",
          "White Rhino.",
          "Giant Panda.",
          "Polar Bear."
        ],
        answer: "Pygmy Hippo.",
        explanation: "The elusive Pygmy Hippo is native to the forests of West Africa and is found here."
      },
      {
        stopName: "La Dent de Man",
        imageKeyword: "La Dent de Man",
        description: [
          "Located near the city of Man in the mountainous west, this rocky peak towers over the landscape. Its jagged shape resembles a giant tooth, giving it its name.",
          "The area is known as the \"City of 18 Mountains.\" The hike to the top offers spectacular views of the lush green valleys and waterfalls below.",
          "The mountain is considered sacred by the local Dan people. The region is also famous for its traditional mask festivals and stilt dancers."
        ],
        question: "What does the name \"La Dent de Man\" mean?",
        options: [
          "The Tooth of Man.",
          "The Hand of Man.",
          "The Mountain of Gold.",
          "The Sleeping Giant."
        ],
        answer: "The Tooth of Man.",
        explanation: "The rocky outcrop has a distinct, sharp shape that looks like a tooth."
      },
      {
        stopName: "St. Paul's Cathedral",
        imageKeyword: "St. Paul's Cathedral",
        description: [
          "This unique modern cathedral in Abidjan is a landmark of African futurist architecture. Completed in 1985, its design is strikingly different from traditional churches.",
          "The structure is supported by seven massive cables that anchor the roof to a giant cross-shaped tower. This design symbolizes the Holy Trinity and the church pulling towards heaven.",
          "The stained glass windows inside depict not just biblical scenes, but the history of the Catholic Church in Africa, blending faith with local identity."
        ],
        question: "What architectural style best describes St. Paul's Cathedral in Abidjan?",
        options: [
          "Modernist / Futurist.",
          "Gothic Revival.",
          "Baroque.",
          "Neoclassical."
        ],
        answer: "Modernist / Futurist.",
        explanation: "The cathedral is known for its bold, non-traditional design utilizing concrete and suspension cables."
      }
    ]
  },
  "Croatia": {
    tourTitle: "The Adriatic Jewel",
    introText: "Medieval walled cities rise directly from the sparkling blue sea. Explore cascading waterfalls and Roman ruins in this coastal paradise.",
    stops: [
      {
        stopName: "The Walls of Dubrovnik",
        imageKeyword: "The Walls of Dubrovnik",
        description: [
          "These massive stone walls surround the entire Old City of Dubrovnik, stretching for nearly 2 kilometers. Built between the 12th and 17th centuries, they are considered one of the greatest fortification systems of the Middle Ages, as they were never breached by a hostile army.",
          "Walking along the top of the ramparts offers stunning views of the terracotta rooftops on one side and the shimmering Adriatic Sea on the other. The white limestone streets below, polished by centuries of footsteps, glow in the sunlight.",
          "The city gained worldwide fame as the primary filming location for \"King's Landing\" in Game of Thrones. Despite the crowds, the sheer scale and preservation of the fortifications remain awe-inspiring."
        ],
        question: "Dubrovnik's walls are famous for never having been breached by what?",
        options: [
          "A hostile army.",
          "A flood.",
          "An earthquake.",
          "A fire."
        ],
        answer: "A hostile army.",
        explanation: "The complex system of forts and walls successfully defended the city-state for centuries."
      },
      {
        stopName: "Plitvice Lakes National Park",
        imageKeyword: "Plitvice Lakes National Park",
        description: [
          "This UNESCO World Heritage site is a natural wonderland of 16 terraced lakes joined by waterfalls. The lakes cascade into one another, separated by natural dams made of travertine, a type of limestone deposited by moss, algae, and bacteria.",
          "The water is famous for its changing colors, ranging from azure to green, grey, or blue. The colors depend on the quantity of minerals or organisms in the water and the angle of sunlight.",
          "Wooden boardwalks wind over the lakes and right next to the waterfalls, allowing visitors to walk directly through this water world. Swimming is strictly forbidden to protect the fragile ecosystem."
        ],
        question: "What creates the natural dams that separate the lakes in Plitvice?",
        options: [
          "Travertine (limestone deposits from moss/algae).",
          "Beavers.",
          "Concrete.",
          "Volcanic lava."
        ],
        answer: "Travertine (limestone deposits from moss/algae).",
        explanation: "The barriers are formed by a biological and chemical process involving calcium carbonate precipitation."
      },
      {
        stopName: "Diocletian's Palace",
        imageKeyword: "Diocletian's Palace",
        description: [
          "This is not just a palace but an entire living city built by the Roman Emperor Diocletian in the 4th century AD as his retirement home. Today, the ancient palace walls form the heart of the city of Split.",
          "About 3,000 people still live inside the palace walls. The former Emperor's apartments, temples, and mausoleum have been converted into houses, shops, bars, and churches over the centuries, creating a unique mix of ancient and modern life.",
          "The Peristyle, the central square of the palace, is flanked by granite columns imported from Egypt 1,700 years ago. You can sip coffee on the steps where the Emperor once received his subjects."
        ],
        question: "Who originally built the massive palace that now forms the center of Split?",
        options: [
          "The Roman Emperor Diocletian.",
          "Julius Caesar.",
          "Napoleon Bonaparte.",
          "Alexander the Great."
        ],
        answer: "The Roman Emperor Diocletian.",
        explanation: "Diocletian built this massive complex as a retirement fortress-villa after abdicating the throne."
      },
      {
        stopName: "Pula Arena",
        imageKeyword: "Pula Arena",
        description: [
          "This Roman amphitheater is the only remaining Roman amphitheater to have four side towers entirely preserved. It is one of the six largest surviving Roman arenas in the world.",
          "Built in the 1st century AD, it was used for gladiator fights and could hold 23,000 spectators. The limestone walls are incredibly well-preserved, standing three stories high.",
          "Today, it is still used as a venue, but for concerts and film festivals instead of blood sports. The acoustics are excellent, and underground passages that once held caged animals now host a museum of olive oil and wine amphorae."
        ],
        question: "What was the Pula Arena originally used for in the 1st century?",
        options: [
          "Gladiator fights.",
          "Marketplace trading.",
          "Religious sacrifices.",
          "Senate meetings."
        ],
        answer: "Gladiator fights.",
        explanation: "Like the Colosseum in Rome, it was a venue for public spectacles including combat."
      },
      {
        stopName: "The Sea Organ",
        imageKeyword: "The Sea Organ",
        description: [
          "Located on the waterfront of Zadar, this is an architectural sound art object and an experimental musical instrument. It looks like a set of broad stone steps leading into the sea.",
          "Underneath the marble steps is a system of 35 polyethylene pipes and whistles. When ocean waves push air through the pipes, they play random, hauntingly beautiful musical chords.",
          "The music is entirely unpredictable, created by the rhythm of the sea itself. It creates a meditative atmosphere, especially at sunset, which Alfred Hitchcock once described as the most beautiful in the world."
        ],
        question: "What powers the music of the Sea Organ in Zadar?",
        options: [
          "Ocean waves pushing air through pipes.",
          "Electricity.",
          "Wind blowing through holes.",
          "Solar panels."
        ],
        answer: "Ocean waves pushing air through pipes.",
        explanation: "The movement of the waves provides the energy to force air through submerged whistles."
      }
    ]
  },
  "Cuba": {
    tourTitle: "The Pearl of the Antilles",
    introText: "Vintage cars roll past colorful colonial buildings in Old Havana. Feel the vibrant energy of the music and the island heat.",
    stops: [
      {
        stopName: "Old Havana",
        imageKeyword: "Old Havana",
        description: [
          "The streets are a rolling museum of 1950s American vehicles known as Almendrones. Due to the U.S. trade embargo established in 1960, no new American cars could be imported, forcing mechanics to keep these classics running with ingenuity and handmade parts.",
          "Founded in 1519, the old city is one of the best-preserved colonial centers in the Americas. It is a dense mix of Baroque and Neoclassical buildings that feature high ceilings, heavy wooden doors, and elaborate iron balconies.",
          "Life revolves around the five main plazas. Plaza de la Catedral is famous for its asymmetrical cathedral, designed with one tower larger than the other to avoid blocking the fresh sea breeze from flowing into the square."
        ],
        question: "Why are there so many 1950s American cars on the streets of Cuba?",
        options: [
          "A trade embargo stopped the import of new American cars.",
          "They prefer the style.",
          "The roads are too small for modern cars.",
          "They are cheaper to run."
        ],
        answer: "A trade embargo stopped the import of new American cars.",
        explanation: "Since 1960, Cubans have maintained the pre-embargo cars because they could not buy new ones from the US."
      },
      {
        stopName: "Viñales Valley",
        imageKeyword: "Viñales Valley",
        description: [
          "This valley is famous for its mogotes, which are massive, isolated limestone hills with vertical walls and rounded tops. They rise abruptly from the flat red soil of the valley floor, creating a prehistoric look.",
          "This region produces what is widely considered the best tobacco in the world. The unique combination of minerals in the soil and the perfect humidity creates the leaves used for famous cigar brands like Cohiba and Montecristo.",
          "Agriculture here remains traditional. To protect the delicate tobacco leaves from the fumes of modern machinery, farmers still plow the fields using oxen and harvest the crops entirely by hand."
        ],
        question: "What are the steep, isolated limestone hills in the valley called?",
        options: [
          "Mogotes.",
          "Cenotes.",
          "Mesas.",
          "Tepuis."
        ],
        answer: "Mogotes.",
        explanation: "These karst formations are the remnants of a limestone plateau that eroded away millions of years ago."
      },
      {
        stopName: "Trinidad",
        imageKeyword: "Trinidad",
        description: [
          "Trinidad is often described as a city frozen in time. In the mid-19th century, the sugar trade declined, and modernization stopped. As a result, the historic center remains almost exactly as it looked in 1850.",
          "The mansions surrounding the Plaza Mayor were built by the \"Sugar Barons.\" They used their immense wealth to import marble floors from Italy and chandeliers from France to decorate their homes in the middle of the Caribbean.",
          "The streets are paved with uneven river stones known as chinas pelonas. They were originally used as ballast (weight) in ships coming from Europe and were offloaded here to make room for sugar exports."
        ],
        question: "What industry created the immense wealth that built Trinidad?",
        options: [
          "The sugar industry.",
          "Gold mining.",
          "Tobacco farming.",
          "Textile manufacturing."
        ],
        answer: "The sugar industry.",
        explanation: "The city flourished in the 18th and 19th centuries due to the booming sugar plantations in the nearby Valley of the Sugar Mills."
      },
      {
        stopName: "The Malecón",
        imageKeyword: "The Malecón",
        description: [
          "This 8-kilometer seawall and roadway stretches along the coast of Havana. Locals call it \"The Sofa of Havana\" because thousands of people gather here every evening to sit on the wall, talk, drink rum, and socialize.",
          "It is the city's front line against the elements. During storms or cold fronts (nortes), huge waves crash over the wall and flood the street, spraying saltwater onto the crumbling facades of the buildings across the road.",
          "It serves as an open-air theater for Cuban life. At night, the air is filled with the sounds of street musicians playing guitar and trumpet, while fishermen cast their lines into the dark water hoping for a catch."
        ],
        question: "What is the local nickname for the Malecón seawall?",
        options: [
          "The Sofa of Havana.",
          "The Great Wall.",
          "The Blue Line.",
          "The City Balcony."
        ],
        answer: "The Sofa of Havana.",
        explanation: "It is called this because it serves as the city's main living room where everyone gathers to sit and socialize."
      },
      {
        stopName: "Castillo de San Pedro de la Roca",
        imageKeyword: "Castillo de San Pedro de la Roca",
        description: [
          "Located in Santiago de Cuba, this massive fort is the most complete example of Spanish-American military architecture. It was built into a steep cliff at the entrance of the bay to protect the city from pirates.",
          "The construction was ordered because the city had been sacked by pirates multiple times. Despite the massive walls, the famous pirate Henry Morgan still managed to sneak past the defenses and attack the city in 1662.",
          "It is a complex maze of drawbridges, moats, and levels connected by narrow staircases. The design was created by Italian military engineers to ensure that even if one level was captured, the defenders could retreat to the next one and keep fighting."
        ],
        question: "What was the primary purpose of building this fortress?",
        options: [
          "To protect the city from pirate attacks.",
          "To house the governor.",
          "As a prison.",
          "To store gold."
        ],
        answer: "To protect the city from pirate attacks.",
        explanation: "The Spanish crown fortified the harbor entrance to stop pirates from looting the valuable port city."
      }
    ]
  },
  "Cyprus": {
    tourTitle: "The Island of Love",
    introText: "Swim around the rock where the goddess of love was born. Walk the streets of the last divided capital city in Europe.",
    stops: [
      {
        stopName: "Petra tou Romiou",
        imageKeyword: "Petra tou Romiou",
        description: [
          "According to ancient mythology, this specific spot on the coast is where Aphrodite, the Greek goddess of love and beauty, rose from the sea foam. The name \"Petra tou Romiou\" actually refers to a later legend about a Byzantine hero hurling the rock at pirates.",
          "Local superstition says that if you swim around the main rock three times, you will be blessed with eternal youth and beauty. Others believe that finding a heart-shaped stone on the pebble beach guarantees you will find true love.",
          "The coastline here is dramatic and rugged. The stark white geological formations contrast sharply with the deep blue of the Mediterranean Sea, creating one of the most photographed views on the island."
        ],
        question: "Which Greek goddess is said to have been born at this location?",
        options: [
          "Aphrodite.",
          "Athena.",
          "Hera.",
          "Artemis."
        ],
        answer: "Aphrodite.",
        explanation: "Myth states she emerged from the foaming waves at this exact rock formation."
      },
      {
        stopName: "Paphos Archaeological Park",
        imageKeyword: "Paphos Archaeological Park",
        description: [
          "This UNESCO World Heritage site contains some of the finest preserved Roman mosaics in the Eastern Mediterranean. They date back to the 2nd century AD and originally served as the floors for the luxurious villas of wealthy Roman noblemen.",
          "The mosaics are incredibly detailed, using thousands of tiny colored stones to create complex paintings. They depict famous scenes from Greek mythology, such as the god of wine, Dionysos, riding a chariot, or Theseus fighting the Minotaur.",
          "Amazingly, these treasures lay buried and forgotten for centuries until a farmer plowing his field accidentally uncovered them in 1962. Excavations are still ongoing, and new sections of the ancient city are frequently found."
        ],
        question: "What are the Roman villas in Paphos most famous for?",
        options: [
          "Their intricate floor mosaics.",
          "Their tall columns.",
          "Their gold statues.",
          "Their underground tunnels."
        ],
        answer: "Their intricate floor mosaics.",
        explanation: "The villas feature incredibly well-preserved mosaic floors illustrating Greek myths."
      },
      {
        stopName: "The Green Line",
        imageKeyword: "The Green Line Nicosia",
        description: [
          "Nicosia (Lefkosia) is the only divided capital city remaining in the world. A demilitarized \"Buffer Zone,\" patrolled by the United Nations, cuts directly through the historic center, separating the Greek Cypriot south from the Turkish Cypriot north.",
          "Walking down Ledra Street, a busy shopping avenue, you eventually hit a checkpoint. You can physically walk across the border, passing through the abandoned \"No Man's Land\" where buildings still bear the bullet holes from the conflict in 1974.",
          "It creates a unique cultural experience where you can eat Greek souvlaki on one side of the street, cross a checkpoint, and eat Turkish baklava on the other side within minutes, hearing two different languages and religions in one city."
        ],
        question: "What makes Nicosia unique among modern world capitals?",
        options: [
          "It is physically divided by a border/buffer zone.",
          "It is built entirely on water.",
          "It has no cars.",
          "It is located underground."
        ],
        answer: "It is physically divided by a border/buffer zone.",
        explanation: "It is the last divided capital on Earth, split between two distinct political entities."
      },
      {
        stopName: "Kykkos Monastery",
        imageKeyword: "Kykkos Monastery",
        description: [
          "Located high in the Troodos Mountains, this is the wealthiest and most lavish monastery on the island. The corridors are decorated with bright, modern mosaics made of gold and colorful stones that tell the history of the church.",
          "The monastery is world-famous for possessing a specific icon of the Virgin Mary. Orthodox tradition holds that this icon was painted by the Apostle Luke himself while Mary was still alive, making it a relic of immense spiritual value.",
          "The icon is considered so sacred that it is never shown completely uncovered. It is kept hidden behind a silver cover; it is said that anyone who looks directly at the painting faces the risk of being blinded."
        ],
        question: "Who is traditionally believed to have painted the sacred icon at Kykkos?",
        options: [
          "The Apostle Luke.",
          "Leonardo da Vinci.",
          "Saint Peter.",
          "Michelangelo."
        ],
        answer: "The Apostle Luke.",
        explanation: "Religious tradition says Luke the Evangelist painted the image of the Virgin Mary from life."
      },
      {
        stopName: "The Ghost Town of Varosha",
        imageKeyword: "The Ghost Town of Varosha",
        description: [
          "Before 1974, the Varosha district of Famagusta was the \"French Riviera of Cyprus,\" a glamorous tourist destination visited by stars like Elizabeth Taylor. When the Turkish invasion occurred, the entire population fled in fear, expecting to return in a few days.",
          "They never returned. For nearly 50 years, the city remained fenced off by the military, completely frozen in time. Car dealerships still had 1974 models in the windows, and tables were left set for dinner.",
          "Recently, parts of it have been opened to visitors. It offers a haunting, apocalyptic sight where nature is reclaiming luxury hotels, with trees growing through living room floors and golden beaches lined with skeleton buildings."
        ],
        question: "Why has Varosha been abandoned since 1974?",
        options: [
          "Residents fled during the invasion and were barred from returning.",
          "A nuclear accident occurred.",
          "It was destroyed by an earthquake.",
          "The sea level rose and flooded it."
        ],
        answer: "Residents fled during the invasion and were barred from returning.",
        explanation: "The area became a forbidden military zone after the conflict, leaving the city empty and decaying for decades."
      }
    ]
  },
  "Czechia": {
    tourTitle: "The Heart of Europe",
    introText: "Wander the fairytale streets of Prague’s Old Town. Drink the original golden lager in the land where it was invented.",
    stops: [
      {
        stopName: "Prague Castle",
        imageKeyword: "Prague Castle",
        description: [
          "Looming over the capital, this is the largest ancient castle complex in the world according to the Guinness Book of Records. It spans over 70,000 square meters and includes churches, gardens, and palaces representing every architectural style of the last millennium.",
          "It was the site of the famous \"Defenestration of Prague\" in 1618. During this event, angry Protestant nobles threw three Catholic officials out of a high window, an act that triggered the devastating Thirty Years' War in Europe.",
          "The Bohemian Crown Jewels are hidden inside a secret room within the castle's St. Vitus Cathedral. The door has seven locks, and the seven keys are held by seven different high-ranking officials, meaning they must all agree to meet to open it."
        ],
        question: "According to the Guinness Book of Records, what title does Prague Castle hold?",
        options: [
          "It is the largest ancient castle complex in the world.",
          "It is the oldest castle in Europe.",
          "It has the tallest tower.",
          "It is the most visited castle."
        ],
        answer: "It is the largest ancient castle complex in the world.",
        explanation: "It is not just a single building but a sprawling city-within-a-city covering 70,000 square meters."
      },
      {
        stopName: "Charles Bridge",
        imageKeyword: "Charles Bridge",
        description: [
          "Commissioned by King Charles IV in 1357, this gothic stone bridge connects the Old Town with the Lesser Town. It is lined with 30 baroque statues of saints, the most famous being St. John of Nepomuk, whom tourists touch for good luck.",
          "A popular legend claims that the medieval builders mixed raw egg yolks into the mortar to strengthen the stone blocks. While recent scientific analysis is mixed, the story persists that villages across the country sent cartloads of eggs to help build the bridge.",
          "For centuries, this was the only way to cross the Vltava River in Prague. It served as a vital trade connection between Eastern and Western Europe, making the city one of the wealthiest on the continent."
        ],
        question: "According to legend, what food ingredient was mixed into the bridge's mortar?",
        options: [
          "Egg yolks.",
          "Honey.",
          "Milk.",
          "Beer."
        ],
        answer: "Egg yolks.",
        explanation: "Builders believed adding eggs to the mortar would make the bridge stronger and more resistant to floods."
      },
      {
        stopName: "Sedlec Ossuary",
        imageKeyword: "Sedlec Ossuary",
        description: [
          "Located in the town of Kutná Hora, this small chapel is affectionately known as the \"Bone Church.\" The interior is decorated with the bleached skeletons of between 40,000 and 70,000 people, arranged artistically into pyramids and symbols.",
          "The centerpiece of the chapel is a massive chandelier hanging from the ceiling. It is constructed using at least one of every single bone found in the human body, serving as a spooky but beautiful piece of art.",
          "The decorations were created in 1870 by a local woodcarver named František Rint. He was hired to organize the massive piles of bones that had accumulated in the cemetery after centuries of plagues and wars."
        ],
        question: "The famous chandelier in the Ossuary contains what distinctive feature?",
        options: [
          "It contains at least one of every bone in the human body.",
          "It is made of pure silver.",
          "It holds 1,000 candles.",
          "It spins constantly."
        ],
        answer: "It contains at least one of every bone in the human body.",
        explanation: "The artist ensured that every bone type was represented in the construction of the light fixture."
      },
      {
        stopName: "Český Krumlov",
        imageKeyword: "Cesky Krumlov",
        description: [
          "This small town in South Bohemia looks like a miniature Prague that has been frozen in the Renaissance era. The historic center is squeezed inside a tight, horseshoe-shaped loop of the Vltava River, dominated by a massive castle on the cliff above.",
          "Uniquely, the castle moat is not filled with water but has been inhabited by brown bears since the 16th century. The Rosenborg family, who ruled the town, believed they were related to the Orsini (Bear) family of Italy and kept the animals as a symbol of their lineage.",
          "The town is also home to one of the world's best-preserved Baroque theaters. It still contains its original 18th-century stage machinery, props, and costumes, allowing modern audiences to see operas exactly as they were performed 300 years ago."
        ],
        question: "What animals have lived in the castle moat since the 16th century?",
        options: [
          "Brown bears.",
          "Crocodiles.",
          "Lions.",
          "Swans."
        ],
        answer: "Brown bears.",
        explanation: "The ruling family kept bears in the dry moat to honor their supposed family heritage."
      },
      {
        stopName: "Pilsner Urquell Brewery",
        imageKeyword: "Pilsner Urquell Brewery",
        description: [
          "In the city of Plzeň, a revolution in brewing took place in 1842 that changed the world of beer forever. This is where the world's first golden \"pilsner\" lager was created, replacing the dark, cloudy, and inconsistent beers of the past.",
          "The brewery produces the original Pilsner Urquell, the ancestor of most pale lagers consumed globally today. The secret to its taste is the incredibly soft local water and the spicy Saaz hops grown in the region.",
          "Visitors can tour the historic cellars carved deep into the sandstone rock. Here, the beer is still fermented in massive open wooden barrels using the traditional 19th-century method, allowing people to taste the unpasteurized beer exactly as it was when first invented."
        ],
        question: "What type of beer was invented at this brewery in 1842?",
        options: [
          "Pilsner (Pale Lager).",
          "Stout.",
          "IPA.",
          "Wheat Beer."
        ],
        answer: "Pilsner (Pale Lager).",
        explanation: "The brewery created the world's first clear, golden lager, which became the most popular style of beer on Earth."
      }
    ]
  }
};