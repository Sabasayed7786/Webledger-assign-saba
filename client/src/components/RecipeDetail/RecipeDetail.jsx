// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const RecipeDetail = () => {
//   const { id } = useParams(); // Extract the recipe ID from the URL
//   const [recipeDetails, setRecipeDetails] = useState(null);

//   useEffect(() => {
//     // Fetch recipe details based on the extracted ID
//     axios
//       .get(`/recipe/${id}`) // Replace with your backend route to fetch recipe details
//       .then((response) => {
//         setRecipeDetails(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching recipe details:', error);
//       });
//   }, [id]);

//   if (!recipeDetails) {
//     // Data is still being fetched
//     return <div>Loading...</div>;
//   }

//   // Render the recipe details here
//   return (
//     <div>
//       <h2>Recipe Details</h2>
//       <div>
//         <h3>{recipeDetails.title}</h3>
//         <img src={recipeDetails.image} alt={recipeDetails.title} />
//         <p>Instructions: {recipeDetails.instructions}</p>
//         <p>Ingredients:</p>
//         <ul>
//           {recipeDetails.ingredients.map((ingredient, index) => (
//             <li key={index}>{ingredient.name}: {ingredient.amount}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default RecipeDetail;
