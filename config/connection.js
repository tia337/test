require('dotenv').load()

const pgp = require('pg-promise')({});
const conString = "postgres://jwzfdxnm:CndUYZwKDcRrBUXoCLlKWg2v4YMW7uYA@stampy.db.elephantsql.com:5432/jwzfdxnm"
const DB = pgp(conString);

module.exports = DB;