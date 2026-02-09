import { TourData } from "../../types";

export const toursN: Record<string, TourData> = {
  "Namibia": {
    tourTitle: "The Land God Made in Anger",
    introText: "The red dunes of Sossusvlei are some of the tallest sand piles on Earth. Watch the fog roll in from the ocean along the Skeleton Coast.",
    stops: [
      {
        stopName: "Sossusvlei",
        imageKeyword: "Sossusvlei Deadvlei",
        description: [
          "This salt pan is one of the most surreal landscapes on Earth. It features ancient camel thorn trees that died 600 to 700 years ago when the climate changed and the river dried up.",
          "The trees did not decompose because the air is too dry. Instead of rotting, the sun scorched them black, creating stark statues that stand in contrast against the white clay floor and the deep orange dunes behind them.",
          "It is home to \"Big Daddy,\" one of the highest sand dunes in the world (325 meters). Climbing it is a grueling challenge, but running down the soft sand face takes only a few minutes."
        ],
        question: "Why didn't the dead trees in Deadvlei decompose?",
        options: [
          "The air is too dry.",
          "They are petrified stone.",
          "Termites don't live there.",
          "They were painted."
        ],
        answer: "The air is too dry.",
        explanation: "The extreme lack of moisture prevented the wood from rotting, essentially mummifying the trees."
      },
      {
        stopName: "The Skeleton Coast",
        imageKeyword: "Skeleton Coast Shipwreck",
        description: [
          "Local Bushmen called this region \"The Land God Made in Anger.\" It is a treacherous stretch of coastline where the cold Atlantic current meets the hot desert air, creating thick, blinding fog almost daily.",
          "The fog and strong currents have caused thousands of shipwrecks over the centuries. The beaches are littered with the rusted remains of ships and the bleached bones of whales and seals, giving the coast its grim name.",
          "Despite the harshness, life exists here. Desert-adapted lions and hyenas prowl the beaches looking for seals to eat, a behavior found nowhere else in the world."
        ],
        question: "What weather phenomenon causes so many shipwrecks on the Skeleton Coast?",
        options: [
          "Thick fog.",
          "Hurricanes.",
          "Icebergs.",
          "Tornadoes."
        ],
        answer: "Thick fog.",
        explanation: "The collision of cold ocean air and hot desert air creates blinding fog banks that hide the shore."
      },
      {
        stopName: "Etosha National Park",
        imageKeyword: "Etosha National Park",
        description: [
          "The centerpiece of this park is the Etosha Pan, a vast salt flat so large it can be seen from space. For most of the year, it is a dry, shimmering white wasteland of cracked mud.",
          "The animals here are famous for being \"Ghost Elephants.\" They cover themselves in the white calcite mud and dust of the pan to protect their skin from the sun and insects, giving them a spectral white appearance.",
          "Because water is scarce, wildlife viewing is easy. Visitors just park their cars next to one of the permanent waterholes and wait for lions, rhinos, and giraffes to come to them."
        ],
        question: "Why do the elephants in Etosha appear white?",
        options: [
          "They cover themselves in white clay/dust.",
          "It is a rare genetic mutation.",
          "They are albinos.",
          "It is a trick of the light."
        ],
        answer: "They cover themselves in white clay/dust.",
        explanation: "The white mud from the salt pan acts as a sunscreen and bug repellent."
      },
      {
        stopName: "Fish River Canyon",
        imageKeyword: "Fish River Canyon",
        description: [
          "This is the largest canyon in Africa and the second largest in the world (after the Grand Canyon in the USA). It stretches for 160 kilometers long and reaches depths of up to 550 meters.",
          "The canyon was formed about 500 million years ago by water erosion and the collapse of the valley floor. It cuts through a harsh, rocky landscape that looks like the surface of Mars.",
          "It hosts one of the toughest hikes in Africa. The 85-kilometer trail takes 4-5 days to complete, and hikers must carry all their own food and water; once you enter the canyon, there is no way out until the end."
        ],
        question: "Fish River Canyon is the largest canyon on which continent?",
        options: [
          "Africa.",
          "South America.",
          "Asia.",
          "Europe."
        ],
        answer: "Africa.",
        explanation: "It is the continent's most massive ravine system."
      },
      {
        stopName: "Kolmanskop",
        imageKeyword: "Kolmanskop",
        description: [
          "This ghost town was once a thriving diamond mining settlement in the early 1900s. It was so wealthy that it had the first X-ray station in the Southern Hemisphere, used not just for health, but to check if workers were swallowing diamonds to smuggle them out.",
          "It was abandoned in 1956 when richer diamond deposits were found elsewhere. Since then, the desert has reclaimed the town, with sand dunes pushing open doors and filling the rooms of the grand German-style houses.",
          "It is a photographer's paradise. The juxtaposition of peeling wallpaper, grand staircases, and piles of pristine desert sand creates a hauntingly beautiful atmosphere."
        ],
        question: "Why was the first X-ray station in the Southern Hemisphere built in Kolmanskop?",
        options: [
          "To detect stolen diamonds.",
          "To treat broken bones.",
          "To study sand.",
          "For dental records."
        ],
        answer: "To detect stolen diamonds.",
        explanation: "The mining company used it to prevent diamond smuggling by workers."
      }
    ]
  },
  "Nauru": {
    tourTitle: "The Pleasant Island",
    introText: "This tiny island was once one of the richest nations due to phosphate mining. Walk around the entire country in just a few hours.",
    stops: [
      {
        stopName: "The Central Plateau",
        imageKeyword: "Nauru Topside",
        description: [
          "The interior of Nauru is a lunar landscape of jagged limestone pinnacles. This area was stripped of its soil during decades of phosphate mining, which removed the guano (bird droppings) that had accumulated over thousands of years.",
          "In the 1970s and 80s, the phosphate wealth made Nauru one of the richest nations per capita on Earth. However, the mining devastated 80% of the island's land surface, leaving it uninhabitable and unsuitable for agriculture.",
          "The pinnacles are sharp and dangerous to walk on. They are the skeletal remains of the ancient coral reef that formed the island, exposed after the valuable phosphate dirt between them was scooped out."
        ],
        question: "What resource was mined on Nauru that stripped the land?",
        options: [
          "Phosphate.",
          "Gold.",
          "Coal.",
          "Diamonds."
        ],
        answer: "Phosphate.",
        explanation: "The island was covered in high-grade phosphate derived from ancient bird droppings."
      },
      {
        stopName: "Anibare Bay",
        imageKeyword: "Anibare Bay",
        description: [
          "This magnificent bay is considered the best beach on the island. While much of Nauru's coast is rocky, Anibare offers a sweep of white coral sand and tropical blue water.",
          "It is one of the few places where you can see the limestone pinnacles in the water rather than on land. These rock formations create dramatic scenery but can make swimming tricky due to the sharp edges.",
          "The bay is located on the eastern side of the island, making it the perfect spot to watch the sunrise over the vast, empty Pacific Ocean."
        ],
        question: "Why is swimming tricky in some parts of Anibare Bay?",
        options: [
          "Sharp limestone/coral pinnacles in the water.",
          "Strong currents.",
          "Sharks.",
          "Jellyfish."
        ],
        answer: "Sharp limestone/coral pinnacles in the water.",
        explanation: "The underwater rock formations are jagged and can cut swimmers."
      },
      {
        stopName: "Buada Lagoon",
        imageKeyword: "Buada Lagoon",
        description: [
          "This is the only body of fresh water on the island. Unlike the coastal areas, this landlocked lagoon is surrounded by dense green vegetation, offering a glimpse of what the island looked like before mining.",
          "It is slightly brackish but is not connected to the ocean. For centuries, locals have used the lagoon for aquaculture, raising milkfish in the water to ensure a steady food supply.",
          "Because Nauru has no rivers, this lagoon is a critical geological feature. It sits in a depression in the plateau, acting as a natural catch basin for rainwater."
        ],
        question: "Buada Lagoon is unique in Nauru because it contains what type of water?",
        options: [
          "Fresh water (or brackish).",
          "Salt water.",
          "Boiling water.",
          "Frozen water."
        ],
        answer: "Fresh water (or brackish).",
        explanation: "It is the only landlocked freshwater body on the island; everything else is ocean."
      },
      {
        stopName: "Command Ridge",
        imageKeyword: "Command Ridge",
        description: [
          "This is the highest point on Nauru, standing roughly 65 meters above sea level. During World War II, the island was occupied by the Japanese, who used this vantage point to defend the island.",
          "The ridge is littered with the rusted remains of the war. Visitors can see two rotating six-barreled anti-aircraft guns and the entrance to a communications bunker that still holds Japanese writing on the walls.",
          "From the top, you can see the stark contrast of the island: the thin green strip of inhabited coast and the grey, jagged wasteland of the mined interior."
        ],
        question: "Which country occupied Nauru during WWII and built the bunkers on Command Ridge?",
        options: [
          "Japan.",
          "Germany.",
          "United States.",
          "Australia."
        ],
        answer: "Japan.",
        explanation: "The Japanese military used the island as a fortified outpost in the Pacific."
      },
      {
        stopName: "Yaren District",
        imageKeyword: "Yaren Parliament",
        description: [
          "Nauru is unique because it technically has no official capital city; Yaren is just the district where the government buildings are located.",
          "The Parliament House sits right next to the airport runway. Space is so limited on the island that the main road actually crosses the runway; traffic lights stop cars and pedestrians whenever a plane needs to land or take off.",
          "The country is so small (21 square kilometers) that you can walk around the entire island nation in about 4 to 5 hours on the single paved ring road."
        ],
        question: "Why do traffic lights stop cars on the main road in Yaren?",
        options: [
          "To allow planes to land/take off.",
          "To let the president cross.",
          "For a parade.",
          "To allow mining trucks."
        ],
        answer: "To allow planes to land/take off.",
        explanation: "The road crosses the airport runway due to the extreme lack of flat land."
      }
    ]
  },
  "Nepal": {
    tourTitle: "The Roof of the World",
    introText: "Mount Everest rises to the highest point on the entire planet. Trek through the rhododendron forests on the way to a mountain teahouse.",
    stops: [
      {
        stopName: "Mount Everest",
        imageKeyword: "Mount Everest",
        description: [
          "Rising to 8,848 meters (29,031 feet), this is the highest point on Earth. In Nepal, it is known as Sagarmatha (\"Goddess of the Sky\"), and it sits on the border between Nepal and Tibet (China).",
          "The summit is so high that it sits in the \"Death Zone.\" Above 8,000 meters, the oxygen level is insufficient to sustain human life for long periods, and climbers must rely on bottled oxygen to survive the final push.",
          "The economy of the region depends on the Sherpa people. These ethnic locals are genetically adapted to high altitudes and work as elite guides and porters, carrying massive loads to help foreign climbers reach the summit."
        ],
        question: "What is the Nepali name for Mount Everest?",
        options: [
          "Sagarmatha.",
          "Chomolungma.",
          "Denali.",
          "K2."
        ],
        answer: "Sagarmatha.",
        explanation: "It translates roughly to \"Forehead of the Sky\" or \"Goddess of the Sky.\""
      },
      {
        stopName: "Kathmandu Durbar Square",
        imageKeyword: "Kathmandu Durbar Square",
        description: [
          "This UNESCO World Heritage site was the royal plaza of the old Kathmandu Kingdom. It is a complex of palaces, courtyards, and temples built between the 12th and 18th centuries by the Malla kings.",
          "It is the home of the Kumari, the \"Living Goddess.\" The Kumari is a young girl chosen from the Shakya clan who is believed to be the reincarnation of the goddess Taleju. She lives in a palace on the square and only leaves for festivals.",
          "The square was heavily damaged by the 2015 earthquake. While many temples collapsed, restoration efforts are ongoing, using traditional wood-carving techniques to rebuild the structures exactly as they were."
        ],
        question: "Who is the \"Kumari\" who lives in Durbar Square?",
        options: [
          "A Living Goddess.",
          "The Queen.",
          "The High Priestess.",
          "A Spirit."
        ],
        answer: "A Living Goddess.",
        explanation: "A young prepubescent girl worshiped as the embodiment of a Hindu deity."
      },
      {
        stopName: "Annapurna Circuit",
        imageKeyword: "Annapurna Circuit",
        description: [
          "This is widely considered one of the best long-distance treks in the world. The trail circles the Annapurna massif, taking hikers from tropical banana plantations and rice paddies up to freezing alpine passes.",
          "The trek is famous for \"Teahouse Trekking.\" Unlike other mountain ranges where you must camp in tents, this route is lined with small lodges (teahouses) where hikers can sleep in a bed and eat a hot meal of Dal Bhat (lentils and rice) every night.",
          "The highest point is the Thorong La Pass at 5,416 meters. Crossing it requires a pre-dawn start to avoid high winds, offering stunning views of the Mustang region's arid, desert-like mountains."
        ],
        question: "What is \"Teahouse Trekking\"?",
        options: [
          "Staying in lodges/inns instead of camping.",
          "Drinking tea while walking.",
          "Carrying tea leaves.",
          "Meeting for tea ceremonies."
        ],
        answer: "Staying in lodges/inns instead of camping.",
        explanation: "Hikers rely on local teahouses for accommodation and food along the trail."
      },
      {
        stopName: "Chitwan National Park",
        imageKeyword: "Chitwan National Park",
        description: [
          "While Nepal is famous for mountains, the southern strip (the Terai) is a steaming, flat jungle. Chitwan was the first national park in Nepal and is a refuge for the endangered Greater One-Horned Rhinoceros.",
          "The park is also one of the last strongholds of the Royal Bengal Tiger. The tall elephant grass provides perfect cover for these predators, making them hard to spot but ensuring a healthy population.",
          "The local indigenous group, the Tharu people, have lived here for centuries. They historically developed a natural resistance to malaria, which allowed them to survive in the dense jungle when outsiders could not."
        ],
        question: "Which endangered rhino species is found in Chitwan National Park?",
        options: [
          "The Greater One-Horned Rhinoceros.",
          "The Black Rhino.",
          "The White Rhino.",
          "The Javan Rhino."
        ],
        answer: "The Greater One-Horned Rhinoceros.",
        explanation: "Nepal has achieved great success in bringing this species back from the brink of extinction."
      },
      {
        stopName: "Lumbini",
        imageKeyword: "Lumbini",
        description: [
          "Lumbini is one of the holiest places in the world, revered as the birthplace of Siddhartha Gautama, the Lord Buddha, in 623 BC.",
          "The central site is the Maya Devi Temple. Inside, archaeologists have uncovered the \"Marker Stone,\" which pinpoints the exact spot of the birth, and the sacred pond where Queen Maya Devi is said to have bathed before giving birth.",
          "The area is a global peace zone. Different countries from around the world (including Thailand, Germany, China, and Myanmar) have built their own Buddhist temples in the garden, each in their distinctive national architectural style."
        ],
        question: "Lumbini is famous as the birthplace of whom?",
        options: [
          "Siddhartha Gautama (The Buddha).",
          "Gandhi.",
          "Confucius.",
          "Dalai Lama."
        ],
        answer: "Siddhartha Gautama (The Buddha).",
        explanation: "It is the holiest pilgrimage site for Buddhists, marking where the religion's founder was born."
      }
    ]
  },
  "Netherlands": {
    tourTitle: "The Low Countries",
    introText: "Fields of colorful tulips bloom in rows during the spring season. Cycle along the flat canals that weave through the historic cities.",
    stops: [
      {
        stopName: "Keukenhof Gardens",
        imageKeyword: "Keukenhof Gardens",
        description: [
          "Known as the \"Garden of Europe,\" this is one of the world's largest flower gardens. Every year, approximately 7 million flower bulbs are planted by hand to create spectacular displays of tulips, hyacinths, and daffodils.",
          "The garden is only open for about eight weeks a year (from mid-March to mid-May). During this short window, over a million visitors flock to see the blooms at their peak.",
          "The tulip was originally imported from the Ottoman Empire (Turkey) in the 16th century. It became so popular that it caused \"Tulip Mania\" in the 1630s, the first recorded economic bubble in history, where a single bulb cost as much as a house."
        ],
        question: "For how many weeks per year is Keukenhof Gardens typically open?",
        options: [
          "About eight weeks.",
          "Six months.",
          "All year.",
          "Only on weekends."
        ],
        answer: "About eight weeks.",
        explanation: "It is only open during the spring blooming season."
      },
      {
        stopName: "Amsterdam Canals",
        imageKeyword: "Amsterdam Canals",
        description: [
          "The 17th-century canal ring area of Amsterdam is a UNESCO World Heritage site. It was a masterpiece of hydraulic engineering, built during the Dutch Golden Age to drain the swampland and create a new port city.",
          "The houses are famous for being tall and narrow. Historically, citizens were taxed based on the width of their house frontage along the canal, so people built narrow, deep houses to save money.",
          "Many houses have a hook beam at the very top of the gable. Because the staircases inside are too steep and narrow to move furniture, residents use the hook and a pulley system to hoist sofas and tables in through the windows."
        ],
        question: "Why are traditional canal houses in Amsterdam so narrow?",
        options: [
          "Taxes were based on the width of the facade.",
          "Land was scarce.",
          "To fit more people.",
          "It was a fashion trend."
        ],
        answer: "Taxes were based on the width of the facade.",
        explanation: "To minimize tax bills, owners built narrow frontages and extended the house far back."
      },
      {
        stopName: "Kinderdijk",
        imageKeyword: "Kinderdijk",
        description: [
          "This site contains 19 majestic windmills built around 1740. It is the largest concentration of old windmills in the Netherlands and demonstrates the Dutch battle against the water.",
          "The windmills were not used to grind grain; they were pumping stations. Their job was to pump excess water out of the low-lying polders (reclaimed land) and into the river to prevent the fields from flooding.",
          "The Netherlands is a \"low country\" because about 26% of it is below sea level. Without systems like Kinderdijk, large parts of the country would be permanently underwater."
        ],
        question: "What was the primary function of the windmills at Kinderdijk?",
        options: [
          "To pump water (drainage).",
          "To grind grain.",
          "To generate electricity.",
          "To saw wood."
        ],
        answer: "To pump water (drainage).",
        explanation: "They moved water from the lower fields into the higher river channels to keep the land dry."
      },
      {
        stopName: "Giethoorn",
        imageKeyword: "Giethoorn",
        description: [
          "Known as the \"Venice of the North,\" Giethoorn is a village with almost no roads. The old part of the village is accessible only by bike paths or canals.",
          "Residents and the postman travel by \"whisper boats.\" These are small vessels equipped with silent electric motors to preserve the peace and quiet of the village.",
          "The houses are built on small peat islands connected by over 170 wooden bridges. The roofs are thatched with reeds, which was once a sign of poverty but is now a sign of wealth due to the high cost of maintenance."
        ],
        question: "How do residents traditionally travel around the old part of Giethoorn?",
        options: [
          "By boat (or bicycle).",
          "By car.",
          "By subway.",
          "By horse."
        ],
        answer: "By boat (or bicycle).",
        explanation: "The lack of roads means water transport is the main way to get around."
      },
      {
        stopName: "The Delta Works",
        imageKeyword: "The Delta Works",
        description: [
          "Following a devastating flood in 1953 that killed over 1,800 people, the Dutch built the Delta Works, a massive system of dams and storm surge barriers often called one of the Seven Wonders of the Modern World.",
          "The Maeslantkering is the final piece of this defense. It consists of two Eiffel-Tower-sized swinging arms that rest on the riverbanks. When a storm threatens, these arms swing out to meet in the middle, closing off the massive waterway to protect Rotterdam.",
          "It is controlled by a computer system called BOS. It is the only storm barrier in the world entirely operated by a computer without human intervention, ensuring that panic or hesitation doesn't prevent the gates from closing in an emergency."
        ],
        question: "What tragedy in 1953 triggered the construction of the Delta Works?",
        options: [
          "A massive North Sea flood.",
          "A war.",
          "An earthquake.",
          "A drought."
        ],
        answer: "A massive North Sea flood.",
        explanation: "A storm surge breached the dikes, flooding the country and prompting the massive engineering project."
      }
    ]
  },
  "New Zealand": {
    tourTitle: "Aotearoa",
    introText: "Glowworms light up the ceilings of the Waitomo Caves like stars. Hike through the dramatic landscapes where famous fantasy movies were filmed.",
    stops: [
      {
        stopName: "Waitomo Glowworm Caves",
        imageKeyword: "Waitomo Glowworm Caves",
        description: [
          "These limestone caves are inhabited by Arachnocampa luminosa, a species of glowworm found exclusively in New Zealand. They are actually the larvae of a fungus gnat, which glow in the dark to attract prey into their sticky silk threads.",
          "Visitors take a silent boat ride through the \"Grotto.\" The darkness is absolute until the boat turns a corner, revealing a ceiling covered in thousands of tiny blue lights that look exactly like the Milky Way galaxy.",
          "The acoustics in the Cathedral Cave are world-renowned. Famous singers, including Dame Kiri Te Kanawa, have performed here because the purity of the sound resonating off the limestone walls is unmatched."
        ],
        question: "The \"glowworms\" in Waitomo are actually the larvae of what insect?",
        options: [
          "A fungus gnat.",
          "A firefly.",
          "A moth.",
          "A beetle."
        ],
        answer: "A fungus gnat.",
        explanation: "The bioluminescence is used to lure insects into their sticky lines so they can eat them."
      },
      {
        stopName: "Hobbiton Movie Set",
        imageKeyword: "Hobbiton Movie Set",
        description: [
          "Located on a working sheep farm in Matamata, this site served as the Shire in The Lord of the Rings and The Hobbit trilogies. Unlike many movie sets that are torn down, this one was built with permanent materials like brick and timber.",
          "The set features 44 Hobbit Holes. The scale varies; some doors are built at 100% scale for scenes with hobbits, while others are built at 60% scale to make the wizard Gandalf look giant when standing next to them.",
          "The intense attention to detail includes the oak tree above Bag End. It is actually an artificial tree made of fiberglass with thousands of silk leaves imported from Taiwan, each wired individually onto the branches."
        ],
        question: "What material are the leaves of the artificial oak tree above Bag End made from?",
        options: [
          "Silk.",
          "Plastic.",
          "Paper.",
          "Real preserved leaves."
        ],
        answer: "Silk.",
        explanation: "The leaves were hand-wired onto the tree to ensure they looked perfect for the film."
      },
      {
        stopName: "Milford Sound",
        imageKeyword: "Milford Sound",
        description: [
          "Described by Rudyard Kipling as the \"Eighth Wonder of the World,\" this fjord was carved by massive glaciers during the Ice Ages. The sheer rock walls rise vertically from the dark water to heights of over 1,200 meters.",
          "It is one of the wettest places on Earth. The immense rainfall creates hundreds of temporary waterfalls that cascade down the cliffs; some are so high that the wind blows the water back up before it hits the sea.",
          "The fjord is home to deep-water black coral. Usually found only in the abyss, this coral grows in shallow depths here because a layer of dark freshwater sits on top of the seawater, blocking sunlight and mimicking the deep ocean environment."
        ],
        question: "What carved the landscape of Milford Sound?",
        options: [
          "Glaciers.",
          "Volcanoes.",
          "River erosion.",
          "Earthquakes."
        ],
        answer: "Glaciers.",
        explanation: "Massive sheets of ice ground down the rock valley, which was then flooded by the sea."
      },
      {
        stopName: "Rotorua",
        imageKeyword: "Rotorua Te Puia",
        description: [
          "Rotorua is the geothermal heart of the country, sitting inside a volcanic caldera. The air smells distinctly of sulfur due to the hydrogen sulfide emissions from the active vents.",
          "It features the Pōhutu Geyser, the largest active geyser in the Southern Hemisphere. It erupts up to 20 times a day, shooting water 30 meters into the air.",
          "The area is a center for Māori culture. The local Māori people have used the geothermal waters for centuries to cook food (in hangi pits), bathe, and heat their homes, integrating the volatile landscape into their daily lives."
        ],
        question: "What causes the distinct smell in the air around Rotorua?",
        options: [
          "Sulfur (Hydrogen Sulfide).",
          "Burning wood.",
          "Seaweed.",
          "Pine trees."
        ],
        answer: "Sulfur (Hydrogen Sulfide).",
        explanation: "The volcanic activity releases gases that smell like rotten eggs."
      },
      {
        stopName: "Aoraki / Mount Cook",
        imageKeyword: "Aoraki Mount Cook",
        description: [
          "Standing at 3,724 meters, this is the highest mountain in New Zealand. It served as the training ground for Sir Edmund Hillary before he made his historic first ascent of Mount Everest.",
          "The mountain is technically shrinking. In 1991, a massive rockslide caused the top 10 meters of the peak to fall off, permanently reducing its official height.",
          "It is part of a Dark Sky Reserve. Because there is almost no light pollution in this remote alpine region, it is one of the best places on Earth to see the Southern Lights (Aurora Australis) and the Southern Cross constellation."
        ],
        question: "Who famously used Mount Cook as a training ground for climbing Everest?",
        options: [
          "Sir Edmund Hillary.",
          "Tenzing Norgay.",
          "Reinhold Messner.",
          "Bear Grylls."
        ],
        answer: "Sir Edmund Hillary.",
        explanation: "The New Zealander honed his ice-climbing skills here before conquering the world's highest peak."
      }
    ]
  },
  "Nicaragua": {
    tourTitle: "The Land of Lakes and Volcanoes",
    introText: "Bull sharks swim in the fresh water of the massive Lake Nicaragua. Surf down the black ash of an active volcano.",
    stops: [
      {
        stopName: "Lake Nicaragua",
        imageKeyword: "Lake Nicaragua",
        description: [
          "This is the largest freshwater lake in Central America and the 19th largest in the world. It is so big that Spanish explorers originally thought it was an ocean until they saw their horses drinking the water.",
          "It is famous for the Nicaragua Shark. These are Bull Sharks that adapted to freshwater; scientists used to believe they were a distinct species trapped in the lake, but they actually travel from the ocean by jumping up the rapids of the San Juan River like salmon.",
          "The lake contains the Granada Islets, a chain of 365 small islands. These were formed when the nearby Mombacho volcano exploded thousands of years ago, throwing massive chunks of earth into the lake."
        ],
        question: "How do the Bull Sharks enter Lake Nicaragua from the ocean?",
        options: [
          "They swim up the San Juan River.",
          "They are trapped inside.",
          "They fall from the sky.",
          "They evolved there."
        ],
        answer: "They swim up the San Juan River.",
        explanation: "These sharks can tolerate fresh water and navigate the river's rapids to reach the lake."
      },
      {
        stopName: "Cerro Negro",
        imageKeyword: "Cerro Negro",
        description: [
          "Cerro Negro is the youngest volcano in Central America, born in 1850. It is a cinder cone made entirely of loose black volcanic rocks that looks like a pile of coal dumped on the green landscape.",
          "It is the birthplace of \"volcano boarding.\" Thrill-seekers hike up the active volcano carrying a wooden sled, then slide down the steep 41-degree slope of volcanic ash, reaching speeds of up to 95 km/h (60 mph).",
          "The volcano is still active. Hikers can feel the heat radiating from the ground through their boots, and steam vents can be seen at the rim of the crater before the descent."
        ],
        question: "Cerro Negro is famous for inventing which extreme sport?",
        options: [
          "Volcano boarding (ash boarding).",
          "Lava surfing.",
          "Magma diving.",
          "Crater jumping."
        ],
        answer: "Volcano boarding (ash boarding).",
        explanation: "Tourists slide down the steep black ash slopes on wooden sleds."
      },
      {
        stopName: "Ometepe Island",
        imageKeyword: "Ometepe Island",
        description: [
          "Located in the middle of Lake Nicaragua, Ometepe is the largest volcanic island inside a freshwater lake in the world. Its name comes from the Nahuatl words ome (two) and tepetl (mountains).",
          "It consists of two volcanoes joined by a narrow isthmus: Concepción (active and perfectly cone-shaped) and Maderas (dormant and covered in cloud forest).",
          "The island is rich in pre-Columbian history. It contains widespread petroglyphs (rock carvings) and stone idols created by ancient inhabitants who considered the island a sacred place."
        ],
        question: "What does the name \"Ometepe\" translate to in Nahuatl?",
        options: [
          "Two Mountains.",
          "Fire Island.",
          "Sacred Lake.",
          "Green Earth."
        ],
        answer: "Two Mountains.",
        explanation: "The island is formed by two distinct volcanoes connected by a land bridge."
      },
      {
        stopName: "Granada",
        imageKeyword: "Granada Nicaragua",
        description: [
          "Founded in 1524, Granada is one of the oldest colonial cities in the Americas. It is known for its well-preserved Spanish architecture, featuring pastel-colored buildings, terracotta roofs, and open internal courtyards.",
          "The city has been destroyed and rebuilt many times due to pirate attacks. In 1856, the American filibuster William Walker set the city on fire and left a sign that read \"Here was Granada\" before fleeing.",
          "The main cathedral dominates the plaza. Its bright yellow facade stands out against the blue sky, and visitors can climb the bell tower for a panoramic view of the city and the lake."
        ],
        question: "Which American mercenary burned Granada in 1856?",
        options: [
          "William Walker.",
          "Cornelius Vanderbilt.",
          "Teddy Roosevelt.",
          "Mark Twain."
        ],
        answer: "William Walker.",
        explanation: "The filibuster destroyed the city during his failed attempt to conquer Central America."
      },
      {
        stopName: "The Corn Islands",
        imageKeyword: "The Corn Islands",
        description: [
          "Located 70 kilometers off the Caribbean coast, Big Corn and Little Corn islands offer a completely different vibe from the mainland. The culture here is Creole, English-speaking, and distinctly Caribbean.",
          "Little Corn Island has no cars. The only way to get around is by walking on narrow paved paths through the jungle, preserving a quiet, laid-back atmosphere.",
          "Historically, these islands were a refuge for pirates and buccaneers. Several shipwrecks from the 17th century, including a Spanish galleon, still lie beneath the waters around the islands."
        ],
        question: "What type of motorized transport is absent on Little Corn Island?",
        options: [
          "Cars.",
          "Boats.",
          "Airplanes.",
          "Bicycles."
        ],
        answer: "Cars.",
        explanation: "The island is too small and undeveloped for vehicles, so traffic is pedestrian only."
      }
    ]
  },
  "Niger": {
    tourTitle: "The Crossroads of the Sahel",
    introText: "The giraffe population here has unique light-colored spots found nowhere else. Camp in the deep silence of the Ténéré Desert dunes.",
    stops: [
      {
        stopName: "Kouré Giraffe Reserve",
        imageKeyword: "Kouré Giraffe Reserve",
        description: [
          "This reserve is the last home of the West African Giraffe (Giraffa camelopardalis peralta). This subspecies is distinct for its lighter, \"bleached\" spots and was nearly hunted to extinction, with only 50 individuals left in the 1990s.",
          "Through intense conservation efforts involving the local community, the population has rebounded to several hundred. Unlike in other parks, these giraffes live freely among the villagers, often walking through crop fields without conflict.",
          "They are known as the \"White Giraffes of Niger.\" Their pale coat helps them reflect the intense Sahelian sun and camouflage against the dusty, bleached landscape of the bush."
        ],
        question: "What is unique about the appearance of the West African Giraffe found in Kouré?",
        options: [
          "They have lighter (bleached) spots.",
          "They are entirely black.",
          "They have no neck.",
          "They are striped like zebras."
        ],
        answer: "They have lighter (bleached) spots.",
        explanation: "Their pale coat is a distinct characteristic of this rare subspecies."
      },
      {
        stopName: "Agadez",
        imageKeyword: "Agadez Historic Centre",
        description: [
          "Agadez is the gateway to the Sahara and the historic capital of the Tuareg people. The city center is a UNESCO World Heritage site, famous for its red-clay architecture.",
          "The Grand Mosque of Agadez is the tallest mud-brick structure in the world (27 meters). It bristles with wooden stakes that serve as permanent scaffolding for the annual re-plastering, similar to the mosque in Mali.",
          "For centuries, this was the most important stop for caravans crossing the desert. It remains a hub for the salt trade, where camel trains arrive carrying heavy slabs of salt from the mines in the north."
        ],
        question: "Agadez is the cultural capital of which nomadic people?",
        options: [
          "The Tuareg.",
          "The Bedouin.",
          "The Maasai.",
          "The Mongols."
        ],
        answer: "The Tuareg.",
        explanation: "Known as the \"Blue People\" for their indigo robes, they controlled the desert trade routes."
      },
      {
        stopName: "The Tree of Ténéré",
        imageKeyword: "Tree of Ténéré",
        description: [
          "The Ténéré Desert is one of the most desolate places on Earth. For decades, a solitary acacia tree stood here, known as the most isolated tree in the world—the nearest neighbor was 400 kilometers away.",
          "The tree survived by growing roots over 30 meters deep to reach the water table. It served as a sacred landmark for caravans navigating the featureless sea of sand.",
          "Tragically, the tree was knocked down in 1973 by a drunk truck driver—one of the only vehicles in the entire desert managed to hit the only tree. Today, a metal sculpture stands in its place to mark the spot."
        ],
        question: "How was the original Tree of Ténéré destroyed in 1973?",
        options: [
          "It was hit by a truck driver.",
          "Lightning struck it.",
          "Old age.",
          "A sandstorm uprooted it."
        ],
        answer: "It was hit by a truck driver.",
        explanation: "Despite being the only obstacle for hundreds of miles, a driver collided with it."
      },
      {
        stopName: "Aïr Mountains",
        imageKeyword: "Aïr Mountains",
        description: [
          "These mountains form a triangular massif of dark volcanic rock in the middle of the Sahara. The black rock contrasts sharply with the surrounding yellow and orange sands, creating a dramatic, alien landscape.",
          "The area is rich in prehistoric rock art. Thousands of engravings of giraffes, cattle, and elephants date back to the \"Green Sahara\" period (6000 BC), proving that this desert was once a lush savannah.",
          "It serves as a sanctuary for the Addax and Dama Gazelle. These critically endangered antelopes are adapted to survive in extreme heat with almost no water, hiding in the rocky valleys of the massif."
        ],
        question: "What color are the volcanic rocks that make up the Aïr Mountains?",
        options: [
          "Black (or dark grey).",
          "Bright red.",
          "White.",
          "Green."
        ],
        answer: "Black (or dark grey).",
        explanation: "The dark volcanic stone creates a stark visual contrast with the light desert sand."
      },
      {
        stopName: "W National Park",
        imageKeyword: "W National Park Niger",
        description: [
          "This trans-border park (shared with Benin and Burkina Faso) is named \"W\" because the Niger River twists into the shape of the letter W as it flows through the reserve.",
          "It is a major refuge for West African wildlife. It contains the largest population of elephants in West Africa and is one of the last places to see the West African Lion.",
          "The park transitions from savannah to wetlands. This diversity allows it to support over 350 bird species, making it a critical stopover for birds migrating between Africa and Europe."
        ],
        question: "Why is the park named \"W National Park\"?",
        options: [
          "The Niger River forms a \"W\" shape there.",
          "It was named after George W. Bush.",
          "It stands for West Africa.",
          "It means 'Wild'."
        ],
        answer: "The Niger River forms a \"W\" shape there.",
        explanation: "The meandering bends of the river resemble the letter W when viewed from above."
      }
    ]
  },
  "Nigeria": {
    tourTitle: "The Giant of Africa",
    introText: "The massive monolith of Zuma Rock watches over the capital city. Feel the energy of the Afrobeat music scene in Lagos.",
    stops: [
      {
        stopName: "Zuma Rock",
        imageKeyword: "Zuma Rock",
        description: [
          "Located just outside the capital, Abuja, this igneous monolith rises 725 meters above the surrounding countryside. It is depicted on the 100 Naira bill.",
          "Locals call it the \"Gateway to Abuja.\" It is famous for the natural contours on the rock face that look distinctly like a human face, with eyes, a nose, and a mouth staring out over the road.",
          "Historically, the Gbagyi people used the rock as a fortress during inter-tribal wars. They believed the rock possessed powerful spirits that protected them from enemies, and they never settled too close to its base out of respect."
        ],
        question: "What feature can be seen on the side of Zuma Rock?",
        options: [
          "A human face.",
          "A lion's head.",
          "A giant snake.",
          "A waterfall."
        ],
        answer: "A human face.",
        explanation: "Natural erosion and water marks have created a pattern that resembles a face."
      },
      {
        stopName: "Lagos",
        imageKeyword: "Lekki Conservation Centre",
        description: [
          "Lagos is the largest city in Africa, a chaotic and energetic megalopolis. Hidden within this concrete jungle is the Lekki Conservation Centre, a calm reserve protecting the mangrove wetlands.",
          "It features the longest canopy walkway in Africa (401 meters). Visitors walk on swinging metal bridges suspended above the swamp, spotting monkeys and rare birds in the treetops.",
          "The reserve protects the Monitor Lizard and crocodiles. It serves as a vital green lung for the city, preventing the rapid urbanization from completely destroying the coastal ecosystem."
        ],
        question: "The Lekki Conservation Centre features the longest one of these structures in Africa?",
        options: [
          "Canopy walkway.",
          "Suspension bridge.",
          "Roller coaster.",
          "Tunnel."
        ],
        answer: "Canopy walkway.",
        explanation: "The suspended bridge system allows visitors to walk above the mangrove forest."
      },
      {
        stopName: "Osun-Osogbo Sacred Grove",
        imageKeyword: "Osun-Osogbo Sacred Grove",
        description: [
          "This UNESCO World Heritage site is one of the last remaining sacred forests in Yorubaland. It is dedicated to Osun, the Yoruba goddess of fertility and water.",
          "The forest is filled with sanctuaries, shrines, and massive sculptures honoring Yoruba deities. Unlike traditional statues, many of these were created in the 20th century by Austrian artist Susanne Wenger, who dedicated her life to reviving the site.",
          "Every year, the Osun-Osogbo festival takes place here. Thousands of devotees process to the river to offer prayers and sacrifices to the river goddess, celebrating the spiritual connection between the people and the forest."
        ],
        question: "The sacred grove is dedicated to Osun, the goddess of what?",
        options: [
          "Fertility (and water).",
          "War.",
          "Thunder.",
          "The Sun."
        ],
        answer: "Fertility (and water).",
        explanation: "She is a river deity believed to grant children and prosperity to her worshippers."
      },
      {
        stopName: "Olumo Rock",
        imageKeyword: "Olumo Rock",
        description: [
          "Located in the city of Abeokuta (which translates to \"Under the Rock\"), this mountain served as a natural fortress for the Egba people during tribal wars in the 19th century.",
          "The rock contains natural caves where refugees hid for three years. You can still see the remnants of their living quarters, including grinding holes in the floor where they processed food while in hiding.",
          "Modern elevators have been installed to take tourists to the top. From the summit, you get a panoramic view of the city's red corrugated iron roofs stretching out to the horizon."
        ],
        question: "What does the name of the city \"Abeokuta\" translate to?",
        options: [
          "Under the Rock.",
          "City of Gold.",
          "River's Edge.",
          "High Mountain."
        ],
        answer: "Under the Rock.",
        explanation: "The city was founded by refugees who sought safety beneath the massive Olumo Rock."
      },
      {
        stopName: "Benin City",
        imageKeyword: "Royal Palace of the Oba of Benin",
        description: [
          "Benin City was the capital of the Kingdom of Benin, one of the most advanced states in pre-colonial Africa. The city was famous for its massive earthworks (walls) which were once four times longer than the Great Wall of China.",
          "The kingdom is renowned for the \"Benin Bronzes.\" These intricate metal plaques adorned the pillars of the Royal Palace, recording the history of the Obas (kings) and their conquests in vivid detail.",
          "While many of the bronzes were looted by the British in 1897 and dispersed to museums worldwide, the Royal Palace is still the home of the current Oba. It remains the center of traditional Edo culture and religious ceremonies."
        ],
        question: "What material was used to create the famous plaques of the Benin Kingdom?",
        options: [
          "Bronze (and brass).",
          "Gold.",
          "Silver.",
          "Stone."
        ],
        answer: "Bronze (and brass).",
        explanation: "The \"Benin Bronzes\" are world-famous masterpieces of metalworking."
      }
    ]
  },
  "North Korea": {
    tourTitle: "The Hermit Kingdom",
    introText: "Massive bronze statues of leaders tower over the capital city square. Witness a synchronized mass game in the world's largest stadium.",
    stops: [
      {
        stopName: "Mansu Hill Grand Monument",
        imageKeyword: "Mansu Hill Grand Monument",
        description: [
          "Dominating the skyline of Pyongyang, these two 20-meter (66-foot) tall bronze statues depict the country's founding leaders, Kim Il Sung and Kim Jong Il.",
          "Visitors are expected to follow strict protocol here, which typically involves bowing in unison before the statues and laying flowers at their feet as a sign of respect.",
          "Flanking the statues are two massive stone monuments depicting hundreds of soldiers and workers carrying flags and weapons, representing the struggle against Japanese occupation and the Korean War."
        ],
        question: "The massive statues on Mansu Hill depict which two leaders?",
        options: [
          "Kim Il Sung and Kim Jong Il.",
          "Mao Zedong and Stalin.",
          "Kim Jong Un and Kim Il Sung.",
          "The founding generals."
        ],
        answer: "Kim Il Sung and Kim Jong Il.",
        explanation: "They are the grandfather and father of the current leader, honored as the Eternal President and Eternal General."
      },
      {
        stopName: "Rungrado 1st of May Stadium",
        imageKeyword: "Rungrado 1st of May Stadium",
        description: [
          "With a seating capacity of approximately 114,000 (and historically claiming up to 150,000), this is the largest stadium in the world by capacity. The roof is designed to look like a magnolia flower floating on the Taedong River.",
          "It is the venue for the famous \"Mass Games\" (Arirang Festival), where up to 100,000 performers participate in synchronized gymnastics and dance to tell the history of the nation.",
          "One of the most impressive features of the games is the \"human pixel\" background. Thousands of students in the stands hold up colored cards that they flip simultaneously to create massive, changing mosaic pictures."
        ],
        question: "What is the Rungrado 1st of May Stadium famous for being?",
        options: [
          "The largest stadium in the world by capacity.",
          "The oldest stadium in Asia.",
          "The only stadium made of gold.",
          "A floating stadium."
        ],
        answer: "The largest stadium in the world by capacity.",
        explanation: "It can hold over 100,000 spectators, surpassing all other active stadiums globally."
      },
      {
        stopName: "The Pyongyang Metro",
        imageKeyword: "The Pyongyang Metro",
        description: [
          "This is one of the deepest metro systems in the world, with tracks running over 110 meters (360 feet) underground. The depth serves a dual purpose: public transport and a massive nuclear bunker for the city's population.",
          "The stations are incredibly ornate, designed in the \"Socialist Realism\" style. They feature marble pillars, high arched ceilings, crystal chandeliers, and giant mosaics depicting revolutionary achievements.",
          "Station names do not refer to their geographic location (like \"City Hall\") but rather to socialist themes, such as Puhŭng (Reconstruction), Yŏnggwang (Glory), and Kaison (Triumph)."
        ],
        question: "Why is the Pyongyang Metro built so deep underground?",
        options: [
          "To serve as a nuclear bunker/bomb shelter.",
          "To reach geothermal heat.",
          "Because the soil above was unstable.",
          "To cross under a mountain range."
        ],
        answer: "To serve as a nuclear bunker/bomb shelter.",
        explanation: "The extreme depth allows the tunnels to protect the population in case of war."
      },
      {
        stopName: "Tower of the Juche Idea",
        imageKeyword: "Tower of the Juche Idea",
        description: [
          "Standing 170 meters tall, this granite spire was built to commemorate the 70th birthday of Kim Il Sung. It is dedicated to \"Juche,\" the state ideology of self-reliance.",
          "The tower is constructed from exactly 25,550 granite blocks—one for every day of Kim Il Sung's life up to his 70th birthday (excluding leap years).",
          "At the top sits a massive 20-meter torch made of red glass, which is illuminated from the inside at night to look like a flickering flame watching over the city."
        ],
        question: "What does the number of stone blocks (25,550) in the tower represent?",
        options: [
          "The number of days in Kim Il Sung's life (up to age 70).",
          "The number of soldiers in the army.",
          "The height of the tower in inches.",
          "The year the country was founded."
        ],
        answer: "The number of days in Kim Il Sung's life (up to age 70).",
        explanation: "The architects calculated the days lived by the leader to determine the materials needed."
      },
      {
        stopName: "Kijong-dong",
        imageKeyword: "Kijong-dong",
        description: [
          "Located in the Demilitarized Zone (DMZ), this settlement is visible from South Korea. While North Korea claims it is a thriving farm collective, observers from the South call it a \"Propaganda Village.\"",
          "For decades, the buildings appeared to be empty shells with painted windows and no glass. Lights would turn on and off at the same time in every building, suggesting an automated timer rather than human residents.",
          "It is home to the Panmunjom Flagpole, one of the tallest in the world at 160 meters. It flies a North Korean flag that is so heavy (270 kg) that it tears easily in strong winds and must be replaced frequently."
        ],
        question: "What is the nickname given to Kijong-dong by South Korean observers?",
        options: [
          "Propaganda Village.",
          "Ghost Town.",
          "Freedom City.",
          "The Red Fort."
        ],
        answer: "Propaganda Village.",
        explanation: "It is widely believed to be a fake village built solely to project an image of prosperity to the South."
      }
    ]
  },
  "North Macedonia": {
    tourTitle: "The Land of the Sun",
    introText: "Lake Ohrid is one of the oldest and deepest lakes in Europe. Stroll through the Old Bazaar where Ottoman and European styles mix.",
    stops: [
      {
        stopName: "Lake Ohrid",
        imageKeyword: "Lake Ohrid",
        description: [
          "This UNESCO World Heritage site is one of the oldest lakes in the world, formed between 2 and 3 million years ago. It is home to over 200 endemic species (found nowhere else), including the famous Ohrid Trout.",
          "The town of Ohrid was once known as the \"Jerusalem of the Balkans\" because it allegedly had 365 churches—one for every day of the year. The most iconic is the Church of St. John at Kaneo, perched on a cliff above the water.",
          "The lake is shared with Albania, but the Macedonian side holds the majority of the cultural sites. The water is incredibly clear, allowing visibility down to 20 meters deep."
        ],
        question: "How many churches was Ohrid famous for having in the past?",
        options: [
          "365.",
          "100.",
          "52.",
          "1,000."
        ],
        answer: "365.",
        explanation: "Legend says there was a church for every single day of the year."
      },
      {
        stopName: "Old Bazaar",
        imageKeyword: "Old Bazaar Skopje",
        description: [
          "Located in the capital, Skopje, this is the second-largest Ottoman bazaar in Europe (after the Grand Bazaar in Istanbul). It has been the center of trade and commerce in the city since the 12th century.",
          "The architecture is a mix of Byzantine and Ottoman styles. You can see mosques with lead domes sitting right next to old caravanserais (inns) and hammams (bathhouses) that have been converted into art galleries.",
          "The bazaar survived the massive 1963 earthquake that flattened most of Skopje. While the modern city was rebuilt with brutalist concrete, the bazaar retains its winding, medieval stone streets."
        ],
        question: "Skopje's Old Bazaar is the second largest of its kind in Europe, after which one?",
        options: [
          "The Grand Bazaar in Istanbul.",
          "The Spice Market in Cairo.",
          "The Souk in Marrakech.",
          "The Market in Sarajevo."
        ],
        answer: "The Grand Bazaar in Istanbul.",
        explanation: "It is the largest preserved Ottoman marketplace in the Balkans."
      },
      {
        stopName: "Matka Canyon",
        imageKeyword: "Matka Canyon",
        description: [
          "Located just outside the capital, this canyon was created by the Treska River cutting through the mountains. A dam built in the 1930s flooded the canyon, creating the oldest artificial lake in the country.",
          "It is a hotspot for speleology (cave exploration). The canyon walls are riddled with caves, including Vrelo Cave, which contains enormous stalagmites and two underground lakes.",
          "Vrelo Cave is potentially the deepest underwater cave in the world. Divers have explored it to great depths, but the bottom has still not been reached, leading to speculation about its true limit."
        ],
        question: "Vrelo Cave in Matka Canyon is famous for potentially holding what world record?",
        options: [
          "Deepest underwater cave.",
          "Longest cave.",
          "Largest cave chamber.",
          "Oldest cave paintings."
        ],
        answer: "Deepest underwater cave.",
        explanation: "Exploration is ongoing, but the submerged sections go deeper than almost any other known cave."
      },
      {
        stopName: "Heraclea Lyncestis",
        imageKeyword: "Heraclea Lyncestis",
        description: [
          "Founded by Philip II of Macedon (father of Alexander the Great) in the 4th century BC, this ancient city was an important stop on the Via Egnatia, the Roman road connecting Rome to Constantinople.",
          "The site is famous for its exquisite floor mosaics. The Great Basilica features thousands of tiny colored stones forming intricate scenes of paradise, including fruit trees, birds, and a red dog, which symbolized the mythical guardian of the site.",
          "The ruins include a Roman theater. It was built into the side of a hill to utilize the natural slope for seating, a common Roman engineering technique to save materials."
        ],
        question: "Who founded the city of Heraclea Lyncestis?",
        options: [
          "Philip II of Macedon.",
          "Alexander the Great.",
          "Julius Caesar.",
          "Emperor Constantine."
        ],
        answer: "Philip II of Macedon.",
        explanation: "The ancient Macedonian king established the city in the 4th century BC."
      },
      {
        stopName: "The Painted Mosque",
        imageKeyword: "The Painted Mosque Tetovo",
        description: [
          "This 15th-century mosque is unique in Islamic architecture. Instead of traditional ceramic tiles, the exterior and interior walls are covered in bright, floral frescoes painted using eggs and pigment.",
          "It was financed by two sisters, Hurshida and Mensure. Unlike most mosques which were built by sultans or pashas, this was funded by women, whose graves are located in the garden courtyard.",
          "The decoration includes depictions of Mecca. It is one of the rare instances where an illustration of the holy city is painted directly onto the wall of a mosque in Southeast Europe."
        ],
        question: "What unusual ingredient was used to create the paint for the mosque's frescoes?",
        options: [
          "Eggs.",
          "Milk.",
          "Honey.",
          "Oil."
        ],
        answer: "Eggs.",
        explanation: "Over 30,000 eggs were mixed into the glaze to ensure the durability and brightness of the paintings."
      }
    ]
  },
  "Norway": {
    tourTitle: "The Land of the Midnight Sun",
    introText: "The deep fjords cut into the coast under steep granite cliffs. Watch the midnight sun stay above the horizon in the summer.",
    stops: [
      {
        stopName: "Geirangerfjord",
        imageKeyword: "Geirangerfjord",
        description: [
          "This UNESCO World Heritage site is often considered the most beautiful fjord in the world. It is an S-shaped branch of a larger fjord system, famous for its abandoned farms clinging to high, vertical mountain ledges.",
          "The walls are adorned with the \"Seven Sisters\" waterfall. This set of seven separate streams plunges 250 meters (410 feet) into the fjord directly opposite another waterfall known as \"The Suitor,\" who is eternally trying to woo them.",
          "The water is so deep that massive cruise ships can navigate all the way to the end of the narrow inlet. However, the fjord is threatened by a potential tsunami; if the unstable Åkerneset mountain collapses into the water, it could create a massive wave that would destroy the village of Geiranger."
        ],
        question: "What is the name of the famous waterfall group in Geirangerfjord?",
        options: [
          "The Seven Sisters.",
          "The Five Brothers.",
          "The Three Kings.",
          "The Nine Daughters."
        ],
        answer: "The Seven Sisters.",
        explanation: "Seven distinct streams fall side-by-side into the fjord opposite \"The Suitor\" falls."
      },
      {
        stopName: "Trolltunga",
        imageKeyword: "Trolltunga",
        description: [
          "This iconic rock formation juts horizontally out of a mountain about 700 meters (2,300 feet) above Lake Ringedalsvatnet. The name translates to \"Troll's Tongue\" because of its distinct shape.",
          "Getting there is a grueling physical challenge. The round-trip hike takes 10 to 12 hours and covers 28 kilometers of rough terrain, but the photo opportunity at the tip of the rock attracts thousands of hikers annually.",
          "The rock was formed during the ice age. A massive glacier froze a chunk of the mountain and broke it off, leaving this thin sliver of granite protruding into the air."
        ],
        question: "What does the name \"Trolltunga\" translate to in English?",
        options: [
          "Troll's Tongue.",
          "Giant's Finger.",
          "Dragon's Tooth.",
          "Eagle's Beak."
        ],
        answer: "Troll's Tongue.",
        explanation: "The rock looks like a tongue sticking out from the cliff face."
      },
      {
        stopName: "Lofoten Islands",
        imageKeyword: "Lofoten Islands",
        description: [
          "Located inside the Arctic Circle, these islands are famous for their dramatic scenery of sharp peaks rising directly from the ocean. Despite the latitude, the climate is surprisingly mild due to the warm Gulf Stream current.",
          "The islands are dotted with Rorbuer—traditional red fishermen's cabins built on stilts over the water. Originally simple shacks for seasonal cod fishermen, many have been converted into cozy tourist cottages.",
          "It is the center of the great cod migration (skrei). For centuries, fishermen have come here in winter to catch the migrating cod, drying them on massive wooden outdoor racks to create stockfish, a major export since the Viking Age."
        ],
        question: "What are the traditional red fishermen's cabins in Lofoten called?",
        options: [
          "Rorbuer.",
          "Stave churches.",
          "Yurts.",
          "Chalets."
        ],
        answer: "Rorbuer.",
        explanation: "These stilt-houses were built to house fishermen during the cod season."
      },
      {
        stopName: "Vigeland Sculpture Park",
        imageKeyword: "Vigeland Sculpture Park",
        description: [
          "This is the world's largest sculpture park made by a single artist, Gustav Vigeland. It contains over 200 sculptures in bronze, granite, and wrought iron, depicting the human lifecycle from birth to death.",
          "The centerpiece is \"The Monolith.\" It is a 14-meter tall column carved from a single block of granite, featuring 121 human figures climbing over each other to reach the top, symbolizing the human desire to reach the divine.",
          "One of the most famous statues is the \"Angry Boy\" (Sinnataggen). It depicts a small child throwing a tantrum, stomping his foot and clenching his fists; his left hand shines gold because so many tourists touch it for good luck."
        ],
        question: "The Vigeland Park is unique because all the sculptures were created by whom?",
        options: [
          "A single artist (Gustav Vigeland).",
          "Multiple famous artists.",
          "The King of Norway.",
          "Unknown ancient sculptors."
        ],
        answer: "A single artist (Gustav Vigeland).",
        explanation: "It is the largest collection of work by one sculptor in a single park."
      },
      {
        stopName: "Svalbard",
        imageKeyword: "Svalbard Global Seed Vault",
        description: [
          "Located on the island of Spitsbergen, halfway between Norway and the North Pole, this facility is known as the \"Doomsday Vault.\" It is built deep inside a permafrost mountain to store backup seeds for the world's food crops.",
          "It is designed to withstand nuclear war and natural disasters. Even if the cooling systems fail, the natural permafrost will keep the seeds frozen for centuries, ensuring humanity can restart agriculture after a global catastrophe.",
          "The entrance is an art installation. The roof and front are covered in fiber optics and mirrors that reflect the polar light, making the vault sparkle like a diamond in the dark Arctic winter."
        ],
        question: "What is the primary purpose of the Svalbard Global Seed Vault?",
        options: [
          "To store backup seeds for world crops.",
          "To store nuclear waste.",
          "To house scientists.",
          "To protect gold reserves."
        ],
        answer: "To store backup seeds for world crops.",
        explanation: "It acts as an insurance policy against the loss of plant diversity due to war or disaster."
      }
    ]
  }
};