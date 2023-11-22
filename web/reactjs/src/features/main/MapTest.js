import React, {useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const geocode = async (location) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`);
    const data = await response.json();
    console.log('-->',data);
    return data[0];
};

const MapTest = (props) => {
    const { start, end } = props;
    const [routeData, setRouteData] = useState(null);
    useEffect(() => {
        const fetchRouteData = async () => {
            try {
                if (start && end) {
                    const s = await geocode(start);
                    const e = await geocode(end);
                    setRouteData(
                        <div>
                            <div>{s.lat} - {s.lon} - {s.display_name}</div>
                            <div>{e.lat} - {e.lon} - {e.display_name}</div>
                        </div>);
                }
            } catch (error) {
                console.log(error);
                setRouteData(<div>Default</div>);
            }
        };
        fetchRouteData();
    }, [start, end]);

    return (
        <div>
            {routeData}
        </div>
    );
};

MapTest.propTypes = {
    start: PropTypes.string,
    end: PropTypes.string,
};

export default MapTest;