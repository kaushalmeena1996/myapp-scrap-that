import update from 'immutability-helper';
import * as actionTypes from '../constants/actionTypes';
import { OPERATION_TYPES } from '../constants/operations';
import { formatHeading, generateRandomId } from '../helpers/utilities';
import IAction from '../types/action';
import IOperation from '../types/operation';

const initialState: IOperation[] = [];

const reducer = (state = initialState, action: IAction) => {
    let newOperation: any,
        index: number;

    switch (action.type) {
        case actionTypes.APPEND_OPERATION:
            newOperation = OPERATION_TYPES.find((type) => type.typeId === action.typeId);

            if (newOperation) {
                newOperation.id = generateRandomId();
                newOperation.outputs = {};
                newOperation.errors = {};

                newOperation.heading = formatHeading(newOperation.outputFormat, newOperation.outputs);

                state = update(state, {
                    $push: [newOperation]
                });
            }
            break;
        case actionTypes.UPDATE_OPERATION:
            index = state.findIndex((item: any) => item.id === action.id);

            if (index !== -1) {
                let message = '',
                    regex,
                    i;

                for (i = 0; i < action.validators.length; i++) {
                    regex = new RegExp(action.validators[i].regex);

                    if (regex.test(action.value) === false) {
                        message = action.validators[i].message;
                        break;
                    }
                }

                if (message.length === 0) {
                    state = update(state, {
                        [index]: {
                            outputs: {
                                [action.name]: { $set: action.value }
                            }
                        }
                    });

                    state = update(state, {
                        [index]: {
                            heading: { $set: formatHeading(state[index].outputFormat, state[index].outputs) }
                        }
                    });
                }

                state = update(state, {
                    [index]: {
                        errors: {
                            [action.name]: { $set: message }
                        }
                    }
                });
            }
            break;
        case actionTypes.DELETE_OPERATION:
            index = state.findIndex((item: any) => item.id === action.id);

            if (index !== -1) {
                state = update(state, {
                    $splice: [[index, 1]]
                });
            }
            break;
        case actionTypes.MOVE_UP_OPERATION:
            index = state.findIndex((item: any) => item.id === action.id);

            if (index > 0) {
                state = update(state, {
                    [index]: { $set: state[index - 1] },
                    [index - 1]: { $set: state[index] }
                });
            }
            break;
        case actionTypes.MOVE_DOWN_OPERATION:
            index = state.findIndex((item: any) => item.id === action.id);

            if (index < state.length - 1) {
                state = update(state, {
                    [index]: { $set: state[index + 1] },
                    [index + 1]: { $set: state[index] }
                });
            }
            break;
        case actionTypes.CLEAR_OPERATIONS:
            state = update(state, {
                $set: []
            });
            break;
    }

    return state;
};

export default reducer;