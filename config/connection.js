require('dotenv').load()

const pgp = require('pg-promise')({});
const conString = "yourDB"
const DB = pgp(conString);

module.exports = DB;
//for test purposes you can use postgres://jwzfdxnm:CndUYZwKDcRrBUXoCLlKWg2v4YMW7uYA@stampy.db.elephantsql.com:5432/jwzfdxnm
