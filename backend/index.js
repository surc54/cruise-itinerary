import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import "colors";
import routers from "./routes/index.js";
import database from "./db.js";
import session from "express-session";
import keys from "./config/keys.js";

const PORT = 80;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(
    session({
        secret: keys.cookie,
        resave: true,
        saveUninitialized: true,
    }),
);

app.use(morgan("dev"));

app.use((req, res, next) => {
    req.session.user = 1;
    next();
});

database.connect(err => {
    if (err) {
        console.error("ERROR".bgRed.black + " Could not connect to database.");
        console.log(err);
        process.exit(1);
        return;
    }

    // database.query(
    //     `CREATE TABLE DESTINATIONS(
    //     id INT AUTO_INCREMENT PRIMARY KEY,
    //     name VARCHAR(64) NOT NULL,
    //     picture VARCHAR(512) DEFAULT NULL,
    //     address VARCHAR(128) DEFAULT NULL,
    //     arrival_time VARCHAR(32) NOT NULL,
    //     departure_time VARCHAR(32) NOT NULL
    // )`,
    //     () =>
    //         database.query(
    //             `CREATE TABLE ITINERARIES(
    //     id INT AUTO_INCREMENT PRIMARY KEY,
    //     user_id INT NOT NULL,
    //     destination_id INT NOT NULL,
    //     FOREIGN KEY (user_id) REFERENCES USERS(id),
    //     FOREIGN KEY (destination_id) REFERENCES DESTINATIONS(id)
    // )`,
    //             () =>
    //                 database.query(`CREATE TABLE STOPS(
    //                     id INT AUTO_INCREMENT PRIMARY KEY,
    //     itinerary_id INT NOT NULL,
    //     time_start VARCHAR(32) NOT NULL,
    //     time_end VARCHAR(32) NOT NULL,
    //     FOREIGN KEY (itinerary_id) REFERENCES ITINERARIES(id)
    // )`),
    //         ),
    // );

    console.log("Successfully connected to the database.".green);
});

app.use(routers);

app.use((req, res) => {
    res.status(404).send({
        status: "fail",
        error: "Page not found",
    });
});

app.use((err, req, res, next) => {
    res.send({
        status: "fail",
        error:
            err.message || (typeof err === "string" && err) || "Unknown error",
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${String(PORT).yellow}.`);
});
