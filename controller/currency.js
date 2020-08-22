const { fetchAllTransaction, addTransaction } = require("../model/currency");

exports.getAllTransaction = (req, res, next) => {
  fetchAllTransaction(req.query)
    .then((transaction) => {
      res.status(200).send({ transaction });
    })
    .catch(next);
};

exports.postTransaction = (req, res, next) => {
  const { body } = req;
  addTransaction(body)
    .then((transaction) => {
      res.status(201).send({ transaction });
    })
    .catch(next);
};
