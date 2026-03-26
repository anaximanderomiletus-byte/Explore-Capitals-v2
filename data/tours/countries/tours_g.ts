import { TourData } from "../../types";

export const toursG: Record<string, TourData> = {
  "Gabon": {
    tourTitle: "The Eden of Africa",
    introText: "Hippos surf in the ocean waves on the untouched beaches of Loango. Venture into a rainforest that covers nearly all the nation.",
    stops: [
      {
        stopName: "Loango National Park",
        imageKeyword: "Loango National Park",
        description: [
          "This park is famous for the nickname \"Africa's Last Eden\" because it is one of the only places on Earth where rainforest animals venture onto the beach. It is common to see elephants, buffaloes, and even gorillas walking on the white sand next to the Atlantic Ocean.",
          "The most famous sight is the \"surfing hippo.\" Hippos here have adapted to the coastal environment and frequently swim in the ocean waves to travel between river lagoons, a behavior seen almost nowhere else.",
          "The park is also a prime location for whale watching. Humpback whales migrate just off the coast, and their breaching can often be seen from the beach while elephants graze in the background."
        ],
        question: "What unique behavior are the hippos in Loango famous for?",
        options: [
          "Swimming in the ocean waves (surfing).",
          "Climbing trees.",
          "Hunting sharks.",
          "Migrating to the desert."
        ],
        answer: "Swimming in the ocean waves (surfing).",
        explanation: "Unlike most hippos that stay in freshwater, the population here regularly enters the sea."
      },
      {
        stopName: "The Ogooué River",
        imageKeyword: "The Ogooué River",
        description: [
          "Stretching for 1,200 kilometers, this is the principal river of Gabon. It drains nearly the entire country, acting as a massive aquatic highway that flows through some of the densest and least explored rainforests in the world.",
          "The river was made famous by the explorer Pierre Savorgnan de Brazza in the 19th century. He used it to penetrate the interior of Central Africa, proving it was a more practical route than the Congo River because it had fewer unnavigable rapids.",
          "It serves as a critical habitat for the Slender-snouted Crocodile. This rare, freshwater reptile is critically endangered but thrives here due to the remote nature of the river basin."
        ],
        question: "Why did explorer Pierre Savorgnan de Brazza prefer the Ogooué River over the Congo River?",
        options: [
          "It had fewer unnavigable rapids.",
          "It was shorter.",
          "It had no crocodiles.",
          "It flowed north."
        ],
        answer: "It had fewer unnavigable rapids.",
        explanation: "The Ogooué offered an easier path into the interior of Africa compared to the violent cataracts of the lower Congo."
      },
      {
        stopName: "Pongara National Park",
        imageKeyword: "Pongara National Park",
        description: [
          "Located on a peninsula just across the estuary from the capital city, Libreville, this park is a critical global nesting site for Leatherback Sea Turtles. These are the largest turtles in the world, capable of growing up to 2 meters long and weighing 700 kg.",
          "During the nesting season (November to April), thousands of these giants emerge from the sea. The park rangers patrol the beaches nightly to protect the eggs from poachers and monitor the hatchlings as they scurry to the ocean.",
          "The park is also dominated by mangrove forests. These tangled, saltwater-tolerant trees protect the coastline from erosion and serve as a nursery for fish and crabs that feed the local population."
        ],
        question: "Which giant marine animal uses Pongara beaches for nesting?",
        options: [
          "The Leatherback Sea Turtle.",
          "The Blue Whale.",
          "The Giant Squid.",
          "The Manatee."
        ],
        answer: "The Leatherback Sea Turtle.",
        explanation: "It is one of the most important breeding grounds in the world for this massive turtle species."
      },
      {
        stopName: "Lopé National Park",
        imageKeyword: "Lopé National Park",
        description: [
          "This UNESCO World Heritage site is a unique mix of dense rainforest and ancient savannahs created by the last Ice Age. It is the best place in the world to see Mandrills, the colorful primates that inspired the character \"Rafiki\" in The Lion King.",
          "Visitors can witness \"super-hordes\" of Mandrills here. Sometimes, groups of up to 1,350 individuals gather together to forage, creating the largest aggregation of primates ever recorded in the wild.",
          "The park is also rich in archaeology. Scattered across the savannah are ancient rock engravings (petroglyphs) dating back to the Stone Age and Iron Age, proving that humans have lived in this forest-savannah mosaic for 400,000 years."
        ],
        question: "What record-breaking primate gathering occurs in Lopé National Park?",
        options: [
          "Super-hordes of Mandrills.",
          "Families of Gorillas.",
          "Clans of Hyenas.",
          "Troops of Baboons."
        ],
        answer: "Super-hordes of Mandrills.",
        explanation: "It is the only place where over a thousand mandrills have been recorded traveling in a single group."
      },
      {
        stopName: "Kongou Falls",
        imageKeyword: "Kongou Falls",
        description: [
          "Located deep inside Ivindo National Park, these falls are often called the \"Niagara of Central Africa.\" They are not famous for a single drop, but for their immense width (3.2 kilometers) and the complexity of the countless streams cascading through the jungle islands.",
          "The falls are incredibly remote and difficult to reach, requiring a long journey by dugout canoe. This isolation has kept the surrounding forest pristine, protecting it from logging and development.",
          "The water is tea-colored due to tannins from the decaying rainforest vegetation. The mist from the falls creates a microclimate that supports rare plants and fish species found only in this specific stretch of the Ivindo River."
        ],
        question: "What gives the water at Kongou Falls its tea-colored appearance?",
        options: [
          "Tannins from decaying vegetation.",
          "Pollution from mines.",
          "Red clay soil.",
          "Volcanic ash."
        ],
        answer: "Tannins from decaying vegetation.",
        explanation: "Leaves and plant matter from the rainforest dissolve in the river, staining the water a dark, reddish-brown."
      }
    ]
  },
  "Gambia": {
    tourTitle: "The Smiling Coast",
    introText: "The river flows right down the middle of this narrow strip of land. Watch the colorful birds in a country completely surrounded by its neighbor.",
    stops: [
      {
        stopName: "The Gambia River",
        imageKeyword: "The Gambia River",
        description: [
          "This river is the defining feature of the nation, running the entire length of the country from east to west. The country is essentially just the riverbanks; at its widest point, The Gambia is only 48 kilometers (30 miles) wide, but the river stretches deep into the continent.",
          "It divides the country into the \"North Bank\" and the \"South Bank.\" Until the Senegambia Bridge opened in 2019, crossing the river meant waiting for hours or even days to catch an unreliable ferry, which kept the two halves of the nation isolated from each other.",
          "The river is teeming with wildlife, including hippos, crocodiles, and chimpanzees. The River Gambia National Park is home to the Chimpanzee Rehabilitation Project, where rescued primates live freely on islands known as \"Baboon Islands.\""
        ],
        question: "Which country surrounds The Gambia on three sides?",
        options: [
          "Senegal.",
          "Mali.",
          "Guinea-Bissau.",
          "Mauritania."
        ],
        answer: "Senegal.",
        explanation: "The Gambia is a narrow enclave embedded inside Senegal, with only its western coast touching the Atlantic Ocean."
      },
      {
        stopName: "Kunta Kinteh Island",
        imageKeyword: "Kunta Kinteh Island",
        description: [
          "Located in the middle of the river, this small island is a UNESCO World Heritage site and a somber reminder of the transatlantic slave trade. It was a holding station where captives were imprisoned before being forced onto ships bound for the Americas.",
          "It gained worldwide fame through Alex Haley's novel Roots and the subsequent TV series. The book traces the author's ancestry back to Kunta Kinteh, a man who was captured near this river and taken to America as a slave.",
          "The island is slowly disappearing due to erosion from the river. It is now only a fraction of its original size, and the ruins of the colonial fort are gradually crumbling into the water, threatening to wash away this important history."
        ],
        question: "Which famous novel brought global attention to this island's history?",
        options: [
          "Roots (by Alex Haley).",
          "Things Fall Apart.",
          "Heart of Darkness.",
          "The Color Purple."
        ],
        answer: "Roots (by Alex Haley).",
        explanation: "The book details the life of Kunta Kinteh, who was captured in this region."
      },
      {
        stopName: "Kachikally Crocodile Pool",
        imageKeyword: "Kachikally Crocodile Pool",
        description: [
          "Hidden in the town of Bakau, this sacred pool is home to dozens of Nile crocodiles. Unlike their wild cousins, these crocodiles are remarkably tame because they are well-fed by the dedicated caretakers who have looked after them for generations.",
          "Locals believe the water has healing powers, specifically for fertility. Women who are struggling to conceive come here to bathe in the water and pray to the spirit of the pool, believing it will grant them a child.",
          "Visitors are often shocked to find that they can get close enough to touch the crocodiles. Under the supervision of the guides, tourists can pet the backs of the resting reptiles, who are revered as totem animals rather than dangerous predators."
        ],
        question: "Why do local women traditionally visit the Kachikally Crocodile Pool?",
        options: [
          "To pray for fertility/pregnancy.",
          "To wash clothes.",
          "To collect drinking water.",
          "To feed the crocodiles."
        ],
        answer: "To pray for fertility/pregnancy.",
        explanation: "The spirit of the pool is believed to have the power to help women conceive children."
      },
      {
        stopName: "Wassu Stone Circles",
        imageKeyword: "Wassu Stone Circles",
        description: [
          "These ancient megaliths are part of the largest concentration of stone circles in the world. Dating back to between the 3rd century BC and the 16th century AD, these heavy laterite stones were carved and placed in perfect circles by an ancient society.",
          "They served as burial sites for kings and chiefs. Excavations have revealed human remains, pottery, and iron tools buried beneath the stones, suggesting a sophisticated culture that honored its dead with massive monuments.",
          "The stones glow a reddish-brown color against the green grass. According to local legend, the stones generate a strange energy; some visitors claim that placing small stones on top of the megaliths brings good luck or wards off curses."
        ],
        question: "What was the primary function of the Wassu Stone Circles?",
        options: [
          "They were burial sites.",
          "They were ancient clocks.",
          "They were market stalls.",
          "They were defensive walls."
        ],
        answer: "They were burial sites.",
        explanation: "The stones mark the graves of ancient rulers and important figures."
      },
      {
        stopName: "Tanji Fishing Village",
        imageKeyword: "Tanji Fishing Village",
        description: [
          "This is the busiest and most vibrant fishing center in the country. Every afternoon, hundreds of brightly painted wooden boats (pirogues) return from the sea, unloading shark, barracuda, and bonga fish onto the chaotic, sandy beach.",
          "The smell of the village is distinct and powerful. Directly behind the beach are dozens of smokehouses where fresh fish is smoked over wood fires to preserve it. This smoked fish is a staple of the Gambian diet and is exported across West Africa.",
          "The scene is a sensory explosion of color and sound. Seagulls swarm overhead, fishermen shout prices, and women carry massive buckets of fish on their heads, showcasing the energy of daily life on the Smiling Coast."
        ],
        question: "How is most of the fish at Tanji preserved for export?",
        options: [
          "By smoking.",
          "By freezing.",
          "By canning.",
          "By pickling."
        ],
        answer: "By smoking.",
        explanation: "The fish are cooked and dried in smokehouses to prevent them from spoiling in the tropical heat."
      }
    ]
  },
  "Georgia": {
    tourTitle: "The Cradle of Wine",
    introText: "Ancient watchtowers stand guard over the remote villages of Svaneti. Toast with wine made in clay jars buried in the fertile earth.",
    stops: [
      {
        stopName: "Ushguli",
        imageKeyword: "Ushguli",
        description: [
          "Located high in the Caucasus Mountains, this community claims to be one of the highest continuously inhabited settlements in Europe. The village is defined by its defensive stone towers, known as koshki, which were built between the 9th and 12th centuries.",
          "The towers were not just for military defense against invaders but also for protection during local blood feuds. If a family was threatened by a neighbor, they would retreat to the upper floors of their tower, pulling the ladder up with them to wait out the conflict.",
          "The region was so isolated for so long that it never fully adopted the feudal system that ruled the rest of the country. The Svans developed their own language and culture, preserving ancient rituals that mix Christianity with older pagan beliefs."
        ],
        question: "Why did families historically retreat into the upper floors of their towers?",
        options: [
          "To protect themselves during blood feuds.",
          "To escape floods.",
          "To store grain.",
          "To signal to other villages."
        ],
        answer: "To protect themselves during blood feuds.",
        explanation: "The towers served as safe houses during violent disputes between local families or clans."
      },
      {
        stopName: "Kakheti Wine Region",
        imageKeyword: "Kakheti Wine Region",
        description: [
          "Georgia is widely considered the birthplace of wine, with archaeological evidence of winemaking dating back 8,000 years. The traditional method uses massive clay vessels called qvevri, which are lined with beeswax and buried underground to keep the temperature stable.",
          "Unlike European methods where grape skins are removed, Georgian winemakers leave the skins, seeds, and stems in the juice during fermentation. This creates \"amber wine\" (or orange wine), which has a deep color and a richer, more tannic taste than standard white wines.",
          "Wine is the centerpiece of the Supra, a traditional Georgian feast. The table is led by a Tamada (toastmaster), who must propose a specific sequence of poetic toasts that all guests must drink to, often consuming liters of wine over several hours."
        ],
        question: "What is the traditional Georgian vessel used for fermenting wine called?",
        options: [
          "Qvevri.",
          "Amphora.",
          "Barrel.",
          "Tank."
        ],
        answer: "Qvevri.",
        explanation: "These are large, egg-shaped clay pots buried in the earth to ferment and store the wine."
      },
      {
        stopName: "Old Tbilisi",
        imageKeyword: "Old Tbilisi",
        description: [
          "The name \"Tbilisi\" derives from the old Georgian word for \"warm,\" referring to the natural hot sulfur springs that bubble up beneath the city. The Abanotubani district is famous for its brick-domed bathhouses where locals and visitors still go to scrub and soak.",
          "According to legend, the city was founded by King Vakhtang Gorgasali in the 5th century. He was hunting with his falcon when the bird caught a pheasant; both animals fell into a hot spring and were boiled alive. Impressed by the hot water, the King decided to build a city there.",
          "The architecture is a chaotic and beautiful mix of wooden balconies, Persian-style baths, and Soviet-era structures. It reflects the city's position as a major stop on the Silk Road, where Asian and European cultures collided for centuries."
        ],
        question: "What natural feature gave Tbilisi its name?",
        options: [
          "Hot sulfur springs.",
          "A warm river.",
          "A volcano.",
          "Sunny weather."
        ],
        answer: "Hot sulfur springs.",
        explanation: "The name comes from the word tbili (warm), referencing the thermal waters found in the area."
      },
      {
        stopName: "Gergeti Trinity Church",
        imageKeyword: "Gergeti Trinity Church",
        description: [
          "Perched on a steep hill at an elevation of 2,170 meters, this 14th-century church is the most iconic image of Georgia. It stands in isolation against the backdrop of Mount Kazbek, one of the highest and most dramatic peaks in the Caucasus.",
          "During times of danger, such as invasions by Persians or Mongols, the precious religious relics from the capital were brought here for safekeeping. The church's remote location and difficult terrain made it a secure vault for the nation's treasures.",
          "During the Soviet era, religious services were banned, but the church remained a popular tourist destination. The Soviets even built a cable car to reach it, but the locals felt it disrespected the sacred site and destroyed it shortly after it was finished."
        ],
        question: "Why were national relics brought to Gergeti Trinity Church during invasions?",
        options: [
          "Its remote location made it a safe hiding place.",
          "It was the largest church.",
          "It was heavily armed.",
          "It was surrounded by a moat."
        ],
        answer: "Its remote location made it a safe hiding place.",
        explanation: "The church was difficult to reach, making it an ideal vault to protect treasures from invading armies."
      },
      {
        stopName: "Vardzia",
        imageKeyword: "Vardzia",
        description: [
          "This massive cave monastery was carved into the side of Erusheti Mountain in the 12th century. It originally contained over 6,000 rooms spread across 13 levels, including a throne room, a church, and wine cellars, all hidden behind the rock face.",
          "It was built by Queen Tamar, the most powerful ruler in Georgian history, as a sanctuary against Mongol invaders. Originally, the city was completely hidden inside the mountain, accessible only by secret tunnels near the river.",
          "A massive earthquake in 1283 sheared off the front of the mountain, exposing the cave system to the outside world. Today, monks still live in a small section of the caves, keeping the religious tradition alive in the open-air ruins."
        ],
        question: "What natural disaster exposed the hidden cave city of Vardzia?",
        options: [
          "An earthquake.",
          "A landslide.",
          "A flood.",
          "A volcanic eruption."
        ],
        answer: "An earthquake.",
        explanation: "A quake in 1283 caused the outer wall of the mountain to collapse, revealing the secret tunnels and rooms."
      }
    ]
  },
  "Germany": {
    tourTitle: "The Land of Poets and Thinkers",
    introText: "Fairy tale castles rise above the dark forests of Bavaria. Wander through the cities filled with history and foaming beer.",
    stops: [
      {
        stopName: "Neuschwanstein Castle",
        imageKeyword: "Neuschwanstein Castle",
        description: [
          "This 19th-century palace is the ultimate real-life fairy tale castle. It famously served as the direct inspiration for Walt Disney's Sleeping Beauty Castle, which is why its silhouette feels so familiar to people all over the world.",
          "It was built by King Ludwig II of Bavaria, also known as \"The Mad King.\" He was a recluse who built the castle not for military defense, but as a private fantasy retreat and a massive architectural homage to the operas of his friend, Richard Wagner.",
          "Despite its medieval appearance, the castle was filled with modern technology for the time. It had running water on every floor, a central heating system, and even a telephone line, combining old-world romance with 19th-century comfort."
        ],
        question: "Neuschwanstein Castle served as the inspiration for which famous logo?",
        options: [
          "The Disney Castle.",
          "The Universal Studios Globe.",
          "The Paramount Mountain.",
          "The Warner Bros. Shield."
        ],
        answer: "The Disney Castle.",
        explanation: "Walt Disney used the castle's design as the model for his theme parks and movie logo."
      },
      {
        stopName: "The Berlin Wall",
        imageKeyword: "The Berlin Wall",
        description: [
          "For 28 years, this concrete barrier physically and ideologically divided the city of Berlin into East and West. It became the most potent symbol of the Cold War, stopping citizens of the communist East from fleeing to the democratic West.",
          "The East Side Gallery is the longest remaining section of the wall. After the border fell in 1989, artists from all over the world descended on the site to paint murals on the \"death strip\" side, transforming a symbol of oppression into an open-air art gallery.",
          "One of the most famous murals depicts the \"Fraternal Kiss\" between Soviet leader Leonid Brezhnev and East German leader Erich Honecker. It mocks the political intimacy between the two regimes that kept the wall standing for so long."
        ],
        question: "What is the \"East Side Gallery\"?",
        options: [
          "A painted section of the Berlin Wall.",
          "A famous art museum in Munich.",
          "An underground Cold War bunker.",
          "A sculpture park in central Berlin."
        ],
        answer: "A painted section of the Berlin Wall.",
        explanation: "It is a 1.3km stretch of the wall that was preserved and painted by international artists after 1989."
      },
      {
        stopName: "Cologne Cathedral",
        imageKeyword: "Cologne Cathedral",
        description: [
          "This Gothic masterpiece is the most visited landmark in Germany. Construction began in 1248 but was halted for centuries, leaving the cathedral unfinished with a crane on top of it for 400 years until it was finally completed in 1880.",
          "It is famous for its miraculous survival during World War II. While the rest of Cologne was flattened by Allied bombings, the cathedral remained standing despite taking 14 direct hits. The twin spires were used as an easily recognizable navigational landmark by pilots, which likely saved them from total destruction.",
          "Inside, a golden sarcophagus behind the altar is said to hold the bones of the Three Wise Men (the Magi). These relics made Cologne one of the most important pilgrimage sites in Europe during the Middle Ages."
        ],
        question: "Why did Allied pilots avoid destroying the Cologne Cathedral during WWII?",
        options: [
          "They used it as a navigational landmark.",
          "It was protected by anti-aircraft guns.",
          "It was camouflaged as a factory.",
          "They had orders to preserve churches."
        ],
        answer: "They used it as a navigational landmark.",
        explanation: "The distinct twin spires helped pilots figure out their location, so they avoided leveling the structure."
      },
      {
        stopName: "Oktoberfest",
        imageKeyword: "Oktoberfest",
        description: [
          "Held annually in Munich, this is the world's largest folk festival. Despite the name, the majority of the 16-day festival actually takes place in late September, ending on the first weekend of October to take advantage of warmer weather.",
          "It originated in 1810 not as a beer festival, but as a wedding reception. The citizens of Munich were invited to the fields in front of the city gates to celebrate the marriage of Crown Prince Ludwig to Princess Therese, and they enjoyed it so much they repeated it every year.",
          "The beer served here is special \"Oktoberfestbier,\" which must be brewed within the city limits of Munich. It is served in one-liter glass mugs called Maß, and seasoned waitresses can carry up to 10 or 12 of these heavy, full mugs at a single time."
        ],
        question: "What event did the original Oktoberfest in 1810 celebrate?",
        options: [
          "A royal wedding.",
          "The end of a war.",
          "A successful harvest.",
          "The crowning of a king."
        ],
        answer: "A royal wedding.",
        explanation: "It began as a public celebration for the marriage of the Bavarian Crown Prince."
      },
      {
        stopName: "The Black Forest",
        imageKeyword: "The Black Forest",
        description: [
          "This mountainous region in southwest Germany is famous for its dense, evergreen canopy that blocks out most of the sunlight, giving the forest its \"black\" name. The eerie, dark woods are the setting for many of the Brothers Grimm fairy tales, such as Hansel and Gretel.",
          "It is the birthplace of the cuckoo clock. Woodcarvers in the region have been crafting these intricate timepieces since the 1700s, using local timber to create the mechanical birds that announce the hour.",
          "The region is also the home of the Black Forest Gateau (Schwarzwälder Kirschtorte). Authentic versions of this chocolate and cream cake must contain Kirschwasser, a clear spirit made from the tart cherries that grow in the local valleys."
        ],
        question: "Which famous collection of stories is associated with the Black Forest?",
        options: [
          "The Brothers Grimm fairy tales.",
          "The Chronicles of Narnia.",
          "The Sherlock Holmes mysteries.",
          "The Lord of the Rings trilogy."
        ],
        answer: "The Brothers Grimm fairy tales.",
        explanation: "The dark, dense woods inspired stories like Little Red Riding Hood and Hansel and Gretel."
      }
    ]
  },
  "Ghana": {
    tourTitle: "The Gateway to Africa",
    introText: "The Cape Coast Castle stands as a powerful reminder of the Atlantic trade. Feel the rhythm of the highlife music in the bustling markets.",
    stops: [
      {
        stopName: "Cape Coast Castle",
        imageKeyword: "Cape Coast Castle",
        description: [
          "This massive fortress is one of the most significant monuments of the transatlantic slave trade. Originally built by the Swedes and later captured by the British, it served as the final holding place for enslaved Africans before they were shipped to the Americas.",
          "The architecture tells a tale of two worlds. The upper levels were luxurious quarters for the governor and officers, offering beautiful ocean views, while the dungeons directly below were dark, cramped, and airless hellscapes where hundreds of people were packed together in squalor.",
          "The most emotional feature is the \"Door of No Return.\" Enslaved people walked through this small exit to board the ships, knowing they would never set foot on their homeland again; today, descendants of the diaspora return through the \"Door of Return\" on the other side."
        ],
        question: "What is the \"Door of No Return\"?",
        options: [
          "The exit through which enslaved people boarded ships to the Americas.",
          "The entrance to the king's palace.",
          "A prison gate.",
          "The border with Togo."
        ],
        answer: "The exit through which enslaved people boarded ships to the Americas.",
        explanation: "It symbolized the final departure from Africa, from which there was no coming back."
      },
      {
        stopName: "Kakum National Park",
        imageKeyword: "Kakum National Park",
        description: [
          "Located in the coastal rainforest, this park is famous for its canopy walkway. It is one of the only canopy walkway systems in Africa, consisting of seven swinging bridges suspended 40 meters (130 feet) above the forest floor.",
          "The walkway offers a unique perspective of the jungle usually reserved for birds and monkeys. While the forest floor is dark and dense, the canopy is bright and teeming with life, offering views of hornbills and parrots flying at eye level.",
          "The park is a sanctuary for the endangered forest elephant and the bongo antelope. Although the dense vegetation makes them hard to spot, the park protects a critical corridor of biodiversity in a region that has lost much of its original forest."
        ],
        question: "Kakum National Park is famous for having one of Africa's few examples of what structure?",
        options: [
          "A canopy walkway.",
          "A glass pyramid.",
          "An underwater hotel.",
          "A ski resort."
        ],
        answer: "A canopy walkway.",
        explanation: "A system of rope bridges allows visitors to walk through the treetops rather than on the ground."
      },
      {
        stopName: "Manhyia Palace",
        imageKeyword: "Manhyia Palace",
        description: [
          "This is the seat of the Asantehene, the king of the Ashanti Empire. The Ashanti people were a powerful military nation that controlled the gold trade and fiercely resisted British colonization in a series of wars during the 19th century.",
          "The soul of the nation is the \"Golden Stool.\" Legend says it was summoned from the sky by a high priest and landed on the lap of the first king. It is considered so sacred that not even the king is allowed to sit on it; it sits on its own throne next to him.",
          "The palace museum displays the immense wealth of the kingdom. It is filled with gold regalia, heavy jewelry, and the colorful Kente cloth that was originally worn only by royalty but has now become a symbol of African heritage worldwide."
        ],
        question: "What sacred object represents the soul of the Ashanti Kingdom?",
        options: [
          "The Golden Stool.",
          "The Silver Spear.",
          "The Bronze Crown.",
          "The Emerald Ring."
        ],
        answer: "The Golden Stool.",
        explanation: "It is the ultimate symbol of royal power and the unity of the people, believed to have fallen from the sky."
      },
      {
        stopName: "Lake Volta",
        imageKeyword: "Lake Volta",
        description: [
          "This massive body of water holds the record as the largest man-made lake in the world by surface area. It was created in the 1960s by the construction of the Akosombo Dam, which flooded 3.6% of Ghana's total land area.",
          "The lake covers what was once a dense forest. Thousands of hardwood trees were submerged when the water rose, and their dead, petrified trunks still poke out of the water, creating a ghostly and hazardous landscape for boats.",
          "The dam is the energetic heart of the country. It generates the hydroelectric power that supplies electricity to most of Ghana and even exports power to neighboring countries like Togo and Benin."
        ],
        question: "Lake Volta holds which world record?",
        options: [
          "Largest man-made lake by surface area.",
          "Deepest ocean trench.",
          "Widest river delta.",
          "Highest waterfall."
        ],
        answer: "Largest man-made lake by surface area.",
        explanation: "The flooding caused by the Akosombo Dam created a reservoir that covers more land area than any other artificial lake."
      },
      {
        stopName: "Black Star Square",
        imageKeyword: "Black Star Square",
        description: [
          "Located in the capital, Accra, this massive public square is dominated by the Black Star Gate. It was commissioned by Kwame Nkrumah to celebrate Ghana becoming the first sub-Saharan African nation to gain independence from colonial rule in 1957.",
          "The \"Black Star\" in the center of the flag and on the monument is a powerful symbol of African emancipation. It represents the lodestar of African freedom, guiding other nations on the continent toward their own independence.",
          "The square hosts the Flame of African Liberation. This eternal flame was lit by Nkrumah in 1961 and burns to honor the struggle for freedom across the entire African continent, not just within Ghana."
        ],
        question: "Ghana was the first country in sub-Saharan Africa to achieve what?",
        options: [
          "Independence from colonial rule.",
          "A gold medal in the Olympics.",
          "A space program.",
          "A nuclear power plant."
        ],
        answer: "Independence from colonial rule.",
        explanation: "In 1957, Ghana set the precedent for decolonization across the rest of the continent."
      }
    ]
  },
  "Greece": {
    tourTitle: "The Cradle of Civilization",
    introText: "The white marble columns of the Parthenon rise above the city of Athens. Sail across the deep blue waters to the sunny Cyclades islands.",
    stops: [
      {
        stopName: "The Acropolis",
        imageKeyword: "The Acropolis",
        description: [
          "This ancient citadel stands on a rocky outcrop above Athens and contains the remains of several ancient buildings, the most famous being the Parthenon. Built in the 5th century BC, it was dedicated to the goddess Athena, the patron of the city.",
          "The Parthenon is an architectural masterpiece of optical illusions. There are virtually no straight lines in the building; the columns bulge slightly in the middle and lean inward to correct the natural distortion of the human eye, making them appear perfectly straight.",
          "In 1687, the temple was severely damaged when a Venetian cannonball hit a stockpile of Ottoman gunpowder stored inside. The resulting explosion blew the roof off and destroyed many of the sculptures, leaving the ruin we see today."
        ],
        question: "Why do the columns of the Parthenon bulge and lean?",
        options: [
          "To create an optical illusion of straightness.",
          "Because of earthquake damage.",
          "The builders made a mistake.",
          "To hold more weight."
        ],
        answer: "To create an optical illusion of straightness.",
        explanation: "Architects designed the curves to counteract the way the human eye distorts long straight lines."
      },
      {
        stopName: "Santorini",
        imageKeyword: "Santorini",
        description: [
          "The crescent shape of this island is the result of one of the largest volcanic eruptions in recorded history. The Minoan Eruption (around 1600 BC) caused the center of the island to collapse into the sea, creating a massive caldera (cauldron) filled with water.",
          "Many historians believe this cataclysmic event inspired the legend of Atlantis. The destruction of the sophisticated Minoan settlement on the island matches Plato's description of an advanced civilization sinking into the ocean in a single day and night.",
          "The island is famous for its unique agriculture, specifically its wine. Because of the strong winds, grapes are not grown on trellises but are woven into basket shapes low to the ground to protect the fruit from blowing away."
        ],
        question: "What geological event gave Santorini its crescent shape?",
        options: [
          "A massive volcanic eruption (and collapse).",
          "A meteor impact.",
          "Rising sea levels.",
          "Tectonic plate collision."
        ],
        answer: "A massive volcanic eruption (and collapse).",
        explanation: "The center of the volcano collapsed into the sea, leaving only the outer rim of the island."
      },
      {
        stopName: "Meteora",
        imageKeyword: "Meteora",
        description: [
          "The name \"Meteora\" translates to \"suspended in the air,\" a perfect description for these Eastern Orthodox monasteries built on top of immense natural sandstone pillars. They rise hundreds of meters into the sky, dominating the valley below.",
          "For centuries, the only way to reach these retreats was by climbing removable ladders or being hauled up in a net attached to a rope. The monks believed that the difficult access protected them from political turmoil and brought them closer to God.",
          "The rock pillars were formed about 60 million years ago. They are a mixture of sandstone and conglomerate that was originally a riverbed, later pushed up by earthquakes and eroded by wind and rain into vertical towers."
        ],
        question: "How did monks traditionally access the monasteries of Meteora?",
        options: [
          "By ladders or nets on ropes.",
          "By stone stairs.",
          "By cable cars.",
          "By flying machines."
        ],
        answer: "By ladders or nets on ropes.",
        explanation: "There were no stairs originally; monks had to be hoisted up the sheer cliffs."
      },
      {
        stopName: "Delphi",
        imageKeyword: "Delphi",
        description: [
          "In ancient times, this site was considered the \"Omphalos,\" or the center (navel) of the world. According to myth, Zeus released two eagles from opposite ends of the earth, and they crossed paths right over Delphi.",
          "It was the home of the famous Oracle of Delphi, a high priestess known as the Pythia. Pilgrims and kings traveled from all over the known world to ask her questions about the future, wars, and politics.",
          "Scientists believe the priestess's trance-like state was caused by ethylene gas. Geological fault lines beneath the temple likely released sweet-smelling hallucinogenic gases from the earth, which the Pythia inhaled before delivering her prophecies."
        ],
        question: "What did the ancient Greeks consider Delphi to be?",
        options: [
          "The center (navel) of the world.",
          "The home of Zeus.",
          "The entrance to the underworld.",
          "The birthplace of Hercules."
        ],
        answer: "The center (navel) of the world.",
        explanation: "It was the spiritual center of the Greek world, marked by the Omphalos stone."
      },
      {
        stopName: "Knossos",
        imageKeyword: "Knossos",
        description: [
          "This is the largest Bronze Age archaeological site on Crete and the ceremonial center of the Minoan civilization. It is considered Europe's oldest city, with the first paved roads and flushing toilets on the continent.",
          "The palace layout is so complex, with over 1,300 interlocking rooms, that it is associated with the legend of the Labyrinth. Mythology says King Minos built a maze here to hold the Minotaur, a monster that was half-man and half-bull.",
          "The Minoans were famous for \"Bull-Leaping.\" Frescoes found on the walls depict young men and women grabbing the horns of charging bulls and somersaulting over their backs, a dangerous ritual that was likely a sport or religious ceremony."
        ],
        question: "Which mythical monster was said to live in the Labyrinth at Knossos?",
        options: [
          "The Minotaur.",
          "The Hydra.",
          "The Cyclops.",
          "The Chimera."
        ],
        answer: "The Minotaur.",
        explanation: "The complex layout of the palace inspired the myth of the half-man, half-bull trapped in a maze."
      }
    ]
  },
  "Grenada": {
    tourTitle: "The Spice Isle",
    introText: "The scent of nutmeg hangs heavy in the air of the Spice Isle. Dive into the world's first underwater sculpture park off the coast.",
    stops: [
      {
        stopName: "Molinere Underwater Sculpture Park",
        imageKeyword: "Molinere Underwater Sculpture Park",
        description: [
          "Located in the Molinere Beauséjour Marine Protected Area, this was the world's first underwater sculpture park. Created by artist Jason deCaires Taylor, it features life-size concrete figures cast from local people.",
          "The art serves a dual purpose as artificial reefs. The statues are made from pH-neutral cement that attracts coral larvae, eventually transforming the grey figures into colorful, living reef systems teeming with fish.",
          "The most famous piece is \"Vicissitudes,\" a ring of children holding hands. While often interpreted as a tribute to enslaved people thrown overboard during the Middle Passage, the artist also intended it to symbolize the unity and resilience of the local community."
        ],
        question: "What is the ecological purpose of the underwater statues?",
        options: [
          "To serve as artificial reefs.",
          "To hide treasure.",
          "To mark a shipwreck.",
          "To stop sharks."
        ],
        answer: "To serve as artificial reefs.",
        explanation: "The statues provide a surface for coral to grow, helping to restore the marine ecosystem."
      },
      {
        stopName: "Gouyave Nutmeg Processing Station",
        imageKeyword: "Gouyave Nutmeg Processing Station",
        description: [
          "Grenada is the second-largest producer of nutmeg in the world (after Indonesia), earning it the nickname \"The Spice Isle.\" The nutmeg fruit is so important to the national identity that it is featured on the country's flag.",
          "Visitors can watch workers sort the spices by hand. The nutmeg seed is wrapped in a bright red, lacy covering called mace, which is also a valuable spice. One fruit produces two different spices: nutmeg (the seed) and mace (the covering).",
          "The industry was devastated by Hurricane Ivan in 2004. The storm destroyed nearly 90% of the island's nutmeg trees. Since nutmeg trees take nearly a decade to bear fruit, the industry is still in the long process of recovery."
        ],
        question: "Which two spices are derived from the single nutmeg fruit?",
        options: [
          "Nutmeg and Mace.",
          "Cinnamon and Clove.",
          "Ginger and Turmeric.",
          "Salt and Pepper."
        ],
        answer: "Nutmeg and Mace.",
        explanation: "Nutmeg is the inner seed, while mace is the red, lacy webbing that surrounds the shell."
      },
      {
        stopName: "Grand Etang National Park",
        imageKeyword: "Grand Etang National Park",
        description: [
          "The centerpiece of this park is Grand Etang Lake, which fills the crater of an extinct volcano at an elevation of 530 meters. The lake is surrounded by cloud forest and is rumored by locals to be bottomless, though it is actually about 20 feet deep.",
          "The forest is home to the Mona monkey. These primates are not native to the Caribbean; they were brought over from West Africa on slave ships in the 18th century and escaped into the wild, where they have thrived ever since.",
          "The vegetation includes the immense Mahogany trees and the \"Gommier\" tree. The Gommier produces a white sap that smells like incense and is flammable, historically used by indigenous people to start fires and make canoe torches."
        ],
        question: "How did Mona monkeys arrive in Grenada?",
        options: [
          "They were brought on ships from West Africa.",
          "They swam from South America.",
          "They are native to the island.",
          "They arrived on floating logs."
        ],
        answer: "They were brought on ships from West Africa.",
        explanation: "They are an introduced species that arrived during the colonial era and established a wild population."
      },
      {
        stopName: "The Carenage",
        imageKeyword: "The Carenage",
        description: [
          "The capital, St. George's, is widely considered the prettiest harbor town in the Caribbean. The waterfront, known as the Carenage, is a perfect horseshoe shape where fishing boats and luxury yachts dock side-by-side.",
          "The buildings are distinct for their red clay roof tiles and brick walls. In the 1700s, massive fires destroyed the original wooden town, so laws were passed requiring all future buildings to be constructed from brick and stone to prevent burning.",
          "A tunnel connects the harbor to the other side of the town. The Sendall Tunnel was built in 1894 and is so narrow that cars must share the single lane with pedestrians, cutting directly through the solid rock ridge that divides the city."
        ],
        question: "Why are the historic buildings in St. George's made of brick and stone?",
        options: [
          "To prevent fires.",
          "To stay cool.",
          "Because wood was expensive.",
          "To look like Europe."
        ],
        answer: "To prevent fires.",
        explanation: "After wooden buildings were destroyed by major fires, new laws required fire-resistant construction materials."
      },
      {
        stopName: "Belmont Estate",
        imageKeyword: "Belmont Estate",
        description: [
          "This 17th-century plantation offers a glimpse into the island's agricultural history. It has transitioned from a sugar plantation working on enslaved labor to a cooperative producing high-quality organic chocolate.",
          "Visitors can witness the traditional \"dancing of the cocoa.\" Workers polish the dried cocoa beans by climbing into large copper pots and dancing on top of the beans with their bare feet to remove the dusty outer layer and enhance the flavor.",
          "Grenada's chocolate is unique because it is \"tree-to-bar.\" Unlike most countries that export raw beans to be processed in Europe, Grenada grows, ferments, roasts, and manufactures the chocolate entirely on the island."
        ],
        question: "What is the purpose of \"dancing the cocoa\"?",
        options: [
          "To polish the beans.",
          "To crush the beans.",
          "To pray for rain.",
          "To celebrate the harvest."
        ],
        answer: "To polish the beans.",
        explanation: "The friction from the dancing feet removes the residue and polishes the beans."
      }
    ]
  },
  "Guatemala": {
    tourTitle: "The Heart of the Maya",
    introText: "The temples of Tikal tower over the canopy of the northern jungle. Gaze across the volcanic lake that Huxley called the most beautiful.",
    stops: [
      {
        stopName: "Tikal National Park",
        imageKeyword: "Tikal National Park",
        description: [
          "This was one of the largest and most powerful cities of the ancient Maya civilization. At its peak around 750 AD, it covered over 16 square kilometers and supported a population of up to 90,000 people before being mysteriously abandoned in the 10th century.",
          "The most iconic structure is Temple IV, the tallest pre-Columbian structure in the Americas still standing (65 meters). Visitors can climb wooden stairs to the top for a view where only the combs of the other temples poke through the endless sea of green jungle.",
          "The view from Temple IV was used as a filming location for Star Wars: A New Hope. It served as the Rebel base on the jungle moon of Yavin 4, making the ancient Maya city a part of sci-fi history."
        ],
        question: "Which movie franchise filmed scenes at the ruins of Tikal?",
        options: [
          "Star Wars.",
          "Indiana Jones.",
          "Jurassic Park.",
          "The Mummy."
        ],
        answer: "Star Wars.",
        explanation: "The view from the temples was used to depict the jungle moon of Yavin 4."
      },
      {
        stopName: "Lake Atitlán",
        imageKeyword: "Lake Atitlán",
        description: [
          "Author Aldous Huxley famously called this \"the most beautiful lake in the world.\" It fills a massive caldera formed by a super-volcano eruption 84,000 years ago and is ringed by three dormant volcanoes: Atitlán, Tolimán, and San Pedro.",
          "It is the deepest lake in Central America, plunging down at least 340 meters (1,120 feet). The bottom has never been fully mapped, and local Mayan legends speak of a sunken city, Samabaj, which was actually discovered by divers in the 1990s.",
          "The shores are dotted with villages inhabited by the Tz'utujil and Kaqchikel Maya. Each village has its own distinct style of traditional clothing (traje), allowing locals to identify which town someone is from just by looking at the patterns on their woven shirts."
        ],
        question: "Lake Atitlán fills a caldera formed by what event?",
        options: [
          "A super-volcano eruption.",
          "A meteor strike.",
          "A massive earthquake.",
          "Glacial erosion."
        ],
        answer: "A super-volcano eruption.",
        explanation: "A massive explosion blew the top off the mountain, creating the basin that is now the lake."
      },
      {
        stopName: "Antigua Guatemala",
        imageKeyword: "Antigua Guatemala",
        description: [
          "Antigua was the colonial capital of Central America for over 200 years. It was one of the most beautiful cities in the Spanish Empire until the Santa Marta earthquakes of 1773 destroyed much of it, forcing the Spanish to move the capital to modern-day Guatemala City.",
          "The city is famous for its \"Barroco antigüeño\" architecture—low, thick buildings designed to withstand tremors. Today, it is a romantic mix of restored pastel homes and ruined 18th-century churches with roofs missing but walls still standing.",
          "The iconic Santa Catalina Arch was originally a bridge. It was built to allow nuns from the convent on one side of the street to cross to the school on the other side without being seen by the public, preserving their vow of seclusion."
        ],
        question: "Why was the capital moved from Antigua to Guatemala City in the 1770s?",
        options: [
          "Massive earthquakes destroyed the city.",
          "A volcanic eruption buried it.",
          "It was captured by pirates.",
          "A plague outbreak."
        ],
        answer: "Massive earthquakes destroyed the city.",
        explanation: "The damage was so severe that the authorities decided to relocate the capital to a safer location."
      },
      {
        stopName: "Semuc Champey",
        imageKeyword: "Semuc Champey",
        description: [
          "The name means \"Where the river hides under the stones.\" It is a natural limestone bridge, 300 meters long, that sits on top of the raging Cahabón River.",
          "While the dangerous river thunders through a tunnel underneath the bridge, the water on top is fed by gentle mountain springs. This creates a series of calm, crystal-clear turquoise pools that are perfect for swimming.",
          "Getting there is an adventure in itself, often requiring a bumpy ride in the back of a 4x4 pickup truck through the jungle. The isolation has kept the site relatively pristine compared to other major tourist attractions."
        ],
        question: "What is flowing underneath the calm pools of Semuc Champey?",
        options: [
          "A raging river (The Cahabón River).",
          "A lava tube.",
          "An underground city.",
          "Nothing, it is solid rock."
        ],
        answer: "A raging river (The Cahabón River).",
        explanation: "The pools sit on a natural limestone land bridge that covers the powerful river below."
      },
      {
        stopName: "Chichicastenango Market",
        imageKeyword: "Chichicastenango Market",
        description: [
          "Held every Thursday and Sunday, this is the largest and most vibrant indigenous market in Central America. Vendors from all over the highlands gather here to sell fruit, vegetables, pottery, and intricate hand-woven textiles.",
          "The market steps lead up to the Church of St. Thomas. This 400-year-old church is a unique example of religious syncretism, where Catholic rituals blend with ancient Mayan traditions.",
          "Indigenous priests use the church steps to burn pom (copal incense) and offer prayers to the Mayan ancestors, while inside, Catholic mass is held. The church was built atop a pre-Columbian temple platform, physically layering the two religions."
        ],
        question: "The Church of St. Thomas is famous for blending which two religious traditions?",
        options: [
          "Catholicism and Mayan spirituality.",
          "Christianity and Islam.",
          "Buddhism and Hinduism.",
          "Judaism and Paganism."
        ],
        answer: "Catholicism and Mayan spirituality.",
        explanation: "The site is used for both Catholic mass and traditional Mayan rituals involving incense and ancestor worship."
      }
    ]
  },
  "Guinea": {
    tourTitle: "The Water Tower of West Africa",
    introText: "The Fouta Djallon highlands act as the water tower for West Africa. Trek through the lush green valleys of this resource-rich land.",
    stops: [
      {
        stopName: "Mount Nimba Strict Nature Reserve",
        imageKeyword: "Mount Nimba Strict Nature Reserve",
        description: [
          "Rising above the surrounding savannah, this UNESCO World Heritage site is shared between Guinea and Côte d'Ivoire. It acts as a \"sky island\" because its isolation has allowed unique species to evolve here that exist nowhere else on the planet.",
          "It is the only home of the Nimba Toad, a rare amphibian that does not lay eggs. Unlike almost all other toads, the female gives birth to fully developed, tiny live toads after a gestation period of nine months.",
          "The mountain is incredibly rich in high-quality iron ore, which poses a constant threat to its existence. While the reserve is strictly protected, mining interests constantly push to extract the metal from the surrounding slopes, placing the ecosystem on the \"List of World Heritage in Danger.\""
        ],
        question: "How does the Nimba Toad differ from most other amphibians?",
        options: [
          "It gives birth to live young instead of laying eggs.",
          "It has no legs.",
          "It is poisonous.",
          "It lives in trees."
        ],
        answer: "It gives birth to live young instead of laying eggs.",
        explanation: "It is viviparous, meaning the embryos develop inside the mother rather than in water."
      },
      {
        stopName: "Fouta Djallon Highlands",
        imageKeyword: "Fouta Djallon Highlands",
        description: [
          "This mountainous region in the center of the country is known as the \"Water Tower of West Africa.\" The heavy rainfall here feeds the headwaters of the region's most important rivers, including the Niger, the Senegal, and the Gambia.",
          "The climate is noticeably cooler than the humid coast. The rolling grasslands, pine forests, and mild temperatures have drawn comparisons to the landscapes of Switzerland or Scotland, offering great hiking conditions.",
          "It is the cultural heartland of the Fula (Peul) people. The architecture here traditionally consists of round mud huts with thatched roofs grouped into family compounds, often surrounded by herds of cattle which are central to the Fula way of life."
        ],
        question: "Why is the Fouta Djallon called the \"Water Tower of West Africa\"?",
        options: [
          "It is the source of the region's major rivers.",
          "It has the tallest water towers.",
          "It floods every year.",
          "It stores water in tanks."
        ],
        answer: "It is the source of the region's major rivers.",
        explanation: "Rivers like the Niger, Senegal, and Gambia all originate from the rainwater collected in these highlands."
      },
      {
        stopName: "Conakry Grand Mosque",
        imageKeyword: "Conakry Grand Mosque",
        description: [
          "Situated in the capital city, this is the largest mosque in Sub-Saharan Africa. Funded by King Fahd of Saudi Arabia, it was opened in 1982 and can accommodate 12,500 worshippers in the main hall and another 12,500 in the courtyard.",
          "The grounds contain the Camayanne Mausoleum, the final resting place of national heroes. This includes Samori Ture, the pre-colonial emperor who fought the French, and Ahmed Sékou Touré, the first president of independent Guinea.",
          "Its architecture is simple but imposing. The four tall, green-tiled minarets dominate the skyline of Conakry, serving as a major landmark in a city that is otherwise known for its chaotic traffic and bustling markets."
        ],
        question: "Who funded the construction of the Conakry Grand Mosque?",
        options: [
          "King Fahd of Saudi Arabia.",
          "The President of France.",
          "The King of Morocco.",
          "The United Nations."
        ],
        answer: "King Fahd of Saudi Arabia.",
        explanation: "The mosque was a gift from the Saudi monarch to the people of Guinea."
      },
      {
        stopName: "The Iles de Los",
        imageKeyword: "The Iles de Los",
        description: [
          "Located just a short boat ride from Conakry, this group of islands is named \"Ilhas dos Ídolos\" (Islands of Idols) by early Portuguese explorers. They noticed the locals worshipping fetish statues on the beaches and gave the archipelago its name, which later evolved into \"Los.\"",
          "The island of Fotoba was once a notorious colonial prison. Known as the \"Alcatraz of Guinea,\" the British and later the French used it to imprison political dissidents and kings who resisted colonization.",
          "Today, the islands are a popular weekend escape. The calm beaches offer a break from the noise of the capital, though the landscape is scarred by old bauxite mines, highlighting the country's reliance on mineral exports."
        ],
        question: "What does the original Portuguese name \"Ilhas dos Ídolos\" mean?",
        options: [
          "Islands of Idols.",
          "Islands of Gold.",
          "Lost Islands.",
          "Green Islands."
        ],
        answer: "Islands of Idols.",
        explanation: "Explorers named them after the religious statues they saw the indigenous people worshipping."
      },
      {
        stopName: "Bridal Veil Falls",
        imageKeyword: "Bridal Veil Falls",
        description: [
          "Located near the town of Kindia, this waterfall is named for its delicate appearance. The water falls from a great height (approx 80 meters) and hits the rocks in such a way that it sprays outward, creating a white mist that resembles a lace wedding veil.",
          "The surrounding area is a grove of tall teak trees. The shade and the mist from the falls create a cool microclimate that is a popular picnic spot for locals escaping the heat.",
          "Local legends say the falls are inhabited by spirits. It is considered a place of purity, and historically, ceremonies were performed here to ask the spirits for blessings or good fortune."
        ],
        question: "Why is the waterfall called \"Bridal Veil\"?",
        options: [
          "The spray looks like a white lace veil.",
          "A bride fell there.",
          "Weddings are held there.",
          "The water is white like milk."
        ],
        answer: "The spray looks like a white lace veil.",
        explanation: "The water disperses into a fine mist as it falls, mimicking the fabric of a wedding veil."
      }
    ]
  },
  "Guinea-Bissau": {
    tourTitle: "The Archipelago of the Ancestors",
    introText: "Saltwater hippos swim between the islands of the remote Bijagós Archipelago. Experience the vibrant masks and dancing of the annual carnival.",
    stops: [
      {
        stopName: "Bijagós Archipelago",
        imageKeyword: "Bijagós Archipelago",
        description: [
          "This UNESCO Biosphere Reserve consists of 88 islands, but only about 20 are permanently inhabited. It is one of the few places in the world where you can see saltwater hippos, who have adapted to island life and swim from island to island in the Atlantic Ocean to find fresh grazing.",
          "The islands are home to the Bijago people, who operate under a semi-matriarchal society. In traditional Bijago culture, women choose their husbands, build the houses, and manage the law, while men manage the spiritual rituals.",
          "Because the islands are so remote and considered sacred by the locals, they have remained incredibly pristine. Large areas are off-limits to development, allowing sea turtles and manatees to thrive without human interference."
        ],
        question: "What unique animal behavior can be seen in the waters of Orango Island?",
        options: [
          "Hippos swimming in the ocean.",
          "Lions hunting seals.",
          "Elephants surfing.",
          "Flying fish."
        ],
        answer: "Hippos swimming in the ocean.",
        explanation: "The local hippo population has adapted to the marine environment."
      },
      {
        stopName: "Bolama",
        imageKeyword: "Bolama",
        description: [
          "Once the capital of Portuguese Guinea, Bolama is now a crumbling ghost town reclaimed by the jungle. When the capital was moved to Bissau in 1941, the grand colonial mansions, administrative buildings, and wide avenues were largely abandoned.",
          "It looks like a movie set of a lost civilization. Massive Greek-style columns and porticos stand roofless in the thick vegetation, while goats graze in what were once the ballrooms of the colonial elite.",
          "Despite the decay, thousands of giant fruit bats roost in the trees of the old governor’s palace during the day. At sunset, the sky fills with them as they fly out to feed, adding to the eerie atmosphere."
        ],
        question: "What happened to Bolama in 1941 that caused its decline?",
        options: [
          "The capital city was moved to Bissau.",
          "It was destroyed by an earthquake.",
          "The gold mines ran out.",
          "A plague struck the city."
        ],
        answer: "The capital city was moved to Bissau.",
        explanation: "The administrative center relocated, leaving the grand buildings of Bolama to fall into ruin."
      },
      {
        stopName: "Bissau Carnival",
        imageKeyword: "Bissau Carnival",
        description: [
          "This is the biggest cultural event in the country, blending Portuguese Catholic traditions with local animist beliefs. Unlike the feather-covered carnivals of Brazil, the Bissau carnival is famous for its terrifying and beautiful masks made of papier-mâché.",
          "The masks often represent sacred animals like sharks, hippos, or bulls. The dancers mimic the movements of these animals, stomping up dust in a rhythmic frenzy that represents the spirits of the wild.",
          "It serves as a unifying event for the country's many ethnic groups. People from the Pepel, Manjaco, and Bijago tribes all travel to the capital to compete, using the festival to showcase their specific tribal heritage through dance."
        ],
        question: "What material are the traditional carnival masks of Bissau typically made from?",
        options: [
          "Papier-mâché.",
          "Solid gold.",
          "Carved wood.",
          "Plastic."
        ],
        answer: "Papier-mâché.",
        explanation: "Artists sculpt intricate animal heads using paper and glue."
      },
      {
        stopName: "Cantanhez Forest National Park",
        imageKeyword: "Cantanhez Forest National Park",
        description: [
          "Located in the south near the border with Guinea, this park protects the last remnants of the primary sub-humid forest in the country. It is essentially a collection of forest islands surrounded by farmland.",
          "It is a crucial refuge for chimpanzees. Because the local people believe that chimpanzees are reincarnated humans or ancestors, they do not hunt them, allowing the primates to live in relative safety close to human villages.",
          "The forest contains massive Kapok trees that tower over the canopy. These trees are often considered sacred shrines, and you can sometimes see pieces of cloth tied to the roots as offerings to the spirits."
        ],
        question: "Why do the locals in Cantanhez traditionally refuse to hunt chimpanzees?",
        options: [
          "They believe chimpanzees are reincarnated humans/ancestors.",
          "Chimpanzees taste bad.",
          "The government pays them not to.",
          "They are afraid of them."
        ],
        answer: "They believe chimpanzees are reincarnated humans/ancestors.",
        explanation: "This cultural taboo has acted as a natural conservation method for the primates."
      },
      {
        stopName: "Varela Beach",
        imageKeyword: "Varela Beach",
        description: [
          "Often cited as the most beautiful beach in the country, Varela offers a stunning contrast of colors. High cliffs made of red earth drop down onto pristine white sands, all framed by a thick green pine forest.",
          "The area is so isolated that you are likely to be the only person there. The \"road\" to get there is a punishing, bumpy track that discourages most tourists, preserving the beach as a quiet sanctuary.",
          "Cows often wander out of the forest to sleep on the sand. It is a common sight to share the sunset view with a herd of cattle resting near the surf."
        ],
        question: "What defines the landscape behind the white sands of Varela?",
        options: [
          "Red cliffs and pine forests.",
          "Skyscrapers.",
          "A large volcano.",
          "Mangrove swamps."
        ],
        answer: "Red cliffs and pine forests.",
        explanation: "The beach is famous for the stark contrast between the red rocks, white sand, and green trees."
      }
    ]
  },
  "Guyana": {
    tourTitle: "Land of Many Waters",
    introText: "The massive Kaieteur Falls drops five times deeper than Niagara. Explore the untouched rainforests that cover most of this green land.",
    stops: [
      {
        stopName: "Kaieteur Falls",
        imageKeyword: "Kaieteur Falls",
        description: [
          "This is the world's largest single-drop waterfall by volume of water. The Potaro River plunges 226 meters (741 feet) off a sandstone cliff into a misty gorge, making it about five times taller than Niagara Falls.",
          "Because it is located deep in the Amazonian shield, there are no guardrails or tourist shops. Visitors stand right at the edge of the abyss on the wet rock, experiencing the raw power of nature without any safety barriers.",
          "The tank bromeliads (plants) near the falls are home to the tiny Golden Rocket Frog. This toxic, bright yellow frog lives its entire life inside the water pools gathered in the plant's leaves."
        ],
        question: "How does the height of Kaieteur Falls compare to Niagara Falls?",
        options: [
          "It is about five times taller.",
          "It is half the height.",
          "It is exactly the same height.",
          "It is shorter but wider."
        ],
        answer: "It is about five times taller.",
        explanation: "Kaieteur drops 226 meters, creating a much higher vertical plunge than Niagara."
      },
      {
        stopName: "St. George's Cathedral",
        imageKeyword: "St. George's Cathedral",
        description: [
          "Located in the capital of Georgetown, this Anglican cathedral is one of the tallest wooden buildings in the world. It stands 43.5 meters (143 feet) high and is constructed almost entirely from Greenheart, a local hardwood known for its extreme durability.",
          "The architecture is a prime example of the Gothic Revival style, featuring flying buttresses and pointed arches, but adapted for the tropics. The walls have louvers to allow the trade winds to blow through and cool the interior.",
          "It was completed in 1899. Despite the humid climate and termites that destroy most wood in the region, the native Greenheart timber has kept the church standing for over a century."
        ],
        question: "What local wood was used to build St. George's Cathedral?",
        options: [
          "Greenheart.",
          "Pine.",
          "Oak.",
          "Bamboo."
        ],
        answer: "Greenheart.",
        explanation: "This incredibly hard and rot-resistant wood allows the massive structure to survive the tropical climate."
      },
      {
        stopName: "Shell Beach",
        imageKeyword: "Shell Beach",
        description: [
          "As the name implies, this 90-mile stretch of coast is not made of sand, but of billions of tiny crushed seashells. The Atlantic tides have deposited the shells here for centuries, creating a unique crunching surface.",
          "It is a vital nesting ground for four endangered species of marine turtles: Leatherback, Green, Hawksbill, and Olive Ridley. Between March and August, these giants haul themselves onto the shell banks to lay eggs.",
          "The area was formerly a hideout for pirates and indigenous Caribs. Today, it is protected by the local Amerindian communities who have transitioned from hunting the turtles to protecting them as tour guides."
        ],
        question: "What creates the ground surface of Shell Beach?",
        options: [
          "Crushed seashells.",
          "Volcanic ash.",
          "White silica sand.",
          "River pebbles."
        ],
        answer: "Crushed seashells.",
        explanation: "Instead of silica sand, the beach is composed of billions of shells washed up by the ocean."
      },
      {
        stopName: "Iwokrama Forest",
        imageKeyword: "Iwokrama Forest",
        description: [
          "This vast reserve protects one of the last pristine tropical forests in the world. It is a \"living laboratory\" dedicated to showing how humans can use a forest sustainably without destroying it.",
          "The highlight is the Canopy Walkway, a series of suspension bridges hanging 30 meters (98 feet) above the forest floor. It allows you to walk through the mid-level and upper canopy to spot toucans, macaws, and red howler monkeys.",
          "The forest is the realm of the Jaguar. Guyana has one of the healthiest jaguar populations in the Americas, and they are frequently spotted by lucky visitors patrolling the dirt roads of the reserve."
        ],
        question: "What is the primary purpose of the Iwokrama Forest reserve?",
        options: [
          "To demonstrate sustainable forest use and conservation.",
          "To mine for gold.",
          "To build a new city.",
          "To clear land for farming."
        ],
        answer: "To demonstrate sustainable forest use and conservation.",
        explanation: "It serves as a model for how to use rainforest resources without deforestation."
      },
      {
        stopName: "Rupununi Savannah",
        imageKeyword: "Rupununi Savannah",
        description: [
          "This vast grassy plain in the south looks more like East Africa than South America. During the rainy season, the savannah floods, connecting the Amazon and Essequibo river basins and allowing fish to swim across the continent.",
          "It is the land of giants. This ecosystem is home to the Giant Anteater, the Giant River Otter (the \"river wolf\"), the Black Caiman, and the Harpy Eagle, the world's most powerful bird of prey.",
          "The region is inhabited by the Makushi and Wapishana peoples. Many of the eco-lodges here are community-owned, where indigenous cowboys (vaqueros) guide visitors to find anteaters in the wild."
        ],
        question: "Which \"giant\" bird of prey hunts in the Rupununi Savannah?",
        options: [
          "The Harpy Eagle.",
          "The Condor.",
          "The Bald Eagle.",
          "The Albatross."
        ],
        answer: "The Harpy Eagle.",
        explanation: "One of the largest and most powerful eagles in the world, it is a top predator in this region."
      }
    ]
  }
};