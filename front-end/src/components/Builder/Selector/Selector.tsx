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
import { OPERATION_CATEGORIES, OPERATION_TYPES } from '../../../constants/operation';
import classes from './Selector.module.css';


export interface SelectorProps {
    open: boolean;
    closeSelector: (type: string) => void;
}

const Selector = (props: SelectorProps) => {
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
                        <Typography variant="h6">Select Operation</Typography>
                    </Grid>
                    <Grid item>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => props.closeSelector('')}
                            aria-label="Close-Button">
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                {OPERATION_CATEGORIES.map((category, cIndex) => (
                    <List
                        key={`category-${cIndex}`}
                        className={classes.root}
                    >
                        <ListSubheader component="div">
                            {category}
                        </ListSubheader>
                        {OPERATION_TYPES
                            .filter(item => item.category === category)
                            .map((item, iIndex) => (
                                <ListItem
                                    key={`category-${cIndex}-operation-${iIndex}`}
                                    onClick={() => props.closeSelector(item.type)}
                                    button
                                >
                                    <ListItemText
                                        primary={item.type}
                                        secondary={item.description} />
                                </ListItem>
                            ))}
                    </List>
                ))}
            </DialogContent>
            <DialogActions></DialogActions>
        </Dialog>
    );
}

export default Selector;