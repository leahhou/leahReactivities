import React, { useState, useEffect, Fragment } from "react";
import { Header, Icon, List, Container } from "semantic-ui-react";
import axios from "axios";
import { IActivity } from "../models/activity";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]); //useState & useEffect is functionality of Hook

  //similar functionality of componentdidMount function on Component Class
  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5002/api/activities")
      .then(response => {
        setActivities(response.data);
      });
  }, []); //adding 2nd argument of empty array in useEffect params to ensure useEffect to only run once;
  //useEffect--> 3 components of lifecycle into One

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard activities={activities} />
      </Container>
    </Fragment>
  );
};

export default App;
