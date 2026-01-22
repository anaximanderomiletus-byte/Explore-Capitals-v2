import { TourData } from "../../types";

export const toursU: Record<string, TourData> = {
  "Uganda": {
    tourTitle: "The Pearl of Africa",
    introText: "The source of the Nile River flows out of Lake Victoria. Trek into the impenetrable forest to find the mountain gorillas.",
    stops: [
      {
        stopName: "Bwindi Impenetrable National Park",
        imageKeyword: "Bwindi Gorillas",
        description: [
          "This ancient rainforest is home to almost half of the world's remaining Mountain Gorillas. The name \"Impenetrable\" refers to the dense thicket of bamboo, vines, and ferns that makes hiking here a grueling challenge.",
          "Tracking the gorillas involves hiking up steep, muddy slopes for hours. Once found, visitors are allowed exactly one hour to observe the family, watching the silverback manage the group and the infants play in the trees.",
          "The forest is a UNESCO World Heritage site. It survived the last Ice Age, making it one of the most biologically diverse forests in Africa, hosting 350 species of birds and 120 species of mammals."
        ],
        question: "Approximately what portion of the world's Mountain Gorilla population lives in Bwindi?",
        options: [
          "Almost half.",
          "One quarter.",
          "All of them.",
          "Ten percent."
        ],
        answer: "Almost half.",
        explanation: "The park is the single most important stronghold for this endangered species."
      },
      {
        stopName: "Murchison Falls",
        imageKeyword: "Murchison Falls",
        description: [
          "This is the world's most powerful waterfall. The entire Victoria Nile River creates a bottleneck, forcing itself through a gap in the rocks only 7 meters (23 feet) wide before plunging 43 meters down.",
          "The pressure is immense. The water hits the bottom with such force that the ground shakes, creating a permanent rainbow in the mist.",
          "Below the falls, the river is calm and filled with massive Nile crocodiles. It was the setting for the classic movie The African Queen starring Humphrey Bogart and Katharine Hepburn."
        ],
        question: "Through how wide a gap does the entire Nile River force itself at Murchison Falls?",
        options: [
          "7 meters (23 feet).",
          "50 meters.",
          "100 meters.",
          "1 meter."
        ],
        answer: "7 meters (23 feet).",
        explanation: "The immense volume of the river is compressed into this tiny chasm, creating extreme pressure."
      },
      {
        stopName: "Queen Elizabeth National Park",
        imageKeyword: "Ishasha Tree Lions",
        description: [
          "This park is famous for the tree-climbing lions of the Ishasha sector. It is one of only two places in the world (the other in Tanzania) where lions regularly climb trees to sleep.",
          "Theories vary on why they do this: some say it's to avoid the biting tsetse flies on the ground, while others say it's to catch a cool breeze and get a better view of potential prey.",
          "The park also features the Kazinga Channel. A boat cruise here offers one of the highest concentrations of hippos in the world, along with elephants and buffalo drinking at the water's edge."
        ],
        question: "Why is the Ishasha sector of Queen Elizabeth National Park famous?",
        options: [
          "Tree-climbing lions.",
          "Flying elephants.",
          "Swimming leopards.",
          "Singing birds."
        ],
        answer: "Tree-climbing lions.",
        explanation: "The local pride has developed the unique habit of resting high in fig tree branches."
      },
      {
        stopName: "Lake Victoria",
        imageKeyword: "Source of the Nile Jinja",
        description: [
          "Jinja is located on the shores of Lake Victoria, the largest lake in Africa. It is recognized as the source of the White Nile, the longest river in the world.",
          "British explorer John Hanning Speke was the first European to identify this spot as the source in 1858, solving one of the greatest geographical mysteries of the Victorian age.",
          "Today, Jinja is the \"Adventure Capital of East Africa.\" The rapids created by the Nile exiting the lake offer some of the wildest Grade 5 whitewater rafting in the world."
        ],
        question: "Which British explorer identified Jinja as the source of the Nile in 1858?",
        options: [
          "John Hanning Speke.",
          "David Livingstone.",
          "Henry Morton Stanley.",
          "Richard Burton."
        ],
        answer: "John Hanning Speke.",
        explanation: "He correctly identified the outlet of Lake Victoria as the beginning of the great river."
      },
      {
        stopName: "Rwenzori Mountains",
        imageKeyword: "Rwenzori Mountains",
        description: [
          "These mountains on the border with Congo are often identified as the legendary \"Mountains of the Moon\" described by ancient Greek geographers. They feature the third-highest peak in Africa (Mount Stanley).",
          "The vegetation is alien. Due to the unique high-altitude tropical climate, common plants grow to gigantic sizes; you can walk through forests of giant heathers and lobelias that tower over human heads.",
          "They have permanent glaciers. Despite being just miles from the Equator, the peaks are covered in snow and ice, though these glaciers are rapidly receding due to climate change."
        ],
        question: "What is the ancient nickname for the Rwenzori Mountains?",
        options: [
          "The Mountains of the Moon.",
          "The Pillars of Hercules.",
          "The Spine of the World.",
          "The Cloud Piercers."
        ],
        answer: "The Mountains of the Moon.",
        explanation: "Ancient geographers believed these snowy equatorial peaks were the source of the Nile."
      }
    ]
  },
  "Ukraine": {
    tourTitle: "The Breadbasket of Europe",
    introText: "Golden domes shine on the hills of Kyiv above the Dnipro River. Walk through the ghost town of Pripyat frozen in 1986.",
    stops: [
      {
        stopName: "Kyiv Pechersk Lavra",
        imageKeyword: "Kyiv Pechersk Lavra",
        description: [
          "Founded in 1051, this is the holiest Orthodox monastery in Ukraine. The complex is famous for its golden domes and underground cave system where mummified monks are buried.",
          "The caves (Lavra means 'monastery of the caves') are a labyrinth of narrow tunnels. Pilgrims walk through with candles to pray before the glass coffins of saints whose bodies have been naturally preserved by the cool, dry air.",
          "The Great Lavra Bell Tower is a masterpiece of architecture. Standing 96 meters tall, it dominated the city skyline for centuries and remains a symbol of Kyiv's spiritual endurance."
        ],
        question: "What is hidden in the underground caves of the Lavra?",
        options: [
          "Mummified monks/saints.",
          "Gold treasure.",
          "Ancient weapons.",
          "Secret libraries."
        ],
        answer: "Mummified monks/saints.",
        explanation: "The cool, stable environment of the caves naturally mummified the bodies of the ascetic monks buried there."
      },
      {
        stopName: "Chernobyl Exclusion Zone",
        imageKeyword: "Pripyat Ferris Wheel",
        description: [
          "This is the site of the world's worst nuclear disaster in 1986. The city of Pripyat was evacuated in hours, leaving behind a Soviet time capsule of schools, apartments, and playgrounds.",
          "The iconic yellow Ferris wheel in the amusement park never officially opened. It was scheduled to open on May 1st, just days after the disaster occurred, making it a haunting symbol of lost innocence.",
          "Nature has reclaimed the zone. Wolves, bears, and Przewalski's horses now roam the empty streets, proving that wildlife can thrive in the absence of humans, even with radiation."
        ],
        question: "The yellow Ferris wheel in Pripyat is famous because...",
        options: [
          "It never officially opened.",
          "It is the tallest in Europe.",
          "It is made of gold.",
          "It still spins on its own."
        ],
        answer: "It never officially opened.",
        explanation: "The disaster struck just days before the park's scheduled grand opening for the May Day holiday."
      },
      {
        stopName: "Lviv Old Town",
        imageKeyword: "Lviv Old Town",
        description: [
          "Lviv is the cultural capital of Ukraine, feeling more like Vienna or Prague than a Soviet city. The architecture is a blend of Polish, Austrian, and Armenian influences, reflecting its history as part of the Austro-Hungarian Empire.",
          "It is famous for its coffee culture. Legend says a local man, Yuri Kulczycki, opened the first coffee house in Vienna using beans left behind by the Turks; Lviv honors this with dozens of historic themed cafes.",
          "The city sits on the European Watershed. The roof of the Opera House divides the rain; water falling on one side flows to the Baltic Sea, and water on the other flows to the Black Sea."
        ],
        question: "The roof of the Lviv Opera House sits on which geographical line?",
        options: [
          "The European Watershed.",
          "The Equator.",
          "The Prime Meridian.",
          "The Iron Curtain."
        ],
        answer: "The European Watershed.",
        explanation: "It marks the divide between river systems flowing to the Baltic and the Black Sea."
      },
      {
        stopName: "Tunnel of Love",
        imageKeyword: "Tunnel of Love",
        description: [
          "Located near Klevan, this is a section of industrial railway track surrounded by green arches of trees. The passing trains have molded the trees into a perfect, leafy tunnel over many years.",
          "It stretches for about 4 kilometers. Local legend claims that if a couple walks through the tunnel and makes a wish, it will come true if their love is sincere.",
          "The tunnel changes with the seasons. It is lush green in summer, golden in autumn, and a snowy white vault in winter, making it a photographer's dream year-round."
        ],
        question: "How was the shape of the Tunnel of Love created?",
        options: [
          "By passing trains molding the trees.",
          "By gardeners with shears.",
          "It is a natural cave.",
          "It is artificial plastic."
        ],
        answer: "By passing trains molding the trees.",
        explanation: "The regular movement of the train broke off branches, naturally sculpting the forest into an arch."
      },
      {
        stopName: "Odesa",
        imageKeyword: "Potemkin Stairs",
        description: [
          "These giant stairs are the symbol of Odesa, the \"Pearl of the Black Sea.\" They were designed to create an optical illusion: the bottom steps are wider than the top ones, making the staircase look longer and grander when viewed from below.",
          "They were made famous by the movie Battleship Potemkin (1925). The scene of a baby carriage bouncing down the steps during a massacre is one of the most famous sequences in cinema history.",
          "At the top of the stairs stands the statue of the Duke de Richelieu. He was a French aristocrat who served as the governor of Odesa and transformed it from a village into a modern European city."
        ],
        question: "The Potemkin Stairs are designed to create what visual effect?",
        options: [
          "An optical illusion (making them look longer).",
          "A rainbow.",
          "They disappear at night.",
          "They look like a waterfall."
        ],
        answer: "An optical illusion (making them look longer).",
        explanation: "The flared width forces the perspective, enhancing the grandeur of the entrance to the city."
      }
    ]
  },
  "United Arab Emirates": {
    tourTitle: "The Future in the Desert",
    introText: "The Burj Khalifa pierces the sky as the tallest building ever made. Ski indoors while the desert sun beats down outside.",
    stops: [
      {
        stopName: "Burj Khalifa",
        imageKeyword: "Burj Khalifa",
        description: [
          "Standing at 828 meters (2,717 feet), this is the tallest building in the world. Its design is based on the Hymenocallis flower (Spider Lily), with three wings extending from a central core to provide stability against strong winds.",
          "The tip of the spire can be seen from 95 kilometers away. The building is so tall that people on the higher floors experience sunset a few minutes later than those on the ground, affecting prayer times during Ramadan.",
          "It holds numerous world records, including the highest outdoor observation deck and the elevator with the longest travel distance in the world."
        ],
        question: "The design of the Burj Khalifa is inspired by which flower?",
        options: [
          "The Spider Lily (Hymenocallis).",
          "The Rose.",
          "The Lotus.",
          "The Tulip."
        ],
        answer: "The Spider Lily (Hymenocallis).",
        explanation: "The Y-shaped floor plan mimics the petals of this desert flower to maximize views and stability."
      },
      {
        stopName: "Sheikh Zayed Grand Mosque",
        imageKeyword: "Sheikh Zayed Grand Mosque",
        description: [
          "This mosque in Abu Dhabi is a masterpiece of modern Islamic architecture. It features 82 domes and over 1,000 columns, all clad in pristine white marble imported from Macedonia.",
          "The main prayer hall houses the world's largest hand-knotted carpet. It measures 5,627 square meters and was made by 1,200 Iranian artisans using New Zealand wool and cotton.",
          "The seven crystal chandeliers are made by Swarovski. The largest one weighs 12 tons and glitters with millions of crystals, designed to look like an upturned palm tree."
        ],
        question: "The marble used to build the Sheikh Zayed Grand Mosque is primarily what color?",
        options: [
          "White.",
          "Black.",
          "Green.",
          "Gold."
        ],
        answer: "White.",
        explanation: "The late Sheikh Zayed chose white marble to symbolize peace and purity."
      },
      {
        stopName: "The Palm Jumeirah",
        imageKeyword: "The Palm Jumeirah",
        description: [
          "This artificial archipelago is one of the few man-made structures visible from space. It was created by reclaiming land from the sea using 94 million cubic meters of sand dredged from the Persian Gulf.",
          "To protect the island from waves, a crescent-shaped breakwater was built. It has gaps to allow seawater to circulate, preventing the water inside the palm fronds from becoming stagnant.",
          "It is home to the Atlantis Hotel. The resort features an underwater suite where the bedroom walls are actually aquarium glass looking into a tank filled with 65,000 marine animals."
        ],
        question: "What shape is the Palm Jumeirah designed to resemble?",
        options: [
          "A palm tree.",
          "A crescent moon.",
          "A star.",
          "A flower."
        ],
        answer: "A palm tree.",
        explanation: "It consists of a trunk and 16 fronds, maximizing beachfront property."
      },
      {
        stopName: "Louvre Abu Dhabi",
        imageKeyword: "Louvre Abu Dhabi",
        description: [
          "Located on Saadiyat Island, this museum is famous for its floating dome \"Rain of Light.\" The dome consists of 7,850 aluminum stars layered in a complex geometric pattern that filters sunlight to create dappled light like palm fronds.",
          "The museum is actually built on the sea. Visitors can take a kayak tour around the exterior walls or even under the museum itself, paddling through the modern canals.",
          "It is a \"universal museum.\" It displays art from all civilizations and eras side-by-side (e.g., a French painting next to a Japanese print) to show the shared human experience across history."
        ],
        question: "What effect does the dome of the Louvre Abu Dhabi create?",
        options: [
          "A \"Rain of Light.\"",
          "A total eclipse.",
          "A rainbow.",
          "A mirrored reflection."
        ],
        answer: "A \"Rain of Light.\"",
        explanation: "The layered stars filter the sun to create speckles of light on the floor, mimicking sunlight through palm trees."
      },
      {
        stopName: "Dubai Desert Conservation Reserve",
        imageKeyword: "Dubai Desert Conservation Reserve",
        description: [
          "This reserve covers 5% of Dubai's total land area and is dedicated to protecting the desert ecosystem. It was the site of a massive reintroduction program for the Arabian Oryx.",
          "The Arabian Oryx was hunted to extinction in the wild in the 1970s. Thanks to breeding programs here, the population has recovered, and they now roam freely across the dunes.",
          "Visitors usually explore via \"Dune Bashing.\" This involves driving 4x4 vehicles at high speeds over the shifting sand dunes, a thrilling roller-coaster ride in the desert."
        ],
        question: "Which animal, once extinct in the wild, was successfully reintroduced here?",
        options: [
          "The Arabian Oryx.",
          "The Bengal Tiger.",
          "The Black Rhino.",
          "The Desert Fox."
        ],
        answer: "The Arabian Oryx.",
        explanation: "This white antelope with long straight horns is the national animal of the UAE."
      }
    ]
  },
  "United Kingdom": {
    tourTitle: "The Island Kingdom",
    introText: "The clock tower of Big Ben rings out over the Houses of Parliament. Walk along the rugged coast of the Scottish Highlands.",
    stops: [
      {
        stopName: "Big Ben",
        imageKeyword: "Big Ben",
        description: [
          "\"Big Ben\" is actually the nickname of the Great Bell inside the tower, not the tower itself (which is named Elizabeth Tower). The bell weighs 13.7 tons and cracked shortly after installation, giving it its distinctive E-natural note.",
          "The clock is known for its extreme accuracy. It is regulated by a stack of old pennies placed on the pendulum; adding or removing a single penny changes the clock's speed by 0.4 seconds per day.",
          "The tower leans slightly. Due to tunnel construction for the London Underground over the years, the tower leans about 0.26 degrees to the northwest, though it is not yet visible to the naked eye like Pisa."
        ],
        question: "Technically, what does the name \"Big Ben\" refer to?",
        options: [
          "The Great Bell inside the tower.",
          "The clock face.",
          "The tower itself.",
          "The Parliament building."
        ],
        answer: "The Great Bell inside the tower.",
        explanation: "Tourists often call the whole tower Big Ben, but that name belongs specifically to the 13-ton bell."
      },
      {
        stopName: "Stonehenge",
        imageKeyword: "Stonehenge",
        description: [
          "This prehistoric monument was built in stages between 3000 and 2000 BC. It consists of a ring of standing stones, each around 4 meters high and weighing close to 25 tons.",
          "The \"Bluestones\" (the smaller stones in the inner circle) came from the Preseli Hills in Wales, over 240 kilometers (150 miles) away. How Neolithic people transported these massive rocks that distance without the wheel remains a mystery.",
          "It functions as a celestial calendar. The layout is perfectly aligned with the sunset of the winter solstice and the sunrise of the summer solstice, suggesting it was used for seasonal rituals."
        ],
        question: "The \"Bluestones\" of Stonehenge were transported from which country?",
        options: [
          "Wales.",
          "Scotland.",
          "Ireland.",
          "France."
        ],
        answer: "Wales.",
        explanation: "They were quarried in the Preseli Hills and moved 150 miles to the Salisbury Plain."
      },
      {
        stopName: "Edinburgh Castle",
        imageKeyword: "Edinburgh Castle",
        description: [
          "This fortress dominates the skyline of Edinburgh from its perch on Castle Rock, which is actually the plug of an extinct volcano that erupted 350 million years ago.",
          "It houses the \"Honours of Scotland\" (Crown Jewels). These are the oldest crown jewels in Britain. They were hidden in a chest and walled up during the Cromwellian wars to prevent the English from destroying them.",
          "The castle is the site of the \"One O'Clock Gun.\" Every day at exactly 1:00 PM (except Sundays), a cannon is fired from the ramparts. This was originally a time signal for ships in the harbor to set their maritime clocks."
        ],
        question: "Edinburgh Castle sits on top of what geological formation?",
        options: [
          "An extinct volcano (Castle Rock).",
          "A limestone cliff.",
          "A man-made hill.",
          "A glacier."
        ],
        answer: "An extinct volcano (Castle Rock).",
        explanation: "The hard volcanic basalt plug resisted erosion, creating the perfect defensive position."
      },
      {
        stopName: "Giant's Causeway",
        imageKeyword: "Giant's Causeway",
        description: [
          "This geological wonder consists of about 40,000 interlocking basalt columns, most of which are hexagonal (six-sided). They were formed 60 million years ago by cooling lava that cracked into regular geometric shapes.",
          "Legend says it was built by the giant Finn McCool. He built the causeway as a bridge to cross the sea to Scotland to fight a Scottish giant named Benandonner.",
          "Upon seeing that Benandonner was much bigger than him, Finn fled back to Ireland. His wife disguised him as a baby, and when the Scottish giant saw the size of the \"baby,\" he fled in terror, destroying the causeway behind him so the \"father\" couldn't follow."
        ],
        question: "According to legend, who built the Giant's Causeway?",
        options: [
          "The giant Finn McCool.",
          "St. Patrick.",
          "The King of Ireland.",
          "A dragon."
        ],
        answer: "The giant Finn McCool.",
        explanation: "Myths say he built it as a bridge to reach Scotland to fight a rival giant."
      },
      {
        stopName: "The Lake District",
        imageKeyword: "The Lake District",
        description: [
          "This National Park in Northwest England is famous for its ribbon lakes and rugged fells. It inspired the \"Lake Poets\" (Wordsworth, Coleridge) and the Romantic movement in the 19th century.",
          "It was the home of Beatrix Potter. The author of The Tale of Peter Rabbit bought huge tracts of land here to save them from development and bequeathed them to the National Trust upon her death, preserving the landscape forever.",
          "It contains Scafell Pike, the highest mountain in England (978 meters). While not high by global standards, the rocky terrain makes it a serious challenge for hikers."
        ],
        question: "Which children's author helped preserve the Lake District by buying land?",
        options: [
          "Beatrix Potter.",
          "J.K. Rowling.",
          "Roald Dahl.",
          "Enid Blyton."
        ],
        answer: "Beatrix Potter.",
        explanation: "She used her royalties to buy farms and land, donating 4,000 acres to the National Trust."
      }
    ]
  },
  "United States": {
    tourTitle: "The Land of the Free",
    introText: "The Grand Canyon reveals billions of years of geology in its red walls. Drive down the Pacific Coast Highway for stunning ocean views.",
    stops: [
      {
        stopName: "The Grand Canyon",
        imageKeyword: "The Grand Canyon",
        description: [
          "Carved by the Colorado River over 6 million years, this canyon is 277 miles long and over a mile deep. It exposes nearly 2 billion years of Earth's geological history in the layers of its walls.",
          "The canyon creates its own weather. Because of the drastic elevation change, the temperature at the river bottom can be 30°F hotter than at the rim, supporting completely different ecosystems.",
          "It features the Skywalk. Owned by the Hualapai Tribe, this is a horseshoe-shaped glass bridge that extends 70 feet out over the canyon rim, allowing visitors to look straight down 4,000 feet to the canyon floor."
        ],
        question: "Which river is responsible for carving the Grand Canyon?",
        options: [
          "The Colorado River.",
          "The Mississippi River.",
          "The Rio Grande.",
          "The Amazon River."
        ],
        answer: "The Colorado River.",
        explanation: "The river's flow over millions of years eroded the rock layers to create the gorge."
      },
      {
        stopName: "Statue of Liberty",
        imageKeyword: "Statue of Liberty",
        description: [
          "A gift from France in 1886, this copper statue was designed by Frédéric Auguste Bartholdi, with the internal metal framework engineered by Gustave Eiffel (who built the Eiffel Tower).",
          "She wasn't always green. The statue is made of copper (like a penny), so she was originally a shiny brownish-orange color. Decades of weathering oxidized the copper, creating the green patina that protects the metal from corrosion.",
          "At her feet lie broken chains. These shackles, often overlooked by tourists because they are hard to see from the ground, symbolize the abolition of slavery and freedom from oppression."
        ],
        question: "Why is the Statue of Liberty green?",
        options: [
          "Oxidation of the copper (patina).",
          "It was painted green.",
          "Mold growth.",
          "Reflection of the sea."
        ],
        answer: "Oxidation of the copper (patina).",
        explanation: "Weathering turned the original brown copper to green, forming a protective layer."
      },
      {
        stopName: "Yellowstone National Park",
        imageKeyword: "Yellowstone National Park",
        description: [
          "Established in 1872, this was the first national park in the world. It sits on top of a dormant supervolcano, which powers the park's 10,000 geothermal features—half of the world's geysers are located here.",
          "Old Faithful is the most famous geyser. It isn't the biggest, but it is remarkably predictable, erupting boiling water approximately every 90 minutes, allowing rangers to predict the show for tourists.",
          "The Grand Prismatic Spring is the largest hot spring in the US. Its vivid rainbow colors (red, orange, yellow, green) are created by heat-loving bacteria living in the water; the color changes depending on the temperature of the water rings."
        ],
        question: "Yellowstone sits on top of what massive geological feature?",
        options: [
          "A supervolcano (caldera).",
          "A massive oil field.",
          "A giant underground lake.",
          "A fault line."
        ],
        answer: "A supervolcano (caldera).",
        explanation: "A massive magma chamber beneath the park fuels the geysers and hot springs."
      },
      {
        stopName: "Golden Gate Bridge",
        imageKeyword: "Golden Gate Bridge",
        description: [
          "Spanning the strait between San Francisco and Marin County, this is one of the most photographed bridges in the world. When it opened in 1937, it was both the longest and the tallest suspension bridge on Earth.",
          "The color is called \"International Orange.\" The US Navy originally wanted the bridge painted in black and yellow stripes to make it visible to ships in the fog, but the architect insisted on orange because it complemented the natural surroundings and improved visibility.",
          "It is designed to be flexible. The bridge deck can swing 27 feet side-to-side to withstand high winds and earthquakes without snapping."
        ],
        question: "What is the official name of the color of the Golden Gate Bridge?",
        options: [
          "International Orange.",
          "Sunset Red.",
          "Safety Yellow.",
          "Rust Brown."
        ],
        answer: "International Orange.",
        explanation: "This specific reddish-orange hue was chosen for visibility in the fog and aesthetic appeal."
      },
      {
        stopName: "Kennedy Space Center",
        imageKeyword: "Kennedy Space Center",
        description: [
          "Located on Merritt Island, Florida, this has been the launch site for every US human space flight since 1968, including the Apollo moon missions and the Space Shuttle program.",
          "The Vehicle Assembly Building (VAB) is one of the largest buildings in the world by volume. It is so huge that rain clouds can reportedly form near the ceiling inside the building on very humid days.",
          "It houses a real Saturn V rocket. This massive 363-foot rocket was the machine that took humans to the moon; seeing it in person reveals the sheer scale of the engineering required to escape Earth's gravity."
        ],
        question: "What weather phenomenon can reportedly occur inside the massive Vehicle Assembly Building?",
        options: [
          "Rain clouds forming near the ceiling.",
          "Tornadoes.",
          "Snow.",
          "Lightning."
        ],
        answer: "Rain clouds forming near the ceiling.",
        explanation: "The immense volume and humidity can create its own internal weather system."
      }
    ]
  },
  "Uruguay": {
    tourTitle: "The Switzerland of South America",
    introText: "The sculpture of a giant hand rises from the sand at Punta del Este. Grill steak on a traditional parilla with the locals.",
    stops: [
      {
        stopName: "La Mano",
        imageKeyword: "The Hand Punta del Este",
        description: [
          "Located on Brava Beach in Punta del Este, this sculpture depicts five concrete fingers rising from the sand. It was created by Chilean artist Mario Irarrázabal in 1982.",
          "The artist intended it as a warning to swimmers. The waters at this specific beach are rough and dangerous, so the hand represents a drowning swimmer reaching up for help—a \"Monument to the Drowned.\"",
          "It was built in just six days. Using steel bars covered in mesh and concrete, the artist rushed to finish it for a summer art competition, and it became the most iconic landmark in the country."
        ],
        question: "What does the sculpture \"La Mano\" symbolize?",
        options: [
          "A drowning swimmer (warning about rough water).",
          "A greeting to visitors.",
          "The hand of a giant.",
          "Victory in sports."
        ],
        answer: "A drowning swimmer (warning about rough water).",
        explanation: "It signifies the danger of the strong currents at that particular beach."
      },
      {
        stopName: "Casapueblo",
        imageKeyword: "Casapueblo",
        description: [
          "This surreal building was the home and workshop of Uruguayan artist Carlos Páez Vilaró. It was built entirely by hand over 36 years without any architectural plans.",
          "The design is inspired by the mud nests of the local Hornero birds (Ovenbirds). It has no straight lines or right angles inside; everything is curved and organic, sculpted from cement and whitewash.",
          "Every evening, a \"Ceremony to the Sun\" is held. As the sun sets over the ocean, a recording of the artist reciting a poem to the sun is played over loudspeakers, a ritual that has continued for decades."
        ],
        question: "The architecture of Casapueblo was inspired by the nests of which bird?",
        options: [
          "The Hornero (Ovenbird).",
          "The Albatross.",
          "The Pelican.",
          "The Swallow."
        ],
        answer: "The Hornero (Ovenbird).",
        explanation: "The mud nests of these birds inspired the organic, hand-sculpted shapes of the building."
      },
      {
        stopName: "Colonia del Sacramento",
        imageKeyword: "Colonia del Sacramento",
        description: [
          "Founded in 1680, this UNESCO World Heritage site is the oldest town in Uruguay. It changed hands between Spain and Portugal constantly, resulting in a unique mix of architectural styles not seen elsewhere in South America.",
          "The \"Street of Sighs\" (Calle de los Suspiros) is the most famous spot. It is a narrow, cobblestone alley lined with rustic colonial houses that looks exactly as it did 300 years ago.",
          "The town is a graveyard for vintage cars. You will see 1950s cars parked on the streets, often overgrown with flowers or used as planters, adding to the nostalgic, time-capsule atmosphere."
        ],
        question: "Colonia del Sacramento is famous for blending the colonial styles of which two nations?",
        options: [
          "Spain and Portugal.",
          "France and Britain.",
          "Germany and Italy.",
          "Holland and Spain."
        ],
        answer: "Spain and Portugal.",
        explanation: "The city was fought over for centuries, resulting in a fusion of both architectural traditions."
      },
      {
        stopName: "Cabo Polonio",
        imageKeyword: "Cabo Polonio",
        description: [
          "This remote village is located inside a national park and is famous for being \"off the grid.\" There is no electricity or running water in the majority of the houses, and no roads lead there—you must take a 4x4 truck across the sand dunes to arrive.",
          "It is home to a massive colony of Sea Lions. Thousands of them live on the rocks beneath the lighthouse; their barking can be heard throughout the village day and night.",
          "At night, the lack of electricity makes it one of the darkest places on the coast. The sky is incredibly clear for stargazing, and the ocean often glows with bioluminescent plankton."
        ],
        question: "What modern utility is missing from most houses in Cabo Polonio?",
        options: [
          "Electricity.",
          "Internet.",
          "Mobile phones.",
          "Solar panels."
        ],
        answer: "Electricity.",
        explanation: "The village is intentionally kept off-grid to preserve its remote, natural character."
      },
      {
        stopName: "Estadio Centenario",
        imageKeyword: "Estadio Centenario",
        description: [
          "Built in 1930, this stadium is a holy site for football (soccer) fans. It was built specifically to host the very first FIFA World Cup.",
          "Uruguay won that first World Cup, defeating Argentina in the final. The stadium was declared a \"Historical Monument of World Football\" by FIFA, the only building in the world to hold this title.",
          "It was built in record time. Immigrant workers constructed the massive concrete bowl in just 9 months, working around the clock to have it ready for the tournament kickoff."
        ],
        question: "Estadio Centenario was built to host which major event in 1930?",
        options: [
          "The first FIFA World Cup.",
          "The Olympics.",
          "The Pan American Games.",
          "The Copa America."
        ],
        answer: "The first FIFA World Cup.",
        explanation: "It was the venue for the inaugural tournament, which Uruguay won on home soil."
      }
    ]
  },
  "Uzbekistan": {
    tourTitle: "The Pearl of the Silk Road",
    introText: "The Registan Square is framed by three massive madrasas covered in blue tile. Travel the ancient Silk Road cities of Samarkand and Bukhara.",
    stops: [
      {
        stopName: "Registan Square",
        imageKeyword: "The Registan",
        description: [
          "This public square is the heart of the ancient Silk Road. It is framed by three majestic madrasas (Islamic schools)—Ulugh Beg, Sher-Dor, and Tilya-Kori—covered in intricate blue and turquoise mosaics.",
          "The Sher-Dor Madrasa is famous for its \"heretical\" art. The facade depicts two tigers hunting deer with human sun-faces rising from their backs, violating the Islamic prohibition against depicting living beings on religious buildings.",
          "The Tilya-Kori Madrasa (\"Gilded Madrasa\") features a mosque with a flat ceiling that is an optical illusion. The paintwork is designed to look like a high dome, but the ceiling is actually completely flat."
        ],
        question: "What animal is famously depicted on the facade of the Sher-Dor Madrasa?",
        options: [
          "Tigers (hunting deer).",
          "Lions.",
          "Dragons.",
          "Peacocks."
        ],
        answer: "Tigers (hunting deer).",
        explanation: "The depiction of tigers carrying human-faced suns is a unique feature of this Silk Road architecture."
      },
      {
        stopName: "Bukhara",
        imageKeyword: "Kalyan Minaret",
        description: [
          "Standing 45 meters tall, the Kalyan Minaret was built in 1127. It is one of the few structures that Genghis Khan did not destroy. Legend says he was so impressed by its height that his hat fell off when he looked up; as he bent to pick it up, he bowed to the tower and ordered it spared.",
          "It is nicknamed the \"Tower of Death.\" For centuries, criminals were executed by being thrown from the top of the tower in a sack.",
          "The brickwork is a masterpiece. Without using any colored tiles, the builders created 14 distinct bands of geometric patterns solely by arranging the bricks in different ways."
        ],
        question: "Why is the Kalyan Minaret nicknamed the \"Tower of Death\"?",
        options: [
          "Criminals were executed by being thrown from the top.",
          "It collapsed and killed people.",
          "It was a prison.",
          "It was built by slaves."
        ],
        answer: "Criminals were executed by being thrown from the top.",
        explanation: "It served as a site for public execution for centuries until the early 1900s."
      },
      {
        stopName: "The Aral Sea",
        imageKeyword: "Aral Sea Ship Graveyard",
        description: [
          "Once the fourth-largest lake in the world, the Aral Sea has shrunk by over 90% since the 1960s because Soviet irrigation projects diverted the rivers that fed it to grow cotton.",
          "The town of Moynaq, once a busy fishing port, is now 150 kilometers from the water. The \"Ship Graveyard\" features a fleet of rusted fishing trawlers stranded in the sand, a haunting monument to one of the world's worst environmental disasters.",
          "The seabed is now a toxic desert called the \"Aralkum.\" The dust storms here carry salt and pesticides left behind by the dried sea, causing health problems for the local population."
        ],
        question: "What crop caused the drying up of the Aral Sea?",
        options: [
          "Cotton.",
          "Wheat.",
          "Rice.",
          "Corn."
        ],
        answer: "Cotton.",
        explanation: "Soviet planners diverted the rivers to irrigate massive cotton fields in the desert."
      },
      {
        stopName: "Khiva",
        imageKeyword: "Itchan Kala",
        description: [
          "Khiva is a perfectly preserved open-air museum city. The inner town, Itchan Kala, is surrounded by massive crenellated mud walls that look like a giant sandcastle.",
          "It houses the Kalta Minor Minaret. This was intended to be the tallest minaret in the Islamic world, but the Khan died before it was finished. It remains a stunning, fat, blue-tiled stump that is fully covered in glazed tiles.",
          "Historically, Khiva was a notorious slave market. It was the last stop for caravans before crossing the desert to Persia, and for centuries it was a feared hub of the Central Asian slave trade."
        ],
        question: "Why is the Kalta Minor Minaret in Khiva short and stout?",
        options: [
          "It was never finished (The ruler died).",
          "It sank into the sand.",
          "It was destroyed by lightning.",
          "It was designed that way."
        ],
        answer: "It was never finished (The ruler died).",
        explanation: "Construction stopped after the death of the Khan, leaving a massive, beautifully tiled base."
      },
      {
        stopName: "Shah-i-Zinda",
        imageKeyword: "Shah-i-Zinda",
        description: [
          "This necropolis (city of the dead) is a street of mausoleums where female royalty and nobility of the Timurid dynasty are buried.",
          "It is a masterclass in tilework. The facades display every type of ceramic art used in the region: carved majolica, terracotta, and glazed mosaic, all in vivid shades of turquoise, sapphire, and royal blue.",
          "The name means \"The Living King.\" It refers to a legend about a cousin of the Prophet Muhammad who is said to have been beheaded here but picked up his head and went into a deep well, where he still lives today."
        ],
        question: "What does the name \"Shah-i-Zinda\" translate to?",
        options: [
          "The Living King.",
          "The Blue City.",
          "The Gate of Heaven.",
          "The Silent Street."
        ],
        answer: "The Living King.",
        explanation: "It refers to the legend of Kusam ibn Abbas, who is believed to be alive in the underground well."
      }
    ]
  }
};