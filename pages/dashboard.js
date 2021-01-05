import React from "react";
import PageComponent from "../react/components/base/PageComponent";
import { Button } from "../react/components/common/form";

import { logingOut } from "../react/actions/authActions";

class Dashboard extends PageComponent {
  render() {
    return this.renderPage(
      <main>
        {this.props.message ? this.props.message : "Dashboard"}

        <br />

        <Button onClick={logingOut} text="Cerrar sesion" />
      </main>
    );
  }
}

export default Dashboard;
