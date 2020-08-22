const apiRouter = require("express").Router();
const currencyRouter = require("./currencyRouter");
const { getEndPointsInfo } = require("../controller/api");
const { handle405s } = require("../errors");

apiRouter.route("/").get(getEndPointsInfo);

apiRouter.use("/currencyhistory", currencyRouter);

module.exports = apiRouter;
