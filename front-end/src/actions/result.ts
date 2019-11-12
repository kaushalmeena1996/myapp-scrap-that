import axios from 'axios';
import { Dispatch } from 'react';
import { ACTION_TYPES } from '../constants/types';
import IResult from '../types/result';

export const appendResult = (result: IResult) => {
    return {
        type: ACTION_TYPES.RESULT_APPEND,
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

export const deleteResult = (resultIndex: number) => {
    return {
        type: ACTION_TYPES.RESULT_DELETE,
        params: {
            resultIndex: resultIndex
        }
    };
};

export const clearResults = () => {
    return {
        type: ACTION_TYPES.RESULT_CLEAR
    };
};

export const showLoader = () => {
    return {
        type: ACTION_TYPES.RESULT_SHOW_LOADER
    };
};

export const hideLoader = () => {
    return {
        type: ACTION_TYPES.RESULT_HIDE_LOADER
    };
};

export const showError = () => {
    return {
        type: ACTION_TYPES.RESULT_SHOW_ERROR
    };
};

export const hideError = () => {
    return {
        type: ACTION_TYPES.RESULT_HIDE_ERROR
    };
};