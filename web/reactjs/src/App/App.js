// Copyright 2023 Paul Sitoh
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

//import React, { useState } from 'react';
import React from 'react';

// import { makeStyles } from '@mui/styles';
// import { Button } from '@mui/material';

import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
// import axios from 'axios';

// const useStyles = makeStyles(() => ({
//     root: {
//         '& > *': {
//             margin: '10px',
//             width: '25ch',
//         },
//     },
// }));

const App = () => {
    // const classes = useStyles();

    // const [result, setResult] = useState('Waiting for results ...');

    // const sendHandler = async () => {
    //     try {
    //         const resp = await axios.post('/api/auth', { 'id': 'id', 'secrets': 'secrets' }, { timeout: 1000 });
    //         setResult(resp.data);
    //     } catch (err) {
    //         setResult(err);
    //     }
    // };

    const position = [51.505, -0.09];

    return (
        // <div classes={classes}>
        <div>
   
            <MapContainer center={position} zoom={15} scrollWheelZoom={false}  style={{ width: '100%', height: '500px' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>

      
            {/* <div>
                <Button onClick={sendHandler}>Click me to get result from backend</Button>
                <h1>{
                    `${JSON.stringify(result)}`
                }</h1>
            </div> */}

        </div>
    );
};

export default App;