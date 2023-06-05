// Require necessary libraries
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const createError = require("http-errors");
const apiRouter = require("./routes/api");
const cors = require('cors');
const compression = require("compression");
const helmet = require("helmet");
const userRouter = require("./routes/user");

require("dotenv").config();

// Create an instance of the Express app
const app = express();

// Connect to MongoDB
let mongoDB = process.env.MONGO_URI_DEV;

// If in prod environment, use prod database
if (process.env.NODE_ENV === "production") {
  mongoDB = process.env.MONGO_URI;
}

mongoose
  .connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
});

// Set up rate limiter: maximum of 60 requests per minute
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // limit each IP to 60 requests per minute
  message: 'Too many requests, please try again later.',
});
// Apply rate limiter to all requests
app.use(limiter);

app.use(compression()); // Compress all routes
app.use(helmet());

app.use(cors());

// Allow only selected frontends
// if (process.env.ALLOWED_ORIGINS) {
//   const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');

//   app.use(cors({
//     origin: function (origin, callback) {
//       // Check if the origin is allowed
//       if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     }
//   }));
// }

// Set up middleware
app.use(morgan("dev")); // logs requests to the console
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.use("/user", userRouter);
app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
