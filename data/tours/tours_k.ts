import { TourData } from "../../types";

export const toursK: Record<string, TourData> = {
  "Kazakhstan": {
    tourTitle: "The Great Steppe",
    introText: "Rockets launch into space from the world's first and largest cosmodrome. Gallop across the endless grassy steppe on a sturdy horse.",
    stops: [
      {
        stopName: "Baikonur Cosmodrome",
        imageKeyword: "Baikonur Cosmodrome",
        description: [
          "Located in the vast Kazakh steppe, this is the world's first and largest operational space launch facility. It is leased by the Russian government and remains the primary launch site for crewed missions to the International Space Station.",
          "This is the site where history was made: Sputnik 1 (the first artificial satellite) and Yuri Gagarin (the first human in space) were both launched from here. The launchpad used for Gagarin's flight is still known as \"Gagarin's Start.\"",
          "Visitors can watch rocket launches live. Specialized tours allow tourists to witness the rollout of the massive Soyuz rockets and feel the ground shake as they blast off into the atmosphere."
        ],
        question: "Who was the first human in space, launched from Baikonur?",
        options: [
          "Yuri Gagarin.",
          "Neil Armstrong.",
          "Buzz Aldrin.",
          "Valentina Tereshkova."
        ],
        answer: "Yuri Gagarin.",
        explanation: "The Soviet cosmonaut blasted off from this site in 1961 to become the first person to orbit Earth."
      },
      {
        stopName: "Charyn Canyon",
        imageKeyword: "Charyn Canyon",
        description: [
          "Often called the \"Grand Canyon's Little Brother,\" this dramatic gorge stretches for 90 kilometers along the Charyn River. While smaller than the American version, it features equally impressive red sandstone formations carved by wind and water.",
          "The most famous section is the \"Valley of Castles.\" Here, the erosion has sculpted the rock into shapes that look like medieval towers, fortress walls, and gargoyles, glowing bright orange in the sunset.",
          "The canyon contains a rare relic: a grove of Sogdian Ash trees. This species survived the Ice Age and is now found in only a few places on Earth, protected here by the shelter of the canyon walls."
        ],
        question: "What is the nickname for the most scenic part of Charyn Canyon?",
        options: [
          "The Valley of Castles.",
          "The Red Maze.",
          "The Devil's Throat.",
          "The Silent City."
        ],
        answer: "The Valley of Castles.",
        explanation: "The rock formations closely resemble man-made towers and fortress walls."
      },
      {
        stopName: "The Golden Man",
        imageKeyword: "The Golden Man",
        description: [
          "Discovered in 1969 in a burial mound (kurgan), the \"Golden Man\" is the most famous archaeological find in Kazakhstan. It is the skeleton of a Scythian warrior prince (or princess) buried in a suit made of over 4,000 gold pieces.",
          "The gold armor is incredibly intricate, featuring motifs of snow leopards, deer, and griffins. This \"animal style\" art proves the sophistication of the nomadic Scythian culture that ruled the steppe 2,500 years ago.",
          "The Golden Man has become the national symbol of modern Kazakhstan. A statue of the warrior stands atop the Independence Monument in Almaty, and the golden winged leopard on his headdress appears on the president's standard."
        ],
        question: "The Golden Man belonged to which ancient nomadic culture?",
        options: [
          "The Scythians (Saka).",
          "The Mongols.",
          "The Huns.",
          "The Vikings."
        ],
        answer: "The Scythians (Saka).",
        explanation: "They were a powerful nomadic people who dominated the Eurasian Steppe in antiquity."
      },
      {
        stopName: "Kaindy Lake",
        imageKeyword: "Kaindy Lake",
        description: [
          "This \"Sunken Forest\" was created in 1911 after an earthquake triggered a massive limestone landslide that blocked a gorge. Rainwater filled the valley, submerging the spruce forest that grew there.",
          "The water is extremely cold, which has preserved the trees perfectly for over a century. While the parts of the trees above water are bare, stripped trunks, the parts under the water still have their needles and branches, looking like a green underwater forest.",
          "The water color is a startling, almost unnatural turquoise. This is caused by limestone deposits and algae in the glacial water, creating a surreal contrast with the grey tree trunks sticking out of the surface."
        ],
        question: "Why are the underwater branches of the trees in Kaindy Lake still intact?",
        options: [
          "The extreme cold water preserves them.",
          "The water is full of salt.",
          "They are made of stone.",
          "The lake was formed yesterday."
        ],
        answer: "The extreme cold water preserves them.",
        explanation: "The near-freezing temperatures prevent the wood and needles from decomposing."
      },
      {
        stopName: "Astana",
        imageKeyword: "Khan Shatyr",
        description: [
          "The capital city, Astana (formerly Nur-Sultan), is a futuristic city built from scratch on the northern steppe. Its skyline is filled with wild, experimental architecture, including the Khan Shatyr Entertainment Center.",
          "Designed by Norman Foster, Khan Shatyr is the largest tent in the world. It is 150 meters high and made of a transparent plastic material that absorbs heat, maintaining a tropical temperature inside even when it is -40°C outside.",
          "Inside the tent is a beach resort with sand imported from the Maldives. Residents of the freezing capital can swim in warm water and play volleyball on white sand in the middle of winter, protected by the giant plastic canopy."
        ],
        question: "What is inside the Khan Shatyr tent that makes it popular in winter?",
        options: [
          "A tropical beach resort.",
          "A ski slope.",
          "A rocket museum.",
          "A giant library."
        ],
        answer: "A tropical beach resort.",
        explanation: "The climate-controlled interior features a warm beach with imported sand, defying the freezing steppe winter."
      }
    ]
  },
  "Kenya": {
    tourTitle: "The Pride of Africa",
    introText: "Millions of wildebeest cross the river during the Great Migration. Watch the sunrise over the savannah with the Maasai warriors.",
    stops: [
      {
        stopName: "Maasai Mara National Reserve",
        imageKeyword: "Maasai Mara Migration",
        description: [
          "This is the stage for the \"Great Migration,\" often cited as the Eighth Wonder of the World. Every year between July and October, over 1.5 million wildebeest and zebras migrate north from Tanzania in search of fresh grass.",
          "The most dramatic moment is the crossing of the Mara River. The herds must plunge into the water, battling strong currents and massive Nile crocodiles that lie in wait for the feast.",
          "It is named after the Maasai people (the ancestral inhabitants) and the Mara River. The word \"Mara\" means \"spotted\" in the local language, referring to the landscape dotted with short bushy trees and cloud shadows."
        ],
        question: "What major obstacle must the herds cross during the migration in the Maasai Mara?",
        options: [
          "The Mara River.",
          "The Great Wall.",
          "The Sahara Desert.",
          "The Nile Delta."
        ],
        answer: "The Mara River.",
        explanation: "The river crossing is the most dangerous part of the journey due to drowning and crocodiles."
      },
      {
        stopName: "Amboseli National Park",
        imageKeyword: "Amboseli Elephants",
        description: [
          "While Mount Kilimanjaro is actually in Tanzania, the best iconic views of it are seen from this park in Kenya. The sight of elephants walking against the backdrop of the snow-capped peak is one of Africa's most famous images.",
          "The park is known for its \"tuskers\"—elephants with genes that produce tusks so large they almost touch the ground. Because the ground is flat and open, it is considered one of the best places in the world to get close to wild elephants.",
          "The terrain is an ancient dried-up lake bed. The ash from the volcano enriches the soil, but the dust can be intense; whirlwinds known as \"dust devils\" frequently dance across the plains."
        ],
        question: "Although seen from Kenya's Amboseli Park, Mount Kilimanjaro is located in which country?",
        options: [
          "Tanzania.",
          "Uganda.",
          "Ethiopia.",
          "South Africa."
        ],
        answer: "Tanzania.",
        explanation: "The mountain sits just across the border, but the park offers the famous panoramic view of it."
      },
      {
        stopName: "Lamu Old Town",
        imageKeyword: "Lamu Old Town",
        description: [
          "Located on an island off the coast, this is the oldest and best-preserved Swahili settlement in East Africa. The architecture is a unique fusion of African, Arab, and Indian styles, built from coral stone and mangrove timber.",
          "There are no cars on the island. The streets are too narrow for vehicles, so the only way to get around is by walking or riding a donkey. There are over 3,000 donkeys on the island, and they even have their own donkey ambulance.",
          "The town is famous for its intricately carved wooden doors. In the past, the size and detail of a front door were status symbols indicating the wealth and power of the family living inside."
        ],
        question: "What is the primary mode of transport in Lamu Old Town?",
        options: [
          "Donkeys.",
          "Cars.",
          "Camels.",
          "Bicycles."
        ],
        answer: "Donkeys.",
        explanation: "The ancient streets are too narrow for cars, so residents rely on donkeys for transport."
      },
      {
        stopName: "Lake Turkana",
        imageKeyword: "Lake Turkana",
        description: [
          "Known as the \"Jade Sea\" due to its stunning color, this is the world's largest permanent desert lake. It sits in a harsh, volcanic landscape in the far north that looks like the surface of the moon.",
          "The area is regarded as the \"Cradle of Mankind.\" Some of the most important human fossil discoveries were made here, including \"Turkana Boy,\" a nearly complete skeleton of Homo erectus dating back 1.6 million years.",
          "The lake is notorious for its fierce winds and high crocodile population. It supports the world's largest colony of Nile crocodiles, which thrive here despite the salinity of the water."
        ],
        question: "Why is Lake Turkana often called the \"Cradle of Mankind\"?",
        options: [
          "Important ancient human fossils were found there.",
          "It is the oldest lake.",
          "It is where civilization started.",
          "It is shaped like a baby."
        ],
        answer: "Important ancient human fossils were found there.",
        explanation: "The region has yielded critical evidence of early human evolution, including Homo erectus skeletons."
      },
      {
        stopName: "Mount Kenya",
        imageKeyword: "Mount Kenya",
        description: [
          "Rising to 5,199 meters (17,057 feet), this extinct volcano is the second-highest mountain in Africa. It is so massive that it influences the country's rainfall patterns and gave the nation of Kenya its name.",
          "Uniquely, you can find snow and ice here right on the equator. The mountain has 11 small glaciers, though they are shrinking rapidly due to climate change and may disappear within a few decades.",
          "For the local Kikuyu people, the mountain is the throne of God (Ngai). Traditionally, they built their homes with the doors facing the mountain so they could always look toward the dwelling place of the divine."
        ],
        question: "What unique weather feature can be found on Mount Kenya despite it being on the equator?",
        options: [
          "Snow (and glaciers).",
          "Sandstorms.",
          "Hurricanes.",
          "Tornadoes."
        ],
        answer: "Snow (and glaciers).",
        explanation: "The extreme altitude allows ice to exist permanently even in the tropical heat of the equator."
      }
    ]
  },
  "Kiribati": {
    tourTitle: "The Nation of Water",
    introText: "The eastern islands are the first in the world to welcome the new day. Swim in the vast protected ocean reserve of the Phoenix Islands.",
    stops: [
      {
        stopName: "Kiritimati",
        imageKeyword: "Kiritimati Atoll",
        description: [
          "This island holds the title of the largest coral atoll in the world by land area. It accounts for nearly 70% of the entire landmass of the country, yet it is incredibly flat and remote.",
          "During the Cold War, it was used by both the British and Americans for nuclear weapons testing. Residents were often not evacuated, and the legacy of these tests remains a part of the island's complex history.",
          "It is a world-famous destination for fly fishing. Anglers travel thousands of miles to wade in the shallow, crystalline flats to catch Bonefish, known as the \"ghosts of the flats\" for their speed and stealth."
        ],
        question: "Kiritimati holds the world record for being the largest what?",
        options: [
          "Coral atoll (by land area).",
          "Volcanic island.",
          "Freshwater lake.",
          "Floating market."
        ],
        answer: "Coral atoll (by land area).",
        explanation: "While most atolls are thin rings, Kiritimati has a massive land area compared to others."
      },
      {
        stopName: "Phoenix Islands Protected Area",
        imageKeyword: "Phoenix Islands Coral",
        description: [
          "This is one of the largest marine protected areas on Earth, roughly the size of California. It is almost entirely uninhabited, serving as a sanctuary where the ocean ecosystem functions exactly as it did a thousand years ago.",
          "Because fishing is banned, the reefs are dominated by top predators. It is one of the few places left where you can see \"pristine\" coral reefs, where sharks and large groupers outnumber the smaller prey fish.",
          "The reserve includes an underwater mountain range (seamounts). These submerged volcanoes create upwellings of nutrient-rich water that feed massive colonies of deep-sea corals and migratory tuna."
        ],
        question: "What is the primary ecological characteristic of the Phoenix Islands Protected Area?",
        options: [
          "It is a massive \"no-take\" marine reserve.",
          "It is a nuclear testing site.",
          "It is a major oil field.",
          "It is a luxury resort zone."
        ],
        answer: "It is a massive \"no-take\" marine reserve.",
        explanation: "Commercial fishing and extraction are banned to protect the pristine ocean life."
      },
      {
        stopName: "Caroline Island",
        imageKeyword: "Millennium Island",
        description: [
          "Located in the Line Islands chain, this uninhabited atoll was famously renamed \"Millennium Island\" in the year 2000. Because of a realignment of the International Date Line, it became the first place on Earth to see the sunrise of the new millennium.",
          "It is considered one of the most pristine tropical islands in the world. Since no humans live there and visitors are rare, it remains a perfect example of a pure atoll ecosystem with huge populations of coconut crabs.",
          "The island is a major breeding ground for the Sooty Tern. At certain times of the year, the ground is so thick with nesting birds that it is almost impossible to walk without stepping on an egg."
        ],
        question: "Why was Caroline Island renamed \"Millennium Island\"?",
        options: [
          "It was the first place to witness the sunrise of the year 2000.",
          "It was discovered in the year 2000.",
          "It was bought by a millionaire.",
          "It has 1,000 palm trees."
        ],
        answer: "It was the first place to witness the sunrise of the year 2000.",
        explanation: "The government adjusted the time zone so the island would be the first to enter the new millennium."
      },
      {
        stopName: "Betio",
        imageKeyword: "Betio WWII Relics",
        description: [
          "This small islet was the site of the Battle of Tarawa in 1943, one of the bloodiest battles in the Pacific Theater of World War II. Over 6,000 men (Americans and Japanese) died here in just 76 hours of fighting.",
          "The landscape is still scarred by the war. Massive rusted coastal defense guns, Japanese command bunkers, and sunken Sherman tanks in the lagoon remain visible today, sitting right next to modern homes.",
          "Tarawa is also the capital and is incredibly densely populated. The contrast between the overcrowding of the capital and the emptiness of the outer islands highlights the challenge of living in a nation with very little dry land."
        ],
        question: "Which major WWII battle took place on the islet of Betio?",
        options: [
          "The Battle of Tarawa.",
          "The Battle of Midway.",
          "The Battle of Iwo Jima.",
          "The Battle of Pearl Harbor."
        ],
        answer: "The Battle of Tarawa.",
        explanation: "It was a ferocious amphibious assault that left the island covered in wreckage that is still there today."
      },
      {
        stopName: "The Maneaba",
        imageKeyword: "Maneaba Meeting House",
        description: [
          "The Maneaba is the heart of Kiribati culture. It is a massive community meeting house with a soaring roof supported by coral stone pillars, designed to keep the interior cool by encouraging airflow.",
          "It serves as the village parliament, court, and gathering place. Strict etiquette must be followed inside; for example, it is forbidden to stand upright when moving around (you must stoop) to show respect to the elders.",
          "The construction of a Maneaba is done without nails. The timber beams are lashed together using coconut fiber sennit rope, tied in intricate geometric patterns that are unique to each clan or builder."
        ],
        question: "What is the traditional function of the Maneaba building?",
        options: [
          "It is a community meeting house (village parliament).",
          "It is a food storage warehouse.",
          "It is a boat repair shop.",
          "It is a family home."
        ],
        answer: "It is a community meeting house (village parliament).",
        explanation: "It serves as the central hub for all governance, social gatherings, and decision-making in the village."
      }
    ]
  },
  "Kuwait": {
    tourTitle: "The Fortress",
    introText: "The distinct blue spheres of the Kuwait Towers overlook the Persian Gulf. Shop for gold and spices in the traditional Souq Al-Mubarakiya.",
    stops: [
      {
        stopName: "Kuwait Towers",
        imageKeyword: "Kuwait Towers",
        description: [
          "These three towers are the ultimate symbol of modern Kuwait. The main tower features two spheres: the upper one is a revolving restaurant and viewing deck, while the lower one holds water.",
          "They serve a practical utility as part of a nationwide water distribution network. The spheres can hold up to one million gallons of water, crucial for a desert nation that relies almost entirely on desalination.",
          "The spheres are covered in 55,000 enameled steel discs painted in eight different shades of blue, green, and gray. This design mimics the overlapping tiles of traditional mosque domes."
        ],
        question: "What practical substance is stored inside the spheres of the Kuwait Towers?",
        options: [
          "Water.",
          "Oil.",
          "Gold.",
          "Grain."
        ],
        answer: "Water.",
        explanation: "They act as massive, decorative water towers for the city's supply."
      },
      {
        stopName: "Souq Al-Mubarakiya",
        imageKeyword: "Souq Al-Mubarakiya",
        description: [
          "This is one of the oldest souqs in Kuwait, having been the center of trade for over 200 years. Before the discovery of oil, this was where merchants traded dates, pearls, and spices brought in from India and Africa.",
          "The market is famous for its Persian silk carpets and authentic Arab perfumes (Oud and Musk). The scent of burning bukhoor (incense) fills the air as you walk through the covered alleys.",
          "It retains its traditional architecture with wooden ceilings and open courtyards. It is the best place to eat authentic Kuwaiti dishes like Machboos (spiced rice with meat) sitting on outdoor benches."
        ],
        question: "What traditional incense scent fills the air of the souq?",
        options: [
          "Bukhoor (or Oud).",
          "Lavender.",
          "Pine.",
          "Vanilla."
        ],
        answer: "Bukhoor (or Oud).",
        explanation: "Wood chips soaked in fragrant oils are burned to perfume the market and clothing."
      },
      {
        stopName: "The Grand Mosque",
        imageKeyword: "The Grand Mosque Kuwait",
        description: [
          "This is the largest mosque in the country, capable of holding up to 11,000 worshippers. The design is a blend of Andalusian and traditional Islamic styles, featuring intricate geometric patterns and calligraphy.",
          "The main prayer hall is illuminated by 144 windows. These windows are arranged to flood the vast space with natural light during the day, highlighting the massive central dome which is decorated with the Asma al-Husna (the 99 names of God).",
          "The Emir's room is located here. It is a private chamber used by the Emir of Kuwait during religious holidays, decorated with hand-carved gypsum and wood imported from Morocco."
        ],
        question: "How many worshippers can the Grand Mosque accommodate?",
        options: [
          "Up to 11,000.",
          "500.",
          "1 million.",
          "50."
        ],
        answer: "Up to 11,000.",
        explanation: "The massive main hall and courtyard are designed for large state and religious gatherings."
      },
      {
        stopName: "Failaka Island",
        imageKeyword: "Failaka Island",
        description: [
          "Located 20km off the coast, this island has a history stretching back to the Bronze Age. It was once a strategic outpost for Alexander the Great, who named the island \"Ikaros\" after the mythological figure who flew too close to the sun.",
          "Visitors can explore the ruins of a Hellenistic (Greek) fortress and temples. It is one of the few places in the Persian Gulf where you can find ancient Greek architecture mixed with local Dilmun civilization artifacts.",
          "The island also bears the scars of the 1990 Gulf War. Many modern buildings were destroyed by invading Iraqi forces and have been left as bullet-riddled ruins, turning parts of the island into an open-air museum of war."
        ],
        question: "What name did Alexander the Great give to Failaka Island?",
        options: [
          "Ikaros.",
          "Atlantis.",
          "Troy.",
          "Sparta."
        ],
        answer: "Ikaros.",
        explanation: "The Greeks established a colony here and named it after the son of Daedalus."
      },
      {
        stopName: "The Mirror House",
        imageKeyword: "The Mirror House",
        description: [
          "This is the only house in the world entirely covered in mirror mosaics. It was created by Italian-Kuwaiti artist Lidia al-Qattan, who spent nearly 30 years gluing tons of mirror shards onto the walls, floors, and furniture of her private home.",
          "The project began when her daughter broke a mirror. Superstitious that it would bring bad luck, Lidia decided to use the shards to create art on a cabinet, and eventually, the obsession spread to cover the entire building.",
          "Each room has a theme, such as the \"Planet Earth\" room or the \"Zodiac\" hallway. The result is a glittering, psychedelic environment that reflects light in every direction."
        ],
        question: "Why did artist Lidia al-Qattan start covering her house in mirrors?",
        options: [
          "Her daughter broke a mirror (and she wanted to avoid bad luck).",
          "She owned a glass factory.",
          "It was a government order.",
          "To reflect the heat."
        ],
        answer: "Her daughter broke a mirror (and she wanted to avoid bad luck).",
        explanation: "She repurposed the broken shards into art, which evolved into a decades-long project."
      }
    ]
  },
  "Kyrgyzstan": {
    tourTitle: "The Land of Celestial Mountains",
    introText: "Nomads still live in round yurts among the Celestial Mountains. Hike to an alpine lake that never freezes despite the cold.",
    stops: [
      {
        stopName: "Issyk-Kul Lake",
        imageKeyword: "Issyk-Kul Lake",
        description: [
          "This is the second-largest alpine lake in the world (after Lake Titicaca). Its name translates to \"Warm Lake\" because it never freezes, even in the depths of winter when the air temperature drops to -25°C.",
          "The lack of freezing is due to high salinity and thermal activity deep underwater. The lake creates its own microclimate, making the surrounding valley milder and perfect for fruit orchards.",
          "Soviet cosmonauts, including Yuri Gagarin, used the shores of this lake for rehabilitation after returning from space. The altitude and calm waters were considered perfect for recovering from the physical stress of zero gravity."
        ],
        question: "What does the name \"Issyk-Kul\" translate to?",
        options: [
          "Warm Lake.",
          "Blue Pearl.",
          "Dragon's Eye.",
          "Sky Mirror."
        ],
        answer: "Warm Lake.",
        explanation: "It is named for the phenomenon that keeps the water liquid while the land around it freezes."
      },
      {
        stopName: "Burana Tower",
        imageKeyword: "Burana Tower",
        description: [
          "This stump-like tower is all that remains of the ancient city of Balasagun, a major capital on the Silk Road. It was originally 45 meters tall, but earthquakes over the centuries shook the top half off, leaving it standing at just 25 meters today.",
          "The field around the tower is filled with Balbals. These are ancient stone markers carved with human faces, often holding a cup or a sword, which were placed on the graves of Turkic warriors to honor their spirits.",
          "You can climb the dark, winding staircase inside the minaret. It is incredibly narrow and steep, but the top offers a panoramic view of the Chuy Valley and the distant Tian Shan mountains."
        ],
        question: "What are the stone statues with faces found near the tower called?",
        options: [
          "Balbals.",
          "Totems.",
          "Gargoyles.",
          "Moai."
        ],
        answer: "Balbals.",
        explanation: "These grave markers depict the ancestors or enemies of ancient Turkic warriors."
      },
      {
        stopName: "Song-Kul Lake",
        imageKeyword: "Song-Kul Yurts",
        description: [
          "Located at an altitude of 3,016 meters, this lake is accessible only in summer. It is surrounded by lush pastures (jailoo) where semi-nomadic shepherds bring their livestock to graze during the warm months.",
          "There are no hotels or permanent buildings here. Visitors stay in traditional felt yurts, sleeping on thick mats on the floor warmed by a stove burning dried dung, just as the nomads have done for thousands of years.",
          "It is a prime location to watch the game of Kok-Boru. This is a traditional equestrian sport similar to polo, but instead of a ball, the riders use the headless carcass of a goat, wrestling to throw it into the goal."
        ],
        question: "What fuel is typically used to heat yurts at Song-Kul?",
        options: [
          "Dried animal dung.",
          "Coal.",
          "Natural gas.",
          "Solar power."
        ],
        answer: "Dried animal dung.",
        explanation: "Because the high altitude creates a treeless landscape, wood is scarce, so dung is the primary fuel source."
      },
      {
        stopName: "Tash Rabat",
        imageKeyword: "Tash Rabat Caravanserai",
        description: [
          "This 15th-century stone structure is one of the best-preserved caravanserais in Central Asia. It sits deep in a remote valley near the Chinese border, serving as a hotel and fortress for merchants traveling the Silk Road.",
          "The architecture is unique because it is built entirely of stone, whereas most buildings in the region were made of mud brick. It is partly embedded into the hillside, giving it a bunker-like appearance to protect against bandits and blizzards.",
          "Legends differ on its origin. While historians confirm it was a trade stop, local myths claim it was a Nestorian Christian monastery built centuries earlier, pointing to the unusual layout of the central dome."
        ],
        question: "Tash Rabat primarily served what function on the Silk Road?",
        options: [
          "A Caravanserai (inn/hotel).",
          "A prison.",
          "A royal palace.",
          "A toll gate."
        ],
        answer: "A Caravanserai (inn/hotel).",
        explanation: "It provided shelter and safety for merchants and their animals crossing the dangerous mountain passes."
      },
      {
        stopName: "Jeti-Oguz",
        imageKeyword: "Jeti-Oguz Rocks",
        description: [
          "The name means \"Seven Bulls\" in Kyrgyz, referring to the line of seven massive red sandstone cliffs that resemble kneeling bulls.",
          "Nearby is the \"Broken Heart\" rock. Legend says two suitors fought to the death for a beautiful woman; her heart was broken by the tragedy, and the rock split in two, bleeding red clay into the earth.",
          "The valley behind the rocks is famous for its apiaries. The region produces some of the best honey in the country, and the road is lined with beekeepers selling jars of fresh mountain honey."
        ],
        question: "What animal do the red rock formations of Jeti-Oguz resemble?",
        options: [
          "Bulls.",
          "Horses.",
          "Bears.",
          "Eagles."
        ],
        answer: "Bulls.",
        explanation: "The seven distinct peaks look like a row of bulls kneeling on the ground."
      }
    ]
  }
};