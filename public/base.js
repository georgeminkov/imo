fetch('/api/buildings')
    .then(response => response.json())
    .then(buildings => {
        const map = L.map('map').setView([42.697306774560765, 23.32446587858401], 12);
        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/">Humanitarian OpenStreetMap Team</a>'
        }).addTo(map);

        const dropdownButton = document.getElementById('dropdown-button');
        const dropdownContent = document.getElementById('dropdown-content');
        const investors = {};
        const markers = [];
        const allInvestorsOption = document.createElement('div');
        allInvestorsOption.className = 'dropdown-option';
        allInvestorsOption.innerText = 'All Investors';
        allInvestorsOption.addEventListener('click', () => {
            dropdownButton.innerText = 'Filter: All Investors';
            dropdownContent.classList.remove('show');
            filterMarkers("");
        });
        dropdownContent.appendChild(allInvestorsOption);
        buildings.forEach(building => {
            if (building.investor) {
                investors[building.investor.name] = building.investor;
            }

            const iconUrl = building.investor ? `${building.investor.website}/${building.investor.logo}` : 'logo.png';
            const buildingIcon = L.icon({
                iconUrl: iconUrl,
                iconSize: [21, 21],
                iconAnchor: [16, 32],
                popupAnchor: [0, -32]
            });

            const marker = L.marker([building.location.lat, building.location.lng], { icon: buildingIcon })
                .bindPopup(`<strong><a href="${building.link}" target="_blank">${building.name}</a></strong><br>
      <img src="${building.image}" alt="${building.name}" style="width:200px;height:150px;"><br>
      <strong>Investor:  </strong><a href="${building.investor ? building.investor.website : 'N/A'}" target="_blank">${building.investor ? building.investor.name : 'N/A'}</a>`);
            markers.push({ marker, investor: building.investor ? building.investor.name : null });
            marker.addTo(map);
        });

        for (const [name, investor] of Object.entries(investors)) {
            const option = document.createElement('div');
            option.className = 'dropdown-option';
            option.innerHTML = `<div><img src="${investor.website}/${investor.logo}" alt="${name}" class="dropdown-logo"></div> <div class="dropdown-text" >${name}</div>`;
            option.addEventListener('click', () => {
                dropdownButton.innerHTML = `<div><img src="${investor.website}/${investor.logo}" alt="${name}" class="dropdown-logo"></div><div>${name}</div>`;
                dropdownContent.classList.remove('show');
                filterMarkers(name);
            });
            dropdownContent.appendChild(option);
        }

        dropdownButton.addEventListener('click', () => {
            dropdownContent.classList.toggle('show');
        });

        function filterMarkers(selectedInvestor) {
            markers.forEach(({ marker, investor }) => {
                if (selectedInvestor === "" || investor === selectedInvestor) {
                    marker.addTo(map);
                } else {
                    map.removeLayer(marker);
                }
            });
        }
    })
    .catch(error => console.error('Error fetching building data:', error));