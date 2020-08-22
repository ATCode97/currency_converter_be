const connection = require("../db/connection");

exports.fetchAllTransaction = ({
  sort_by = "exchanged_at",
  order = "desc",
}) => {
  return connection
    .select("*")
    .from("currency")
    .orderBy(sort_by, order)
    .then((transactions) => {
      return transactions;
    });
};

exports.addTransaction = (transaction) => {
  return connection
    .from("currency")
    .insert(transaction)
    .returning("*")
    .then((transaction) => {
      return transaction[0];
    });
};