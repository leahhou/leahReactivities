import React, { Component } from "react";
import { Header, Icon, List } from "semantic-ui-react";
import axios from "axios";
import { IActivity } from "../models/activity";

//interface for the state
interface IState {
  activities: IActivity[];
}

//Define Types in Component: 1st arg is the property -> {}, 2nd arg is the state -> IState
class App extends Component<{}, IState> {
  // not good practice by mutating state directly, rather we use setState() method
  readonly state: IState = {
    activities: []
  };

  componentDidMount() {
    axios
      // set the return Type to array of IActivity
      // that will also insure the return type in reander() is also type of IActicity
      .get<IActivity[]>("http://localhost:5002/api/activities")
      .then(response => {
        //setState() is used to mutate the state
        this.setState({
          activities: response.data
        });
      });
  }

  render() {
    return (
      <div>
        <Header as="h2">
          <Icon name="users" />
          <Header.Content>Reactivities</Header.Content>
        </Header>
        <List>
          {this.state.activities.map(activity => (
            <List.Item key={activity.id}>{activity.title}</List.Item>
          ))}
        </List>
      </div>
    );
  }
}

export default App;
