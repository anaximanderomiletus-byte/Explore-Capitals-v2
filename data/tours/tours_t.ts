import { TourData } from "../../types";

export const toursT: Record<string, TourData> = {
  "Tajikistan": {
    tourTitle: "The Roof of the World",
    introText: "The Pamir Highway winds through mountains known as the Roof of the World. Trek to turquoise lakes high in the Fann Mountains.",
    stops: [
      {
        stopName: "The Pamir Highway",
        imageKeyword: "The Pamir Highway",
        description: [
          "This road is the second-highest international highway in the world, reaching altitudes of 4,655 meters (15,272 feet) at the Ak-Baital Pass. It traverses the Pamir Mountains, known locally as Bam-i-Dunya (\"The Roof of the World\").",
          "It runs along the Panj River, which forms the border with Afghanistan. For hundreds of kilometers, you can look across the narrow river and see Afghan villages and camels walking on the other side, just a stone's throw away.",
          "The landscape is stark and lunar. Because the mountains are so high, they block moisture, creating a high-altitude desert with almost no trees, just rock, snow, and hardy yaks."
        ],
        question: "What does the local name for the Pamirs, Bam-i-Dunya, translate to?",
        options: [
          "The Roof of the World.",
          "The Door to Heaven.",
          "The Eagle's Nest.",
          "The Stone Garden."
        ],
        answer: "The Roof of the World.",
        explanation: "The name reflects the immense height of the plateau and mountains."
      },
      {
        stopName: "Iskanderkul",
        imageKeyword: "Iskanderkul",
        description: [
          "This stunning alpine lake is named after Alexander the Great (Iskander in Persian). Legend says his armies passed through here on their way to India.",
          "According to folklore, Alexander's favorite horse, Bucephalus, drowned in this lake (though history says he died in battle in Pakistan). Locals claim that during the full moon, you can see a white horse rise from the water to graze on the shore.",
          "The water feeds a massive waterfall called the \"Niagara of the Fann Mountains,\" which drops 43 meters into a rocky gorge nearby."
        ],
        question: "Iskanderkul is named after which famous historical conqueror?",
        options: [
          "Alexander the Great.",
          "Genghis Khan.",
          "Napoleon.",
          "Cyrus the Great."
        ],
        answer: "Alexander the Great.",
        explanation: "\"Iskander\" is the Persian version of the name Alexander."
      },
      {
        stopName: "Dushanbe",
        imageKeyword: "Dushanbe Flagpole",
        description: [
          "The capital city, Dushanbe, loves world records. Until recently, it held the record for the world's tallest flagpole (165 meters). It stands near the Palace of Nations.",
          "The city is home to the Kokhi Navruz (Palace of Nowruz). Originally intended to be the world's largest tea house, it became so ornate during construction that it was turned into a VIP palace. Its 12 halls are decorated with cedar wood carving, Florentine mosaics, and Swarovski crystals.",
          "The name \"Dushanbe\" means \"Monday\" in Persian. The city grew out of a small village that was famous for holding a popular market on Mondays."
        ],
        question: "What does the name of the capital city \"Dushanbe\" mean?",
        options: [
          "Monday.",
          "Sunday.",
          "Market.",
          "Beautiful."
        ],
        answer: "Monday.",
        explanation: "It was named after the weekly Monday market held in the original village."
      },
      {
        stopName: "The Wakhan Valley",
        imageKeyword: "Yamchun Fortress",
        description: [
          "This valley was a strategic branch of the Silk Road. The Yamchun Fortress, built in the 3rd century BC, guarded the trade route. It is known as the \"Fortress of Fire Worshippers\" because of its Zoroastrian history.",
          "The walls are built in layers of stone and timber. This layering technique gave the walls flexibility, making them earthquake-resistant in this seismically active region.",
          "Just below the fortress are the Bibi Fatima Hot Springs. The water flows from a stalactite-filled cave and is believed by locals to improve female fertility."
        ],
        question: "Yamchun Fortress was designed with layers of timber to resist what natural disaster?",
        options: [
          "Earthquakes.",
          "Floods.",
          "Sandstorms.",
          "Avalanches."
        ],
        answer: "Earthquakes.",
        explanation: "The wood absorbed the shock waves, preventing the stone walls from crumbling."
      },
      {
        stopName: "Sarazm",
        imageKeyword: "Sarazm",
        description: [
          "This is Tajikistan's first UNESCO World Heritage site. It is an archaeological settlement dating back 5,500 years, making it one of the oldest cities in Central Asia.",
          "It was a major metallurgical center. The inhabitants were early masters of processing gold, copper, and tin, trading these metals across a vast network stretching from the Iranian plateau to the Indus Valley.",
          "The \"Lady of Sarazm\" was discovered here. Her tomb contained rich jewelry made of lapis lazuli and turquoise, proving the long-distance trade connections of this proto-urban civilization."
        ],
        question: "The ancient city of Sarazm was a major center for processing what materials?",
        options: [
          "Metals (Gold, copper, tin).",
          "Silk.",
          "Spices.",
          "Pottery."
        ],
        answer: "Metals (Gold, copper, tin).",
        explanation: "It was an industrial hub for early metallurgy in the region."
      }
    ]
  },
  "Tanzania": {
    tourTitle: "The Soul of Safari",
    introText: "The plains of the Serengeti teem with millions of migrating animals. Climb to the snow-capped peak of Mount Kilimanjaro.",
    stops: [
      {
        stopName: "Mount Kilimanjaro",
        imageKeyword: "Mount Kilimanjaro",
        description: [
          "Standing at 5,895 meters (19,341 feet), this is the highest mountain in Africa and the highest single free-standing mountain in the world (it is not part of a mountain range).",
          "It is a dormant stratovolcano composed of three distinct cones: Kibo (the summit), Mawenzi, and Shira. While Shira and Mawenzi are extinct, Kibo is dormant and could technically erupt again.",
          "The climb is a journey through climate zones. Hikers start in tropical rainforest, move through heath and moorland, cross an alpine desert, and finish in an arctic zone of ice and snow at the summit."
        ],
        question: "How many volcanic cones make up Mount Kilimanjaro?",
        options: [
          "Three (Kibo, Mawenzi, Shira).",
          "One.",
          "Five.",
          "Two."
        ],
        answer: "Three (Kibo, Mawenzi, Shira).",
        explanation: "It is a triple volcano, with Kibo being the highest and youngest cone."
      },
      {
        stopName: "The Serengeti",
        imageKeyword: "Serengeti National Park",
        description: [
          "The Serengeti ecosystem hosts the largest terrestrial mammal migration in the world. Over 1.5 million wildebeest, 250,000 zebras, and vast herds of gazelles move in a constant circular loop following the rain.",
          "The name \"Serengeti\" comes from the Maasai word Siringit, which means \"Endless Plains.\" The landscape is defined by vast, flat grasslands dotted with kopjes (granite rock outcrops) where lions like to rest.",
          "It is the best place to see a lion kill. The abundance of prey supports a massive population of predators, including over 3,000 lions."
        ],
        question: "What does the Maasai word \"Serengeti\" translate to?",
        options: [
          "Endless Plains.",
          "Land of Lions.",
          "Great River.",
          "High Mountain."
        ],
        answer: "Endless Plains.",
        explanation: "It describes the vast, flat grasslands that stretch to the horizon."
      },
      {
        stopName: "Ngorongoro Crater",
        imageKeyword: "Ngorongoro Crater",
        description: [
          "This is the world's largest inactive, unbroken, and unfilled volcanic caldera. It was formed when a volcano the size of Kilimanjaro exploded and collapsed on itself 2.5 million years ago.",
          "It acts as a natural enclosure for wildlife. The steep 600-meter walls keep most animals inside the \"bowl\" year-round, creating the highest density of large predators (lions and hyenas) in Africa.",
          "It is one of the few places in Tanzania to see the Black Rhino. The enclosed nature of the crater makes it easier for rangers to protect these critically endangered animals from poachers."
        ],
        question: "What geological feature is the Ngorongoro Crater?",
        options: [
          "A volcanic caldera.",
          "A meteor crater.",
          "A glacial valley.",
          "A river basin."
        ],
        answer: "A volcanic caldera.",
        explanation: "It is the collapsed mouth of a massive ancient volcano."
      },
      {
        stopName: "Zanzibar",
        imageKeyword: "Stone Town Zanzibar",
        description: [
          "Zanzibar is known as the \"Spice Island\" for its production of cloves, nutmeg, and cinnamon. Stone Town is the historic heart, a maze of alleys blending African, Arab, Indian, and European influences.",
          "The architecture is famous for its carved wooden doors. There are two main styles: Indian doors (with folding shutters and brass spikes originally meant to stop war elephants) and Arab doors (with intricate friezes and Quranic inscriptions).",
          "It is the birthplace of Freddie Mercury (Farrokh Bulsara). The lead singer of Queen was born here in 1946, and his childhood home is now a museum."
        ],
        question: "Why do the Indian-style doors in Zanzibar have brass spikes?",
        options: [
          "To deter war elephants.",
          "For decoration.",
          "To hold lanterns.",
          "To keep out thieves."
        ],
        answer: "To deter war elephants.",
        explanation: "While there were no elephants in Zanzibar, the design tradition was brought over from India where it served a defensive purpose."
      },
      {
        stopName: "Lake Natron",
        imageKeyword: "Lake Natron",
        description: [
          "This soda lake is incredibly alkaline (pH up to 10.5) due to volcanic ash from the nearby Ol Doinyo Lengai volcano. The water is so caustic it can burn skin, but it is a paradise for 2.5 million Lesser Flamingos, who breed here safely because predators cannot wade through the corrosive water.",
          "The water is red due to cyanobacteria that thrive in the salty environment. This matches the pink feathers of the flamingos, who get their color from eating the algae.",
          "Animals that die in the lake can become calcified. The sodium carbonate in the water acts as a preservative, turning dead birds and bats into stone-like \"mummies\" that wash up on the shore."
        ],
        question: "Why is Lake Natron the safest breeding ground for flamingos?",
        options: [
          "The caustic water deters predators.",
          "It is hidden in a forest.",
          "The water is fresh and sweet.",
          "There are no fish."
        ],
        answer: "The caustic water deters predators.",
        explanation: "Hyenas and jackals cannot wade through the burning, alkaline water to reach the nests."
      }
    ]
  },
  "Thailand": {
    tourTitle: "The Land of Smiles",
    introText: "The Grand Palace glitters with gold in the heart of Bangkok. Swim in the clear waters of Maya Bay, sheltered by limestone cliffs.",
    stops: [
      {
        stopName: "The Grand Palace",
        imageKeyword: "The Grand Palace Bangkok",
        description: [
          "Built in 1782, this complex was the official residence of the Kings of Siam. It is a dazzling display of Thai architecture, with buildings covered in gold leaf, colored glass mosaics, and porcelain.",
          "It houses the Temple of the Emerald Buddha. Despite the name, the statue is actually carved from a single block of green jade (or jasper). It is the palladium of Thailand, the most sacred image in the country.",
          "The Emerald Buddha has three different outfits made of gold. The King of Thailand (or the Crown Prince) personally climbs up to change the statue's clothes at the start of the Summer, Rainy, and Winter seasons in a solemn ritual."
        ],
        question: "The \"Emerald Buddha\" is actually carved from what material?",
        options: [
          "Jade (or Jasper).",
          "Emerald.",
          "Gold.",
          "Glass."
        ],
        answer: "Jade (or Jasper).",
        explanation: "It is named \"Emerald\" for its green color, not the stone itself."
      },
      {
        stopName: "Ayutthaya Historical Park",
        imageKeyword: "Ayutthaya",
        description: [
          "Ayutthaya was the capital of Siam for 417 years. By 1700, it was the largest city in the world, with a population of one million, until it was destroyed by the Burmese army in 1767.",
          "The ruins are famous for the \"Buddha Head in Tree Roots\" at Wat Mahathat. When the Burmese beheaded the statues, one head fell into the roots of a tree, which grew around it over centuries, lifting it up as if to protect it.",
          "The city was an island. It was surrounded by three rivers and a network of canals, leading European traders to call it the \"Venice of the East.\""
        ],
        question: "At its peak in 1700, Ayutthaya held what global distinction?",
        options: [
          "It was the largest city in the world.",
          "It was the oldest city.",
          "It had the tallest building.",
          "It was the richest city."
        ],
        answer: "It was the largest city in the world.",
        explanation: "With 1 million inhabitants, it was a massive trade hub before its destruction."
      },
      {
        stopName: "Railay Beach",
        imageKeyword: "Railay Beach",
        description: [
          "Located in Krabi, this peninsula is cut off from the mainland by high limestone cliffs, making it accessible only by boat. This isolation gives it a laid-back island vibe even though it is part of the mainland.",
          "It is a world-class rock climbing destination. The karst cliffs offer over 700 bolted climbing routes right over the ocean, allowing climbers to fall safely into the water (deep water soloing) in some areas.",
          "The \"Princess Cave\" (Phra Nang Cave) is located on the beach. It is filled with carved wooden phalluses offered by fishermen to the spirit of a drowned princess, asking for fertility and good catches."
        ],
        question: "Why is Railay Beach accessible only by boat?",
        options: [
          "High limestone cliffs cut it off from the mainland.",
          "It is an island.",
          "The road was destroyed.",
          "It is a private resort."
        ],
        answer: "High limestone cliffs cut it off from the mainland.",
        explanation: "The steep mountains block any road access to the peninsula."
      },
      {
        stopName: "Damnoen Saduak Floating Market",
        imageKeyword: "Damnoen Saduak Floating Market",
        description: [
          "This is the most famous floating market in Thailand. Vendors paddle small wooden boats laden with piles of tropical fruit, flowers, and coconut pancakes along the narrow canals.",
          "It features \"Boat Noodles.\" Vendors cook noodle soup in cauldrons right on their small, wobbly sampans, handing piping hot bowls to customers on the banks or in other boats.",
          "The market was originally created by King Rama IV in the 19th century to connect the Mae Klong and Tha Chin rivers, supporting the soil-rich agricultural area."
        ],
        question: "What famous dish is cooked and served directly from small boats at the market?",
        options: [
          "Boat Noodles.",
          "Pad Thai.",
          "Green Curry.",
          "Mango Sticky Rice."
        ],
        answer: "Boat Noodles.",
        explanation: "A rich noodle soup traditionally prepared on the water."
      },
      {
        stopName: "The White Temple",
        imageKeyword: "The White Temple",
        description: [
          "Located in Chiang Rai, this is a contemporary art exhibit in the style of a Buddhist temple. It is completely white (symbolizing Buddha's purity) and embedded with pieces of mirrored glass (symbolizing his wisdom).",
          "To enter the main building, you must cross the \"Bridge of the Cycle of Rebirth.\" Beneath the bridge are hundreds of reaching hands symbolizing unrestrained desire and suffering (hell). Crossing the bridge represents moving from suffering to enlightenment.",
          "The interior murals are bizarrely modern. Instead of traditional religious scenes, the artist has painted pop culture icons like Keanu Reeves (The Matrix), Michael Jackson, Superman, and Hello Kitty to represent the distractions of the modern world (Samsara)."
        ],
        question: "What do the hundreds of hands reaching up from the ground under the bridge represent?",
        options: [
          "Unrestrained desire (Hell/Suffering).",
          "Hope.",
          "Prayer.",
          "Ancestors."
        ],
        answer: "Unrestrained desire (Hell/Suffering).",
        explanation: "They symbolize the grasping nature of human greed that one must overcome to reach enlightenment."
      }
    ]
  },
  "Timor-Leste": {
    tourTitle: "The Rising Sun of Asia",
    introText: "The massive Christo Rei statue looks out over the capital, Dili. Dive in reefs that have more fish species than almost anywhere else.",
    stops: [
      {
        stopName: "Christo Rei of Dili",
        imageKeyword: "Christo Rei Dili",
        description: [
          "This 27-meter tall copper statue of Jesus stands atop a globe at the end of the Fatucama Peninsula. It is reached by climbing 597 steps past the Stations of the Cross.",
          "It was a gift from the Indonesian government in 1996 (during the occupation) to the people of East Timor. The height (27 meters) symbolized East Timor being the 27th province of Indonesia—a symbolism that was controversial at the time.",
          "Despite its political origins, the Timorese people (who are predominantly Catholic) have embraced it. It faces west toward Jakarta, but locals say Jesus's open arms are actually blessing the capital city of Dili below."
        ],
        question: "Why is the Christo Rei statue exactly 27 meters tall?",
        options: [
          "To symbolize Timor being the 27th province of Indonesia.",
          "Because Jesus was 27 years old.",
          "It was the limit of the crane.",
          "To match the number of apostles."
        ],
        answer: "To symbolize Timor being the 27th province of Indonesia.",
        explanation: "The Indonesian government built it to mark the territory's integration, though Timor later gained independence."
      },
      {
        stopName: "Atauro Island",
        imageKeyword: "Atauro Island",
        description: [
          "Located 25km north of Dili, this island sits in the \"Coral Triangle.\" A 2016 biological survey found that the waters around Atauro have the highest biodiversity of reef fish in the world, averaging 253 species per site.",
          "It is a prime location for whale watching. The deep channel between Atauro and the mainland is a superhighway for migrating Blue Whales, Sperm Whales, and pods of hundreds of dolphins.",
          "The island is also famous for traditional spearfishing. Local women, known as the Wawata Topu, dive underwater wearing handmade goggles to catch fish with spear guns to feed their families."
        ],
        question: "Atauro Island holds a world record for what?",
        options: [
          "Highest biodiversity of reef fish per site.",
          "Largest active volcano.",
          "Smallest island.",
          "Tallest palm tree."
        ],
        answer: "Highest biodiversity of reef fish per site.",
        explanation: "Surveys recorded more fish species here than anywhere else on the planet."
      },
      {
        stopName: "Mount Ramelau",
        imageKeyword: "Mount Ramelau",
        description: [
          "Standing at 2,986 meters, this is the highest mountain in Timor-Leste. The summit is crowned by a statue of the Virgin Mary, making it a major religious pilgrimage site.",
          "Every year in October, thousands of pilgrims hike to the top overnight to hold mass at sunrise. The view from the peak is incredible; on a clear day, you can see both the north coast (Banda Sea) and the south coast (Timor Sea) of the island simultaneously.",
          "The mountain is considered sacred not just by Catholics but also by animists, who believe the peak is the dwelling place of the spirits of their ancestors."
        ],
        question: "What statue stands at the summit of Mount Ramelau?",
        options: [
          "The Virgin Mary.",
          "Buddha.",
          "A local king.",
          "A soldier."
        ],
        answer: "The Virgin Mary.",
        explanation: "The religious statue marks the peak as a site for annual Catholic pilgrimage."
      },
      {
        stopName: "Jaco Island",
        imageKeyword: "Jaco Island",
        description: [
          "This tiny, uninhabited island lies off the eastern tip of Timor. It is considered \"sacred land\" (Lulik) by the local people, meaning no one is allowed to live there or build structures on it.",
          "Because of this taboo, the island remains pristine. It features blindingly white sand and turquoise water that rivals the Maldives. Visitors can take a fisherman's boat across for the day but must leave before sunset.",
          "It is part of the Nino Konis Santana National Park, the country's first national park. The surrounding waters are teeming with protected marine life, making it perfect for snorkeling."
        ],
        question: "Why is Jaco Island uninhabited?",
        options: [
          "It is considered sacred land (Lulik).",
          "There is no fresh water.",
          "It is full of snakes.",
          "The government banned people."
        ],
        answer: "It is considered sacred land (Lulik).",
        explanation: "Local spiritual beliefs forbid permanent habitation, preserving its natural state."
      },
      {
        stopName: "Tais Market",
        imageKeyword: "Tais Market",
        description: [
          "Tais is the traditional hand-woven textile of Timor-Leste. It plays a crucial role in the culture, used for ceremonial clothing, dowries, and gifts of respect.",
          "Each district in the country has its own distinct colors and patterns. For example, Tais from the west uses dark, earthy colors, while Tais from the east uses bright reds and oranges.",
          "Weaving is done exclusively by women on back-strap looms. The designs often incorporate family history and legends, passed down from mother to daughter through the patterns."
        ],
        question: "What is Tais?",
        options: [
          "Traditional hand-woven textile.",
          "A spicy soup.",
          "A type of dance.",
          "A wooden boat."
        ],
        answer: "Traditional hand-woven textile.",
        explanation: "This cloth is the most significant cultural artifact of the nation."
      }
    ]
  },
  "Togo": {
    tourTitle: "The Smile of Africa",
    introText: "The fetish market in Lomé sells traditional charms and medicines. Hike through the coffee and cocoa plantations in the hills.",
    stops: [
      {
        stopName: "Akodessewa Fetish Market",
        imageKeyword: "Akodessewa Fetish Market",
        description: [
          "Located in the capital, Lomé, this is the world's largest Voodoo (Vodun) market. It acts as a \"pharmacy\" for traditional healers, selling everything from leopard heads and crocodile skins to dried chameleons and monkey skulls.",
          "In the Voodoo religion, these objects are not meant to be scary; they are ingredients used to create fetishes that offer protection, healing, or good luck.",
          "Visitors can consult with a fetish priest. The priest may prescribe a specific charm or ritual to solve problems ranging from illness to financial trouble, using the items sold in the stalls."
        ],
        question: "What is the primary function of the items sold at the Akodessewa market?",
        options: [
          "Ingredients for traditional medicine/charms.",
          "Souvenirs for tourists.",
          "Food for cooking.",
          "Toys for children."
        ],
        answer: "Ingredients for traditional medicine/charms.",
        explanation: "They are used by healers to treat spiritual and physical ailments."
      },
      {
        stopName: "Koutammakou",
        imageKeyword: "Koutammakou",
        description: [
          "This UNESCO World Heritage site is home to the Batammariba people, whose name means \"those who are the real architects of the earth.\" They build unique mud tower-houses called Takienta.",
          "The houses are designed for defense. They look like miniature castles, with livestock kept on the ground floor and the family living on the upper level or the roof to stay safe from invaders and wild animals.",
          "They are considered living beings. The house has a \"mouth\" (door) and \"eyes\" (windows), and a shrine is built in front of the entrance to house the ancestors' spirits who protect the home."
        ],
        question: "What is the name of the Batammariba people's fortress-like mud houses?",
        options: [
          "Takienta.",
          "Igloos.",
          "Yurts.",
          "Pagodas."
        ],
        answer: "Takienta.",
        explanation: "These structures serve as both homes and defensive forts."
      },
      {
        stopName: "Lake Togo",
        imageKeyword: "Lake Togo",
        description: [
          "This shallow lagoon is the spiritual heart of the country. The town on its northern shore, Togoville, is where the German explorer Gustav Nachtigal signed a treaty with the local king in 1884, giving the entire country its name.",
          "Togoville is a center of religious syncretism. It is famous for having a Catholic cathedral built to honor a visitation of the Virgin Mary, sitting right next to active animist shrines dedicated to Voodoo spirits.",
          "Visitors must cross the lake in a pirogue (wooden canoe). The water is so shallow that the boatmen often pole the boat across rather than paddling."
        ],
        question: "Which town gave the country of Togo its name?",
        options: [
          "Togoville.",
          "Lomé.",
          "Kpalimé.",
          "Kara."
        ],
        answer: "Togoville.",
        explanation: "The colonial treaty signed there extended the name of the village to the whole territory."
      },
      {
        stopName: "Kpalimé",
        imageKeyword: "Kpalimé",
        description: [
          "Located in the Plateaux Region, this is the center of Togo's coffee and cocoa production. The landscape is lush and mountainous, offering a cool escape from the heat of the coast.",
          "It is a hub for artisans. The town is filled with workshops where craftsmen engage in wood carving, batik fabric painting, and pottery, drawing inspiration from the surrounding nature.",
          "Nearby is Mount Agou, the highest peak in Togo (986 meters). Hikers climb through avocado and cacao farms to reach the summit, which offers panoramic views all the way to Ghana."
        ],
        question: "Kpalimé is the primary production center for which two crops?",
        options: [
          "Coffee and Cocoa.",
          "Rice and Wheat.",
          "Cotton and Rubber.",
          "Corn and Soy."
        ],
        answer: "Coffee and Cocoa.",
        explanation: "The cool, hilly climate is perfect for growing these cash crops."
      },
      {
        stopName: "Cascade de Kpimé",
        imageKeyword: "Cascade de Kpimé",
        description: [
          "While not the widest waterfall, Kpimé is significant because it is a primary water source for the nearby city. The water tumbles down a steep cliff face surrounded by dense forest.",
          "It is a popular picnic spot. Locals gather here on weekends to bathe in the pools at the bottom and enjoy the shade.",
          "During the dry season, the falls can reduce to a trickle, but in the rainy season, the black rock face glistens with white foam, visible from miles away."
        ],
        question: "What major utility does the Cascade de Kpimé provide for the city of Kpalimé?",
        options: [
          "Drinking water.",
          "Electricity.",
          "Fish.",
          "Transportation."
        ],
        answer: "Drinking water.",
        explanation: "The falls are part of the water catchment system for the region."
      }
    ]
  },
  "Tonga": {
    tourTitle: "The Friendly Islands",
    introText: "Humpback whales nurse their calves in the warm waters of Vava'u. Watch the blowholes spray water high into the air on the coral coast.",
    stops: [
      {
        stopName: "Mapu'a 'a Vaea Blowholes",
        imageKeyword: "Mapu'a 'a Vaea Blowholes",
        description: [
          "This stretch of coastline on Tongatapu extends for 5 kilometers. When the swell is strong, hundreds of blowholes erupt simultaneously along the jagged coral terrace, creating a wall of water spouts up to 30 meters high.",
          "The name translates to \"The Whistle of the Noble.\" The sound of the wind rushing through the volcanic vents creates a distinct whistling noise just before the water blasts out.",
          "It is one of the few places on Earth where you can see blowholes acting in concert rather than just a single isolated spout."
        ],
        question: "What does the name \"Mapu'a 'a Vaea\" mean?",
        options: [
          "The Whistle of the Noble.",
          "The Angry Ocean.",
          "The Dragon's Breath.",
          "The King's Fountain."
        ],
        answer: "The Whistle of the Noble.",
        explanation: "It refers to the whistling sound the air makes as it is forced through the rock vents."
      },
      {
        stopName: "Ha'amonga 'a Maui Trilithon",
        imageKeyword: "Ha'amonga 'a Maui",
        description: [
          "Often called the \"Stonehenge of the Pacific,\" this structure was built around 1200 AD. It consists of three massive coral limestone slabs, each weighing around 40 tons, arranged into a gateway.",
          "Legend says it was built by the demigod Maui, who carried the stones on his back from an island hundreds of miles away.",
          "It likely served as an astronomical calendar. Marks on the top stone align perfectly with the sunrise during the winter and summer solstices, helping the ancient Tongans track the seasons."
        ],
        question: "The Ha'amonga 'a Maui is often compared to which famous British monument?",
        options: [
          "Stonehenge.",
          "Big Ben.",
          "The London Eye.",
          "Hadrian's Wall."
        ],
        answer: "Stonehenge.",
        explanation: "Both are ancient megalithic structures that function as solar calendars."
      },
      {
        stopName: "Anahulu Cave",
        imageKeyword: "Anahulu Cave",
        description: [
          "This is the only freshwater cave pool in Tonga. It is located on the island of Tongatapu and features a large underground swimming hole filled with crystal-clear brackish water.",
          "The cave is filled with stalactites and stalagmites. Visitors can swim in the cool water while looking up at the rock formations hanging from the ceiling.",
          "Historically, the cave was used as a shelter. Local tradition says chieftains used the hidden depths of the cave for meetings or as a refuge during tribal conflicts."
        ],
        question: "What is the unique feature of Anahulu Cave for swimmers?",
        options: [
          "An underground freshwater pool.",
          "A heated spa.",
          "A coral reef.",
          "A waterfall slide."
        ],
        answer: "An underground freshwater pool.",
        explanation: "It allows visitors to swim inside a limestone cavern."
      },
      {
        stopName: "Vava'u",
        imageKeyword: "Vava'u Whales",
        description: [
          "Tonga is one of the few countries in the world that allows people to swim with Humpback Whales. Every year from July to October, the whales migrate from Antarctica to these warm, sheltered waters to give birth and mate.",
          "The experience is strictly regulated. Only licensed guides can approach the whales, and they ensure that the animals are comfortable before allowing swimmers to slide quietly into the water.",
          "Because the calves are born here, they are often playful and curious, sometimes approaching swimmers while the massive mother rests below."
        ],
        question: "Why do Humpback Whales migrate to Tonga every year?",
        options: [
          "To give birth and mate.",
          "To feed on krill.",
          "To hide from sharks.",
          "To sleep for winter."
        ],
        answer: "To give birth and mate.",
        explanation: "The warm, protected waters serve as a nursery for newborn calves."
      },
      {
        stopName: "Royal Palace",
        imageKeyword: "Royal Palace Tonga",
        description: [
          "Built in 1867, this is the official residence of the King of Tonga. It is distinct because it is built entirely of wood (kauri timber) shipped from New Zealand, designed in a Victorian style.",
          "Tonga is the only Pacific nation that never lost its indigenous sovereignty to a foreign power (it was a British protectorate, but the monarchy remained in power). The palace is a symbol of this unbroken royal lineage.",
          "It is surrounded by a low stone wall. While visitors cannot enter the grounds, the palace is easily visible from the waterfront, especially the royal standard flag flying when the King is in residence."
        ],
        question: "What material was used to build the Royal Palace of Tonga?",
        options: [
          "Wood (Kauri timber).",
          "Coral stone.",
          "Marble.",
          "Brick."
        ],
        answer: "Wood (Kauri timber).",
        explanation: "The prefabricated wooden structure was imported from New Zealand."
      }
    ]
  },
  "Trinidad and Tobago": {
    tourTitle: "The Land of the Hummingbird",
    introText: "The steel pan drum was invented on these vibrant Caribbean islands. Watch the leatherback turtles lay eggs on the sandy shores.",
    stops: [
      {
        stopName: "Pitch Lake",
        imageKeyword: "Pitch Lake",
        description: [
          "Located in La Brea, this is the largest natural deposit of asphalt in the world. It covers about 100 acres and is essentially a lake of semi-solid black tar.",
          "The asphalt from here has been used to pave roads all over the world, including the mall outside Buckingham Palace in London and the Lincoln Tunnel in New York.",
          "Visitors can walk on the surface. It feels like rubbery elephant skin. In some spots, the pitch is soft and liquid (\"mother of the lake\"), and legend says it will swallow anyone who stands still too long."
        ],
        question: "Asphalt from Pitch Lake was used to pave the area outside which famous British landmark?",
        options: [
          "Buckingham Palace.",
          "The Tower of London.",
          "Stonehenge.",
          "The Houses of Parliament."
        ],
        answer: "Buckingham Palace.",
        explanation: "The high-quality natural bitumen was exported to pave prestigious roads in London and New York."
      },
      {
        stopName: "The Steel Pan Yards",
        imageKeyword: "Steel Pan Drums",
        description: [
          "The Steel Pan is the only acoustic musical instrument invented in the 20th century. It originated in Trinidad in the 1930s when locals began pounding on discarded oil drums to create different notes.",
          "The \"Pan Yards\" are the rehearsal spaces for massive steel bands, some of which have over 100 players. The sound of a full steel orchestra is incredibly loud and euphoric, known as the \"engine room\" of the Carnival.",
          "Carnival in Trinidad is legendary. It is widely considered the greatest street parade in the world after Rio, famous for its elaborate costumes (Mas) and Soca music."
        ],
        question: "The Steel Pan was invented using discarded containers from which industry?",
        options: [
          "The oil industry.",
          "The shipping industry.",
          "The fishing industry.",
          "The mining industry."
        ],
        answer: "The oil industry.",
        explanation: "Musicians repurposed 55-gallon oil drums into sophisticated instruments."
      },
      {
        stopName: "Caroni Bird Sanctuary",
        imageKeyword: "Caroni Bird Sanctuary",
        description: [
          "This massive mangrove swamp is the roosting place of the Scarlet Ibis, the national bird of Trinidad.",
          "During the day, the birds feed in Venezuela, but every evening just before sunset, thousands of them return to Caroni. They fly in bright red clouds against the green mangroves, looking like ornaments decorating a Christmas tree.",
          "The birds get their intense red color from their diet. They eat crabs and shrimp rich in carotene; young birds are grey and only turn red as they mature."
        ],
        question: "What is the national bird of Trinidad found in the Caroni Swamp?",
        options: [
          "The Scarlet Ibis.",
          "The Hummingbird.",
          "The Flamingo.",
          "The Parrot."
        ],
        answer: "The Scarlet Ibis.",
        explanation: "Thousands of these brilliant red birds return to the swamp every evening to sleep."
      },
      {
        stopName: "Nylon Pool",
        imageKeyword: "The Nylon Pool",
        description: [
          "This is a shallow sandbar located miles offshore from Tobago. The water is about waist-deep and incredibly clear, with a bottom made of soft white coral sand.",
          "It was named by Princess Margaret in 1962. She claimed the water was as clear as her nylon stockings, and the name stuck.",
          "Local legend claims it is a \"Fountain of Youth.\" It is said that swimming in the mineral-rich water will make you look ten years younger (or at least feel like it)."
        ],
        question: "Who gave the Nylon Pool its unusual name?",
        options: [
          "Princess Margaret.",
          "Queen Elizabeth II.",
          "Christopher Columbus.",
          "Bob Marley."
        ],
        answer: "Princess Margaret.",
        explanation: "She compared the transparency of the water to her sheer nylon stockings during her honeymoon visit."
      },
      {
        stopName: "Grande Riviere",
        imageKeyword: "Leatherback Turtle Trinidad",
        description: [
          "This beach on the north coast of Trinidad is one of the most important nesting sites in the world for Leatherback Turtles. During the peak season (March to August), hundreds of turtles can come ashore in a single night.",
          "The turtles are colossal, weighing up to 2,000 lbs. Visitors must watch in silence with red lights (which don't disturb the turtles) as the mothers dig deep pits to lay their eggs.",
          "The beach is unique because the river runs through it. Sometimes, the river changes course and uncovers eggs, which attracts vultures, highlighting the fragile cycle of life nature displays here."
        ],
        question: "What is the best time of day to watch Leatherback Turtles nesting?",
        options: [
          "Night.",
          "Morning.",
          "Noon.",
          "Afternoon."
        ],
        answer: "Night.",
        explanation: "The turtles emerge from the ocean under the cover of darkness to lay their eggs."
      }
    ]
  },
  "Tunisia": {
    tourTitle: "The Jewel of the Maghreb",
    introText: "The amphitheater of El Jem rivals the Colosseum in its size. Walk through the blue and white streets of Sidi Bou Said.",
    stops: [
      {
        stopName: "Amphitheatre of El Jem",
        imageKeyword: "El Jem Amphitheatre",
        description: [
          "This Roman amphitheater is one of the largest and best-preserved in the world, capable of holding 35,000 spectators. Unlike the Colosseum in Rome, it stands free of scaffolding and surrounding skyscrapers, dominating the small town around it.",
          "It was built in the 3rd century AD to showcase the wealth of the olive oil trade in the region (Thysdrus).",
          "It is famous for its basement. The underground tunnels where gladiators and wild beasts (lions, leopards) were kept are perfectly intact, allowing visitors to walk the same path the fighters took before entering the arena."
        ],
        question: "The construction of the El Jem amphitheater was funded by the wealth from which trade?",
        options: [
          "Olive Oil.",
          "Gold.",
          "Salt.",
          "Spices."
        ],
        answer: "Olive Oil.",
        explanation: "The region produced massive amounts of olive oil for the Roman Empire, generating immense wealth."
      },
      {
        stopName: "Sidi Bou Said",
        imageKeyword: "Sidi Bou Said",
        description: [
          "Perched on a cliff overlooking the Mediterranean, this village is famous for its strict color scheme: all buildings must be painted brilliant white, and all doors, shutters, and decorative ironwork must be \"Sidi Bou Said Blue.\"",
          "It has been a bohemian retreat for artists for a century. Famous painters like Paul Klee and writers like André Gide lived here, inspired by the light and colors.",
          "Visitors traditionally drink mint tea with pine nuts at the Café des Nattes. The cafe is a cultural landmark with mat-covered benches where the artistic elite used to gather."
        ],
        question: "What specific color must all doors and shutters in Sidi Bou Said be painted?",
        options: [
          "Blue.",
          "Red.",
          "Green.",
          "Black."
        ],
        answer: "Blue.",
        explanation: "The village enforces a strict blue-and-white color code to maintain its iconic look."
      },
      {
        stopName: "Carthage",
        imageKeyword: "Carthage Ruins",
        description: [
          "Once the capital of the Punic Empire and the sworn enemy of Rome, Carthage was the home of Hannibal (who crossed the Alps with elephants).",
          "The Romans destroyed the city in 146 BC, famously sowing the ground with salt (legend says), but then rebuilt a massive Roman city on top of it. Most of the ruins visible today, like the massive Antonine Baths, are Roman, not Punic.",
          "The site is extensive. It includes the Byrsa Hill, which offers a view of the modern presidential palace and the ancient Punic ports, which were circular harbors designed to hide the navy ships from view."
        ],
        question: "Most of the visible ruins at Carthage today were built by which civilization?",
        options: [
          "The Romans.",
          "The Greeks.",
          "The Egyptians.",
          "The Ottomans."
        ],
        answer: "The Romans.",
        explanation: "After destroying the original Punic city, Rome rebuilt Carthage as a major Roman metropolis."
      },
      {
        stopName: "Matmata",
        imageKeyword: "Matmata",
        description: [
          "The Berber residents of Matmata live in underground homes to escape the desert heat. They dig massive circular pits into the ground and then tunnel rooms into the walls of the pit.",
          "It became world-famous as the filming location for Star Wars: A New Hope. The Hotel Sidi Driss served as the interior of Luke Skywalker's childhood home on the planet Tatooine.",
          "You can still stay in the \"Star Wars Hotel.\" The dining room still features the original set decorations from the 1977 movie, allowing fans to eat breakfast in the Lars homestead."
        ],
        question: "Matmata's underground houses served as the home of which Star Wars character?",
        options: [
          "Luke Skywalker.",
          "Han Solo.",
          "Darth Vader.",
          "Princess Leia."
        ],
        answer: "Luke Skywalker.",
        explanation: "The Hotel Sidi Driss was used as the set for the Lars homestead on Tatooine."
      },
      {
        stopName: "Kairouan",
        imageKeyword: "Great Mosque of Kairouan",
        description: [
          "Kairouan is considered the fourth holiest city in Islam (after Mecca, Medina, and Jerusalem). Seven visits to Kairouan are said to equal one Hajj to Mecca.",
          "The Great Mosque is the oldest Muslim place of worship in North Africa, founded in 670 AD. Its minaret is the oldest standing minaret in the world, looking more like a military watchtower than a religious spire.",
          "The mosque reused Roman materials. The columns in the prayer hall were taken from the ruins of Carthage and other Roman cities, resulting in a \"forest of columns\" made of different types of marble and granite."
        ],
        question: "The minaret of the Great Mosque of Kairouan holds what world record?",
        options: [
          "Oldest standing minaret in the world.",
          "Tallest minaret.",
          "Widest minaret.",
          "First stone minaret."
        ],
        answer: "Oldest standing minaret in the world.",
        explanation: "Built in the 8th century, it has survived in its original form longer than any other."
      }
    ]
  },
  "Turkey": {
    tourTitle: "The Bridge of Civilizations",
    introText: "Hot air balloons float over the fairy chimneys of Cappadocia at sunrise. Walk through the Hagia Sophia, a church turned mosque turned museum.",
    stops: [
      {
        stopName: "Hagia Sophia",
        imageKeyword: "Hagia Sophia",
        description: [
          "This architectural wonder has served as the center of religious life for 1,500 years. It was built as a Christian cathedral in 537 AD by Emperor Justinian, then became a Mosque in 1453, a museum in 1935, and a Mosque again in 2020.",
          "For nearly 1,000 years, it was the largest cathedral in the world. Its massive dome changed the history of architecture; it was the first time a round dome was successfully placed on a square room using \"pendentives.\"",
          "The interior reflects its dual history. You can see Christian mosaics of angels and Jesus on the ceiling peeking out from behind massive roundels inscribed with Islamic calligraphy, symbolizing the city's layered past. Viking mercenaries carved runic graffiti into the marble railings in the 9th century."
        ],
        question: "Who carved graffiti into the marble railings of the Hagia Sophia in the 9th century?",
        options: [
          "Viking mercenaries (The Varangian Guard).",
          "Roman soldiers.",
          "Ottoman scribes.",
          "Crusader knights."
        ],
        answer: "Viking mercenaries (The Varangian Guard).",
        explanation: "Norse warriors served as elite bodyguards to the Byzantine Emperors and left their mark on the church."
      },
      {
        stopName: "Cappadocia",
        imageKeyword: "Cappadocia",
        description: [
          "This region is famous for its \"Fairy Chimneys\"—tall, thin spires of rock formed by volcanic erosion. Ancient people carved homes, churches, and pigeon lofts directly into these soft stone pillars.",
          "Beneath the surface lie massive underground cities like Derinkuyu. These subterranean bunkers extend up to 18 stories deep and could shelter 20,000 people along with their livestock during Arab-Byzantine wars.",
          "Every morning at sunrise, hundreds of hot air balloons launch simultaneously. The wind conditions and the surreal landscape make it the most popular place in the world for ballooning."
        ],
        question: "What were the underground cities of Cappadocia used for?",
        options: [
          "Hiding/Shelter during wars.",
          "Storing wine.",
          "Burial grounds.",
          "Mining gold."
        ],
        answer: "Hiding/Shelter during wars.",
        explanation: "Christians retreated underground to escape raiding armies, closing the tunnels with massive stone wheels."
      },
      {
        stopName: "Pamukkale",
        imageKeyword: "Pamukkale",
        description: [
          "Pamukkale means \"Cotton Castle\" in Turkish. It is a hillside covered in dazzling white terraces made of travertine, a form of limestone deposited by mineral-rich hot springs.",
          "The thermal water flows down the terraces, filling natural blue pools that look like frozen waterfalls. At the top of the hill lies the ancient Roman city of Hierapolis.",
          "You can swim in the \"Cleopatra's Pool\" (Antique Pool). It is a warm, spring-fed pool where you swim directly above the fallen marble columns and ruins of a Roman Temple of Apollo that collapsed during an earthquake."
        ],
        question: "What lies at the bottom of the Antique Pool in Pamukkale?",
        options: [
          "Roman ruins (Marble columns).",
          "Gold coins.",
          "Coral reefs.",
          "Volcanic rocks."
        ],
        answer: "Roman ruins (Marble columns).",
        explanation: "Swimmers paddle over the debris of an ancient temple submerged in the warm water."
      },
      {
        stopName: "Ephesus",
        imageKeyword: "Ephesus Library",
        description: [
          "Ephesus was one of the largest cities in the Mediterranean world. The Library of Celsus is its most iconic ruin. It was the third-largest library in the ancient world, holding 12,000 scrolls.",
          "The facade was cleverly designed with a curve to make it look larger than it actually is. It served as a monumental repository of knowledge and a mausoleum for the senator Celsus.",
          "The city featured advanced urban planning, including public latrines with a continuous flow of water underneath and street lamps to light the marble roads at night."
        ],
        question: "The Library of Celsus was the third-largest library in the ancient world, designed to hold how many scrolls?",
        options: [
          "12,000.",
          "100.",
          "1 million.",
          "500."
        ],
        answer: "12,000.",
        explanation: "It was a monumental repository of knowledge and a mausoleum for the senator Celsus."
      },
      {
        stopName: "The Grand Bazaar",
        imageKeyword: "Grand Bazaar Istanbul",
        description: [
          "Constructed in 1461, this is one of the oldest and largest covered markets in the world. It is a maze of 61 covered streets and over 4,000 shops attracting up to 400,000 visitors daily.",
          "Historically, the bazaar was the hub of the Silk Road trade in goods entering Europe. It is organized by guilds; each street was dedicated to a specific craft (e.g., the street of jewelers, the street of leather workers).",
          "It is famous for Turkish carpets. A true handmade carpet is tied with double knots (the Turkish knot), making it incredibly durable and intricate, often taking months or years to weave."
        ],
        question: "The streets of the Grand Bazaar were historically organized by what?",
        options: [
          "Guilds (Specific crafts).",
          "Alphabetical order.",
          "Religion.",
          "Price of goods."
        ],
        answer: "Guilds (Specific crafts).",
        explanation: "Shops selling the same type of goods were grouped together on the same street."
      }
    ]
  },
  "Turkmenistan": {
    tourTitle: "The Stan of Records",
    introText: "The Door to Hell is a gas crater that has burned for decades. Walk through the white marble city of Ashgabat.",
    stops: [
      {
        stopName: "Darvaza Gas Crater",
        imageKeyword: "Darvaza Gas Crater",
        description: [
          "This terrifying fiery pit in the Karakum Desert has been burning continuously since 1971. Soviet geologists drilling for gas accidentally punched into a cavern, causing the ground to collapse and swallow their rig.",
          "Fearing the spread of poisonous methane gas, they decided to light the crater on fire, thinking it would burn out in a few weeks. Five decades later, it is still burning.",
          "Locals call it the \"Door to Hell.\" It is best viewed at night when the orange glow illuminates the desert for miles around, and the heat is intense enough to be felt from the rim."
        ],
        question: "Why did Soviet geologists set the Darvaza crater on fire in 1971?",
        options: [
          "To burn off poisonous gas (methane).",
          "To keep warm.",
          "To create a tourist attraction.",
          "By accident during a party."
        ],
        answer: "To burn off poisonous gas (methane).",
        explanation: "They believed the gas supply would be exhausted in a few weeks, but they underestimated the reserve."
      },
      {
        stopName: "Ashgabat",
        imageKeyword: "Ashgabat",
        description: [
          "The capital city holds the Guinness World Record for the highest density of white marble-clad buildings in the world. The former president ordered that all major buildings be covered in imported white Italian marble.",
          "The city is filled with eccentric monuments, including a giant golden statue of the president's favorite dog breed (the Alabai) and the Wedding Palace, which features a massive geometric disco ball structure.",
          "It is often called a \"ghost city\" by tourists because the massive, pristine boulevards and parks are frequently empty of people, creating a surreal, movie-set atmosphere."
        ],
        question: "Ashgabat holds a world record for the high density of what building material?",
        options: [
          "White marble.",
          "Gold.",
          "Glass.",
          "Red brick."
        ],
        answer: "White marble.",
        explanation: "The government mandated the use of white marble for aesthetics, importing vast quantities from Italy."
      },
      {
        stopName: "Ancient Merv",
        imageKeyword: "Ancient Merv",
        description: [
          "In the 12th century, Merv was likely the largest city in the world, a major capital of the Islamic world on the Silk Road. It was known as the \"Queen of the World.\"",
          "The city was utterly destroyed by the Mongols in 1221. In one of the bloodiest events in history, Tolui Khan (son of Genghis) ordered the slaughter of the entire population (reportedly 700,000 to 1 million people), and the city never recovered.",
          "The ruins of the Kyz Kala (Maiden's Fortress) still stand. These distinct mud-brick castles have corrugated walls that look like pleated curtains, a unique architectural style of the region."
        ],
        question: "In the 12th century, Merv held what global distinction?",
        options: [
          "It was the largest city in the world.",
          "It was the capital of China.",
          "It had the biggest pyramid.",
          "It was the first city to use paper money."
        ],
        answer: "It was the largest city in the world.",
        explanation: "It was a massive metropolis and hub of learning before its destruction by the Mongols."
      },
      {
        stopName: "Yangykala Canyon",
        imageKeyword: "Yangykala Canyon",
        description: [
          "This vast canyon was once the floor of the ancient Tethys Ocean. The wind and rain have carved the seabed into bizarre shapes and bands of pink, red, and yellow rock.",
          "The name translates to \"Fire Fortresses.\" At sunset, the red rocks glow intensely, looking like burning castle walls against the desert backdrop.",
          "It is incredibly remote and rarely visited. There are no fences or facilities; visitors can camp right on the edge of the precipice in complete silence, surrounded by fossilized marine life."
        ],
        question: "What geological feature was Yangykala Canyon millions of years ago?",
        options: [
          "An ocean floor (The Tethys Ocean).",
          "A volcano.",
          "A rainforest.",
          "A glacier."
        ],
        answer: "An ocean floor (The Tethys Ocean).",
        explanation: "The receding water exposed the sedimentary layers which were then sculpted by wind."
      },
      {
        stopName: "Kow Ata Underground Lake",
        imageKeyword: "Kow Ata",
        description: [
          "Located 60 meters underground inside a mountain cave, this is a natural thermal lake. The water is rich in sulfur and kept naturally warm at 35°C (95°F) year-round.",
          "The name means \"Father of Caves.\" To reach the water, you must descend a long, dark staircase into the humid depths of the earth, smelling the sulfur as you go.",
          "The cave is home to a large colony of bats. Swimmers float in the warm, mineral-rich water while bats flutter in the high vaulted ceilings above them."
        ],
        question: "What makes the water in Kow Ata comfortable for swimming?",
        options: [
          "It is naturally thermal/heated (35°C).",
          "It is very salty.",
          "It is lit by artificial sun.",
          "It is full of bubbles."
        ],
        answer: "It is naturally thermal/heated (35°C).",
        explanation: "Geothermal activity keeps the water warm despite being deep underground."
      }
    ]
  },
  "Tuvalu": {
    tourTitle: "The Sinking Nation",
    introText: "This thin ribbon of land is one of the most threatened by rising seas. Play the local sport of Te Ano on the white sand beaches.",
    stops: [
      {
        stopName: "Funafuti International Airport",
        imageKeyword: "Funafuti Runway",
        description: [
          "The runway covers a significant portion of the capital island's land area. Because there are only a few flights a week, the runway becomes a public park when no planes are landing.",
          "Every evening at cooler temperatures, the locals gather on the tarmac to play volleyball, football, and a local version of cricket called kilikiti.",
          "It is an unfenced borderless space. There is no high security; a siren simply sounds before a plane arrives to tell everyone to clear the field, making it one of the most accessible airports in the world."
        ],
        question: "What happens on the Funafuti runway when there are no planes?",
        options: [
          "It becomes a public park/sports field.",
          "It is flooded.",
          "It is used for markets.",
          "Cars race on it."
        ],
        answer: "It becomes a public park/sports field.",
        explanation: "Due to land scarcity, the flat tarmac is used for recreation and social gatherings."
      },
      {
        stopName: "Funafuti Conservation Area",
        imageKeyword: "Funafuti Conservation Area",
        description: [
          "This marine park covers 33 square kilometers of lagoon and reef on the western side of the atoll. It includes six small, uninhabited islets (motu) that are nesting sites for sea turtles and black-naped terns.",
          "It is the best place to see the pristine beauty of Tuvalu. Visitors can take a boat across the lagoon to snorkel in waters teeming with tropical fish and giant clams, far from the populated main island.",
          "The area highlights the threat of climate change. During \"King Tides,\" these low-lying islets are often completely swamped by seawater, demonstrating how the entire nation is at risk of disappearing."
        ],
        question: "Why is the Funafuti Conservation Area considered vulnerable?",
        options: [
          "Rising sea levels / King Tides swamp the islets.",
          "Volcanic eruptions.",
          "Overfishing.",
          "Earthquakes."
        ],
        answer: "Rising sea levels / King Tides swamp the islets.",
        explanation: "The extremely low elevation makes the islands susceptible to being submerged by the ocean."
      },
      {
        stopName: "The Philatelic Bureau",
        imageKeyword: "Tuvalu Stamps",
        description: [
          "For a tiny nation with few exports, postage stamps are a major source of income. Tuvalu is famous in the philatelic (stamp collecting) world for its beautiful, rare, and sometimes quirky stamp designs.",
          "The bureau on Funafuti is a must-visit for tourists. You can buy stamps depicting everything from local marine life and Queen Elizabeth II to American comic book heroes, produced specifically for collectors.",
          "The country also earns money from its internet domain extension, .tv. Because it is the abbreviation for \"Television,\" tech companies pay the Tuvalu government millions of dollars to use the domain name."
        ],
        question: "Besides stamps, what two-letter internet domain is a major source of income for Tuvalu?",
        options: [
          ".tv",
          ".com",
          ".net",
          ".org"
        ],
        answer: ".tv",
        explanation: "The country leases its domain suffix to television and streaming companies worldwide."
      },
      {
        stopName: "Nanumea Atoll",
        imageKeyword: "Nanumea Atoll",
        description: [
          "Nanumea is one of the outer islands and was a strategic base for American forces during WWII. The island is still littered with the rusted remains of landing craft, bombers, and a B-24 Liberator wreck.",
          "The airstrip built by the Americans took up one-sixth of the island's land. To build it, they had to destroy coconut plantations, which fundamentally changed the island's economy.",
          "The local church tower is a landmark. It was built using leftover materials from the war, integrating the history of the conflict into the spiritual center of the village."
        ],
        question: "American forces built an airstrip on Nanumea that consumed what fraction of the island's land?",
        options: [
          "One-sixth.",
          "Half.",
          "All of it.",
          "One-tenth."
        ],
        answer: "One-sixth.",
        explanation: "The massive construction project required destroying a significant portion of the island's coconut trees."
      },
      {
        stopName: "Tuvalu Marine Life",
        imageKeyword: "Tuvalu Lagoon",
        description: [
          "The lagoon at Funafuti is much larger than the landmass itself. The nation is essentially more water than land, and life revolves around the ocean.",
          "The lagoon is shallow and varies in color from deep blue to neon turquoise. However, it is suffering from \"borrow pits\"—holes dug by the US military during the war to build the runway, which now fill with garbage and contaminated water.",
          "Despite the environmental challenges, the lagoon remains the highway of the nation, where small boats ferry people and supplies between the disparate slivers of land."
        ],
        question: "What are the \"borrow pits\" found in the lagoon?",
        options: [
          "Holes dug to excavate material for the runway.",
          "Natural sinkholes.",
          "Bomb craters.",
          "Ancient wells."
        ],
        answer: "Holes dug to excavate material for the runway.",
        explanation: "The US military dug up coral and sand to build the airfield, leaving craters that cause environmental issues today."
      }
    ]
  }
};