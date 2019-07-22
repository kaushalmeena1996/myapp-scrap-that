import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import Selector from './Selector/Selector';
import Operation from './Operation/Operation';
import * as actionCreators from '../../actions/operation';
import IStore, { IOperations } from '../../types/store';
import IValidator from '../../types/validator';


export interface BuilderProps {
    hidden: boolean;
    operations: IOperations;
    appendOperation: (type: string) => void;
    updateOperation: (index: number, name: string, value: string, validators: IValidator[]) => void;
    deleteOperation: (index: number) => void;
    moveUpOperation: (index: number) => void;
    moveDownOperation: (index: number) => void;
    clearOperations: () => void;
}

const Builder: React.FunctionComponent<BuilderProps> = (props: BuilderProps): JSX.Element => {
    const [open, setOpen] = React.useState<boolean>(false);

    function handleSelectorOpen() {
        setOpen(true);
    }

    function handleSelectorClose(type: string) {
        props.appendOperation(type)
        setOpen(false);
    }

    return (
        <div hidden={props.hidden}>
            <Box display="flex" justifyContent="flex-end" pb={2}>
                <Box mr={0.5}>
                    <Button title="Open operation selector." variant="outlined" color="primary" onClick={handleSelectorOpen}>
                        <AddIcon />
                    </Button>
                </Box>
                <Box ml={0.5}>
                    <Button title="Clear all operations." variant="outlined" color="secondary" onClick={props.clearOperations}>
                        <DeleteIcon />
                    </Button>
                </Box>
            </Box>
            <Selector
                open={open}
                closeSelector={handleSelectorClose}
            />
            <Box>
                {
                    (props.operations.tasks.length > 0) ?
                        (props.operations.tasks.map((item, index) => (
                            < Operation
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
        operations: state.operations,
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