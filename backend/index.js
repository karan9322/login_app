const express = require("express");
const cors = require("cors");

const app = express();
const authRouter = require("./routes/authRouter");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./models/db");

app.use(express.json());
app.use(cors({
  origin: 'https://login-app-ui-wine.vercel.app', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true, 
}));

const PORT = process.env.PORT || 5500;

app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
