const express = require("express");
const app = express();
require("dotenv").config();
require("./models/db");
const AuthRouter = require("./routers/authRouter");
const ProductRouter = require("./routers/productRouter");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

app.use(express.static(path.join(__dirname, "build"))); // put this line of code in app.js

app.use(bodyParser.json());

app.use(cors());

app.use("/auth", AuthRouter);
app.use("/products", ProductRouter);
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
