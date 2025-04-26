
const express = require("express");
const { getAllGates, addGate, updateGate, deleteGate, addGateMember, deleteGateMember } = require("../controller/gate");

const router = express.Router();

router.get("/Allgates", getAllGates);
router.post("/gates", addGate);
router.post("/gates/update/:id", updateGate);
router.delete("/gates/delete/:id", deleteGate);
router.put("/gates/:id/members", addGateMember);
router.delete("/gates/:gateId/members/:index", deleteGateMember);

module.exports = router;    