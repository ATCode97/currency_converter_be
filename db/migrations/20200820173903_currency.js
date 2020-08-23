exports.up = function (knex) {
  return knex.schema.createTable("tblCurrency", (tblCurrencyTable) => {
    tblCurrencyTable.increments("transaction_id").primary();
    tblCurrencyTable.float("GBP").defaultTo(0);
    tblCurrencyTable.string("foreign_currency").notNullable();
    tblCurrencyTable.float("amount").defaultTo(0);
    tblCurrencyTable.timestamp("exchanged_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tblCurrency");
};
