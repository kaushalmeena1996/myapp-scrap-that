import { del, push, set, wrap } from "object-path-immutable";
import operationData from "../constants/operations";
import { ACTION_TYPES, MODES_TYPES } from "../constants/types";
import { getData } from "../helpers/utilities";
import IAction from "../types/action";
import { IBuilder } from "../types/store";

const initialState: IBuilder = {
  operations: operationData.filter(
    operation => operation.type === "OPEN" || operation.type === "SET" || operation.type === "IF"
  ),
  variables: []
};

const reducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case ACTION_TYPES.OPERATION_APPEND:
      if (action.params.path && action.params.operation) {
        state = push(state, action.params.path, action.params.operation);
      }
      break;
    case ACTION_TYPES.OPERATION_UPDATE:
      if (action.params.path) {
        let value = "";
        let input = getData(state, action.params.path, undefined);
        if (input) {
          switch (action.params.mode) {
            case MODES_TYPES.SET:
              value = action.params.value;
              break;
            case MODES_TYPES.APPEND:
              value = input.value + action.params.value;
              break;
            default:
              value = action.params.value;
          }
          state = set(state, `${action.params.path}.value`, value);
        }
        if (action.params.variable) {
          let foundIndex = state.variables.findIndex(variable => variable.path === action.params.path);
          if (foundIndex === -1) {
            state = push(state, "variables", {
              path: action.params.path,
              value: action.params.value
            });
          } else {
            state = set(state, `variables.${foundIndex}`, {
              path: action.params.path,
              value: action.params.value
            });
          }
        }
      }
      break;
    case ACTION_TYPES.OPERATION_DELETE:
      if (action.params.path) {
        state = del(state, action.params.path);
        let foundIndex = state.variables.findIndex(variable => variable.path.includes(action.params.path) === true);
        if (foundIndex !== -1) {
          state = del(state, `variables.${foundIndex}`);
        }
      }
      break;
    case ACTION_TYPES.OPERATION_MOVE_UP:
      if (action.params.path) {
        let oldPath = action.params.path;
        let lastIndex = oldPath.lastIndexOf(".");
        let newPath = oldPath.substr(0, lastIndex);
        let operationIndex = Number.parseInt(oldPath.substr(lastIndex + 1, 1));
        if (operationIndex > 0) {
          let temp1 = getData(state, `${newPath}.${operationIndex}`);
          let temp2 = getData(state, `${newPath}.${operationIndex - 1}`);
          state = wrap(state)
            .set(`${newPath}.${operationIndex}`, temp2)
            .set(`${newPath}.${operationIndex - 1}`, temp1)
            .value();
        }
      }
      break;
    case ACTION_TYPES.OPERATION_MOVE_DOWN:
      if (action.params.path) {
        let oldPath = action.params.path;
        let lastIndex = oldPath.lastIndexOf(".");
        let newPath = oldPath.substr(0, lastIndex);
        let operationIndex = Number.parseInt(oldPath.substr(lastIndex + 1, 1));
        let operations = getData(state, newPath);
        if (operationIndex < operations.length - 1) {
          let temp1 = getData(state, `${newPath}.${operationIndex}`);
          let temp2 = getData(state, `${newPath}.${operationIndex + 1}`);
          state = wrap(state)
            .set(`${newPath}.${operationIndex}`, temp2)
            .set(`${newPath}.${operationIndex + 1}`, temp1)
            .value();
        }
      }
      break;
    case ACTION_TYPES.OPERATION_CLEAR:
      if (action.params.path) {
        let path = action.params.path;
        let variables = state.variables.filter(variable => variable.path.includes(action.params.path) === false);
        state = wrap(state)
          .set(path, [])
          .set("variables", variables)
          .value()
      }
      break;
  }
  return state;
};

export default reducer;
