function showToast(message, category) {
    const container = document.getElementById("toast-container");
    
    if (!container) {
        console.error("Toast container not found");
        return;
    }

    const isSuccess = category === "success";

    const toastEl = document.createElement("div");
    toastEl.className = `flex items-start gap-3 min-w-[280px] max-w-sm px-4 py-3 rounded-xl shadow-xl text-sm border
        ${isSuccess 
            ? 'bg-green-50 border-green-300 text-green-900' 
            : 'bg-red-50 border-red-300 text-red-900'
        }`;

    toastEl.innerHTML = `
        <div class="mt-0.5">
            ${isSuccess 
                ? '<svg class="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>'
                : '<svg class="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>'
            }
        </div>
        <div class="flex-1 font-medium">
            ${message}
        </div>
    `;

    container.appendChild(toastEl);

    setTimeout(() => {
        toastEl.remove();
    }, 4000);
}

function validatePasswordRequirements() {
    const passwordInput = document.getElementById("new-password-input");
    const passwordFeedback = document.getElementById("password-feedback");

    const checks = {
        length: { element: document.getElementById("check-length"), icon: document.getElementById("icon-length"), test: (pwd) => pwd.length >= 8 },
        upper: { element: document.getElementById("check-upper"), icon: document.getElementById("icon-upper"), test: (pwd) => /[A-Z]/.test(pwd) },
        letter: { element: document.getElementById("check-letter"), icon: document.getElementById("icon-letter"), test: (pwd) => /[a-zA-Z]/.test(pwd) },
        number: { element: document.getElementById("check-number"), icon: document.getElementById("icon-number"), test: (pwd) => /\d/.test(pwd) },
        special: { element: document.getElementById("check-special"), icon: document.getElementById("icon-special"), test: (pwd) => /[!@#$%^&*(),.?":{}|<>_\-\\/]/.test(pwd) }
    };

    function updatePasswordFeedback() {
        const password = passwordInput.value;

        if (password.length === 0) {
            passwordFeedback.classList.add("hidden");
            return;
        }

        passwordFeedback.classList.remove("hidden");

        Object.keys(checks).forEach(key => {
            const check = checks[key];
            const passed = check.test(password);

            if (passed) {
                check.element.classList.remove("bg-red-50", "border-red-200");
                check.element.classList.add("bg-green-50", "border-green-200");
                check.icon.classList.remove("bg-slate-200", "text-slate-400", "bg-red-200", "text-red-600");
                check.icon.classList.add("bg-green-200", "text-green-600");
                check.icon.textContent = "✓";
                check.element.querySelector("span:last-child").classList.remove("text-red-600");
                check.element.querySelector("span:last-child").classList.add("text-green-600");
            } else {
                check.element.classList.add("bg-red-50", "border-red-200");
                check.element.classList.remove("bg-green-50", "border-green-200");
                check.icon.classList.remove("bg-slate-200", "text-slate-400", "bg-green-200", "text-green-600");
                check.icon.classList.add("bg-red-200", "text-red-600");
                check.icon.textContent = "✕";
                check.element.querySelector("span:last-child").classList.add("text-red-600");
                check.element.querySelector("span:last-child").classList.remove("text-green-600");
            }
        });
    }

    passwordInput.addEventListener("input", updatePasswordFeedback);
}

document.addEventListener("DOMContentLoaded", () => {
    validatePasswordRequirements();

    const form = document.getElementById("password-form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const currentPassword = document.querySelector("[name='current_password']").value;
        const newPassword = document.querySelector("[name='new_password']").value;
        const confirmPassword = document.querySelector("[name='confirm_password']").value;

        // Client-side validations
        if (!currentPassword || !newPassword || !confirmPassword) {
            showToast("All fields are required.", "error");
            return;
        }

        if (newPassword !== confirmPassword) {
            showToast("New passwords do not match.", "error");
            return;
        }

        if (newPassword === currentPassword) {
            showToast("New password must be different from current password.", "error");
            return;
        }

        const data = {
            current_password: currentPassword,
            new_password: newPassword,
            confirm_password: confirmPassword
        };

        try {
            const res = await fetch("/account/change-password", {
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
                document.getElementById("password-feedback").classList.add("hidden");
            }
        } catch (error) {
            showToast("An error occurred. Please try again.", "error");
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

    showToast(result.message, result.status === "success" ? "success" : "error");
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

    showToast(result.message, result.status === "success" ? "success" : "error");

    if (result.status === "success") {
        // optional instant UI update
        document.querySelector(".avatar-img").src = result.avatar_url;
    }
});