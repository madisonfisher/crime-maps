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

fetch("/api_key").then((data) => {
  API_KEY = data;
});
populateDropdowns();
setTimeout(updateData, 100);
d3.selectAll("#button").on("click", updateData);
