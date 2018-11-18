const DB = require("../config/connection");
const hasher = require("../config/hasher");

testUser = {
  name: "Ilya",
  password: "pass",
  email: "info@gmail.com"
};

function addUser(user) {
  console.log(user);
  if (user == null) return console.log("User is null");
  return DB.none(
    "INSERT INTO users(name, password, email) VALUES($1, $2, $3)",
    [user.name, hasher.passwordHash(user.password), user.email]
  );
}

function getAllFromTable(tableName) {
  return DB.any("SELECT * FROM " + tableName);
}

function removeTable(tableName) {
  return DB.any("DROP TABLE " + tableName);
}

function getByUserId(id) {
  return DB.any("SELECT id, name, email FROM users WHERE id = ($1)", [id]);
}

function getUserByEmailAndPasshash(email, passHash) {
  return DB.any(
    "SELECT id, name, email FROM users WHERE email = ($1) AND password = ($2)",
    [email, passHash]
  );
}

function getUserByName(name) {
  return DB.any(
    "SELECT id, name, email FROM users WHERE name = ($1)", [name]
  );
}

function getUserByEmail(email) {
  return DB.any(
    "SELECT id, name, email FROM users WHERE email = ($1)", [email]
  );
}

getUserByEmail

function removeUserById(id) {
  return DB.any("DELETE FROM users WHERE id = ($1)", [id]);
}

module.exports = {
  addUser,
  getAllFromTable,
  removeTable,
  getByUserId,
  getUserByEmailAndPasshash,
  removeUserById,
  getUserByName,
  getUserByEmail
};

// removeTable('users').then(()=>{})
// getAllFromTable("users").then(data => {
//   console.log(data);
// });
// addUser(user)/*  */;
// getUserByLoginAndPasshash('Ilya', 'pass').then((data)=>{console.log(data)})
// removeUserById('e5467f03-0bdf-4054-b26a-99b360018d32').then((data)=>{console.log(data)});
