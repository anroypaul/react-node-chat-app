import React from "react";
import { Form, Button } from "semantic-ui-react";

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.socket = this.props.socket;
    this.state = { message: "" };

    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onKeydownHandler = this.onKeydownHandler.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.onKeydownHandler);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeydownHandler);
  }

  onInputChange(event) {
    this.setState({ message: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    let message = this.state.message
    if (this.state.message.trim() === "") {
      return;
    }

    this.props.onSubmit(message);

    this.setState({
      message: "",
    });
  }

  onKeydownHandler(event) {
    const key =
      navigator.appVersion.indexOf("Mac") !== -1 ? event.metaKey : event.ctrlKey;

    if (event.keyCode === 13 && key) {
      this.onSubmit(event);
    }
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit} reply> 
        <Form.TextArea
          rows={2}
          onChange={this.onInputChange}
          value={this.state.message}
        />
        <Button content='Add Reply' labelPosition='left' icon='edit' primary />
      </Form>
    );
  }
}

export default MessageForm;
