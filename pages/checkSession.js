import React from "react";
import PageComponent from "../react/components/base/PageComponent";

import { Spinner } from "../react/components/common/tags";
import { checkAppSession } from "../react/initAppStatus";
import { redirect } from "../utils/document";

class CheckSession extends PageComponent {
  constructor(props) {
    super(props);
    this.notUseFooter = true;
    this.notUseHeader = true;
  }

  async componentDidMount() {
    if (!this.props.urlRedirect) {
      return redirect("/login");
    }
    const success = await checkAppSession(true);
    redirect(success ? this.props.urlRedirect : "/login");
  }

  render() {
    return this.renderPage(
      <React.Fragment>
        <main>
          <div
            style={{
              width: "100vw",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Spinner />
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default CheckSession;
