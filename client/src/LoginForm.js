import React from "react";
import { Form, Input, Message } from "semantic-ui-react";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      isError: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({
      username: event.target.value,
      isError: false
    });
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.state.username.trim() === "") {
      this.setState({
        isError: true
      });
      return;
    }

    this.props.onSubmit(this.state.username.trim());
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        {this.state.isError ? 
         <Message negative>
         <Message.Header>User name cannot be blank</Message.Header>
        
       </Message>
       : null}
        <Input
          fluid
          action={{
            color: "blue",
            content: "Submit",
          }}
          placeholder="Enter name..."
          onChange={this.onChange}
          error={this.state.isError}
        />
      </Form>
    );
  }
}

export default LoginForm;
