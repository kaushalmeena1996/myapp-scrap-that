import { ACTION_TYPES } from "../constants/types";
import IOperation from "../types/operation";

export const appendOperation = (path: string, operation: IOperation) => {
  return {
    type: ACTION_TYPES.OPERATION_APPEND,
    params: {
      path: path,
      operation: operation
    }
  };
};

export const updateOperation = (
  path: string,
  value: string,
  mode: string,
  variable: boolean
) => {
  return {
    type: ACTION_TYPES.OPERATION_UPDATE,
    params: {
      path: path,
      value: value,
      mode: mode,
      variable: variable
    }
  };
};

export const deleteOperation = (path: string) => {
  return {
    type: ACTION_TYPES.OPERATION_DELETE,
    params: {
      path: path,
    }
  };
};

export const moveUpOperation = (path: string) => {
  return {
    type: ACTION_TYPES.OPERATION_MOVE_UP,
    params: {
      path: path,
    }
  };
};

export const moveDownOperation = (path: string) => {
  return {
    type: ACTION_TYPES.OPERATION_MOVE_DOWN,
    params: {
      path: path,
    }
  };
};

export const clearOperations = (path: string) => {
  return {
    type: ACTION_TYPES.OPERATION_CLEAR,
    params: {
      path: path,
    }
  };
};
