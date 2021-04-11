import React, { useEffect, useState } from "react";
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
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@material-ui/core";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { filterLaunches } from "./../../redux/launchesReducer";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    padding: "2.5rem 0",
    maxWidth: "100%",
  },
  cardMedia: {
    flex: 1,
  },
  cardContent: {
    flex: 3,
  },
  filterBar: {
    alignItems: "center",
    background: "#fff",
    boxShadow: "0 2px 3px rgba(0, 0, 0, 0.3)",
    display: "flex",
    justifyContent: "space-evenly",
    padding: "0.75rem 0",
    position: "sticky",
    top: 0,
    zIndex: 111,
  },
  flexBox: {
    display: "flex",
    marginTop: "0.5rem",
  },
  formControl: {
    minWidth: 150,
  },
  successText: {
    color: "#008b02",
  },
  toolbarStyle: {
    justifyContent: "center",
  },
});

const Dashboard = () => {
  const [launchStatus, setLaunchStatus] = React.useState("");
  const [value, onChange] = useState([new Date(), new Date()]);

  const filteredLaunches = useSelector((state) => state.launches.filteredLaunches);

  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getLaunchData());
  }, [dispatch]);

  const handleFilterChange = (event) => {
    setLaunchStatus(event.target.value);
    const keyValue = event.target.value.split(":");

    const payload = {
      filterKey: keyValue[0] ,
      filterValue: keyValue[1] && JSON.parse(keyValue[1]) ,
    };
    dispatch(filterLaunches(payload));
  };

  const redirectToLink = (linkUrl) => {
    linkUrl && window.open(linkUrl);
  };

  console.log("launchStatus", launchStatus);
  return (
    <>
      <AppBar position="static">
        <Toolbar className={classes.toolbarStyle}>
          <Typography variant="h6" color="inherit">
            SpaceX
          </Typography>
        </Toolbar>
      </AppBar>
      <Box className={classes.filterBar}>
        <FormControl className={classes.formControl}>
          <InputLabel>Launch Status</InputLabel>
          <Select value={launchStatus} onChange={handleFilterChange}>
            <MenuItem value={"launch_success:true"}>Success</MenuItem>
            <MenuItem value={"launch_success:false"}>Failure</MenuItem>
            <MenuItem value={"upcoming"}>Upcoming</MenuItem>
          </Select>
        </FormControl>
        <DateRangePicker onChange={onChange} value={value} />
      </Box>
      <Grid className={classes.root} container spacing={3}>
        {filteredLaunches.map((launch) => (
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
                  {launch.upcoming ? (
                    <Box className={classes.flexBox}>
                      <Typography variant="body2" component="p">
                        Upcoming:&nbsp;
                      </Typography>
                      <Typography variant="body2" color="primary" component="p">
                        {"Yes"}
                      </Typography>
                    </Box>
                  ) : (
                    <Box className={classes.flexBox}>
                      <Typography variant="body2" component="p">
                        Launch Status:&nbsp;
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="div"
                      >
                        {launch.launch_success ? (
                          <Typography
                            variant="body2"
                            component="p"
                            className={classes.successText}
                          >
                            Success
                          </Typography>
                        ) : (
                          <Typography
                            variant="body2"
                            component="p"
                            color="error"
                          >
                            Failure
                          </Typography>
                        )}
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
