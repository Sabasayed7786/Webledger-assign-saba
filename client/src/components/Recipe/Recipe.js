import Navbar from '../Navbar/Navbar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Recipe.css';
import BASE_URL from '../../config/config';

const Recipe = () => {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState(''); // New state for the search query

  useEffect(() => {
    fetchData(); // Fetch data when the component initially loads
  }, []);

  useEffect(() => {
    // Fetch data based on the current query whenever it changes
    fetchData(query);
  }, [query]);

  const fetchData = async (searchQuery) => {
    try {
      // Make a GET request to your backend API endpoint with the searchQuery
      const response = await axios.get(`/api/recipe?query=${searchQuery || ''}`); // Pass the searchQuery to the API

      // Update the data state with the response data
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      
    }
  };

  if (!data) {
    // Data is still being fetched
    return <div>Loading...</div>;
  }

  const { recipes } = data;

  return (
    <div>
      <Navbar />
      <div className="recipe-search">
        <h3>Search Recipes </h3>
        <input
          type="text"
          placeholder="Search for recipes"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input" 
        />
        

      </div>
      
      <div className="recipe-cards">
        {recipes.map((recipe, index) => (
          <div key={index} className="card">
            <img
              src={recipe.image}
              className="card-img-top"
              alt={recipe.title}
            />
            <div className="card-body">
              <h5 className="card-title">{recipe.title}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipe;


