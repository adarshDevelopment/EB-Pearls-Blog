const express = require("express");
const router = require("./router.config");
require("./mongodb.config");

const app = express();

// middleware to parese x-www-urlencoded values and extended to accept nested objects
app.use(express.urlencoded({ extended: true }));

app.use(router);

// handler function to throw error message for non existent end points
app.use((req, res, next) => {
  next({
    code: 404,
    status: "NOT_FOUND",
    message: "Resource not found",
  });
});


// error catching middleware
app.use((err, req, res, next) => {
  // console.log('exception: ', err);
  const message = err.message || "Server Error";
  const code = err.code || 500;
  const details = err.detail || null;
  const status = err.status || "Failed";

  res.status(500).json({
    message,
    details,
    status,
  });
});

module.exports = app;
