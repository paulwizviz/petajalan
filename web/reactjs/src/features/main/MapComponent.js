import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import PropTypes from 'prop-types';

const MapComponent = (props) => {
    const { start, end } = props;
    const mapRef = useRef(null);
    const tileLayerRef = useRef(null);
    const routingControlRef = useRef(null);

    useEffect(() => {
        const map = mapRef.current || L.map('map').setView([54.9717, -1.6521], 10);
        mapRef.current = map;

        const geocode = async (location) => {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`);
            const data = await response.json();
            return data[0];
        };

        Promise.all([geocode(start), geocode(end)])
            .then(([from, to]) => {

                const fromCoords = [parseFloat(from.lat), parseFloat(from.lon)];
                const toCoords = [parseFloat(to.lat), parseFloat(to.lon)];

                // Clear previous routing control if exists
                if (routingControlRef.current !== null) {
                    routingControlRef.current.removeFrom(map);
                    routingControlRef.current = null;
                }

                // Display route on map
                const routingControl = L.Routing.control({
                    waypoints: [
                        L.latLng(fromCoords[0], fromCoords[1]),
                        L.latLng(toCoords[0], toCoords[1]),
                    ],
                });
                routingControl.addTo(map);
                routingControlRef.current = routingControl;
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        return () => {
            // Clean up: remove the routing control
            if (routingControlRef.current !== null) {
                routingControlRef.current.remove();
                routingControlRef.current = null;
            }
        };
    }, [start, end]);

    useEffect(() => {
        const map = mapRef.current;

        // Add OpenStreetMap tile layer if not already added
        if (!tileLayerRef.current) {
            const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 18,
                id: 'tileLayer'
            }).addTo(map);

            tileLayerRef.current = tileLayer;
        }

        return () => {
            // Clean up: remove the tile layer
            if (tileLayerRef.current) {
                map.removeLayer(tileLayerRef.current);
                tileLayerRef.current = null;
            }
        };
    }, []);

    return <div id="map" style={{ height: '500px' }}></div>;
};

MapComponent.propTypes = {
    start: PropTypes.string,
    end: PropTypes.string,
};

export default MapComponent;