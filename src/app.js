// DEPENDENCIES
if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// ROUTES
const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");

// ERRORS
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

app.use(cors());
app.use(express.json());

// Route handlers
app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);

// Error handlers
app.use(notFound);
app.use(errorHandler);

module.exports = app;