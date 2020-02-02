import express from "express";
import userRouter from "./user.js";
import itineraryRouter from "./itinerary.js";
import testRouter from "./test.js";
import stopsRouter from "./stops.js";

const router = express.Router();

router.use("/user", userRouter);
router.use("/itinerary", itineraryRouter);
router.use("/test", testRouter);
router.use("/stops", stopsRouter);

export default router;
