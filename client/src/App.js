import React, { Component } from "react";
import io from "socket.io-client";
import LoginForm from "./LoginForm";
import MessageContainer from "./MessageContainer";
import { Grid, Segment, Header } from "semantic-ui-react";

class App extends Component {
  constructor() {
    super();
    this.socket = io(`localhost:5000`);

    this.state = {
      currentScreen: "LoginScreen",
      currentUsername: "",
      currentOnline: 0,
    };

    this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this);
  }

  onUsernameSubmitted(username) {
    this.socket.emit("new-user", username);

    this.socket.on("login", (data) => {
      this.setState({
        currentOnline: data.currentOnline,
        currentUsername: username,
        currentScreen: "ChatScreen",
      });
    });
  }

  renderCurrentScreen() {
    if (this.state.currentScreen === "LoginScreen") {
      return (
        <Segment stacked>
          <LoginForm onSubmit={this.onUsernameSubmitted} />
        </Segment>
      );
    } else if (this.state.currentScreen === "ChatScreen") {
      return (
        <Segment stacked textAlign="left">
          <MessageContainer
            currentOnline={this.state.currentOnline}
            currentUsername={this.state.currentUsername}
            socket={this.socket}
          />
        </Segment>
      );
    }
  }

  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 650 }}>
          <Header as="h2" color="blue" textAlign="center">
            Chat App
          </Header>
          {this.renderCurrentScreen()}
        </Grid.Column>
      </Grid>
    );
  }
}

export default App;
