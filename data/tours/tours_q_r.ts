import { TourData } from "../../types";

export const toursQR: Record<string, TourData> = {
  "Qatar": {
    tourTitle: "The Pearl of the Gulf",
    introText: "The Museum of Islamic Art floats on an island off the coast of Doha. Watch the traditional falcon hunters train their birds in the desert.",
    stops: [
      {
        stopName: "Museum of Islamic Art",
        imageKeyword: "Museum of Islamic Art",
        description: [
          "Designed by I.M. Pei (architect of the Louvre Pyramid), this building sits on its own purpose-built island. The architect traveled the Muslim world for six months to find inspiration, eventually basing the design on the 9th-century mosque of Ahmad Ibn Tulun in Cairo.",
          "The building looks different depending on the sunlight. The limestone exterior captures the changes in light and shadow throughout the day, creating a play of geometric shapes that look like a woman's eyes behind a veil (according to some interpretations).",
          "Inside, the museum holds masterpieces from three continents spanning 1,400 years. The central atrium features a massive metallic ring chandelier suspended above a fountain, creating a sense of infinite space."
        ],
        question: "Which famous architect designed the Museum of Islamic Art?",
        options: [
          "I.M. Pei.",
          "Zaha Hadid.",
          "Frank Gehry.",
          "Norman Foster."
        ],
        answer: "I.M. Pei.",
        explanation: "He came out of retirement to design this masterpiece, insisting it be built on a standalone island to prevent future buildings from encroaching on it."
      },
      {
        stopName: "Souq Waqif",
        imageKeyword: "Souq Waqif",
        description: [
          "Unlike the shiny skyscrapers of Doha, Souq Waqif (\"The Standing Market\") preserves traditional Qatari architecture. It was renovated to look like a 19th-century souq, using mud, wood, and stone to recreate the feeling of old Bedouin trade hubs.",
          "It houses a dedicated Falcon Souq. Here, falcons are sold for thousands of dollars. The market even has a specialized Falcon Hospital, where birds receive medical care ranging from feather repair to surgery.",
          "The \"Hamali\" porters are a common sight. These men wear red vests and push wooden wheelbarrows, helping shoppers carry their spices, textiles, and pots through the pedestrian-only streets."
        ],
        question: "What specific type of animal has its own dedicated hospital in Souq Waqif?",
        options: [
          "Falcons.",
          "Camels.",
          "Horses.",
          "Cats."
        ],
        answer: "Falcons.",
        explanation: "Falconry is a prestigious sport in Qatar, and the birds are highly valued and cared for."
      },
      {
        stopName: "The Pearl-Qatar",
        imageKeyword: "The Pearl-Qatar",
        description: [
          "This is a massive artificial island spanning nearly four million square meters. It is the first land in Qatar available for freehold ownership by foreign nationals.",
          "It is built on the site of a former pearl diving bed. The design resembles a string of pearls to honor Qatar's history as a major pearl trading hub before the oil boom.",
          "The Qanat Quartier is a district designed to look like Venice. It features canals, Rialto-style bridges, and pastel-colored buildings, allowing residents to take water taxis to their apartments."
        ],
        question: "Why is the artificial island called \"The Pearl\"?",
        options: [
          "It is built on a former pearl diving site.",
          "It is shaped like a diamond.",
          "It cost a pearl to build.",
          "It is white."
        ],
        answer: "It is built on a former pearl diving site.",
        explanation: "The name and shape pay homage to the nation's historical pearling industry."
      },
      {
        stopName: "Khor Al Adaid",
        imageKeyword: "Khor Al Adaid",
        description: [
          "This is one of the few places in the world where the sea encroaches deep into the heart of the desert. The Khor Al Adaid is a UNESCO-recognized natural reserve where tall sand dunes surround a tidal embayment.",
          "The area is inaccessible by road; you can only reach it by driving 4x4 vehicles over the dunes.",
          "It is a haven for wildlife. The ecosystem supports turtles, ospreys, and Arabian gazelles, while the water is home to dugongs and diverse fish species, creating a rare meeting point of desert and marine life."
        ],
        question: "How must visitors travel to reach the Inland Sea?",
        options: [
          "By 4x4 vehicle (over sand dunes).",
          "By boat.",
          "By train.",
          "By helicopter."
        ],
        answer: "By 4x4 vehicle (over sand dunes).",
        explanation: "There are no paved roads leading to the reserve; it requires off-road driving."
      },
      {
        stopName: "Zubarah Fort",
        imageKeyword: "Zubarah Fort",
        description: [
          "This UNESCO World Heritage site is a pristine example of an 18th-century Gulf merchant town. The fort protected the city of Zubarah, which was once a thriving pearl fishing and trading port.",
          "The fort's walls are one meter thick. They were built using coral stone and limestone mixed with mud mortar, designed to keep the interior cool during the blistering summer heat and withstand cannon fire.",
          "The city was abandoned in the early 20th century. Because it was covered by sand, the entire layout of the town—including palaces, mosques, and courtyard houses—remains preserved underground, offering archaeologists a time capsule of historic Qatar."
        ],
        question: "What material was used to build the thick walls of Zubarah Fort?",
        options: [
          "Coral stone (and limestone/mud).",
          "Concrete.",
          "Red brick.",
          "Wood."
        ],
        answer: "Coral stone (and limestone/mud).",
        explanation: "These local materials provided excellent insulation and defense."
      }
    ]
  },
  "Romania": {
    tourTitle: "The Land of Dracula",
    introText: "The spooky Bran Castle sits high on a Transylvanian cliff. Drive the winding Transfăgărășan highway through the Carpathian Mountains.",
    stops: [
      {
        stopName: "Bran Castle",
        imageKeyword: "Bran Castle",
        description: [
          "This 14th-century fortress is marketed to the world as \"Dracula's Castle.\" While it fits the description in Bram Stoker's novel perfectly—perched on a high rock overlooking a dark valley—the real Vlad the Impaler (the inspiration for Dracula) likely never lived here.",
          "Historically, it was a customs post and a fortress defending the pass against the Ottoman Empire. In the 1920s, it became the favorite residence of Queen Marie of Romania, who softened its military look with gardens and flowers.",
          "Inside, visitors can explore a secret staircase. Hidden within the thick walls and originally used by soldiers to move quickly between floors, it was blocked for decades before being rediscovered during renovations."
        ],
        question: "Why is Bran Castle commonly called \"Dracula's Castle\"?",
        options: [
          "It fits the description in Bram Stoker's novel.",
          "Vlad the Impaler was born there.",
          "Vampires live there.",
          "It is painted blood red."
        ],
        answer: "It fits the description in Bram Stoker's novel.",
        explanation: "While not Vlad's home, its dramatic appearance inspired the fictional setting."
      },
      {
        stopName: "Palace of the Parliament",
        imageKeyword: "Palace of the Parliament",
        description: [
          "Located in Bucharest, this is the heaviest building in the world and the second-largest administrative building (after the Pentagon). It was the obsession of dictator Nicolae Ceaușescu, who demolished huge sections of the historic city to build it.",
          "The scale is hard to comprehend: it has 1,100 rooms, is 12 stories tall (with 8 more underground), and contains 3,500 tonnes of crystal and 700,000 tonnes of steel.",
          "The underground levels include a massive nuclear bunker and tunnels large enough for cars to drive through, designed to help the dictator escape. It remains a controversial symbol of the communist era's excess."
        ],
        question: "The Palace of the Parliament holds the world record for being the what?",
        options: [
          "Heaviest building in the world.",
          "Tallest building in the world.",
          "Oldest parliament.",
          "Most expensive hotel."
        ],
        answer: "Heaviest building in the world.",
        explanation: "Due to the massive amounts of marble, steel, and concrete used, it is the heaviest structure on Earth."
      },
      {
        stopName: "Transfăgărășan Highway",
        imageKeyword: "Transfagarasan Highway",
        description: [
          "Dubbed by the Top Gear TV show as \"the best road in the world,\" this highway winds through the Făgăraș Mountains with terrifying hairpin turns and S-curves. It climbs to an altitude of 2,042 meters.",
          "It was built in the 1970s as a strategic military route to allow troops to cross the mountains quickly in case of a Soviet invasion. The construction was perilous, using 6 million kilograms of dynamite, and many soldiers died during the work.",
          "The road leads to Bâlea Lake, a glacial lake near the summit. In winter, the road is closed due to snow, and the only way to reach the ice hotel built on the lake is by cable car."
        ],
        question: "Why was the Transfăgărășan Highway originally built?",
        options: [
          "As a strategic military route.",
          "For racing cars.",
          "To reach a gold mine.",
          "To access a ski resort."
        ],
        answer: "As a strategic military route.",
        explanation: "Ceaușescu ordered it built to ensure rapid troop movement through the mountains."
      },
      {
        stopName: "Merry Cemetery",
        imageKeyword: "Merry Cemetery",
        description: [
          "This is one of the most unique cemeteries in the world. Instead of somber grey headstones, the graves are marked with bright blue wooden crosses carved with colorful paintings and funny poems.",
          "The paintings depict the deceased person's life or the way they died—sometimes humorously or tragically (like being hit by a truck or drinking too much). The poems are written in the first person, as if the dead are speaking to the living with honesty and wit.",
          "The tradition was started in 1935 by a local woodcarver, Stan Ioan Pătraș. It reflects the local belief that death is not a grim end, but a moment full of meaning and even joy."
        ],
        question: "What is unique about the headstones in the Merry Cemetery?",
        options: [
          "They are colorful and feature funny poems/paintings.",
          "They are made of gold.",
          "They are invisible.",
          "They are shaped like animals."
        ],
        answer: "They are colorful and feature funny poems/paintings.",
        explanation: "The vibrant art and humorous epitaphs celebrate life rather than mourning death."
      },
      {
        stopName: "Voroneț Monastery",
        imageKeyword: "Voronet Monastery",
        description: [
          "Known as the \"Sistine Chapel of the East,\" this medieval church is famous for its exterior frescoes. The walls are covered in bright paintings depicting biblical scenes, which were used to teach religion to illiterate peasants.",
          "The most famous color is \"Voroneț Blue,\" a vibrant shade of blue that has survived on the walls for 500 years without fading. The exact composition of this pigment was a lost secret for centuries.",
          "The main painting is a massive depiction of \"The Last Judgment\" covering the entire western wall. It shows angels rolling up the zodiac signs to signal the end of time and sinners being sent to a fiery river."
        ],
        question: "What is the famous color used in the frescoes of Voroneț Monastery?",
        options: [
          "Voroneț Blue.",
          "Imperial Red.",
          "Forest Green.",
          "Royal Purple."
        ],
        answer: "Voroneț Blue.",
        explanation: "The unique, durable shade of blue is the monastery's most distinctive feature."
      }
    ]
  },
  "Russia": {
    tourTitle: "The Great Bear",
    introText: "The colorful onion domes of St. Basil's Cathedral rise from Red Square. Ride the Trans-Siberian Railway across the largest country on Earth.",
    stops: [
      {
        stopName: "Saint Basil's Cathedral",
        imageKeyword: "Saint Basil's Cathedral",
        description: [
          "Located in Red Square, Moscow, this is the ultimate icon of Russia. It was built by Ivan the Terrible in the 16th century to commemorate the capture of Kazan. It consists of nine chapels clustered around a central core.",
          "The architecture is unique—it has no known predecessor. The colorful onion domes are patterned with swirls and zigzags that look like bonfires rising into the sky.",
          "A popular (though likely false) legend says that Ivan the Terrible blinded the architect, Postnik Yakovlev, after the cathedral was finished so that he could never build anything as beautiful again."
        ],
        question: "Who commissioned the building of Saint Basil's Cathedral?",
        options: [
          "Ivan the Terrible.",
          "Peter the Great.",
          "Catherine the Great.",
          "Nicholas II."
        ],
        answer: "Ivan the Terrible.",
        explanation: "The Tsar ordered its construction to celebrate his military victories."
      },
      {
        stopName: "The Hermitage Museum",
        imageKeyword: "Hermitage Museum",
        description: [
          "Located in St. Petersburg, this was the official residence of the Russian Tsars. Today, it is one of the largest and oldest museums in the world, founded by Catherine the Great in 1764.",
          "The collection is so vast that it is said if you spent one minute looking at each exhibit, it would take you 11 years to see everything. It spans six buildings, including the mint-green Winter Palace.",
          "The museum employs a dedicated army of cats. The \"Hermitage Cats\" live in the basement and patrol the grounds to keep rats away from the priceless art, a tradition dating back to the 18th century."
        ],
        question: "Who founded the art collection that became the Hermitage Museum?",
        options: [
          "Catherine the Great.",
          "Ivan the Terrible.",
          "Rasputin.",
          "Lenin."
        ],
        answer: "Catherine the Great.",
        explanation: "She started the private collection in 1764, which grew into the massive museum."
      },
      {
        stopName: "Lake Baikal",
        imageKeyword: "Lake Baikal",
        description: [
          "This is the deepest and oldest lake in the world, containing 20% of the planet's unfrozen freshwater—more than all the Great Lakes of North America combined.",
          "It is home to the Baikal Seal (nerpa), the only exclusively freshwater seal in the world. How these seals arrived in a lake thousands of kilometers from the ocean remains a mystery.",
          "In winter, the ice creates stunning turquoise blocks known as \"hummocks.\" The ice is so transparent that you can see fish swimming 40 meters below your feet, and it is strong enough to drive cars on (though dangerous)."
        ],
        question: "Lake Baikal holds approximately what percentage of the world's freshwater?",
        options: [
          "20%.",
          "5%.",
          "50%.",
          "10%."
        ],
        answer: "20%.",
        explanation: "Its immense depth makes it the largest freshwater reservoir by volume on Earth."
      },
      {
        stopName: "Trans-Siberian Railway",
        imageKeyword: "Trans-Siberian Railway",
        description: [
          "This is the longest railway line in the world, stretching 9,289 kilometers from Moscow to Vladivostok. The journey takes about 7 days of continuous travel and crosses 8 time zones.",
          "It was built between 1891 and 1916 to connect the remote eastern regions of the empire with the capital. It remains a vital lifeline for Siberia.",
          "Passengers on the train experience the vastness of Russia, passing through the Ural Mountains, the Siberian taiga (forest), and the shores of Lake Baikal. It is a legendary travel experience."
        ],
        question: "How many time zones does the Trans-Siberian Railway cross?",
        options: [
          "8.",
          "3.",
          "12.",
          "1."
        ],
        answer: "8.",
        explanation: "The vast distance from Moscow to the Pacific coast spans eight distinct time zones."
      },
      {
        stopName: "The Kremlin",
        imageKeyword: "The Kremlin",
        description: [
          "\"Kremlin\" means \"fortress\" in Russian. The Moscow Kremlin is the seat of Russian power, housing the President's office. It is surrounded by massive red brick walls and 20 towers.",
          "Inside, it contains cathedrals where the Tsars were crowned and buried. It also houses the Tsar Bell, the largest bell in the world, which cracked during a fire before it could ever be rung.",
          "Also on display is the Tsar Cannon, a massive artillery piece that was never fired in war. Both objects symbolize the grandeur and sometimes tragic history of the Russian state."
        ],
        question: "What does the word \"Kremlin\" mean in Russian?",
        options: [
          "Fortress (or citadel).",
          "Palace.",
          "Parliament.",
          "Capital."
        ],
        answer: "Fortress (or citadel).",
        explanation: "It refers to the fortified complex at the heart of historic Russian cities."
      }
    ]
  },
  "Rwanda": {
    tourTitle: "The Land of a Thousand Hills",
    introText: "Mountain gorillas live peacefully in the bamboo forests of the Volcanoes National Park. Visit a nation transformed into one of the cleanest in Africa.",
    stops: [
      {
        stopName: "Volcanoes National Park",
        imageKeyword: "Volcanoes National Park",
        description: [
          "This park in the Virunga Mountains is famous as the base where Dian Fossey researched Mountain Gorillas for 18 years. It is one of the few places in the world where visitors can trek to see these gentle giants in the wild.",
          "The park includes five of the eight volcanoes of the Virunga chain. The slopes are covered in bamboo forests, the favorite food of the gorillas and the rare Golden Monkey.",
          "Strict conservation rules limit the number of tourists and the time they can spend with the gorillas (one hour). This high-cost, low-impact tourism model has successfully helped the gorilla population recover from the brink of extinction."
        ],
        question: "Which famous primatologist conducted research in Volcanoes National Park?",
        options: [
          "Dian Fossey.",
          "Jane Goodall.",
          "David Attenborough.",
          "Steve Irwin."
        ],
        answer: "Dian Fossey.",
        explanation: "Her work, immortalized in \"Gorillas in the Mist,\" brought global attention to the plight of the gorillas."
      },
      {
        stopName: "Kigali Genocide Memorial",
        imageKeyword: "Kigali Genocide Memorial",
        description: [
          "This somber memorial is the final resting place for over 250,000 victims of the 1994 Genocide against the Tutsi. It serves as a place of remembrance and learning, dedicated to preventing future mass atrocities.",
          "The museum details the history leading up to the genocide and the horrific events of the 100 days of slaughter. It also has a \"Children's Room\" dedicated to the youngest victims, which is heartbreaking but essential viewing.",
          "Despite the dark history, the memorial emphasizes peace and reconciliation. It stands as a testament to Rwanda's incredible recovery and its commitment to unity (\"Ndi Umunyarwanda\" - I am Rwandan)."
        ],
        question: "The Kigali Genocide Memorial honors the victims of which tragic event?",
        options: [
          "The 1994 Genocide against the Tutsi.",
          "The Civil War.",
          "The Colonial Occupation.",
          "The Great Famine."
        ],
        answer: "The 1994 Genocide against the Tutsi.",
        explanation: "It commemorates the mass slaughter that occurred over 100 days in 1994."
      },
      {
        stopName: "Nyungwe Forest National Park",
        imageKeyword: "Nyungwe Forest",
        description: [
          "This represents one of the oldest rainforests in Africa. Because it survived the last Ice Age, it is incredibly biodiverse, home to 13 primate species (including chimpanzees) and over 1,000 plant species.",
          "The park features a Canopy Walkway suspended 60 meters above the forest floor. Walking on the swaying bridge offers a bird's-eye view of the misty jungle canopy and the deep valleys below.",
          "It is a major water source. The forest feeds both the Congo and the Nile river basins, acting as a giant sponge that captures rain and regulates the water flow for much of the country."
        ],
        question: "What unique infrastructure allows visitors to view Nyungwe Forest from above?",
        options: [
          "A canopy walkway (suspension bridge).",
          "A cable car.",
          "A helicopter tour.",
          "A glass elevator."
        ],
        answer: "A canopy walkway (suspension bridge).",
        explanation: "The suspended bridge allows tourists to walk through the treetops."
      },
      {
        stopName: "Lake Kivu",
        imageKeyword: "Lake Kivu",
        description: [
          "This is one of the African Great Lakes, sitting on the border between Rwanda and the DRC. It is an \"exploding lake\" because it contains massive amounts of methane and carbon dioxide trapped in the deep water.",
          "Rwanda has turned this danger into a resource by extracting the methane gas to generate electricity (the KivuWatt project), providing power to the national grid while reducing the risk of a gas eruption.",
          "Despite the gas deep below, the surface is safe and beautiful. The lake is safe for swimming because it has no crocodiles or hippos, and the resort towns like Gisenyi offer sandy beaches and boat tours."
        ],
        question: "Why is Lake Kivu considered potentially dangerous?",
        options: [
          "It contains trapped methane and carbon dioxide gas.",
          "It has giant crocodiles.",
          "It is extremely hot.",
          "It has a whirlpool."
        ],
        answer: "It contains trapped methane and carbon dioxide gas.",
        explanation: "Deep layers of dissolved gas could theoretically erupt, but they are currently being harvested for energy."
      },
      {
        stopName: "King's Palace Museum",
        imageKeyword: "King's Palace Nyanza",
        description: [
          "This museum is a reconstruction of the traditional royal residence. It features a beautifully crafted beehive-shaped thatched hut that served as the King's palace, showcasing the traditional architecture of the monarchy.",
          "At the back of the palace live the Inyambo cows. These royal cattle are famous for their massive, long horns and their gentle nature. In the past, they were paraded before the King during ceremonies, decorated with jewelry.",
          "A traditional herdsman tends to the cows, singing to them and grooming them. The site offers a window into pre-colonial Rwandan culture where cattle were a central symbol of wealth and status."
        ],
        question: "What distinctive animal is kept at the King's Palace Museum?",
        options: [
          "Inyambo cows (long-horned cattle).",
          "Royal lions.",
          "White elephants.",
          "Hunting dogs."
        ],
        answer: "Inyambo cows (long-horned cattle).",
        explanation: "These sacred cows with giant horns were a symbol of the monarchy."
      }
    ]
  }
};