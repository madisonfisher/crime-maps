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
