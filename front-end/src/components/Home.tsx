import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { css, StyleSheet } from "aphrodite";
import React from "react";
import { Link } from "react-router-dom";
import ScrapperSvg from "../assets/svg/scrap.svg";

const Home: React.FunctionComponent = (): JSX.Element => {
  return (
    <div className={css(styles.container)}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <img src={ScrapperSvg} alt="Logo" className={css(styles.image)} />
        </Grid>
        <Grid item xs={8} sm={6}>
          <Typography variant="h2" gutterBottom>
            ScrapThat!
          </Typography>
          <Typography variant="h5" gutterBottom>
            Makes web scrapping easier than ever.
          </Typography>
          <Link to="/scrap" className="no-link-decoration">
            <Button variant="outlined" color="primary">
              Get Started
            </Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: "64px 0px 48px"
  },
  image: {
    width: "100%"
  }
});

export default Home;
