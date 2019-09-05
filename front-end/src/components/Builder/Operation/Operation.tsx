import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Collapse from '@material-ui/core/Collapse';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import React from 'react';
import IOperation from '../../../types/operation';
import IValidator from '../../../types/validator';
import * as inputTypes from '../../../constants/inputTypes';
import classes from './Operation.module.css';


export interface IOperationProps {
    index: number;
    operation: IOperation;
    updateOperation: (index: number, name: string, value: string, validators: IValidator[]) => void;
    deleteOperation: (index: number) => void;
    moveUpOperation: (index: number) => void;
    moveDownOperation: (index: number) => void;
}

const Operation: React.FunctionComponent<IOperationProps> = (props: IOperationProps): JSX.Element => {
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
                            {expanded ? <EditIcon /> : <BorderColorIcon />}
                        </IconButton>
                        <IconButton
                            onClick={() => props.deleteOperation(props.index)}
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
                            props.operation.inputs
                                .map((item, iIndex: number) => (
                                    <Grid
                                        item
                                        xs={12}
                                        md={item.width}
                                        key={`operation-${props.index}-input-${iIndex}`}
                                    >
                                        {
                                            (item.type === inputTypes.TEXT &&
                                                <TextField
                                                    label={item.label}
                                                    rows={item.rows}
                                                    multiline={item.multiline}
                                                    helperText={props.operation.errors[item.name]}
                                                    value={props.operation.outputs[item.name]}
                                                    error={props.operation.errors[item.name] ? true : false}
                                                    onChange={(event) => props.updateOperation(props.index, item.name, event.target.value, item.validators)}
                                                    fullWidth
                                                />
                                            ) || (item.type === inputTypes.SELECT &&
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel>{item.label}</InputLabel>
                                                    <Select
                                                        value={props.operation.outputs[item.name]}
                                                        error={props.operation.errors[item.name] ? true : false}
                                                        onChange={(event: any) => props.updateOperation(props.index, item.name, event.target.value, item.validators)}
                                                    >
                                                        {item.options ?
                                                            item.options.map((option, oIndex: number) => (
                                                                <MenuItem
                                                                    key={`operation-${props.index}-input-${iIndex}-option-${oIndex}`}
                                                                    value={option.value}
                                                                >
                                                                    {option.name}
                                                                </MenuItem>
                                                            ))
                                                            :
                                                            null
                                                        }
                                                    </Select>
                                                    <FormHelperText>{props.operation.errors[item.name]}</FormHelperText>
                                                </FormControl>
                                            )
                                        }
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