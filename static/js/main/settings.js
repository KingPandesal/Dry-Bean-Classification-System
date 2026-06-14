document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("password-form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = {
            current_password: document.querySelector("[name='current_password']").value,
            new_password: document.querySelector("[name='new_password']").value,
            confirm_password: document.querySelector("[name='confirm_password']").value
        };

        const res = await fetch("/change-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        showToast(result.message, result.success ? "success" : "error");

        if (result.success) {
            document.querySelector("[name='current_password']").value = "";
            document.querySelector("[name='new_password']").value = "";
            document.querySelector("[name='confirm_password']").value = "";
        }
    });
});