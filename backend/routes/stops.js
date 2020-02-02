import express from "express";
import SqlString from "sqlstring";
import db, {query} from "../db.js";

const router = express.Router();

router.put("/", (req, res) => {
    let {itineraryId, timeStart, timeEnd, name, address} = req.body;
    console.log(req.body);

    if (!itineraryId || !timeStart || !timeEnd || !name || !address) {
        throw new Error(
            'Parameters "itineraryId", "timeStart", "name", "address", and "timeEnd" are required.',
        );
    }

    if (!req.session.user) {
        throw new Error("Action requires user to be logged in.");
    }

    query(`INSERT INTO STOPS(itinerary_id, time_start, time_end, name, applied, address)
        VALUES(${SqlString.escape(Number(itineraryId))}, ${SqlString.escape(
        timeStart,
    )}, ${SqlString.escape(timeEnd)}, ${SqlString.escape(
        name,
    )}, 1, ${SqlString.escape(address)});`)
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
            console.error(err.message || "unknown error");
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
        SELECT s.id, i.id as iterId, s.address, s.time_start as startTime, s.time_end as endTime, s.name, s.applied
        FROM STOPS AS s INNER JOIN ITINERARIES as i ON s.itinerary_id = i.id
        WHERE i.user_id = ${req.session.user} AND i.id = ${itineraryId};
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
