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
          "Taipei 101 is a supertall skyscraper that rises 508 meters above the capital city of Taipei. Completed in 2004, it held the title of the world\'s tallest building until the Burj Khalifa surpassed it in 2010. The tower\'s design draws inspiration from traditional Chinese pagodas and bamboo stalks, with eight sections that symbolize prosperity and good fortune in East Asian culture. Its distinctive silhouette has become the most recognizable landmark on the entire island.",
          "Inside the tower, a massive tuned mass damper weighing 730 metric tons hangs between the 87th and 92nd floors. This golden sphere, one of the largest in the world, counteracts the swaying caused by typhoon winds and earthquakes that frequently affect the region. Visitors can ride one of the world\'s fastest elevators, which travels from the ground floor to the 89th-floor observatory in just 37 seconds. The observation deck offers sweeping panoramic views of Taipei\'s dense urban landscape and the surrounding mountains.",
          "The lower floors of Taipei 101 house a luxury shopping mall featuring international brands and gourmet restaurants. Every New Year\'s Eve, the tower becomes the centerpiece of a spectacular fireworks display that is broadcast around the world. The building has also earned LEED Platinum certification, making it one of the tallest and greenest skyscrapers on the planet."
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
          "Jiufen is a mountain village perched on the hillside overlooking the Pacific Ocean in northeastern Taiwan. During the late 19th century, it was a thriving gold mining town that attracted thousands of prospectors during the Japanese colonial era. When the mines closed in the 1970s, the village fell into quiet obscurity until it was rediscovered as a cultural and tourist destination in the 1980s. Today its narrow alleyways and steep staircases are lined with traditional teahouses, souvenir shops, and food stalls.",
          "The village\'s atmospheric lantern-lit streets and layered hillside architecture have drawn comparisons to the spirit world depicted in Japanese animated films. Visitors flock to the famous Jishan Street, a covered market alley where vendors sell local delicacies such as taro balls, fish ball soup, and grass jelly. The A-Mei Teahouse, with its ornate red lanterns and wooden balconies, offers a peaceful spot to sip oolong tea while gazing out over the misty coastline and the distant Keelung Islet.",
          "Jiufen\'s Gold Museum, located in the nearby district of Jinguashi, preserves the mining heritage of the region. One of its star exhibits is a 220-kilogram gold ingot that visitors are invited to touch for good luck. The surrounding trails wind through abandoned mine shafts and Japanese-era ruins, offering a fascinating blend of natural beauty and industrial history."
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
          "Taroko Gorge is a breathtaking marble canyon that cuts through the mountains of eastern Taiwan within Taroko National Park. Stretching nearly 19 kilometers in length, the gorge was carved over millions of years by the Liwu River as it eroded through layers of marble and granite. The sheer cliff walls rise hundreds of meters on either side of the river, with some sections so narrow that sunlight barely reaches the water below. It is one of the most visited natural attractions in all of East Asia.",
          "The Central Cross-Island Highway winds through the gorge, passing through tunnels hand-carved into the rock face. Several hiking trails branch off the main road, including the famous Shakadang Trail, which follows a turquoise river past indigenous Truku tribal settlements. The Swallow Grotto section features a marble walkway carved into the cliff face, where visitors walk alongside potholes and caves formed by centuries of water erosion. Shrine of the Eternal Spring, a red temple built over a waterfall, commemorates the workers who lost their lives constructing the highway.",
          "Taroko National Park is home to the indigenous Truku people, who have lived in the area for centuries. The park\'s diverse ecosystems range from subtropical forests at lower elevations to alpine meadows near the peaks. More than half of Taiwan\'s native plant species can be found within its boundaries, along with rare wildlife such as the Formosan black bear and the Mikado pheasant."
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
          "Sun Moon Lake is the largest body of freshwater in Taiwan, nestled in the lush mountains of Nantou County at an elevation of 748 meters. The lake gets its name from its distinctive shape: the eastern side is round like the sun, while the western side curves like a crescent moon. Lalu Island, a tiny landmass near the center of the lake, serves as the traditional dividing point between the two halves. The indigenous Thao people, one of Taiwan\'s smallest recognized indigenous groups, have lived along these shores for centuries and consider the island sacred.",
          "A paved cycling path circles the entire lake for about 30 kilometers, and it is frequently rated as one of the most scenic bike routes in the world. Visitors can also explore the lake by boat, stopping at temples, pagodas, and aboriginal villages along the way. The Wenwu Temple, dedicated to both Confucius and the warrior god Guan Yu, sits above the lake\'s northern shore and offers commanding views of the surrounding landscape. Each autumn, the lake hosts a famous swimming carnival where thousands of participants swim across its 3.3-kilometer width.",
          "The area around Sun Moon Lake produces some of Taiwan\'s finest Assam black tea, originally introduced by the Japanese during the colonial period. Tea plantations dot the hillsides, and visitors can tour the tea farms and sample freshly brewed varieties. The Xiangshan Visitor Center, designed by the acclaimed Japanese architect Norihiko Dan, blends seamlessly into the lakeside terrain with its curved wooden roof that mimics the surrounding hills."
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
          "Kenting National Park occupies the southernmost tip of Taiwan on the Hengchun Peninsula, where tropical forests meet coral reefs and white sand beaches. Established in 1984, it was Taiwan\'s first national park and remains one of the few places on the island where you can find a true tropical climate. The park covers both land and sea, protecting over 1,500 species of marine life in the waters off its coast. Its coral reefs are among the most biodiverse in the northern hemisphere, drawing scuba divers and marine biologists from around the world.",
          "The park\'s landscape is remarkably varied for its relatively small size. Visitors can explore uplifted coral limestone caves at Sheding Nature Park, walk through fields of wind-sculpted rock formations at Fengchuisha, or climb to the top of the Eluanbi Lighthouse, the most powerful lighthouse in all of East Asia. The Hengchun Old Town nearby preserves one of Taiwan\'s best-kept Qing Dynasty-era walled towns, with four original gates still standing. Every spring, Kenting becomes a key stopover for migratory raptors, and birdwatchers gather to witness thousands of grey-faced buzzards passing overhead.",
          "Kenting\'s beaches are a major draw for surfers, swimmers, and kiteboarders. Baisha Beach and South Bay Beach are popular swimming spots with calm turquoise waters, while Jialeshui on the east coast offers more rugged conditions for experienced surfers. The annual Kenting Music Festival, often compared to spring break celebrations, brings tens of thousands of young people to the coast for live performances and beachside parties."
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
          "Prizren is widely considered the cultural capital of Kosovo, a picturesque city nestled at the foot of the Sharr Mountains along the banks of the Bistrica River. The old town is a living tapestry of Ottoman-era architecture, with cobblestone streets winding past centuries-old mosques, churches, and hammams. The iconic Stone Bridge, built during the Ottoman period, spans the river at the heart of the city and has become one of Kosovo\'s most photographed landmarks. Above the rooftops, the ruins of Kalaja Fortress crown the hilltop and offer sweeping views of the entire valley.",
          "Prizren is home to the Sinan Pasha Mosque, an elegant 17th-century structure with a beautifully painted interior dome and a tranquil courtyard fountain. Just steps away stands the Church of Our Lady of Ljevi\u0161, a 14th-century Serbian Orthodox church whose remarkable medieval frescoes earned it UNESCO World Heritage status. This proximity of Islamic and Christian architecture within a few hundred meters reflects the city\'s long history of coexisting religious communities. The old bazaar district still hums with artisan workshops where coppersmiths, silversmiths, and filigree jewelers practice crafts passed down through generations.",
          "Every summer, Prizren hosts DokuFest, an internationally acclaimed documentary film festival that transforms the old town into an open-air cinema. Screenings take place in courtyards, gardens, and even on the hillside beneath the fortress walls. The festival draws filmmakers and audiences from across Europe and has helped establish Prizren as a vibrant hub of contemporary Balkan culture."
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
          "Rugova Canyon is one of the longest and deepest canyons in Europe, stretching approximately 25 kilometers through the Accursed Mountains near the city of Peja in western Kosovo. The canyon\'s limestone walls tower up to 1,000 meters above the Peja Bistrica River, creating a dramatic gorge that rivals more famous canyons on the continent. The road through the canyon passes through tunnels carved into the rock face and crosses bridges that span dizzying drops. In winter, massive icicles form along the cliff faces, transforming the gorge into an otherworldly frozen landscape.",
          "The canyon serves as a gateway to some of Kosovo\'s best outdoor adventures. Via ferrata climbing routes have been installed along the cliff faces, allowing visitors to scale the vertical walls with the aid of steel cables and iron rungs. Zip lines cross high above the river, and hiking trails lead to alpine meadows, glacial lakes, and traditional mountain villages where shepherds still tend their flocks in summer pastures. The Rugova area is also gaining recognition as a rock climbing destination, with hundreds of routes ranging from beginner to expert difficulty.",
          "At the entrance to the canyon sits the Patriarchate of Pe\u0107, a complex of four medieval Serbian Orthodox churches dating back to the 13th century. This monastery served as the seat of the Serbian Orthodox Church for centuries and contains some of the finest examples of medieval fresco painting in the Balkans. The complex is a UNESCO World Heritage Site and remains an active place of worship. The juxtaposition of this ancient spiritual site with the raw natural grandeur of the canyon beyond makes the journey from Peja an unforgettable experience."
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
          "Gra\u010danica Monastery is a masterpiece of medieval Serbian architecture, located in the town of Gra\u010danica just southeast of Pristina. Built in 1321 by Serbian King Stefan Milutin on the ruins of an earlier 6th-century basilica, the monastery is considered one of the finest examples of late Byzantine ecclesiastical design in the Balkans. Its exterior features a distinctive cascading arrangement of domes and arches that create a harmonious pyramidal silhouette. The building\'s cross-in-square plan and elegant proportions have been studied by architects and art historians for centuries.",
          "The interior of Gra\u010danica is adorned with an extraordinary cycle of frescoes that are among the most important surviving examples of Palaeologan-era Byzantine art. These vivid paintings depict biblical scenes, saints, and members of the Serbian royal family with remarkable detail and emotional expression. The fresco of the Dormition of the Virgin on the west wall is particularly celebrated for its compositional complexity and rich coloring. The monastery was inscribed as a UNESCO World Heritage Site in 2006 as part of the Medieval Monuments in Kosovo designation.",
          "Despite the turbulent history of the region, Gra\u010danica Monastery has remained an active place of worship for nearly 700 years. A small community of Serbian Orthodox nuns lives within the monastery complex and maintains the church and its grounds. The monastery grounds also contain a treasury of medieval manuscripts, icons, and liturgical objects that offer a window into the spiritual and artistic life of the medieval Balkans."
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
          "The Newborn Monument is a typographic sculpture in downtown Pristina that has become the most iconic symbol of Kosovo\'s independence. Unveiled on February 17, 2008, the very day Kosovo declared independence from Serbia, the monument consists of the word NEWBORN spelled out in massive steel letters, each standing over two meters tall. On that historic first day, citizens lined up to sign their names on the bright yellow letters in a spontaneous act of collective celebration. The monument sits on Ibrahim Rugova Boulevard, named after the late president who championed the peaceful independence movement.",
          "Every year on the anniversary of independence, the Newborn monument is completely repainted with a new design that reflects a theme relevant to Kosovo\'s ongoing development. Past designs have included national flags of countries that recognized Kosovo\'s sovereignty, imagery related to European Union aspirations, and patterns addressing social issues like gender equality and environmental awareness. The annual repainting has become a major public event, drawing crowds who gather to watch the new design revealed. Each iteration transforms the monument into a fresh piece of public art while preserving its core message of national rebirth.",
          "The area around the Newborn monument has developed into one of Pristina\'s most vibrant public spaces. Caf\u00e9s and bars line the surrounding streets, reflecting Kosovo\'s celebrated coffee culture where a simple macchiato can fuel hours of conversation. Pristina is one of the youngest capitals in Europe, both in terms of the average age of its population and the age of its statehood, and the energetic atmosphere around the monument captures that youthful spirit perfectly."
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
          "The Bear Sanctuary Pristina is a remarkable wildlife rescue center located in Mramor, just a short drive from the capital city. Established in 2013 through a partnership between the Kosovo government and the international animal welfare organization Four Paws, the sanctuary provides a permanent home for brown bears that were rescued from captivity. For decades, it was common practice in Kosovo and other parts of the Balkans for restaurants and private owners to keep bears in small cages as tourist attractions. The sanctuary was created to end this suffering and give these animals a dignified life.",
          "The facility spans approximately 16 hectares of forested hillside, providing the rescued bears with spacious enclosures that include natural vegetation, pools for swimming, and dens for hibernation. Many of the bears arrived at the sanctuary in poor health, suffering from malnutrition, dental problems, and psychological trauma from years of confinement. The dedicated veterinary and care team works to rehabilitate each bear, allowing them to rediscover natural behaviors like foraging, climbing, and socializing with other bears. As of recent counts, the sanctuary is home to more than 20 brown bears.",
          "The Bear Sanctuary has become one of Kosovo\'s most popular tourist attractions and serves as an important center for environmental education. Visitors can observe the bears from elevated walkways that wind through the forested enclosures without disturbing the animals. Educational programs teach school groups and tourists about wildlife conservation, animal welfare, and the ecological importance of brown bears in the Balkan ecosystem. The sanctuary\'s success has also inspired similar rescue projects in neighboring countries, helping to end the practice of bear captivity across the region."
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
          "Dakhla Lagoon is a stunning 37-kilometer-long body of water formed by a narrow peninsula that extends southward along the Atlantic coast of Western Sahara. The lagoon\'s remarkably flat, shallow waters and consistent trade winds have made it one of the premier kitesurfing and windsurfing destinations in the world. Professional riders and beginners alike are drawn to its warm, waist-deep waters where the sandy bottom provides a forgiving surface for falls. The lagoon sits at the edge of the Sahara Desert, creating a surreal landscape where golden sand dunes meet turquoise ocean water.",
          "The Dakhla Peninsula that shelters the lagoon is a narrow strip of land barely a kilometer wide in some places, with the open Atlantic crashing on one side and the calm lagoon on the other. The area experiences more than 300 days of sunshine per year and wind speeds that consistently range between 20 and 30 knots, making conditions ideal for wind sports almost year-round. International kitesurfing competitions are regularly held here, and the lagoon has hosted stages of world championship tours. Small eco-camps and surf lodges dot the peninsula, offering a rustic but comfortable base for water sports enthusiasts.",
          "Beyond its appeal to wind sports athletes, Dakhla Lagoon is an important ecological habitat. The shallow waters serve as a nursery for numerous fish species and attract large populations of flamingos, herons, and other migratory birds. Local Sahrawi fishermen have worked these waters for generations using traditional wooden boats, and the lagoon\'s rich fishing grounds supply fresh seafood to the town of Dakhla. The coexistence of traditional fishing culture and modern adventure tourism gives the lagoon a unique character found nowhere else on the African coast."
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
          "Laayoune is the largest city in Western Sahara, situated along the dry riverbed of the Saguia el-Hamra approximately 25 kilometers inland from the Atlantic coast. The city serves as the administrative center of the territory and is home to the majority of its urban population. Originally a small Sahrawi settlement, Laayoune grew significantly during the Spanish colonial period when it became the capital of Spanish Sahara in the mid-20th century. The Spanish influence is still visible in the city\'s grid-like street layout and some of its older colonial-era buildings.",
          "The heart of Laayoune is centered around the Place du Mechouar, a large public square surrounded by government buildings, shops, and caf\u00e9s. The city\'s main market, or souk, is a vibrant maze of stalls selling everything from traditional Sahrawi textiles and silver jewelry to spices, dates, and camel milk. The Great Mosque of Laayoune, with its tall minaret, dominates the city skyline and serves as a gathering point for the community. The Cathedral of St. Francis of Assisi, built during the Spanish colonial era, still stands as a reminder of the territory\'s complex history, though it no longer functions as an active church.",
          "Laayoune sits at the crossroads of Sahrawi nomadic culture and modern urban development. The city has undergone significant infrastructure investment in recent decades, with new housing developments, wide boulevards, and public amenities transforming its appearance. The Saguia el-Hamra riverbed, which runs through the city, floods briefly during rare winter rains, creating temporary pools that attract flocks of birds to the otherwise arid landscape. For travelers, Laayoune serves as the primary gateway to exploring Western Sahara\'s vast desert interior and Atlantic coastline."
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
          "The White Dune, known locally as the Dune Blanche, is a striking natural formation located on the Dakhla Peninsula where the Sahara Desert dramatically meets the Atlantic Ocean. This massive sand dune is composed of fine, pale sand that appears almost white under the intense North African sun, creating a stark and beautiful contrast against the deep blue ocean waters that lap at its base. The dune rises sharply from the shoreline, and its crest offers panoramic views of the lagoon on one side and the open Atlantic on the other. It has become one of the most iconic and photographed landscapes in all of Western Sahara.",
          "The White Dune is a popular destination for sandboarding, an activity that has grown alongside the region\'s kitesurfing culture. Visitors hike to the top of the dune and slide down its steep face on boards, reaching surprising speeds on the smooth, compact sand. The dune is also a favored spot for watching the sunset, when the low-angle light transforms the white sand into shades of gold, pink, and amber. Kitesurfers from the nearby lagoon camps often make the trek to the dune as part of their desert excursions, combining water sports with Saharan adventure.",
          "The geological processes that create and maintain the White Dune are shaped by the constant interplay of wind, ocean currents, and tidal action. Strong Atlantic winds carry fine sand grains inland, building up the dune over time, while wave action erodes its seaward face. This dynamic equilibrium means the dune is constantly shifting and reshaping itself, making each visit subtly different from the last. The area around the dune is largely undeveloped, preserving the raw, elemental beauty of a landscape where two of Earth\'s great forces, desert and ocean, meet head on."
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
          "The Boujdour Lighthouse stands on the windswept headland of Cape Bojador, a point on the Atlantic coast of Western Sahara that for centuries marked the edge of the known world for European navigators. Portuguese sailors in the Middle Ages called it the Cape of Fear, believing that the waters beyond were unnavigable and that sea monsters lurked in the boiling surf. It was not until 1434 that the Portuguese explorer Gil Eanes finally sailed past Cape Bojador, shattering the myth and opening the way for European exploration of the West African coast and eventually the route to India.",
          "The lighthouse itself is a tall, tapering white tower that rises above the flat, rocky coastline, serving as a navigational beacon for ships transiting one of the most treacherous stretches of the Atlantic seaboard. The surrounding waters are infamous for strong currents, shallow reefs, and persistent fog banks that have caused numerous shipwrecks over the centuries. The Canary Current sweeps southward along the coast here, bringing cold, nutrient-rich water that supports vast shoals of fish. This productivity has made the waters off Boujdour some of the richest fishing grounds in the world, attracting industrial fishing fleets from across the globe.",
          "The town of Boujdour itself is a small, wind-battered settlement where the desert meets the sea in a stark line of sand and surf. The landscape is raw and elemental, with flat gravel plains stretching inland and the relentless Atlantic pounding the shore. For travelers driving the coastal road between Laayoune and Dakhla, the lighthouse at Cape Bojador is a powerful landmark that connects the modern journey to centuries of maritime history and the age of exploration."
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
          "Cap Barbas, also known as Ras Nouadhibou in some maps, is a remote and windswept headland on the Atlantic coast of Western Sahara that serves as one of the most important wildlife habitats in northwest Africa. The cape and its surrounding waters are home to one of the last surviving colonies of Mediterranean monk seals, one of the most endangered marine mammals on Earth with a global population estimated at fewer than 800 individuals. The rocky shoreline provides sheltered caves and crevices where these rare seals haul out to rest and breed, far from human disturbance. The isolation of the cape has been crucial to the survival of this colony.",
          "The waters off Cap Barbas benefit from the cold Canary Current, which brings nutrient-rich water up from the deep ocean, supporting an extraordinarily productive marine ecosystem. Large schools of fish attract dolphins, sea turtles, and various species of sharks to the area. Overhead, colonies of seabirds including cormorants, ospreys, and Cory\'s shearwaters nest on the rocky cliffs and offshore islets. During migration seasons, the cape becomes a waypoint for birds traveling between Europe and sub-Saharan Africa, adding even more species to an already impressive avian roster.",
          "Reaching Cap Barbas requires a long drive along unpaved desert tracks from Dakhla, passing through a stark landscape of flat gravel plains and occasional sand formations. The journey itself is an adventure, often requiring a 4x4 vehicle and a knowledgeable local guide who understands the shifting desert terrain. For wildlife enthusiasts and adventurers willing to make the effort, Cap Barbas offers a rare and humbling encounter with a pristine marine wilderness that has remained largely unchanged for millennia. Conservation efforts in the region are working to ensure that this fragile ecosystem remains protected for future generations."
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
