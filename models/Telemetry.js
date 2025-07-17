const mongoose = require("mongoose");

const telemetrySchema = new mongoose.Schema({
  imei: { type: String, required: true },
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
  speed: { type: Number, required: true },
  timestamp: { type: Date, required: true },
});

module.exports = mongoose.model("Telemetry", telemetrySchema);
