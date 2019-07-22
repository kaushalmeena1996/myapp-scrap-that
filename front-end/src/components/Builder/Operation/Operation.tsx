import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import React from 'react';
import { OPERATION_INPUTS } from '../../../constants/operation';
import classes from './Operation.module.css';
import IOperation from '../../../types/operation'
import IValidator from '../../../types/validator'


export interface OperationProps {
    index: number;
    operation: IOperation;
    updateOperation: (index: number, name: string, value: string, validators: IValidator[]) => void;
    deleteOperation: (index: number) => void;
    moveUpOperation: (index: number) => void;
    moveDownOperation: (index: number) => void;
}

const Operation: React.FunctionComponent<OperationProps> = (props: OperationProps): JSX.Element => {
    const [expanded, setExpanded] = React.useState<boolean>(false);

    function handleExpandClick() {
        setExpanded(!expanded);
    }

    return (
        <Card className={classes.card}>
            <CardHeader
                action={
                    <React.Fragment>
                        <IconButton
                            onClick={() => props.moveUpOperation(props.index)}
                            aria-label="MoveUp-Button"
                            title="Move-up operation."
                        >
                            <KeyboardArrowUpIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => props.moveDownOperation(props.index)}
                            aria-label="MoveDown-Button"
                            title="Move-down operation."
                        >
                            <KeyboardArrowDownIcon />
                        </IconButton>
                        <IconButton
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="Edit-Button"
                            title="Edit operation."
                            color="primary"
                        >
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => props.deleteOperation(props.index)}
                            aria-expanded={expanded}
                            aria-label="Delete-Button"
                            title="Delete operation."
                            color="secondary"
                        >
                            <ClearIcon />
                        </IconButton>
                    </React.Fragment>
                }
                title={props.operation.type}
                subheader={props.operation.heading}
            />
            <Collapse in={expanded} timeout="auto">
                <CardContent>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="flex-start"
                        spacing={3}>
                        {
                            OPERATION_INPUTS
                                .filter((item: any) => props.operation.inputs.includes(item.name))
                                .map((item: any, index) => (
                                    <Grid
                                        item
                                        xs={12}
                                        md={item.width}
                                        key={`operation-${props.index}-input-${index}`}
                                    >
                                        <TextField
                                            label={item.label}
                                            helperText={props.operation.errors[item.name]}
                                            value={props.operation.outputs[item.name]}
                                            error={props.operation.errors[item.name] ? true : false}
                                            onChange={(event) => props.updateOperation(props.index, item.name, event.target.value, item.validators)}
                                            fullWidth
                                        />
                                    </Grid>
                                ))
                        }
                    </Grid>
                </CardContent>
            </Collapse>
        </Card>
    );
}

export default Operation;