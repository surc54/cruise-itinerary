import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import "colors";
import routers from "./routes/index.js";
import database from "./db.js";

const PORT = 80;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan("dev"));

database.connect(err => {
    if (err) {
        console.error("ERROR".bgRed.black + " Could not connect to database.");
        console.log(err);
        process.exit(1);
        return;
    }

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
