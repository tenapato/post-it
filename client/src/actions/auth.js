import * as api from '../api';
import { AUTH } from '../constants/actionTypes';


export const signin = (formData, history) => async (dispatch) => {
    try {
        // Log in user first
        const { data } = await api.signIn(formData);

        dispatch({type: AUTH, data});

        history.push('/');
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, history) => async (dispatch) => {
    try {
        // Sign up user first
        const { data } = await api.signUp(formData);

        dispatch({type: AUTH, data});

        history.push('/');
    } catch (error) {
        console.log(error);
        console.log('User Already exists');
        //return error.json({ message: 'hola'});

            
        //handleError();

    }
}