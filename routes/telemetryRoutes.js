const express = require("express");
const router = express.Router();
const {
  getAllTelemetry,
  getTelemetryByIMEI,
} = require("../controllers/telemetryController");

// GET all telemetry
router.get("/", getAllTelemetry);

// GET telemetry by IMEI
router.get("/:imei", getTelemetryByIMEI);

module.exports = router;
