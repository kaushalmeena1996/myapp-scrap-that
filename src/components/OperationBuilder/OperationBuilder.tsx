import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import Dialog from './Dialog/Dialog';
import Operation from './Operation/Operation';

export interface OperationBuilderProps {
    isDialogOpen: boolean;
    operations: any[];
    openDialog: () => void;
    appendOperation: (typeId: string) => void;
    updateOperation: (id: string, key: string, value: string) => void;
    deleteOperation: (id: string) => void;
    moveUpOperation: (id: string) => void;
    moveDownOperation: (id: string) => void;
}

const OperationBuilder: React.FunctionComponent<OperationBuilderProps> = (props: OperationBuilderProps): JSX.Element => {
    return (
        <React.Fragment>
            <Box display="flex" justifyContent="flex-end" pb={2}>
                <Button variant="outlined" color="primary" onClick={() => props.openDialog()}>
                    <AddIcon />
                </Button>
            </Box>
            <Dialog
                open={props.isDialogOpen}
                appendOperation={props.appendOperation}
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
        </React.Fragment>
    );
}

export default OperationBuilder;