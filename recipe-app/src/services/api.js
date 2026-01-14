const API_BASE_URL = "https://api.spoonacular.com";
const API_KEY = import.meta.env.VITE_API_KEY;

if (!API_KEY) {
  console.warn(
    "API_KEY not found in environment variables. Please create a .env file with VITE_API_KEY"
  );
}

async function fetchAPI(endpoint, options = {}) {
  try {
    const url = `${API_BASE_URL}${endpoint}${endpoint.includes("?") ? "&" : "?"}apiKey=${API_KEY}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error(
          "API rate limit exceeded. Please try again later."
        );
      }

      if (response.status === 401) {
        throw new Error("Invalid API key. Please check your configuration.");
      }

      if (response.status === 404) {
        throw new Error("Recipe not found.");
      }

      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error("API Error:", error);
    return {
      data: null,
      error: error.message || "Failed to fetch data. Please try again.",
    };
  }
}

export async function searchRecipes(params = {}) {
  const {
    query = "",
    cuisine = "",
    diet = "",
    type = "",
    maxReadyTime = "",
    sort = "",
    number = 10,
    offset = 0,
  } = params;

  const queryParams = new URLSearchParams();
  if (query) queryParams.append("query", query);
  if (cuisine) queryParams.append("cuisine", cuisine);
  if (diet) queryParams.append("diet", diet);
  if (type) queryParams.append("type", type);
  if (maxReadyTime) queryParams.append("maxReadyTime", maxReadyTime);
  if (sort) queryParams.append("sort", sort);
  queryParams.append("number", number);
  queryParams.append("offset", offset);

  return fetchAPI(`/recipes/complexSearch?${queryParams.toString()}`);
}

export async function getRecipeInformation(id) {
  return fetchAPI(`/recipes/${id}/information?includeNutrition=true`);
}


export async function getSimilarRecipes(id, number = 5) {
  return fetchAPI(`/recipes/${id}/similar?number=${number}`);
}


