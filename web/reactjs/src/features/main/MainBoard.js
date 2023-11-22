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

import React, { useState } from 'react';


import { makeStyles } from '@mui/styles';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import PropTypes from 'prop-types';

import { EVPoint } from '../../components';
//import MapComponent from './MapComponent';
import MapTest from './MapTest';

const useStyles = makeStyles(() => ({
    root: {
        '& > *': {
            margin: '10px',
            width: '25ch',
        },
    },
}));


const MainBoard = () => {

    const classes = useStyles();
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [fromError, setFromError] = useState(false);
    const [toError, setToError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        setFromError(false);
        setToError(false);

        if (from == ''){
            setFromError(true);
        }

        if (to == ''){
            setToError(true);
        }

    };

    return (
        <Container classes={classes}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h3" component="div">
                        Should I switch to an Electric Vehicle?
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    {
                    /* <MapComponent start={from} end={to} /> */
                    }
                    <MapTest start={from} end={to}/>
                </Grid>
                <Grid item xs={4}>
                    {
                        ['location 1', 'location 2'].map(i => <EVPoint key={i} location={i} />)
                    }
                </Grid>
                <Grid item xs={12}>
                    <Box>
                        <Paper elevation={0}>
                            <Typography variant="p" component="div">
                                Please specify your daily driving route by indicating your start and end destination
                            </Typography>
                            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                                <TextField 
                                    id="from-field" 
                                    label="From" 
                                    variant="outlined" 
                                    fullWidth
                                    required
                                    onChange={(e) => setFrom(e.target.value)}
                                    error={fromError}/>
                                <TextField 
                                    id="to-field" 
                                    label="To" 
                                    variant="outlined" 
                                    fullWidth
                                    required
                                    onChange={(e) => setTo(e.target.value)}
                                    error={toError}/>
                                <Button variant="contained">Submit</Button>
                            </form>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );

};

MainBoard.propTypes = {
    classes: PropTypes.object,
};

export default MainBoard;