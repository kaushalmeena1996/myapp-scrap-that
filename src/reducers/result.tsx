import update from 'immutability-helper';
import * as actionTypes from '../constants/actionTypes';
import IAction from '../types/action';

const initialState: any[] = [];

const reducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case actionTypes.APPEND_RESULT:
            state = update(state, {
                $push: [action.data]
            });
            break;
        case actionTypes.CLEAR_RESULTS:
            state = update(state, {
                $set: []
            });
            break;
    }

    return state;
};

export default reducer;