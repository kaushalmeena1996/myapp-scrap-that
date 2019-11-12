import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import SearchIcon from "@material-ui/icons/Search";
import { css, StyleSheet } from "aphrodite";
import React, { Dispatch } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../actions/result";
import { downloadAsCSV, downloadAsJSON } from "../helpers/utilities";
import IStore, { IBuilder, IOutput } from "../types/store";
import Modal from "../components/Modal";
import Result from "../components/Result";

export interface IOutputProps {
  builder: IBuilder;
  output: IOutput;
  loadResults: () => void;
  deleteResult: (index: number) => void;
  clearResults: () => void;
  hideError: () => void;
}

const Output: React.FunctionComponent<IOutputProps> = (
  props: IOutputProps
): JSX.Element => {
  const [open, setOpen] = React.useState<boolean>(false);
  const anchorRef = React.useRef(null);

  function handlePopperClose() {
    if (anchorRef.current) {
      return;
    }
    setOpen(false);
  }

  function handlePopperToogle() {
    setOpen(!open);
  }

  function handleMenuItemClick(format: string) {
    setOpen(false);

    switch (format) {
      case "json":
        downloadAsJSON(props.output.results);
        break;
      case "csv":
        downloadAsCSV(props.output.results);
        break;
    }
  }

  return (
    <div>
      <Modal
        open={props.output.error}
        title="Error"
        closeModal={props.hideError}
      >
        <Typography>Error occured while scrapping!</Typography>
      </Modal>
      <Box display="flex" justifyContent="flex-end" pb={2}>
        <Box mr={0.5}>
          <Button
            aria-label="Download-Button"
            title="Download result."
            variant="outlined"
            aria-owns={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handlePopperToogle}
            ref={anchorRef}
          >
            <SaveAltIcon />
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom"
                }}
              >
                <Paper id="menu-list-grow">
                  <ClickAwayListener onClickAway={handlePopperClose}>
                    <MenuList>
                      <MenuItem onClick={() => handleMenuItemClick("json")}>
                        json
                      </MenuItem>
                      <MenuItem onClick={() => handleMenuItemClick("csv")}>
                        csv
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Box>
        <Box mx={0.5}>
          <Button
            title="Start scrapping."
            variant="outlined"
            color="primary"
            onClick={props.loadResults}
          >
            <SearchIcon />
          </Button>
        </Box>
        <Box ml={0.5}>
          <Button
            title="Clear all operations."
            variant="outlined"
            color="secondary"
            onClick={props.clearResults}
          >
            <DeleteIcon />
          </Button>
        </Box>
      </Box>
      <Box>
        {props.output.results.map((result, resultIndex) => (
          <Result
            key={`result-${resultIndex}`}
            resultIndex={resultIndex}
            result={result}
            deleteResult={props.deleteResult}
          />
        ))}
      </Box>
      <div className={css(styles.loader)} hidden={!props.output.loader}>
        <CircularProgress />
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  loader: {
    textAlign: "center",
    margin: 10
  }
});

const mapStateToProps = (state: IStore) => {
  return {
    builder: state.builder,
    output: state.output
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    loadResults: () => dispatch(actionCreators.loadResults()),
    clearResults: () => dispatch(actionCreators.clearResults()),
    deleteResult: (resultIndex: number) =>
      dispatch(actionCreators.deleteResult(resultIndex)),
    hideError: () => dispatch(actionCreators.hideError())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Output);
