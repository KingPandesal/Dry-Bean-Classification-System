// Filter & Sort functionality
function filterTable() {
    const classValue = document.getElementById("classFilter").value;
    const sortValue = document.getElementById("sortFilter").value;
    const searchValue = document.getElementById("searchInput")?.value.toLowerCase() || "";

    const rows = Array.from(document.querySelectorAll("tbody tr"));

    // -------------------------
    // FILTER
    // -------------------------
    let filtered = rows.filter(row => {
        const rowClass = row.dataset.class;
        const text = row.innerText.toLowerCase();

        const matchClass =
            classValue === "ALL" || rowClass === classValue;

        const matchSearch =
            text.includes(searchValue);

        return matchClass && matchSearch;
    });

    // -------------------------
    // SORT
    // -------------------------
    filtered.sort((a, b) => {

        const aDate = parseFloat(a.dataset.date);
        const bDate = parseFloat(b.dataset.date);

        const aConf = parseFloat(a.dataset.confidence);
        const bConf = parseFloat(b.dataset.confidence);

        switch (sortValue) {

            case "oldest":
                return aDate - bDate;

            case "confidence_high":
                return bConf - aConf;

            case "confidence_low":
                return aConf - bConf;

            case "newest":
            default:
                return bDate - aDate;
        }
    });

    // -------------------------
    // RE-RENDER TABLE
    // -------------------------
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";

    filtered.forEach(row => tbody.appendChild(row));
}



// Search functionality
document.getElementById("searchInput").addEventListener("input", function () {
    const query = this.value.toLowerCase();
    const rows = document.querySelectorAll("tbody tr");

    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(query) ? "" : "none";
    });
});
