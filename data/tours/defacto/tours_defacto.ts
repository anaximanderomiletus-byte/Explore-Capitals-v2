import { TourData } from "../../types";

export const toursDeFacto: Record<string, TourData> = {
  "Taiwan": {
    tourTitle: "Island of Innovation",
    introText: "The Taipei 101 tower was once the tallest building in the world. Eat dumplings in the busy night markets of the capital.",
    stops: [
      {
        stopName: "Taipei 101",
        imageKeyword: "Taipei 101",
        description: [
          "Taipei 101 soars 508 meters above the capital, holding the world's tallest title from 2004 until the Burj Khalifa surpassed it in 2010. Its design echoes traditional pagodas and bamboo, with eight sections symbolizing prosperity.",
          "A 730-metric-ton tuned mass damper hangs between the 87th and 92nd floors, counteracting typhoon winds and earthquakes. The world's fastest elevators whisk visitors to the 89th-floor observatory in just 37 seconds.",
          "The lower floors house a luxury shopping mall and gourmet restaurants. Every New Year's Eve, its spectacular fireworks are broadcast worldwide. The tower also holds LEED Platinum certification as one of the greenest skyscrapers on Earth."
        ],
        question: "How much does the tuned mass damper inside Taipei 101 weigh?",
        options: [
          "730 metric tons",
          "500 metric tons",
          "1,000 metric tons",
          "350 metric tons"
        ],
        answer: "730 metric tons",
        explanation: "The tuned mass damper inside Taipei 101 weighs 730 metric tons and hangs between the 87th and 92nd floors to counteract swaying from typhoons and earthquakes."
      },
      {
        stopName: "Jiufen Old Street",
        imageKeyword: "Jiufen Old Street",
        description: [
          "Jiufen is a mountain village perched above the Pacific in northeastern Taiwan. It thrived as a gold mining town during the Japanese colonial era, fell quiet when the mines closed in the 1970s, and was reborn as a cultural destination in the 1980s.",
          "Lantern-lit alleyways and layered hillside buildings evoke the spirit worlds of Japanese animation. Vendors on Jishan Street sell taro balls, fish ball soup, and grass jelly, while the A-Mei Teahouse offers oolong tea with misty ocean views.",
          "The nearby Gold Museum in Jinguashi preserves the region's mining heritage, starring a 220-kilogram gold ingot visitors can touch for luck. Surrounding trails wind through abandoned shafts and Japanese-era ruins."
        ],
        question: "What was Jiufen\'s primary industry before it became a tourist destination?",
        options: [
          "Fishing",
          "Rice farming",
          "Gold mining",
          "Textile manufacturing"
        ],
        answer: "Gold mining",
        explanation: "Jiufen was a thriving gold mining town during the Japanese colonial era in the late 19th century, and its mines operated until the 1970s before the village was rediscovered as a cultural destination."
      },
      {
        stopName: "Taroko Gorge",
        imageKeyword: "Taroko Gorge",
        description: [
          "Taroko Gorge is a 19-kilometer marble canyon carved by the Liwu River through layers of marble and granite over millions of years. Sheer cliff walls rise hundreds of meters, with some sections so narrow that sunlight barely reaches the river below.",
          "The Central Cross-Island Highway threads through hand-carved tunnels in the rock. The Shakadang Trail follows a turquoise river past Truku settlements, and the Shrine of the Eternal Spring honors workers who died building the road.",
          "The park is home to the indigenous Truku people and harbors over half of Taiwan's native plant species. Rare wildlife includes the Formosan black bear and the Mikado pheasant across ecosystems from subtropical forest to alpine meadow."
        ],
        question: "What type of rock makes up the walls of Taroko Gorge?",
        options: [
          "Sandstone",
          "Limestone",
          "Marble and granite",
          "Basalt"
        ],
        answer: "Marble and granite",
        explanation: "Taroko Gorge was carved by the Liwu River through layers of marble and granite over millions of years, creating its spectacular sheer cliff walls."
      },
      {
        stopName: "Sun Moon Lake",
        imageKeyword: "Sun Moon Lake",
        description: [
          "Sun Moon Lake is Taiwan's largest freshwater lake, set at 748 meters in Nantou County's mountains. Its eastern half is round like the sun, its western half curves like a crescent moon, divided by sacred Lalu Island of the indigenous Thao people.",
          "A 30-kilometer cycling path circles the lake, rated among the world's most scenic rides. Each autumn, thousands of swimmers cross its 3.3-kilometer width in a famous carnival. The Wenwu Temple above the northern shore honors both Confucius and Guan Yu.",
          "The surrounding hills produce some of Taiwan's finest Assam black tea, introduced during the Japanese colonial period. The Xiangshan Visitor Center, designed by architect Norihiko Dan, features a curved wooden roof that mirrors the rolling landscape."
        ],
        question: "Why is the lake called Sun Moon Lake?",
        options: [
          "Because it reflects both the sun and the moon clearly",
          "Because the eastern side is round like the sun and the western side curves like a crescent moon",
          "Because it was discovered at the exact moment of a solar eclipse",
          "Because two ancient temples named Sun and Moon stand on its shores"
        ],
        answer: "Because the eastern side is round like the sun and the western side curves like a crescent moon",
        explanation: "Sun Moon Lake gets its name from its distinctive shape, with the eastern half being round like the sun and the western half curving like a crescent moon, divided by Lalu Island."
      },
      {
        stopName: "Kenting National Park",
        imageKeyword: "Kenting National Park",
        description: [
          "Kenting occupies Taiwan's southernmost tip on the Hengchun Peninsula, established in 1984 as the island's first national park. Its coral reefs shelter over 1,500 marine species and rank among the most biodiverse in the northern hemisphere.",
          "Visitors can explore coral limestone caves at Sheding, wind-sculpted rocks at Fengchuisha, or climb the Eluanbi Lighthouse, East Asia's most powerful. Each spring, thousands of grey-faced buzzards pass overhead on their migration route.",
          "Baisha and South Bay beaches draw swimmers with calm turquoise water, while Jialeshui offers rugged surf on the east coast. The annual Kenting Music Festival brings tens of thousands to the shore for live music and beachside parties."
        ],
        question: "What distinction does Kenting National Park hold in Taiwan\'s history?",
        options: [
          "It is the largest national park in Taiwan",
          "It was Taiwan\'s first national park",
          "It was the first UNESCO World Heritage Site in Taiwan",
          "It is the only national park in Taiwan with coral reefs"
        ],
        answer: "It was Taiwan\'s first national park",
        explanation: "Kenting National Park was established in 1984 as Taiwan\'s first national park, located on the southernmost tip of the island on the Hengchun Peninsula."
      }
    ]
  },
  "Kosovo": {
    tourTitle: "Heart of the Young Balkans",
    introText: "The Newborn monument is repainted every year to honor independence. Sip macchiato in the best coffee culture of the Balkans.",
    stops: [
      {
        stopName: "Prizren Old Town",
        imageKeyword: "Prizren Old Town",
        description: [
          "Prizren sits at the foot of the Sharr Mountains along the Bistrica River, widely considered Kosovo's cultural capital. Its cobblestone streets wind past Ottoman mosques, churches, and hammams, crowned by the hilltop ruins of Kalaja Fortress.",
          "The 17th-century Sinan Pasha Mosque features a painted interior dome, while steps away the Church of Our Lady of Ljevi\u0161 holds UNESCO-listed 14th-century frescoes. The old bazaar still hums with coppersmiths and filigree jewelers.",
          "Every summer, DokuFest transforms the old town into an open-air cinema. Documentary screenings fill courtyards and hillsides beneath the fortress walls, drawing filmmakers from across Europe and cementing Prizren as a Balkan cultural hub."
        ],
        question: "Which church in Prizren has UNESCO World Heritage status for its medieval frescoes?",
        options: [
          "Church of St. Nicholas",
          "Church of Our Lady of Ljevi\u0161",
          "Cathedral of Saint Mother Teresa",
          "Sinan Pasha Mosque"
        ],
        answer: "Church of Our Lady of Ljevi\u0161",
        explanation: "The Church of Our Lady of Ljevi\u0161 is a 14th-century Serbian Orthodox church in Prizren whose remarkable medieval frescoes earned it UNESCO World Heritage status."
      },
      {
        stopName: "Rugova Canyon",
        imageKeyword: "Rugova Canyon",
        description: [
          "Rugova Canyon stretches approximately 25 kilometers through the Accursed Mountains near Peja, making it one of Europe's longest and deepest canyons. Limestone walls tower up to 1,000 meters above the Peja Bistrica River below.",
          "Via ferrata routes scale the vertical cliffs with steel cables, while zip lines cross high above the river. Hiking trails lead to alpine meadows, glacial lakes, and mountain villages where shepherds still tend flocks in summer pastures.",
          "At the canyon's entrance stands the Patriarchate of Pe\u0107, a 13th-century complex of four Serbian Orthodox churches and a UNESCO World Heritage Site. Its medieval frescoes are among the finest in the Balkans, and it remains an active monastery."
        ],
        question: "Approximately how long is Rugova Canyon?",
        options: [
          "10 kilometers",
          "25 kilometers",
          "50 kilometers",
          "40 kilometers"
        ],
        answer: "25 kilometers",
        explanation: "Rugova Canyon stretches approximately 25 kilometers through the Accursed Mountains near the city of Peja, making it one of the longest and deepest canyons in Europe."
      },
      {
        stopName: "Gra\u010danica Monastery",
        imageKeyword: "Gra\u010danica Monastery",
        description: [
          "Gra\u010danica Monastery was built in 1321 by Serbian King Stefan Milutin on the ruins of a 6th-century basilica near Pristina. Its cascading domes and arches form a harmonious pyramidal silhouette, a masterpiece of late Byzantine design.",
          "The interior holds extraordinary Palaeologan-era frescoes depicting biblical scenes, saints, and Serbian royalty with vivid detail. The monastery was inscribed as a UNESCO World Heritage Site in 2006 as part of the Medieval Monuments in Kosovo.",
          "Despite centuries of regional turmoil, the monastery has remained an active place of worship for nearly 700 years. A small community of Serbian Orthodox nuns maintains the church and its treasury of medieval manuscripts, icons, and liturgical objects."
        ],
        question: "Who built Gra\u010danica Monastery and in what year?",
        options: [
          "Emperor Du\u0161an in 1345",
          "King Stefan Milutin in 1321",
          "Prince Lazar in 1389",
          "King Stefan Nemanja in 1196"
        ],
        answer: "King Stefan Milutin in 1321",
        explanation: "Gra\u010danica Monastery was built in 1321 by Serbian King Stefan Milutin on the ruins of an earlier 6th-century basilica, and it is considered one of the finest examples of late Byzantine design in the Balkans."
      },
      {
        stopName: "Newborn Monument (Pristina)",
        imageKeyword: "Newborn Monument (Pristina)",
        description: [
          "The Newborn Monument was unveiled on February 17, 2008, the very day Kosovo declared independence. Massive steel letters spell NEWBORN, each over two meters tall. Citizens lined up to sign the bright yellow letters in celebration.",
          "Every independence anniversary, the monument is repainted with a new design reflecting Kosovo's development. Past themes include flags of recognizing nations, EU aspirations, and social issues. The repainting has become a major public event.",
          "The surrounding area pulses with caf\u00e9s reflecting Kosovo's famous coffee culture, where a simple macchiato fuels hours of conversation. Pristina is one of Europe's youngest capitals in both population age and statehood, and the energy here shows it."
        ],
        question: "On what date was the Newborn Monument unveiled?",
        options: [
          "January 1, 2008",
          "February 17, 2008",
          "June 15, 2008",
          "November 28, 2007"
        ],
        answer: "February 17, 2008",
        explanation: "The Newborn Monument was unveiled on February 17, 2008, the same day Kosovo officially declared independence from Serbia."
      },
      {
        stopName: "Bear Sanctuary Pristina",
        imageKeyword: "Bear Sanctuary Pristina",
        description: [
          "The Bear Sanctuary Pristina was established in 2013 by the Kosovo government and Four Paws to rescue brown bears kept in small cages as tourist attractions. It provides a permanent, dignified home for bears freed from decades of captivity.",
          "The facility spans 16 hectares of forested hillside with natural vegetation, swimming pools, and hibernation dens. A dedicated veterinary team rehabilitates bears suffering from malnutrition and trauma, helping them rediscover foraging and socializing.",
          "Visitors observe the 20-plus resident bears from elevated walkways through the forest enclosures. Educational programs teach wildlife conservation and animal welfare, and the sanctuary's success has inspired similar rescue projects across the Balkans."
        ],
        question: "Which international organization partnered with the Kosovo government to establish the Bear Sanctuary?",
        options: [
          "World Wildlife Fund",
          "Four Paws",
          "Greenpeace",
          "Born Free Foundation"
        ],
        answer: "Four Paws",
        explanation: "The Bear Sanctuary Pristina was established in 2013 through a partnership between the Kosovo government and the international animal welfare organization Four Paws."
      }
    ]
  },
  "Western Sahara": {
    tourTitle: "Where Desert Meets the Atlantic",
    introText: "The desert meets the Atlantic Ocean in this disputed territory. Kite surf on the flat waters of the Dakhla lagoon.",
    stops: [
      {
        stopName: "Dakhla Lagoon",
        imageKeyword: "Dakhla Lagoon",
        description: [
          "Dakhla Lagoon stretches 37 kilometers along the Atlantic coast, formed by a narrow peninsula extending southward. Its flat, shallow waters and steady trade winds make it one of the world's premier kitesurfing destinations, framed by Saharan dunes.",
          "The peninsula is barely a kilometer wide in places, with the open Atlantic on one side and the calm lagoon on the other. Over 300 days of sunshine and consistent 20-to-30-knot winds create ideal conditions year-round for international competitions.",
          "The shallow lagoon also serves as a fish nursery, attracting flamingos, herons, and migratory birds. Local Sahrawi fishermen work these waters with traditional wooden boats, blending centuries-old fishing culture with modern adventure tourism."
        ],
        question: "Approximately how long is the Dakhla Lagoon?",
        options: [
          "15 kilometers",
          "25 kilometers",
          "37 kilometers",
          "50 kilometers"
        ],
        answer: "37 kilometers",
        explanation: "Dakhla Lagoon is approximately 37 kilometers long, formed by a narrow peninsula that extends southward along the Atlantic coast, creating ideal conditions for kitesurfing and windsurfing."
      },
      {
        stopName: "Laayoune",
        imageKeyword: "Laayoune",
        description: [
          "Laayoune is Western Sahara's largest city, set along the dry Saguia el-Hamra riverbed about 25 kilometers from the coast. Originally a small Sahrawi settlement, it grew as the capital of Spanish Sahara, and colonial-era grid streets still mark the layout.",
          "The central Place du Mechouar is ringed by government buildings and caf\u00e9s. The vibrant souk sells Sahrawi textiles, silver jewelry, and dates. The Great Mosque dominates the skyline, while the Spanish-era Cathedral of St. Francis still stands nearby.",
          "Modern Laayoune blends Sahrawi nomadic heritage with new boulevards and housing developments. The Saguia el-Hamra riverbed floods briefly in rare winter rains, drawing flocks of birds to the arid landscape. The city is the gateway to the desert interior."
        ],
        question: "What river runs through Laayoune?",
        options: [
          "Draa River",
          "Saguia el-Hamra",
          "Senegal River",
          "Oued Noun"
        ],
        answer: "Saguia el-Hamra",
        explanation: "Laayoune is situated along the dry riverbed of the Saguia el-Hamra, which runs through the city and occasionally floods during rare winter rains."
      },
      {
        stopName: "White Dune",
        imageKeyword: "White Dune",
        description: [
          "The Dune Blanche is a massive pale sand formation on the Dakhla Peninsula where the Sahara meets the Atlantic. Its fine white sand contrasts dramatically against the deep blue ocean, making it one of Western Sahara's most photographed landmarks.",
          "Sandboarding has become popular here, with visitors hiking to the crest and sliding down the steep face at surprising speeds. At sunset the white sand transforms into shades of gold, pink, and amber, drawing kitesurfers from nearby lagoon camps.",
          "Atlantic winds constantly build the dune while waves erode its seaward face, keeping it in a shifting equilibrium. The area remains largely undeveloped, preserving the raw beauty of a landscape where desert and ocean collide head on."
        ],
        question: "What adventure sport has become popular on the White Dune?",
        options: [
          "Paragliding",
          "Dune buggy racing",
          "Sandboarding",
          "Camel trekking"
        ],
        answer: "Sandboarding",
        explanation: "Sandboarding has become a popular activity at the White Dune, where visitors hike to the top and slide down its steep face on boards, reaching surprising speeds on the smooth sand."
      },
      {
        stopName: "Boujdour Lighthouse",
        imageKeyword: "Boujdour Lighthouse",
        description: [
          "The Boujdour Lighthouse stands at Cape Bojador, which medieval Portuguese sailors called the Cape of Fear, believing sea monsters lurked beyond. In 1434, explorer Gil Eanes finally sailed past it, opening the route to West Africa and eventually India.",
          "The tall white tower guards one of the Atlantic's most treacherous stretches, plagued by strong currents, shallow reefs, and fog. The cold Canary Current brings nutrient-rich water that supports vast fish shoals, drawing industrial fleets worldwide.",
          "The small, wind-battered town of Boujdour sits where desert meets surf in a stark line of sand and gravel. For travelers driving between Laayoune and Dakhla, the lighthouse is a powerful landmark connecting the modern road to centuries of maritime history."
        ],
        question: "Which Portuguese explorer first sailed past Cape Bojador in 1434?",
        options: [
          "Vasco da Gama",
          "Gil Eanes",
          "Bartolomeu Dias",
          "Henry the Navigator"
        ],
        answer: "Gil Eanes",
        explanation: "Gil Eanes broke through the psychological barrier of Cape Bojador in 1434, disproving myths about unnavigable waters and opening the route for further European exploration of the African coast."
      },
      {
        stopName: "Barbas Cape (wildlife)",
        imageKeyword: "Barbas Cape (wildlife)",
        description: [
          "Cap Barbas is a remote Atlantic headland sheltering one of the last colonies of Mediterranean monk seals, among the world's most endangered marine mammals with fewer than 800 left. Rocky caves along the shore provide vital resting and breeding habitat.",
          "The cold Canary Current fuels an extraordinarily productive marine ecosystem offshore. Dolphins, sea turtles, and sharks patrol the waters, while cormorants, ospreys, and migratory birds nest on the cliffs and offshore islets above.",
          "Reaching Cap Barbas requires a long 4x4 drive along unpaved desert tracks from Dakhla. For wildlife enthusiasts willing to make the journey, it offers a rare encounter with a pristine marine wilderness that conservation efforts aim to protect."
        ],
        question: "What critically endangered marine mammal can be found at Cap Barbas?",
        options: [
          "Hawaiian monk seal",
          "Mediterranean monk seal",
          "Northern elephant seal",
          "Atlantic walrus"
        ],
        answer: "Mediterranean monk seal",
        explanation: "Cap Barbas is home to one of the last surviving colonies of Mediterranean monk seals, one of the most endangered marine mammals on Earth with a global population estimated at fewer than 800 individuals."
      }
    ]
  }
};
