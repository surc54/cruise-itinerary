import express from "express";
import SqlString from "sqlstring";
import db, {query} from "../db.js";

const router = express.Router();

router.put("/", (req, res) => {
    let {itineraryId, timeStart, timeEnd, name} = req.body;

    if (!itineraryId || !timeStart || !timeEnd || !name) {
        throw new Error(
            'Parameters "itineraryId", "timeStart", "name", and "timeEnd" are required.',
        );
    }

    if (!req.session.user) {
        throw new Error("Action requires user to be logged in.");
    }

    query(`INSERT INTO STOPS(itinerary_id, time_start, time_end, name)
        VALUES(${SqlString.escape(Number(itineraryId))}, ${SqlString.escape(
        timeStart,
    )}, ${SqlString.escape(timeEnd)}, ${SqlString.escape(name)});`)
        .then(results => {
            res.json({
                status: "ok",
                stop: {
                    itinerary_id: itineraryId,
                    time_start: timeStart,
                    time_end: timeEnd,
                    name: name,
                },
            });
        })
        .catch(err => {
            res.json({
                status: "fail",
                message: err.message || "unknown error",
            });
        });
});

router.delete("/:id", (req, res) => {
    const {id} = req.params;

    if (!id) {
        throw 'no "id", no service';
    }

    query(`DELETE FROM STOPS WHERE id=${id};`)
        .then(results => {
            res.json({
                status: "ok",
                message: "Query complete",
            });
        })
        .catch(err => {
            res.json({
                status: "fail",
                message: err.message || "unknown error",
            });
        });
});

router.get("/", (req, res) => {
    if (!req.session.user) {
        throw new Error("Action requires user to be logged in.");
    }

    const {itineraryId} = req.query;

    if (!itineraryId) {
        throw new Error("You need the itineraryId.");
    }

    query(`
        SELECT s.id, s.time_start, s.time_end, s.name, s.applied
        FROM STOPS AS s INNER JOIN ITINERARIES as i ON s.itinerary_id = i.id
        WHERE i.user_id = ${req.session.user};
    `)
        .then(results => {
            res.json(results);
        })
        .catch(err => {
            res.json({
                status: "fail",
                message: err.message || "unknown error",
            });
        });
});

export default router;
