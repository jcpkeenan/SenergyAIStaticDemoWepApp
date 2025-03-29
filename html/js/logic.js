function updateMetrics(address, energyStar, eui, wui, ghg, energySavings, waterSavings) {
    document.getElementById('energy-star').innerText = energyStar;
    document.getElementById('eui').innerText = eui + ' kBTU/sqft';
    document.getElementById('wui').innerText = wui + ' gal/sqft';
    document.getElementById('ghg').innerText = ghg + ' tons';
    document.getElementById('energy-savings').innerText = energySavings;
    document.getElementById('water-savings').innerText = waterSavings;
}

function goToDashboard(number) {
    if (number === 1) {
        window.location.href = '/Dashboard/DashboardDetails1';
    }
    if (number === 2) {
        window.location.href = '/Dashboard/DashboardDetails2';
    }
    if (number === 3) {
        window.location.href = '/Dashboard/DashboardDetails3';
    }
}

function toggleValue(elementId, value1, value2) {
    const element = document.getElementById(elementId);
    element.innerText = element.innerText === value1 ? value2 : value1;
}

// Pie Chart for Energy Sources
const ctx = document.getElementById('energyPieChart').getContext('2d');
const energyChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Natural Gas', 'Oil', 'Electric'],
        datasets: [{
            data: [40, 30, 30], // Mock data for energy sources
            backgroundColor: ['#ff9999', '#66b3ff', '#99ff99'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const termsCheckbox = document.getElementById('terms-accept');
    const proceedButton = document.getElementById('proceed-btn');

    // Add event listener for the terms checkbox 
    if (termsCheckbox && proceedButton) {
        termsCheckbox.addEventListener('change', function () {
            if (termsCheckbox.checked) {
                proceedButton.classList.add('active');
                proceedButton.disabled = false;
                proceedButton.style.cursor = "pointer";
            } else {
                proceedButton.classList.remove('active');
                proceedButton.disabled = true;
                proceedButton.style.cursor = "not-allowed";
            }
        });

        // Redirect to Login page for Energy Star credentials
        proceedButton.addEventListener('click', function () {
            if (termsCheckbox.checked) {
                window.location.href = '/Account/Login'; // Your login route
            }
        });

        // Fade in effect for the terms and conditions content
        document.querySelector('.terms-content').style.opacity = 0;
        setTimeout(() => {
            document.querySelector('.terms-content').style.transition = "opacity 1s ease-in";
            document.querySelector('.terms-content').style.opacity = 1;
        }, 100);
    }
});

// Chart configuration data
const energyCharts = [
    {
        id: 'energy-month-end1',
        title: 'Energy Usage - Month End',
        canvasId: 'energyBarChart1',
        chartType: 'energy-month-end',
        initialUnit: 'units'
    },
    {
        id: 'energy-month-end-money',
        title: 'Energy Usage - Month End',
        canvasId: 'energyBarChartMoney',
        chartType: 'energy-month-end',
        initialUnit: 'dollars'
    },
    {
        id: 'energy-month-end2',
        title: 'Energy Usage - Month End',
        canvasId: 'energyBarChart2',
        chartType: 'energy-month-end',
        initialUnit: 'units'
    },
    {
        id: 'energy-month-end-dollars2',
        title: 'Energy Usage - Month End',
        canvasId: 'energyBarChartDollars2',
        chartType: 'energy-month-end',
        initialUnit: 'dollars'
    },
    {
        id: 'energy-month-end3',
        title: 'Energy Usage - Month End',
        canvasId: 'energyBarChart3',
        chartType: 'energy-month-end',
        initialUnit: 'units'
    }
];

function initializeEnergyChart(canvas, config) {
    const ctx = canvas.getContext('2d');
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: `Energy Usage (${config.initialUnit === 'units' ? 'kWh' : '$'})`,
                data: config.initialUnit === 'units' 
                    ? [65, 59, 80, 81, 56, 55]
                    : [650, 590, 800, 810, 560, 550],
                backgroundColor: '#4CAF50'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// Function to display chart with different units
function displayChart(chartType, unit, chart) {
    // Update chart data based on unit
    const newData = unit === 'dollars' 
        ? [650, 590, 800, 810, 560, 550]  // Dollar values
        : [65, 59, 80, 81, 56, 55];       // Unit values
    
    chart.data.datasets[0].data = newData;
    chart.data.datasets[0].label = `Energy Usage (${unit === 'dollars' ? '$' : 'kWh'})`;
    chart.update();
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all energy charts
    energyCharts.forEach(chartConfig => {
        const canvas = document.getElementById(chartConfig.canvasId);
        if (canvas) {
            initializeEnergyChart(canvas, chartConfig);
        }
    });

    // Add event listeners to unit toggle buttons
    document.querySelectorAll('.unit-toggle').forEach(button => {
        button.addEventListener('click', function() {
            const chartType = this.dataset.chart;
            const unit = this.dataset.unit;
            const canvasId = this.closest('.chart').querySelector('canvas').id;
            const chart = Chart.getChart(canvasId);
            
            if (chart) {
                displayChart(chartType, unit, chart);
                // Update button's data-unit for next toggle
                this.dataset.unit = unit === 'units' ? 'dollars' : 'units';
            }
        });
    });

    // Initialize property controls
    initializePropertyControls();
});

// Initialize property checkboxes
function initializePropertyControls() {
    const checkboxes = document.querySelectorAll('.property-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const propertyId = e.target.dataset.property;
            updateChartData(propertyId, e.target.checked);
        });
    });
}

// Update chart data when properties are selected/deselected
function updateChartData(propertyId, isSelected) {
    // Implementation for updating chart data based on property selection
    console.log(`Property ${propertyId} ${isSelected ? 'selected' : 'deselected'}`);
    // Add your chart update logic here
}