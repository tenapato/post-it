import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory} from 'react-router-dom';


import { fetchUsers, deleteUser } from '../../actions/users';

import useStyles from './styles';

function createData(id, name, email) {
  return { id, name, email};
}


const submitHandler = () =>{
  console.log('User Deleted');
  //history.push('/Dashboard')
} 



const DataTable = () => {
  const classes = useStyles();
  const users = useSelector((state) => state.users)
  //const history = useHistory();

  const dispatch = useDispatch();  //Initailize redux dispatch function
    useEffect(()=>{  
        dispatch(fetchUsers());
    }, [dispatch]);
  //const dispatch = useDispatch();
    console.log(users);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Email</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.name}>
              <TableCell component="th" scope="row">
                {user._id}
              </TableCell>
              <TableCell align="center">{user.name}</TableCell>
              <TableCell align="center">{user.email}</TableCell>
              <Button className={classes.delete} onClick={()=> dispatch(deleteUser(user._id))}> Delete </Button>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;