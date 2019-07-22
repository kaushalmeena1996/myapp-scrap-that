import { Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';


export interface ErrorProps {
    open: boolean;
    closeError: () => void;
}

const Error = (props: ErrorProps): JSX.Element => {
    return (
        <Dialog
            open={props.open}
            maxWidth="sm"
            scroll="paper"
            fullWidth
        >
            <DialogTitle>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <Grid item>
                        <Typography variant="h6">Error</Typography>
                    </Grid>
                    <Grid item>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => props.closeError()}
                            aria-label="Close-Button">
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                Error occured while scrapping!
            </DialogContent>
            <DialogActions></DialogActions>
        </Dialog>
    );
}

export default Error;