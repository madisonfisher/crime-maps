function init() {
  populateDropdowns();
  setTimeout(updateData, 100);
}

function updateData() {
  city = document.getElementById("selCity").value;
  year = document.getElementById("selYear").value;
  d3.json(`/${city}/${year}`).then((data) => console.log(data));
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

  let select = document.getElementById("selCity");
  for (let i = 0; i < Object.keys(cityCodes).length; i++) {
    let element = document.createElement("option");
    element.textContent = cities[i];
    element.value = cityCodes[element.textContent];
    select.appendChild(element);
  }

  select = document.getElementById("selYear");
  for (let i = 0; i < years.length; i++) {
    element = document.createElement("option");
    element.textContent = years[i];
    element.value = years[i];
    select.appendChild(element);
  }
}

d3.selectAll("#selYear").on("change", updateData);
d3.selectAll("#selCity").on("change", updateData);
init();
