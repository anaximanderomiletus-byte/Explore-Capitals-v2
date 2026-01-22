
import { GoogleGenAI } from "@google/genai";
import { TourData } from "../types";
import { staticTours } from "../data/staticTours";
import { STATIC_IMAGES } from "../data/images";
import { MOCK_COUNTRIES } from "../constants";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- Caching & Persistence Logic ---
const CACHE_PREFIX = 'explore_capitals_v4_img_';
const FIRESTORE_COLLECTION = 'fallback_images';

// Circuit breaker state for rate limiting
let isRateLimited = false;

const getCachedImage = (keyword: string): string | null => {
  try {
    const cached = localStorage.getItem(`${CACHE_PREFIX}${keyword}`);
    if (cached) {
      return cached;
    }
  } catch (e) {
    console.warn("Error reading from image cache", e);
  }
  return null;
};

const saveToCache = (keyword: string, dataUrl: string) => {
  try {
    localStorage.setItem(`${CACHE_PREFIX}${keyword}`, dataUrl);
  } catch (e) {
    console.warn("Local storage full or disabled, could not cache image for:", keyword);
  }
};

const getFirestoreImage = async (keyword: string): Promise<string | null> => {
  if (!db) return null;
  try {
    const docRef = doc(db, FIRESTORE_COLLECTION, keyword.replace(/\//g, '_'));
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return data.url || null;
    }
  } catch (e) {
    console.warn("Error reading from Firestore image store:", e);
  }
  return null;
};

const saveToFirestore = async (keyword: string, dataUrl: string) => {
  if (!db) return;
  try {
    const docRef = doc(db, FIRESTORE_COLLECTION, keyword.replace(/\//g, '_'));
    await setDoc(docRef, {
      url: dataUrl,
      generatedAt: new Date().toISOString(),
      keyword: keyword
    });
    console.log(`Saved AI image for "${keyword}" to shared fallback folder (Firestore)`);
  } catch (e) {
    console.warn("Error saving to Firestore image store:", e);
  }
};

/**
 * 1. Checks for a working static image.
 * 2. Checks local cache.
 * 3. Checks Firestore "fallback folder".
 * 4. Returns null if none found (Manual trigger required).
 */
export const getGeneratedImage = async (keyword: string, type: 'landscape' | 'landmark' = 'landscape'): Promise<string | null> => {
  try {
    // A. Static Image
    // We no longer check availability with fetch because it often triggers CORS errors.
    // Instead, we just return the URL and let the <img> tag's onError handle it.
  const staticUrl = STATIC_IMAGES[keyword];
  if (staticUrl) {
      return staticUrl;
  }

  // B. Local Cache (Fastest)
  const cachedImage = getCachedImage(keyword);
  if (cachedImage) {
    return cachedImage;
  }

  // C. Firestore Persistent Fallback Store ("The Folder")
  const firestoreImage = await getFirestoreImage(keyword);
  if (firestoreImage) {
    // Sync to local cache for faster next-time access
    saveToCache(keyword, firestoreImage);
    return firestoreImage;
    }
  } catch (e) {
    console.error("Error in getGeneratedImage:", e);
  }

  return null;
};

/**
 * Manually triggers Gemini to generate an image and saves it to cache/Firestore.
 */
export const triggerAIImageGeneration = async (keyword: string): Promise<string | null> => {
  if (isRateLimited) {
    throw new Error("AI generation is temporarily disabled due to rate limits.");
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || "";
  
  if (!apiKey) {
    throw new Error("API Key Missing");
  }

  console.log(`[AI-GEN] Requesting image for: "${keyword}"`);
  
  try {
    const genAI = new GoogleGenAI(apiKey);
    
    // Attempting to use the specific model you had previously: gemini-2.5-flash-image
    // This model name suggests it is a specialized image generation variant.
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash-image" 
    } as any);

    const prompt = `Generate a high-quality, wide-angle landscape image of ${keyword}.
STYLE: MODERN FLAT VECTOR ILLUSTRATION. 16:9 aspect ratio. 2D. Geometric shapes. Solid, flat colors. Minimalist. Natural colors. Wide angle. Full bleed. NO TEXT.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    // Check if the response contains the image in the parts
    const parts = response.candidates?.[0]?.content?.parts;
    if (!parts) throw new Error("No response data");

    for (const part of parts) {
      if (part.inlineData) {
        const base64Image = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        saveToCache(keyword, base64Image);
        await saveToFirestore(keyword, base64Image);
        return base64Image;
      }
    }

    throw new Error("Model did not return image data");

  } catch (e: any) {
    console.error("[AI-GEN] Failure:", e);
    
    // Better error messages for the UI
    let msg = e.message || "Unknown Error";
    if (msg.includes("429")) {
      isRateLimited = true;
      msg = "Quota Exceeded";
    } else if (msg.includes("API key not valid")) {
      msg = "Invalid API Key";
    } else if (msg.includes("not found")) {
      msg = "Model Not Found";
    }
    
    throw new Error(msg);
  }
};

export const getCountryTour = async (countryName: string): Promise<TourData | null> => {
  // 1. Check for Static Handcrafted Data
  if (staticTours[countryName]) {
    await delay(600); // Simulate "loading" a rich experience
    return staticTours[countryName];
  }

  // 2. Procedural Fallback Generator (No AI)
  // This ensures EVERY country works immediately without manual writing for 195 nations.
  const country = MOCK_COUNTRIES.find(c => c.name === countryName);
  if (!country) return null;

  await delay(800); // Simulate processing

  return {
      tourTitle: `Journey to ${country.name}`,
      introText: `${country.description} Join us as we explore the heart of this ${country.region} nation, learning about its capital, ${country.capital}, and its unique place in the world.`,
      stops: [
        {
          stopName: country.capital,
          imageKeyword: `${country.name} City`,
          description: [
             `Welcome to ${country.capital}, the bustling capital of ${country.name}. It serves as the political and cultural center of the nation.`,
             `As the seat of government, this city helps shape the future of its ${country.population} citizens. It's a place where history meets modern life.`,
             `Did you know? Capitals are often chosen for their strategic location near water or trade routes!`,
             `Take a moment to imagine the sounds of the local markets and the flow of daily life in this vibrant city.`
          ],
          question: `What is the capital city of ${country.name}?`,
          options: [country.capital, "Paris", "Tokyo", "Brasilia"], 
          answer: country.capital,
          explanation: `${country.capital} is the official capital of ${country.name}.`
        },
        {
          stopName: `${country.region} Landscapes`,
          imageKeyword: `${country.region} Nature`,
          description: [
             `${country.name} is located in ${country.region}, a part of the world known for its distinct geography and climate.`,
             `From its total area of ${country.area} km², the land supports diverse ecosystems and wildlife unique to this part of the globe.`,
             `Fun Fact: ${country.name} uses the ${country.currency} as its currency, which is vital for its local economy.`,
             `As you travel through the countryside, you'll see why this nation is a key part of the ${country.region} continent.`
          ],
          question: `Which continent is ${country.name} located in?`,
          options: [country.region, "Antarctica", "Australia", "South America"],
          answer: country.region,
          explanation: `${country.name} is located in the continent of ${country.region}.`
        },
        {
          stopName: "Local Culture",
          imageKeyword: `${country.name} Culture`,
          description: [
             `The culture of ${country.name} is rich and vibrant, influenced by its history and neighbors.`,
             `People here speak ${country.languages.join(", ")}, which connects them to their heritage and to each other.`,
             `Did you know? Language is one of the most important parts of a country's identity, preserving stories from generation to generation.`,
             `Imagine the sounds of traditional music and the smell of local dishes filling the air.`
          ],
          question: `What is a primary language spoken in ${country.name}?`,
          options: [country.languages[0], "Klingon", "Latin", "Esperanto"],
          answer: country.languages[0],
          explanation: `${country.languages[0]} is one of the main languages spoken in ${country.name}.`
        },
        {
          stopName: "Historic Landmarks",
          imageKeyword: `${country.name} Landmark`,
          description: [
             `Every country has landmarks that tell the story of its past. ${country.name} is no different.`,
             `From ancient structures to modern marvels, the architecture here reflects the ingenuity of its people.`,
             `Fun Fact: Many historic sites are protected to ensure future generations can learn from them.`,
             `Standing before these monuments, you can feel the weight of history and the passage of time.`
          ],
          question: `Does ${country.name} have historic landmarks?`,
          options: ["Yes", "No", "Maybe", "Only one"],
          answer: "Yes",
          explanation: `Like all nations, ${country.name} has landmarks that are significant to its history and culture.`
        },
        {
          stopName: "Natural Wonders",
          imageKeyword: `${country.name} Landscape`,
          description: [
             `Beyond the cities, ${country.name} is home to breathtaking natural beauty.`,
             `Whether it's mountains, rivers, or coastlines, the diverse environment supports a variety of plants and animals.`,
             `Did you know? Protecting nature is essential for maintaining the balance of our planet's ecosystems.`,
             `Take a deep breath and imagine the fresh air and stunning views of the ${country.name} wilderness.`
          ],
          question: `What is a key feature of ${country.name}'s geography?`,
          options: ["Its natural landscapes", "It has no land", "It is entirely underwater", "It is in space"],
          answer: "Its natural landscapes",
          explanation: `${country.name} is defined by its physical geography, including its land, water, and ecosystems.`
        }
      ]
  };
};
