import express from "express";
import axios from "axios";

import keys from "../config/keys.js";

const router = express.Router();

let API =
    "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=";

let search = "example%20building%20"; // always follow this format, need to format request for this for google API

let requests = "&inputtype=textquery&fields=name,formatted_address"; // add more fields for more results from google

router.get("/", (req, res) => {
    let urlForAPI =
        API + encodeURIComponent(req.query.search) + requests + keys.APIKey;

    axios
        .get(urlForAPI) // put url when ready
        .then(
            response => {
                if (response.data.status === "ZERO_RESULTS") {
                    res.send({
                        status: "ok",
                        length: 0,
                        info: [],
                    });
                } else {
                    res.send({
                        status: "ok",
                        length: response.data.candidates.length,
                        info: response.data.candidates || [],
                    });
                }
            },
            err => {
                if (err) {
                    console.log(err);
                    res.status(500).send({
                        status: "ok",
                        message: err || "unknown error",
                    });
                }
            },
        );
});

export default router;
