// Initialize the map
var map = L.map('map').setView([0, 0], 2);

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Define depth colors
var depthColors = {
    '0-10': 'green',
    '10-30': 'greenyellow',
    '30-50': 'yellow',
    '50-70': 'orange',
    '70-90': 'orangered',
    '90+': 'red'
}

// Create legend
var legend = L.control({position: 'bottomleft'});
legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'legend');
    div.innerHTML += '<div class="legend-title">Depth</div>';
    for (var key in depthColors) {
        div.innerHTML += '<div class="legend-item"><span class="legend-circle" style="background-color:' + depthColors[key] + '"></span>' + key + '</div>';
    }
    return div;
};
legend.addTo(map);

// Fetch earthquake data
fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson')
    .then(response => response.json())
        .then(data => {
            // Loop through each earthquake data point
            data.features.forEach(feature => {
                var mag = feature.properties.mag;
                var depth = feature.geometry.coordinates[2];
                var latitude = feature.geometry.coordinates[1];
                var longitude = feature.geometry.coordinates[0];

                // Define marker size based on magnitude
                var markerSize = mag * 3;

                // Define color based on depth
                var color;
                if (depth < 10) {
                    color = depthColors['0-10'];
                } else if (depth < 30) {
                    color = depthColors['10-30'];
                } else if (depth < 50) {
                    color = depthColors['30-50'];
                } else if (depth < 70) {
                    color = depthColors['50-70'];
                } else if (depth < 90) {
                    color = depthColors['70-90'];
                } else {
                    color = depthColors['90+'];
                }

                // Create marker
                var marker = L.circleMarker([latitude, longitude], {
                    radius: markerSize,
                    fillColor: color,
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                }).addTo(map);

                // Bind popup with earthquake information
                marker.bindPopup(`<b>Location:</b> ${feature.properties.place}<br><b>Magnitude:</b> ${mag}<br><b>Depth:</b> ${depth} km`);
            });
        });
