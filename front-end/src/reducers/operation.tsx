import update from 'immutability-helper';
import * as actionTypes from '../constants/actionTypes';
import { OPERATION_TYPES } from '../constants/operation';
import { formatHeading } from '../helpers/utilities';
import IAction from '../types/action';
import { IOperations } from '../types/store';

const initialState: IOperations = {
    tasks: []
};
/*
[
    {
        "type": "OPEN",
        "category": "ACTION",
        "description": "Open url for web scrapping.",
        "outputFormat": "%url%",
        "inputs": ["inp001"],
        "outputs": { "url": "http://m1.chia-anime.com/" },
        "errors": { "url": "" },
        "heading": "http://m1.chia-anime.com/"
    },
    {
        "type": "EXTRACT",
        "category": "ACTION",
        "description": "Scraps specified elements from opened page.",
        "outputFormat": "%name% [%selector%]",
        "inputs": ["inp002", "inp003"],
        "outputs": { "name": "Series Name", "selector": ".series" },
        "errors": { "name": "", "selector": "" },
        "heading": "Series Name [.series]"
    }
];
*/

const reducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case actionTypes.APPEND_OPERATION:
            const newOperation: any = OPERATION_TYPES.find((item) => item.type === action.params.type);

            if (newOperation) {
                newOperation.outputs = {};
                newOperation.errors = {};

                newOperation.heading = formatHeading(newOperation.outputFormat, newOperation.outputs);

                state = update(state, {
                    tasks: {
                        $push: [newOperation]
                    }
                });
            }
            break;
        case actionTypes.UPDATE_OPERATION:
            if (action.params.index !== -1) {
                let message = '',
                    regex,
                    i;

                for (i = 0; i < action.params.validators.length; i++) {
                    regex = new RegExp(action.params.validators[i].regex);

                    if (regex.test(action.params.value) === false) {
                        message = action.params.validators[i].message;
                        break;
                    }
                }

                if (message.length === 0) {
                    state = update(state, {
                        tasks: {
                            [action.params.index]: {
                                outputs: {
                                    [action.params.name]: { $set: action.params.value }
                                }
                            }
                        }
                    });

                    state = update(state, {
                        tasks: {
                            [action.params.index]: {
                                heading: { $set: formatHeading(state.tasks[action.params.index].outputFormat, state.tasks[action.params.index].outputs) }
                            }
                        }
                    });
                }

                state = update(state, {
                    tasks: {
                        [action.params.index]: {
                            errors: {
                                [action.params.name]: { $set: message }
                            }
                        }
                    }
                });
            }
            break;
        case actionTypes.DELETE_OPERATION:
            if (action.params.index !== -1) {
                state = update(state, {
                    tasks: {
                        $splice: [[action.params.index, 1]]
                    }
                });
            }
            break;
        case actionTypes.MOVE_UP_OPERATION:
            if (action.params.index > 0) {
                state = update(state, {
                    tasks: {
                        [action.params.index]: { $set: state.tasks[action.params.index - 1] },
                        [action.params.index - 1]: { $set: state.tasks[action.params.index] }
                    }
                });
            }
            break;
        case actionTypes.MOVE_DOWN_OPERATION:
            if (action.params.index < state.tasks.length - 1) {
                state = update(state, {
                    tasks: {
                        [action.params.index]: { $set: state.tasks[action.params.index + 1] },
                        [action.params.index + 1]: { $set: state.tasks[action.params.index] }
                    }
                });
            }
            break;
        case actionTypes.CLEAR_OPERATIONS:
            state = update(state, {
                tasks: {
                    $set: []
                }
            });
            break;
    }

    return state;
};

export default reducer;