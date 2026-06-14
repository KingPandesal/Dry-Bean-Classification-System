function showToast(message, type = "error") {
    const container = document.getElementById("toast-container");

    const toast = document.createElement("div");

    toast.className = `
        flex items-start gap-3 min-w-[280px] max-w-sm px-4 py-3 rounded-xl shadow-xl text-sm border
        ${type === "success"
            ? "bg-green-50 border-green-300 text-green-900"
            : "bg-red-50 border-red-300 text-red-900"}
    `;

    toast.innerHTML = `
        <div class="mt-0.5">
            ${type === "success"
                ? `<svg class="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                   </svg>`
                : `<svg class="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                   </svg>`
            }
        </div>
        <div class="flex-1 font-medium">${message}</div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}