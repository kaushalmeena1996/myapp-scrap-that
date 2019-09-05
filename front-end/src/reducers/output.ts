import update from 'immutability-helper';
import * as actionTypes from '../constants/actionTypes';
import IAction from '../types/action';
import { IOutput } from '../types/store';

const initialState: IOutput = {
    results: [{
        url: 'abc.com',
        fields: ['abc'],
        data: [[1], [2], [3], [4], [5], [6], [7], [8]]
    }],
    loader: false,
    error: false
};

const reducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case actionTypes.RESULT_APPEND:
            state = update(state, {
                results: {
                    $push: [action.params.result]
                }
            });
            break;
        case actionTypes.RESULT_CLEAR:
            state = update(state, {
                results: {
                    $set: []
                }
            });
            break;
        case actionTypes.RESULT_DELETE:
            if (action.params.index !== -1) {
                state = update(state, {
                    results: {
                        $splice: [[action.params.index, 1]]
                    }
                });
            }
            break;
        case actionTypes.RESULT_SHOW_LOADER:
            state = update(state, {
                loader: {
                    $set: true
                }
            });
            break;
        case actionTypes.RESULT_HIDE_LOADER:
            state = update(state, {
                loader: {
                    $set: false
                }
            });
            break;
        case actionTypes.RESULT_SHOW_ERROR:
            state = update(state, {
                error: {
                    $set: true
                }
            });
            break;
        case actionTypes.RESULT_HIDE_ERROR:
            state = update(state, {
                error: {
                    $set: false
                }
            });
            break;
    }

    return state;
};

export default reducer;