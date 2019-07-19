import * as actionTypes from '../constants/actionTypes';
import IData from '../types/data';

export const appendResult = (data: IData) => {
    return {
        type: actionTypes.APPEND_RESULT,
        data: data
    }
};

export const clearResults = () => {
    return {
        type: actionTypes.CLEAR_RESULTS
    }
};