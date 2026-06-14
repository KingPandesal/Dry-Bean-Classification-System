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

        showToast(result.message, result.status);

        if (result.success) {
            document.querySelector("[name='current_password']").value = "";
            document.querySelector("[name='new_password']").value = "";
            document.querySelector("[name='confirm_password']").value = "";
        }
    });
});

document.getElementById("profile-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.target;

    const data = {
        name: form.name.value,
        username: form.username.value,
        email: form.email.value
    };

    const res = await fetch("/account/update-profile", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await res.json();

    showToast(result.message, result.status);
});

const avatarBtn = document.getElementById("avatar-btn");
const avatarInput = document.getElementById("avatar-input");

avatarBtn.addEventListener("click", () => {
    avatarInput.click();
});

avatarInput.addEventListener("change", async () => {
    const file = avatarInput.files[0];

    const formData = new FormData();
    formData.append("avatar", file);

    const res = await fetch("/account/upload-avatar", {
        method: "POST",
        body: formData
    });

    const result = await res.json();

    showToast(result.message, result.status);

    if (result.status === "success") {
        // optional instant UI update
        document.querySelector(".avatar-img").src = result.avatar_url;
    }
});