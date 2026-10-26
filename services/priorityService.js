function calculatePriority(severity, category) {
    let score = 0;

    // Severity score
    if (severity === "Critical") {
        score += 10;
    } else if (severity === "High") {
        score += 7;
    } else if (severity === "Medium") {
        score += 4;
    } else {
        score += 1;
    }

    // Category score
    if (category === "Water Leakage") {
        score += 3;
    }

    if (category === "Pothole") {
        score += 2;
    }

    if (category === "Traffic Sign") {
        score += 2;
    }

    if (score >= 10) {
        return "URGENT";
    }

    if (score >= 6) {
        return "HIGH";
    }

    if (score >= 3) {
        return "MEDIUM";
    }

    return "LOW";
}

module.exports = {
    calculatePriority
};