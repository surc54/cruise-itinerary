import express from "express";
import database from "../db.js";
import SqlString from "sqlstring";

const router = express.Router();

router.get("/info", (req, res) => {
    if (!req.session.user) {
        res.send({
            status: "ok",
            isSignedIn: false,
        });
    } else {
        database.query(
            `SELECT * FROM USERS WHERE id="${req.session.user}" LIMIT 1;`,
            (err, results, fields) => {
                if (err) {
                    res.send({
                        status: "fail",
                        error: err.message,
                    });
                    return;
                }

                if (!results || results.length === 0) {
                    req.session.user = null;
                    res.send({
                        status: "ok",
                        isSignedIn: false,
                    });
                    return;
                }

                const user = results[0];

                req.session.user = user.id;

                res.send({
                    status: "ok",
                    isSignedIn: true,
                    user: {
                        username: user.username,
                        display_name: user.display_name,
                    },
                });
            },
        );
    }
});

router.post("/sign-in", (req, res) => {
    const {username} = req.body;

    if (!username) {
        throw new Error('Parameters "username" is required.');
    } else if (!/[A-Za-z0-9]{3,16}/.test(username)) {
        throw new Error('Invalid format for parameter "username".');
    }

    if (!!req.session.user) {
        throw new Error("User is already signed in.");
    }
    console.log(SqlString.escape(username) + " vs " + username);
    database.query(
        `SELECT * FROM USERS WHERE username=${SqlString.escape(
            username,
        )} LIMIT 1;`,
        (err, results, fields) => {
            if (err) {
                res.send({
                    status: "fail",
                    error: err.message,
                });
                return;
            }

            if (!results || results.length === 0) {
                res.send({
                    status: "fail",
                    error: "Username does not exist",
                });
                return;
            }

            const user = results[0];

            req.session.user = user.id;

            res.send({
                status: "ok",
                message: "Logged in successfully.",
                user: {
                    username: user.username,
                    display_name: user.display_name,
                },
            });
        },
    );
});

router.get("/sign-out", (req, res) => {
    req.session.user = null;
    res.send({
        status: "ok",
        message: "Successfully signed out.",
    });
});

router.put("/create", (req, res) => {
    const {username, display_name} = req.body;

    if (!username || !display_name) {
        throw new Error(
            'Parameters "username" and "display_name" are required.',
        );
    } else if (!/[A-Za-z0-9]{3,16}/.test(username)) {
        throw new Error('Invalid format for parameter "username".');
    } else if (!/[A-Za-z\ ]{3,28}/.test(display_name)) {
        throw new Error('Invalid format for parameter "display_name".');
    }

    database.query(
        `SELECT * FROM USERS WHERE username=${SqlString.escape(username)};`,
        (err, results, fields) => {
            if (!results || results.length === 0) {
                database.query(
                    `INSERT INTO USERS(id, username, display_name) VALUES(DEFAULT, ${SqlString.escape(
                        username,
                    )}, ${SqlString.escape(display_name)})`,
                    (err, results, fields) => {
                        res.send({
                            status: "ok",
                            message: "Created user.",
                            user: {
                                username: username,
                                display_name: display_name,
                            },
                        });
                    },
                );
            } else {
                res.send({
                    status: "ok",
                    message: "User already exists.",
                });
            }
        },
    );
});

export default router;
