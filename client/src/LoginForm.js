import React from "react";
import { Form, Input } from "semantic-ui-react";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({
      username: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.username);
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Input fluid
          action={{
            color: "blue",
            content: "Submit",
          }}
          placeholder="Enter name..."
          onChange={this.onChange}
        />
      </Form>
    );
  }
}

export default LoginForm;
