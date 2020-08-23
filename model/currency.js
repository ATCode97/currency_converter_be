const connection = require("../db/connection");

exports.fetchAllTransaction = ({
  sort_by = "exchanged_at",
  order = "desc",
}) => {
  return connection
    .select("*")
    .from("tblCurrency")
    .orderBy(sort_by, order)
    .returning("*")
    .then((transactions) => {
      return transactions;
    });
};

exports.addTransaction = (transaction) => {
  return connection
    .from("tblCurrency")
    .insert(transaction)
    .returning("*")
    .then((transaction) => {
      return transaction[0];
    });
};
