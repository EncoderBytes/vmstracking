const Telemetry = require("../models/Telemetry");

// Save telemetry from parsed Teltonika data
const saveTelemetry = async (parsedData) => {
  try {
    const gps = parsedData.records[0].gps;

    const telemetry = new Telemetry({
      imei: parsedData.imei,
      lat: gps.latitude,
      lon: gps.longitude,
      speed: gps.speed,
      timestamp: new Date(parsedData.records[0].timestamp),
    });

    await telemetry.save();
    console.log("✅ Saved telemetry for", parsedData.imei);
  } catch (err) {
    console.error("❌ Failed to save telemetry:", err.message);
  }
};

// Get all telemetry data
const getAllTelemetry = async (req, res) => {
  try {
    const data = await Telemetry.find().sort({ timestamp: -1 });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get telemetry data by IMEI
const getTelemetryByIMEI = async (req, res) => {
  try {
    const data = await Telemetry.find({ imei: req.params.imei }).sort({ timestamp: -1 });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  saveTelemetry,
  getAllTelemetry,
  getTelemetryByIMEI,
};
