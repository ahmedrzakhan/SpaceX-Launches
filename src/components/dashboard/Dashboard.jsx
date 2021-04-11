import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLaunchData } from "./../../redux/launchesReducer";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Toolbar,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    padding: "7rem 0 3rem",
    maxWidth: "100%",
  },
  cardMedia: {
    flex: 1,
  },
  cardContent: {
    flex: 3,
  },
  flexBox: {
    display: "flex",
  },
  toolbarStyle: {
      justifyContent: "center"
  }
});

const Dashboard = () => {
  const launches = useSelector((state) => state.launches.launches);

  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getLaunchData());
  }, [dispatch]);

  const redirectToLink = (linkUrl) => {
    linkUrl && window.open(linkUrl);
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbarStyle} >
          <Typography variant="h6" color="inherit">
            SPACEX
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid className={classes.root} container spacing={3}>
        {launches.map((launch) => (
          <Grid
            item
            key={launch.flight_number + launch.launch_date_unix}
            lg={9}
          >
            <Card>
              <CardActionArea className={classes.flexBox}>
                <CardMedia
                  className={classes.cardMedia}
                  component="img"
                  alt="Contemplative Reptile"
                  height="140"
                  image={
                    launch.links.mission_patch_small || "/rocketDefault.png"
                  }
                  title="Contemplative Reptile"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {launch.rocket["rocket_name"]}
                  </Typography>
                  <Box className={classes.flexBox}>
                    <Typography variant="body2" component="p">
                      Site:&nbsp;
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {launch.launch_site["site_name"]}
                    </Typography>
                  </Box>
                  {launch.details && (
                    <Box className={classes.flexBox}>
                      <Typography variant="body2" component="p">
                        Details:&nbsp;
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {launch.details}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </CardActionArea>
              <CardActions
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  onClick={() => redirectToLink(launch.links.wikipedia)}
                  size="small"
                  color="primary"
                >
                  Wiki
                </Button>
                <Button
                  onClick={() => redirectToLink(launch.links.video_link)}
                  size="small"
                  color="primary"
                >
                  Video
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Dashboard;
