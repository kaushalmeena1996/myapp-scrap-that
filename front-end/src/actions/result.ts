import axios from 'axios';
import { Dispatch } from 'react';
import * as actionTypes from '../constants/actionTypes';
import IResult from '../types/result';

export const appendResult = (result: IResult) => {
    return {
        type: actionTypes.RESULT_APPEND,
        params: {
            result: result
        }
    };
};

export const loadResults = () => {
    return (dispatch: Dispatch<any>, getState: any) => {
        dispatch(showLoader());

        axios.post('http://localhost:4000/api/scrap', getState().builder.operations)
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

export const deleteResult = (index: number) => {
    return {
        type: actionTypes.RESULT_DELETE,
        params: {
            index: index
        }
    };
};

export const clearResults = () => {
    return {
        type: actionTypes.RESULT_CLEAR
    };
};

export const showLoader = () => {
    return {
        type: actionTypes.RESULT_SHOW_LOADER
    };
};

export const hideLoader = () => {
    return {
        type: actionTypes.RESULT_HIDE_LOADER
    };
};

export const showError = () => {
    return {
        type: actionTypes.RESULT_SHOW_ERROR
    };
};

export const hideError = () => {
    return {
        type: actionTypes.RESULT_HIDE_ERROR
    };
};