import React from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import classes from './Footer.module.css';

const Footer: React.FunctionComponent = () => {
    return (
        <footer className={classes.root}>
            <Container maxWidth="sm">
                <Typography variant="subtitle1" color="textSecondary" align="center">
                    Copyright © 2019 ScrapThat!
                </Typography>
            </Container>
        </footer>
    );
}

export default Footer;