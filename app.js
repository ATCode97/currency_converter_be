const express = require("express");
const apiRouter = require("./routes/apiRouter");
const app = express();
const {
  handle500s,
  handleInvalidPaths,
  handle400s,
  handle422s,
} = require("./errors");

app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", handleInvalidPaths);

app.use(handle400s);

app.use(handle422s);

app.use(handle500s);

module.exports = app;
