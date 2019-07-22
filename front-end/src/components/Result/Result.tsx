import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/result';
import IStore, { IResults, IOperations } from '../../types/store';
import classes from './Result.module.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import Error from './Error/Error'


export interface ResultProps {
    hidden: boolean;
    operations: IOperations;
    results: IResults;
    loadResults: () => void;
    clearResults: () => void;
    hideError: () => void;
}

const Result: React.FunctionComponent<ResultProps> = (props: ResultProps) => {
    return (
        <div hidden={props.hidden}>
            <Error open={props.results.error} closeError={props.hideError}></Error>
            <Box display="flex" justifyContent="flex-end" pb={2}>
                <Box mr={0.5}>
                    <Button title="Start scrapping." variant="outlined" color="primary" onClick={props.loadResults}>
                        <SearchIcon />
                    </Button>
                </Box>
                <Box ml={0.5}>
                    <Button title="Clear all operations." variant="outlined" color="secondary" onClick={props.clearResults}>
                        <DeleteIcon />
                    </Button>
                </Box>
            </Box>
            {props.results.tables.map((table, tIndex) => (
                <Paper
                    className={classes.root}
                    key={`table-${tIndex}`}
                >
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                {table.headers.map((header: any, hIndex: any) => (
                                    <TableCell key={`table-${tIndex}-header-${hIndex}`}>{header}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {table.rows.map((row: any, rIndex: any) => (
                                <TableRow key={`table-${tIndex}-row-${rIndex}`}>
                                    {row.map((cell: any, cIndex: any) => (
                                        <TableCell key={`table-${tIndex}-row-${rIndex}-cell-${cIndex}`}>{cell}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            ))}
            <div className={classes.loader} hidden={!props.results.loader}>
                <CircularProgress />
            </div>
        </div>
    );
}

const mapStateToProps = (state: IStore) => {
    return {
        results: state.results,
        operations: state.operations
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        loadResults: () => dispatch(actionCreators.loadResults()),
        clearResults: () => dispatch(actionCreators.clearResults()),
        hideError: () => dispatch(actionCreators.hideError())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Result);