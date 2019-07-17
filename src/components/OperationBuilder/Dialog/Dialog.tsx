import React from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import ListSubheader from '@material-ui/core/ListSubheader';
import { OPERATION_CATEGORIES, OPERATION_TYPES } from '../../../constants/Operation'


import classes from './Dialog.module.css';

export interface OperationDialogProps {
    open: boolean;
    appendOperation: (typeId: string) => void;
}

const OperationDialog = (props: OperationDialogProps) => {
    const [selectedTypeId, setSelectedTypeId] = React.useState('');

    function listItemHandler(event: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string): void {
        setSelectedTypeId(id);
    }

    return (
        <Dialog
            open={props.open}
            maxWidth="sm"
            scroll="paper"
            fullWidth
        >
            <DialogTitle>Select Operation</DialogTitle>
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
                                    selected={selectedTypeId === type.typeId}
                                    onClick={(event) => listItemHandler(event, type.typeId)}
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
            <DialogActions>
                <Button
                    className={classes.button}
                    onClick={() => props.appendOperation('')}
                    color="primary">
                    Cancel
          </Button>
                <Button
                    className={classes.button}
                    onClick={() => props.appendOperation(selectedTypeId)}
                    disabled={selectedTypeId === ''}
                    color="primary">
                    Add
          </Button>
            </DialogActions>
        </Dialog>
    );
}

export default OperationDialog;