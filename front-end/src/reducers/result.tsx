import update from 'immutability-helper';
import * as actionTypes from '../constants/actionTypes';
import IAction from '../types/action';
import { IResults } from '../types/store';


const initialState: IResults = {
    tables: [],
    loader: false,
    error: false
};

const reducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case actionTypes.APPEND_RESULT:
            state = update(state, {
                tables: {
                    $push: [action.params.table]
                }
            });
            break;
        case actionTypes.CLEAR_RESULTS:
            state = update(state, {
                tables: {
                    $set: []
                }
            });
            break;
        case actionTypes.SHOW_LOADER:
            state = update(state, {
                loader: {
                    $set: true
                }
            });
            break;
        case actionTypes.HIDE_LOADER:
            state = update(state, {
                loader: {
                    $set: false
                }
            });
            break;
        case actionTypes.SHOW_ERROR:
            state = update(state, {
                error: {
                    $set: true
                }
            });
            break;
        case actionTypes.HIDE_ERROR:
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