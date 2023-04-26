// Require necessary libraries
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const apiRouter = require('./routes/api');

require('dotenv').config();

// Create an instance of the Express app
const app = express();

// Connect to MongoDB
let mongoDB = process.env.MONGO_URI_DEV;

// If in prod environment, use prod database
if (process.env.NODE_ENV === "production") {
    mongoDB = process.env.MONGO_URI;
}

const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
})
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
});

// Set up middleware
app.use(morgan('dev')); // logs requests to the console
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.use("/api", apiRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});