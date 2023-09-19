const jwt = require("jsonwebtoken")
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs')
const authenticate = require("../middleware/authenticate")
const { fetchRecipes } = require('../db/fetchRecipe');
require("../db/connect");
const User = require("../models/userSchema");




router.post("/api/register", async (req, res) => {
  const { name, email,  password, cpassword } = req.body;

  if (!name || !email || !password || !cpassword) {
    return res.status(422).json({ error: "Plz filled the field" });
  }

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "email already register" });
    } else if (password != cpassword) {
      return res
        .status(422)
        .json({ error: "Password and confirm passwrod should be same" });
    } else {
      const user = new User({
        name,
        email,
        password,
        cpassword,
      });

      await user.save();

      res.status(201).json({ message: "user data added" });
    }
  } catch (err) {
    console.log(err);
  }
});


//login route 

router.post("/api/login", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Plz filled correct details" });
    }

    const userLogin = await User.findOne({ email: email });

    //console.log(userLogin);

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      token = await userLogin.generateAuthToken();
      console.log(token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 2589200000),
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credentials" });
      } else res.json({ message: "user logged in" });
    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});




//user page

router.get("/api/recipe", authenticate, async (req, res) => {
  try {
    const { query } = req.query;

    // Check if a query is provided
    if (!query) {
      // Fetch all recipes from   Spoonacular API
      const allRecipes = await fetchRecipes(""); // An empty query to fetch all recipes

      // Combine user info and all recipes into a single response
      const responseData = {
        // user: req.rootUser, // User information from authentication
        recipes: allRecipes, // All available recipes
      };

      return res.json(responseData);
    }

    // Fetch recipes based on the query from your data source or Spoonacular API
    const recipes = await fetchRecipes(query);

    // Combine user info and recipes into a single response
    const responseData = {
      // user: req.rootUser, // User information from authentication
      recipes: recipes, // Recipes based on the query
    };

    res.json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Define a route to fetch recipe details
router.get('/api/recipe-details/:id', async (req, res) => {
  const { id } = req.params;
  const apiKey = process.env.SPOONACULAR_API_KEY; // Replace with your API key
  const apiUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// //get user data for home page
// router.get("/recipe", authenticate, (req, res) => {
//   console.log(`recipe`);
//   res.send(req.rootUser);
// });

router.get("/api/logout", (req, res) => {
  console.log(`Hello logout`);
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send(`User Logout`);
});

module.exports = router;
