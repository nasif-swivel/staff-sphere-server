const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config({ path: "./config.env" });

const app = express();
const port = process.env.PORT || 5000;

// Swagger configuration
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Staff Sphere API",
      version: "1.0.0",
      description: "API documentation for Staff Sphere",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./src/routes/index.js"],
};
const specs = swaggerJsdoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL, {
    dbName: "staff-sphere",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

// Routes
const routes = require("./src/routes");
app.use(routes);

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
