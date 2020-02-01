import express from "express";
import Axios from "axios";

import keys from "../config/keys.js"

const router = express.Router();

let API = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=";

let search = "example%20building%20";   // always follow this format, need to format request for this for google API

let requests = "&inputtype=textquery&fields=name,formatted_address"; // add more fields for more results from google

router.get("/", (req, res) => {
    
    let urlForAPI = API + encodeURIComponent(req.query.search) + requests + keys.APIKey;

    Axios.get(urlForAPI) // put url when ready
        .then(
            response => { 
                console.log(response.data)
                res.send({
                    status: "ok",
                    info: response.data
                })  
            },
            err => {
                if(err){
                    console.log(err);
                } 
            }

    );
});

export default router;
