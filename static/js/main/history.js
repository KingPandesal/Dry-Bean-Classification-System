let currentPage = 1;
const rowsPerPage = 5;

let allRows = [];
let filteredRows = [];

document.addEventListener("DOMContentLoaded", () => {
    allRows = Array.from(document.querySelectorAll("tbody tr"));
});

// Filter, Sort, & Pagination functionality
function filterTable() {
    const classValue = document.getElementById("classFilter").value;
    const sortValue = document.getElementById("sortFilter").value;
    const searchValue = document.getElementById("searchInput")?.value.toLowerCase() || "";

    let filtered = allRows.filter(row => {
        const rowClass = row.dataset.class;
        const text = row.innerText.toLowerCase();

        const matchClass =
            classValue === "ALL" || rowClass === classValue;

        const matchSearch =
            text.includes(searchValue);

        return matchClass && matchSearch;
    });

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

    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";

    filtered.forEach(row => {
        row.style.display = "";
        tbody.appendChild(row);
    });

    filteredRows = filtered;
    currentPage = 1;
    renderTable();
}

function renderTable() {
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    const pageRows = filteredRows.slice(start, end);

    pageRows.forEach(row => tbody.appendChild(row));

    updatePaginationUI();
    updatePaginationButtons();
}

function nextPage() {
    const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

    if (currentPage < totalPages) {
        currentPage++;
        renderTable();
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    }
}

function updatePaginationUI() {
    const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

    const info = document.querySelector("#paginationInfo");

    if (info) {
        const start = (currentPage - 1) * rowsPerPage + 1;
        const end = Math.min(currentPage * rowsPerPage, filteredRows.length);

        info.textContent = `Showing ${start}-${end} of ${filteredRows.length} results`;
    }
}

function updatePaginationButtons() {
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || totalPages === 0;

    // styling when disabled
    prevBtn.classList.toggle("opacity-50", prevBtn.disabled);
    prevBtn.classList.toggle("cursor-not-allowed", prevBtn.disabled);

    nextBtn.classList.toggle("opacity-50", nextBtn.disabled);
    nextBtn.classList.toggle("cursor-not-allowed", nextBtn.disabled);
}

// Search functionality
document.getElementById("searchInput").addEventListener("input", function () {
    const query = this.value.toLowerCase();
    const rows = allRows;

    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(query) ? "" : "none";
    });
});

window.onload = () => {
    filterTable();
};