import React from 'react';
import { Link } from "react-router-dom";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FindInPageIcon from '@material-ui/icons/FindInPage';

import classes from './Header.module.css'

const Header: React.FunctionComponent = () => {
  return (
    <header>
      <AppBar position="relative">
        <Toolbar>
          <FindInPageIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            ScrapThat!
        </Typography>

          <span className={classes.span}></span>

          <Link to="/" className="no-link-decoration">
            <Button color="inherit">
              Home
        </Button>
          </Link>
          <Link to="/scrap" className="no-link-decoration">
            <Button color="inherit">
              Scrap
        </Button>
          </Link>
          <Link to="/about" className="no-link-decoration">
            <Button color="inherit">
              About
        </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </header>
  );
}

export default Header;