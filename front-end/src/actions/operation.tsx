import * as actionTypes from '../constants/actionTypes';
import IValidator from '../types/validator';

export const appendOperation = (type: string) => {
    return {
        type: actionTypes.APPEND_OPERATION,
        params: {
            type: type
        }
    }
};

export const updateOperation = (index: number, name: string, value: string, validators: IValidator[]) => {
    return {
        type: actionTypes.UPDATE_OPERATION,
        params: {
            index: index,
            name: name,
            value: value,
            validators: validators
        }
    }
};

export const deleteOperation = (index: number) => {
    return {
        type: actionTypes.DELETE_OPERATION,
        params: {
            index: index
        }
    }
};

export const moveUpOperation = (index: number) => {
    return {
        type: actionTypes.MOVE_UP_OPERATION,
        params: {
            index: index
        }
    }
};

export const moveDownOperation = (index: number) => {
    return {
        type: actionTypes.MOVE_DOWN_OPERATION,
        params: {
            index: index
        }
    }
};

export const clearOperations = () => {
    return {
        type: actionTypes.CLEAR_OPERATIONS
    }
};
