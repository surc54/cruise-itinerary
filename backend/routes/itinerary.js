import express from "express";
import SqlString from "sqlstring";
import db, {query} from "../db.js";

const router = express.Router();

router.get("/latest", (req, res) => {
    if (!req.session.user) {
        throw new Error("Action requires user to be logged in.");
    }

    query(`SELECT id FROM ITINERARIES ORDER BY id DESC LIMIT 1`)
        .then(results => {
            res.json({id: results[0].id});
        })
        .catch(err => res.json({err: err.messsage || "unknown error"}));
});

router.put("/", async (req, res) => {
    let {destination, arrivalTime, departureTime} = req.body;

    if (!destination || !arrivalTime || !departureTime) {
        throw new Error(
            'Parameters "destination", "arrivalTime", and "departureTime" are required.',
        );
    }

    if (!req.session.user) {
        throw new Error("Action requires user to be logged in.");
    }

    try {
        const saveDest = await query(`INSERT INTO DESTINATIONS(name, arrival_time, departure_time)
                VALUES(${SqlString.escape(destination)}, ${SqlString.escape(
            arrivalTime,
        )}, ${SqlString.escape(departureTime)});`);

        const saveItin = await query(`INSERT INTO ITINERARIES(user_id, destination_id)
                VALUES(${req.session.user}, ${saveDest.insertId});`);

        res.send({
            status: "ok",
            message: "Created successfully.",
            itinerary: {
                id: saveItin.insertId,
                destination: {
                    name: destination,
                    arrival_time: arrivalTime,
                    departure_time: departureTime,
                },
            },
        });
    } catch (e) {
        res.json({
            status: "fail",
            message: e.message || "unknown error",
        });
    }
});

router.get("/", (req, res) => {
    if (!req.session.user) {
        throw new Error("Action requires user to be logged in.");
    }

    query(`SELECT display_name, d.name AS destination, arrival_time, departure_time, i.id as id
    FROM (ITINERARIES as i inner join USERS on i.user_id = USERS.id) inner join DESTINATIONS as d ON d.id = i.destination_id
    WHERE USERS.id = ${req.session.user};`).then(results => {
        res.json(results);
    });
});

router.get("/details", (req, res) => {
    if (!req.session.user) {
        throw new Error("Action requires user to be logged in.");
    }

    const {itineraryId} = req.query;

    if (!itineraryId) throw new Error("no id, no service");

    query(`SELECT arrival_time, departure_time, d.name AS destination FROM
    (ITINERARIES as i inner join USERS on i.user_id=USERS.id) inner join DESTINATIONS as d on d.id = i.destination_id WHERE i.id = ${itineraryId};`).then(
        result => res.json(result[0]),
    );

    // query(`SELECT display_name, d.name AS destination, arrival_time, departure_time, i.id as id
    // FROM (ITINERARIES as i inner join USERS on i.user_id = USERS.id) inner join DESTINATIONS as d ON d.id = i.destination_id
    // WHERE USERS.id = ${req.session.user};`).then(results => {
    //     res.json(results);
    // });
});

export default router;
