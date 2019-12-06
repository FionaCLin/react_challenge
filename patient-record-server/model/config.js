let db =
  process.env.NODE_ENV == "dev"
  ? "hospital_waitinglist_dev"
  : "hospital_waitinglist_test"

  module.exports = {
  connection_string: `mongodb://localhost:27017/${db}`,
  database: db
};
