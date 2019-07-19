import { Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import { OPERATION_CATEGORIES, OPERATION_TYPES } from '../../../constants/operations';
import classes from './Dialog.module.css';


export interface OperationDialogProps {
    open: boolean;
    closeDialog: (typeId: string) => void;
}

const OperationDialog = (props: OperationDialogProps) => {
    return (
        <Dialog
            open={props.open}
            maxWidth="sm"
            scroll="paper"
            onClick={() => props.closeDialog('')}
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
                        <Typography variant="h6">Select Operation</Typography>
                    </Grid>
                    <Grid item>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => props.closeDialog('')}
                            aria-label="Close-Button">
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                {OPERATION_CATEGORIES.map((category) => (
                    <List
                        key={category.categoryId}
                        className={classes.root}
                    >
                        <ListSubheader component="div">
                            {category.categoryName}
                        </ListSubheader>
                        {OPERATION_TYPES
                            .filter(type => type.categoryId === category.categoryId)
                            .map((type) => (
                                <ListItem
                                    key={type.typeId}
                                    onClick={() => props.closeDialog(type.typeId)}
                                    button
                                >
                                    <ListItemText
                                        primary={type.typeName}
                                        secondary={type.description} />
                                </ListItem>
                            ))}
                    </List>
                ))}
            </DialogContent>
            <DialogActions></DialogActions>
        </Dialog>
    );
}

export default OperationDialog;