exports.up = function (knex) {
  return knex.schema.createTable("currency", (currencyTable) => {
    currencyTable.increments("transaction_id").primary();
    currencyTable.float("GBP").defaultTo(0);
    currencyTable.string("foreign_currency").notNullable();
    currencyTable.float("amount").defaultTo(0);
    currencyTable.timestamp("exchanged_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("currency");
};
