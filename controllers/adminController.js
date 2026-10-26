const {
    getAllReports
} = require("../models/reportModel");

function getDashboardStats(req, res) {
    const reports = getAllReports();

    const stats = {
        total: reports.length,

        reported: reports.filter(
            r => r.status === "Reported"
        ).length,

        verified: reports.filter(
            r => r.status === "Verified"
        ).length,

        assigned: reports.filter(
            r => r.status === "Assigned"
        ).length,

        inProgress: reports.filter(
            r => r.status === "In Progress"
        ).length,

        resolved: reports.filter(
            r => r.status === "Resolved"
        ).length,

        urgent: reports.filter(
            r => r.priority === "URGENT"
        ).length
    };

    res.json({
        success: true,
        stats
    });
}

module.exports = {
    getDashboardStats
};