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
import { authUser } from "../react/actions/authActions";
import { redirect } from "../utils/document";

class Login extends PageInputComponent {
  state = {
    email: "",
    password: "",
    errors: {},
  };

  constructor(props) {
    super(props);
    this.title = "Login";
    this.isWaitingResponse = false;
  }

  componentDidMount() {
    if (this.props.auth.isLoggedIn) return redirect("/dashboard");
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

  onLoginForm = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    this.isWaitingResponse = true;
    this.props.authUser(
      {
        email,
        password,
      },
      () => {
        this.isWaitingResponse = false;
      }
    );
  };

  getLoginContent() {
    const { email, password, errors } = this.state;
    const { loading } = this.props.auth;
    return (
      <section className="section">
        <form className="form" onSubmit={this.onLoginForm}>
          <InputField
            extraClass="form-item"
            id="email"
            type="text"
            label="Correo electronico"
            value={email}
            error={errors.email}
            disabled={loading}
            onChange={this.onChangeTextInput}
          />
          <InputPassword
            extraClass="form-item"
            id="password"
            label="Contrase&ntilde;a"
            value={password}
            disabled={loading}
            error={[errors.error, errors.password]}
            onChange={this.onChangeTextInput}
          />
          {loading && <Spinner small={true} />}

          <Button
            extraClass="form-item button-primary button-shadow-up"
            text="Iniciar sesi&oacute;n"
            type="submit"
            disabled={loading}
          />
        </form>

        <div className="helper-buttons">
          <Link
            className="button button-inline"
            href="/forgot"
            text="¿Olvidaste tu contrase&ntilde;a?"
          />

          <Link
            className="button button-inline"
            href="/register"
            text="¿No tienes una cuenta? Registrate"
          />
        </div>
      </section>
    );
  }

  render() {
    return this.renderPage(<main>{this.getLoginContent()}</main>);
  }
}

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  authUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, {
  authUser,
})(Login);
