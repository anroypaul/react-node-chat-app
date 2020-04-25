import React from "react";
import MessageItem from "./MessageItem";
import MessageForm from "./MessageForm";
import { Comment, Header } from "semantic-ui-react";

class MessageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [], currentOnline: 1 };

    this.socket = this.props.socket;

    this.onMessageFormSubmit = this.onMessageFormSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      messages: [
        ...this.state.messages,
        {
          name: "Admin",
          text: `${this.props.currentUsername} (you) connected!`,
          date: Date.now(),
        },
      ],
    });

    this.socket.on("chat-message", (data) => {
      this.setState({
        messages: [...this.state.messages, data],
      });
    });

    this.socket.on("user-connected", (name) => {
      this.setState({
        messages: [
          ...this.state.messages,
          { name: "Admin", text: `${name} connected!`, date: Date.now() },
        ],
      });
    });

    this.socket.on("user-disconnected", (name) => {
      this.setState({
        messages: [
          ...this.state.messages,
          { name: "Admin", text: `${name} disconnected!`, date: Date.now() },
        ],
      });
    });

    this.socket.on("current-online", (value) => {
      console.log(value)
      this.setState({ currentOnline: value })
    })
  }

  onMessageFormSubmit(message) {
    this.socket.emit("send-chat-message", message);
    this.setState({
      messages: [...this.state.messages, message],
    });
  }

  render() {
    return (
      <Comment.Group>
        <Header as="h3" dividing>
          Messenger: {this.state.currentOnline}
        </Header>
        {this.state.messages.map((message, index) => (
          <MessageItem key={index} message={message} />
        ))}
        <MessageForm
          currentUsername={this.props.currentUsername}
          onSubmit={this.onMessageFormSubmit}
        />
      </Comment.Group>
    );
  }
}

export default MessageContainer;
