import React from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import classes from './Operation.module.css';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';


import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';


export interface OperationProps {
    operation: any;
    updateOperation: (id: string, key: string, value: string) => void;
    deleteOperation: (id: string) => void;
    moveUpOperation: (id: string) => void;
    moveDownOperation: (id: string) => void;
}

const Operation: React.FunctionComponent<OperationProps> = (props: OperationProps): JSX.Element => {
    const [expanded, setExpanded] = React.useState<boolean>(false);

    function handleExpandClick() {
        setExpanded(!expanded);
    }

    function getOperationSubheader() {
        return props.operation.outputFormat.replace(/%\w+%/g, function (match: string) {
            return props.operation.outputs[match.slice(1, -1)] || 'undefined';
        });
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
                        >
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => props.deleteOperation(props.operation.id)}
                            aria-expanded={expanded}
                            aria-label="Delete-Button"
                            title="Delete operation."
                        >
                            <ClearIcon />
                        </IconButton>
                    </React.Fragment>
                }
                title={props.operation.typeName}
                subheader={getOperationSubheader()}
            />
            <Collapse in={expanded} timeout="auto">
                <CardContent>
                    <Box
                        display="flex"
                        flexWrap="wrap"
                        justifyContent="space-between"
                    >
                        {
                            props.operation.inputs.map((item: any, index: number) => (
                                <Box
                                    key={`${props.operation.id}-input-${index}`}
                                    minWidth={item.width}
                                >
                                    <TextField
                                        label={item.label}
                                        helperText={item.helperText}
                                        onChange={(event) => props.updateOperation(props.operation.id, item.name, event.target.value)}
                                        fullWidth
                                    />
                                </Box>
                            ))
                        }
                    </Box>
                </CardContent>
            </Collapse>
        </Card>
    );
}

export default Operation;