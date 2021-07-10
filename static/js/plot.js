/**
 * Script to create bar plots in crime-maps project
 * Last edited on 7/10/2021
 */

// Creates layout variable for all bar charts
function getLayout(city, numCrimes) {
    return {
        height: 1000,
        barmode: 'stack',
        yaxis: {
            range: [0, 35000]
        },
        annotations: [{
            x: city,
            yref: 'paper',
            y: -.04,
            text: numCrimes,
            xanchor: 'center',
            yanchor: 'bottom',
            showarrow: false
        }]
    };
}

// Creates a single trace(one section of bar)
function createTrace(city, crime, occurances) {
    return {
        x: [city],
        y: [occurances],
        name: crime,
        type: 'bar'
    };
}

// Gets data and draws a bar chart for Buffalo crimes
function drawBuffaloChart(year) {
    fetch(`/buf/${year}`)
        .then((data) => data.json())
        .then((data) => {
            // Get all crime types and number of occurances
            var crimeDict = {};
            var numCrimes = 0;
            data.forEach(function getCrimeTypes(element) {
                if (element.crime in crimeDict)
                    crimeDict[element.crime]++;
                else
                    crimeDict[element.crime] = 1;
                numCrimes++;
            })

            // create Buffalo bar chart traces
            var bufTraces = [];
            for (let crime in crimeDict)
                bufTraces.push(createTrace("Buffalo", crime, crimeDict[crime]));

            var bufLayout = getLayout("Buffalo", numCrimes);
            Plotly.newPlot('buf-bar-chart', bufTraces, bufLayout);
        })
        .catch((error) => console.log(error))
}

// Gets data and draws a bar chart for Atlanta crimes
function drawAtlantaChart(year) {    
    fetch(`/atl/${year}`)
        .then((data) => data.json())
        .then((data) => {
            // Get all crime types and number of occurances
            var crimeDict = {};
            var numCrimes = 0;
            data.forEach(function getCrimeTypes(element) {
                if (element.crime in crimeDict)
                    crimeDict[element.crime]++;
                else
                    crimeDict[element.crime] = 1;
                numCrimes++;
            })

            // create Atlanta bar chart traces
            var atlTraces = [];
            for (let crime in crimeDict)
                atlTraces.push(createTrace("Atlanta", crime, crimeDict[crime]));

            var atlLayout = getLayout("Atlanta", numCrimes);
            Plotly.newPlot('atl-bar-chart', atlTraces, atlLayout);
        })
        .catch((error) => console.log(error))
}

// Updates the bar charts when a year is selected via the dropdown
function updateCharts() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
    // Get the updated year
    year = d3.select("#selectYear").property("value");
    // Draw new charts with the new data
    drawBuffaloChart(year);
    drawAtlantaChart(year);
}

// Fill the dropdown menu on the page
var dropdown = d3.select("#selectYear");
for(var i = 2010; i < 2017; i++)
    dropdown.append("option").text(i).attr("value", i);

drawBuffaloChart(2010);
drawAtlantaChart(2010);

dropdown.on('change', updateCharts);