import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import { connect } from 'react-redux';
import Dialog from './Dialog/Dialog';
import Operation from './Operation/Operation';
import * as actionCreators from '../../actions/operation';
import { IOperations } from '../../types/store';
import IValidator from '../../types/validator';
import IOperation from '../../types/operation';


export interface ScraperBuilderProps {
    hidden: boolean;
    operations: IOperation[];
    appendOperation: (typeId: string) => void;
    updateOperation: (id: string, name: string, value: string, validators: IValidator[]) => void;
    deleteOperation: (id: string) => void;
    moveUpOperation: (id: string) => void;
    moveDownOperation: (id: string) => void;
    clearOperations: () => void;
}

const ScraperBuilder: React.FunctionComponent<ScraperBuilderProps> = (props: ScraperBuilderProps): JSX.Element => {
    const [open, setOpen] = React.useState<boolean>(false);

    function handleDialogOpen() {
        setOpen(true);
    }

    function handleDialogClose(typeId: string) {
        props.appendOperation(typeId)
        setOpen(false);
    }

    return (
        <div hidden={props.hidden}>
            <Box display="flex" justifyContent="flex-end" pb={2}>
                <Box mr={0.5}>
                    <Button title="Open operation dialog." variant="outlined" color="primary" onClick={handleDialogOpen}>
                        <AddIcon />
                    </Button>
                </Box>
                <Box ml={0.5}>
                    <Button title="Clear all operations." variant="outlined" color="secondary" onClick={props.clearOperations}>
                        <DeleteIcon />
                    </Button>
                </Box>
            </Box>
            <Dialog
                open={open}
                closeDialog={handleDialogClose}
            />
            <Box>
                {
                    (props.operations.length > 0) ?
                        (props.operations.map((item) => (
                            < Operation
                                key={item.id}
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

const mapStateToProps = (state: IOperations) => {
    return {
        operations: state.operations,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        appendOperation: (typeId: string) => dispatch(actionCreators.appendOperation(typeId)),
        updateOperation: (id: string, name: string, value: string, validators: IValidator[]) => dispatch(actionCreators.updateOperation(id, name, value, validators)),
        deleteOperation: (id: string) => dispatch(actionCreators.deleteOperation(id)),
        moveUpOperation: (id: string) => dispatch(actionCreators.moveUpOperation(id)),
        moveDownOperation: (id: string) => dispatch(actionCreators.moveDownOperation(id)),
        clearOperations: () => dispatch(actionCreators.clearOperations())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScraperBuilder);