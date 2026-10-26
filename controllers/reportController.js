const {
    getAllReports,
    getReportById,
    createReport,
    updateReport
} = require("../models/reportModel");

const {
    calculatePriority
} = require("../services/priorityService");

function generateReportId() {
    const randomNumber = Math.floor(
        10000 + Math.random() * 90000
    );

    return `CF-${randomNumber}`;
}

// GET /api/reports
function getReports(req, res) {
    const reports = getAllReports();

    res.json({
        success: true,
        count: reports.length,
        reports
    });
}

// GET /api/reports/:id
function getSingleReport(req, res) {
    const report = getReportById(req.params.id);

    if (!report) {
        return res.status(404).json({
            success: false,
            message: "Report not found."
        });
    }

    res.json({
        success: true,
        report
    });
}

// POST /api/reports
function createNewReport(req, res) {
    const {
        name,
        email,
        category,
        location,
        severity,
        description,
        dateObserved
    } = req.body;

    const priority = calculatePriority(
        severity,
        category
    );

    const report = {
        id: generateReportId(),
        name: name.trim(),
        email: email.trim(),
        category,
        location: location.trim(),
        severity,
        description: description.trim(),
        dateObserved,
        priority,
        status: "Reported",
        createdAt: new Date().toISOString()
    };

    createReport(report);

    res.status(201).json({
        success: true,
        message: "Civic issue reported successfully.",
        report
    });
}

// PATCH /api/reports/:id/status
function updateReportStatus(req, res) {
    const { status } = req.body;

    const allowedStatuses = [
        "Reported",
        "Verified",
        "Assigned",
        "In Progress",
        "Resolved"
    ];

    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
            success: false,
            message: "Invalid status."
        });
    }

    const updatedReport = updateReport(
        req.params.id,
        { status }
    );

    if (!updatedReport) {
        return res.status(404).json({
            success: false,
            message: "Report not found."
        });
    }

    res.json({
        success: true,
        message: "Report status updated successfully.",
        report: updatedReport
    });
}

module.exports = {
    getReports,
    getSingleReport,
    createNewReport,
    updateReportStatus
};