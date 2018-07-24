import React from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import { OrderActions } from 'redux/actions';
import {
  Upsell1,
  Upsell1Treatment1,
  Upsell1Treatment2,
  Upsell11,
  Upsell11Treatment1,
  Upsell11Treatment2,
  Upsell2,
  Upsell2Treatment1,
  Upsell2Treatment2,
  Upsell21,
} from 'react/components/upsell/mobile';
import { Spinner, SuccessModal } from 'react/components/common';
import { getRevenueAfterDiscount, getParameterByName } from 'helpers';

const campaignIds = { 1: '308072', '1-1': '308073', 2: '308075' };
const revenueMaps = {
  1: {
    cid: 62,
    noCid: 77,
  },
  '1-1': {
    cid: 69,
    noCid: 87,
  },
  '2-1': {
    cid: 77,
    noCid: 97,
  },
  2: {
    cid: 69,
    noCid: 87,
  }
}
/**
 * @class UpsellMobileContainerComponent
 * @extends {React.PureComponent}
 * @description Mobile container components for Upsells :
 * Renders the Upsell pages according to the stage <br />
 * Also renders iframe for tracking variables
 */
class UpsellMobileContainerComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      shouldAddPixel: false,
      revenue: ''
    };
  }

  componentDidMount() {
    const isPrevUpsell11 =
      this.props.abtastyParams.prev &&
      this.props.abtastyParams.prev.indexOf('upsell11') > -1;
    if (!isPrevUpsell11) {
      this.postCampaignActivatedEvent();
    }

    let pixelRevenue = revenueMaps[this.props.query.upsell].noCid;
    const isCid = getParameterByName('cid');
    if (isCid) {
      pixelRevenue = revenueMaps[this.props.query.upsell].cid;
    }

    this.setState({
      shouldAddPixel: true
    },() => {
      this.setState({ revenue: pixelRevenue})
    });
  }

  postCampaignActivatedEvent = () => {
    const { upsell } = this.props.query;
    const campaignId = campaignIds[upsell.toString()];
    if (campaignId) {
      const body = {
        campaign_id: campaignId.toString(),
        variation_id: this.props.abtastyParams.variationId,
        tracking_data: {
          device_type:
            this.props.query.device === 'desktop' ? 'DESKTOP' : 'MOBILE_PHONE',
          ip: this.props.abtastyParams.ip,
          origin: 'Promo Desktop',
          timestamp: moment().format(),
          visitor_id: this.props.abtastyParams.visitorId,
        },
      };
      axios.post('/abtasty', {
        ...body,
        action: 'campaign_activated_event',
      });
    }
  };

  upgrade = (productId, nextPage) => {
    const { cid } = this.props.query;
    this.props.addUpsellToOrder({
      productId,
      sendTo: nextPage,
      router: this.props.router,
      cid,
    });
  };

  sendTransactionDetails = (name, origin) => {
    const { localStorage } = window;
    const items = JSON.parse(localStorage.getItem('upsell1'));
    const id = items[0].OrderInfo.CustomerID.toString();
    const revenue = items.reduce(
      (agg, val) => agg + val.OrderInfo.TotalAmount,
      0,
    );
    const abtastyParams = JSON.parse(localStorage.getItem('abtastyParams'));
    const body = {
      name,
      id,
      revenue,
      shipping: '0',
      tracking_data: {
        device_type: 'MOBILE_PHONE',
        ip: abtastyParams ? abtastyParams.ip : '',
        origin,
        timestamp: moment().format(),
        visitor_id: abtastyParams ? abtastyParams.visitorId : '',
      },
    };
    axios.post('/abtasty', { ...body, action: 'transaction_event' });
  };

  render() {
    const { upsell, offerId, adv_sub } = this.props.query;
    const { abtastyParams } = this.props;
    const isPrevUpsell11 =
      this.props.abtastyParams.prev &&
      this.props.abtastyParams.prev.indexOf('upsell11') > -1;

    return (
      <React.Fragment>
        <Head>
        </Head>

        {this.state.shouldAddPixel ?
          <React.Fragment>
            <script>{`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '321559294932280');
              fbq('track', 'Purchase', {currency: 'USD', value: ${this.state.revenue}});
              `}
            </script>

            <noscript>
              <img height="1" width="1" style={{display: 'none'}}
                   src={`https://www.facebook.com/tr?id=321559294932280&amp;ev=Purchase&amp;cd[currency]=USD&amp;cd[value]=${this.state.revenue}`}
              />
            </noscript>
          </React.Fragment> : null
        }

        <div id="container">
          {upsell === 1 &&
            offerId && (
              <iframe
                title="cbd"
                // src={`https://trk.starlightgroup.io/aff_l?offer_id=${offerId}&transaction_id=${transaction_id}&adv_sub=${adv_sub}`}
                src={`https://trk.starlightgroup.io/aff_l?offer_id=${offerId}&adv_sub=${adv_sub}`}
                frameBorder="0"
                width="1"
                height="1"
                style={{ position: 'absolute' }}
              />
            )}
          <SuccessModal
            visible={this.props.submitStatus === 'success'}
            message="Order updated successfully."
          />
          {upsell === 1 && (
            <React.Fragment>
              {this.props.abtastyParams.variationId === '406285' && (
                <React.Fragment>
                  <a href="/">
                    <img
                      src="/static/mobile/images/logo.png"
                      alt=""
                      className="logo"
                    />
                  </a>
                  <Upsell1
                    upgrade={this.upgrade}
                    {...this.props}
                    abtastyParams={abtastyParams}
                    sendTransactionDetails={this.sendTransactionDetails}
                  />
                </React.Fragment>
              )}
              {this.props.abtastyParams.variationId === '406286' && (
                <React.Fragment>
                  <a href="/">
                    <img
                      src="/static/mobile/images/logo.png"
                      alt=""
                      className="logo"
                    />
                  </a>
                  <Upsell1Treatment1
                    upgrade={this.upgrade}
                    {...this.props}
                    abtastyParams={abtastyParams}
                    sendTransactionDetails={this.sendTransactionDetails}
                  />
                </React.Fragment>
              )}
              {this.props.abtastyParams.variationId === '406287' && (
                <Upsell1Treatment2
                  upgrade={this.upgrade}
                  {...this.props}
                  abtastyParams={abtastyParams}
                  sendTransactionDetails={this.sendTransactionDetails}
                />
              )}
            </React.Fragment>
          )}
          {upsell === '1-1' && (
            <React.Fragment>
              {this.props.abtastyParams.variationId === '406288' && (
                <React.Fragment>
                  <a href="/">
                    <img
                      src="/static/mobile/images/logo.png"
                      alt=""
                      className="logo"
                    />
                  </a>
                  <Upsell11
                    upgrade={this.upgrade}
                    {...this.props}
                    abtastyParams={abtastyParams}
                    sendTransactionDetails={this.sendTransactionDetails}
                  />
                </React.Fragment>
              )}
              {this.props.abtastyParams.variationId === '406289' && (
                <React.Fragment>
                  <a href="/">
                    <img
                      src="/static/mobile/images/logo.png"
                      alt=""
                      className="logo"
                    />
                  </a>
                  <Upsell11Treatment1
                    upgrade={this.upgrade}
                    {...this.props}
                    abtastyParams={abtastyParams}
                    sendTransactionDetails={this.sendTransactionDetails}
                  />
                </React.Fragment>
              )}
              {this.props.abtastyParams.variationId === '406290' && (
                <Upsell11Treatment2
                  upgrade={this.upgrade}
                  {...this.props}
                  abtastyParams={abtastyParams}
                  sendTransactionDetails={this.sendTransactionDetails}
                />
              )}
            </React.Fragment>
          )}
          {upsell === 2 && (
            <React.Fragment>
              {(this.props.abtastyParams.variationId === '406291' ||
                isPrevUpsell11) && (
                <React.Fragment>
                  <a href="/">
                    <img
                      src="/static/mobile/images/logo.png"
                      alt=""
                      className="logo"
                    />
                  </a>
                  <Upsell2
                    upgrade={this.upgrade}
                    {...this.props}
                    abtastyParams={abtastyParams}
                    sendTransactionDetails={this.sendTransactionDetails}
                    isPrevUpsell11={isPrevUpsell11}
                  />
                </React.Fragment>
              )}
              {this.props.abtastyParams.variationId === '406292' &&
                !isPrevUpsell11 && (
                  <React.Fragment>
                    <a href="/">
                      <img
                        src="/static/mobile/images/logo.png"
                        alt=""
                        className="logo"
                      />
                    </a>
                    <Upsell2Treatment1
                      upgrade={this.upgrade}
                      {...this.props}
                      abtastyParams={abtastyParams}
                      sendTransactionDetails={this.sendTransactionDetails}
                    />
                  </React.Fragment>
                )}
              {this.props.abtastyParams.variationId === '406293' &&
                !isPrevUpsell11 && (
                  <Upsell2Treatment2
                    upgrade={this.upgrade}
                    {...this.props}
                    abtastyParams={abtastyParams}
                    sendTransactionDetails={this.sendTransactionDetails}
                  />
                )}
            </React.Fragment>
          )}
          {upsell === '2-1' && (
            <React.Fragment>
              <a href="/">
                <img
                  src="/static/mobile/images/logo.png"
                  alt=""
                  className="logo"
                />
              </a>
              <Upsell21
                upgrade={this.upgrade}
                {...this.props}
                abtastyParams={abtastyParams}
                sendTransactionDetails={this.sendTransactionDetails}
              />
            </React.Fragment>
          )}
          {this.props.submitStatus === 'submitting' && <Spinner />}
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    submitStatus: state.order.addUpsellToOrderStatus,
    abtastyParams: state.auth.abtastyParams,
  };
}

const UpsellMobileContainer = connect(mapStateToProps, { ...OrderActions })(
  withRouter(UpsellMobileContainerComponent),
);

export default UpsellMobileContainer;
