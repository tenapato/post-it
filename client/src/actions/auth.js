import * as api from '../api';
import { AUTH } from '../constants/actionTypes';

export const signin = (formData, history) => async (dispatch) => {
    try {
        // Log in user first
        
        history.push('/');
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, history) => async (dispatch) => {
    try {
        // Sign up user first
        
        history.push('/');
    } catch (error) {
        console.log(error);
    }
}