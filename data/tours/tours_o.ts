import { TourData } from "../../types";

export const toursO: Record<string, TourData> = {
  "Oman": {
    tourTitle: "The Jewel of Arabia",
    introText: "The Grand Mosque features a hand-woven carpet that took years to complete. Swim in the emerald green sinkhole of Bimmah in the desert.",
    stops: [
      {
        stopName: "Sultan Qaboos Grand Mosque",
        imageKeyword: "Sultan Qaboos Grand Mosque",
        description: [
          "Located in Muscat, this architectural masterpiece was a gift from Sultan Qaboos to his nation. It is one of the few mosques in Oman open to non-Muslim visitors.",
          "The main prayer hall features a massive hand-woven Persian carpet. It weighs 21 tons and took 600 women four years to weave. It was once the largest single-piece carpet in the world until a larger one was made for a mosque in Abu Dhabi.",
          "Above the carpet hangs a colossal chandelier made of Swarovski crystals. It is 14 meters tall and weighs 8.5 tons, designed to look like a minaret hanging from the ceiling."
        ],
        question: "How long did it take to weave the carpet in the Grand Mosque?",
        options: [
          "Four years.",
          "One year.",
          "Ten years.",
          "Six months."
        ],
        answer: "Four years.",
        explanation: "600 weavers worked continuously to create the 21-ton masterpiece."
      },
      {
        stopName: "Wadi Shab",
        imageKeyword: "Wadi Shab",
        description: [
          "This river canyon (wadi) is one of the most popular hiking spots in Oman. Visitors must take a boat across the river mouth and then hike through date palms and cliffs to reach the upper pools.",
          "The highlight is the \"Keyhole Cave.\" To reach the final waterfall, swimmers must squeeze through a tiny, narrow crack in the rocks, swimming in deep water until the cave opens up to reveal the hidden falls inside.",
          "The water is a brilliant emerald green. It comes from natural springs and contrasts beautifully with the stark, dry orange limestone cliffs that tower above the canyon."
        ],
        question: "To see the waterfall at the end of Wadi Shab, what must visitors swim through?",
        options: [
          "A narrow crack/cave (Keyhole).",
          "A coral reef.",
          "A ring of fire.",
          "A metal gate."
        ],
        answer: "A narrow crack/cave (Keyhole).",
        explanation: "The waterfall is hidden inside a semi-submerged cave accessible only by swimming."
      },
      {
        stopName: "Nizwa Fort",
        imageKeyword: "Nizwa Fort",
        description: [
          "Built in the 17th century, this fort was the administrative seat of the Imams of Oman. It is famous for its massive central drum tower, which is 30 meters high and 36 meters in diameter.",
          "The fort was designed with \"murder holes.\" These are vertical shafts directly above the doors where defenders could pour boiling date syrup (not oil) onto enemies trying to break through the gates.",
          "Nizwa was traditionally a center of learning and trade. The souq next to the fort is still famous for its silver jewelry (Khanjar daggers) and the Friday cattle market, where goats and cows are auctioned off in a centuries-old tradition."
        ],
        question: "What liquid did defenders traditionally pour through \"murder holes\" at Nizwa Fort?",
        options: [
          "Boiling date syrup.",
          "Boiling oil.",
          "Molten lead.",
          "Water."
        ],
        answer: "Boiling date syrup.",
        explanation: "Oil was too valuable; date syrup (halwa) was sticky, abundant, and burned intensely."
      },
      {
        stopName: "Wahiba Sands",
        imageKeyword: "Wahiba Sands",
        description: [
          "This desert region covers 12,500 square kilometers and is defined by its towering longitudinal dunes that run in parallel lines from north to south. The sand varies in color from red to dark honey.",
          "It is the home of the Bedouin people. Despite modernization, many Bedouin families still live here in goat-hair tents, raising camels and racing them across the dunes for sport.",
          "The desert supports a surprising amount of wildlife. The ecosystem includes wolves, mongooses, and the specialized sand cat, which has fur on the soles of its feet to protect them from the scorching ground."
        ],
        question: "What animal do the Bedouin of Wahiba Sands famously raise and race?",
        options: [
          "Camels.",
          "Horses.",
          "Ostriches.",
          "Falcons."
        ],
        answer: "Camels.",
        explanation: "Camel racing is a prestigious sport and a key part of their cultural heritage."
      },
      {
        stopName: "Jebel Shams",
        imageKeyword: "Jebel Shams",
        description: [
          "Jebel Shams (\"Mountain of the Sun\") is the highest mountain in Oman, reaching 3,009 meters. It is named so because it is the first place in the country to receive sunlight at dawn.",
          "It sits on the edge of Wadi Ghul, known as the \"Grand Canyon of Arabia.\" The vertical drop from the summit to the canyon floor is over 1,000 meters, offering vertigo-inducing views that rival the American Grand Canyon.",
          "Hikers can walk the \"Balcony Walk,\" an old donkey path that runs along the sheer cliff edge. It leads to the abandoned village of Sap Bani Khamis, which hangs precariously on the side of the canyon wall."
        ],
        question: "What is the nickname for Wadi Ghul, located next to Jebel Shams?",
        options: [
          "The Grand Canyon of Arabia.",
          "The Deep Throat.",
          "The Silent Valley.",
          "The Red Gorge."
        ],
        answer: "The Grand Canyon of Arabia.",
        explanation: "Its massive scale and depth make it the region's most dramatic geological feature."
      }
    ]
  }
};