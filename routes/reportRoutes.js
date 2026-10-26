const express = require("express");

const router = express.Router();

const {
    getReports,
    getSingleReport,
    createNewReport,
    updateReportStatus
} = require("../controllers/reportController");

const {
    validateReport
} = require("../middleware/validation");

// GET all reports
router.get("/", getReports);

// GET one report
router.get("/:id", getSingleReport);

// POST new report
router.post("/", validateReport, createNewReport);

// PATCH report status
router.patch("/:id/status", updateReportStatus);

module.exports = router;