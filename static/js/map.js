const coordinates = {
  atl: [33.7472, -84.3901],
  buf: [42.8825, -78.8191],
};

function updateMap(data) {
  let map = L.map("main-map").setView(coordinates[city], 12);
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
  for (let i = 0; i < 10; i++) {
    L.marker([data[i].lat, data[i].long]).addTo(map).bindPopup(data[i].crime);
  }
}
