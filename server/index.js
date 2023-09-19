require("dotenv").config();
const express = require("express")
const app = express()
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const bodyParser = require('body-parser');


const connectDB = require("./db/connect")
const corsconfig = { origin: true, credentials: true };
app.use(express.json());
app.use(cors(corsconfig));
app.options("*", cors());

app.use(bodyParser.json());
app.use(require("./router/auth"));

const PORT = process.env.PORT || 5000

connectDB(process.env.MONGODB_URI)


app.get('/', (req, res) => {
    res.redirect('/login');
  });

app.get('/login',(req, res) =>{
    res.send("Login Page")
})

app.get("/register", (req, res) => {
    res.send(`User Register`);
  });

app.listen(PORT, () =>{
    console.log("server started at port", PORT)
})