import React from "react";
import App from "next/app";

import { createWrapper } from "next-redux-wrapper";
import store from "../redux/store";
import { initAppStatus, checkAppSession } from "../react/initAppStatus";

/**
 * @description Class component contenedor principal para englobar todo con REDUX
 */
class MyApp extends App {
  static getInitialProps = async ({ Component, ctx }) => {
    let initialProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    // Obtener props iniciales desde req.appData, esto sucede por componentes funcionales que no cuentan con la funcion getInitialProps
    if (!Component.getInitialProps && ctx.req.appData) {
      initialProps = ctx.req.appData;
    }

    if (initialProps.reducers) {
      initialProps.reducers.forEach((reducer) => {
        ctx.store.dispatch({ type: reducer.type, payload: reducer.payload });
      });
      delete initialProps.reducers;
    }
    const pageProps = {
      ...initialProps,
      pathname: ctx.pathname,
    };
    return {
      pageProps,
    };
  };

  componentDidMount() {
    const { pageProps } = this.props;
    if (this.alreadyChecked) return;
    initAppStatus(store);

    if (pageProps.needSession) {
      checkAppSession();
    }
    this.alreadyChecked = true;
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
