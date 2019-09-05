import * as actionTypes from '../constants/actionTypes';
import IValidator from '../types/validator';

export const appendOperation = (type: string) => {
    return {
        type: actionTypes.OPERATION_APPEND,
        params: {
            type: type
        }
    }
};

export const updateOperation = (index: number, name: string, value: string, validators: IValidator[]) => {
    return {
        type: actionTypes.OPERATION_UPDATE,
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
        type: actionTypes.OPERATION_DELETE,
        params: {
            index: index
        }
    }
};

export const moveUpOperation = (index: number) => {
    return {
        type: actionTypes.OPERATION_MOVE_UP,
        params: {
            index: index
        }
    }
};

export const moveDownOperation = (index: number) => {
    return {
        type: actionTypes.OPERATION_MOVE_DOWN,
        params: {
            index: index
        }
    }
};

export const clearOperations = () => {
    return {
        type: actionTypes.OPERATION_CLEAR
    }
};
