import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { Dispatch } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../actions/operation";
import Modal from "../components/Modal";
import Operation from "../components/Operation";
import OperationList from "../components/OperationList";
import IOperation from "../types/operation";
import IStore, { IBuilder } from "../types/store";
export interface IBuilderProps {
  builder: IBuilder;
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

const Builder: React.FunctionComponent<IBuilderProps> = (
  props: IBuilderProps
): JSX.Element => {
  const [open, setOpen] = React.useState<boolean>(false);

  function handleModalOpen() {
    setOpen(true);
  }

  function handleModalClose() {
    setOpen(false);
  }

  return (
    <div>
      <Modal open={open} title="Select Operation" closeModal={handleModalClose}>
        <OperationList
          path="operations"
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
            onClick={() => props.clearOperations("operations")}
          >
            <DeleteIcon />
          </Button>
        </Box>
      </Box>
      <Box>
        {props.builder.operations.length > 0 ? (
          props.builder.operations.map((operation, operationIndex) => (
            <Operation
              key={`operations.${operationIndex}`}
              path={`operations.${operationIndex}`}
              operation={operation}
              variables={props.builder.variables}
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
        )}
      </Box>
    </div>
  );
};

const mapStateToProps = (state: IStore) => {
  return {
    builder: state.builder
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    appendOperation: (path: string, operation: IOperation) =>
      dispatch(actionCreators.appendOperation(path, operation)),
    updateOperation: (
      path: string,
      value: string,
      mode: string,
      variable: boolean
    ) => dispatch(actionCreators.updateOperation(path, value, mode, variable)),
    deleteOperation: (path: string) =>
      dispatch(actionCreators.deleteOperation(path)),
    moveUpOperation: (path: string) =>
      dispatch(actionCreators.moveUpOperation(path)),
    moveDownOperation: (path: string) =>
      dispatch(actionCreators.moveDownOperation(path)),
    clearOperations: (path: string) =>
      dispatch(actionCreators.clearOperations(path))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Builder);
