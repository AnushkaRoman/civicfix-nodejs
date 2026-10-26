const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/reports.json");

function readReports() {
    try {
        const data = fs.readFileSync(dataPath, "utf8");

        if (!data.trim()) {
            return [];
        }

        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading reports:", error);
        return [];
    }
}

function saveReports(reports) {
    fs.writeFileSync(
        dataPath,
        JSON.stringify(reports, null, 2)
    );
}

function getAllReports() {
    return readReports();
}

function getReportById(id) {
    const reports = readReports();

    return reports.find(report => report.id === id);
}

function createReport(report) {
    const reports = readReports();

    reports.push(report);

    saveReports(reports);

    return report;
}

function updateReport(id, updates) {
    const reports = readReports();

    const index = reports.findIndex(
        report => report.id === id
    );

    if (index === -1) {
        return null;
    }

    reports[index] = {
        ...reports[index],
        ...updates
    };

    saveReports(reports);

    return reports[index];
}

module.exports = {
    getAllReports,
    getReportById,
    createReport,
    updateReport
};