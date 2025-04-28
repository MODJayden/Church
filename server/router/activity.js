
const express = require("express");
const router = express.Router();
const { createActivity, getAllActivities, getActivityById, updateActivity, deleteActivity } = require("../controller/activity");

router.post("/create", createActivity);
router.get("/all", getAllActivities);
router.get("/get/:id", getActivityById);
router.put("/update/:id", updateActivity);
router.delete("/delete/:id", deleteActivity);

module.exports = router;