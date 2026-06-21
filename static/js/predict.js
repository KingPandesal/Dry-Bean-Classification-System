function openPredictionModal() {
    const formHTML = `
        <form id="predict-form" class="space-y-5 max-h-[75vh] overflow-y-auto px-1">
            
            <div class="border border-emerald-100 bg-emerald-50/40 p-4 rounded-xl space-y-3">
                <div class="border-b border-emerald-200 pb-1">
                    <h4 class="text-xs font-bold uppercase tracking-wider text-emerald-900">📏 Size & Dimensions</h4>
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <input name="area" placeholder="Area" type="number" step="any" required class="validation-input border border-slate-200 p-2 rounded-lg bg-white text-sm w-full focus:outline-none focus:ring-2 focus:ring-emerald-600">
                        <div class="validation-error text-xs text-red-600 mt-1 hidden"></div>
                    </div>
                    <div>
                        <input name="perimeter" placeholder="Perimeter" type="number" step="any" required class="validation-input border border-slate-200 p-2 rounded-lg bg-white text-sm w-full focus:outline-none focus:ring-2 focus:ring-emerald-600">
                        <div class="validation-error text-xs text-red-600 mt-1 hidden"></div>
                    </div>
                    <div>
                        <input name="major_axis_length" placeholder="Major Axis Length" type="number" step="any" required class="validation-input border border-slate-200 p-2 rounded-lg bg-white text-sm w-full focus:outline-none focus:ring-2 focus:ring-emerald-600">
                        <div class="validation-error text-xs text-red-600 mt-1 hidden"></div>
                    </div>
                    <div>
                        <input name="minor_axis_length" placeholder="Minor Axis Length" type="number" step="any" required class="validation-input border border-slate-200 p-2 rounded-lg bg-white text-sm w-full focus:outline-none focus:ring-2 focus:ring-emerald-600">
                        <div class="validation-error text-xs text-red-600 mt-1 hidden"></div>
                    </div>
                </div>
            </div>

            <div class="border border-emerald-100 bg-emerald-50/40 p-4 rounded-xl space-y-3">
                <div class="border-b border-emerald-200 pb-1">
                    <h4 class="text-xs font-bold uppercase tracking-wider text-emerald-900">⬡ Shape Attributes</h4>
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <input name="aspect_ratio" placeholder="Aspect Ratio" type="number" step="any" required class="validation-input border border-slate-200 p-2 rounded-lg bg-white text-sm w-full focus:outline-none focus:ring-2 focus:ring-emerald-600">
                        <div class="validation-error text-xs text-red-600 mt-1 hidden"></div>
                    </div>
                    <div>
                        <input name="eccentricity" placeholder="Eccentricity" type="number" step="any" required class="validation-input border border-slate-200 p-2 rounded-lg bg-white text-sm w-full focus:outline-none focus:ring-2 focus:ring-emerald-600">
                        <div class="validation-error text-xs text-red-600 mt-1 hidden"></div>
                    </div>
                    <div>
                        <input name="convex_area" placeholder="Convex Area" type="number" step="any" required class="validation-input border border-slate-200 p-2 rounded-lg bg-white text-sm w-full focus:outline-none focus:ring-2 focus:ring-emerald-600">
                        <div class="validation-error text-xs text-red-600 mt-1 hidden"></div>
                    </div>
                    <div>
                        <input name="equiv_diameter" placeholder="Equiv Diameter" type="number" step="any" required class="validation-input border border-slate-200 p-2 rounded-lg bg-white text-sm w-full focus:outline-none focus:ring-2 focus:ring-emerald-600">
                        <div class="validation-error text-xs text-red-600 mt-1 hidden"></div>
                    </div>
                </div>
            </div>

            <div class="border border-emerald-100 bg-emerald-50/40 p-4 rounded-xl space-y-3">
                <div class="border-b border-emerald-200 pb-1">
                    <h4 class="text-xs font-bold uppercase tracking-wider text-emerald-900">🧬 Geometry & Factors</h4>
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <input name="extent" placeholder="Extent" type="number" step="any" required class="validation-input border border-slate-200 p-2 rounded-lg bg-white text-sm w-full focus:outline-none focus:ring-2 focus:ring-emerald-600">
                        <div class="validation-error text-xs text-red-600 mt-1 hidden"></div>
                    </div>
                    <div>
                        <input name="solidity" placeholder="Solidity" type="number" step="any" required class="validation-input border border-slate-200 p-2 rounded-lg bg-white text-sm w-full focus:outline-none focus:ring-2 focus:ring-emerald-600">
                        <div class="validation-error text-xs text-red-600 mt-1 hidden"></div>
                    </div>
                    <div>
                        <input name="roundness" placeholder="Roundness" type="number" step="any" required class="validation-input border border-slate-200 p-2 rounded-lg bg-white text-sm w-full focus:outline-none focus:ring-2 focus:ring-emerald-600">
                        <div class="validation-error text-xs text-red-600 mt-1 hidden"></div>
                    </div>
                    <div>
                        <input name="compactness" placeholder="Compactness" type="number" step="any" required class="validation-input border border-slate-200 p-2 rounded-lg bg-white text-sm w-full focus:outline-none focus:ring-2 focus:ring-emerald-600">
                        <div class="validation-error text-xs text-red-600 mt-1 hidden"></div>
                    </div>
                    <div>
                        <input name="shape_factor1" placeholder="Shape Factor 1" type="number" step="any" required class="validation-input border border-slate-200 p-2 rounded-lg bg-white text-sm w-full focus:outline-none focus:ring-2 focus:ring-emerald-600">
                        <div class="validation-error text-xs text-red-600 mt-1 hidden"></div>
                    </div>
                    <div>
                        <input name="shape_factor2" placeholder="Shape Factor 2" type="number" step="any" required class="validation-input border border-slate-200 p-2 rounded-lg bg-white text-sm w-full focus:outline-none focus:ring-2 focus:ring-emerald-600">
                        <div class="validation-error text-xs text-red-600 mt-1 hidden"></div>
                    </div>
                    <div>
                        <input name="shape_factor3" placeholder="Shape Factor 3" type="number" step="any" required class="validation-input border border-slate-200 p-2 rounded-lg bg-white text-sm w-full focus:outline-none focus:ring-2 focus:ring-emerald-600">
                        <div class="validation-error text-xs text-red-600 mt-1 hidden"></div>
                    </div>
                    <div>
                        <input name="shape_factor4" placeholder="Shape Factor 4" type="number" step="any" required class="validation-input border border-slate-200 p-2 rounded-lg bg-white text-sm w-full focus:outline-none focus:ring-2 focus:ring-emerald-600">
                        <div class="validation-error text-xs text-red-600 mt-1 hidden"></div>
                    </div>
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

function validateSingleField(input) {
    const name = input.name;
    const value = parseFloat(input.value);
    const errorElement = input.parentElement.querySelector('.validation-error');

    // Skip if empty (only validate on submission if empty)
    if (input.value === '' || isNaN(value)) {
        errorElement.classList.add('hidden');
        input.classList.remove('border-red-500', 'ring-red-500');
        return true;
    }

    // Define min/max ranges for each field
    const ranges = {
        area: { min: 20420, max: 254616 },
        perimeter: { min: 524.736, max: 1985.37 },
        major_axis_length: { min: 183.601165, max: 738.860154 },
        minor_axis_length: { min: 122.512653, max: 460.198497 },
        aspect_ratio: { min: 1.024868, max: 2.430306 },
        eccentricity: { min: 0.218951, max: 0.911423 },
        convex_area: { min: 20684, max: 263261 },
        equiv_diameter: { min: 161.243764, max: 569.374358 },
        extent: { min: 0.555315, max: 0.866195 },
        solidity: { min: 0.919246, max: 0.994677 },
        roundness: { min: 0.489618, max: 0.990685 },
        compactness: { min: 0.640577, max: 0.987303 },
        shape_factor1: { min: 0.002778, max: 0.010451 },
        shape_factor2: { min: 0.000564, max: 0.003665 },
        shape_factor3: { min: 0.410339, max: 0.974767 },
        shape_factor4: { min: 0.947687, max: 0.999733 }
    };

    let error = null;

    // Check if field has a defined range
    if (ranges[name]) {
        const { min, max } = ranges[name];
        if (value < min) {
            error = `Min: ${min}`;
        } else if (value > max) {
            error = `Max: ${max}`;
        }
    }
    // Perimeter must be > 0 (strictly greater than 0)
    else if (name === 'perimeter') {
        if (value <= 0) {
            error = "Must be greater than 0";
        }
    }
    // All other fields must be >= 0
    else {
        if (value < 0) {
            error = "Must be 0 or positive";
        }
    }

    // Update UI
    if (error) {
        errorElement.textContent = error;
        errorElement.classList.remove('hidden');
        input.classList.add('border-red-500', 'ring-2', 'ring-red-300');
        return false;
    } else {
        errorElement.classList.add('hidden');
        input.classList.remove('border-red-500', 'ring-2', 'ring-red-300');
        return true;
    }
}

function attachPredictionHandler() {
    const form = document.getElementById("predict-form");
    if (!form) return;

    // Attach real-time validation
    const validationInputs = form.querySelectorAll('.validation-input');
    validationInputs.forEach(input => {
        input.addEventListener('input', () => {
            validateSingleField(input);
        });
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        try {
            const data = Object.fromEntries(new FormData(form));
            
            // Validate all fields
            let hasErrors = false;
            validationInputs.forEach(input => {
                if (!validateSingleField(input)) {
                    hasErrors = true;
                }
            });

            if (hasErrors) {
                return;
            }

            submitBtn.disabled = true;
            submitBtn.innerHTML = "Processing...";

            const res = await fetch("/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await res.json();

            if (result.success) {
                const conf = parseFloat(result.confidence);
                let tierHTML = '';
                
                if (conf >= 90) {
                    tierHTML = `
                        <div class="bg-green-50 border border-green-200 rounded-lg p-3 space-y-1">
                            <p class="text-xs font-bold text-green-900">
                                90-100% — Very High
                            </p>
                            <p class="text-xs text-green-700">
                                Very strong match with learned patterns.
                            </p>
                        </div>
                    `;
                } else if (conf >= 75) {
                    tierHTML = `
                        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3 space-y-1">
                            <p class="text-xs font-bold text-yellow-900">
                                75-89% — High
                            </p>
                            <p class="text-xs text-yellow-700">
                                Input characteristics strongly matched the prediction.
                            </p>
                        </div>
                    `;
                } else if (conf >= 60) {
                    tierHTML = `
                        <div class="bg-orange-50 border border-orange-200 rounded-lg p-3 space-y-1">
                            <p class="text-xs font-bold text-orange-900">
                                60-74% — Moderate
                            </p>
                            <p class="text-xs text-orange-700">
                                Prediction is acceptable but may overlap with other classes.
                            </p>
                        </div>
                    `;
                } else {
                    tierHTML = `
                        <div class="bg-red-50 border border-red-200 rounded-lg p-3 space-y-1">
                            <p class="text-xs font-bold text-red-900">
                                Below 60% — Low
                            </p>
                            <p class="text-xs text-red-700">
                                Prediction may be less reliable. Verify measurements.
                            </p>
                        </div>
                    `;
                }
                
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
                        ${tierHTML}
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