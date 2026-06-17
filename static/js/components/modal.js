function openModal(title = "Modal", contentHTML = "") {
    document.getElementById("modal-title").textContent = title;
    document.getElementById("modal-body").innerHTML = contentHTML;

    document.getElementById("app-modal").classList.remove("hidden");
    document.getElementById("app-modal").classList.add("flex");
}

function closeModal() {
    document.getElementById("app-modal").classList.add("hidden");
    document.getElementById("app-modal").classList.remove("flex");
}