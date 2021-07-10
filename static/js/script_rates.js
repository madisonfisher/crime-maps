function init() {
  fetchAPIKey();
  populateDropdowns();
  updateData();
  populateCheckboxs();
  d3.selectAll("#button").on("click", updateData);
}

d3.select('#selectCity').on('change', function () {
  city = document.getElementById("selectCity").value;
  populateCheckboxs();

  $(document).ready(function () {
    $("input[type='checkbox']").click(function (e) {
      if ($(this).is(':checked')) {
        $(this).val("true");
      } else {
        $(this).val("false");
      }
    });
  })
})

//handles changing the value of the checkbox
$(document).ready(function () {
  $("input[type='checkbox']").click(function (e) {
    if ($(this).is(':checked')) {
      $(this).val("true");
    } else {
      $(this).val("false");
    }
  });
})

const alt_neighborhoods = ["Bankhead/Bolton", "Betmar LaVilla", "Boulevard Heights", "Brandon", "Brookwood", "Campbelton Road", "Capitol View Manor", "Castleberry Hill", "Center Hill", "Choosewood Park", "Downtown", "Edgewood", "Grant Park", "Inman Park", "Lakewood Heights", "Lenox", "Lindberg/Morosgo", "Lindridge/Martin Manor", "Mechanicsville", "Midtown", "Old Forth Ward", "Peachtree Battle Alliance", "The Villages at Castleberry H", "Thomasville Heights", "West End"];
const buf_neighborhoods = ["Babcock", "Black Rock", "Broadway - Filmore", "Buffalo", "Columbus", "Downtown", "Elmwood Village", "Eric County", "Forest", "Front Park", "Genesee Moselle", "Grider", "Kaisertown", "Kensington", "Kingsley", "Lakeview", "LaSalle", "Masten Park", "Military", "North Park", "Parkside", "Schiller Park", "South Ellicott", "Willert Park", "Williamsville"]

function updateData() {
  document.getElementById("button").disabled = true;
  document.getElementById("button").textContent = "Loading data...";
  city = document.getElementById("selectCity").value;
  year = document.getElementById("selectYear").value;
  neighborhoods = []
  fetch(`/${city}/${year}`)
    .then((data) => data.json())
    .then((data) => {
      
      var rateCrime = {};
      
      data.forEach(function getCount(item) {
        if (item.month in rateCrime)
          rateCrime[item.month]++;
        else
          rateCrime[item.month] = 1;
      })

      if (city == "atl") {
        var city_name = "Atlanta";
      }
      else if (city == "buf") {
        var city_name = "Buffalo";
      }

      var months = Object.keys(rateCrime);
      var count = Object.values(rateCrime);

      var trace = [{
        x: months,
        y: count,
        type: "line"
      }];

      var layout = {
        title: `${city_name} Total Crime Amounts Over ${year}`,
        yaxis: { 
          title: "Count of All Crime",
          range: [0, 3300]
        },
        xaxis: {
          title: "Month",
          tick0: 0,
          dtick: 0,
          autotick: false
        }
      };

      Plotly.newPlot('total-plot', trace, layout);

      if (city == 'atl') {
        var neighbor = alt_neighborhoods;
      }
      else if (city == 'buf') {
        var neighbor = buf_neighborhoods;
      }
      var neigh_data = [];
      const colors = ['#e2169e', '#2d7764', '#6b03dc', '#e6194B', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#42d4f4', '#f032e6', '#bfef45', '#fabed4', '#469990', '#dcbeff', '#9A6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#a9a9a9', '#FFFF00', '#000000']
      for (let i = 0; i < neighbor.length; i++) {
        sel_checkbox = document.getElementById(neighbor[i]).value;
        if (sel_checkbox === "true") {
          var neigh_crime = data.filter(function (item) {
            return item.neighborhood == neighbor[i];
          });
          var rateCrimeNeigh = {};
          neigh_crime.forEach(function getCount(item) {
            if (item.month in rateCrimeNeigh)
              rateCrimeNeigh[item.month]++;
            else
              rateCrimeNeigh[item.month] = 1;
          })
          var months = Object.keys(rateCrimeNeigh);
          var count = Object.values(rateCrimeNeigh);

          var trace1 = {
            x: months,
            y: count,
            name: neighbor[i],
            mode: 'lines',
            line: {
            color: colors[i],
            width: 3
             }
          };

          neigh_data.push(trace1);

        }
      }
      var layout1 = {
        title: `${city_name} Crime by Neighborhood Over ${year}`,
        yaxis: { 
          title: "Count of Crime",
          tick0: 0 
        },
        xaxis: {
          title: "Month",
          tick0: 0,
          dtick: 0,
          autotick: false
        }
      };
      
      Plotly.newPlot('neigh-plot', neigh_data, layout1);

    })
    .catch((error) => console.log(error))
    .finally(() => {
      document.getElementById("button").disabled = false;
      document.getElementById("button").textContent = "Update";
    });





}

function populateDropdowns() {
  const cities = ["Atlanta", "Buffalo"];
  const cityCodes = {
    Atlanta: "atl",
    Buffalo: "buf"
  };
  let select1 = document.getElementById("selectCity");
  for (let i = 0; i < cities.length; i++) {
    let element = document.createElement("option");
    element.textContent = cities[i];
    element.value = cityCodes[element.textContent];
    select1.appendChild(element);
  }

  const years = [2010, 2011, 2012, 2013, 2014, 2015, 2016];
  let select2 = document.getElementById("selectYear");
  for (let i = 0; i < years.length; i++) {
    element = document.createElement("option");
    element.textContent = years[i];
    element.value = years[i];
    select2.appendChild(element);
  }

}

function populateCheckboxs() {

  let input1 = document.getElementById("checkbox");
  input1.innerHTML = "";

  if (city == 'atl') {
    for (let i = 0; i < alt_neighborhoods.length; i++) {
      let element = document.createElement("input");
      element.setAttribute('type', 'checkbox');
      element.setAttribute('id', alt_neighborhoods[i]);
      element.setAttribute('value', true);
      element.setAttribute('checked', true);
      let neigh_name = document.createElement("label");
      neigh_name.setAttribute('for', alt_neighborhoods[i]);
      let name_text = document.createTextNode(alt_neighborhoods[i])
      let br = document.createElement("br");
      neigh_name.appendChild(name_text);
      input1.appendChild(element);
      input1.appendChild(neigh_name);
      input1.appendChild(br);
    };
  }
  else if (city == 'buf') {
    for (let i = 0; i < buf_neighborhoods.length; i++) {
      let element = document.createElement("input");
      element.setAttribute('type', 'checkbox');
      element.setAttribute('id', buf_neighborhoods[i]);
      element.setAttribute('value', true);
      element.setAttribute('checked', true);
      let neigh_name = document.createElement("label");
      neigh_name.setAttribute('for', buf_neighborhoods[i]);
      let name_text = document.createTextNode(buf_neighborhoods[i])
      let br = document.createElement("br");
      neigh_name.appendChild(name_text);
      input1.appendChild(element);
      input1.appendChild(neigh_name);
      input1.appendChild(br);


    }
  };
};

function fetchAPIKey() {
  fetch("/key")
    .then((response) => response.text())
    .then((data) => {
      API_KEY = data;
    });
}

let API_KEY;
init();
