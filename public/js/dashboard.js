async function loadDashboard() {

    try {

        const statsResponse =
            await fetch("/api/admin/stats");

        const statsResult =
            await statsResponse.json();

        const stats = statsResult.stats;

        document.getElementById("total").textContent =
            stats.total;

        document.getElementById("reported").textContent =
            stats.reported;

        document.getElementById("verified").textContent =
            stats.verified;

        document.getElementById("inProgress").textContent =
            stats.inProgress;

        document.getElementById("resolved").textContent =
            stats.resolved;

        document.getElementById("urgent").textContent =
            stats.urgent;


        const reportsResponse =
            await fetch("/api/reports");

        const reportsResult =
            await reportsResponse.json();

        const reports =
            reportsResult.reports;

        const reportsContainer =
            document.getElementById("reports");

        if (reports.length === 0) {

            reportsContainer.innerHTML =
                "<p>No reports available.</p>";

            return;
        }

        reportsContainer.innerHTML =
            reports
                .slice()
                .reverse()
                .map(report => `
                    <div class="report-item">

                        <h3>
                            ${report.id} —
                            ${report.category}
                        </h3>

                        <p>
                            ${report.description}
                        </p>

                        <p>
                            <strong>Location:</strong>
                            ${report.location}
                        </p>

                        <p>
                            <strong>Priority:</strong>
                            ${report.priority}
                        </p>

                        <span class="badge">
                            ${report.status}
                        </span>

                    </div>
                `)
                .join("");

    } catch (error) {

        console.error(error);

        document.getElementById("reports").innerHTML =
            "<p>Unable to load dashboard data.</p>";
    }
}

loadDashboard();