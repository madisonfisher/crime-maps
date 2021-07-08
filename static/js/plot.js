/**
 * Script to create bar plots in crime-maps project
 * Last edited on 7/7/2021
 */

// Constant layout variable for all bar charts
const layout = {
    height: 1000,
    barmode: 'stack',
    yaxis: {
        range: [0, 35000]
    }
};

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
            //console.log(data);

            // Get all crime types and number of occurances
            var crimeDict = {};
            data.forEach(function getCrimeTypes(element) {
                if (element.crime in crimeDict)
                    crimeDict[element.crime]++;
                else
                    crimeDict[element.crime] = 1;
            })

            // create Buffalo bar chart traces
            var bufTraces = [];
            for (let crime in crimeDict)
                bufTraces.push(createTrace("Buffalo", crime, crimeDict[crime]));

            Plotly.newPlot('buf-bar-chart', bufTraces, layout);
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
            data.forEach(function getCrimeTypes(element) {
                if (element.crime in crimeDict)
                    crimeDict[element.crime]++;
                else
                    crimeDict[element.crime] = 1;
            })

            // create Atlanta bar chart traces
            var atlTraces = [];
            for (let crime in crimeDict)
                atlTraces.push(createTrace("Atlanta", crime, crimeDict[crime]));

            Plotly.newPlot('atl-bar-chart', atlTraces, layout);
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