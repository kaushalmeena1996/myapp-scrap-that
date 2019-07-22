import * as actionTypes from '../constants/actionTypes';
import IResult from '../types/result';
import axios from 'axios';
import { Dispatch } from 'react';

export const appendResult = (result: IResult) => {
    return {
        type: actionTypes.APPEND_RESULT,
        params: {
            result: result
        }
    };
};


export const loadResults = () => {
    return (dispatch: Dispatch<any>, getState: any) => {
        dispatch(showLoader());

        axios.post('http://localhost:4000/api/scraper', getState().operations.tasks)
            .then(response => {
                dispatch(hideLoader());
                dispatch(appendResult(response.data.result))
            })
            .catch(error => {
                console.error(error);
                dispatch(hideLoader());
                dispatch(showError());
            });
    };
};

export const clearResults = () => {
    return {
        type: actionTypes.CLEAR_RESULTS
    };
};

export const showLoader = () => {
    return {
        type: actionTypes.SHOW_LOADER
    };
};

export const hideLoader = () => {
    return {
        type: actionTypes.HIDE_LOADER
    };
};

export const showError = () => {
    return {
        type: actionTypes.SHOW_ERROR
    };
};

export const hideError = () => {
    return {
        type: actionTypes.HIDE_ERROR
    };
};