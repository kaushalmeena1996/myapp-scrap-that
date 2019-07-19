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
import { OPERATION_INPUTS } from '../../../constants/operations';
import classes from './Operation.module.css';

export interface OperationProps {
    operation: any;
    updateOperation: (id: string, name: string, value: string, validators: any[]) => void;
    deleteOperation: (id: string) => void;
    moveUpOperation: (id: string) => void;
    moveDownOperation: (id: string) => void;
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
                            onClick={() => props.moveUpOperation(props.operation.id)}
                            aria-label="MoveUp-Button"
                            title="Move-up operation."
                        >
                            <KeyboardArrowUpIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => props.moveDownOperation(props.operation.id)}
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
                            onClick={() => props.deleteOperation(props.operation.id)}
                            aria-expanded={expanded}
                            aria-label="Delete-Button"
                            title="Delete operation."
                            color="secondary"
                        >
                            <ClearIcon />
                        </IconButton>
                    </React.Fragment>
                }
                title={props.operation.typeName}
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
                                .filter((item) => props.operation.inputs.includes(item.inputId))
                                .map((item: any, index: number) => (
                                    <Grid
                                        item
                                        xs={12}
                                        md={item.width}
                                        key={`${props.operation.id}-input-${index}`}
                                    >
                                        <TextField
                                            label={item.label}
                                            helperText={props.operation.errors[item.name]}
                                            onChange={(event) => props.updateOperation(props.operation.id, item.name, event.target.value, item.validators)}
                                            error={props.operation.errors[item.name] ? true : false}
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