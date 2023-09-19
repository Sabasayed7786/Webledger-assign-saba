const axios = require('axios');

async function fetchRecipes(query) {
  const apiKey = process.env.SPOONACULAR_API_KEY;
  const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}`;

  try {
    const response = await axios.get(apiUrl);
    return response.data.results; // Return an array of recipes
  } catch (error) {
    throw error;
  }
}

module.exports = { fetchRecipes };

