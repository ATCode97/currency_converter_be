const apiRouter = require("express").Router();
const currencyRouter = require("./currencyRouter");

apiRouter.route("/");

apiRouter.use("/currencyhistory", currencyRouter);

module.exports = apiRouter;
