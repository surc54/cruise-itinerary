import mysql from "mysql";
import keys from "./config/keys.js";

const database = mysql.createConnection(keys.database);

export default database;

export const query = queryString =>
    new Promise((resolve, reject) => {
        database.query(queryString, (err, res, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
