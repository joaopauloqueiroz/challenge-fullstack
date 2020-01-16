const map = L.map('map').setView([-23.5506507, -46.6333824], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([-23.4908496, -46.6953169]).addTo(map)
    .bindPopup('João Paulo Queiroz \n 124kg')
    .openPopup();