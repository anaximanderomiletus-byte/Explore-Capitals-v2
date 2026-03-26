import { TourData } from "../../types";

export const toursJ: Record<string, TourData> = {
  "Jamaica": {
    tourTitle: "The Heart of the Caribbean",
    introText: "The Blue Mountains produce some of the most expensive coffee in the world. Feel the bass of the reggae beat on a white sand beach.",
    stops: [
      {
        stopName: "Dunn's River Falls",
        imageKeyword: "Dunn's River Falls",
        description: [
          "This is one of the few waterfalls in the world that empties directly into the ocean. The water cascades down giant limestone steps for 180 meters (600 feet), creating a natural staircase that visitors can climb.",
          "The rocks are covered in travertine deposits. The river water is rich in calcium carbonate, which constantly precipitates onto the rocks, essentially rebuilding the waterfall as the water flows over it.",
          "It is a popular group activity to climb the falls in a human chain. Guides lead visitors hand-in-hand up the rushing water, stopping to slide into the natural pools and massage their backs under the falling water."
        ],
        question: "What geological material constantly rebuilds the steps of the waterfall?",
        options: [
          "Calcium carbonate (Travertine).",
          "Volcanic ash.",
          "Coral reef.",
          "Granite."
        ],
        answer: "Calcium carbonate (Travertine).",
        explanation: "Minerals in the water harden on the rocks, regenerating the dome-shaped steps."
      },
      {
        stopName: "Blue Mountains",
        imageKeyword: "Blue Mountains",
        description: [
          "Rising to 2,256 meters (7,402 feet), this mountain range dominates the eastern part of the island. The high altitude, rich volcanic soil, and constant cloud cover create the perfect conditions for growing the world-famous Blue Mountain Coffee.",
          "To be certified as authentic \"Blue Mountain Coffee,\" the beans must be grown at elevations between 3,000 and 5,500 feet. The cool mist slows down the maturation of the coffee cherries, allowing the flavor to develop more complexity and sweetness.",
          "The peak is accessible by a hiking trail that is usually tackled at night. Hikers start around midnight to reach the summit by sunrise, where, on a clear morning, you can see the outline of Cuba in the distance."
        ],
        question: "Why does the mist of the Blue Mountains improve the coffee quality?",
        options: [
          "It slows down the maturation of the beans.",
          "It waters the plants automatically.",
          "It keeps pests away.",
          "It adds salt to the soil."
        ],
        answer: "It slows down the maturation of the beans.",
        explanation: "The slower growth period allows the coffee cherries to develop a richer, fuller flavor profile."
      },
      {
        stopName: "Bob Marley Museum",
        imageKeyword: "Bob Marley Museum",
        description: [
          "Located in Kingston at 56 Hope Road, this was the home and recording studio of the legendary reggae singer Bob Marley. It has been preserved just as it was when he lived there, including his personal recording studio and bedroom.",
          "The walls still bear the bullet holes from the 1976 assassination attempt on Marley's life. He survived the shooting and famously performed a free concert for peace two days later, refusing to be intimidated.",
          "The museum is a pilgrimage site for music lovers. It houses his favorite denim shirt, his guitar, and the \"shotgun\" pipe he used, offering an intimate look at the life of the man who brought Rastafarian culture to the world."
        ],
        question: "What visible damage from 1976 is still preserved on the walls of the museum?",
        options: [
          "Bullet holes.",
          "Fire damage.",
          "Graffiti.",
          "Water damage."
        ],
        answer: "Bullet holes.",
        explanation: "The marks from the failed assassination attempt on Bob Marley have been left as a part of history."
      },
      {
        stopName: "Rick's Café",
        imageKeyword: "Rick's Café",
        description: [
          "Perched on the West End cliffs of Negril, this bar is famous for one thing: cliff diving. Brave tourists and professional locals jump from platforms ranging from 10 to 35 feet high into the crystal-clear Caribbean Sea below.",
          "It is widely considered one of the best places in the world to watch the sunset. Crowds gather every evening to watch the sun dip below the horizon while divers silhouette themselves against the orange sky.",
          "The cliffs here are made of white limestone. Unlike the sandy beaches of the north, the coastline here is rugged and rocky, offering deep water right at the edge that is perfect for snorkeling and diving."
        ],
        question: "Rick's Café is world-famous for what adrenaline activity?",
        options: [
          "Cliff diving.",
          "Bungee jumping.",
          "Shark cage diving.",
          "Zip-lining."
        ],
        answer: "Cliff diving.",
        explanation: "Visitors jump from high rock platforms directly into the ocean."
      },
      {
        stopName: "Rose Hall Great House",
        imageKeyword: "Rose Hall Great House",
        description: [
          "This 18th-century plantation house near Montego Bay is the most famous \"Great House\" in Jamaica. It is renowned for the legend of Annie Palmer, the \"White Witch of Rose Hall,\" who allegedly murdered her three husbands and countless enslaved workers.",
          "The house has been restored to its former glory, featuring mahogany floors, silk wallpaper, and chandeliers. However, the basement retains a darker atmosphere, serving as a reminder of the brutal slavery that powered the sugar plantation economy.",
          "Night tours are popular here, leaning into the haunted reputation. Guides tell spooky stories of the White Witch's ghost, who is said to still roam the corridors wearing a green velvet riding habit."
        ],
        question: "Who is the legendary figure said to haunt Rose Hall?",
        options: [
          "Annie Palmer (The White Witch).",
          "Captain Morgan.",
          "Queen Nanny.",
          "The Grey Lady."
        ],
        answer: "Annie Palmer (The White Witch).",
        explanation: "Folklore claims she was a cruel mistress who used voodoo and murdered her spouses."
      }
    ]
  },
  "Japan": {
    tourTitle: "The Land of the Rising Sun",
    introText: "The perfect cone of Mount Fuji reflects in the quiet lake waters. Ride the bullet train through a neon city that never sleeps.",
    stops: [
      {
        stopName: "Mount Fuji",
        imageKeyword: "Mount Fuji",
        description: [
          "Rising to 3,776 meters (12,388 feet), this active stratovolcano is the single most famous symbol of Japan. It is considered one of Japan's three \"Holy Mountains,\" and for centuries, Shinto pilgrims climbed its slopes to worship the spirits (kami) believed to reside there.",
          "The mountain is notoriously shy. Due to its height and proximity to the sea, it is often shrouded in clouds; there are only about 80 days a year when the peak is clearly visible from Tokyo.",
          "Surrounding the northern base is the Aokigahara Forest. Known as the \"Sea of Trees,\" it grows on hardened lava that absorbs sound, making the forest incredibly quiet and easy to get lost in due to the magnetic lava affecting compasses."
        ],
        question: "Why is it often difficult for tourists to see Mount Fuji?",
        options: [
          "It is frequently covered by clouds.",
          "It is only open in winter.",
          "It is too far away.",
          "It is underground."
        ],
        answer: "It is frequently covered by clouds.",
        explanation: "Weather patterns hide the peak for the majority of the year."
      },
      {
        stopName: "Shibuya Crossing",
        imageKeyword: "Shibuya Crossing",
        description: [
          "This is the busiest pedestrian crossing in the world. When the traffic lights turn red, vehicles in all directions stop, and up to 3,000 people flood the intersection from every side, known as \"The Scramble.\"",
          "Overlooking the crossing is the statue of Hachikō. This loyal Akita dog famously waited at Shibuya Station for his owner to return from work every day for nine years after his owner had died, becoming a national symbol of loyalty.",
          "The surrounding area is the center of Japanese youth culture and fashion. The massive video screens mounted on the buildings pulse with advertisements and music videos, bathing the street in a perpetual, futuristic neon glow."
        ],
        question: "Who is the famous statue at Shibuya Station dedicated to?",
        options: [
          "Hachikō (a loyal dog).",
          "The Emperor.",
          "A samurai warrior.",
          "Godzilla."
        ],
        answer: "Hachikō (a loyal dog).",
        explanation: "The dog is honored for waiting for his deceased master at the station every day for nearly a decade."
      },
      {
        stopName: "Fushimi Inari Shrine",
        imageKeyword: "Fushimi Inari Shrine",
        description: [
          "This Shinto shrine is famous for its Senbon Torii (\"Thousands of Torii Gates\"). Over 10,000 bright vermilion gates straddle a network of trails leading up the wooded mountain, creating a seemingly infinite orange tunnel.",
          "Each gate has been donated by a Japanese business or individual. Their names are inscribed in black kanji on the back of the gates, hoping for prosperity and success from Inari, the god of rice and commerce.",
          "The shrine is filled with stone fox statues. Foxes (kitsune) are believed to be the messengers of Inari, and you will often see them holding a key or a scroll in their mouths, representing the key to the rice granary or wisdom."
        ],
        question: "Who donates the thousands of orange gates at Fushimi Inari?",
        options: [
          "Businesses and individuals.",
          "The government.",
          "Monks only.",
          "Tourists."
        ],
        answer: "Businesses and individuals.",
        explanation: "Companies purchase the gates as offerings to pray for financial success and prosperity."
      },
      {
        stopName: "Hiroshima Peace Memorial",
        imageKeyword: "Hiroshima Peace Memorial",
        description: [
          "This skeletal ruin is the only structure left standing near the hypocenter of the first atomic bomb explosion on August 6, 1945. Before the war, it was a bustling exhibition hall; today, it is preserved in exactly the same state as it was immediately after the blast.",
          "It stands as a stark reminder of the destructive power of nuclear weapons. While the rest of the city has been rebuilt into a modern metropolis, the dome remains a ghost, symbolizing a plea for world peace and the elimination of nuclear arms.",
          "The nearby Children's Peace Monument is always draped in thousands of colorful paper cranes. They are folded by children around the world in honor of Sadako Sasaki, a young girl who tried to fold 1,000 cranes to cure her radiation sickness."
        ],
        question: "Why was the Genbaku Dome preserved as a ruin?",
        options: [
          "To serve as a memorial and warning against nuclear war.",
          "They couldn't afford to fix it.",
          "It is haunted.",
          "To study radiation."
        ],
        answer: "To serve as a memorial and warning against nuclear war.",
        explanation: "It remains as a visual testament to the devastation caused by the atomic bomb."
      },
      {
        stopName: "Himeji Castle",
        imageKeyword: "Himeji Castle",
        description: [
          "Known as the \"White Heron Castle\" because of its brilliant white exterior and shape that resembles a bird taking flight, this is the finest surviving example of Japanese castle architecture. Unlike many other castles, it survived World War II bombings and earthquakes intact.",
          "The castle is a defensive masterpiece. It features a maze-like path to the main keep, designed to confuse invaders. The path spirals around, forcing attackers to turn their backs to the defenders in the towers, making them easy targets.",
          "The walls are covered in white plaster made from lime, shell ash, and hemp fiber. This wasn't just for decoration; the plaster was fire-resistant, protecting the wooden structure from fire arrows during sieges."
        ],
        question: "What is the nickname of Himeji Castle?",
        options: [
          "The White Heron Castle.",
          "The Black Crow Castle.",
          "The Golden Palace.",
          "The Dragon Keep."
        ],
        answer: "The White Heron Castle.",
        explanation: "Its white plaster walls and elegant roof lines resemble a white heron bird in flight."
      }
    ]
  },
  "Jordan": {
    tourTitle: "The Jewel of the Desert",
    introText: "The Treasury of Petra is carved directly into the sheer rose-red rock. Camp under the Milky Way in the red sands of Wadi Rum.",
    stops: [
      {
        stopName: "Petra",
        imageKeyword: "Petra Treasury",
        description: [
          "Known as the \"Rose City,\" Petra was the capital of the Nabataean Kingdom in the 1st century BC. The most famous structure, Al-Khazneh (The Treasury), is not a building constructed of stone blocks, but a masterpiece carved directly into the solid sandstone cliff face.",
          "The entrance to the city is the Siq, a narrow gorge over a kilometer long flanked by soaring 80-meter-high cliffs. Walking through this dark, winding crack in the earth builds suspense until it suddenly opens up to reveal the sunlit Treasury.",
          "The Treasury got its name from a local Bedouin legend. They believed an Egyptian pharaoh hid his gold in the urn at the top of the facade, and you can still see bullet holes in the stone urn where people shot at it hoping to release the treasure."
        ],
        question: "How do visitors reach the Treasury building in Petra?",
        options: [
          "By walking through the Siq.",
          "By helicopter.",
          "By climbing over the mountain.",
          "Through an underground tunnel."
        ],
        answer: "By walking through the Siq.",
        explanation: "The Siq is a narrow, dramatic canyon that serves as the main entrance road to the hidden city."
      },
      {
        stopName: "Wadi Rum",
        imageKeyword: "Wadi Rum",
        description: [
          "This desert valley is often called the \"Valley of the Moon\" because of its alien, red landscape. It features dramatic sandstone mountains rising vertically out of the red sand dunes, created by millions of years of wind erosion.",
          "It is a favorite filming location for movies set on Mars. Blockbusters like The Martian, Red Planet, and Prometheus were all filmed here because the terrain looks almost exactly like the surface of the Red Planet without CGI.",
          "The area is inhabited by the Zalabieh Bedouin tribe. They have lived in this harsh environment for centuries and now run eco-camps where tourists can sleep in \"Martian domes\" or traditional goat-hair tents under the incredibly clear night sky."
        ],
        question: "Which planet is Wadi Rum often used to represent in movies?",
        options: [
          "Mars.",
          "Venus.",
          "Jupiter.",
          "Saturn."
        ],
        answer: "Mars.",
        explanation: "The red sand and rocky terrain make it the perfect stand-in for the Red Planet."
      },
      {
        stopName: "The Dead Sea",
        imageKeyword: "Dead Sea Jordan",
        description: [
          "While shared with Israel, the Jordanian coast offers a different experience of the lowest point on Earth. The mineral-rich black mud here is used in world-class therapeutic spas that line the shore.",
          "The air here is actually safer for sunbathing. Because the sea is so far below sea level, the extra atmosphere filters out harmful UV rays more effectively than at normal elevations, allowing people to stay in the sun longer without burning.",
          "Historically, this was one of the world's first health resorts. It was the favorite retreat of King Herod the Great and, later, Cleopatra, who allegedly ordered cosmetic factories to be built along its shores."
        ],
        question: "How does the low elevation of the Dead Sea affect sunbathing?",
        options: [
          "It reduces the risk of sunburn.",
          "It makes you burn faster.",
          "It makes the sun invisible.",
          "It has no effect."
        ],
        answer: "It reduces the risk of sunburn.",
        explanation: "The extra thick layer of atmosphere filters out more UV radiation."
      },
      {
        stopName: "Jerash",
        imageKeyword: "Jerash",
        description: [
          "Jerash is one of the best-preserved Roman provincial cities in the world. Often called the \"Pompeii of the East,\" it features unbroken colonnaded streets, soaring hilltop temples, and grand theaters that could seat thousands.",
          "The Oval Plaza is the city's most iconic feature. It is an unusual, asymmetrical forum surrounded by 56 Ionic columns, designed to connect the main north-south street (Cardo) with the Temple of Zeus.",
          "The city hosts a modern cultural festival in its ancient theaters. The acoustics of the South Theater are so perfect that a speaker standing at the center of the orchestra floor can be heard by anyone in the 3,000 seats without a microphone."
        ],
        question: "What is the nickname of the ancient city of Jerash?",
        options: [
          "Pompeii of the East.",
          "The White City.",
          "Rome of the Sands.",
          "The Lost Capital."
        ],
        answer: "Pompeii of the East.",
        explanation: "It is given this title because of its exceptional state of preservation, similar to the Italian city."
      },
      {
        stopName: "Mount Nebo",
        imageKeyword: "Mount Nebo",
        description: [
          "This mountain ridge provides a panoramic view of the Holy Land. According to the Bible, this is the site where Moses was granted a view of the Promised Land before he died.",
          "It is believed to be the burial place of Moses. Although the exact location of the grave is unknown, a memorial church was built on the summit in the 4th century to honor the prophet.",
          "From the top, on a clear day, you can see the Dead Sea, the Jordan River valley, Jericho, and the distant hills of Jerusalem—the same vista that Moses would have seen thousands of years ago."
        ],
        question: "Who is believed to be buried on Mount Nebo?",
        options: [
          "Moses.",
          "Abraham.",
          "David.",
          "Solomon."
        ],
        answer: "Moses.",
        explanation: "Religious tradition holds that the prophet died and was buried here after viewing the Promised Land."
      }
    ]
  }
};