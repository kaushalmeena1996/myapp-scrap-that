import * as actionTypes from './actions';
import update from 'immutability-helper';
import { OPERATION_TYPES } from '../constants/operations';
import IStore from '../types/store';
import IAction from '../types/action';
import IData from '../types/data';


const initialState: IStore = {
    operations: [],
    results: []
};

const formatHeading = (format: string, outputs: IData): string => {
    return format.replace(/%\w+%/g, function (match: string) {
        return outputs[match.slice(1, -1)] || 'undefined';
    });
}

const reducer = (state = initialState, action: IAction) => {
    let newOperation: any,
        operationIndex: number;

    switch (action.type) {
        case actionTypes.APPEND_OPERATION:
            newOperation = OPERATION_TYPES.find((type) => type.typeId === action.typeId);

            if (newOperation) {
                newOperation.id = Math.random().toString(36).substring(2, 8);
                newOperation.outputs = {};
                newOperation.errors = {};

                newOperation.heading = formatHeading(newOperation.outputFormat, newOperation.outputs);

                state = update(state, {
                    operations: { $push: [newOperation] }
                });
            }
            break;
        case actionTypes.UPDATE_OPERATION:
            operationIndex = state.operations.findIndex((item: any) => item.id === action.id);

            if (operationIndex !== -1) {
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
                        operations: {
                            [operationIndex]: {
                                outputs: {
                                    [action.name]: { $set: action.value }
                                }
                            }
                        }
                    });

                    state = update(state, {
                        operations: {
                            [operationIndex]: {
                                heading: { $set: formatHeading(state.operations[operationIndex].outputFormat, state.operations[operationIndex].outputs) }
                            }
                        }
                    });
                }

                state = update(state, {
                    operations: {
                        [operationIndex]: {
                            errors: {
                                [action.name]: { $set: message }
                            }
                        }
                    }
                });
            }
            break;
        case actionTypes.DELETE_OPERATION:
            operationIndex = state.operations.findIndex((item: any) => item.id === action.id);

            if (operationIndex !== -1) {
                state = update(state, {
                    operations: { $splice: [[operationIndex, 1]] }
                });
            }
            break;
        case actionTypes.MOVE_UP_OPERATION:
            operationIndex = state.operations.findIndex((item: any) => item.id === action.id);

            if (operationIndex > 0) {
                state = update(state, {
                    operations: {
                        [operationIndex]: { $set: state.operations[operationIndex - 1] },
                        [operationIndex - 1]: { $set: state.operations[operationIndex] }
                    }
                });
            }
            break;
        case actionTypes.MOVE_DOWN_OPERATION:
            operationIndex = state.operations.findIndex((item: any) => item.id === action.id);

            if (operationIndex < state.operations.length - 1) {
                state = update(state, {
                    operations: {
                        [operationIndex]: { $set: state.operations[operationIndex + 1] },
                        [operationIndex + 1]: { $set: state.operations[operationIndex] }
                    }
                });
            }
            break;
        case actionTypes.CLEAR_OPERATIONS:
            state = update(state, {
                operations: { $set: [] }
            });
            break;
        case actionTypes.APPEND_RESULT:
            state = update(state, {
                results: { $push: [action.data] }
            });
            break;
        case actionTypes.CLEAR_RESULTS:
            state = update(state, {
                results: { $set: [] }
            });
            break;
    }

    return state;
};

export default reducer;