import PageComponent from "./PageComponent";

class PageInputComponent extends PageComponent {
  onChangeTextInput = (e) => this.setState({ [e.target.name]: e.target.value });

  onChangeCheckField = (e) => {
    const current_value = this.state[e.target.name];
    this.setState({ [e.target.name]: !current_value });
  };

  onChangeInputFile = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
}

export default PageInputComponent;
