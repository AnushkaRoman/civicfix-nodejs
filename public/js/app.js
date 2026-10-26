const form = document.getElementById("reportForm");
const messageBox = document.getElementById("message");

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    messageBox.innerHTML = `
        <div class="alert">
            Submitting your report...
        </div>
    `;

    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());

    console.log("Data being sent:", data);

    try {

        const response = await fetch("/api/reports", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)
        });

        console.log("Server response status:", response.status);

        const result = await response.json();

        console.log("Server response:", result);

        if (!response.ok) {

            messageBox.innerHTML = `
                <div class="alert error">

                    <strong>
                        Submission failed
                    </strong>

                    <ul>
                        ${
                            result.errors
                                ? result.errors
                                    .map(error => `<li>${error}</li>`)
                                    .join("")
                                : `<li>${result.message}</li>`
                        }
                    </ul>

                </div>
            `;

            return;
        }

        messageBox.innerHTML = `
            <div class="alert success">

                <strong>
                    Report submitted successfully!
                </strong>

                <p>
                    Report ID:
                    <strong>${result.report.id}</strong>
                </p>

                <p>
                    Priority:
                    <strong>${result.report.priority}</strong>
                </p>

                <p>
                    Status:
                    <strong>${result.report.status}</strong>
                </p>

            </div>
        `;

        form.reset();

    } catch (error) {

        console.error(
            "Connection error:",
            error
        );

        messageBox.innerHTML = `
            <div class="alert error">

                <strong>
                    Unable to connect to the server.
                </strong>

                <p>
                    Please make sure the Node.js server
                    is running on port 3000.
                </p>

            </div>
        `;
    }

});