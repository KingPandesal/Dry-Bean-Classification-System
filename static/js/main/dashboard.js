const beanLabels = dashboardData.class_labels;
const beanCounts = dashboardData.class_counts;

const confidenceDates = dashboardData.confidence_dates;
const confidenceValues = dashboardData.confidence_values;

// --------------------------
// Bean Distribution
// --------------------------

new Chart(document.getElementById("beanChart"), {

    type: "doughnut",

    data: {

        labels: beanLabels,

        datasets: [{

            data: beanCounts,

            backgroundColor: [

                "#16a34a",
                "#22c55e",
                "#4ade80",
                "#86efac",
                "#bbf7d0",
                "#15803d",
                "#14532d"

            ],

        }]

    },

    options: {
        responsive: true,
        maintainAspectRatio: false,

        animation: {
            duration: 1500,
            easing: "easeOutQuart"
        },

        cutout: "50%",

        plugins: {
            legend: {
                position: "bottom"
            }
        }
    }

});


// --------------------------
// Confidence Trend
// --------------------------

new Chart(document.getElementById("confidenceChart"), {

    type: "line",

    data: {

        labels: confidenceDates,

        datasets: [{

            label: "Confidence",

            data: confidenceValues,

            fill: false,

            tension: .3,

            borderColor: "#16a34a",

            backgroundColor: "#16a34a"

        }]

    },

    options: {

        responsive: true,

        scales: {

            y: {

                min: 0,

                max: 100

            }

        },

        plugins: {
            legend: {
                position: "bottom"
            }
        }

    }

});