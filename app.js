const dotenv = require("dotenv");
const path = require("path");

const {connect} = require('./src/configs/mongodbConnection')
const routes = require("./src/startups/routes")

const express = require("express");
const cors = require("cors");
const app = express();

dotenv.config({ path: path.join(__dirname, ".env") });

// Middleware for parsing request bodies and enabling CORS
 const errorHandler = require("./src/middlewares/error");
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "100mb", extended: true }));
app.use(cors());

// Middleware to log URL and request type
app.use((req, res, next) => {
  const fullUrl = `${req.protocol}://${req.headers.host}${req.originalUrl}`;
  console.log(`|Full-URL,  Request-Type|   ::   |${fullUrl},  ${req.method}|`);
  next();
}); 

routes(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, async() => {
    await connect()
    console.log("Server is running")
});

app.use(errorHandler);
