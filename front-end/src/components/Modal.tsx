import { Typography } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { css, StyleSheet } from "aphrodite";
import React from "react";

export interface IModalProps {
  open: boolean;
  title: string;
  children: any;
  closeModal: () => void;
}

const Modal = (props: IModalProps): JSX.Element => {
  return (
    <Dialog open={props.open} maxWidth="sm" scroll="paper" fullWidth>
      <DialogTitle>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h6">{props.title}</Typography>
          </Grid>
          <Grid item>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.closeModal}
              aria-label="Close-Button"
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent className={css(styles.content)}>
        {props.children}
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: "0px 24px"
  }
});

export default Modal;
