import { set, push, del } from 'object-path-immutable';
import { ACTION_TYPES } from '../constants/types';
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
        case ACTION_TYPES.RESULT_APPEND:
            if (action.params.path && action.params.result) {
                state = push(state, action.params.path, action.params.result);
            }
            break;
        case ACTION_TYPES.RESULT_CLEAR:
            if (action.params.path) {
                state = set(state, action.params.path, []);
            }
            break;
        case ACTION_TYPES.RESULT_DELETE:
            if (action.params.path) {
                state = del(state, action.params.path);
            }
            break;
        case ACTION_TYPES.RESULT_SHOW_LOADER:
            if (action.params.path) {
                state = set(state, action.params.path, true);
            }
            break;
        case ACTION_TYPES.RESULT_HIDE_LOADER:
            if (action.params.path) {
                state = set(state, action.params.path, false);
            }
            break;
        case ACTION_TYPES.RESULT_SHOW_ERROR:
            if (action.params.path) {
                state = set(state, action.params.path, true);
            }
            break;
        case ACTION_TYPES.RESULT_HIDE_ERROR:
            if (action.params.path) {
                state = set(state, action.params.path, false);
            }
            break;
    }
    return state;
};

export default reducer;