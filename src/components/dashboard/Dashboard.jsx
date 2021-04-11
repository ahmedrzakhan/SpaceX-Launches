import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLaunchData } from "./../../redux/launchesReducer";

const Dashboard = () => {
  const launches = useSelector((state) => state.launches.launches);
  console.log("launches", launches);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLaunchData());
  }, [dispatch]);

  return <div>Dashboard</div>;
};

export default Dashboard;
