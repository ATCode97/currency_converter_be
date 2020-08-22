const currencyRouter = require("express").Router();
const { handle405s } = require("../errors");

const {
  getAllTransaction,
  postTransaction,
} = require("../controller/currency");

currencyRouter
  .route("/")
  .get(getAllTransaction)
  .post(postTransaction)
  .all(handle405s);

module.exports = currencyRouter;
