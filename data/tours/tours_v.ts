import { TourData } from "../../types";

export const toursV: Record<string, TourData> = {
  "Vanuatu": {
    tourTitle: "The Land of Fire",
    introText: "Mount Yasur is an active volcano that is easily accessible to visitors. Dive to the sunken troopship President Coolidge off the coast.",
    stops: [
      {
        stopName: "Mount Yasur",
        imageKeyword: "Mount Yasur",
        description: [
          "This is one of the most accessible active volcanoes in the world. Visitors can drive almost to the rim and then walk 15 minutes to look straight down into the churning lava vent.",
          "It has been erupting nearly continuously for over 800 years. The glow from the crater was apparently what attracted Captain James Cook to the island in 1774.",
          "The volcano is considered sacred by the John Frum cargo cult. Followers of this religion believe an American serviceman named John Frum lives inside the volcano and will one day return with wealth and goods from the USA."
        ],
        question: "Which explorer was attracted to Tanna Island by the glow of Mount Yasur in 1774?",
        options: [
          "Captain James Cook.",
          "Ferdinand Magellan.",
          "Christopher Columbus.",
          "Abel Tasman."
        ],
        answer: "Captain James Cook.",
        explanation: "The continuous eruption served as a beacon for the British explorer."
      },
      {
        stopName: "Pentecost Island",
        imageKeyword: "Pentecost Island Land Diving",
        description: [
          "This island is the birthplace of bungee jumping. The tradition, called Naghol (Land Diving), involves men jumping from wooden towers up to 30 meters high with only tree vines tied to their ankles.",
          "The goal is to touch the ground with your shoulders. It is a fertility ritual for the yam harvest; men believe that by brushing the earth, they bless the soil for a good crop.",
          "Unlike modern bungee cords which are elastic, the vines are not. The vines snap tight just inches from the ground, requiring precise calculations of length and vine elasticity to avoid death."
        ],
        question: "The tradition of Land Diving on Pentecost Island was the inspiration for what modern extreme sport?",
        options: [
          "Bungee Jumping.",
          "Skydiving.",
          "Parkour.",
          "Cliff Diving."
        ],
        answer: "Bungee Jumping.",
        explanation: "A.J. Hackett witnessed the ritual and developed the elastic cord to mimic it safely."
      },
      {
        stopName: "SS President Coolidge",
        imageKeyword: "SS President Coolidge",
        description: [
          "This 200-meter luxury liner was converted into a troopship during WWII and sank in 1942 after hitting friendly mines. It is the largest accessible wreck dive in the world.",
          "The wreck is almost entirely intact. Divers can swim through the dining rooms, see the chandeliers, and find military jeeps, rifles, and medical supplies still resting in the cargo holds.",
          "A famous artifact is \"The Lady.\" It is a porcelain relief of a woman riding a unicorn located in the first-class smoking room. It is a tradition for divers to kiss the statue for good luck."
        ],
        question: "What caused the SS President Coolidge to sink?",
        options: [
          "Friendly mines (US mines).",
          "A Japanese torpedo.",
          "Running aground on a reef.",
          "A hurricane."
        ],
        answer: "Friendly mines (US mines).",
        explanation: "The captain accidentally steered the ship into a defensive minefield laid by the US military."
      },
      {
        stopName: "Million Dollar Point",
        imageKeyword: "Million Dollar Point",
        description: [
          "Located right next to the Coolidge wreck, this site is a bizarre underwater junkyard. At the end of WWII, the US military had millions of dollars worth of equipment they didn't want to ship home.",
          "After the local British and French government refused to buy the goods (hoping to get them for free later), the Americans drove everything into the ocean.",
          "Today, you can snorkel over a reef made of bulldozers, forklifts, trucks, and crates of Coca-Cola bottles, all rusting together into a massive metal reef."
        ],
        question: "Why did the US military dump equipment at Million Dollar Point?",
        options: [
          "To prevent the locals/colonial powers from getting it for free.",
          "To build an artificial reef.",
          "To hide evidence.",
          "Because the ships were full."
        ],
        answer: "To prevent the locals/colonial powers from getting it for free.",
        explanation: "When the local government refused to pay, the US destroyed the equipment rather than gift it."
      },
      {
        stopName: "Yakel Village",
        imageKeyword: "Yakel Village",
        description: [
          "This village on Tanna Island famously rejects modern life. The residents live according to Kastom (custom), wearing traditional grass skirts and penis sheaths (nambas) and refusing money, schools, and electricity.",
          "They became famous for worshipping Prince Philip (the late husband of Queen Elizabeth II). Due to a local legend about a mountain spirit traveling overseas to marry a powerful woman, they identified Prince Philip as that spirit.",
          "Upon Prince Philip's death in 2021, the tribe held weeks of mourning and ritual feasts to help his spirit return home to the island."
        ],
        question: "Who did the people of Yakel Village famously worship as a deity?",
        options: [
          "Prince Philip (Duke of Edinburgh).",
          "Queen Elizabeth II.",
          "Elvis Presley.",
          "John F. Kennedy."
        ],
        answer: "Prince Philip (Duke of Edinburgh).",
        explanation: "They believed he was the human form of an ancestral mountain spirit."
      }
    ]
  },
  "Vatican City": {
    tourTitle: "The Holy See",
    introText: "The Sistine Chapel ceiling features the famous paintings of Michelangelo. Stand in the center of the largest church in the world.",
    stops: [
      {
        stopName: "St. Peter's Basilica",
        imageKeyword: "St. Peter's Basilica",
        description: [
          "This is the largest church in the world by interior volume. It can hold up to 60,000 people. It is built over the tomb of Saint Peter, one of the twelve apostles of Jesus and the first Pope.",
          "The center of the church is dominated by Bernini's Baldachin. This 29-meter tall bronze canopy stands over the papal altar. The bronze was stripped from the roof of the ancient Roman Pantheon, leading to the saying, \"What the barbarians didn't do, the Barberini (Pope's family) did.\"",
          "It houses Michelangelo's Pietà. This sculpture of Mary holding the dead body of Jesus is the only work Michelangelo ever signed (he carved his name on Mary's sash after hearing someone attribute the work to another artist)."
        ],
        question: "Where did the bronze for the Baldachin altar come from?",
        options: [
          "The Pantheon.",
          "The Colosseum.",
          "A melted cannon.",
          "A statue of Nero."
        ],
        answer: "The Pantheon.",
        explanation: "The Pope ordered the bronze stripped from the ancient Roman temple's roof to build the Catholic altar."
      },
      {
        stopName: "The Sistine Chapel",
        imageKeyword: "The Sistine Chapel",
        description: [
          "This chapel is the site of the Papal Conclave, where cardinals gather to elect a new Pope.",
          "The ceiling was painted by Michelangelo between 1508 and 1512. He hated the job, as he considered himself a sculptor, not a painter. He painted the entire 5,000 square feet standing up (not lying down) with his neck craned back, which caused him permanent physical damage.",
          "Decades later, he returned to paint The Last Judgment on the altar wall. In this painting, he included a self-portrait: his own face appears on the flayed skin held by Saint Bartholomew, symbolizing his torture while painting the chapel."
        ],
        question: "What major event takes place inside the Sistine Chapel?",
        options: [
          "The Papal Conclave (Election of the Pope).",
          "The crowning of the King.",
          "The Easter Mass.",
          "The burial of Popes."
        ],
        answer: "The Papal Conclave (Election of the Pope).",
        explanation: "The cardinals are locked inside until they select a new leader for the Catholic Church."
      },
      {
        stopName: "St. Peter's Square",
        imageKeyword: "St. Peter's Square",
        description: [
          "Designed by Bernini, this massive plaza is shaped like a keyhole (referencing the Keys of Heaven given to Peter). The two semicircular colonnades are meant to represent \"the motherly arms of the church\" embracing the faithful.",
          "In the center stands an ancient Egyptian obelisk. It was brought to Rome by Emperor Caligula in 37 AD. It originally stood in the Circus of Nero, where St. Peter was crucified, making it a \"witness\" to the martyrdom.",
          "The top of the obelisk contains a relic. When the Pope re-consecrated it, a piece of the True Cross was placed inside the bronze cross at the very tip."
        ],
        question: "The colonnades of St. Peter's Square are designed to look like what?",
        options: [
          "Embracing arms.",
          "Angel wings.",
          "Keys to heaven.",
          "A ship's anchor."
        ],
        answer: "Embracing arms.",
        explanation: "Bernini intended them to symbolize the church hugging the believers."
      },
      {
        stopName: "The Swiss Guard",
        imageKeyword: "Swiss Guard",
        description: [
          "The Swiss Guard is the smallest army in the world, responsible for the Pope's safety since 1506.",
          "Despite their Renaissance-style uniforms (which were not designed by Michelangelo, contrary to myth), they are a modern elite military force. Every guard must be a Swiss citizen, Catholic, single, and have completed basic training with the Swiss Army.",
          "Their loyalty is legendary. During the Sack of Rome in 1527, 147 out of 189 guards died fighting off thousands of troops on the steps of St. Peter's to buy time for Pope Clement VII to escape."
        ],
        question: "What nationality must a soldier be to join the Vatican's Swiss Guard?",
        options: [
          "Swiss.",
          "Italian.",
          "French.",
          "German."
        ],
        answer: "Swiss.",
        explanation: "It is a strict requirement dating back to the 16th-century treaty with Swiss mercenaries."
      },
      {
        stopName: "Vatican Museums",
        imageKeyword: "Vatican Museums Spiral Staircase",
        description: [
          "The Vatican Museums contain one of the largest art collections in the world, amassed by Popes over centuries. The collection is 9 miles long if you walk every corridor.",
          "The exit features the famous Bramante Staircase. It is a double-helix design (like DNA), meaning there are two separate staircases: one for people going up and one for people going down, so they never meet.",
          "This design was originally created in 1505 to allow horses and carriages to climb up to the Belvedere Palace without interrupting traffic coming down."
        ],
        question: "What is the shape of the famous staircase at the exit of the Vatican Museums?",
        options: [
          "Double-helix.",
          "Square.",
          "Zig-zag.",
          "Vertical ladder."
        ],
        answer: "Double-helix.",
        explanation: "Two spirals intertwine without meeting, allowing separate up and down traffic."
      }
    ]
  },
  "Venezuela": {
    tourTitle: "The Land of Grace",
    introText: "Angel Falls creates the highest uninterrupted waterfall drop on Earth. Lightning strikes the same spot on Lake Maracaibo nearly every night.",
    stops: [
      {
        stopName: "Angel Falls",
        imageKeyword: "Angel Falls",
        description: [
          "Falling 979 meters (3,212 feet) from the top of Auyán-tepui, this is the world's highest uninterrupted waterfall. It is 15 times higher than Niagara Falls.",
          "It drops so far that much of the water evaporates into mist before it even hits the ground. This creates a unique microclimate at the base, filled with rare orchids and plants.",
          "It was \"discovered\" by American pilot Jimmie Angel in 1933. He crash-landed his plane on top of the mountain while looking for gold. He and his family had to hike down the sheer cliffs for 11 days to reach civilization."
        ],
        question: "How much higher is Angel Falls compared to Niagara Falls?",
        options: [
          "15 times higher.",
          "2 times higher.",
          "Equal height.",
          "5 times higher."
        ],
        answer: "15 times higher.",
        explanation: "The vertical drop is nearly a kilometer, dwarfing the North American falls."
      },
      {
        stopName: "Catatumbo Lightning",
        imageKeyword: "Catatumbo Lightning",
        description: [
          "This natural phenomenon occurs over the mouth of the Catatumbo River. For 140 to 160 nights a year, lightning storms rage for 10 hours at a time, producing up to 280 flashes per hour.",
          "It is the highest concentration of lightning in the world. The storms are so reliable that sailors historically used the constant flashing as a natural lighthouse for navigation (\"The Beacon of Maracaibo\").",
          "The cause is a combination of wind and geology. The Andes mountains trap warm trade winds coming off the Caribbean, which collide with cool mountain air to create permanent storm clouds."
        ],
        question: "Historically, how did sailors use the Catatumbo Lightning?",
        options: [
          "As a lighthouse (for navigation).",
          "To predict earthquakes.",
          "To signal for help.",
          "To cook food."
        ],
        answer: "As a lighthouse (for navigation).",
        explanation: "The reliable, bright flashes helped ships navigate Lake Maracaibo at night."
      },
      {
        stopName: "Mount Roraima",
        imageKeyword: "Mount Roraima",
        description: [
          "Roraima is the most famous tepui (table-top mountain). It sits on the triple border of Venezuela, Brazil, and Guyana.",
          "These mountains are \"ecological islands in the sky.\" Because they have been isolated from the rainforest below for millions of years, the summit hosts plants and animals (like black pebble toads) that exist nowhere else on Earth.",
          "It inspired Sir Arthur Conan Doyle's novel The Lost World. The sheer cliffs and prehistoric appearance led the author to imagine dinosaurs still living on the summit."
        ],
        question: "Mount Roraima served as the inspiration for which famous adventure novel?",
        options: [
          "The Lost World.",
          "Journey to the Center of the Earth.",
          "King Kong.",
          "Treasure Island."
        ],
        answer: "The Lost World.",
        explanation: "The isolated plateau inspired the idea of a land where prehistoric creatures survived."
      },
      {
        stopName: "Los Roques Archipelago",
        imageKeyword: "Los Roques",
        description: [
          "This national park consists of about 350 islands, cays, and islets. It is the largest marine park in the Caribbean Sea.",
          "It is famous for its \"bonefishing.\" Anglers come from all over the world to catch bonefish in the shallow flats, but it is strictly catch-and-release to protect the population.",
          "The archipelago is an important turtle sanctuary. Four different species of sea turtles nest here, and the park contains a research station dedicated to hatching and releasing baby turtles."
        ],
        question: "What is the primary rule for fishing in Los Roques?",
        options: [
          "Catch-and-release.",
          "Catch as many as you want.",
          "Only use nets.",
          "Fishing is banned completely."
        ],
        answer: "Catch-and-release.",
        explanation: "Strict conservation laws protect the fish populations in the marine park."
      },
      {
        stopName: "Coro and its Port",
        imageKeyword: "Coro Sand Dunes",
        description: [
          "Coro was the first capital of Venezuela. It is unique because it is a fusion of Dutch and Spanish colonial architecture, featuring earthen buildings (adobe) unlike anywhere else in the Caribbean.",
          "The city sits right next to the Médanos de Coro National Park. This is a mini-desert of massive sand dunes that are constantly moving, sometimes drifting into the city streets and blocking roads.",
          "It uses a unique construction method called bahareque (wattle and daub). The walls are made of mud and cane, which keeps the houses cool in the intense heat of the coast."
        ],
        question: "What geological feature is located right next to the city of Coro?",
        options: [
          "Sand dunes (A desert).",
          "A volcano.",
          "A glacier.",
          "A rainforest."
        ],
        answer: "Sand dunes (A desert).",
        explanation: "The Médanos de Coro are massive dunes that shift and move near the city limits."
      }
    ]
  },
  "Vietnam": {
    tourTitle: "The Ascending Dragon",
    introText: "Limestone karsts rise from the emerald waters of Ha Long Bay. Sip strong coffee on a low plastic stool in Hanoi.",
    stops: [
      {
        stopName: "Ha Long Bay",
        imageKeyword: "Ha Long Bay",
        description: [
          "The name \"Ha Long\" means \"Descending Dragon.\" Legend says the jade islands were created by a dragon spitting jewels into the sea to form a barrier against invaders.",
          "It features over 1,600 limestone islands and islets. Most are uninhabited and unaffected by humans due to their steep precipices.",
          "The area is home to floating villages. Fishermen live on floating houses lashed together, complete with schools and shops, rarely stepping on dry land."
        ],
        question: "What does the name \"Ha Long\" translate to?",
        options: [
          "Descending Dragon.",
          "Emerald Water.",
          "Thousand Islands.",
          "Jade Palace."
        ],
        answer: "Descending Dragon.",
        explanation: "It refers to the myth of a dragon coming down from the mountains to create the islands."
      },
      {
        stopName: "Cu Chi Tunnels",
        imageKeyword: "Cu Chi Tunnels",
        description: [
          "This massive network of underground tunnels was used by the Viet Cong during the Vietnam War. They stretched for over 250 kilometers, reaching from the outskirts of Saigon all the way to the Cambodian border.",
          "The tunnels were a fully functioning underground city. They included hospitals, kitchens, weapon factories, and living quarters, allowing soldiers to disappear from American forces and survive massive bombing campaigns.",
          "The entrances were incredibly small. They were designed to fit the slight frame of Vietnamese soldiers but were too narrow for larger American soldiers to enter (\"Tunnel Rats\")."
        ],
        question: "Why were the entrances to the Cu Chi Tunnels built so small?",
        options: [
          "To prevent larger enemy soldiers from entering.",
          "To save digging time.",
          "To keep out animals.",
          "To trap heat."
        ],
        answer: "To prevent larger enemy soldiers from entering.",
        explanation: "The narrow size acted as a defense mechanism against American forces."
      },
      {
        stopName: "Hoi An",
        imageKeyword: "Hoi An Ancient Town",
        description: [
          "This former trading port is exceptionally well-preserved. It reflects a fusion of indigenous and foreign cultures (principally Chinese and Japanese with later European influences) that date back to the 15th century.",
          "It is famous for the \"Japanese Covered Bridge.\" Built in the 1590s by the Japanese community to link them with the Chinese quarters, it is the only known covered bridge with a Buddhist temple attached to one side.",
          "Once a month, during the Full Moon Lantern Festival, the town turns off all electric lights. The streets are illuminated only by thousands of colorful silk lanterns and candles floating on the river."
        ],
        question: "Which community built the famous Covered Bridge in Hoi An?",
        options: [
          "The Japanese.",
          "The Chinese.",
          "The French.",
          "The Dutch."
        ],
        answer: "The Japanese.",
        explanation: "It was constructed to connect the Japanese settlement with the Chinese district."
      },
      {
        stopName: "Son Doong Cave",
        imageKeyword: "Son Doong Cave",
        description: [
          "This is the largest cave in the world by cross-section. It is so huge that a Boeing 747 could fly through its largest cavern, and it has its own localized weather system, including clouds and rain.",
          "The cave contains a jungle. The roof of the cave collapsed in two places (dolines), allowing sunlight to enter and creating a lush rainforest (\"Garden of Edam\") inside the cave, 200 meters underground.",
          "It was only fully explored in 2009. It contains the world's tallest stalagmites, some reaching up to 80 meters high."
        ],
        question: "What makes Son Doong Cave unique in terms of weather?",
        options: [
          "It has its own weather system (clouds/rain).",
          "It snows inside.",
          "It is always freezing.",
          "It has tornadoes."
        ],
        answer: "It has its own weather system (clouds/rain).",
        explanation: "The immense size and temperature difference create clouds inside the cavern."
      },
      {
        stopName: "The Golden Bridge",
        imageKeyword: "The Golden Bridge Da Nang",
        description: [
          "Located near Da Nang, this pedestrian bridge looks like it is being held up by the hands of a giant god. The hands appear to be carved from stone, but they are actually made of steel mesh and fiberglass designed to look like weathered mossy rock.",
          "The bridge stands 1,400 meters above sea level. It was designed to evoke the sensation of walking on a shimmering silk strip hiding in the clouds.",
          "It is part of a resort built on a former French hill station. The area was originally developed by French colonists in 1919 to escape the summer heat of the coast."
        ],
        question: "What are the giant hands holding the Golden Bridge made of?",
        options: [
          "Fiberglass and steel mesh.",
          "Solid stone.",
          "Concrete.",
          "Wood."
        ],
        answer: "Fiberglass and steel mesh.",
        explanation: "Although they look like ancient stone, they are modern artistic sculptures."
      }
    ]
  }
};