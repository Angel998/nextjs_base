import React from "react";
import FormComponent from "../base/FormComponent";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Spinner } from "../common/tags";
import { InputPassword, Button } from "../common/form";
import { isEmpty } from "../../../utils/validate";

import { updateCurrentUserPassword } from "../../actions/profileActions";

/**
 * Modal para actualizar la clave del propio usuario, usado en Perfil/Dashboard
 */
class UpdatePassword extends FormComponent {
  state = {
    loading: false,
    password: "",
    last_password: "",
    errors: {},
  };

  componentDidMount() {
    E.configInputPasswors();
  }

  static getDerivedStateFromProps(props) {
    let newState = {};
    if (props.error) {
      newState.errors = props.error;
    }
    return isEmpty(newState) ? null : newState;
  }

  onUpdatePasswordClick = () => {
    const { password, last_password } = this.state;
    this.props.updateCurrentUserPassword(
      {
        password,
        last_password,
      },
      () => this.setState({ loading: true }),
      (success) => {
        const newState = {
          loading: false,
        };
        if (success) {
          newState.password = "";
          newState.last_password = "";
        }
        this.setState(newState);
      }
    );
  };

  render() {
    const { loading, password, last_password, errors } = this.state;
    return (
      <div className="modal" id={this.props.id}>
        <div className="modal-container modal-container-small">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">Actualizar contrase&ntilde;a</div>
              <Button
                extraClass="button-icon modal-close animated"
                icon="icon-cross"
              />
            </div>

            <div className="form">
              <div className="form-item">
                <InputPassword
                  id="last_password"
                  label="Clave actual"
                  value={last_password}
                  error={errors.last_password}
                  onChange={this.onChangeTextInput}
                />
              </div>

              <div className="form-item">
                <InputPassword
                  id="password"
                  label="Nueva clave"
                  value={password}
                  error={[errors.password, errors.error]}
                  onChange={this.onChangeTextInput}
                />
              </div>
            </div>

            {loading && <Spinner small={true} />}
          </div>
          <div className="modal-footer">
            <Button
              extraClass="button-inline button-inline-normal modal-close"
              text="Cerrar"
            />

            <Button
              extraClass="button-primary"
              text="Actualizar"
              onClick={this.onUpdatePasswordClick}
            />
          </div>
        </div>
      </div>
    );
  }
}

UpdatePassword.propTypes = {
  error: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  updateCurrentUserPassword: PropTypes.func.isRequired,
};

UpdatePassword.defaultProps = {
  id: "modal_update_password",
};

const mapStateToProps = (state) => ({
  error: state.error,
});

export default connect(mapStateToProps, {
  updateCurrentUserPassword,
})(UpdatePassword);
