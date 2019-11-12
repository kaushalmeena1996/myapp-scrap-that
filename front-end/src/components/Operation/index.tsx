import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Collapse from "@material-ui/core/Collapse";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { css, StyleSheet } from "aphrodite";
import React from "react";
import { formatHeading } from "../../helpers/utilities";
import IOperation from "../../types/operation";
import IVariable from "../../types/variable";
import Input from "./Input";

export interface IOperationProps {
  path: string;
  operation: IOperation;
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

const Operation: React.FunctionComponent<IOperationProps> = (
  props: IOperationProps
): JSX.Element => {
  const [expanded, setExpanded] = React.useState<boolean>(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (
    <Card className={css(styles.card)}>
      <CardHeader
        action={
          <React.Fragment>
            <IconButton
              onClick={() => props.moveUpOperation(props.path)}
              aria-label="MoveUp-Button"
              title="Move-up operation."
            >
              <KeyboardArrowUpIcon />
            </IconButton>
            <IconButton
              onClick={() => props.moveDownOperation(props.path)}
              aria-label="MoveDown-Button"
              title="Move-down operation."
            >
              <KeyboardArrowDownIcon />
            </IconButton>
            <IconButton
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="Edit-Button"
              title="Edit operation."
              color="primary"
            >
              {expanded ? <EditIcon /> : <BorderColorIcon />}
            </IconButton>
            <IconButton
              onClick={() => props.deleteOperation(props.path)}
              aria-label="Delete-Button"
              title="Delete operation."
              color="secondary"
            >
              <ClearIcon />
            </IconButton>
          </React.Fragment>
        }
        title={props.operation.type}
        subheader={formatHeading(
          props.operation.format,
          props.operation.inputs
        )}
      />
      <Collapse in={expanded} timeout="auto">
        <CardContent>
          <Grid container direction="row" alignItems="flex-end" spacing={3}>
            {props.operation.inputs.map((input, inputIndex) => (
              <Grid key={`${props.path}.inputs.${inputIndex}`} xs={12} item>
                <Input
                  path={`${props.path}.inputs.${inputIndex}`}
                  input={input}
                  variables={props.variables}
                  appendOperation={props.appendOperation}
                  updateOperation={props.updateOperation}
                  deleteOperation={props.deleteOperation}
                  moveUpOperation={props.moveUpOperation}
                  moveDownOperation={props.moveDownOperation}
                  clearOperations={props.clearOperations}
                />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 5,
    marginBottom: 5
  }
});

export default Operation;
