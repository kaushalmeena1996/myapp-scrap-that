import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/operation';
import { OPERATION_CATEGORIES, OPERATION_TYPES } from '../../constants/operationData';
import IStore, { IBuilder } from '../../types/store';
import IValidator from '../../types/validator';
import Modal from '../Modal/Modal';
import classes from './Builder.module.css';
import Operation from './Operation/Operation';


export interface IBuilderProps {
    hidden: boolean;
    builder: IBuilder;
    appendOperation: (type: string) => void;
    updateOperation: (index: number, name: string, value: string, validators: IValidator[]) => void;
    deleteOperation: (index: number) => void;
    moveUpOperation: (index: number) => void;
    moveDownOperation: (index: number) => void;
    clearOperations: () => void;
}

const Builder: React.FunctionComponent<IBuilderProps> = (props: IBuilderProps): JSX.Element => {
    const [open, setOpen] = React.useState<boolean>(false);

    function handleModalOpen() {
        setOpen(true);
    }

    function handleModalClose() {
        setOpen(false);
    }

    return (
        <div hidden={props.hidden}>
            <Modal
                open={open}
                title="Select Operation"
                closeModal={handleModalClose}
            >
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
                                    onClick={() => props.appendOperation(item.type)}
                                    button
                                >
                                    <ListItemText
                                        primary={item.type}
                                        secondary={item.description} />
                                </ListItem>
                            ))}
                    </List>
                ))}
            </Modal>
            <Box display="flex" justifyContent="flex-end" pb={2}>
                <Box mr={0.5}>
                    <Button title="Open operation selector." variant="outlined" color="primary" onClick={handleModalOpen}>
                        <AddIcon />
                    </Button>
                </Box>
                <Box ml={0.5}>
                    <Button title="Clear all operations." variant="outlined" color="secondary" onClick={props.clearOperations}>
                        <DeleteIcon />
                    </Button>
                </Box>
            </Box>
            <Box>
                {
                    (props.builder.operations.length > 0) ?
                        (props.builder.operations.map((item, index) => (
                            <Operation
                                key={`operation-${index}`}
                                index={index}
                                operation={item}
                                updateOperation={props.updateOperation}
                                deleteOperation={props.deleteOperation}
                                moveUpOperation={props.moveUpOperation}
                                moveDownOperation={props.moveDownOperation}
                            />)))
                        :
                        <Typography align="center">No operation to display.</Typography>
                }
            </Box>
        </div>
    );
}

const mapStateToProps = (state: IStore) => {
    return {
        builder: state.builder
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        appendOperation: (type: string) => dispatch(actionCreators.appendOperation(type)),
        updateOperation: (index: number, name: string, value: string, validators: IValidator[]) => dispatch(actionCreators.updateOperation(index, name, value, validators)),
        deleteOperation: (index: number) => dispatch(actionCreators.deleteOperation(index)),
        moveUpOperation: (index: number) => dispatch(actionCreators.moveUpOperation(index)),
        moveDownOperation: (index: number) => dispatch(actionCreators.moveDownOperation(index)),
        clearOperations: () => dispatch(actionCreators.clearOperations())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Builder);