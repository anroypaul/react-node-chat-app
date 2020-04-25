import React from "react";
import MessageItem from "./MessageItem";
import MessageForm from "./MessageForm";
import { Comment, Header, Divider } from "semantic-ui-react";

class MessageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [], currentOnline: props.currentOnline };

    this.socket = this.props.socket;

    this.onMessageFormSubmit = this.onMessageFormSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      messages: [
        ...this.state.messages,
        {
          username: "Admin",
          text: `${this.props.currentUsername} (you) connected!`,
          date: Date.now(),
        },
      ],
    });

    this.socket.on("new-message", (data) => {
      this.setState({
        messages: [...this.state.messages, data],
      });
    });

    this.socket.on("user-connected", (data) => {
      this.setState({
        messages: [
          ...this.state.messages,
          {
            username: "Admin",
            text: `${data.username} connected!`,
            date: Date.now(),
          },
        ],
        currentOnline: data.currentOnline,
      });
    });

    this.socket.on("user-disconnected", (data) => {
      this.setState({
        messages: [
          ...this.state.messages,
          {
            username: "Admin",
            text: `${data.username} disconnected!`,
            date: Date.now(),
          },
        ],
        currentOnline: data.currentOnline,
      });
    });
  }

  onMessageFormSubmit(message) {
    this.socket.emit("new-message", message);
    this.setState({
      messages: [
        ...this.state.messages,
        {
          username: this.props.currentUsername,
          text: message,
          date: Date.now(),
        },
      ],
    });
  }

  render() {
    return (
      <Comment.Group>
        <Header as="h3" dividing>
          Current Online: {this.state.currentOnline}
        </Header>
        {this.state.messages.map((message, index) => (
          <MessageItem key={index} message={message} />
        ))}
        <Divider />
        <MessageForm
          currentUsername={this.props.currentUsername}
          onSubmit={this.onMessageFormSubmit}
        />
      </Comment.Group>
    );
  }
}

export default MessageContainer;
