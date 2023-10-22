const mysql = require('mysql2');

const kopplaTillDatabase = mysql.createConnection({
  host: "localhost",
  user: "dbadm",
  password: "P@ssw0rd",
  database: "project"
});

kopplaTillDatabase.connect((err) => {
  if (err) {
    console.error("Det gick inte att ansluta till databasen!" + err.stack);
    process.exit(1);
  }
  console.log("Ansluten till databasen");
});

module.exports = kopplaTillDatabase;
