import React, { Component } from "react";
import Head from "next/head";

import initialProps from "./initialProps";
import ClientHeader from "../layout/clientHeader";
import ClientFooter from "../layout/clientFooter";

import { APP_SITE_NAME } from "../../../config/appConfig";

class PageComponent extends Component {
  static getInitialProps = (props) => {
    return initialProps(props);
  };

  getHead() {
    const title = this.title
      ? `${this.title} | ${APP_SITE_NAME}`
      : APP_SITE_NAME;
    return (
      <Head>
        <meta charSet="UTF-8" />
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="shortcut icon" href="/assets/img/logos/favicon.png" />
      </Head>
    );
  }

  renderPage(pageData) {
    let footer;
    let header;

    if (this.notUseFooter === undefined || this.notUseFooter === false) {
      const footerProps = this.footerProps || {};
      footer = <ClientFooter {...footerProps} />;
    }
    if (this.notUseHeader === undefined || this.notUseHeader === false) {
      const headerProps = this.headerProps || {};
      header = <ClientHeader {...headerProps} />;
    }
    return (
      <React.Fragment>
        {this.getHead()}
        {header}
        {pageData}
        {footer}
      </React.Fragment>
    );
  }
}

export default PageComponent;
