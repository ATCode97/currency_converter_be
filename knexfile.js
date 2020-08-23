const { DATABASE_URL } = process.env;

const ENV = process.env.NODE_ENV || "development";

console.log(`Currently running in ${ENV} environment`);

const baseConfig = {
  client: "pg",
  migrations: {
    directory: "./db/migrations",
  },
  seeds: {
    directory: "./db/seeds",
  },
};

const customConfig = {
  development: {
    connection: {
      database: "dbExchange",
      // user,
      // password
    },
  },
  test: {
    connection: {
      database: "dbExchange_test",
      // user,
      // password
    },
  },
  production: {
    connection: `${DATABASE_URL}?ssl=true`,
  },
};

module.exports = { ...customConfig[ENV], ...baseConfig };

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
