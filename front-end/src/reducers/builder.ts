import update from 'immutability-helper';
import * as actionTypes from '../constants/actionTypes';
import { OPERATION_TYPES } from '../constants/operationData';
import { formatHeading } from '../helpers/utilities';
import IAction from '../types/action';
import { IBuilder } from '../types/store';

const initialState: IBuilder = {
    operations: [{
        type: 'OPEN',
        category: 'ACTION',
        description: 'Open url for web scrapping.',
        headingFormat: '%url%',
        heading: '',
        inputs: [{
            name: 'url',
            label: 'URL',
            type: 'TEXT',
            width: 12,
            validators: [{
                name: 'validURL',
                regex: "^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&'\\(\\)\\*\\+,;=.]+$",
                message: 'Please enter valid URL.'
            }]
        }],
        outputs: {
            url: ''
        },
        errors: {
            url: ''
        }
    },
    {
        type: 'EXTRACT',
        category: 'ACTION',
        description: 'Scraps specified elements from opened page.',
        headingFormat: '%element% [%selector%]',
        heading: '',
        inputs: [{
            name: 'element',
            label: 'Element name',
            type: 'TEXT',
            width: 6,
            validators: [{
                name: 'validElementName',
                regex: ".+",
                message: 'Please enter valid element name.'
            }]
        }, {
            name: 'selector',
            label: 'CSS selector',
            type: 'TEXT',
            width: 6,
            validators: [{
                name: 'validCSSSelector',
                regex: ".+",
                message: 'Please enter valid CSS selector.'
            }]
        }],
        outputs: {
            element: '',
            selector: ''
        },
        errors: {
            element: '',
            selector: ''
        }
    },
    {
        type: 'SET',
        category: 'ACTION',
        description: 'Set specified data to a variable.',
        headingFormat: '%variable% [%type%]',
        heading: '',
        inputs: [{
            name: 'variable',
            label: 'Variable name',
            type: 'TEXT',
            width: 6,
            validators: [{
                name: 'validVariableName',
                regex: ".+",
                message: 'Please enter valid variable name.'
            }]
        }, {
            name: 'type',
            label: 'Data type',
            type: 'SELECT',
            options: [{
                name: 'String',
                value: 'String'
            },
            {
                name: 'Number',
                value: 'Number'
            },
            {
                name: 'Boolean',
                value: 'Boolean'
            },
            {
                name: 'Array',
                value: 'Array'
            }],
            width: 6,
            validators: [{
                name: 'validDataType',
                regex: ".+",
                message: 'Please select valid data type.'
            }]
        }, {
            name: 'data',
            label: 'Data',
            type: 'TEXT',
            rows: 5,
            multiline: true,
            width: 12,
            validators: [{
                name: 'validDataName',
                regex: ".+",
                message: 'Please enter valid data.'
            }]
        }],
        outputs: {
            variable: '',
            type: 'String',
            data: ''
        },
        errors: {
            variable: '',
            type: '',
            data: ''
        }
    }]
};

const reducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case actionTypes.OPERATION_APPEND:
            const newOperation: any = OPERATION_TYPES.find((item) => item.type === action.params.type);

            if (newOperation) {
                newOperation.heading = formatHeading(newOperation.headingFormat, newOperation.outputs);

                state = update(state, {
                    operations: {
                        $push: [newOperation]
                    }
                });
            }
            break;
        case actionTypes.OPERATION_UPDATE:
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

                state = update(state, {
                    operations: {
                        [action.params.index]: {
                            outputs: {
                                [action.params.name]: { $set: action.params.value }
                            }
                        }
                    }
                });

                state = update(state, {
                    operations: {
                        [action.params.index]: {
                            heading: { $set: formatHeading(state.operations[action.params.index].headingFormat, state.operations[action.params.index].outputs) }
                        }
                    }
                });

                state = update(state, {
                    operations: {
                        [action.params.index]: {
                            errors: {
                                [action.params.name]: { $set: message }
                            }
                        }
                    }
                });
            }
            break;
        case actionTypes.OPERATION_DELETE:
            if (action.params.index !== -1) {
                state = update(state, {
                    operations: {
                        $splice: [[action.params.index, 1]]
                    }
                });
            }
            break;
        case actionTypes.OPERATION_MOVE_UP:
            if (action.params.index > 0) {
                state = update(state, {
                    operations: {
                        [action.params.index]: { $set: state.operations[action.params.index - 1] },
                        [action.params.index - 1]: { $set: state.operations[action.params.index] }
                    }
                });
            }
            break;
        case actionTypes.OPERATION_MOVE_DOWN:
            if (action.params.index < state.operations.length - 1) {
                state = update(state, {
                    operations: {
                        [action.params.index]: { $set: state.operations[action.params.index + 1] },
                        [action.params.index + 1]: { $set: state.operations[action.params.index] }
                    }
                });
            }
            break;
        case actionTypes.OPERATION_CLEAR:
            state = update(state, {
                operations: {
                    $set: []
                }
            });
            break;
    }

    return state;
};

export default reducer;