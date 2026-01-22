import { TourData } from "../../types";

export const toursZ: Record<string, TourData> = {
  "Zambia": {
    tourTitle: "The Real Africa",
    introText: "The Victoria Falls creates a curtain of water over a mile wide. Swim in the Devil's Pool at the very edge of the drop.",
    stops: [
      {
        stopName: "Victoria Falls",
        imageKeyword: "Victoria Falls Zambia",
        description: [
          "Shared with Zimbabwe, this is the largest curtain of falling water in the world. The local name Mosi-oa-Tunya means \"The Smoke That Thunders,\" referring to the massive spray cloud that can be seen from 30 miles away.",
          "During the dry season (September to December), daring tourists can swim in the \"Devil's Pool.\" This natural rock pool sits at the very edge of the falls; a rock lip prevents swimmers from being swept over the 100-meter drop.",
          "The spray creates a localized rainforest. While the surrounding area is dry savanna, the constant mist supports a lush, dripping rainforest on the cliff opposite the falls, complete with baboons and hornbills."
        ],
        question: "What does the local name for Victoria Falls, Mosi-oa-Tunya, mean?",
        options: [
          "The Smoke That Thunders.",
          "The Endless River.",
          "The Tears of God.",
          "The White Wall."
        ],
        answer: "The Smoke That Thunders.",
        explanation: "The falling water creates a roar and a mist cloud resembling smoke."
      },
      {
        stopName: "South Luangwa National Park",
        imageKeyword: "South Luangwa National Park",
        description: [
          "This park is known as the birthplace of the \"walking safari.\" Instead of sitting in a jeep, visitors walk through the bush with an armed ranger and a guide, tracking animals on foot for an immersive experience.",
          "It has one of the highest densities of leopards in the world. Night drives are allowed here, offering a rare chance to see these elusive cats hunting in the dark.",
          "The Luangwa River is crowded. It contains the highest concentration of hippos and Nile crocodiles in Africa; during the dry season, hundreds of hippos can be seen squeezing into the remaining river pools."
        ],
        question: "South Luangwa is famous for pioneering what type of safari experience?",
        options: [
          "The Walking Safari.",
          "The Hot Air Balloon Safari.",
          "The Boat Safari.",
          "The Night Vision Safari."
        ],
        answer: "The Walking Safari.",
        explanation: "It popularized the concept of exploring the bush on foot rather than in a vehicle."
      },
      {
        stopName: "Lake Kariba",
        imageKeyword: "Lake Kariba",
        description: [
          "This is the world's largest man-made lake by volume. It was formed by damming the Zambezi River in the late 1950s to generate hydroelectric power.",
          "The filling of the lake led to \"Operation Noah.\" As the water rose, thousands of animals were trapped on shrinking islands. Rangers led a massive 5-year rescue mission, swimming elephants and rhinos to safety.",
          "The lake is famous for its dead trees. The Mopane forests that were flooded were not cleared; their petrified trunks still stick out of the water, providing perches for fish eagles and hiding spots for tigerfish."
        ],
        question: "What was \"Operation Noah\"?",
        options: [
          "A rescue mission to save animals from the rising lake water.",
          "A military operation.",
          "A bridge building project.",
          "A fish stocking program."
        ],
        answer: "A rescue mission to save animals from the rising lake water.",
        explanation: "As the dam filled, wildlife trapped on islands had to be relocated to the mainland."
      },
      {
        stopName: "Kasanka National Park",
        imageKeyword: "Kasanka Bat Migration",
        description: [
          "Every year between October and December, this small park hosts the largest mammal migration on Earth. About 10 million Straw-colored Fruit Bats descend on a tiny patch of swamp forest to feed on wild fruits.",
          "The sky turns black. At sunset, the bats leave their roosts to feed, creating a cloud of wings that blots out the sky. The weight of the bats is so immense that they often break the branches of the trees they sleep on.",
          "It is a vital ecological event. The bats disperse seeds across the continent, acting as the gardeners of the African rainforests."
        ],
        question: "Kasanka National Park hosts the world's largest migration of which mammal?",
        options: [
          "Fruit Bats.",
          "Wildebeest.",
          "Elephants.",
          "Gazelles."
        ],
        answer: "Fruit Bats.",
        explanation: "Ten million bats gather in a tiny forest, outnumbering even the wildebeest migration."
      },
      {
        stopName: "Mukuni Village",
        imageKeyword: "Mukuni Village",
        description: [
          "Located near Victoria Falls, this is a living village of the Leya people. It was founded in the 13th century and is still ruled by a female chief (the Bedyango) and a male chief (the Simukuni).",
          "The village layout is traditional. It has separate compounds for the chiefs, and visitors can see how huts are constructed using mud and termite mound clay.",
          "The Leya people have a unique role. They are the \"Guardians of the Falls,\" traditionally responsible for performing rituals at the waterfall to appease the river spirits and ensure rain."
        ],
        question: "The Leya people of Mukuni Village are traditionally known as the guardians of what?",
        options: [
          "Victoria Falls.",
          "The Zambezi River.",
          "The Bat Forest.",
          "The Sacred Mountain."
        ],
        answer: "Victoria Falls.",
        explanation: "They perform spiritual rituals at the site to honor the river gods."
      }
    ]
  },
  "Zimbabwe": {
    tourTitle: "The Jewel of Africa",
    introText: "Great Zimbabwe is the largest medieval stone city in sub-Saharan Africa. Watch the elephants drink at the waterholes in Hwange Park.",
    stops: [
      {
        stopName: "Great Zimbabwe",
        imageKeyword: "Great Zimbabwe Walls",
        description: [
          "This ruined city was the capital of the Kingdom of Zimbabwe during the Late Iron Age. It is the largest stone structure in Africa south of the pyramids.",
          "The walls were built without mortar. The granite blocks were cut and fitted so precisely that the walls, which are up to 11 meters (36 feet) high and 6 meters thick, have stood for centuries purely on gravity and friction.",
          "It is the origin of the \"Zimbabwe Bird.\" Eight soapstone birds were found in the ruins; this bird is now the national emblem, appearing on the flag and currency."
        ],
        question: "What holds the massive stone walls of Great Zimbabwe together?",
        options: [
          "Nothing (Gravity/Friction).",
          "Cement.",
          "Clay mortar.",
          "Iron clamps."
        ],
        answer: "Nothing (Gravity/Friction).",
        explanation: "They are dry-stone walls built without any mortar or cement."
      },
      {
        stopName: "Hwange National Park",
        imageKeyword: "Hwange Elephants",
        description: [
          "This is the largest park in Zimbabwe, roughly the size of Belgium. It is famous for its massive elephant population, hosting over 40,000 tuskers.",
          "The waterholes are man-made. Because the park has no major rivers and dries up completely in winter, the waterholes are pumped using solar power or diesel engines to keep the animals alive during the dry season.",
          "It is the former home of Cecil the Lion. The famous lion, whose killing by a trophy hunter sparked global outrage in 2015, lived and was studied here for years."
        ],
        question: "How are the waterholes in Hwange National Park maintained during the dry season?",
        options: [
          "By pumps (Solar/Diesel).",
          "By rain capture.",
          "They are natural springs.",
          "By trucks bringing water."
        ],
        answer: "By pumps (Solar/Diesel).",
        explanation: "Park rangers pump groundwater to the surface to ensure the animals have water to drink."
      },
      {
        stopName: "Mana Pools National Park",
        imageKeyword: "Mana Pools Elephant",
        description: [
          "Located on the Zambezi River, this park turns into a series of pools during the dry season. It is a UNESCO World Heritage site known for its wild, unmanaged beauty.",
          "The elephants here have learned a unique trick. To reach the nutritious pods of the Ana trees (Winter Thorn), the bulls have learned to stand on their hind legs and stretch their trunks high into the canopy, a behavior rarely seen elsewhere.",
          "It is one of the few parks that allow unguided walking. Visitors are allowed to get out of their cars and walk freely (at their own risk), offering a raw and thrilling connection to nature."
        ],
        question: "What unique behavior have elephants in Mana Pools learned to do to get food?",
        options: [
          "Stand on their hind legs.",
          "Climb trees.",
          "Use sticks as tools.",
          "Dig wells."
        ],
        answer: "Stand on their hind legs.",
        explanation: "They balance on two legs to reach tree pods that are otherwise out of reach."
      },
      {
        stopName: "Matobo National Park",
        imageKeyword: "Matobo Balancing Rocks",
        description: [
          "The Matobo Hills are a landscape of balancing granite rocks (kopjes). Erosion has sculpted the rock into fantastic shapes, including the famous \"Mother and Child\" formation.",
          "It is the burial place of Cecil John Rhodes. The British imperialist chose to be buried at the summit of a hill called Malindidzimu (\"View of the World\"). His grave is carved directly into the rock, surrounded by massive boulders covered in orange lichen.",
          "The park has the highest concentration of Black Eagles in the world. The rocky cliffs provide perfect nesting sites for these raptors, which feed on the hyraxes (rock rabbits) that live in the boulders."
        ],
        question: "Which controversial British imperialist is buried at the \"View of the World\" in Matobo?",
        options: [
          "Cecil John Rhodes.",
          "David Livingstone.",
          "Henry Morton Stanley.",
          "Queen Victoria."
        ],
        answer: "Cecil John Rhodes.",
        explanation: "The founder of Rhodesia requested to be buried on this sacred hill."
      },
      {
        stopName: "The Birchenough Bridge",
        imageKeyword: "Birchenough Bridge",
        description: [
          "This bridge spans the Save River. Designed by Ralph Freeman, who also designed the Sydney Harbour Bridge, it looks like a smaller version of its famous Australian cousin.",
          "When it was completed in 1935, it was the third-longest single-arch suspension bridge in the world. It was a vital link opening up the eastern part of the country.",
          "Locals call the bridge Mbiru. The arch design is so iconic that it has been incorporated into the design of the Zimbabwean 20-cent coin."
        ],
        question: "The Birchenough Bridge shares a designer with which famous Australian landmark?",
        options: [
          "The Sydney Harbour Bridge.",
          "The Opera House.",
          "The Great Ocean Road.",
          "The Melbourne Cricket Ground."
        ],
        answer: "The Sydney Harbour Bridge.",
        explanation: "Ralph Freeman designed both, leading to their strikingly similar arch appearance."
      }
    ]
  }
};