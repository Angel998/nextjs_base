import { Component } from "react";

export default class FormComponent extends Component {
  onChangeTextInput = (e) => this.setState({ [e.target.name]: e.target.value });

  onChangeCheckField = (e) => {
    const current_value = this.state[e.target.name];
    this.setState({ [e.target.name]: !current_value });
  };

  onChangeInputFile = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
}
