function init() {
  fetch("/test")
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
      const testString = data;
      console.log(testString);
    });

  fetch("/api_key")
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
      const API_KEY = data;
      console.log(API_KEY);
    });

  populateDropdowns();
  setTimeout(updateData, 100);
  d3.selectAll("#button").on("click", updateData);
}

function updateData() {
  document.getElementById("button").disabled = true;
  document.getElementById("button").textContent = "Loading data...";
  city = document.getElementById("selectCity").value;
  year = document.getElementById("selectYear").value;
  d3.json(`/${city}/${year}`)
    .then((data) => {
      //plot stuff here
      console.log(data);
      updateMap(data);
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
  let select = document.getElementById("selectCity");
  for (let i = 0; i < Object.keys(cityCodes).length; i++) {
    let element = document.createElement("option");
    element.textContent = cities[i];
    element.value = cityCodes[element.textContent];
    select.appendChild(element);
  }

  const years = [2010, 2011, 2012, 2013, 2014, 2015, 2016];
  select = document.getElementById("selectYear");
  for (let i = 0; i < years.length; i++) {
    element = document.createElement("option");
    element.textContent = years[i];
    element.value = years[i];
    select.appendChild(element);
  }
}

init();
