const environment = process.env.NODE_ENV || "development";
// knex file path that gets configuration for current environment
const config = require("../../knexfile")[environment];
// brings in knex library
const knex = require("knex")(config);

module.exports = knex;