import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

const MapComponent = () => {
    useEffect(() => {
        const map = L.map('map').setView([54.9717, -1.6521], 10); // Initialize map

        // Add OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Geocoding function using Nominatim
        async function geocode(location) {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`);
            const data = await response.json();
            return data[0]; // Return the first result (assuming it's the most relevant)
        }

        // Get coordinates for "from" and "to" locations
        Promise.all([geocode('Hexham'), geocode('Newcastle upon Tyne')])
            .then(([from, to]) => {
                // Get coordinates
                const fromCoords = [parseFloat(from.lat), parseFloat(from.lon)];
                const toCoords = [parseFloat(to.lat), parseFloat(to.lon)];

                // Display route on map
                L.Routing.control({
                    waypoints: [
                        L.latLng(fromCoords[0], fromCoords[1]),
                        L.latLng(toCoords[0], toCoords[1])
                    ]
                }).addTo(map);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    return <div id="map" style={{ height: '500px' }}></div>;
};

export default MapComponent;