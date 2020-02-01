import mysql from "mysql";
import keys from "./config/keys.js";

const database = mysql.createConnection(keys.database);

export default database;
