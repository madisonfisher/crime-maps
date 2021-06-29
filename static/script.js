function updateData() {
  document.getElementById("button").disabled = true;
  document.getElementById("button").textContent = "Loading data...";
  city = document.getElementById("selectCity").value;
  year = document.getElementById("selectYear").value;
  d3.json(`/${city}/${year}`)
    .then((data) => {
      //plot stuff here
      updateMap(data);
      console.log(data);
    })
    .catch((error) => console.log(error))
    .finally(() => {
      document.getElementById("button").disabled = false;
      document.getElementById("button").textContent = "Update";
    });
}

function populateDropdowns() {
  const cities = ["Atlanta", "Los Angeles", "Buffalo", "Philadelphia"];
  const cityCodes = {
    Atlanta: "atl",
    "Los Angeles": "la",
    Buffalo: "buf",
    Philadelphia: "phi",
  };
  const years = [2010, 2011, 2012, 2013, 2014, 2015, 2016];

  let select = document.getElementById("selectCity");
  for (let i = 0; i < Object.keys(cityCodes).length; i++) {
    let element = document.createElement("option");
    element.textContent = cities[i];
    element.value = cityCodes[element.textContent];
    select.appendChild(element);
  }

  select = document.getElementById("selectYear");
  for (let i = 0; i < years.length; i++) {
    element = document.createElement("option");
    element.textContent = years[i];
    element.value = years[i];
    select.appendChild(element);
  }
}

function updateMap(data) {
  let map = L.map("main-map").setView([33.76, -84.43], 10);
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken: API_KEY,
    }
  ).addTo(map);
  // data.forEach((entry) => {
  //   L.marker([entry.lat, entry.long]).addTo(map);
  // });
  L.marker([data[0].lat, data[0].long]).addTo(map).bindPopup(data[0].crime);
}

d3.selectAll("#button").on("click", updateData);
populateDropdowns();
setTimeout(updateData, 100);
