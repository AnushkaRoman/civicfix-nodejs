const allowedCategories = [
    "Pothole",
    "Streetlight",
    "Garbage",
    "Water Leakage",
    "Footpath",
    "Traffic Sign"
];

const allowedSeverities = [
    "Low",
    "Medium",
    "High",
    "Critical"
];

function validateReport(req, res, next) {
    const {
        name,
        email,
        category,
        location,
        severity,
        description,
        dateObserved
    } = req.body;

    const errors = [];

    // Name
    if (!name || name.trim().length < 3) {
        errors.push(
            "Name must contain at least 3 characters."
        );
    } else if (!/^[A-Za-z ]+$/.test(name.trim())) {
        errors.push(
            "Name can contain only letters and spaces."
        );
    }

    // Email
    if (!email || email.trim() === "") {
        errors.push("Email is required.");
    } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
        errors.push("Please enter a valid email address.");
    }

    // Category
    if (!allowedCategories.includes(category)) {
        errors.push("Please select a valid issue category.");
    }

    // Location
    if (!location || location.trim().length < 5) {
        errors.push(
            "Location must contain at least 5 characters."
        );
    }

    // Severity
    if (!allowedSeverities.includes(severity)) {
        errors.push("Please select a valid severity.");
    }

    // Description
    if (!description || description.trim().length < 20) {
        errors.push(
            "Description must contain at least 20 characters."
        );
    }

    // Date
    if (!dateObserved) {
        errors.push("Date observed is required.");
    }

    // Business rule
    if (
        severity === "Critical" &&
        description &&
        description.trim().length < 50
    ) {
        errors.push(
            "Critical issues require a description of at least 50 characters."
        );
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Report validation failed.",
            errors
        });
    }

    next();
}

module.exports = {
    validateReport
};