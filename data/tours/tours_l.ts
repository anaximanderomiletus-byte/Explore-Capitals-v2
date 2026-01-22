import { TourData } from "../../types";

export const toursL: Record<string, TourData> = {
  "Laos": {
    tourTitle: "The Land of a Million Elephants",
    introText: "Hundreds of monks walk silently through the streets at dawn for alms. Drift slowly down the Mekong River in this land of calm.",
    stops: [
      {
        stopName: "Luang Prabang",
        imageKeyword: "Luang Prabang Monks",
        description: [
          "Every morning at sunrise, a silent ceremony known as Tak Bat takes place. Hundreds of monks from the city’s various temples walk barefoot in single file through the streets to collect alms (food) from the locals.",
          "The locals kneel on the sidewalk and place handfuls of sticky rice into the monks' bowls. It is a symbiotic relationship: the laypeople gain merit (bun) by giving, and the monks are sustained for the day.",
          "The city itself is a UNESCO World Heritage site. It is situated on a peninsula formed by the meeting of the Mekong and Nam Khan rivers, featuring a blend of traditional wooden Lao houses and French colonial villas."
        ],
        question: "What specific food is traditionally placed in the monks' bowls during Tak Bat?",
        options: [
          "Sticky rice.",
          "Bread.",
          "Fruit.",
          "Soup."
        ],
        answer: "Sticky rice.",
        explanation: "This staple food is the primary offering given by the faithful."
      },
      {
        stopName: "Kuang Si Falls",
        imageKeyword: "Kuang Si Falls",
        description: [
          "Located just outside Luang Prabang, these waterfalls are famous for their stunning milky-turquoise color. The water flows over limestone rocks, which deposit calcium carbonate, creating natural travertine pools that look like infinity swimming pools.",
          "The color comes from the minerals in the water reflecting the light. Visitors can swim in the cool lower pools, which are surrounded by lush jungle, making it one of the most photogenic swimming spots in Asia.",
          "The entrance to the falls houses the Tat Kuang Si Bear Rescue Centre. It is a sanctuary for Asiatic Moon Bears (Sun Bears) rescued from poachers and bile farms, allowing them to live safely in large forest enclosures."
        ],
        question: "What creates the natural swimming pools at Kuang Si Falls?",
        options: [
          "Limestone (Travertine) deposits.",
          "Volcanic lava.",
          "Man-made concrete.",
          "Beaver dams."
        ],
        answer: "Limestone (Travertine) deposits.",
        explanation: "The mineral-rich water builds up natural dams over time, creating terraced pools."
      },
      {
        stopName: "The Plain of Jars",
        imageKeyword: "The Plain of Jars",
        description: [
          "This archaeological landscape features thousands of massive stone jars scattered across the Xieng Khouang plateau. Some jars are up to 3 meters tall and weigh several tons, dating back to the Iron Age (500 BC – 500 AD).",
          "Their purpose remains a mystery, though the leading theory is that they were used for \"sky burials\" or distillation. Ancient people may have placed bodies inside to decompose before burying the bones, or perhaps used them to brew massive amounts of rice wine.",
          "The area is dangerous to explore off the marked paths. It was heavily bombed during the Vietnam War (Secret War), and unexploded ordnance (UXO) still litters the fields around the jar sites."
        ],
        question: "What is the leading theory for the function of the giant stone jars?",
        options: [
          "Funerary urns / Burial practices.",
          "Water storage.",
          "Grain silos.",
          "Defensive bunkers."
        ],
        answer: "Funerary urns / Burial practices.",
        explanation: "Archaeologists believe they played a role in decomposing bodies or storing remains."
      },
      {
        stopName: "Pha That Luang",
        imageKeyword: "Pha That Luang",
        description: [
          "Located in the capital, Vientiane, this gold-covered Buddhist stupa is the national symbol of Laos. It appears on the national seal and the currency.",
          "The structure is designed to resemble a lotus bud, representing the enlightenment of the Buddha. It is actually a fortress-style temple, surrounded by high walls with tiny windows that were originally designed to defend against invaders.",
          "Local legend says that a relic of the Buddha (his breastbone) is buried deep inside the central spire. The stupa has been destroyed and rebuilt many times due to invasions by the Thai and Burmese armies."
        ],
        question: "The shape of the Pha That Luang spire is meant to resemble what flower?",
        options: [
          "A lotus bud.",
          "A rose.",
          "A jasmine flower.",
          "A sunflower."
        ],
        answer: "A lotus bud.",
        explanation: "In Buddhism, the lotus symbolizes purity and the journey toward enlightenment."
      },
      {
        stopName: "Vat Phou",
        imageKeyword: "Vat Phou",
        description: [
          "Long before Angkor Wat was built in Cambodia, the Khmer Empire built this temple complex in southern Laos. It is dedicated to Shiva and sits at the base of Mount Phou Kao.",
          "The mountain behind the temple is shaped like a lingam (a phallic symbol of Shiva), which is why the site was considered sacred. Spring water from the mountain was channeled through the temple to bathe the statues in holy water.",
          "Every year in February, a massive festival takes place here. Thousands of pilgrims camp on the temple grounds, lighting candles and making offerings to the spirits of the mountain and the ancient gods."
        ],
        question: "Vat Phou was built by the same civilization that created which famous site in Cambodia?",
        options: [
          "Angkor Wat (The Khmer Empire).",
          "The Great Wall.",
          "Borobudur.",
          "Bagan."
        ],
        answer: "Angkor Wat (The Khmer Empire).",
        explanation: "It was an early stronghold of the Khmer civilization that dominated Southeast Asia."
      }
    ]
  },
  "Latvia": {
    tourTitle: "The Singing Nation",
    introText: "The capital city contains the highest concentration of Art Nouveau buildings. Forage for mushrooms in the forests that cover half the land.",
    stops: [
      {
        stopName: "Riga Art Nouveau District",
        imageKeyword: "Riga Art Nouveau",
        description: [
          "Riga holds the title for the highest concentration of Art Nouveau (Jugendstil) architecture in the world. About one-third of all buildings in the city center are built in this flamboyant style.",
          "The most famous street is Alberta Iela. The buildings here were largely designed by Mikhail Eisenstein (father of the famous film director Sergei Eisenstein) and feature screaming masks, dragons, and sphinxes on the facades.",
          "The style exploded here in the early 20th century because Riga was experiencing an economic boom just as the architectural trend was popular, leading to a race among wealthy merchants to build the most decorative house."
        ],
        question: "Roughly what fraction of Riga's city center is Art Nouveau architecture?",
        options: [
          "One-third.",
          "One-tenth.",
          "Half.",
          "All of it."
        ],
        answer: "One-third.",
        explanation: "The density of these buildings is higher here than in any other city in the world."
      },
      {
        stopName: "Rundāle Palace",
        imageKeyword: "Rundāle Palace",
        description: [
          "Known as the \"Versailles of the Baltics,\" this Baroque masterpiece was built for the Duke of Courland. It was designed by Bartolomeo Rastrelli, the same Italian architect who created the Winter Palace in St. Petersburg, Russia.",
          "The palace features 138 rooms, including the Golden Hall (the throne room) and the White Hall (the ballroom). The interior is dripping with stucco decoration, ceiling frescoes, and silk wallpaper.",
          "The French-style garden is famous for its rose collection. It retains the original 18th-century layout, with perfectly manicured hedges arranged in complex geometric patterns that are best viewed from the upper windows of the palace."
        ],
        question: "Which famous Russian palace shares the same architect as Rundāle?",
        options: [
          "The Winter Palace (Hermitage).",
          "The Kremlin.",
          "Peterhof.",
          "Catherine Palace."
        ],
        answer: "The Winter Palace (Hermitage).",
        explanation: "Bartolomeo Rastrelli designed both iconic buildings."
      },
      {
        stopName: "Gauja National Park",
        imageKeyword: "Gutman's Cave",
        description: [
          "This park protects the valley of the Gauja River and is famous for its sandstone cliffs. The most notable landmark is Gutman's Cave, the widest and highest cave in the Baltics.",
          "The walls of the cave are covered in centuries of graffiti. Visitors have been carving their names into the soft sandstone since the 1600s, and you can still read inscriptions and coats of arms dating back hundreds of years.",
          "Legend says the spring water flowing from the cave has healing powers. It is also the setting for the tragic \"Rose of Turaida\" love story, a local legend about a murdered young woman that is as famous in Latvia as Romeo and Juliet."
        ],
        question: "Why are the walls of Gutman's Cave historically significant?",
        options: [
          "They are covered in ancient graffiti/inscriptions.",
          "They contain gold.",
          "They have caveman paintings.",
          "They are made of crystal."
        ],
        answer: "They are covered in ancient graffiti/inscriptions.",
        explanation: "Travelers have carved their names and crests into the rock for over 400 years."
      },
      {
        stopName: "Ventas Rumba",
        imageKeyword: "Ventas Rumba",
        description: [
          "Located in the town of Kuldīga, this is the widest waterfall in Europe. While it is only about 2 meters high, it stretches 240 to 270 meters across the Venta River.",
          "In the spring, fish fly up the waterfall. Vimba fish swimming upstream to spawn try to jump over the ledge; historically, the Duke of Courland invented a way to catch them in baskets mid-air, leading to the town's nickname: \"The town where they catch salmon in the air.\"",
          "The town possesses an old brick bridge that is one of the longest of its kind in Europe. The scene of the red brick bridge over the wide falls is one of the most romantic and painted landscapes in the country."
        ],
        question: "Ventas Rumba holds the European record for what dimension?",
        options: [
          "Width.",
          "Height.",
          "Depth.",
          "Volume."
        ],
        answer: "Width.",
        explanation: "It is the widest waterfall on the continent, stretching nearly 270 meters across."
      },
      {
        stopName: "Jurmala",
        imageKeyword: "Jurmala Wooden House",
        description: [
          "Jurmala is a resort town stretched along 33 kilometers of white sand beach. During the Soviet era, it was the favorite vacation spot for high-ranking Communist officials like Brezhnev and Khrushchev.",
          "The town is famous for its wooden architecture. There are over 4,000 historic wooden structures, ranging from small cottages to grand hotels, decorated with intricate \"gingerbread\" carvings and stained glass windows.",
          "The air here is considered therapeutic. The town is sandwiched between the sea and a pine forest, creating a mix of salty sea air and pine scent that was believed to cure respiratory diseases in the 19th century."
        ],
        question: "What material are the historic resort houses in Jurmala primarily built from?",
        options: [
          "Wood.",
          "Stone.",
          "Brick.",
          "Concrete."
        ],
        answer: "Wood.",
        explanation: "The town is renowned for its preservation of intricate 19th-century wooden architecture."
      }
    ]
  },
  "Lebanon": {
    tourTitle: "The Land of the Cedars",
    introText: "The ancient Cedars of God have grown in these mountains for centuries. Explore the massive Roman temples that still stand at Baalbek.",
    stops: [
      {
        stopName: "Baalbek",
        imageKeyword: "Baalbek Ruins",
        description: [
          "This ancient Phoenician city became a major Roman religious center known as Heliopolis (\"City of the Sun\"). It contains some of the largest and best-preserved Roman ruins in existence.",
          "The Temple of Jupiter sits on three massive stones known as the \"Trilithon.\" Each stone weighs approximately 800 tons. Archaeologists are still debating exactly how the Romans moved and lifted these megaliths without modern machinery.",
          "The Temple of Bacchus is even better preserved. Unlike most ruins that are just columns, this temple still has its walls and intricate carvings of grapes and poppies intact, celebrating the god of wine and ecstasy."
        ],
        question: "What is the \"Trilithon\" of Baalbek?",
        options: [
          "Three massive stones weighing 800 tons each.",
          "A three-headed statue.",
          "A three-sided temple.",
          "A Roman musical instrument."
        ],
        answer: "Three massive stones weighing 800 tons each.",
        explanation: "These foundation stones are among the largest blocks ever used in construction."
      },
      {
        stopName: "The Cedars of God",
        imageKeyword: "Cedars of God",
        description: [
          "The Lebanon Cedar is the national symbol, appearing on the country's flag. The \"Cedars of God\" forest in the Bsharri mountains is one of the last vestiges of the ancient forests that once covered the entire mountain range.",
          "These trees were prized in the ancient world for their high-quality wood. The Egyptians used them to build solar boats, King Solomon used them to build his temple in Jerusalem, and the Phoenicians used them to build their trading ships.",
          "Some of the trees in this grove are over 3,000 years old. They grow incredibly slowly, developing distinct horizontal branches that spread out like tables to catch the snow."
        ],
        question: "Which biblical king used Lebanon Cedars to build his temple?",
        options: [
          "King Solomon.",
          "King David.",
          "King Herod.",
          "King Saul."
        ],
        answer: "King Solomon.",
        explanation: "The Bible describes him importing the wood for the construction of the First Temple in Jerusalem."
      },
      {
        stopName: "Jeita Grotto",
        imageKeyword: "Jeita Grotto Cave",
        description: [
          "This massive cave system spans nearly 9 kilometers inside the mountains. It is divided into two levels: the upper grotto, which you explore on foot, and the lower grotto, which you explore by boat on an underground river.",
          "It contains one of the world's largest stalactites, measuring 8.2 meters (27 feet) long. The cave is a cathedral of natural crystal, with limestone curtains and pillars formed over millions of years by dripping water.",
          "The lower cave serves a vital purpose: it provides the drinking water for over a million people in the capital city of Beirut."
        ],
        question: "How do visitors explore the lower level of the Jeita Grotto?",
        options: [
          "By boat.",
          "By swimming.",
          "By walking.",
          "By train."
        ],
        answer: "By boat.",
        explanation: "The lower cavern is flooded by an underground river."
      },
      {
        stopName: "Byblos",
        imageKeyword: "Byblos Ruins",
        description: [
          "Byblos claims to be the oldest continuously inhabited city in the world, with a history of settlement dating back 7,000 years. You can see Neolithic huts, Egyptian temples, Roman theaters, and a Crusader castle all on one site.",
          "It is the birthplace of the modern alphabet. The Phoenicians of Byblos developed a phonetic writing system here that was passed to the Greeks and eventually evolved into the alphabet we use today.",
          "The word \"Bible\" comes from the name of this city. Byblos was the papyrus trading hub of the ancient world; the Greeks named \"books\" (biblos) after the city, which eventually led to the name of the holy book."
        ],
        question: "What English word is derived from the city name \"Byblos\"?",
        options: [
          "Bible.",
          "Book.",
          "Library.",
          "Paper."
        ],
        answer: "Bible.",
        explanation: "The Greek word for book (biblos) came from the city's reputation as a papyrus center."
      },
      {
        stopName: "Raouche Rocks",
        imageKeyword: "Raouche Rocks",
        description: [
          "Located off the coast of Beirut, these two massive rock formations stand like sentinels in the Mediterranean Sea. The larger rock has a natural archway that boats can pass through.",
          "They are a popular gathering spot for locals. The Corniche (the seaside promenade) overlooks the rocks, and it is the premier spot in the city to watch the sunset and escape the noise of the urban traffic.",
          "Geologically, they are the result of prehistoric earthquakes. They broke off from the mainland millions of years ago, and the sea has been eroding them into their current architectural shapes ever since."
        ],
        question: "Where are the Raouche Rocks located?",
        options: [
          "Off the coast of Beirut.",
          "In the mountains.",
          "In the desert.",
          "In a river."
        ],
        answer: "Off the coast of Beirut.",
        explanation: "They are a natural landmark visible from the capital's seaside promenade."
      }
    ]
  },
  "Lesotho": {
    tourTitle: "The Kingdom in the Sky",
    introText: "This is the only nation on Earth situated entirely above one thousand meters. Ride a Basotho pony along the edge of the dramatic cliffs.",
    stops: [
      {
        stopName: "Sani Pass",
        imageKeyword: "Sani Pass",
        description: [
          "This treacherous mountain pass is the only road link between Lesotho and the KwaZulu-Natal province of South Africa. It climbs 1,332 vertical meters in just 9 kilometers, requiring a 4x4 vehicle to navigate the hairpin bends.",
          "At the top of the pass sits the \"highest pub in Africa\" at 2,874 meters. Visitors can enjoy a local Maluti beer while looking down through the clouds at the winding road they just conquered.",
          "The temperature changes drastically during the ascent. You might start in warm sunshine at the bottom and find yourself in freezing snow at the summit, highlighting the extreme altitude of the country."
        ],
        question: "What establishment is located at the top of the Sani Pass?",
        options: [
          "The highest pub in Africa.",
          "A royal palace.",
          "A ski resort.",
          "A border fortress."
        ],
        answer: "The highest pub in Africa.",
        explanation: "The Sani Mountain Lodge serves drinks at an elevation of 2,874 meters."
      },
      {
        stopName: "Maletsunyane Falls",
        imageKeyword: "Maletsunyane Falls",
        description: [
          "Located near the town of Semonkong, this waterfall drops 192 meters (630 feet) in a single uninterrupted plunge. It is one of the highest single-drop waterfalls in Africa.",
          "It is the site of the world's highest commercial abseil (rappel). Brave tourists can descend the cliff face right next to the thundering water, a drop so long that the water turns into mist before it hits the bottom.",
          "The mist creates a constant haze around the gorge. In winter, this mist freezes on the rocks, creating spectacular ice sculptures and a giant ice cone at the base of the falls."
        ],
        question: "Maletsunyane Falls holds the world record for the highest commercial activity of what kind?",
        options: [
          "Abseil (Rappel).",
          "Bungee jump.",
          "Zip line.",
          "Paraglide."
        ],
        answer: "Abseil (Rappel).",
        explanation: "It offers a 204-meter descent down the cliff face next to the falls."
      },
      {
        stopName: "Thaba Bosiu",
        imageKeyword: "Thaba Bosiu",
        description: [
          "This flat-topped mountain is the spiritual birthplace of the Basotho nation. In the 19th century, King Moshoeshoe I used it as a natural fortress to protect his people from Zulu warriors and Boer settlers.",
          "The mountain was considered impregnable. Legend says that at night, the mountain grew taller to prevent enemies from scaling the cliffs, a belief that boosted the morale of the defenders.",
          "It is the burial place of the kings of Lesotho. Moshoeshoe I and his successors are buried in simple cairns on the plateau, and the site remains a place of national pilgrimage and reverence."
        ],
        question: "Who used Thaba Bosiu as a fortress to found the Basotho nation?",
        options: [
          "King Moshoeshoe I.",
          "Shaka Zulu.",
          "Nelson Mandela.",
          "King Mswati."
        ],
        answer: "King Moshoeshoe I.",
        explanation: "He united the clans on this mountain plateau to defend against invaders."
      },
      {
        stopName: "Katse Dam",
        imageKeyword: "Katse Dam",
        description: [
          "This is one of the most ambitious engineering projects in Africa, featuring a curved concrete wall that is 185 meters high. It creates a deep, serpentine reservoir that winds through the mountains for miles.",
          "The water here is Lesotho's \"white gold.\" Through a series of tunnels, the water is transferred to South Africa to supply the industrial hub of Johannesburg, generating significant revenue for the small kingdom.",
          "Visitors can tour the dam wall, walking inside the concrete structure to see the massive machinery that controls the flow. The botanical gardens nearby house rare alpine plants rescued from the valley before it was flooded."
        ],
        question: "What is the primary export product generated by the Katse Dam?",
        options: [
          "Water.",
          "Electricity.",
          "Gold.",
          "Diamonds."
        ],
        answer: "Water.",
        explanation: "The dam collects water in the highlands to sell to the thirsty industrial regions of South Africa."
      },
      {
        stopName: "Kome Caves",
        imageKeyword: "Kome Caves",
        description: [
          "These unique cave dwellings were built in the 19th century by the Basia clan, who were hiding from cannibals during a severe famine known as the Lifaqane.",
          "The houses are made of mud and cow dung and are tucked deep under a massive sandstone overhang. This protected the inhabitants from the weather and made them invisible to enemies passing on the plateau above.",
          "Amazingly, the caves are still inhabited by the descendants of the original builders. They live much as their ancestors did, maintaining the mud structures and tending to their animals in the valley."
        ],
        question: "Why were the Kome Caves originally built in the 19th century?",
        options: [
          "To hide from cannibals (and enemies).",
          "To mine for gold.",
          "As a royal palace.",
          "To store grain."
        ],
        answer: "To hide from cannibals (and enemies).",
        explanation: "During a period of war and famine, the clan built hidden homes to avoid detection."
      }
    ]
  },
  "Liberia": {
    tourTitle: "The Land of the Free",
    introText: "This nation was founded by freed slaves returning to the African continent. Surf the perfect waves at Robertsport on the Atlantic coast.",
    stops: [
      {
        stopName: "Providence Island",
        imageKeyword: "Providence Island",
        description: [
          "Located in the Mesurado River in Monrovia, this tiny island is the Plymouth Rock of Liberia. It is the exact spot where the first ship of freed slaves from the United States landed in 1822 to establish a new colony.",
          "A \"peace tree\" made of metal stands on the island today. It commemorates the negotiations between the settlers and the indigenous chiefs, which allowed the newcomers to stay and eventually found the Republic of Liberia.",
          "The island offers a view of the capital city's contrast. You can see the bustling modern markets of Monrovia on one side and the calm Atlantic ocean on the other, framing the nation's history of return."
        ],
        question: "Who landed on Providence Island in 1822?",
        options: [
          "Freed slaves from the United States.",
          "Portuguese explorers.",
          "British pirates.",
          "French merchants."
        ],
        answer: "Freed slaves from the United States.",
        explanation: "They were sent by the American Colonization Society to establish a home in Africa."
      },
      {
        stopName: "Sapo National Park",
        imageKeyword: "Sapo National Park",
        description: [
          "This is the country's largest protected area of rainforest, covering 1,804 square kilometers. It is a biodiversity hotspot containing some of the last primary tropical rainforest in West Africa.",
          "It is the most important habitat for the Pygmy Hippo. Unlike their giant cousins, these shy, solitary creatures live in the dense forest undergrowth and are rarely seen, making Sapo one of the few places to track them.",
          "The park was a refuge during the civil wars. While human activity devastated other areas, the density of this jungle kept it largely untouched, preserving populations of forest elephants and chimpanzees."
        ],
        question: "Sapo National Park is a critical habitat for which rare, small version of a large mammal?",
        options: [
          "The Pygmy Hippo.",
          "The Forest Elephant.",
          "The Dwarf Crocodile.",
          "The Miniature Giraffe."
        ],
        answer: "The Pygmy Hippo.",
        explanation: "Liberia is home to the majority of the world's remaining population of this endangered species."
      },
      {
        stopName: "Robertsport",
        imageKeyword: "Robertsport Surfing",
        description: [
          "This sleepy fishing village is becoming famous as a world-class surfing destination. The geography of the coast creates \"point breaks\" that produce incredibly long, perfect waves that peel left for hundreds of meters.",
          "The town is filled with fading history. The hillsides are dotted with the ruins of grand plantation-style houses built by the early American settlers, looking like the Antebellum South transplanted to the African coast.",
          "Accommodation here often involves eco-lodges or camping on the beach. It offers a rustic experience where surfers can ride uncrowded waves all day and eat fresh lobster caught by local fishermen at night."
        ],
        question: "Robertsport is known for the ruins of houses that resemble the architecture of which region?",
        options: [
          "The American South (Antebellum style).",
          "Victorian England.",
          "The French Riviera.",
          "Colonial Spain."
        ],
        answer: "The American South (Antebellum style).",
        explanation: "The freed slaves built homes similar to the plantation houses they remembered from the United States."
      },
      {
        stopName: "Firestone Rubber Plantation",
        imageKeyword: "Firestone Rubber Plantation",
        description: [
          "Established in 1926, this is the largest contiguous rubber plantation in the world. For nearly a century, it has been a dominant economic force in Liberia, leasing one million acres of land to produce latex for tires.",
          "The trees are tapped by hand. Workers make precise cuts in the bark to allow the white, milky latex to drip into small cups, a process that must be done early in the morning before the heat stops the flow.",
          "The plantation operates almost like a state within a state. It has its own schools, hospitals, and housing for workers, reflecting the immense influence the American company has had on the country's development."
        ],
        question: "What product is harvested from the Firestone Plantation?",
        options: [
          "Latex (Rubber).",
          "Cocoa.",
          "Coffee.",
          "Palm Oil."
        ],
        answer: "Latex (Rubber).",
        explanation: "The white sap from the rubber trees is processed to make tires and other rubber goods."
      },
      {
        stopName: "Kpatawee Waterfall",
        imageKeyword: "Kpatawee Waterfall",
        description: [
          "Located in Bong County, this waterfall is a favorite natural retreat for locals. The water cascades over wide, flat rock terraces, creating natural Jacuzzi-like pools where visitors can sit and let the water massage them.",
          "The area is a habitat for colorful butterflies and birds. The lush vegetation surrounding the falls makes it a \"green escape\" from the dusty cities, often used for picnics and celebrations.",
          "It is currently being developed for hydroelectric power. A mini-hydro plant is being installed to use the force of the falls to provide electricity to nearby rural communities that previously had no power grid."
        ],
        question: "What feature of the Kpatawee Waterfall allows visitors to relax in the water?",
        options: [
          "Natural pools (Jacuzzis) formed by the rock terraces.",
          "Hot springs.",
          "Underwater caves.",
          "Sandy beaches."
        ],
        answer: "Natural pools (Jacuzzis) formed by the rock terraces.",
        explanation: "The flat rocks create calm, shallow areas amidst the cascading water."
      }
    ]
  },
  "Libya": {
    tourTitle: "The Roman Coast",
    introText: "The limestone ruins of Leptis Magna are the finest in North Africa. Look out over the endless sea of sand in the Sahara Desert.",
    stops: [
      {
        stopName: "Leptis Magna",
        imageKeyword: "Leptis Magna",
        description: [
          "This ancient city is widely considered the best-preserved Roman site in the world. Because it was buried under desert sand for centuries, the limestone columns, arches, and theaters remain in pristine condition, untouched by modern pollution.",
          "It was the hometown of Septimius Severus, the first African Roman Emperor. He poured money into the city, building the massive Severan Arch and a forum that rivaled Rome itself in grandeur.",
          "The theater sits right on the edge of the Mediterranean Sea. You can sit on the ancient stone benches where spectators watched plays 2,000 years ago and look out over the blue water behind the stage."
        ],
        question: "Which Roman Emperor was born in Leptis Magna and expanded the city?",
        options: [
          "Septimius Severus.",
          "Julius Caesar.",
          "Augustus.",
          "Nero."
        ],
        answer: "Septimius Severus.",
        explanation: "He transformed his hometown into one of the grandest cities in the empire."
      },
      {
        stopName: "Ghadames",
        imageKeyword: "Ghadames",
        description: [
          "Located on the edge of the Sahara near the Tunisian and Algerian borders, this oasis city is a masterpiece of desert architecture. To combat the extreme heat, the streets are covered with roofs, turning the alleys into cool, dark tunnels.",
          "The city has a strict social layout. The ground floor was used for storage, the covered streets for men to walk, and the rooftops were exclusively for women to travel between houses and socialize in the sunlight.",
          "The houses are made of mud, lime, and palm tree trunks. The interiors are brilliantly decorated with mirrors and red paint to reflect light, contrasting with the blinding white exterior walls."
        ],
        question: "Why are the streets of Ghadames covered with roofs?",
        options: [
          "To keep them cool and protect from the sun.",
          "To protect from rain.",
          "To hide from enemies.",
          "To grow mushrooms."
        ],
        answer: "To keep them cool and protect from the sun.",
        explanation: "The covered alleys create a tunnel system that stays comfortable even in the scorching desert heat."
      },
      {
        stopName: "The Acacus Mountains",
        imageKeyword: "The Acacus Mountains",
        description: [
          "This mountain range in the deep Sahara is famous for its alien landscape of black basalt and sandstone towers rising from orange sand dunes. Wind erosion has carved massive natural arches that frame the desert views.",
          "The caves here contain thousands of rock paintings dating from 12,000 BC to 100 AD. The art documents the changing climate of the Sahara, showing giraffes, elephants, and crocodiles from a time when the desert was a green savannah.",
          "It is one of the most isolated places on Earth. Exploring the Acacus requires a multi-day expedition with 4x4 vehicles, sleeping under the stars in a landscape that looks exactly as it did thousands of years ago."
        ],
        question: "What do the rock paintings in the Acacus Mountains reveal about the Sahara's past?",
        options: [
          "That it was once green and wet (Savannah).",
          "That it was always a desert.",
          "That it was covered in ice.",
          "That it was underwater."
        ],
        answer: "That it was once green and wet (Savannah).",
        explanation: "The art depicts animals like elephants and crocodiles that cannot survive in the current desert climate."
      },
      {
        stopName: "Sabratha",
        imageKeyword: "Sabratha",
        description: [
          "Sabratha was a major trading post for animals and ivory coming from the African interior. Its wealth is visible in its spectacular Roman theatre, which is the most distinctive feature of the site.",
          "The theater's three-story backdrop (scaenae frons) is almost completely intact. It features 108 Corinthian columns arranged in a semi-circle, creating a majestic wall of stone that faces the sea.",
          "The site is famous for its mosaics. The \"Mosaic of the Geometric Patterns\" found in the baths here is celebrated for its color and complexity, showing sea monsters and dolphins that reflected the city's maritime culture."
        ],
        question: "What is the most famous structure in the ruins of Sabratha?",
        options: [
          "The Roman Theatre.",
          "The Lighthouse.",
          "The Aqueduct.",
          "The Gladiator Arena."
        ],
        answer: "The Roman Theatre.",
        explanation: "The three-story columned backdrop is an iconic image of Roman Africa."
      },
      {
        stopName: "Cyrene",
        imageKeyword: "Cyrene",
        description: [
          "Unlike the other Roman sites in Libya, Cyrene was originally a Greek colony founded in 631 BC. It sits in the Jebel Akhdar (Green Mountain) region, where the climate is cooler and wetter, allowing for lush vegetation around the ruins.",
          "It was a renowned center of philosophy and science. It was the home of Eratosthenes, the man who first calculated the circumference of the Earth, and the birthplace of the Cyrenaic school of philosophy.",
          "The Temple of Zeus here is larger than the Parthenon in Athens. Although it was destroyed during a Jewish revolt in 115 AD and later by an earthquake, the massive Doric columns have been re-erected to show its original scale."
        ],
        question: "Cyrene is located in which geographically distinct region of Libya?",
        options: [
          "Jebel Akhdar (The Green Mountain).",
          "The Sahara Desert.",
          "The Fezzan.",
          "The Tripolitania coast."
        ],
        answer: "Jebel Akhdar (The Green Mountain).",
        explanation: "This region is unique for its Mediterranean climate and greenery, contrasting with the desert south."
      }
    ]
  },
  "Liechtenstein": {
    tourTitle: "The Alpine Microstate",
    introText: "The prince lives in a castle perched on a cliff above the capital. Walk across the entire country in a single day of hiking.",
    stops: [
      {
        stopName: "Vaduz Castle",
        imageKeyword: "Vaduz Castle",
        description: [
          "This 12th-century castle is the official residence of the Prince of Liechtenstein. Unlike most European castles which are museums, this is a private home, and the Royal Family still lives inside.",
          "It sits on a steep hill 120 meters above the capital city, Vaduz. The location was chosen for defense, allowing the rulers to watch over the Rhine Valley and control the trade routes passing through the Alps.",
          "Once a year, on August 15th (National Day), the Prince invites the entire population of the country to the castle grounds for a beer and a chat, highlighting the small and intimate nature of the nation."
        ],
        question: "Why can't tourists tour the inside of Vaduz Castle?",
        options: [
          "It is the private home of the Royal Family.",
          "It is haunted.",
          "It is structurally unsafe.",
          "It is used as a prison."
        ],
        answer: "It is the private home of the Royal Family.",
        explanation: "The Prince and his family live there, so it is closed to the public except on special occasions."
      },
      {
        stopName: "The Liechtenstein Trail",
        imageKeyword: "The Liechtenstein Trail",
        description: [
          "This hiking path covers the entire length of the country, stretching 75 kilometers (46 miles). It connects all 11 municipalities of Liechtenstein, allowing you to walk through the whole nation in a few days.",
          "The trail passes through diverse landscapes, from the protected nature reserves on the banks of the Rhine River to the steep vineyards and alpine pastures high in the mountains.",
          "It is a digital-enabled trail. Hikers can use an app called \"LIstory\" to unlock augmented reality experiences at 147 historic sites along the way, learning about the country's history as they walk."
        ],
        question: "How many municipalities does the Liechtenstein Trail connect?",
        options: [
          "All 11.",
          "Just the capital.",
          "Five.",
          "Twenty."
        ],
        answer: "All 11.",
        explanation: "The trail winds through every single municipality in the country."
      },
      {
        stopName: "Kunstmuseum Liechtenstein",
        imageKeyword: "Kunstmuseum Liechtenstein",
        description: [
          "This modern art museum in Vaduz is famous for its architecture. It is a perfect \"black box\" made of polished concrete and black basalt stone, reflecting the surrounding mountains and buildings in its dark facade.",
          "It houses the state's art collection as well as pieces from the Prince's private collection. The focus is on modern and contemporary art, particularly sculptures and installations.",
          "The floor is a piece of engineering art itself. It is a seamless, polished terrazzo that took months to pour and grind, designed to complement the stark, minimalist exterior."
        ],
        question: "What distinct color is the exterior of the Kunstmuseum Liechtenstein?",
        options: [
          "Black.",
          "White.",
          "Red.",
          "Gold."
        ],
        answer: "Black.",
        explanation: "The building is a striking black cube made of tinted concrete and basalt."
      },
      {
        stopName: "Malbun",
        imageKeyword: "Malbun",
        description: [
          "Malbun is the only ski resort in Liechtenstein. Located at 1,600 meters, it is a small, family-friendly village tucked into a high alpine valley near the Austrian border.",
          "It is known for its safety and quiet atmosphere. Because the bowl-shaped valley is enclosed by mountains, it is protected from the wind, and all the ski slopes lead back to the same central point, making it impossible to get lost.",
          "In the summer, it becomes a center for falconry. Visitors can hike the \"Detective Trail\" or watch birds of prey demonstrations where eagles and hawks fly directly over the audience's heads."
        ],
        question: "What makes Malbun particularly safe for families and children?",
        options: [
          "The bowl shape (all slopes lead to the center).",
          "It is flat.",
          "There is no snow.",
          "It is indoors."
        ],
        answer: "The bowl shape (all slopes lead to the center).",
        explanation: "The enclosed valley ensures that skiers naturally funnel back to the village, preventing them from getting lost."
      },
      {
        stopName: "The Old Rhine Bridge",
        imageKeyword: "The Old Rhine Bridge",
        description: [
          "Built in 1901, this covered wooden bridge connects Liechtenstein with Switzerland across the Rhine River. It is the only remaining wooden bridge spanning the Rhine.",
          "It is a pedestrian and bicycle bridge only. Walking across the creaking wooden planks allows you to cross an international border on foot without any passport checks or guards.",
          "The bridge was nearly destroyed several times by floods and drift ice. In the 1920s, the floor was raised by almost a meter to protect it from the rising river levels."
        ],
        question: "The Old Rhine Bridge connects Liechtenstein to which country?",
        options: [
          "Switzerland.",
          "Austria.",
          "Germany.",
          "Italy."
        ],
        answer: "Switzerland.",
        explanation: "The bridge spans the Rhine River, which acts as the natural border between the two nations."
      }
    ]
  },
  "Lithuania": {
    tourTitle: "The Land of Amber",
    introText: "Thousands of metal crosses cover a sacred hill in the countryside. Walk along the massive sand dunes of the Curonian Spit.",
    stops: [
      {
        stopName: "Hill of Crosses",
        imageKeyword: "Hill of Crosses",
        description: [
          "Located in northern Lithuania, this hill is covered with an estimated 200,000 crosses. Pilgrims have been placing them here since the 1831 uprising against Russia as a symbol of peaceful resistance and Catholic faith.",
          "The Soviet authorities bulldozed the hill three times (in 1961, 1973, and 1975), trying to destroy the site and discourage religion. Each time, the locals came back at night and replanted the crosses, eventually forcing the Soviets to give up.",
          "In 1993, Pope John Paul II visited the hill and declared it a place for hope, peace, love, and sacrifice. It is now a major pilgrimage site where visitors leave rosaries and small statues alongside the massive wooden crosses."
        ],
        question: "How did the Hill of Crosses serve as a symbol of resistance?",
        options: [
          "People kept rebuilding it after Soviets bulldozed it.",
          "It was a military fortress.",
          "It was used to hide weapons.",
          "It marked a secret meeting place."
        ],
        answer: "People kept rebuilding it after Soviets bulldozed it.",
        explanation: "The persistence of the locals in replanting crosses proved their refusal to abandon their faith and identity."
      },
      {
        stopName: "Trakai Island Castle",
        imageKeyword: "Trakai Island Castle",
        description: [
          "This fairytale castle sits on a small island in the middle of Lake Galvė. Built in the 14th century, it was the residence of the Grand Dukes of Lithuania and a strategic fortress against the Teutonic Knights.",
          "It is the home of the Karaim people. The Grand Duke Vytautas brought this small Turkic ethnic group from Crimea to serve as his bodyguards in the 1300s. Their descendants still live in the town, preserving their unique language and famous kibinai pastries.",
          "The castle was restored in the 20th century. After falling into ruin, it was rebuilt brick by brick to its original gothic glory, serving as a symbol of Lithuanian statehood during the Soviet occupation."
        ],
        question: "Which ethnic group was brought from Crimea to guard Trakai Castle?",
        options: [
          "The Karaims.",
          "The Tatars.",
          "The Vikings.",
          "The Cossacks."
        ],
        answer: "The Karaims.",
        explanation: "They were elite warriors brought by the Grand Duke and still maintain a community in Trakai today."
      },
      {
        stopName: "Curonian Spit",
        imageKeyword: "Curonian Spit",
        description: [
          "This UNESCO World Heritage site is a 98km long sand spit that separates the Curonian Lagoon from the Baltic Sea. It is shared between Lithuania and Russia (Kaliningrad).",
          "It is home to the \"Dead Dunes\" (Grey Dunes). These massive sand drifts were once constantly moving, burying entire fishing villages beneath them. Today, vegetation has stabilized them, but they remain a stark, desert-like landscape.",
          "The spit is a birdwatcher's paradise. It acts as a \"bridge\" for migratory birds flying between Northern Europe and Africa; millions of birds pass through here every year, which is why the world's first bird ringing station was established here."
        ],
        question: "Why are the dunes on the Curonian Spit called the \"Dead Dunes\"?",
        options: [
          "They used to move and bury villages.",
          "Nothing grows there.",
          "They are haunted.",
          "They are made of ash."
        ],
        answer: "They used to move and bury villages.",
        explanation: "The shifting sands swallowed entire settlements, leaving a lifeless landscape before being stabilized."
      },
      {
        stopName: "Vilnius Old Town",
        imageKeyword: "Republic of Užupis",
        description: [
          "Vilnius has one of the largest surviving medieval old towns in Northern Europe. Within it lies the bohemian district of Užupis, which declared itself an independent republic on April Fool's Day in 1997.",
          "Užupis has its own president, anthem, and a constitution engraved on mirrors on a wall. The constitution includes unique rights such as \"A dog has the right to be a dog\" and \"People have the right to be happy.\"",
          "The symbol of the district is the Bronze Angel of Užupis. It stands on a tall column in the main square, blowing a trumpet to symbolize the artistic freedom and spiritual rebirth of the neighborhood."
        ],
        question: "On what date did the district of Užupis declare its independence?",
        options: [
          "April 1st (April Fool's Day).",
          "July 4th.",
          "December 25th.",
          "January 1st."
        ],
        answer: "April 1st (April Fool's Day).",
        explanation: "The \"Republic\" started as an artistic joke but evolved into a serious community project."
      },
      {
        stopName: "The Amber Museum",
        imageKeyword: "Amber Museum Palanga",
        description: [
          "Lithuania is known as the land of \"Baltic Gold.\" The Baltic Sea coast is the source of about 80% of the world's known amber, which is fossilized tree resin from 44 million years ago.",
          "The museum in Palanga is housed in a 19th-century palace and contains over 28,000 pieces of amber. The highlight is the \"Sun Stone,\" a massive chunk of amber weighing 3.5 kilograms.",
          "The collection features \"inclusions\"—amber pieces with prehistoric insects and plants trapped inside. These provide a perfect 3D snapshot of life in the Eocene forests, preserving spiders and flies in incredible detail."
        ],
        question: "What is Baltic amber made of?",
        options: [
          "Fossilized tree resin.",
          "Hardened honey.",
          "Volcanic glass.",
          "Sea coral."
        ],
        answer: "Fossilized tree resin.",
        explanation: "It is the hardened sap of ancient pine trees that grew in the region millions of years ago."
      }
    ]
  },
  "Luxembourg": {
    tourTitle: "The Gibraltar of the North",
    introText: "The old city is built on high cliffs overlooking deep green gorges. Wander through the tunnels of the ancient fortress underground.",
    stops: [
      {
        stopName: "The Bock Casemates",
        imageKeyword: "The Bock Casemates",
        description: [
          "These massive underground tunnels are the remnants of one of the greatest fortifications in Europe. Carved directly into the solid rock of the Bock promontory, the network once stretched for 23 kilometers and could shelter thousands of soldiers, horses, and equipment during a siege.",
          "Because of these impregnable defenses, the city earned the nickname \"The Gibraltar of the North.\" The fortress was so formidable that it was only dismantled in 1867 as a condition of the Treaty of London to guarantee the country's neutrality.",
          "The tunnels offer a unique view of the city. From the cannon loops carved into the cliff face, visitors can look straight down into the gorge and the river Alzette flowing through the lower town of the Grund."
        ],
        question: "What nickname was given to Luxembourg City due to its massive fortress?",
        options: [
          "The Gibraltar of the North.",
          "The Iron City.",
          "The Unconquerable.",
          "The Stone Shield."
        ],
        answer: "The Gibraltar of the North.",
        explanation: "Its heavy fortifications on high cliffs made it nearly as difficult to conquer as the famous Rock of Gibraltar."
      },
      {
        stopName: "Le Chemin de la Corniche",
        imageKeyword: "Le Chemin de la Corniche",
        description: [
          "Often called \"the most beautiful balcony in Europe,\" this pedestrian promenade runs along the top of the ramparts of the old city. It offers spectacular panoramic views of the Alzette valley and the colorful houses of the Grund district below.",
          "The walkway was built by the Spaniards and the French in the 17th century as part of the defensive walls. Today, it is the most popular walking route in the city, connecting the upper town to the lower judicial quarter.",
          "It passes by the St. Michael's Church, the oldest religious site in the city. The church has been destroyed and rebuilt so many times that its architecture is a strange mix of Romanesque, Gothic, and Baroque styles."
        ],
        question: "What is the Chemin de la Corniche popularly known as?",
        options: [
          "The most beautiful balcony in Europe.",
          "The longest wall.",
          "The King's Walk.",
          "The Sky Road."
        ],
        answer: "The most beautiful balcony in Europe.",
        explanation: "The promenade offers an unobstructed, balcony-like view over the deep valley and lower town."
      },
      {
        stopName: "Vianden Castle",
        imageKeyword: "Vianden Castle",
        description: [
          "Located in the north of the country, this is one of the largest and most beautiful feudal residences of the Romanesque and Gothic periods in Europe. It was built between the 11th and 14th centuries on the foundations of a Roman fort.",
          "The castle fell into complete ruin in the 19th century and was sold for scrap parts. It was only restored to its former glory in the late 1970s, a massive national project that rebuilt the chapel, the knights' hall, and the formidable outer walls.",
          "Victor Hugo, the famous French author of Les Misérables, lived in the town of Vianden during his political exile. He fell in love with the ruins and sketched them frequently; a bust of the author now stands near the bridge overlooking the castle."
        ],
        question: "Which famous French author lived in exile near Vianden Castle?",
        options: [
          "Victor Hugo.",
          "Voltaire.",
          "Alexandre Dumas.",
          "Jules Verne."
        ],
        answer: "Victor Hugo.",
        explanation: "The writer stayed in the village in 1871 and documented the castle ruins in his drawings."
      },
      {
        stopName: "Mullerthal",
        imageKeyword: "Mullerthal",
        description: [
          "This region is nicknamed \"Little Switzerland\" because of its hilly landscape, thick forests, and jagged sandstone rock formations. It is a hiker's paradise, featuring the 112km-long Mullerthal Trail.",
          "The most iconic spot is the Schiessentümpel. It is a picturesque waterfall where the Black Ernz river splits into three streams as it cascades over a rock, crossed by a charming stone and wood bridge built in 1879.",
          "The rocks here act as a natural air conditioner. The narrow crevices and caves in the sandstone retain cold air, so even in the middle of a hot summer, walking through the \"narrow chasm\" formations feels surprisingly chilly."
        ],
        question: "Why is the Mullerthal region known as \"Little Switzerland\"?",
        options: [
          "Its rugged terrain resembles the Swiss landscape.",
          "It is famous for chocolate.",
          "Everyone speaks Swiss German.",
          "It has snowy peaks."
        ],
        answer: "Its rugged terrain resembles the Swiss landscape.",
        explanation: "The combination of hills, forests, and rock formations reminded early visitors of Switzerland."
      },
      {
        stopName: "Grand Ducal Palace",
        imageKeyword: "Grand Ducal Palace",
        description: [
          "This is the official residence of the Grand Duke of Luxembourg, the head of state. Luxembourg is the only remaining sovereign Grand Duchy in the world, making this palace unique in its status.",
          "The building reflects the Spanish Renaissance style. It has an ornate facade with turrets and intricate stonework that stands right on the street, without a massive fence separating it from the public sidewalk.",
          "During the summer months, the Grand Duke opens the doors to the public. Visitors can tour the interior to see the ceremonial rooms and the main banquet hall, which is still used for state visits and royal weddings."
        ],
        question: "Luxembourg is the only remaining sovereign nation with what title?",
        options: [
          "Grand Duchy.",
          "Empire.",
          "Sultanate.",
          "Principality."
        ],
        answer: "Grand Duchy.",
        explanation: "It is the only country in the world headed by a Grand Duke rather than a King, Queen, or President."
      }
    ]
  }
};