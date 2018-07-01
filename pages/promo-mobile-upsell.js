import React from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';
import { UpsellMobileContainer } from 'react/containers';
import { AuthActions, OrderActions } from 'redux/actions';

class SelectPackage extends React.PureComponent {
  static async getInitialProps(props) {
    const { store, isServer, query } = props.ctx;
    if (isServer) {
      store.dispatch(
        AuthActions.setUniqueSessionId({ sessionId: query.sessionId }),
      );
    }
  }

  static getInitialProps({
    ctx: {
      store,
      isServer,
      query: { visitorId, variationId, requestAgent },
      req: {
        session: { ip },
      },
    },
  }) {
    if (isServer) {
      store.dispatch(
        AuthActions.setAbtastyParams({
          visitorId,
          variationId,
          requestAgent,
          ip,
        }),
      );
    }
  }

  render() {
    const { props } = this;
    return (
      <React.Fragment>
        <Head>
          <title>American Science CBD Oil</title>
          <meta name="viewport" content="width=640, user-scalable=0" />
          <meta
            name="description"
            content="Premium Quality Hemp Extract Products, Organic and Natural"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Hind:300,400,500,600,700"
            rel="stylesheet"
          />
          <link href="/static/mobile/css/upsell.css" rel="stylesheet" />
          {/* <link rel="stylesheet" type="text/css" href="/static/assets/css/mb-style.css" /> */}
        </Head>
        <UpsellMobileContainer {...props} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = reduxState => ({
  order: reduxState.order.order,
  abtastyParams: reduxState.auth.abtastyParams,
});

export default connect(mapStateToProps, { ...OrderActions, ...AuthActions })(
  SelectPackage,
);
