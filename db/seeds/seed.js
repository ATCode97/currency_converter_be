const { currencyData } = require("../data/index.js");

const { formatDates } = require("../utils/utils");

exports.seed = function (knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      const formattedCurrency = formatDates(currencyData);
      return knex.insert(formattedCurrency).into("tblCurrency").returning("*");
    });
};
