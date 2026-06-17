function openPredictionModal() {
    const formHTML = `
        <form id="predict-form" class="space-y-5 max-h-[75vh] overflow-y-auto px-1">
            
            <div class="border border-emerald-100 bg-emerald-50/40 p-4 rounded-xl space-y-3">
                <div class="border-b border-emerald-200 pb-1">
                    <h4 class="text-xs font-bold uppercase tracking-wider text-emerald-900">📏 Size & Dimensions</h4>
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <input name="area" placeholder="Area" type="number" step="any" required class="border border-slate-200 p-2 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600">
                    <input name="perimeter" placeholder="Perimeter" type="number" step="any" required class="border border-slate-200 p-2 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600">
                    <input name="major_axis_length" placeholder="Major Axis Length" type="number" step="any" required class="border border-slate-200 p-2 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600">
                    <input name="minor_axis_length" placeholder="Minor Axis Length" type="number" step="any" required class="border border-slate-200 p-2 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600">
                </div>
            </div>

            <div class="border border-emerald-100 bg-emerald-50/40 p-4 rounded-xl space-y-3">
                <div class="border-b border-emerald-200 pb-1">
                    <h4 class="text-xs font-bold uppercase tracking-wider text-emerald-900">⬡ Shape Attributes</h4>
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <input name="aspect_ratio" placeholder="Aspect Ratio" type="number" step="any" required class="border border-slate-200 p-2 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600">
                    <input name="eccentricity" placeholder="Eccentricity" type="number" step="any" required class="border border-slate-200 p-2 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600">
                    <input name="convex_area" placeholder="Convex Area" type="number" step="any" required class="border border-slate-200 p-2 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600">
                    <input name="equiv_diameter" placeholder="Equiv Diameter" type="number" step="any" required class="border border-slate-200 p-2 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600">
                </div>
            </div>

            <div class="border border-emerald-100 bg-emerald-50/40 p-4 rounded-xl space-y-3">
                <div class="border-b border-emerald-200 pb-1">
                    <h4 class="text-xs font-bold uppercase tracking-wider text-emerald-900">🧬 Geometry & Factors</h4>
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <input name="extent" placeholder="Extent" type="number" step="any" required class="border border-slate-200 p-2 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600">
                    <input name="solidity" placeholder="Solidity" type="number" step="any" required class="border border-slate-200 p-2 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600">
                    <input name="roundness" placeholder="Roundness" type="number" step="any" required class="border border-slate-200 p-2 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600">
                    <input name="compactness" placeholder="Compactness" type="number" step="any" required class="border border-slate-200 p-2 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600">
                    <input name="shape_factor1" placeholder="Shape Factor 1" type="number" step="any" required class="border border-slate-200 p-2 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600">
                    <input name="shape_factor2" placeholder="Shape Factor 2" type="number" step="any" required class="border border-slate-200 p-2 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600">
                    <input name="shape_factor3" placeholder="Shape Factor 3" type="number" step="any" required class="border border-slate-200 p-2 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600">
                    <input name="shape_factor4" placeholder="Shape Factor 4" type="number" step="any" required class="border border-slate-200 p-2 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600">
                </div>
            </div>

            <div class="flex justify-between items-center pt-4 border-t border-slate-100">
                <button type="reset" class="text-xs text-slate-400 hover:text-emerald-800 font-medium transition">
                    Reset Form
                </button>
                <div class="flex gap-2">
                    <button type="button" onclick="closeModal()" class="px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                        Cancel
                    </button>
                    <button type="submit" class="px-5 py-2 text-sm bg-amber-800 text-white rounded-lg hover:bg-amber-900 shadow transition">
                        Predict
                    </button>
                </div>
            </div>

        </form>
    `;

    openModal("Dry Bean Prediction", formHTML);

    setTimeout(() => {
        attachPredictionHandler();
    }, 100);
}

function attachPredictionHandler() {
    const form = document.getElementById("predict-form");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = "Processing...";

        try {
            const data = Object.fromEntries(new FormData(form));
            const res = await fetch("/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await res.json();

            if (result.success) {
                openModal(
                    "Prediction Result",
                    `
                    <div class="text-center py-4 space-y-4">
                        <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 text-xl font-bold">
                            🫘
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold text-emerald-900">
                                ${result.prediction}
                            </h3>
                            <p class="text-xs text-emerald-700 font-semibold bg-emerald-50 inline-block px-2 py-0.5 rounded-full mt-1">
                                Confidence: ${result.confidence}%
                            </p>
                        </div>
                        <button onclick="closeModal()" class="mt-2 px-6 py-2 bg-amber-800 text-white text-sm rounded-lg hover:bg-amber-900 transition">
                            Close
                        </button>
                    </div>
                    `
                );
            } else {
                alert(result.message);
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        } catch (error) {
            alert("An error occurred during submission.");
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });
}