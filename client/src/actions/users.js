import * as api from '../api';
import { FETCH_ALL, DELETE } from '../constants/actionTypes';

export const fetchUsers = () => async (dispatch) => {
    try {
      const { data } = await api.fetchUsers();
      dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  export const deleteUser = (id) => async (dispatch) => {
    try {
      await await api.deleteUser(id);
      dispatch({ type: DELETE, payload: id });
      
    } catch (error) {
      console.log(error);
    }
  };