import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import IData from '../../types/data';
import IStore from '../../types/store';


export interface ScraperResultsProps {
    hidden: boolean;
    results: any[];
    appendResult: (data: IData) => void;
    clearResults: () => void;
}

const ScraperResults: React.FunctionComponent<ScraperResultsProps> = (props: ScraperResultsProps) => {
    function handleScrapingStart() {

    }

    return (
        <div hidden={props.hidden}>
            <Box display="flex" justifyContent="flex-end" pb={2}>
                <Box mr={0.5}>
                    <Button title="Start scrapping." variant="outlined" color="primary" onClick={handleScrapingStart}>
                        <SearchIcon />
                    </Button>
                </Box>
                <Box ml={0.5}>
                    <Button title="Clear all operations." variant="outlined" color="secondary" onClick={props.clearResults}>
                        <DeleteIcon />
                    </Button>
                </Box>
            </Box>
        </div>
    );
}

const mapStateToProps = (state: IStore) => {
    return {
        results: state.results
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        appendResult: (data: IData) => dispatch({
            type: actionTypes.APPEND_RESULT,
            data: data
        }),
        clearResults: () => dispatch({
            type: actionTypes.CLEAR_RESULTS,
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScraperResults);