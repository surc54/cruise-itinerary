import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
    res.send("");
});

router.put("/create", (req, res) => {
    const {destination} = req.body;

    if (!destination) {
        throw new Error("Parameter 'destination' is not specified.");
    }

    res.send("u pretty good my " + destination);
});

export default router;
