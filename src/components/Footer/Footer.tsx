import React from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import classes from './Footer.module.css';

const Footer: React.FunctionComponent = () => {
    return (
        <footer className={classes.root}>
            <Container maxWidth="sm">
                <Typography variant="h6" gutterBottom>Quick Links</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    <Button href="https://github.com/kaushalmeena1996/myapp-scrap-that" color="inherit">
                        Github
                    </Button>
                </Typography>
            </Container>
        </footer>
    );
}

export default Footer;