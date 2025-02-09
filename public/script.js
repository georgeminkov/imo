  const buildings = <%- JSON.stringify('buildings') %>;
  const map = L.map('map').setView([ 42.697306774560765, 23.32446587858401, 13]);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  buildings.forEach(building => {
    L.marker([building.location.lat, building.location.lng])
      .addTo(map)
      .bindPopup(`<strong>${building.name}</strong><br>${building.link}`)
      .openPopup();
  });
  
  
  