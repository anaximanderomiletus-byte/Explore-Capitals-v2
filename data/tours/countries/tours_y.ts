import { TourData } from "../../types";

export const toursY: Record<string, TourData> = {
  "Yemen": {
    tourTitle: "The Arabia Felix",
    introText: "The mud skyscrapers of Shibam are known as the Manhattan of the Desert. Visit the alien dragon blood trees on Socotra island.",
    stops: [
      {
        stopName: "Socotra Island",
        imageKeyword: "Socotra Dragon Blood Tree",
        description: [
          "Socotra is often called the \"most alien-looking place on Earth.\" It separated from the mainland 6 million years ago, leading to unique evolution; 37% of its plants are found nowhere else.",
          "The iconic Dragon Blood Tree looks like an inside-out umbrella. It is named for its red sap, which was used in ancient times as a dye, a medicine, and even as a varnish for violins (Stradivarius).",
          "The shape is an adaptation for survival. The dense canopy provides shade for the roots, reducing evaporation, and channels mist toward the trunk to water itself in the arid climate."
        ],
        question: "Why is the sap of the Dragon Blood Tree red?",
        options: [
          "It contains a red resin (used for dye/medicine).",
          "It is blood from a dragon.",
          "It reflects the red soil.",
          "It is full of iron."
        ],
        answer: "It contains a red resin (used for dye/medicine).",
        explanation: "When the bark is cut, the tree \"bleeds\" this crimson fluid."
      },
      {
        stopName: "Shibam",
        imageKeyword: "Shibam Skyscrapers",
        description: [
          "Known as the \"Manhattan of the Desert,\" this city is the oldest skyscraper metropolis in the world. It features about 500 tower houses made of mud brick, some rising up to 11 stories high.",
          "The vertical design was for defense. By building up rather than out, the residents could protect themselves from Bedouin raids, locking the single fortified gate at night.",
          "The buildings require constant maintenance. Residents must whitewash the roofs and tops of the walls with lime regularly; if the mud gets wet from rain, the skyscrapers can melt and collapse."
        ],
        question: "Why is Shibam nicknamed the \"Manhattan of the Desert\"?",
        options: [
          "It has high-rise \"skyscrapers\" (made of mud).",
          "It is an island.",
          "It has a large central park.",
          "It is a financial hub."
        ],
        answer: "It has high-rise \"skyscrapers\" (made of mud).",
        explanation: "The density and height of the ancient towers resemble a modern city skyline."
      },
      {
        stopName: "Dar al-Hajar",
        imageKeyword: "Dar al-Hajar",
        description: [
          "Located near Sana'a, this palace sits atop a natural rock spire like a cherry on a sundae. It was built in the 1930s as a summer retreat for the Imam Yahya.",
          "The architecture is a masterpiece of Yemeni design. It features stained glass windows (qamariya) and intricate gypsum friezes. The rock itself contains a deep well that predates the palace, allowing it to withstand sieges.",
          "Though it looks like a single structure, the building is integrated into the rock. There are rooms carved inside the stone spire itself, used for cooling water and food storage."
        ],
        question: "What architectural feature helps keep the interior of Dar al-Hajar cool?",
        options: [
          "Stained glass windows (Qamariya) / Stone walls.",
          "Air conditioning.",
          "Electric fans.",
          "Ice blocks."
        ],
        answer: "Stained glass windows (Qamariya) / Stone walls.",
        explanation: "The traditional windows and thick walls regulate the desert heat."
      },
      {
        stopName: "Sana'a Old City",
        imageKeyword: "Sana'a Old City",
        description: [
          "Sana'a is one of the oldest continuously inhabited cities in the world (2,500 years). The houses are built of rammed earth and burnt brick, decorated with distinctive white gypsum patterns that look like icing on a gingerbread house.",
          "The windows are unique. Above the standard rectangular windows are semi-circular fanlights made of stained glass or alabaster sheets, which cast a beautiful colored light inside the rooms.",
          "According to legend, the city was founded by Shem, the son of Noah, giving it the nickname \"Sam City.\""
        ],
        question: "What material creates the white \"icing\" decoration on the houses in Sana'a?",
        options: [
          "Gypsum.",
          "White paint.",
          "Marble.",
          "Chalk."
        ],
        answer: "Gypsum.",
        explanation: "This plaster is used to waterproof and decorate the windows and roofs."
      },
      {
        stopName: "The Great Dam of Marib",
        imageKeyword: "Marib Dam Ruins",
        description: [
          "This was one of the engineering wonders of the ancient world. Built around the 8th century BC, it irrigated the desert for a thousand years, supporting the Kingdom of Saba (Sheba).",
          "Its collapse in the 6th century AD is mentioned in the Quran as a punishment from God (\"The Flood of Arim\"). The catastrophic failure destroyed the agriculture of the region, forcing Arab tribes to migrate across the Middle East.",
          "The modern dam nearby was built in the 1980s, but the ancient sluice gates still stand as a testament to the hydraulic mastery of the Queen of Sheba's people."
        ],
        question: "The collapse of the Marib Dam is believed to have caused what major event?",
        options: [
          "Mass migration of Arab tribes.",
          "The end of the Ice Age.",
          "The foundation of Rome.",
          "The invention of writing."
        ],
        answer: "Mass migration of Arab tribes.",
        explanation: "The loss of irrigation destroyed the economy, forcing the population to scatter across Arabia."
      }
    ]
  }
};