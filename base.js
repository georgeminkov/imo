fetch('/api/buildings')
.then(response => response.json())
.then(buildings => {
const map = L.map('map').setView([42.697306774560765, 23.32446587858401], 12);
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/">Humanitarian OpenStreetMap Team</a>'
}).addTo(map);

buildings.forEach(building => {
console.log(building);
const iconUrl = building.investor ? `${building.investor.website}/${building.investor.logo}` : 'logo.png';
const buildingIcon = L.icon({
iconUrl: iconUrl,   //'logo.png', //building.image,
iconSize: [21, 21],
iconAnchor: [16, 32],
popupAnchor: [0, -32]
});

L.marker([building.location.lat, building.location.lng], { icon: buildingIcon })
.addTo(map)
.bindPopup(`<strong><a href="${building.link}" target="_blank">${building.name}</a></strong><br>
<img src="${building.image}" alt="${building.name}" style="width:200px;height:150px;"><br>
<strong>Investor:  </strong><a href="${building.investor ? building.investor.website : 'N/A'}" target="_blank">${building.investor ? building.investor.name : 'N/A'}</a>`);
});
})
.catch(error => console.error('Error fetching building data:', error));