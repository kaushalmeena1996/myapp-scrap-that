import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BuildIcon from '@material-ui/icons/Build';
import SettingsIcon from '@material-ui/icons/Settings';
import React from 'react';
import OperationBuilder from '../../components/OperationBuilder/OperationBuilder';
import { OPERATION_TYPES } from '../../constants/Operation'

import classes from './Scraper.module.css';

class Scraper extends React.Component {
    state = {
        operations: [],
        tabValue: 1,
        isDialogOpen: false,
    }

    tabChangeHandler(event: React.ChangeEvent<{}>, newValue: number) {
        this.setState({
            tabValue: newValue
        });
    }

    openDialogHandler() {
        this.setState({
            isDialogOpen: true
        });
    }

    appendOperation(typeId: string) {
        const newOperations: any[] = [...this.state.operations];

        if (typeId) {
            const newOperation: any = OPERATION_TYPES.find((type) => type.typeId === typeId);
            if (newOperation) {
                newOperation.id = this.generateRandomId();
                newOperation.outputs = {};
                newOperations.push(newOperation);
            }
        }

        this.setState({
            operations: newOperations,
            isDialogOpen: false
        });
    }

    updateOperation(id: string, key: string, value: string) {
        const newOperations: any[] = [...this.state.operations];
        let index = newOperations.findIndex((item) => item.id === id);
        if (index != -1) {
            newOperations[index].outputs[key] = value;
            this.setState({
                operations: newOperations
            });
        }
    }

    deleteOperation(id: string) {
        let newOperations: any[] = [...this.state.operations];

        newOperations = newOperations.filter((item) => item.id !== id);

        this.setState({
            operations: newOperations
        });
    }

    moveUpOperation(id: string) {
        const newOperations: any[] = [...this.state.operations];
        let index = newOperations.findIndex((item) => item.id === id);

        if (index < newOperations.length - 1) {
            [newOperations[index], newOperations[index - 1]] = [newOperations[index - 1], newOperations[index]];

            this.setState({
                operations: newOperations
            });
        }
    }

    moveDownOperation(id: string) {
        const newOperations: any[] = [...this.state.operations];
        let index = newOperations.findIndex((item) => item.id === id);

        if (index > 0) {
            [newOperations[index], newOperations[index + 1]] = [newOperations[index + 1], newOperations[index]];

            this.setState({
                operations: newOperations
            });
        }
    }

    generateRandomId() {
        return Math.random().toString(36).substring(7);
    }

    render() {
        return (
            <React.Fragment>
                <Paper className={classes.root} square>
                    <Tabs
                        value={this.state.tabValue}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={this.tabChangeHandler.bind(this)}
                        centered
                    >
                        <Tab label="Settings" icon={<SettingsIcon />} />
                        <Tab label="Builder" icon={<BuildIcon />} />
                        <Tab label="Results" icon={<AssignmentIcon />} />
                    </Tabs>
                </Paper>

                <Box p={2}>
                    <OperationBuilder
                        isDialogOpen={this.state.isDialogOpen}
                        operations={this.state.operations}
                        openDialog={() => this.openDialogHandler()}
                        appendOperation={(typeId) => this.appendOperation(typeId)}
                        updateOperation={(id, key, value) => this.updateOperation(id, key, value)}
                        deleteOperation={(typeId) => this.deleteOperation(typeId)}
                        moveUpOperation={(typeId) => this.moveUpOperation(typeId)}
                        moveDownOperation={(typeId) => this.moveDownOperation(typeId)}
                    />
                </Box>
            </React.Fragment>
        );
    }
}

export default Scraper;