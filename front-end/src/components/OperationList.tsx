import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import { css, StyleSheet } from "aphrodite";
import React from "react";
import operationData from "../constants/operations";
import { CATEGORY_TYPES } from "../constants/types";
import IOperation from "../types/operation";

export interface IOperationListProps {
  path: string;
  appendOperation: (path: string, operation: IOperation) => void;
}

const OperationList: React.FunctionComponent<IOperationListProps> = (
  props: IOperationListProps
): JSX.Element => {
  return (
    <React.Fragment>
      {Object.values(CATEGORY_TYPES).map((category, categoryIndex) => (
        <List
          key={`list-${categoryIndex}`}
          className={css(styles.container)}
          disablePadding
        >
          <ListSubheader component="div">{category}</ListSubheader>
          {operationData
            .filter(operation => operation.category === category)
            .map((operation, operationIndex) => (
              <ListItem
                key={`list-${categoryIndex}-list-item-${operationIndex}`}
                onClick={() => props.appendOperation(props.path, operation)}
                button
              >
                <ListItemText
                  primary={operation.type}
                  secondary={operation.description}
                />
              </ListItem>
            ))}
        </List>
      ))}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 0,
    position: "relative",
    overflow: "auto"
  }
});

export default OperationList;
