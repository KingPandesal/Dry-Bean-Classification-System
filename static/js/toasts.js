document.addEventListener("DOMContentLoaded", () => {
    const toasts = document.querySelectorAll("#toast-container > div");

    toasts.forEach((toast) => {
        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateY(10px)";
            toast.style.transition = "0.5s";

            setTimeout(() => toast.remove(), 500);
        }, 3000); // disappears after 3 seconds
    });
});