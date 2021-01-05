import React from "react";
import PageComponent from "../react/components/base/PageComponent";
import { Link } from "../react/components/common/tags";

class Home extends PageComponent {
  render() {
    return this.renderPage(
      <main>
        {this.props.message ? this.props.message : "Bienvenido"}

        <br />

        <Link href="/login" text="Iniciar sesion" />
        <Link href="/register" text="Registrarse" />
      </main>
    );
  }
}

export default Home;
