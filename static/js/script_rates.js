function init() {
  //fetchAPIKey();
  populateDropdowns();
  updateData();

  d3.selectAll("#button").on("click", updateData);
}

function updateData() {
  document.getElementById("button").disabled = true;
  document.getElementById("button").textContent = "Loading data...";
  city = document.getElementById("selectCity").value;
  year = document.getElementById("selectYear").value;
  month = document.getElementById("selectMonth").value;
  neighborhoods = []
  fetch(`/${city}/${year}`)
    .then((data) => data.json())
    .then((data) => {
      // plot stuff here
      console.log(data);
      var month_data = data.filter(function (item) {
        return item.month == month;
      });
      console.log(month_data);
      var rateCrime = {};
            data.forEach(function getCount(item) {
                if (item.month in rateCrime)
                  rateCrime[item.month]++;
                else
                  rateCrime[item.month] = 1;
            })
      console.log(rateCrime);
      var months = Object.keys(rateCrime);     
      var count = Object.values(rateCrime);  
      
      trace = [{
        x: months,
        y: count,
        text: count,
        type: "line"
      }];

      var layout = {
        title: `Crime Amounts Over ${year}`,
        yaxis: {title: "Count of All Crime" },
        xaxis: { 
          title: "Month", 
        tick0: 0,
        dtick: 0,
        autotick: false
        }
    };

      Plotly.newPlot('plot', trace, layout);

    })
    .catch((error) => console.log(error))
    .finally(() => {
      document.getElementById("button").disabled = false;
      document.getElementById("button").textContent = "Update";
    });

  populateCheckboxs();



}

function populateDropdowns() {
  const cities = ["Atlanta", "Los Angeles", "Buffalo", "Philadelphia"];
  const cityCodes = {
    Atlanta: "atl",
    "Los Angeles": "la",
    Buffalo: "buf",
    Philadelphia: "phi",
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

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let select3 = document.getElementById("selectMonth");
  for (let i = 0; i < months.length; i++) {
    let element = document.createElement("option");
    element.textContent = months[i];
    element.value = i + 1;
    select3.appendChild(element);
  }
}

function populateCheckboxs() {
  const alt_neighborhoods = ["Bankhead/Bolton", "Betmar LaVilla", "Boulevard Heights", "Brandon", "Brookwood", "Campbelton Road", "Capitol View Manor", "Castleberry Hill", "Center Hill", "Choosewood Park", "Downtown", "Edgewood", "Grant Park", "Inman Park", "Lakewood Heights", "Lenox", "Lindberg/Morosgo", "Lindridge/Martin Manor", "Mechanicsville", "Midtown", "Old Forth Ward", "Peachtree Battle Alliance", "The Villages at Castleberry H", "Thomasville Heights", "West End"];
  const buf_neighborhoods = ["Babcock", "Black Rock", "Broadway - Filmore", "Buffalo", "Columbus", "Downtown", "Elmwood Village", "Eric County", "Forest", "Front Park", "Genesee Moselle", "Grider", "Kaisertown", "Kensington", "Kingsley", "Lakeview", "LaSalle", "Masten Park", "Military", "North Park", "Parkside", "Schiller Park", "South Ellicott", "Willert Park", "Williamsville"]
  console.log(city);
  let input1 = document.getElementById("checkbox");
  input1.innerHTML = "";
  if (city == 'atl') {
    for (let i = 0; i < alt_neighborhoods.length; i++) {
      let element = document.createElement("input");
      element.setAttribute('type', 'checkbox');
      element.setAttribute('id', alt_neighborhoods[i]);
      element.setAttribute('value', alt_neighborhoods[i]);
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
      element.setAttribute('value', buf_neighborhoods[i]);
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
