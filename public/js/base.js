fetch('/api/buildings')
    .then(response => response.json())
    .then(buildings => {
        const map = L.map('map', {
            maxBounds: [
                [42.0, 23.0],
                [43.0, 24.0]
            ],
            maxBoundsViscosity: 1.0
        }).setView([42.697306774560765, 23.32446587858401], 12);
        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/">Humanitarian OpenStreetMap Team</a>'
        }).addTo(map);

        const dropdownButton = document.getElementById('dropdown-button');
        const dropdownContent = document.getElementById('dropdown-content');
        const investors = {};
        const markers = [];

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
            const customIcon = L.divIcon({
                className: '',
                html: `<div class="custom-pin"><img src="${iconUrl}" alt="Pin Image" /></div>`,
                iconSize: [21, 21],
                iconAnchor: [11, 22]
                });

            const marker = L.marker([building.location.lat, building.location.lng], { icon: customIcon })
                .bindPopup(`<strong><a href="${building.link}" target="_blank">${building.name}</a></strong><br>
        <img src="${building.image}" alt="${building.name}" style="width:200px;height:150px;"><br>
        <strong>Investor:  </strong><a href="${building.investor ? building.investor.website : 'N/A'}" target="_blank|_parent">${building.investor ? building.investor.name : 'N/A'}</a>
        <strong> Stage:  </strong><a>${building.stage ? building.stage : "Unknown"}</a>`);
            markers.push({ marker, investor: building.investor ? building.investor.name : null });
            marker.addTo(map);
        });
        const sortedInvestorNames = Object.keys(investors).sort((a, b) => {
            const isPremiumA = investors[a].premium ? 1 : 0;
            const isPremiumB = investors[b].premium ? 1 : 0;
            if (isPremiumA !== isPremiumB) {
                return isPremiumB - isPremiumA;
            }
            return a.localeCompare(b);
        });
        sortedInvestorNames.unshift("All Investors")
        console.log(sortedInvestorNames)
        sortedInvestorNames.forEach(name => {
            console.log("here is the forEach name: "+name)
            if (name !== "All Investors") {
                const investor = investors[name];
                // console.log(investor)
                const option = document.createElement('div');
                option.className = 'dropdown-option';
                option.innerHTML = `<div class="dropdown-logo"><img src="${investor.website}/${investor.logo}" alt="${name}"></div><div class="dropdown-text">${name}</div>`;
                option.addEventListener('click', () => {
                    dropdownButton.innerHTML = `<div class="dropdown-logo"><img src="${investor.website}/${investor.logo}" alt="${name}"></div><div class="dropdown-text">${name}</div>`;
                    dropdownContent.classList.remove('show');
                    filterMarkers(name);
                });
                dropdownContent.appendChild(option);
                console.log(option)
            } else {
                const option = document.createElement('div');
                option.className = 'dropdown-option';
                option.innerHTML = `<div class="dropdown-logo"><img src="img/logo.png" alt="All Investors"></div><div class="dropdown-text">All Investors</div>`;
                option.addEventListener('click', () => {
                    dropdownButton.innerHTML = `<div class="dropdown-logo"><img src="img/logo.png" alt="All Investors"></div><div class="dropdown-text">All Investors</div>`;
                    dropdownContent.classList.remove('show');
                    filterMarkers(name);
                });
                dropdownContent.appendChild(option);
                console.log(option)
            }
        });

        dropdownButton.addEventListener('click', () => {
            dropdownContent.classList.toggle('show');
        });

        function filterMarkers(selectedInvestor) {
            markers.forEach(({ marker, investor }) => {
                if (selectedInvestor === "" || selectedInvestor === "All Investors" || investor === selectedInvestor) {
                    marker.addTo(map);
                } else {
                    map.removeLayer(marker);
                }
            });
        }
    })
    .catch(error => console.error('Error fetching building data:', error));