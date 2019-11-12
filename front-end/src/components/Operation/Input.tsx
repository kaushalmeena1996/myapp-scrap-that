import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Collapse from "@material-ui/core/Collapse";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import { css, StyleSheet } from "aphrodite";
import React, { Fragment } from "react";
import Operation from ".";
import Modal from "../../components/Modal";
import OperationList from "../../components/OperationList";
import { INPUT_TYPES, MODES_TYPES } from "../../constants/types";
import { validateInput } from "../../helpers/utilities";
import IInput from "../../types/input";
import IOperation from "../../types/operation";
import IVariable from "../../types/variable";

export interface IInputProps {
  path: string;
  input: IInput;
  variables: IVariable[];
  appendOperation: (path: string, operation: IOperation) => void;
  updateOperation: (
    path: string,
    value: string,
    mode: string,
    variable: boolean
  ) => void;
  deleteOperation: (path: string) => void;
  moveUpOperation: (path: string) => void;
  moveDownOperation: (path: string) => void;
  clearOperations: (path: string) => void;
}

const Input: React.FunctionComponent<IInputProps> = (
  props: IInputProps
): JSX.Element => {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);

  function handleModalOpen() {
    setOpen(true);
  }

  function handleModalClose() {
    setOpen(false);
  }

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  function getInputContent(type: string) {
    let result;
    let error;
    switch (type) {
      case INPUT_TYPES.TEXT:
        error = validateInput(props.input.value, props.input.rules);
        result = (
          <TextField
            label={props.input.label}
            rows={props.input.rows}
            multiline={props.input.multiline}
            helperText={error}
            value={props.input.value}
            error={error ? true : false}
            onChange={event =>
              props.updateOperation(
                props.path,
                event.target.value,
                MODES_TYPES.SET,
                false
              )
            }
            fullWidth
          />
        );
        break;
      case INPUT_TYPES.SELECT:
        result = (
          <FormControl
            className={css(styles.formControl)}
            disabled={props.input.options ? false : true}
          >
            <InputLabel>{props.input.label}</InputLabel>
            <Select
              value={props.input.value}
              onChange={(event: any) =>
                props.updateOperation(
                  props.path,
                  event.target.value,
                  MODES_TYPES.SET,
                  false
                )
              }
            >
              {props.input.options
                ? props.input.options.map((option, optionIndex) => (
                    <MenuItem
                      key={`${props.path}.option.${optionIndex}`}
                      value={option.value}
                    >
                      {option.name}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </FormControl>
        );
        break;
      case INPUT_TYPES.VARIABLE_TEXT:
        error = validateInput(props.input.value, props.input.rules);
        result = (
          <TextField
            label={props.input.label}
            rows={props.input.rows}
            multiline={props.input.multiline}
            helperText={error}
            value={props.input.value}
            error={error ? true : false}
            onChange={event =>
              props.updateOperation(
                props.path,
                event.target.value,
                MODES_TYPES.SET,
                true
              )
            }
            fullWidth
          />
        );
        break;
      case INPUT_TYPES.VARIABLE_BOX:
        result = (
          <div className={css(styles.variableBox)}>
            <Collapse in={expanded} timeout="auto">
              <Box component="div" m={2}>
                {props.variables.length ? (
                  props.variables.map((variable, variableIndex: number) => (
                    <Chip
                      key={`${props.path}.variable.${variableIndex}`}
                      clickable
                      label={variable.value}
                      component="div"
                      variant="outlined"
                      onClick={() =>
                        props.input.update
                          ? props.updateOperation(
                              `${props.path}.${props.input.update}`,
                              `{${variable.value}}`,
                              MODES_TYPES.APPEND,
                              false
                            )
                          : null
                      }
                    />
                  ))
                ) : (
                  <Typography>No variables defined.</Typography>
                )}
              </Box>
            </Collapse>
            <Button
              title="Toogle variable box."
              color="primary"
              onClick={handleExpandClick}
            >
              {expanded ? "Hide" : "Show"} variables
            </Button>
          </div>
        );
        break;
      case INPUT_TYPES.OPERATIONS:
        result = (
          <Fragment>
            <Modal
              open={open}
              title="Select Operation"
              closeModal={handleModalClose}
            >
              <OperationList
                path={`${props.path}.operations`}
                appendOperation={props.appendOperation}
              />
            </Modal>
            <Box display="flex" justifyContent="flex-end" pb={2}>
              <Box mr={0.5}>
                <Button
                  title="Open operation selector."
                  variant="outlined"
                  color="primary"
                  onClick={handleModalOpen}
                >
                  <AddIcon />
                </Button>
              </Box>
              <Box ml={0.5}>
                <Button
                  title="Clear all operations."
                  variant="outlined"
                  color="secondary"
                  onClick={() =>
                    props.clearOperations(`${props.path}.operations`)
                  }
                >
                  <DeleteIcon />
                </Button>
              </Box>
            </Box>
            {props.input.operations ? (
              props.input.operations.length > 0 ? (
                props.input.operations.map((operation, operationIndex) => (
                  <Operation
                    key={`${props.path}.operations.${operationIndex}`}
                    path={`${props.path}.operations.${operationIndex}`}
                    operation={operation}
                    variables={props.variables}
                    appendOperation={props.appendOperation}
                    updateOperation={props.updateOperation}
                    deleteOperation={props.deleteOperation}
                    moveUpOperation={props.moveUpOperation}
                    moveDownOperation={props.moveDownOperation}
                    clearOperations={props.clearOperations}
                  />
                ))
              ) : (
                <Typography align="center">No operation to display.</Typography>
              )
            ) : null}
          </Fragment>
        );
        break;
      default:
        result = null;
        break;
    }
    return result;
  }

  return <React.Fragment>{getInputContent(props.input.type)}</React.Fragment>;
};

const styles = StyleSheet.create({
  formControl: {
    width: "100%"
  },
  variableBox: {
    textAlign: "center"
  }
});

export default Input;
