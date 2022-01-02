import React, { useState } from 'react';
import { useInterval } from '../functions/useInterval';
import UpdateIcon from '@mui/icons-material/Update';
import { Card, CardContent, Grid, Typography, Button, Tooltip, Box, ListItemButton, ListItemText, ListItem, List } from "@mui/material";

export const Home: React.FC = ({}) => {
    type pingStatus = { state: { status: string, type: string }, status: number }
    const [data, setData] = useState<pingStatus>({
        state: { status: 'offline', type: '' }, status: 0
    });
    const [selectedVersion, setSelectedVersion] = useState<string>('minecraft/latest');
    const [versionMenu, setVersionMenu] = useState<boolean>(false);
    const [log, setLog] = useState<[string]>(['']);

    const pingServer = () => {
        // get JSON response from localhost:3001
        fetch('http://localhost:3001/', { method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }})
            .then(res => res.json())
            .then(data => {
                setData(data);
                console.log("Ping");
            }).catch(e => {
                setData({ state: { status: 'ERROR', type: '' }, status: 0 });
                console.log(e);
            }) 
    }

    const quickStart = (version: string) => {
        fetch(`http://localhost:3001/start/${selectedVersion}`, { method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }})
        .then(res => res.json())
        .then(data => {
            console.log(data);
        });
    }

    const quickStop = (version: string) => {
        fetch('http://localhost:3001/stop', { method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }})
        .then(res => res.json())
        .then(data => {
            console.log(data);
        });
    }

    const getLog = () => {
        fetch('http://localhost:3001/get-log', { method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }})
        .then(res => res.json())
        .then(logData => {
            let string = JSON.stringify(logData[0]);
            setLog(logData[0].reverse());
        });
    }
    
    useInterval(() => {
        pingServer();
        if(data.state.status === 'running' || data.state.status === 'initialising') {
            getLog();
        }
    }, 1000)

    return (
        <Card sx={{height:'90vh'}}>
            <CardContent>
                <Typography variant="h5">
                    Welcome to the Home Page!
                </Typography>
                <Typography variant="body1">
                    This is the home page, a brief overview of all of the statistics of the server and minecraft node (if running).
                </Typography>
                <Grid container spacing={6} sx={{paddingTop:'5vh', paddingLeft:'5vw', paddingRight:'5vw'}}>
                    <Grid item xs={6}>
                        <Card>
                            <Typography variant="h6">
                                API Status
                            </Typography>
                            <CardContent>
                                <Typography variant="body1">
                                    <Grid container spacing={3}>
                                        <Grid item xs={8}>
                                            <Typography variant="body1">
                                                Version: v1.2.1a
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography variant="body1">
                                                Status: {data.state.status.toUpperCase()}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card>
                            <Typography variant="h6">
                                Node Status
                            </Typography>
                            <CardContent>
                                <Typography variant="body1">
                                    <Grid container spacing={3}>
                                        <Grid item xs={8}>
                                            <Typography variant="body1">
                                                Node Version: v10.15.0
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography variant="body1">
                                                Status: {data.state.status === "running" ? 'Running' : 'Not Running'}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card>
                            <Typography variant="h6">
                                Quick Actions
                            </Typography>
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Box>
                                            <Tooltip title="Select your minecraft version..." placement="top">
                                                <ListItemButton onClick={() => setVersionMenu(!versionMenu)}>
                                                    <UpdateIcon />
                                                    <ListItemText
                                                        primary="Minecraft Version"
                                                        sx={{paddingLeft:'2vw'}}

                                                        primaryTypographyProps={{
                                                            fontSize: 15,
                                                            fontWeight: 'medium',
                                                            lineHeight: '20px',
                                                            mb: '2px',
                                                        }}
                                                        
                                                        secondary={`selected: ${selectedVersion}`}
                                                        secondaryTypographyProps={{
                                                            noWrap: true,
                                                            fontSize: 12,
                                                            lineHeight: '16px',
                                                        }}/>
                                                </ListItemButton>
                                            </Tooltip>
                                            {versionMenu &&
                                                ['minecraft/latest', 'spigot/1.18.1'].map((version, index) => {
                                                    return(
                                                        <ListItemButton key={index} onClick={() => {
                                                            setSelectedVersion(version);
                                                            setVersionMenu(false);
                                                        }}>
                                                            <ListItemText
                                                                primary={version}
                                                                sx={{paddingLeft:'2vw'}}
                                                                primaryTypographyProps={{
                                                                    fontSize: 15,
                                                                    fontWeight: 'medium',
                                                                    lineHeight: '20px',
                                                                    mb: '2px',
                                                                }}
                                                                secondary={selectedVersion === version ? 'selected' : ''}
                                                                secondaryTypographyProps={{
                                                                    noWrap: true,
                                                                    fontSize: 12,
                                                                    lineHeight: '16px',
                                                                }}/>
                                                        </ListItemButton>
                                                    )
                                                })}
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4}>
                                        {data.state.status === "stopped" || data.state.status === "initialising" ?
                                        <Tooltip title="Start a server based on your configuration's version." disableInteractive placement='top'> 
                                            <Button variant="contained" color="primary" onClick={() => quickStart(selectedVersion)}> 
                                                Start
                                            </Button>
                                        </Tooltip> :                                         
                                        <Button variant="contained" color="primary" disabled>
                                            Start
                                        </Button>}
                                    </Grid>
                                    <Grid item xs={3.5}>
                                        {data.state.status === "stopped" || data.state.status === "initialising" ? 
                                        <Button variant="contained" color="primary" disabled>
                                            Stop
                                        </Button> : 
                                        <Button variant="contained" color="primary" onClick={() => quickStop("")}>
                                            Stop
                                        </Button>}
                                    </Grid>
                                    <Grid item xs={4}>
                                        {data.state.status === "running" || data.state.status !== "error" ? 
                                        <Button variant="contained" color="primary" disabled>
                                            command
                                        </Button> : 
                                        <Button variant="contained" color="primary" disabled>
                                            command
                                        </Button>}
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>     
                    <Grid item xs={6}>
                        <Card>
                            <Typography variant="h6">
                                Chat Log
                            </Typography>
                            <CardContent>
                                <Box sx={{overflowY:'auto', height:'20vh'}}>
                                    <List sx={{display:'inline-block'}}>
                                        {log.map((item, index) => {
                                            let color = index % 2 === 0 ? '#272727' : '#121212';
                                            return (
                                            <ListItem key={index} sx={{backgroundColor:color}}>
                                                <ListItemText
                                                    primary={item}
                                                    primaryTypographyProps={{
                                                        fontSize: 9,
                                                        fontWeight: 'medium',
                                                        lineHeight: '10px',
                                                        mb: '2px',
                                                        color: '#fff',
                                                    }}/>
                                            </ListItem>
                                        )})}
                                    </List>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>                                                                    
                </Grid>
            </CardContent>
        </Card>
    )
}