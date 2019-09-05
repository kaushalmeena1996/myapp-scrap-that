import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import Scrap from '../../containers/Scrap/Scrap';
import About from '../About/About';
import Home from '../Home/Home';


const Page: React.FunctionComponent = (): JSX.Element => {
    return (
        <main>
            <Box my={4}>
                <Container maxWidth="lg">
                    <Paper>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/scrap" component={Scrap} />
                            <Route path="/about" component={About} />
                            <Redirect to="/" />
                        </Switch>
                    </Paper>
                </Container>
            </Box>
        </main>
    );
}

export default Page;