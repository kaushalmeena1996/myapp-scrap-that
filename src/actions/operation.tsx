import * as actionTypes from '../constants/actionTypes';
import IValidator from '../types/validator';

export const appendOperation = (typeId: string) => {
    return {
        type: actionTypes.APPEND_OPERATION,
        typeId: typeId
    }
};

export const updateOperation = (id: string, name: string, value: string, validators: IValidator[]) => {
    return {
        type: actionTypes.UPDATE_OPERATION,
        id: id,
        name: name,
        value: value,
        validators: validators
    }
};

export const deleteOperation = (id: string) => {
    return {
        type: actionTypes.DELETE_OPERATION,
        id: id
    }
};

export const moveUpOperation = (id: string) => {
    return {
        type: actionTypes.MOVE_UP_OPERATION,
        id: id
    }
};

export const moveDownOperation = (id: string) => {
    return {
        type: actionTypes.MOVE_DOWN_OPERATION,
        id: id
    }
};

export const clearOperations = () => {
    return {
        type: actionTypes.CLEAR_OPERATIONS
    }
};
