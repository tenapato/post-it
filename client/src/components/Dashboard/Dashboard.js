import React from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, TextField, DataGrid } from '@material-ui/core'
import useStyles from './styles';

import Datatable from '../DataTable/Datatable'

export const Dashboard = () => {
    const classes = useStyles();
    return (
        <Container component="main" maxWidth = "xl" alignItems="left" justifyContent="space-between">
            <Paper className = {classes.paper} elevation={3}>
                <Typography variant="h5">Registered Users</Typography>
                <Datatable flexDirection = "row" />
            </Paper>
        </Container>
    )
}


export default Dashboard;