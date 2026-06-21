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
    const confidenceValue = document.getElementById("confidenceFilter").value;
    const sortValue = document.getElementById("sortFilter").value;
    const searchValue = document.getElementById("searchInput")?.value.toLowerCase() || "";

    let filtered = allRows.filter(row => {
        const rowClass = row.dataset.class;
        const rowConfidence = parseFloat(row.dataset.confidence);
        const text = row.innerText.toLowerCase();

        const matchClass =
            classValue === "ALL" || rowClass === classValue;

        let matchConfidence = true;
        if (confidenceValue !== "ALL") {
            if (confidenceValue === "very_high") {
                matchConfidence = rowConfidence >= 90;
            } else if (confidenceValue === "high") {
                matchConfidence = rowConfidence >= 75 && rowConfidence < 90;
            } else if (confidenceValue === "moderate") {
                matchConfidence = rowConfidence >= 60 && rowConfidence < 75;
            } else if (confidenceValue === "low") {
                matchConfidence = rowConfidence < 60;
            }
        }

        const matchSearch =
            text.includes(searchValue);

        return matchClass && matchConfidence && matchSearch;
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
    const info = document.getElementById("paginationInfo");
    const noDataRow = document.getElementById("noDataRow");

    const isEmpty = noDataRow && noDataRow.offsetParent !== null;

    if (isEmpty || filteredRows.length === 0) {
        if (info) info.style.display = "none";
        return;
    }

    if (info) info.style.display = "block";

    const start = (currentPage - 1) * rowsPerPage + 1;
    const end = Math.min(currentPage * rowsPerPage, filteredRows.length);

    info.textContent = `Showing ${start}-${end} of ${filteredRows.length} results`;
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
    filterTable();
});

window.onload = () => {
    filterTable();
};

function openPredictionModalHistory(row) {
    const prediction = row.dataset.class;
    const confidence = row.dataset.confidence;
    const rawDate = row.dataset.date; // Renamed to rawDate
    const input = JSON.parse(row.dataset.input);

    // ✨ UI/UX Date Formatter Helper
    // ✨ UI/UX Date Formatter Helper (Fixed for Unix Timestamps)
    let formattedDate = rawDate;
    try {
        // Convert string timestamp to a number
        const timestampInSeconds = parseFloat(rawDate);
        
        // Multiply by 1000 to convert seconds to JavaScript milliseconds
        const parsedDate = new Date(timestampInSeconds * 1000);
        
        // Validates if it successfully converted to a real date object
        if (!isNaN(parsedDate.getTime())) {
            formattedDate = new Intl.DateTimeFormat('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            }).format(parsedDate);
        }
    } catch (e) {
        // Fallback to raw string if parsing fails entirely
        formattedDate = rawDate;
    }

    const labelMapping = {
        'area': 'Area', 'perimeter': 'Perimeter', 'major_axis_length': 'Major Axis', 'minor_axis_length': 'Minor Axis',
        'aspect_ratio': 'Aspect Ratio', 'eccentricity': 'Eccentricity', 'convex_area': 'Convex Area', 'equiv_diameter': 'Equiv Diameter',
        'extent': 'Extent', 'solidity': 'Solidity', 'roundness': 'Roundness', 'compactness': 'Compactness',
        'shape_factor1': 'Factor 1', 'shape_factor2': 'Factor 2', 'shape_factor3': 'Factor 3', 'shape_factor4': 'Factor 4'
    };

    // Determine confidence tier and details
    let confidenceTierHTML = '';
    const confValue = parseFloat(confidence);
    if (confValue >= 90) {
        confidenceTierHTML = `
            <div class="bg-green-50 border border-green-200 rounded-xl p-4 space-y-2">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-xs font-bold uppercase tracking-wide text-green-700">Very High</p>
                        <p class="text-sm font-semibold text-green-900 mt-0.5">90-100%</p>
                    </div>
                    <div class="w-10 h-10 bg-green-200 rounded-lg flex items-center justify-center text-lg">✓</div>
                </div>
                <p class="text-xs text-green-700 leading-relaxed">
                    The model showed very strong confidence in the predicted bean variety. The input characteristics closely matched patterns learned during training.
                </p>
            </div>
        `;
    } else if (confValue >= 75) {
        confidenceTierHTML = `
            <div class="bg-yellow-50 border border-yellow-200 rounded-xl p-4 space-y-2">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-xs font-bold uppercase tracking-wide text-yellow-700">High</p>
                        <p class="text-sm font-semibold text-yellow-900 mt-0.5">75-89%</p>
                    </div>
                    <div class="w-10 h-10 bg-yellow-200 rounded-lg flex items-center justify-center text-lg">→</div>
                </div>
                <p class="text-xs text-yellow-700 leading-relaxed">
                    The model showed high confidence in the prediction. The input characteristics were generally consistent with learned classification patterns.
                </p>
            </div>
        `;
    } else if (confValue >= 60) {
        confidenceTierHTML = `
            <div class="bg-orange-50 border border-orange-200 rounded-xl p-4 space-y-2">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-xs font-bold uppercase tracking-wide text-orange-700">Moderate</p>
                        <p class="text-sm font-semibold text-orange-900 mt-0.5">60-74%</p>
                    </div>
                    <div class="w-10 h-10 bg-orange-200 rounded-lg flex items-center justify-center text-lg">◐</div>
                </div>
                <p class="text-xs text-orange-700 leading-relaxed">
                    The model generated a moderately confident prediction. Some input characteristics may overlap with other bean classes.
                </p>
            </div>
        `;
    } else {
        confidenceTierHTML = `
            <div class="bg-red-50 border border-red-200 rounded-xl p-4 space-y-2">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-xs font-bold uppercase tracking-wide text-red-700">Low</p>
                        <p class="text-sm font-semibold text-red-900 mt-0.5">Below 60%</p>
                    </div>
                    <div class="w-10 h-10 bg-red-200 rounded-lg flex items-center justify-center text-lg">!</div>
                </div>
                <p class="text-xs text-red-700 leading-relaxed">
                    The model showed low confidence in the prediction. Input values may be ambiguous, unusual, or outside typical training patterns. Consider verifying the measurements.
                </p>
            </div>
        `;
    }

    const renderMetric = (key) => {
        if (input[key] === undefined) return '';
        const value = typeof input[key] === 'number' ? Number(input[key]).toLocaleString(undefined, {maximumFractionDigits: 4}) : input[key];
        return `
            <div class="bg-white/80 px-3 py-2 rounded-lg border border-slate-100 flex flex-col">
                <span class="text-[11px] font-medium text-slate-400 truncate">${labelMapping[key] || key}</span>
                <span class="text-sm font-semibold text-slate-800 mt-0.5">${value}</span>
            </div>
        `;
    };

    const html = `
        <div class="space-y-5 max-h-[75vh] overflow-y-auto px-1">
            
            <div class="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 p-4 rounded-xl flex items-center justify-between shadow-sm">
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-emerald-600 text-white rounded-xl flex items-center justify-center text-xl shadow-md shadow-emerald-600/10">
                        🫘
                    </div>
                    <div>
                        <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">Classified Result</span>
                        <h3 class="text-xl font-black text-emerald-900 leading-tight">${prediction}</h3>
                        
                        <span class="text-[11px] font-medium text-slate-400 flex items-center gap-1 mt-1 bg-white/60 px-1.5 py-0.5 rounded border border-slate-100 w-fit">
                            ${formattedDate}
                        </span>
                    </div>
                </div>
                <div class="text-right">
                    <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Confidence</span>
                    <span class="text-xl font-extrabold text-emerald-600">${confidence}%</span>
                </div>
            </div>

            ${confidenceTierHTML}

            <div class="text-xs font-bold uppercase tracking-widest text-slate-400 pl-1 -mb-2">Historical Features</div>

            <div class="border border-emerald-100 bg-emerald-50/40 p-4 rounded-xl space-y-3">
                <div class="border-b border-emerald-200 pb-1">
                    <h4 class="text-xs font-bold uppercase tracking-wider text-emerald-900">📏 Size & Dimensions</h4>
                </div>
                <div class="grid grid-cols-2 gap-2">
                    ${renderMetric('area')}
                    ${renderMetric('perimeter')}
                    ${renderMetric('major_axis_length')}
                    ${renderMetric('minor_axis_length')}
                </div>
            </div>

            <div class="border border-emerald-100 bg-emerald-50/40 p-4 rounded-xl space-y-3">
                <div class="border-b border-emerald-200 pb-1">
                    <h4 class="text-xs font-bold uppercase tracking-wider text-emerald-900">⬡ Shape Attributes</h4>
                </div>
                <div class="grid grid-cols-2 gap-2">
                    ${renderMetric('aspect_ratio')}
                    ${renderMetric('eccentricity')}
                    ${renderMetric('convex_area')}
                    ${renderMetric('equiv_diameter')}
                </div>
            </div>

            <div class="border border-emerald-100 bg-emerald-50/40 p-4 rounded-xl space-y-3">
                <div class="border-b border-emerald-200 pb-1">
                    <h4 class="text-xs font-bold uppercase tracking-wider text-emerald-900">🧬 Geometry & Factors</h4>
                </div>
                <div class="grid grid-cols-2 gap-2 mb-2">
                    ${renderMetric('extent')}
                    ${renderMetric('solidity')}
                    ${renderMetric('roundness')}
                    ${renderMetric('compactness')}
                </div>
                <div class="pt-2 border-t border-dashed border-emerald-200/60">
                    <div class="grid grid-cols-4 gap-1.5">
                        ${renderMetric('shape_factor1')}
                        ${renderMetric('shape_factor2')}
                        ${renderMetric('shape_factor3')}
                        ${renderMetric('shape_factor4')}
                    </div>
                </div>
            </div>

        </div>
    `;

    openModal("Prediction Details", html);
}