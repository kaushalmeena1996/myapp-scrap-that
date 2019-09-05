import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import { Link } from "react-router-dom";
import classes from './Header.module.css';


const Header: React.FunctionComponent = (): JSX.Element => {
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
            <IconButton aria-label="Home" color="inherit">
              <HomeIcon />
            </IconButton>
          </Link>
          <Link to="/scrap" className="no-link-decoration">
            <IconButton aria-label="Home" color="inherit">
              <SearchIcon />
            </IconButton>
          </Link>
          <Link to="/about" className="no-link-decoration">
            <IconButton aria-label="Home" color="inherit">
              <InfoIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </header>
  );
}

export default Header;