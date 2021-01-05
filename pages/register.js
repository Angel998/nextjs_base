import PageInputComponent from "../react/components/base/PageInputComponent";
import React from "react";
import PropTypes from "prop-types";

import { Img, Link, Spinner } from "../react/components/common/tags";
import {
  InputField,
  InputPassword,
  Button,
} from "../react/components/common/form";

import { connect } from "react-redux";
import { registerUser } from "../react/actions/authActions";
import E from "../react/classes/E";
import { redirect } from "../utils/document";

class Register extends PageInputComponent {
  state = {
    name: "",
    email: "",
    password: "",
    errors: {},
  };

  constructor(props) {
    super(props);
    this.title = "Register";
    this.isWaitingResponse = false;
  }

  componentDidMount() {
    if (this.props.auth.isLoggedIn) return redirect("/dashboard");

    E.configInputPasswors();
  }

  componentDidUpdate() {
    if (this.props.auth.isLoggedIn && !this.isWaitingResponse)
      return redirect("/dashboard");
  }

  static getDerivedStateFromProps(props) {
    let newState = {};
    if (props.error) {
      newState.errors = props.error;
    }
    return Object.keys(newState).length > 0 ? newState : null;
  }

  onSubmitForm = (e) => {
    e.preventDefault();
    const { name, email, password } = this.state;
    this.isWaitingResponse = true;
    this.props.registerUser(
      {
        name,
        email,
        password,
      },
      () => {
        this.isWaitingResponse = false;
      }
    );
  };

  getLoginContent() {
    const { name, email, password, errors } = this.state;
    const { loading } = this.props.auth;
    return (
      <section className="section section-login-register">
        <div className="card hoverable">
          <div className="card-content card-form">
            <form onSubmit={this.onSubmitForm} className="form">
              <div className="form-header">
                <div className="form-header-image">
                  <Img src="logos/logo_color.png" />
                </div>
              </div>

              <InputField
                extraClass="form-item"
                id="name"
                value={name}
                error={errors.name}
                label="Nombre"
                onChange={this.onChangeTextInput}
                disabled={loading}
              />

              <InputField
                extraClass="form-item"
                id="email"
                value={email}
                error={errors.email}
                type="email"
                label="Correo"
                onChange={this.onChangeTextInput}
                disabled={loading}
              />

              <InputPassword
                extraClass="form-item"
                id="password"
                value={password}
                error={errors.password}
                label="Contrase&ntilde;a"
                onChange={this.onChangeTextInput}
                disabled={loading}
              />

              {loading && <Spinner small={true} />}

              <Button
                extraClass="form-item button-primary button-shadow-up"
                text="Registrarse"
                type="submit"
                disabled={loading}
              />
            </form>

            <div className="helper-buttons">
              <Link
                className="button button-inline"
                href="/login"
                text="¿Ya tienes una cuenta? Inicia sesi&oacute;n"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  render() {
    return this.renderPage(<main>{this.getLoginContent()}</main>);
  }
}

Register.propTypes = {
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, {
  registerUser,
})(Register);
