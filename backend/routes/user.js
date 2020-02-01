import express from "express";
import database from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("fuck");
});

router.get("/create", (req, res) => {
    const {} = req.body;
    database.query(
        'SELECT * FROM USERS WHERE username="surc";',
        (err, results, fields) => {
            if (!results || results.length === 0) {
                database.query(
                    `INSERT INTO USERS(id, username, display_name) VALUES(DEFAULT, "surc", "Adithya Haridas")`,
                    (err, results, fields) => {
                        res.send({
                            status: "ok",
                            message: "Inserted user.",
                            results,
                            fields,
                        });
                    },
                );
            } else {
                res.send({
                    status: "ok",
                    message: "User already exists.",
                    results,
                    fields,
                });
            }
        },
    );
});

router.get;

export default router;
