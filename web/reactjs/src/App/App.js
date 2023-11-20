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

import { makeStyles } from '@mui/styles';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

//import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { EVPoint, MapComponent } from '../components';


// import axios from 'axios';

const useStyles = makeStyles(() => ({
    root: {
        '& > *': {
            margin: '10px',
            width: '25ch',
        },
    },
}));

const App = () => {
    const classes = useStyles();

    // const [result, setResult] = useState('Waiting for results ...');

    // const sendHandler = async () => {
    //     try {
    //         const resp = await axios.post('/api/auth', { 'id': 'id', 'secrets': 'secrets' }, { timeout: 1000 });
    //         setResult(resp.data);
    //     } catch (err) {
    //         setResult(err);
    //     }
    // };

    // const position = [54.9717, -1.6521];

    return (

        <Container classes={classes}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h3" component="div">
                        Should I switch to an Electric Vehicle?
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    {/* <MapContainer center={position} zoom={15} scrollWheelZoom={false} style={{ width: '100%', height: '500px' }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </MapContainer> */}
                    <MapComponent/>
                </Grid>
                <Grid item xs={4}>
                    {
                        ['location 1','location 2'].map( i => <EVPoint key={i} location={i}/>)
                    }
                </Grid>
                <Grid item xs={12}>
                    <Box>
                        <Paper elevation={0}>
                            <Typography variant="p" component="div">
                        Please specify your daily driving route by indicating your start and end destination
                            </Typography>
                            <TextField id="outlined-basic" label="From" variant="outlined" />
                            <TextField id="filled-basic" label="To" variant="filled" />
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </Container>

    // {/* <div>
    //     <Button onClick={sendHandler}>Click me to get result from backend</Button>
    //     <h1>{
    //         `${JSON.stringify(result)}`
    //     }</h1>
    // </div> */}
    );
};

export default App;