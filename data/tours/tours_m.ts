import { TourData } from "../../types";

export const toursM: Record<string, TourData> = {
  "Madagascar": {
    tourTitle: "The Eighth Continent",
    introText: "Lemurs leap through the unique spiny forests found only on this island. Walk down the famous Avenue of the Baobabs at sunset.",
    stops: [
      {
        stopName: "Avenue of the Baobabs",
        imageKeyword: "Avenue of the Baobabs",
        description: [
          "This dusty road in the Menabe region is lined with Grandidier's baobabs, majestic trees that stand up to 30 meters (98 feet) tall. These giants are up to 800 years old and are the legacy of dense tropical forests that were cleared for agriculture.",
          "The trees are known as renala (\"mother of the forest\") in the local language. They look like they are planted upside down, with their gnarled branches resembling roots sticking up into the sky.",
          "They are perfectly adapted to drought. The massive, swollen trunks are actually water storage tanks, capable of holding thousands of liters of rainwater to help the tree survive the dry season."
        ],
        question: "Why do Baobab trees have such thick, swollen trunks?",
        options: [
          "To store water.",
          "To resist fire.",
          "To look taller.",
          "To house spirits."
        ],
        answer: "To store water.",
        explanation: "They act as reservoirs, storing vast amounts of water to survive long periods without rain."
      },
      {
        stopName: "Tsingy de Bemaraha",
        imageKeyword: "Tsingy de Bemaraha",
        description: [
          "This UNESCO World Heritage site is a \"stone forest\" made of razor-sharp limestone pinnacles. The name \"Tsingy\" translates to \"where one cannot walk barefoot,\" a practical warning about the jagged terrain.",
          "The rock formations were created by groundwater dissolving the limestone plateau over millions of years. This created deep slot canyons and caves beneath the spikes, forming a fortress that is almost impenetrable to humans.",
          "Despite the harsh environment, lemurs thrive here. The Decken's sifaka, a white lemur, is famous for leaping effortlessly between the sharp stone needles without getting cut, using its thick pads and precise agility."
        ],
        question: "What does the word \"Tsingy\" mean in the local Malagasy language?",
        options: [
          "Where one cannot walk barefoot.",
          "The grey forest.",
          "The sharp teeth.",
          "The holy rock."
        ],
        answer: "Where one cannot walk barefoot.",
        explanation: "It refers to the extremely sharp and jagged nature of the eroded limestone rocks."
      },
      {
        stopName: "Andasibe-Mantadia National Park",
        imageKeyword: "Andasibe-Mantadia National Park",
        description: [
          "This rainforest park is the best place to find the Indri, the largest living lemur. They are famous for their haunting, whale-like song that can be heard up to 3 kilometers away as family groups communicate across the canopy.",
          "Unlike most other lemurs, the Indri has almost no tail. It relies on its powerful legs to launch itself from tree to tree, often traveling in a vertical upright position.",
          "The forest is also home to the Giraffe Weevil. This bizarre red insect has an incredibly long neck (especially the males) that looks like a construction crane, which it uses to fight other males for mates."
        ],
        question: "What is the distinctive characteristic of the Indri lemur's call?",
        options: [
          "It is a loud, haunting song (like a whale).",
          "It sounds like a bark.",
          "It is silent.",
          "It mimics birds."
        ],
        answer: "It is a loud, haunting song (like a whale).",
        explanation: "The wailing sound is used to mark territory and keeps family groups together in the dense forest."
      },
      {
        stopName: "Isalo National Park",
        imageKeyword: "Isalo National Park",
        description: [
          "Known as the \"Colorado of Madagascar,\" this park features a Jurassic landscape of eroded sandstone canyons and wind-sculpted rocks. It is a stark contrast to the lush rainforests found elsewhere on the island.",
          "Hidden inside the dry canyons are lush oases. The most famous is the \"Piscine Naturelle\" (Natural Pool), a crystal-clear swimming hole fed by a waterfall and fringed with pandanus trees, offering a cool escape from the heat.",
          "The park is a sacred burial ground for the Bara tribe. For centuries, they have placed their dead in temporary coffins inside the high caves of the canyon walls before moving them to permanent tombs."
        ],
        question: "Isalo National Park is often compared to which American landscape?",
        options: [
          "Colorado (The Grand Canyon).",
          "The Amazon Rainforest.",
          "The Alaskan Tundra.",
          "The Mississippi Delta."
        ],
        answer: "Colorado (The Grand Canyon).",
        explanation: "The deep sandstone canyons and eroded rock formations resemble the American Southwest."
      },
      {
        stopName: "Royal Hill of Ambohimanga",
        imageKeyword: "Royal Hill of Ambohimanga",
        description: [
          "This site is the spiritual heart of the Merina people and the birthplace of the kingdom that eventually united Madagascar. For centuries, it was a \"forbidden city\" where no foreigners were allowed to enter.",
          "The site includes the King's palace and the royal tombs. The main gate is protected by a massive round stone disc that served as a door; it took at least 20 strong men to roll it aside to open the entrance each morning.",
          "The walls were built using a mortar made of egg whites. According to tradition, millions of egg whites were mixed with lime to create the cement that holds the fortress walls together."
        ],
        question: "What ingredient was mixed into the mortar of the walls at Ambohimanga?",
        options: [
          "Egg whites.",
          "Honey.",
          "Cow dung.",
          "Rice paste."
        ],
        answer: "Egg whites.",
        explanation: "They acted as a binding agent for the lime cement used to construct the royal fortress."
      }
    ]
  },
  "Malawi": {
    tourTitle: "The Warm Heart of Africa",
    introText: "The clear waters of the \"Lake of Stars\" cover a huge portion of the land. Snorkel among hundreds of colorful cichlid fish found nowhere else.",
    stops: [
      {
        stopName: "Lake Malawi National Park",
        imageKeyword: "Lake Malawi National Park",
        description: [
          "This UNESCO World Heritage site is the world's first freshwater national park. The lake itself is massive, covering about one-third of the entire country, and is known as the \"Lake of Stars\" because of the lantern lights from fishermen's boats at night.",
          "It contains the largest number of fish species of any lake in the world, estimated at over 1,000. Most of these are Cichlids, colorful fish that have evolved into hundreds of unique species within the isolated waters of the lake, similar to Darwin's finches.",
          "The water is distinctively calm and clear. Because it is an ancient rift lake, it is incredibly deep (up to 700 meters) and lacks the dangerous currents of the ocean, making it perfect for kayaking and snorkeling."
        ],
        question: "What nickname did explorer David Livingstone give to Lake Malawi?",
        options: [
          "The Lake of Stars.",
          "The Blue Abyss.",
          "The Silver Sea.",
          "The Inland Ocean."
        ],
        answer: "The Lake of Stars.",
        explanation: "He was inspired by the thousands of lanterns reflecting on the water from the fishermen's boats."
      },
      {
        stopName: "Mount Mulanje",
        imageKeyword: "Mount Mulanje",
        description: [
          "Known as the \"Island in the Sky,\" this granite massif rises sharply from the surrounding plains to a height of 3,002 meters (9,849 feet). It creates its own microclimate, often shrouded in clouds while the land below is sunny.",
          "The slopes are covered in emerald-green tea plantations. Malawi was the first country in Africa to grow tea commercially, and the orderly rows of bushes at the base of the wild mountain create a stunning visual contrast.",
          "It is the only home of the Mulanje Cedar. This rare tree is the national tree of Malawi and is prized for its fragrant, rot-resistant wood, though it is now critically endangered due to illegal logging."
        ],
        question: "What is the national tree of Malawi, found only on this mountain?",
        options: [
          "The Mulanje Cedar.",
          "The Baobab.",
          "The Ebony.",
          "The Mahogany."
        ],
        answer: "The Mulanje Cedar.",
        explanation: "This endemic cypress tree grows exclusively on the high slopes of the Mulanje massif."
      },
      {
        stopName: "Liwonde National Park",
        imageKeyword: "Liwonde National Park",
        description: [
          "Located along the Shire River, this park offers some of the best wildlife viewing in the country. Because the river is the main water source, boat safaris are the highlight, allowing visitors to float past hundreds of hippos and crocodiles.",
          "It is a major conservation success story. After years of poaching, the park was taken over by African Parks, which reintroduced lions, cheetahs, and black rhinos, restoring the \"Big Five\" status to the reserve.",
          "The riverbanks are a birdwatcher's paradise. It is one of the best places to spot the African Fish Eagle, the national bird of Malawi, whose haunting call is considered the \"sound of Africa.\""
        ],
        question: "What is the national bird of Malawi, frequently seen in Liwonde?",
        options: [
          "The African Fish Eagle.",
          "The Ostrich.",
          "The Peacock.",
          "The Vulture."
        ],
        answer: "The African Fish Eagle.",
        explanation: "This iconic raptor is found in high density along the Shire River."
      },
      {
        stopName: "Chongoni Rock Art Area",
        imageKeyword: "Chongoni Rock Art Area",
        description: [
          "Hidden in the granite hills of central Malawi, this area contains the highest concentration of rock art in Central Africa. There are 127 recorded sites featuring paintings that date back as far as the Stone Age.",
          "The art was created by two different groups: the Batwa hunter-gatherers (red geometric paintings) and the Chewa farmers (white clay paintings).",
          "The white paintings are associated with the Nyau secret society. These images depict masked figures and spirits and are still culturally relevant today, linking the ancient art to modern Chewa initiation rituals and funerals."
        ],
        question: "The white rock paintings are associated with which Chewa secret society?",
        options: [
          "The Nyau society.",
          "The Freemasons.",
          "The Leopard Men.",
          "The Spirit Walkers."
        ],
        answer: "The Nyau society.",
        explanation: "The paintings depict the masked dancers (Gule Wamkulu) used in their spiritual ceremonies."
      },
      {
        stopName: "Likoma Island",
        imageKeyword: "Likoma Island",
        description: [
          "Geographically, this island is located in Mozambican waters, but it belongs to Malawi. It is an exclave that resulted from colonial border drawing, accessible only by boat or plane.",
          "The skyline is dominated by St. Peter's Cathedral. Built in 1911 by missionaries, it is a massive Anglican cathedral measuring 100 meters long—roughly the size of Winchester Cathedral in England—sitting incongruously on a tiny, remote African island.",
          "The cathedral features stained glass, carved soapstone, and a crucifix carved from a tree that grew near the spot where David Livingstone's heart is buried in Zambia."
        ],
        question: "In whose territorial waters is the Malawian island of Likoma actually located?",
        options: [
          "Mozambique.",
          "Tanzania.",
          "Zambia.",
          "Zimbabwe."
        ],
        answer: "Mozambique.",
        explanation: "Although it is Malawian territory, it is completely surrounded by Mozambican waters."
      }
    ]
  },
  "Malaysia": {
    tourTitle: "Truly Asia",
    introText: "The Petronas Twin Towers rise high above the busy streets of Kuala Lumpur. Taste the spicy street food in a market that never closes.",
    stops: [
      {
        stopName: "Petronas Twin Towers",
        imageKeyword: "Petronas Twin Towers",
        description: [
          "Standing at 451.9 meters, these are the tallest twin towers in the world. Designed by Argentine architect César Pelli, the floor plan is based on an eight-pointed star (Rub el Hizb), a symbol of Islamic geometry representing unity and harmony.",
          "The towers are connected by a double-decker Skybridge on the 41st and 42nd floors. The bridge is not rigidly attached to the main buildings; instead, it is designed to slide in and out of the towers to prevent it from snapping during high winds.",
          "The facade is made of stainless steel and glass. In the tropical sun, the buildings gleam like silver, but at night, they are lit to resemble two crystal lighthouses watching over Kuala Lumpur."
        ],
        question: "The floor plan of the towers is based on what geometric shape?",
        options: [
          "An eight-pointed star (Islamic star).",
          "A circle.",
          "A square.",
          "A crescent moon."
        ],
        answer: "An eight-pointed star (Islamic star).",
        explanation: "The design incorporates Islamic motifs to reflect Malaysia's Muslim heritage."
      },
      {
        stopName: "Batu Caves",
        imageKeyword: "Batu Caves",
        description: [
          "Located just outside Kuala Lumpur, this limestone hill features a series of caves and cave temples. It is guarded by the world's tallest statue of Lord Murugan, the Hindu god of war, which stands 42.7 meters (140 feet) tall and is covered in gold paint.",
          "To reach the main Temple Cave, visitors must climb a steep flight of 272 colorful concrete steps. The climb is often a challenge not just because of the heat, but because of the troops of macaques (monkeys) that will steal food and water from tourists.",
          "It is the focal point of the Thaipusam festival. During this event, over a million devotees visit the caves, many piercing their skin with hooks and skewers as acts of penance and devotion to Lord Murugan."
        ],
        question: "How many steps must visitors climb to reach the Temple Cave?",
        options: [
          "272 steps.",
          "100 steps.",
          "500 steps.",
          "1,000 steps."
        ],
        answer: "272 steps.",
        explanation: "The steep staircase is painted in vibrant rainbow colors."
      },
      {
        stopName: "George Town",
        imageKeyword: "George Town Penang",
        description: [
          "The capital of Penang island is a UNESCO World Heritage site known for its unique blend of British colonial, Chinese, and Indian influences. It is famous for its interactive street art, where murals painted by Ernest Zacharevic incorporate physical objects like real bicycles or motorcycles.",
          "It is considered the food capital of Malaysia. The hawker centers here serve legendary dishes like Char Kway Teow (stir-fried noodles) and Assam Laksa (sour fish noodle soup), reflecting the fusion of Malay and Chinese (Peranakan) cultures.",
          "The architecture includes \"Clan Jetties.\" These are traditional water villages where Chinese families built wooden houses on stilts extending out over the sea, with each jetty belonging to a specific surname or clan."
        ],
        question: "What are the \"Clan Jetties\" of Penang?",
        options: [
          "Stilt villages over the water built by specific Chinese families.",
          "British naval bases.",
          "Floating markets.",
          "Fishing piers."
        ],
        answer: "Stilt villages over the water built by specific Chinese families.",
        explanation: "Each jetty was settled by immigrants sharing the same surname (clan)."
      },
      {
        stopName: "Mount Kinabalu",
        imageKeyword: "Mount Kinabalu",
        description: [
          "Located on the island of Borneo, this is the highest mountain in Malaysia and the Malay Archipelago (4,095 meters). It is a granite \"pluton\" that is still rising about 5 millimeters every year.",
          "It is a biodiversity hotspot. The mountain has more plant species than all of Europe and North America combined, including the carnivorous Nepenthes pitcher plants, some of which are large enough to drown a rat.",
          "Adventurous climbers can try the \"Via Ferrata\" (Iron Road). It is the world's highest via ferrata, a climbing route where you are clipped onto steel cables bolted into the sheer rock face, allowing you to walk along the cliffs."
        ],
        question: "Mount Kinabalu is home to carnivorous plants known as what?",
        options: [
          "Pitcher plants (Nepenthes).",
          "Venus Flytraps.",
          "Sundews.",
          "Orchids."
        ],
        answer: "Pitcher plants (Nepenthes).",
        explanation: "These plants trap insects and small animals in their fluid-filled cups to get nutrients."
      },
      {
        stopName: "Taman Negara",
        imageKeyword: "Taman Negara",
        description: [
          "The name literally means \"National Park\" in Malay. This rainforest is estimated to be 130 million years old, making it one of the oldest deciduous rainforests in the world—older than the Amazon or the Congo.",
          "It features the world's longest canopy walkway. The bridge stretches for 530 meters, suspended 40 meters above the ground, allowing visitors to walk among the treetops without damaging the ecosystem.",
          "The forest is home to the elusive Malayan Tapir. These black-and-white animals look like a mix between a pig and an anteater and are mostly active at night, foraging for leaves in the dense undergrowth."
        ],
        question: "How old is the rainforest in Taman Negara estimated to be?",
        options: [
          "130 million years.",
          "10,000 years.",
          "1 million years.",
          "500 years."
        ],
        answer: "130 million years.",
        explanation: "It has remained largely undisturbed by ice ages and geological shifts for millions of years."
      }
    ]
  },
  "Maldives": {
    tourTitle: "The Sunny Side of Life",
    introText: "Luxury bungalows sit on stilts directly over the shallow turquoise water. Swim with manta rays in the warm and calm Indian Ocean.",
    stops: [
      {
        stopName: "Male Friday Mosque",
        imageKeyword: "Male Friday Mosque",
        description: [
          "The Hukuru Miskiy, or Old Friday Mosque, is the oldest mosque in the Maldives. Built in 1656 during the reign of Sultan Ibrahim Iskandhar I, it is constructed entirely from interlocking coral stone blocks fitted together without any mortar or cement.",
          "The walls and interior are covered in extraordinarily detailed lacquer work and intricate carvings of Arabic calligraphy and geometric patterns. The coral stone was cut from the surrounding reefs and hand-carved with such precision that the blocks interlock perfectly, a technique unique to the Maldives.",
          "The mosque sits within a compound of ornately carved coral tombstones, some dating back to the 13th century. Nearby stands the Munnaaru, a striking circular minaret also built from coral stone, from which the call to prayer has echoed across Male' for centuries."
        ],
        question: "What unique building material was used to construct the Hukuru Miskiy mosque?",
        options: [
          "Coral stone.",
          "Granite.",
          "Bamboo.",
          "Red brick."
        ],
        answer: "Coral stone.",
        explanation: "The entire mosque was built from blocks cut from coral reefs, intricately carved and interlocked without any mortar."
      },
      {
        stopName: "Ithaa Undersea Restaurant",
        imageKeyword: "Ithaa Undersea Restaurant",
        description: [
          "Located at the Conrad Maldives Rangali Island resort, this was the world's first all-glass undersea restaurant. It sits five meters (16 feet) below the surface of the Indian Ocean.",
          "The structure is a curved acrylic tunnel offering a 270-degree panoramic view. Diners can eat their meal while sharks, stingrays, and schools of tropical fish swim directly over their heads.",
          "The structure was actually built in Singapore. It was constructed on land, shipped to the Maldives on a massive barge, and then carefully sunk into position on concrete piles in the sand."
        ],
        question: "How deep underwater is the Ithaa restaurant located?",
        options: [
          "Five meters (16 feet).",
          "Fifty meters.",
          "On the surface.",
          "One meter."
        ],
        answer: "Five meters (16 feet).",
        explanation: "It allows visitors to dine submerged within the coral reef environment."
      },
      {
        stopName: "Hanifaru Bay",
        imageKeyword: "Hanifaru Bay",
        description: [
          "This UNESCO Biosphere Reserve is famous for the phenomenon of \"cyclone feeding.\" During the monsoon season, plankton gets trapped in the funnel-shaped bay, attracting hundreds of massive Manta Rays at once.",
          "It is one of the only places in the world where you can see Whale Sharks and Manta Rays feeding together in such high numbers. The animals swim in barrel-rolling chains to gulp down the soup-like water.",
          "Strict regulations are in place to protect the animals. Scuba diving is banned in the bay to prevent disturbing the feeding frenzy; only snorkeling is allowed, and visitors must keep a respectful distance."
        ],
        question: "What attracts hundreds of Manta Rays to Hanifaru Bay?",
        options: [
          "Trapped plankton (feeding frenzy).",
          "Warm water vents.",
          "Mating season.",
          "Shipwrecks."
        ],
        answer: "Trapped plankton (feeding frenzy).",
        explanation: "The unique shape of the bay concentrates plankton, creating an all-you-can-eat buffet for the rays."
      },
      {
        stopName: "Vaadhoo Island",
        imageKeyword: "Vaadhoo Island",
        description: [
          "This island in the Raa Atoll is famous for the \"Sea of Stars\" phenomenon. At night, the waves crashing on the beach glow with a neon blue light, looking like the starry sky has fallen into the ocean.",
          "The light is caused by bioluminescent phytoplankton called dinoflagellates. When these tiny organisms are agitated by the movement of the waves (or a person's footprint), they undergo a chemical reaction that emits light as a defense mechanism.",
          "While it can happen elsewhere, the Maldives is one of the best places to see it because of the warm water and lack of light pollution on the remote islands."
        ],
        question: "What organism creates the glowing blue light in the \"Sea of Stars\"?",
        options: [
          "Phytoplankton (Dinoflagellates).",
          "Electric eels.",
          "Jellyfish.",
          "Reflective sand."
        ],
        answer: "Phytoplankton (Dinoflagellates).",
        explanation: "These microscopic marine organisms emit light when disturbed by movement."
      },
      {
        stopName: "The Overwater Bungalows",
        imageKeyword: "The Overwater Bungalows",
        description: [
          "The quintessential image of the Maldives is the overwater bungalow. These villas are built on sturdy concrete or wooden piles driven into the lagoon floor, allowing guests to sleep directly above the ocean.",
          "Many feature glass floor panels. This allows guests to watch the fish swimming below their living room, and some even have slides that go from the bedroom deck straight into the sea.",
          "This architectural style was born out of necessity. Since the islands are very small and possess limited land, building over the water allowed resorts to expand without cutting down trees or overcrowding the beaches."
        ],
        question: "Why were overwater bungalows originally developed in the Maldives?",
        options: [
          "Lack of land space.",
          "To avoid insects.",
          "Cheaper construction.",
          "To follow ancient tradition."
        ],
        answer: "Lack of land space.",
        explanation: "Building over the lagoon maximized the limited space on the tiny coral islands."
      }
    ]
  },
  "Mali": {
    tourTitle: "The Jewel of the Niger",
    introText: "The Great Mosque of Djenné is the largest mud-brick building in existence. Listen to the desert blues music under a vast Saharan sky.",
    stops: [
      {
        stopName: "The Great Mosque of Djenné",
        imageKeyword: "The Great Mosque of Djenné",
        description: [
          "This is the largest mud-brick building in the world and the greatest achievement of Sudano-Sahelian architecture. The walls are made of sun-baked earth bricks coated in plaster, giving it a smooth, sculpted look.",
          "The building bristles with bundles of rodier palm sticks called toron. These sticks stick out of the walls and serve a practical purpose: they act as permanent scaffolding for workers to climb during repairs.",
          "Every year, the entire community gathers for the Crépissage (Plastering) festival. Before the rains come, thousands of residents mix mud and plaster to re-coat the mosque in a single day, ensuring it doesn't melt away in the wet season."
        ],
        question: "What is the purpose of the wooden sticks (toron) sticking out of the mosque walls?",
        options: [
          "They act as scaffolding for repairs.",
          "They are decorative only.",
          "They ward off evil spirits.",
          "They hold flags."
        ],
        answer: "They act as scaffolding for repairs.",
        explanation: "Workers climb on them to apply fresh mud plaster during the annual maintenance festival."
      },
      {
        stopName: "Timbuktu",
        imageKeyword: "Timbuktu",
        description: [
          "Once synonymous with the \"end of the world,\" Timbuktu was actually a thriving center of learning and trade in the 14th century. It grew rich on the trade of gold, salt, and books.",
          "The Sankore Madrasah (University) was one of the world's first universities. At its peak, it housed 25,000 students and a library of hundreds of thousands of manuscripts covering astronomy, mathematics, and law.",
          "The city is home to the \"Ahmed Baba Institute,\" which protects ancient manuscripts. In 2012, librarians heroically smuggled thousands of these priceless texts out of the city in donkey carts and 4x4s to save them from being destroyed by extremists."
        ],
        question: "Timbuktu was historically famous for trading gold, salt, and what else?",
        options: [
          "Books (Manuscripts/Knowledge).",
          "Silk.",
          "Spices.",
          "Diamonds."
        ],
        answer: "Books (Manuscripts/Knowledge).",
        explanation: "Books were considered as valuable as gold, and the city was a major hub of Islamic scholarship."
      },
      {
        stopName: "Dogon Country",
        imageKeyword: "Dogon Country",
        description: [
          "The Dogon people live along a 150-kilometer long sandstone cliff called the Bandiagara Escarpment. Their villages are built directly onto the vertical cliff face, using the height for defense against invaders and slave raiders.",
          "They are famous for their astronomical knowledge. According to anthropologists in the 1930s, the Dogon knew about the invisible companion star of Sirius (Sirius B) centuries before Western telescopes discovered it, though this is a subject of much debate.",
          "The culture is renowned for its masks. The Sirige mask is a single plank of wood that can be up to 5 meters tall, representing the connection between heaven and earth; dancers must have incredible balance to wear it."
        ],
        question: "Why did the Dogon people build their villages on the cliffs?",
        options: [
          "For defense (protection).",
          "To be closer to the sun.",
          "To avoid floods.",
          "Because the valley was cursed."
        ],
        answer: "For defense (protection).",
        explanation: "The difficult terrain made the villages easy to defend and hard for raiders to access."
      },
      {
        stopName: "River Niger",
        imageKeyword: "River Niger Mopti",
        description: [
          "The Niger River is the lifeblood of Mali, turning the desert green as it flows through the \"Inner Niger Delta.\" The port city of Mopti is known as the \"Venice of Mali\" because it is built on islands connected by dykes.",
          "The river is filled with pinasses—large, motorized wooden canoes. These boats are the trucks of the river, carrying everything from cows and motorcycles to huge slabs of rock salt from the Sahara mines.",
          "The river level fluctuates dramatically. During the rainy season, the river floods the delta, turning the dry plains into a massive lake suitable for rice farming and fishing, which sustains the economy."
        ],
        question: "What is the nickname of the port city of Mopti?",
        options: [
          "The Venice of Mali.",
          "The City of Gold.",
          "The River Gate.",
          "The Floating Market."
        ],
        answer: "The Venice of Mali.",
        explanation: "Its location on islands in the river delta reminded visitors of the Italian city."
      },
      {
        stopName: "Tomb of Askia",
        imageKeyword: "Tomb of Askia",
        description: [
          "Located in the city of Gao, this pyramidal structure is the burial place of Askia the Great, the most famous emperor of the Songhai Empire. It was built in 1495.",
          "It is a unique example of monumental mud-building traditions. Askia brought the architectural style back from Mecca, reportedly bringing the mud and wood with him from Arabia to make the tomb sacred.",
          "The complex is still used as a mosque. The prayer hall is distinct because the ceiling is supported by a forest of thick wooden pillars, creating a cool, dark sanctuary from the intense heat of the Sahel."
        ],
        question: "The Tomb of Askia is the burial place of an emperor from which empire?",
        options: [
          "The Songhai Empire.",
          "The Mali Empire.",
          "The Ghana Empire.",
          "The Zulu Empire."
        ],
        answer: "The Songhai Empire.",
        explanation: "Askia Muhammad I ruled the Songhai Empire at its peak in the late 15th century."
      }
    ]
  },
  "Malta": {
    tourTitle: "The Fortress Island",
    introText: "The city of Valletta was built by knights as a fortress against the Ottomans. Explore the ancient megalithic temples that predate the pyramids.",
    stops: [
      {
        stopName: "St. John's Co-Cathedral",
        imageKeyword: "St. John's Co-Cathedral",
        description: [
          "The exterior of this cathedral looks like a plain military fort, but the interior is one of the most dazzling displays of Baroque art in Europe. Every inch of the walls and ceiling is covered in gold leaf, marble, and intricate carving.",
          "It was the spiritual headquarters of the Knights of St. John (Knights Hospitaller). The floor is a patchwork of nearly 400 marble tombstones, each marking the resting place of a knight, decorated with skeletons and coats of arms.",
          "The oratory houses The Beheading of Saint John the Baptist by Caravaggio. It is the only painting the famous artist ever signed, and he painted it specifically for this room while he was a knight in training."
        ],
        question: "Who is the famous artist who painted The Beheading of Saint John the Baptist displayed here?",
        options: [
          "Caravaggio.",
          "Michelangelo.",
          "Da Vinci.",
          "Rembrandt."
        ],
        answer: "Caravaggio.",
        explanation: "The Italian master lived in Malta for a time and created his largest masterpiece for the Knights."
      },
      {
        stopName: "Mdina",
        imageKeyword: "Mdina",
        description: [
          "Known as the \"Silent City,\" Mdina was the capital of Malta until the medieval period. It sits on a hilltop in the center of the island, enclosed by massive golden stone walls that offered protection from pirates.",
          "No cars are allowed in the city (except for residents), preserving the quiet atmosphere. The streets are narrow and winding, designed to confuse invaders and provide shade from the hot Mediterranean sun.",
          "The city gate is famous in pop culture. It was used as the filming location for the entrance to \"King's Landing\" in the first season of Game of Thrones."
        ],
        question: "What is the nickname of Mdina?",
        options: [
          "The Silent City.",
          "The Golden City.",
          "The Stone Fort.",
          "The Ghost Town."
        ],
        answer: "The Silent City.",
        explanation: "The restriction on cars and the thick walls create a uniquely quiet, peaceful atmosphere."
      },
      {
        stopName: "Ħal Saflieni Hypogeum",
        imageKeyword: "Hypogeum Malta",
        description: [
          "This is the only known prehistoric underground temple in the world. Carved around 4000 BC, it is a labyrinth of chambers, halls, and passages cut three levels deep into the solid limestone rock.",
          "It was originally a sanctuary and necropolis (cemetery). Archaeologists found the remains of over 7,000 individuals buried here, along with the famous \"Sleeping Lady\" statue.",
          "The \"Oracle Room\" has amazing acoustic properties. A deep male voice speaking into a niche in the wall echoes powerfully throughout the entire complex, likely used to amplify chanting during ancient rituals."
        ],
        question: "The Hypogeum is carved into how many underground levels?",
        options: [
          "Three.",
          "Five.",
          "Ten.",
          "One."
        ],
        answer: "Three.",
        explanation: "The prehistoric builders excavated three distinct layers of chambers into the rock."
      },
      {
        stopName: "Blue Grotto",
        imageKeyword: "Blue Grotto Malta",
        description: [
          "Located on the southern coast, this is a complex of seven sea caves. It is famous for the incredible color of the water, which ranges from deep dark blue to glowing phosphorescent cyan.",
          "The colors are created by the sunlight reflecting off the white sandy bottom and the colorful coral and minerals on the cave walls. The best time to see it is in the morning when the sun angle maximizes the glowing effect.",
          "It is a popular filming location. The massive arch was used in the movie Troy (starring Brad Pitt) and serves as a natural landmark now that the famous \"Azure Window\" on Gozo has collapsed."
        ],
        question: "What natural factor creates the glowing colors in the Blue Grotto?",
        options: [
          "Sunlight reflecting off the white sand/minerals.",
          "Blue dye.",
          "Electric lights.",
          "Bioluminescent algae."
        ],
        answer: "Sunlight reflecting off the white sand/minerals.",
        explanation: "The angle of the sun hitting the seafloor illuminates the water with brilliant blue hues."
      },
      {
        stopName: "Ġgantija Temples",
        imageKeyword: "Ggantija Temples",
        description: [
          "Located on the island of Gozo, these megalithic temples are older than the Pyramids of Egypt and Stonehenge. Dating back to 3600 BC, they are among the oldest free-standing stone structures on Earth.",
          "The name Ġgantija comes from the word ġgant (giant). Local folklore believed that the temples were built by a race of giants because the limestone blocks were so huge (some weighing over 50 tons) that no normal human could have moved them.",
          "The structures are shaped like a cloverleaf. This curved design is believed to represent the heavy hips and bust of the \"Mother Goddess,\" suggesting that this was a site for fertility worship."
        ],
        question: "Local legend says the Ġgantija Temples were built by whom?",
        options: [
          "Giants.",
          "Aliens.",
          "Romans.",
          "Knights."
        ],
        answer: "Giants.",
        explanation: "The sheer size of the stones led locals to believe only giants could have constructed them."
      }
    ]
  },
  "Marshall Islands": {
    tourTitle: "The Atomic Atolls",
    introText: "This island nation is entirely composed of coral atolls spread across the sea. Dive into the deep lagoon to see ships from the Second World War.",
    stops: [
      {
        stopName: "Bikini Atoll",
        imageKeyword: "Bikini Atoll",
        description: [
          "This UNESCO World Heritage site is a paradise for wreck divers, but it has a dark history. Between 1946 and 1958, the United States conducted 23 nuclear tests here, including the Castle Bravo test, which was 1,000 times more powerful than the bomb dropped on Hiroshima.",
          "The tests sank a ghostly fleet of warships that were used as targets. Divers can now explore the USS Saratoga, an aircraft carrier that sits upright on the bottom of the lagoon, with planes still in the hangar deck.",
          "Because of the lingering radiation in the soil (though the water is safe), the islands remain uninhabited. This lack of human disturbance has allowed the coral reefs to recover spectacularly, teeming with sharks and fish."
        ],
        question: "Which aircraft carrier was sunk during the nuclear tests at Bikini Atoll?",
        options: [
          "The USS Saratoga.",
          "The USS Titanic.",
          "The USS Arizona.",
          "The USS Enterprise."
        ],
        answer: "The USS Saratoga.",
        explanation: "The massive ship was used as a target vessel during Operation Crossroads and now serves as a premier dive site."
      },
      {
        stopName: "Enewetak Atoll",
        imageKeyword: "Runit Dome",
        description: [
          "This atoll houses the Runit Dome, often called \"The Tomb.\" It is a massive concrete lid, 18 inches thick, covering 111,000 cubic yards of radioactive debris left over from Cold War nuclear testing.",
          "The dome was built in the late 1970s as a temporary fix to contain the waste. However, rising sea levels now threaten to breach the structure, as the bottom of the crater was never lined with concrete, allowing seawater to potentially leach in.",
          "Locals were allowed to return to parts of the atoll in 1980 after a massive cleanup effort, but the dome remains a stark, forbidden zone—a concrete scar on a pristine tropical island."
        ],
        question: "What is the nickname for the concrete structure covering radioactive waste on Enewetak?",
        options: [
          "The Tomb (or The Coffin).",
          "The Dome of Silence.",
          "The Bunker.",
          "The Concrete Beach."
        ],
        answer: "The Tomb (or The Coffin).",
        explanation: "The Runit Dome entombs thousands of cubic yards of contaminated soil and debris."
      },
      {
        stopName: "Majuro Atoll",
        imageKeyword: "Majuro Atoll",
        description: [
          "Majuro is the capital and largest city, but \"large\" is relative here. It is a ribbon of land that is often only one block wide, stretching for miles with the Pacific Ocean on one side and the calm lagoon on the other.",
          "The road from the airport to the town is the longest paved road in the country. A single drive takes you along nearly the entire length of the atoll, offering ocean views from both windows of the car simultaneously.",
          "The \"bridge\" connecting the islands is the highest point on the atoll. At only a few meters above sea level, it highlights the extreme vulnerability of the nation to rising sea levels caused by climate change."
        ],
        question: "What is unique about the geography of Majuro's landmass?",
        options: [
          "It is often only one block wide.",
          "It is perfectly circular.",
          "It is a single solid rock.",
          "It floats on the water."
        ],
        answer: "It is often only one block wide.",
        explanation: "The atoll is an incredibly thin strip of land separating the ocean from the lagoon."
      },
      {
        stopName: "Arno Atoll",
        imageKeyword: "Arno Atoll",
        description: [
          "Located just a short boat ride from the capital, Arno is famous for its \"Love School.\" Historically, young women were sent here to learn the arts of courtship, cooking, and traditional medicine from the elders.",
          "The atoll produces the famous \"Kili Bag.\" These are finely woven handbags made from pandanus leaves and coconut fiber, considered some of the best handicraft weaving in the Pacific.",
          "It consists of 133 islands forming three different lagoons. The water is so nutrient-rich that the atoll is a major production center for copra (dried coconut meat), which is the primary export of the outer islands."
        ],
        question: "What specific handicraft is Arno Atoll famous for producing?",
        options: [
          "Kili Bags (woven handbags).",
          "Pearl necklaces.",
          "Wooden canoes.",
          "Shell masks."
        ],
        answer: "Kili Bags (woven handbags).",
        explanation: "The local women are renowned for weaving intricate bags from processed pandanus leaves."
      },
      {
        stopName: "The Shark Sanctuary",
        imageKeyword: "Shark Sanctuary",
        description: [
          "In 2011, the Marshall Islands declared their entire exclusive economic zone (nearly 2 million square kilometers) a shark sanctuary. This creates the world's largest protected area for sharks, banning all commercial shark fishing.",
          "The sanctuary protects dozens of species, including the silvertip, tiger, and grey reef sharks. Because they are not hunted, sharks in the Marshall Islands are often curious rather than fearful of divers.",
          "This policy acknowledges the cultural importance of the shark. In Marshallese legends, the shark is often a respected ancestor or spirit guardian, not a monster to be feared."
        ],
        question: "How large is the shark sanctuary established by the Marshall Islands?",
        options: [
          "Nearly 2 million square kilometers (their entire economic zone).",
          "100 square kilometers.",
          "The size of a football field.",
          "Just one lagoon."
        ],
        answer: "Nearly 2 million square kilometers (their entire economic zone).",
        explanation: "The government banned shark fishing across their entire ocean territory, creating the world's largest sanctuary."
      }
    ]
  },
  "Mauritania": {
    tourTitle: "The Eye of Africa",
    introText: "The Eye of the Sahara is a massive circular formation visible from space. Ride the Iron Ore Train across the endless desert sands.",
    stops: [
      {
        stopName: "The Eye of the Sahara",
        imageKeyword: "The Eye of the Sahara",
        description: [
          "This geological wonder is a series of concentric circles stretching 40 kilometers (25 miles) across the desert floor. It is so huge that it cannot be recognized from the ground; it was only fully understood when astronauts saw it from space and used it as a landmark.",
          "Originally thought to be a meteorite impact crater, scientists now believe it is a deeply eroded geologic dome. Magma pushed the earth up like a blister, and wind erosion over millions of years peeled away the layers of rock to create the rings.",
          "Some conspiracy theorists speculate this could be the location of the lost city of Atlantis. They argue the dimensions and concentric water rings described by Plato match the geography of the Richat Structure, though there is no archaeological evidence to support this."
        ],
        question: "Who were the first people to use the Eye of the Sahara as a navigation landmark?",
        options: [
          "Astronauts.",
          "Pilots.",
          "Sailors.",
          "Camel caravans."
        ],
        answer: "Astronauts.",
        explanation: "Its scale is so massive that it is best seen from orbit, making it a perfect reference point for early space missions."
      },
      {
        stopName: "The Iron Ore Train",
        imageKeyword: "The Iron Ore Train",
        description: [
          "This is the longest and heaviest train in the world, often stretching up to 3 kilometers (1.8 miles) in length. It transports iron ore from the mines in Zouérat deep in the Sahara to the port city of Nouadhibou on the coast.",
          "It offers one of the most rugged \"free rides\" on Earth. Locals and adventurous tourists can hop into the open cargo wagons for free, enduring a 20-hour journey through sandstorms and extreme heat while sitting on top of the pile of iron dust.",
          "The journey is grueling. The iron dust gets into everything—clothes, eyes, and lungs—and the temperature at night can drop to freezing, forcing riders to bury themselves in the warm ore for insulation."
        ],
        question: "How long can the Mauritanian Iron Ore Train be?",
        options: [
          "Up to 3 kilometers (1.8 miles).",
          "1 kilometer.",
          "500 meters.",
          "10 kilometers."
        ],
        answer: "Up to 3 kilometers (1.8 miles).",
        explanation: "The immense weight and length make it one of the largest moving machines on the planet."
      },
      {
        stopName: "Chinguetti",
        imageKeyword: "Chinguetti",
        description: [
          "Founded in the 13th century, this ancient ksar (fortified village) is considered the seventh holiest city in Islam. It was a crucial gathering point for pilgrims traveling to Mecca and became a center of scholarship.",
          "The city is famous for its desert libraries. Families here have guarded priceless medieval manuscripts for generations, preserving ancient texts on astronomy, mathematics, and law in simple mud-brick houses despite the encroaching sand.",
          "The desert is slowly swallowing the town. Massive sand dunes loom over the walls, and residents are in a constant battle to shovel the Sahara out of their courtyards to prevent their historic homes from being buried."
        ],
        question: "What precious items are preserved in the mud-brick houses of Chinguetti?",
        options: [
          "Ancient manuscripts (libraries).",
          "Gold coins.",
          "Spices.",
          "Water tanks."
        ],
        answer: "Ancient manuscripts (libraries).",
        explanation: "The town holds thousands of medieval Islamic texts preserved by local families."
      },
      {
        stopName: "Banc d'Arguin National Park",
        imageKeyword: "Banc d'Arguin National Park",
        description: [
          "This UNESCO World Heritage site on the Atlantic coast is one of the most important bird-breeding zones in the world. Millions of migratory birds from Europe and Northern Asia spend their winter here, feeding on the rich mudflats.",
          "It is home to the Imraguen people, a distinct ethnic group of fishermen. They use traditional wooden sailboats called lanches and have a symbiotic relationship with dolphins, slapping the water to call the dolphins, who then drive schools of mullet into the fishermen's nets.",
          "The park is a transition zone where the desert meets the ocean. The sand dunes roll directly into the sea, creating a unique landscape where camels can be seen walking on the beach next to flamingos."
        ],
        question: "The Imraguen fishermen traditionally cooperate with which animal to catch fish?",
        options: [
          "Dolphins.",
          "Seals.",
          "Sharks.",
          "Pelicans."
        ],
        answer: "Dolphins.",
        explanation: "They signal the dolphins to herd fish toward the shore where nets are waiting."
      },
      {
        stopName: "Terjit Oasis",
        imageKeyword: "Terjit Oasis",
        description: [
          "Hidden in a deep gorge of the Adrar Plateau, this oasis looks like a movie set. A spring bubbles out of the red rock cliffs, creating a paradise of date palms and cool pools in the middle of the scorching desert.",
          "It has been a traditional shelter for Bedouin nomads for centuries. The microclimate inside the gorge is significantly cooler than the plateau above, offering a life-saving respite for travelers.",
          "The water has two sources: one warm and one cold. They mix in a natural swimming pool, allowing visitors to bathe in fresh, running water while surrounded by burning hot sand dunes."
        ],
        question: "What creates the cool microclimate at Terjit Oasis?",
        options: [
          "A natural spring inside a deep gorge.",
          "Air conditioning.",
          "Ice caves.",
          "A large lake."
        ],
        answer: "A natural spring inside a deep gorge.",
        explanation: "The shade of the canyon walls and the continuous flow of water keep the temperature down."
      }
    ]
  },
  "Mauritius": {
    tourTitle: "The Star and Key",
    introText: "The \"Seven Colored Earths\" form sand dunes of red, violet, and blue. Relax on the beaches of an island surrounded by coral reefs.",
    stops: [
      {
        stopName: "Seven Colored Earths",
        imageKeyword: "Seven Colored Earths",
        description: [
          "Located in the Chamarel Plain, this geological formation consists of sand dunes comprising seven distinct colors (red, brown, violet, green, blue, purple, and yellow). The colors are caused by the conversion of basaltic lava to clay minerals.",
          "The sands have a strange property: they settle into layers by color. If you take a handful of the different sands and mix them together in a jar, they will eventually separate back into their distinct color spectrums.",
          "The dunes never erode, despite the heavy tropical rains. Geologists are still not entirely sure why the mounds retain their shape and don't wash away in the storms that frequently hit the island."
        ],
        question: "What happens if you mix the different colored sands of Chamarel together?",
        options: [
          "They eventually separate back into their distinct color layers.",
          "They turn grey.",
          "They dissolve.",
          "They turn black."
        ],
        answer: "They eventually separate back into their distinct color layers.",
        explanation: "The chemical properties of the iron and aluminum particles cause them to repel and re-sort themselves."
      },
      {
        stopName: "Le Morne Brabant",
        imageKeyword: "Le Morne Brabant",
        description: [
          "This rugged mountain jutting into the ocean is a symbol of resistance against slavery. In the 18th and 19th centuries, escaped slaves (maroons) formed settlements in the caves on the summit, choosing to jump to their deaths rather than be recaptured.",
          "Off the coast lies a famous optical illusion known as the \"Underwater Waterfall.\" Sand and silt run off the underwater shelf into a deeper oceanic trench, creating the visual effect of a massive waterfall flowing under the sea.",
          "It is a UNESCO World Heritage site. The oral traditions of the maroons associated with this mountain were named a masterpiece of intangible heritage, honoring the suffering and freedom of the ancestors."
        ],
        question: "What creates the illusion of an \"underwater waterfall\" off the coast of Le Morne?",
        options: [
          "Sand and silt falling off an underwater shelf.",
          "A real waterfall.",
          "A sunken ship.",
          "A volcanic vent."
        ],
        answer: "Sand and silt falling off an underwater shelf.",
        explanation: "The movement of sediments into a deeper trench looks like cascading water from the air."
      },
      {
        stopName: "Black River Gorges National Park",
        imageKeyword: "Black River Gorges National Park",
        description: [
          "This park protects the last remaining native rainforest of Mauritius. It is the final sanctuary for the island's endemic species, many of which were pushed to the brink of extinction by introduced predators like rats and monkeys.",
          "It is the home of the Pink Pigeon. In 1991, there were only 10 of these birds left in the world. Thanks to an intensive conservation program in this park, the population has rebounded to several hundred.",
          "The park also houses the Mauritius Kestrel and the Echo Parakeet. Like the Pink Pigeon, these birds were once the rarest on Earth but were saved from following the Dodo (which was also from Mauritius) into extinction."
        ],
        question: "Which famous extinct bird was native to Mauritius?",
        options: [
          "The Dodo.",
          "The Passenger Pigeon.",
          "The Moa.",
          "The Great Auk."
        ],
        answer: "The Dodo.",
        explanation: "The flightless bird lived only on this island and was wiped out by sailors and invasive species in the 17th century."
      },
      {
        stopName: "Sir Seewoosagur Ramgoolam Botanical Garden",
        imageKeyword: "Pamplemousses Garden",
        description: [
          "Often called the Pamplemousses Botanical Garden, this is the oldest botanical garden in the Southern Hemisphere, established by the French in 1735.",
          "The centerpiece is the pond of Giant Water Lilies (Victoria amazonica). These massive pads can grow up to 3 meters in diameter and are strong enough to support the weight of a small child.",
          "The garden is also famous for its Talipot Palms. These rare trees wait 30 to 80 years to bloom. They produce one massive flower spike—the largest inflorescence in the plant world—and then immediately die after dispersing their seeds."
        ],
        question: "What is unique about the life cycle of the Talipot Palms found in the garden?",
        options: [
          "They bloom only once and then die.",
          "They bloom every year.",
          "They never bloom.",
          "They live for 1,000 years."
        ],
        answer: "They bloom only once and then die.",
        explanation: "After decades of growth, they expend all their energy on a single massive flower display before perishing."
      },
      {
        stopName: "Île aux Aigrettes",
        imageKeyword: "Ile aux Aigrettes",
        description: [
          "This small coral island is a nature reserve dedicated to restoring the \"lost world\" of ancient Mauritius. All invasive species (rats, cats, weeds) have been removed to recreate the ecosystem as it existed 400 years ago.",
          "Since the native giant tortoises are extinct, scientists introduced the Aldabra Giant Tortoise from the Seychelles to replace them. These massive reptiles act as the island's gardeners, spreading seeds and keeping the undergrowth in check.",
          "The island contains the last remnants of the coastal ebony forest. This dark, heavy wood was so valuable that the Dutch and French logged almost the entire island bare; here, visitors can see what the original ebony canopy looked like."
        ],
        question: "Why were Aldabra Giant Tortoises introduced to Île aux Aigrettes?",
        options: [
          "To replace the extinct native tortoises (rewilding).",
          "For food.",
          "As pets.",
          "To attract tourists only."
        ],
        answer: "To replace the extinct native tortoises (rewilding).",
        explanation: "They fill the ecological niche of the original tortoises, helping to disperse seeds and graze the forest."
      }
    ]
  },
  "Mexico": {
    tourTitle: "The Aztec Eagle",
    introText: "The pyramid of Chichén Itzá marks the calendar of the ancient Maya. Celebrate the vibrant Day of the Dead festivals in the colorful streets.",
    stops: [
      {
        stopName: "Chichén Itzá",
        imageKeyword: "Chichén Itzá",
        description: [
          "This ancient Maya city is dominated by El Castillo (The Temple of Kukulcán). It is a physical calendar: the pyramid has four staircases with 91 steps each, plus the top platform, adding up to 365 steps—one for each day of the solar year.",
          "Twice a year, on the spring and autumn equinoxes, a shadow phenomenon occurs. The setting sun casts a shadow on the balustrade that looks like a serpent slithering down the steps to join the stone snake head at the bottom.",
          "The Great Ball Court located here is the largest in the Americas. The acoustics are so perfect that a whisper at one end of the 168-meter long court can be heard clearly at the other end."
        ],
        question: "How many total steps does the pyramid of El Castillo have?",
        options: [
          "365.",
          "100.",
          "500.",
          "1,000."
        ],
        answer: "365.",
        explanation: "The steps represent the days of the solar year (91 x 4 sides + 1 platform)."
      },
      {
        stopName: "Teotihuacan",
        imageKeyword: "Teotihuacan",
        description: [
          "Located near Mexico City, this was once the largest city in the pre-Columbian Americas. Its original builders are unknown; the Aztecs found the ruins centuries later and named it Teotihuacan, meaning \"The Place Where Men Become Gods.\"",
          "The Pyramid of the Sun is the third-largest pyramid in the world. Visitors can climb the steep steps to the top for a view of the \"Avenue of the Dead,\" the main street that bisects the ancient metropolis.",
          "Beneath the Pyramid of the Feathered Serpent, archaeologists found a tunnel filled with liquid mercury. It is believed this represented a supernatural underworld river in the cosmology of the ancient inhabitants."
        ],
        question: "What did the Aztecs name the ruined city they found?",
        options: [
          "Teotihuacan (\"The Place Where Men Become Gods\").",
          "Tenochtitlan.",
          "Tikal.",
          "Machu Picchu."
        ],
        answer: "Teotihuacan (\"The Place Where Men Become Gods\").",
        explanation: "They believed the massive structures were built by giants or gods."
      },
      {
        stopName: "Cenotes of Yucatán",
        imageKeyword: "Cenotes of Yucatán",
        description: [
          "The Yucatán Peninsula is a flat limestone shelf with no above-ground rivers. Instead, it is riddled with thousands of cenotes—natural sinkholes where the ceiling of a cave has collapsed to reveal the groundwater below.",
          "For the Maya, these were sacred portals to Xibalba, the underworld. They were used for fresh water but also for sacrificial offerings; artifacts and human skeletons have been found at the bottom of many sacred cenotes.",
          "Today, they are world-famous swimming holes. The water is filtered through the limestone, making it crystal clear and cool, often illuminated by shafts of sunlight breaking through the jungle canopy above."
        ],
        question: "What did the ancient Maya believe the Cenotes were?",
        options: [
          "Portals to the underworld (Xibalba).",
          "Just swimming pools.",
          "Volcano craters.",
          "Meteor sites."
        ],
        answer: "Portals to the underworld (Xibalba).",
        explanation: "They were considered sacred gateways to the realm of the spirits and gods."
      },
      {
        stopName: "Xochimilco",
        imageKeyword: "Xochimilco",
        description: [
          "Xochimilco is the last surviving remnant of the vast lake system that once defined the Aztec capital of Tenochtitlan. Its name means \"Place Where Flowers Grow\" in Nahuatl, and visitors can ride colorful flat-bottomed boats called trajineras through a network of ancient canals.",
          "The canals are lined with chinampas—artificial floating gardens engineered by the Aztecs. Built by layering mud, vegetation, and lake sediment onto wooden frames, these islands still produce flowers and vegetables today, making them one of the oldest continuously farmed agricultural systems in the world.",
          "The waterways are also the last natural habitat of the Axolotl. This critically endangered salamander, often called a \"walking fish,\" is native only to this lake system and is famous for its extraordinary ability to regenerate lost limbs, hearts, and even parts of its brain."
        ],
        question: "What are the artificial agricultural islands in Xochimilco called?",
        options: [
          "Chinampas.",
          "Trajineras.",
          "Cenotes.",
          "Pueblos."
        ],
        answer: "Chinampas.",
        explanation: "These \"floating gardens\" were an Aztec engineering marvel used to grow food on the shallow lake."
      },
      {
        stopName: "Copper Canyon",
        imageKeyword: "Copper Canyon",
        description: [
          "Located in the Sierra Madre Occidental, this canyon system is actually larger and deeper than the Grand Canyon in the USA. It is a network of six distinct canyons carved by six rivers that merge into the Rio Fuerte.",
          "It is the home of the Rarámuri (Tarahumara) people. They are legendary long-distance runners who live in the canyon caves and can run hundreds of miles barefoot or in simple sandals without stopping, often for hunting or sport.",
          "The \"El Chepe\" train allows visitors to traverse the rugged terrain. It is one of the great engineering feats of the 20th century, passing through 86 tunnels and over 37 bridges to climb from the Pacific coast to the high desert."
        ],
        question: "The Rarámuri people of Copper Canyon are famous for what physical ability?",
        options: [
          "Long-distance running.",
          "Swimming.",
          "Climbing.",
          "Wrestling."
        ],
        answer: "Long-distance running.",
        explanation: "They are known as \"those who run fast\" and can cover immense distances on foot in the canyon terrain."
      }
    ]
  },
  "Micronesia": {
    tourTitle: "The Venice of the Pacific",
    introText: "Ancient stone ruins float on artificial islets in the city of Nan Madol. Kayak through the mangroves of this remote Pacific island group.",
    stops: [
      {
        stopName: "Nan Madol",
        imageKeyword: "Nan Madol",
        description: [
          "This UNESCO World Heritage site is an ancient city built on top of a coral reef. It consists of nearly 100 artificial islets connected by a network of canals, earning it the nickname \"Venice of the Pacific.\"",
          "The walls are constructed from massive basalt columns that naturally formed in hexagonal shapes. Some of these stones weigh up to 50 tons, and archaeologists are still unsure how the ancient builders transported them from the quarries on the other side of the island without pulleys or metal tools.",
          "Local legend says the city was built by twin sorcerers who levitated the heavy stones into place using magic. It served as the ceremonial seat of the Saudeleur dynasty until it was abandoned in the 1600s."
        ],
        question: "Nan Madol is constructed on top of what natural feature?",
        options: [
          "A coral reef.",
          "A volcanic crater.",
          "A sand dune.",
          "A glacier."
        ],
        answer: "A coral reef.",
        explanation: "The artificial islands were built directly in the lagoon water atop the living reef."
      },
      {
        stopName: "Chuuk Lagoon",
        imageKeyword: "Chuuk Lagoon",
        description: [
          "This massive lagoon is the final resting place of the Imperial Japanese Navy's \"Ghost Fleet.\" In 1944, Operation Hailstone sank over 60 ships and 275 airplanes in the harbor, creating the world's biggest ship graveyard.",
          "It is considered the best wreck diving destination on Earth. The warm tropical water has encrusted the weapons of war in colorful soft corals; divers can swim through cargo holds filled with Zero fighter planes, tanks, and torpedoes.",
          "The wrecks are designated as war graves. Because thousands of sailors died during the attack, divers are strictly forbidden from taking artifacts, and human remains are still occasionally visible deep inside the ships."
        ],
        question: "What major event created the \"Ghost Fleet\" of Chuuk Lagoon?",
        options: [
          "Operation Hailstone (WWII air raid).",
          "A massive typhoon.",
          "A tsunami.",
          "A nuclear test."
        ],
        answer: "Operation Hailstone (WWII air raid).",
        explanation: "A massive US attack in 1944 sank the Japanese fleet anchored in the lagoon."
      },
      {
        stopName: "Yap",
        imageKeyword: "Yap Stone Money",
        description: [
          "The island of Yap is famous for its Rai stones—massive limestone discs used as traditional currency. Some are taller than a person and weigh nearly 4 tons.",
          "The value of the money is not based on size alone, but on its history. A stone is worth more if many people died transporting it from the quarry in Palau (250 miles away) or if a famous chief owned it.",
          "The stones are rarely moved. Because they are too heavy to carry, \"spending\" the money simply involves a verbal agreement that the ownership has changed, while the rock stays exactly where it is."
        ],
        question: "How is a transaction completed using the giant Stone Money of Yap?",
        options: [
          "By verbal agreement (the stone doesn't move).",
          "By rolling the stone to the new owner.",
          "By breaking off a piece.",
          "By painting it a new color."
        ],
        answer: "By verbal agreement (the stone doesn't move).",
        explanation: "Ownership changes mentally and socially, but the physical object remains in place."
      },
      {
        stopName: "Kosrae",
        imageKeyword: "Sleeping Lady",
        description: [
          "Kosrae is known as the \"Jewel of Micronesia.\" The skyline is dominated by a mountain range that looks distinctly like the silhouette of a woman lying on her back, known as the \"Sleeping Lady.\"",
          "The island is famous for its citrus. The Kosrae tangerine is a unique green-skinned orange that is incredibly sweet. It is illegal to export the trees to protect the genetic purity of the fruit.",
          "It is also home to the Lelu Ruins. Similar to Nan Madol, this was a city of kings built from basalt, but unlike its famous cousin, Lelu was built on the main island rather than on artificial islets in the water."
        ],
        question: "What fruit is Kosrae famous for?",
        options: [
          "The Kosrae Tangerine (green orange).",
          "The Blue Banana.",
          "The Red Pineapple.",
          "The Square Watermelon."
        ],
        answer: "The Kosrae Tangerine (green orange).",
        explanation: "A sweet, green-skinned citrus fruit that is unique to the island."
      },
      {
        stopName: "Kepirohi Waterfall",
        imageKeyword: "Kepirohi Waterfall",
        description: [
          "This is one of the most accessible and beautiful waterfalls in Micronesia. The water cascades over a wall of hexagonal basalt columns, creating a geometric, blocky appearance to the falls.",
          "The base of the falls forms a large freshwater pool. It is a popular swimming spot for locals and tourists, surrounded by vibrant tropical flowers and hibiscus.",
          "The basalt columns here are the same type of rock used to build the city of Nan Madol. This site gives visitors a look at the raw material that the ancient engineers quarried to build their floating city."
        ],
        question: "The Kepirohi Waterfall flows over what type of rock formation?",
        options: [
          "Hexagonal basalt columns.",
          "Smooth marble.",
          "Sandstone caves.",
          "Coral reef."
        ],
        answer: "Hexagonal basalt columns.",
        explanation: "The water cascades over the natural geometric pillars of volcanic rock."
      }
    ]
  },
  "Moldova": {
    tourTitle: "The Wine Cellar of Europe",
    introText: "The underground wine cellars of Milestii Mici are the largest in the world. Taste the vintage reds in a countryside untouched by mass tourism.",
    stops: [
      {
        stopName: "Milestii Mici",
        imageKeyword: "Milestii Mici",
        description: [
          "This winery holds the Guinness World Record for the largest wine collection in the world, with over 2 million bottles stored in its vaults.",
          "The \"cellar\" is actually an underground city. It consists of 200 kilometers of limestone tunnels that are so large you have to drive a car through them. The streets have names like \"Cabernet Street\" and \"Pinot Noir Street.\"",
          "The limestone walls naturally maintain the perfect humidity and temperature for aging wine. During the Soviet alcohol prohibition, workers built secret walls to hide the most valuable vintages from inspection, saving the national treasure."
        ],
        question: "What Guinness World Record does Milestii Mici hold?",
        options: [
          "Largest wine collection in the world.",
          "Oldest wine.",
          "Most expensive wine.",
          "Deepest cellar."
        ],
        answer: "Largest wine collection in the world.",
        explanation: "It houses roughly 2 million bottles in its massive underground network."
      },
      {
        stopName: "Old Orhei",
        imageKeyword: "Old Orhei",
        description: [
          "This open-air archaeological complex is the most famous sight in Moldova. It features a cave monastery carved into a limestone cliff high above the Răut River.",
          "Orthodox monks have lived in these caves since the 13th century. Because the region was frequently invaded by Tatars and Ottomans, the monks lived underground to remain hidden and safe while continuing their prayers.",
          "The view from the cliff is spectacular. The river winds in a perfect S-shape through the valley below, framing the ancient ridge where excavations have revealed ruins from the Golden Horde (Mongol) era."
        ],
        question: "Why did monks originally carve the monastery into the cliffside?",
        options: [
          "For protection/hiding from invaders.",
          "To be closer to the river.",
          "It was cooler.",
          "To mine stone."
        ],
        answer: "For protection/hiding from invaders.",
        explanation: "The hidden caves allowed them to practice their faith safely during periods of war."
      },
      {
        stopName: "Cricova Winery",
        imageKeyword: "Cricova Winery",
        description: [
          "Like Milestii Mici, Cricova is a massive underground wine city. It is famous for producing sparkling wines using the traditional Champenoise method (the same used in Champagne, France).",
          "It houses the national wine collection and private collections of famous figures. Vladimir Putin celebrated his 50th birthday in these tunnels, and Nazi leader Hermann Göring's private wine collection, captured by the Red Army, is still stored here.",
          "The \"Underground City\" includes fully furnished tasting rooms, a cinema, and even a church dug into the rock, all located 80 meters below the surface."
        ],
        question: "Which famous, captured wine collection is stored in the Cricova vaults?",
        options: [
          "Hermann Göring's collection.",
          "Napoleon's collection.",
          "The Tsar's collection.",
          "Churchill's collection."
        ],
        answer: "Hermann Göring's collection.",
        explanation: "The Red Army seized the Nazi leader's wines and brought them to Moldova for storage."
      },
      {
        stopName: "Transnistria",
        imageKeyword: "Transnistria Lenin",
        description: [
          "Transnistria is a breakaway state that officially doesn't exist. While the world considers it part of Moldova, it has its own government, currency, military, and borders, acting as a de facto independent nation.",
          "Visiting the capital, Tiraspol, is like stepping back in time to the USSR. Statues of Lenin still stand in the main squares, the flag still bears the hammer and sickle, and Soviet propaganda art is visible on the streets.",
          "They produce a plastic coin currency. Transnistria is the only place in the world that uses composite plastic coins (in varying shapes like squares and hexagons) for general circulation."
        ],
        question: "What distinct symbol can be found on the flag of Transnistria?",
        options: [
          "The Hammer and Sickle.",
          "A Red Star.",
          "A Golden Eagle.",
          "A Bear."
        ],
        answer: "The Hammer and Sickle.",
        explanation: "It is the only territory in Europe that still uses the Soviet-era symbol on its flag."
      },
      {
        stopName: "Soroca Fortress",
        imageKeyword: "Soroca Fortress",
        description: [
          "Located on the Dniester River facing Ukraine, this fortress is a perfect circle with five round towers. It was built in the 15th century by Stephen the Great to defend against Ottoman invaders.",
          "The design is based on the \"Golden Ratio.\" Its perfectly circular symmetry made it incredibly strong against cannon fire, as there were no flat walls to hit directly and projectiles would often glance off the curved surfaces.",
          "Soroca is also known as the \"Romani Capital of Moldova.\" The hill above the fortress is covered in flamboyant mansions built by wealthy Romani (Gypsy) families, featuring designs inspired by the US Capitol, St. Peter's Basilica, and ancient temples."
        ],
        question: "Soroca Fortress was built on the bank of which river?",
        options: [
          "The Dniester River.",
          "The Danube.",
          "The Volga.",
          "The Rhine."
        ],
        answer: "The Dniester River.",
        explanation: "It served as a border defense on this major waterway separating Moldova from the east."
      }
    ]
  },
  "Monaco": {
    tourTitle: "The Billionaire's Playground",
    introText: "The famous casino of Monte Carlo sits in the center of this tiny principality. Watch luxury yachts dock in the harbor of the wealthy.",
    stops: [
      {
        stopName: "Monte Carlo Casino",
        imageKeyword: "Monte Carlo Casino",
        description: [
          "This is one of the most famous gambling venues in the world, renowned for its Belle Époque architecture. It was built in 1863 to save the ruling House of Grimaldi from bankruptcy; it was so successful that the Prince abolished income tax for all residents.",
          "Citizens of Monaco (Monegasques) are actually forbidden from gambling here. Identity checks at the door ensure that only foreigners enter the gaming rooms to lose their money.",
          "It is a favorite setting for James Bond movies. The casino was the inspiration for Ian Fleming's Casino Royale and served as a filming location for GoldenEye and Never Say Never Again."
        ],
        question: "Who is legally forbidden from gambling in the Monte Carlo Casino?",
        options: [
          "Citizens of Monaco (Monegasques).",
          "French citizens.",
          "Women.",
          "Tourists."
        ],
        answer: "Citizens of Monaco (Monegasques).",
        explanation: "The casino was built to generate revenue from foreigners, and locals are barred by law from entering the gaming rooms."
      },
      {
        stopName: "The Prince's Palace",
        imageKeyword: "The Prince's Palace",
        description: [
          "Perched on \"The Rock\" (Le Rocher), this palace has been the residence of the Grimaldi family for over 700 years. It was originally built as a Genoese fortress in 1191 before being transformed into a luxurious residence.",
          "Every day at 11:55 AM, the Changing of the Guard takes place in the main square. The guards, known as Carabiniers du Prince, wear pristine white uniforms in the summer and black in the winter.",
          "The palace is where American actress Grace Kelly lived after marrying Prince Rainier III. Her influence transformed the principality into a glamorous hub for Hollywood stars and artists."
        ],
        question: "What is the nickname for the promontory where the palace is located?",
        options: [
          "The Rock (Le Rocher).",
          "The Hill.",
          "The Cliff.",
          "The Crown."
        ],
        answer: "The Rock (Le Rocher).",
        explanation: "The old town and palace sit on a steep monolith overlooking the Mediterranean."
      },
      {
        stopName: "Circuit de Monaco",
        imageKeyword: "Circuit de Monaco",
        description: [
          "The Monaco Grand Prix is considered the most prestigious automobile race in the world. Unlike modern tracks, this race takes place directly on the narrow, winding streets of the city, requiring incredible precision from drivers.",
          "The track is famous for the Fairmont Hairpin. It is the slowest corner in Formula 1, forcing cars to slow down to just 48 km/h (30 mph) to navigate the 180-degree turn.",
          "Setting up the track takes six weeks. Every year, the city must erect 33 kilometers of safety rails, grandstands, and tire barriers, essentially turning the town into a temporary stadium."
        ],
        question: "What makes the Fairmont Hairpin unique in Formula 1 racing?",
        options: [
          "It is the slowest corner in the championship.",
          "It is the fastest corner.",
          "It is underground.",
          "It is made of wood."
        ],
        answer: "It is the slowest corner in the championship.",
        explanation: "The tight turn forces drivers to reduce speed drastically compared to the rest of the circuit."
      },
      {
        stopName: "Oceanographic Museum",
        imageKeyword: "Oceanographic Museum",
        description: [
          "Founded by Prince Albert I (the \"Navigator Prince\"), this museum is a masterpiece of monumental architecture. It rises 85 meters straight out of the sheer cliffside, looking like it grew out of the rock.",
          "The museum was directed by the famous explorer Jacques-Yves Cousteau for over 30 years. It houses a massive shark lagoon and thousands of marine specimens collected during Prince Albert's expeditions.",
          "The basement houses a \"Tortoise Island.\" It serves as a refuge for African Spurred Tortoises, the third-largest tortoise species in the world, which visitors can see on the panoramic terrace."
        ],
        question: "Which famous ocean explorer directed the museum for three decades?",
        options: [
          "Jacques-Yves Cousteau.",
          "Steve Irwin.",
          "David Attenborough.",
          "Ferdinand Magellan."
        ],
        answer: "Jacques-Yves Cousteau.",
        explanation: "The legendary filmmaker and conservationist led the institution from 1957 to 1988."
      },
      {
        stopName: "Larvotto Beach",
        imageKeyword: "Larvotto Beach",
        description: [
          "This is Monaco's only public beach. Because the principality has almost no natural coastline left, the beach is entirely man-made, created with fine gravel and imported sand.",
          "The water is protected by a jellyfish net. During the summer, a massive underwater net is deployed across the bay to ensure that swimmers can enjoy the Mediterranean without being stung.",
          "It is part of a massive land reclamation project. Monaco has expanded its territory by 20% by building new districts directly into the sea, turning water into valuable real estate."
        ],
        question: "How does Monaco keep swimmers safe from jellyfish at Larvotto Beach?",
        options: [
          "By using an underwater net.",
          "By using trained dolphins.",
          "By adding chemicals to the water.",
          "By using lasers."
        ],
        answer: "By using an underwater net.",
        explanation: "A physical barrier is installed in the water to block jellyfish from entering the swimming area."
      }
    ]
  },
  "Mongolia": {
    tourTitle: "The Land of the Blue Sky",
    introText: "Eagle hunters ride on horseback across the vast and open steppe. Sleep in a traditional round yurt under the clear Milky Way.",
    stops: [
      {
        stopName: "The Gobi Desert",
        imageKeyword: "Gobi Desert Dunes",
        description: [
          "The Gobi is one of the world's largest deserts, but only 5% of it is sand; the rest is bare rock and gravel. However, the Khongoryn Els are massive dunes that reach heights of up to 300 meters.",
          "They are known as the \"Singing Sands.\" When the wind blows or when someone slides down the dune, the moving sand creates a low-frequency hum that sounds like a propeller plane engine.",
          "This region is famous for dinosaur fossils. In the 1920s, American explorer Roy Chapman Andrews discovered the first-ever nest of dinosaur eggs here (at the Flaming Cliffs), proving that dinosaurs laid eggs."
        ],
        question: "What scientific discovery was made in the Mongolian Gobi in the 1920s?",
        options: [
          "The first dinosaur eggs.",
          "The largest T-Rex skeleton.",
          "Ancient human remains.",
          "A lost city."
        ],
        answer: "The first dinosaur eggs.",
        explanation: "The discovery proved that dinosaurs were egg-laying reptiles."
      },
      {
        stopName: "Genghis Khan Equestrian Statue",
        imageKeyword: "Genghis Khan Statue",
        description: [
          "Standing 40 meters tall on the bank of the Tuul River, this is the largest equestrian statue in the world. It depicts Genghis Khan holding a golden whip, gazing east toward his birthplace.",
          "The statue is made of 250 tons of gleaming stainless steel. Visitors can take an elevator up through the tail of the horse and walk out onto the horse's head for a panoramic view of the steppe.",
          "It stands on the spot where legend says Genghis found a golden whip. Finding a whip was considered a powerful omen of future success, which inspired him to unite the Mongol tribes and conquer the world."
        ],
        question: "Where is the observation deck located on the Genghis Khan statue?",
        options: [
          "On the horse's head.",
          "In the rider's helmet.",
          "In the base.",
          "On the tip of the whip."
        ],
        answer: "On the horse's head.",
        explanation: "Visitors can walk out of the chest and stand on the mane for a view of the surrounding area."
      },
      {
        stopName: "Orkhon Valley",
        imageKeyword: "Orkhon Valley",
        description: [
          "This UNESCO World Heritage site is the cultural heart of Mongolia. For centuries, it was the center of nomadic empires, including the Uighurs and the Mongols, and the location of the ancient capital, Karakorum.",
          "The valley is dotted with \"Deer Stones.\" These are ancient standing stones carved with stylized images of flying deer, dating back to the Bronze Age (around 1000 BC).",
          "It features the Ulaan Tsutgalan waterfall. This waterfall was formed by volcanic eruptions and earthquakes that cracked the earth, allowing the river to plunge 20 meters into a gorge."
        ],
        question: "What ancient capital city was located in the Orkhon Valley?",
        options: [
          "Karakorum.",
          "Beijing.",
          "Samarkand.",
          "Xanadu."
        ],
        answer: "Karakorum.",
        explanation: "It served as the capital of the Mongol Empire under Genghis Khan's successors."
      },
      {
        stopName: "Lake Khövsgöl",
        imageKeyword: "Lake Khövsgöl",
        description: [
          "Known as the \"Blue Pearl,\" this is the younger sister of Lake Baikal in Russia. It contains 70% of Mongolia's fresh water and is one of the cleanest lakes in the world; the water is potable directly from the lake without treatment.",
          "In winter, the lake freezes completely solid. It becomes so thick that trucks historically used the ice as a shortcut road, though this is now banned due to pollution risks from oil leaks.",
          "The region is home to the Tsaatan people (Reindeer Herders). Unlike the horse-riding nomads of the steppe, the Tsaatan ride domesticated reindeer and live in teepees (ortz) in the northern taiga forests."
        ],
        question: "What animal do the Tsaatan people of northern Mongolia herd and ride?",
        options: [
          "Reindeer.",
          "Camels.",
          "Yaks.",
          "Horses."
        ],
        answer: "Reindeer.",
        explanation: "They are one of the last nomadic reindeer-herding cultures left in the world."
      },
      {
        stopName: "Naadam Festival",
        imageKeyword: "Naadam Festival",
        description: [
          "Naadam is the most important festival in Mongolia, celebrated every July. It features the \"Three Manly Games\": wrestling, horse racing, and archery.",
          "The horse races are unique because the jockeys are children. Boys and girls aged 5 to 13 ride the horses bareback over cross-country distances of up to 30 kilometers, testing the endurance of the famed Mongol horses.",
          "In Mongolian wrestling (Bokh), there are no weight classes and no time limits. A match only ends when someone touches the ground with any part of their body other than their feet, and the winner performs an \"eagle dance\" to celebrate."
        ],
        question: "How old are the jockeys in the traditional Naadam horse races?",
        options: [
          "Children aged 5 to 13.",
          "Adult men.",
          "Teenagers over 16.",
          "Elders."
        ],
        answer: "Children aged 5 to 13.",
        explanation: "Young children are chosen for their light weight to help the horses run the marathon distances."
      }
    ]
  },
  "Montenegro": {
    tourTitle: "The Black Mountain",
    introText: "The Bay of Kotor winds like a fjord through the steep coastal mountains. Wander the stone streets of a medieval town preserved by time.",
    stops: [
      {
        stopName: "The Bay of Kotor",
        imageKeyword: "Bay of Kotor",
        description: [
          "Often mistaken for a fjord, this is actually a submerged river canyon. The bay is shaped like a butterfly and is surrounded by steep limestone walls that drop straight into the Adriatic Sea.",
          "The city of Kotor is protected by fortifications that stretch 4.5 kilometers up the mountain. The walls zigzag up the vertical cliffs to the Fortress of St. John, offering a grueling 1,350-step climb for a view of the bay.",
          "The region is known as the \"Land of Cats.\" Kotor has a huge population of stray cats that are fed and cared for by the locals; they are considered a symbol of good luck and even have their own museum in the old town."
        ],
        question: "Although it looks like a fjord, what geological feature is the Bay of Kotor?",
        options: [
          "A submerged river canyon (Ria).",
          "A glacial valley.",
          "A volcanic crater.",
          "A man-made canal."
        ],
        answer: "A submerged river canyon (Ria).",
        explanation: "The sea flooded an ancient river valley, creating the deep bay."
      },
      {
        stopName: "Durmitor National Park",
        imageKeyword: "Tara River Canyon",
        description: [
          "This park contains the Tara River Canyon, which is the deepest canyon in Europe (1,300 meters deep). It is second in the world only to the Grand Canyon in the USA.",
          "The canyon is spanned by the Djurdjevic Tara Bridge. When it was built in 1940, it was the largest vehicular concrete arch bridge in Europe. During WWII, the engineer who built it helped partisans blow up the central arch to stop the Italian army from crossing.",
          "The park is famous for its 18 glacial lakes known as \"Mountain Eyes.\" The most famous is the Black Lake, which reflects the dark pine forests of the surrounding Medjed peak."
        ],
        question: "The Tara River Canyon holds which European geographical record?",
        options: [
          "It is the deepest canyon in Europe.",
          "It is the longest river.",
          "It has the highest waterfall.",
          "It is the oldest forest."
        ],
        answer: "It is the deepest canyon in Europe.",
        explanation: "The river cuts 1,300 meters deep into the mountains."
      },
      {
        stopName: "Sveti Stefan",
        imageKeyword: "Sveti Stefan",
        description: [
          "This fortified island village was once a haven for pirates in the 15th century. Today, it is one of the most exclusive hotels in the world. The entire island is a single resort; you can only enter if you are a paying guest.",
          "In the 1960s and 70s, it was a playground for the rich and famous. Stars like Marilyn Monroe, Sophia Loren, and Elizabeth Taylor vacationed here, enjoying the privacy of the medieval stone cottages.",
          "The island is connected to the mainland by a narrow tombolo (sandbar) that was later paved. The beaches on either side of the causeway have pinkish pebbles, adding to the photogenic quality of the site."
        ],
        question: "What was the original function of the island of Sveti Stefan in the 15th century?",
        options: [
          "A fortified village / Pirate haven.",
          "A royal palace.",
          "A monastery.",
          "A prison."
        ],
        answer: "A fortified village / Pirate haven.",
        explanation: "It was built to protect the local Paštrovići clan from Turks and pirates before becoming a luxury resort."
      },
      {
        stopName: "Our Lady of the Rocks",
        imageKeyword: "Our Lady of the Rocks",
        description: [
          "Located off the coast of Perast, this is the only artificial island in the Adriatic Sea. It was built over centuries by local seamen who kept an ancient oath.",
          "Legend says that in 1452, fishermen found an icon of the Madonna and Child on a rock in the sea. Every time they returned from a successful voyage, they threw a rock at that spot. Over 600 years, the pile of rocks grew into an island large enough to hold a church.",
          "The custom continues today. Every year on July 22nd, during the Fašinada festival, local men row boats loaded with rocks to the island and throw them into the sea to reinforce the foundation."
        ],
        question: "How was the island of Our Lady of the Rocks created?",
        options: [
          "By fishermen throwing rocks into the sea over centuries.",
          "By a volcanic eruption.",
          "By dredging sand.",
          "By coral growth."
        ],
        answer: "By fishermen throwing rocks into the sea over centuries.",
        explanation: "It is an artificial island built stone by stone by the locals."
      },
      {
        stopName: "Mausoleum of Njegoš",
        imageKeyword: "Mausoleum of Njegoš",
        description: [
          "Sitting at the top of the Jezerski peak (1,657 meters), this is the final resting place of Petar II Petrović-Njegoš, Montenegro's greatest ruler, bishop, and poet.",
          "To reach the tomb, visitors must drive up a winding road and then climb 461 steps inside a tunnel carved through the mountain.",
          "The mausoleum is guarded by two massive granite caryatids (statues of women). Inside, under a canopy of gold mosaic tiles, sits a 28-ton statue of Njegoš with an eagle, carved from a single block of black granite."
        ],
        question: "Who is buried in the mausoleum at the top of Mount Lovćen?",
        options: [
          "Petar II Petrović-Njegoš.",
          "King Nikola I.",
          "Josip Broz Tito.",
          "Alexander the Great."
        ],
        answer: "Petar II Petrović-Njegoš.",
        explanation: "He is revered as the father of the Montenegrin nation and its most famous poet."
      }
    ]
  },
  "Morocco": {
    tourTitle: "The Kingdom of Light",
    introText: "The blue city of Chefchaouen is painted in stunning shades of azure. Get lost in the maze of a busy souk smelling of spices.",
    stops: [
      {
        stopName: "Chefchaouen",
        imageKeyword: "Chefchaouen Blue City",
        description: [
          "Nestled in the Rif Mountains, this town is famous because almost every building, door, and path is painted in various shades of blue.",
          "There are several theories about the color. Some say Jewish refugees painted it blue in the 1930s to symbolize the sky and heaven; others claim it repels mosquitoes or keeps the houses cool in the summer.",
          "The city was closed to foreigners for centuries. Until 1920, only three Christians had ever entered the city, which helped preserve its medieval layout and atmosphere perfectly."
        ],
        question: "What is the most common symbolic explanation for the blue color of the city?",
        options: [
          "It represents the sky/heaven.",
          "It repels ghosts.",
          "It is the king's favorite color.",
          "It scares away lions."
        ],
        answer: "It represents the sky/heaven.",
        explanation: "Jewish refugees are credited with introducing the color as a spiritual reminder."
      },
      {
        stopName: "Jemaa el-Fnaa",
        imageKeyword: "Jemaa el-Fnaa",
        description: [
          "This is the main square of Marrakech and one of the busiest market plazas in Africa. By day, it is filled with snake charmers, monkey handlers, and henna tattoo artists.",
          "By night, it transforms into a massive open-air restaurant. Hundreds of food stalls are wheeled in, grilling lamb sausages and vegetables, while storytellers and musicians perform for the crowds in a tradition that dates back 1,000 years.",
          "The name Jemaa el-Fnaa roughly translates to \"Assembly of the Dead.\" It was historically the site of public executions, where the heads of rebels were displayed on spikes."
        ],
        question: "What does the name Jemaa el-Fnaa historically refer to?",
        options: [
          "Assembly of the Dead (or Place of Execution).",
          "The Happy Gathering.",
          "The King's Market.",
          "The Garden of Peace."
        ],
        answer: "Assembly of the Dead (or Place of Execution).",
        explanation: "It was the public square where criminals were executed in the past."
      },
      {
        stopName: "Hassan II Mosque",
        imageKeyword: "Hassan II Mosque",
        description: [
          "This is one of the largest mosques in the world, with the world's second-tallest minaret (210 meters). It sits on a promontory looking out over the Atlantic Ocean; the seabed is visible through the glass floor in the prayer hall.",
          "It is equipped with a laser on top of the minaret. The beam is 30 kilometers long and points directly toward Mecca, guiding the faithful to prayer.",
          "The mosque features a retractable roof. The massive roof can slide open in minutes to ventilate the prayer hall and allow worshippers to pray under the open sky, fulfilling the King's wish to build the throne of God on the water."
        ],
        question: "What unique feature does the minaret of the Hassan II Mosque possess?",
        options: [
          "A laser pointing to Mecca.",
          "A revolving restaurant.",
          "A helipad.",
          "A giant clock."
        ],
        answer: "A laser pointing to Mecca.",
        explanation: "A powerful beam of light indicates the direction of prayer (Qibla) at night."
      },
      {
        stopName: "Erg Chebbi",
        imageKeyword: "Erg Chebbi Dunes",
        description: [
          "These are the classic, towering sand dunes of the Sahara Desert, rising up to 150 meters high. The sand is famous for its vibrant orange color, which changes to gold, pink, and purple as the sun sets.",
          "Local legend says the dunes were created by God as a punishment. A wealthy family refused to offer hospitality to a tired traveler, so God buried them and their home under mounds of sand to teach them a lesson.",
          "Many visitors come here for \"sand baths\" (psammotherapy). During the hottest months, locals bury people up to their necks in the hot sand for a few minutes, believing it cures rheumatism and joint pain."
        ],
        question: "According to local legend, why were the dunes of Erg Chebbi created?",
        options: [
          "As a punishment for refusing hospitality.",
          "A dragon fell asleep there.",
          "Giants poured sand from their shoes.",
          "A river dried up."
        ],
        answer: "As a punishment for refusing hospitality.",
        explanation: "God buried a wealthy family in sand for turning away a weary traveler."
      },
      {
        stopName: "Ait Benhaddou",
        imageKeyword: "Ait Benhaddou",
        description: [
          "This ancient fortified village (ksar) along the former caravan route is the best example of Moroccan earthen clay architecture. It looks like a red sandcastle built into the side of a hill.",
          "It is one of the most famous filming locations in the world. It has served as the backdrop for Gladiator, Game of Thrones (Yunkai), Lawrence of Arabia, and The Mummy.",
          "The buildings are made of rammed earth and straw. Because this material melts in the rain, the structures require constant maintenance to prevent them from dissolving back into the ground."
        ],
        question: "Ait Benhaddou served as the slave city of Yunkai in which TV series?",
        options: [
          "Game of Thrones.",
          "Breaking Bad.",
          "Stranger Things.",
          "The Crown."
        ],
        answer: "Game of Thrones.",
        explanation: "The distinctive red walls were used as the setting for Daenerys Targaryen's conquest."
      }
    ]
  },
  "Mozambique": {
    tourTitle: "The Pearl of the Indian Ocean",
    introText: "Whale sharks and manta rays patrol the coast of the Bazaruto Archipelago. Sail on a traditional dhow boat across the turquoise channel.",
    stops: [
      {
        stopName: "Bazaruto Archipelago",
        imageKeyword: "Bazaruto Archipelago",
        description: [
          "This chain of five islands is a National Marine Park and one of the most beautiful spots in Africa. It is famous for its massive sand dunes that slide directly into the crystal-clear Indian Ocean.",
          "It is the last viable refuge for the Dugong in the Western Indian Ocean. These shy \"sea cows\" graze on the seagrass meadows between the islands and are the origin of the mermaid myth.",
          "The islands are also known for \"pansy shells.\" These are actually the skeletons of sea urchins (sand dollars) that wash up on the beach, featuring a distinctive five-petaled flower pattern on their backs."
        ],
        question: "The Bazaruto Archipelago is a critical refuge for which rare marine mammal?",
        options: [
          "The Dugong.",
          "The Manatee.",
          "The Blue Whale.",
          "The Sea Otter."
        ],
        answer: "The Dugong.",
        explanation: "It hosts the largest remaining population of these animals in East Africa."
      },
      {
        stopName: "Island of Mozambique",
        imageKeyword: "Island of Mozambique",
        description: [
          "This tiny coral island was the capital of Portuguese East Africa for nearly 400 years. It is connected to the mainland by a single 3-kilometer long bridge built in the 1960s.",
          "The island is a UNESCO World Heritage site due to its unique architectural mix. The northern half is a \"Stone Town\" of grand Portuguese palaces and churches, while the southern half is a \"Makuti Town\" of traditional thatched-roof houses.",
          "The Chapel of Nossa Senhora de Baluarte, located at the tip of the island, is the oldest European building in the Southern Hemisphere, built in 1522."
        ],
        question: "The Island of Mozambique was the capital of which colonial power's territory?",
        options: [
          "Portugal.",
          "Spain.",
          "France.",
          "Britain."
        ],
        answer: "Portugal.",
        explanation: "It served as the administrative center and trading hub for Portuguese East Africa."
      },
      {
        stopName: "Gorongosa National Park",
        imageKeyword: "Gorongosa National Park",
        description: [
          "This park is widely considered the greatest restoration story in the history of conservation. During the civil war (1977-1992), 95% of the large animals here were killed for meat or ivory.",
          "Since 2004, a massive rewilding project has reintroduced buffalo, zebras, elephants, and lions. The ecosystem has bounced back incredibly fast, proving that nature can recover if given the chance.",
          "It is a center for scientific research. The E.O. Wilson Biodiversity Laboratory located in the park has discovered dozens of new species of insects and frogs that exist nowhere else on Earth."
        ],
        question: "What happened to 95% of the animals in Gorongosa during the civil war?",
        options: [
          "They were killed (poached).",
          "They migrated north.",
          "They died of disease.",
          "They were moved to zoos."
        ],
        answer: "They were killed (poached).",
        explanation: "Soldiers and locals hunted the animals for food and ivory to fund the conflict."
      },
      {
        stopName: "Maputo Railway Station",
        imageKeyword: "Maputo Railway Station",
        description: [
          "Often voted one of the most beautiful train stations in the world, this building in the capital looks more like a palace than a transit hub. It features a grand copper dome and intricate wrought-iron lattice work.",
          "It was designed by an associate of Gustave Eiffel (the creator of the Eiffel Tower). While Eiffel himself never visited Mozambique, his engineering influence is visible in the metal pillars and roof structure.",
          "Today, it serves as a cultural space. It hosts a railway museum and the \"Kulungwana\" art gallery, and on weekends, live jazz bands often play in the cafeteria, turning the station into a trendy nightlife spot."
        ],
        question: "The design of the Maputo Railway Station is associated with which famous engineer?",
        options: [
          "Gustave Eiffel.",
          "Isambard Kingdom Brunel.",
          "Antoni Gaudí.",
          "Frank Lloyd Wright."
        ],
        answer: "Gustave Eiffel.",
        explanation: "The ironwork and structure were designed by architects from his firm."
      },
      {
        stopName: "Tofo Beach",
        imageKeyword: "Tofo Beach",
        description: [
          "Tofo is legendary among divers as the \"Whale Shark Capital of Africa.\" The plankton-rich waters attract these gentle giants year-round, along with giant Manta Rays.",
          "It is the site of a major scientific discovery. It was here that researchers first identified a new species of Manta Ray (the Giant Manta) and discovered that the local population is one of the largest in the world.",
          "The town has a laid-back, hippie vibe. The market sells local crafts and fresh seafood, and the long, curved beach is perfect for surfing, making it a backpacker favorite."
        ],
        question: "Tofo Beach is famous for year-round sightings of which massive fish?",
        options: [
          "Whale Sharks.",
          "Great White Sharks.",
          "Bluefin Tuna.",
          "Swordfish."
        ],
        answer: "Whale Sharks.",
        explanation: "It is one of the few places in the world where these animals are residents rather than seasonal visitors."
      }
    ]
  },
  "Myanmar": {
    tourTitle: "The Golden Land",
    introText: "Thousands of ancient temples rise from the misty plains of Bagan. Watch the fishermen row with their legs on Inle Lake.",
    stops: [
      {
        stopName: "Bagan",
        imageKeyword: "Bagan",
        description: [
          "This ancient city contains the largest concentration of Buddhist temples, pagodas, and stupas in the world. Between the 11th and 13th centuries, over 10,000 temples were constructed here, of which approximately 2,200 still survive today.",
          "The scale of the site is massive, covering 104 square kilometers. Unlike other ruins that are fenced off, these temples are scattered across active farmland where farmers still graze goats and grow peanuts between the ancient monuments.",
          "The most iconic way to view the temples is by hot air balloon at sunrise. As the mist lifts from the Irrawaddy River, the silhouettes of thousands of spires appear against the orange sky."
        ],
        question: "Approximately how many temples survive in Bagan today?",
        options: [
          "About 2,200.",
          "Over 10,000.",
          "Less than 500.",
          "Exactly 100."
        ],
        answer: "About 2,200.",
        explanation: "While over 10,000 were originally built, earthquakes and time have reduced the number to just over two thousand."
      },
      {
        stopName: "Inle Lake",
        imageKeyword: "Inle Lake",
        description: [
          "The local Intha people have developed a unique rowing style found nowhere else on Earth. They stand on the stern of the boat on one leg and wrap their other leg around the oar, allowing them to paddle while keeping their hands free to handle huge conical fishing nets.",
          "This technique evolved because the lake is covered in tall reeds and floating plants. By standing up, the fishermen can see over the vegetation to spot fish and navigate clear channels.",
          "The lake is famous for its floating gardens. Farmers gather weeds from the lake bottom to create floating beds anchored by bamboo poles, where they grow tomatoes and other vegetables directly on the water surface."
        ],
        question: "Why do the fishermen of Inle Lake row with their legs?",
        options: [
          "To see over the tall reeds and keep their hands free for nets.",
          "It is a religious ritual.",
          "Their boats have no seats.",
          "To exercise their legs."
        ],
        answer: "To see over the tall reeds and keep their hands free for nets.",
        explanation: "The standing position provides a higher vantage point to navigate the dense vegetation of the lake."
      },
      {
        stopName: "Shwedagon Pagoda",
        imageKeyword: "Shwedagon Pagoda",
        description: [
          "Standing 99 meters tall, this is the most sacred Buddhist pagoda in Myanmar. It is covered in hundreds of genuine gold plates, and the top of the spire is encrusted with 5,448 diamonds and 2,317 rubies.",
          "At the very tip sits a 76-carat diamond. The entire structure is said to enshrine strands of hair from the Gautama Buddha, making it a major pilgrimage site for Buddhists worldwide.",
          "Visitors must remove their shoes and socks before entering. The floor is made of marble, which stays surprisingly cool during the day, and locals often come here to meditate or simply hang out in the shadow of the gold giant."
        ],
        question: "What precious gem sits at the very tip of the Shwedagon Pagoda?",
        options: [
          "A 76-carat diamond.",
          "A giant ruby.",
          "A massive emerald.",
          "A sapphire."
        ],
        answer: "A 76-carat diamond.",
        explanation: "The \"diamond bud\" at the summit is crowned with a massive single diamond."
      },
      {
        stopName: "Golden Rock",
        imageKeyword: "Golden Rock",
        description: [
          "This gravity-defying granite boulder sits on the very edge of a cliff, looking as if it could roll off at any moment. It is entirely covered in gold leaf applied by male devotees over centuries.",
          "According to legend, the rock is held in place by a single strand of the Buddha's hair placed in the stupa on top. The hair keeps the rock balanced perfectly on the precipice.",
          "The site is reached by a winding truck ride up the mountain followed by a hike. It is especially atmospheric at night when the rock is illuminated and the air is filled with the scent of incense and the sound of chanting."
        ],
        question: "According to legend, what prevents the Golden Rock from falling off the cliff?",
        options: [
          "A strand of the Buddha's hair.",
          "A strong magnet.",
          "It is glued down.",
          "Divine will of the king."
        ],
        answer: "A strand of the Buddha's hair.",
        explanation: "Believers say the hair enshrined in the pagoda maintains the rock's precarious balance."
      },
      {
        stopName: "U Bein Bridge",
        imageKeyword: "U Bein Bridge",
        description: [
          "Located in Amarapura, this is the world's longest and oldest teakwood bridge. It stretches for 1.2 kilometers (0.75 miles) across the Taungthaman Lake.",
          "It was built around 1850 using wood reclaimed from the former royal palace at Inwa. The builder, U Bein, salvaged 1,086 massive teak pillars to construct the bridge, which curves slightly to resist the wind and water current.",
          "The bridge is a center of daily life. Monks in maroon robes, locals carrying goods, and tourists all cross it together, especially at sunset when the light creates a perfect silhouette of the pillars."
        ],
        question: "Where did the wood for the U Bein Bridge originally come from?",
        options: [
          "A former royal palace.",
          "A sunken ship.",
          "A sacred forest.",
          "Imported from India."
        ],
        answer: "A former royal palace.",
        explanation: "The teak pillars were salvaged from the abandoned palace of Inwa."
      }
    ]
  }
};