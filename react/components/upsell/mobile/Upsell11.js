import React from 'react';
import moment from 'moment';
import axios from 'axios';
import { PromoSession, Footer } from 'react/components/common';
import { withRouter } from 'next/router';
import { getQueryString } from 'helpers';
import { SatisfactionBox } from './SatisfactionBox';

/**
 * @class Upsell11Component
 * @extends {React.PureComponent}
 * @description Mobile Component rendered after Upsell1 page
 */
class Upsell11Component extends React.PureComponent {
  componentDidMount() {
    this.postVisitEvent();
  }

  upgrade = () => {
    this.props.sendTransactionDetails(
      'order-confirmation-upsell-1-1',
      'Upsell11',
    );
    this.postActionTracker();
    this.props.upgrade(212, '/promo/mobile/upsell-2?&prev=upsell11');
  };

  skipUpsell = () => {
    window.location.assign(`/promo/mobile/upsell-2?${getQueryString()}`);
  };

  postActionTracker = () => {
    const { abtastyParams } = this.props;
    const body = {
      name: 'upsell11-control',
      value_string: 'upsell11-control',
      type: 'CLICK',
      tracking_data: {
        visitor_id: abtastyParams.visitorId,
        device_type: 'MOBILE',
        origin: 'Upsell11Control',
        timestamp: moment().format(),
        ip: abtastyParams.ip,
      },
    };
    axios.post('/abtasty', { ...body, action: 'action_tracking_event' });
  };

  postVisitEvent = () => {
    const { abtastyParams } = this.props;
    const body = {
      tracking_data: {
        visitor_id: abtastyParams.visitorId,
        device_type: 'DESKTOP',
        origin: window.location.href,
        timestamp: moment().format(),
        ip: abtastyParams.ip,
      },
    };
    axios.post('/abtasty', { ...body, action: 'visit_event' });
  };

  render() {
    console.info('Rendering Upsell11 Control');
    return (
      <React.Fragment>
        <PromoSession pageType="upsellPage1" />
        <div className="up-strip">
          <h3>YOU QUALIFY FOR A LIMITED TIME DISCOUNT</h3>
          <p>
            Add 1 Bottle Of <br />
            <strong>Maximum Strength CBD Capsules</strong> To Your Order Today!
          </p>
        </div>
        <div className="upsell-box">
          <p className="up-txt1">Amplify Your Results</p>
          <p className="with-txt">with</p>
          <p className="up-txt2">Maximum Strength CBD Capsules</p>
          <img
            src="/static/assets/images/up-prod-2.jpg"
            className="up-prod"
            alt="upsell-prod-2"
          />
          <div className="clearall" />
          <div className="price-box">
            <p className="price-box-txt1">Buy 1 Bottle Of CBD Capsules</p>
            <p className="price-box-txt2">Save 30% Today</p>
            <p className="price-box-txt3">
              <img
                src="/static/assets/images/arrow-left-upsell.png"
                width="77"
                height="33"
                alt="arrow-left-upsell"
                className="arrow-left"
              />
              87.00{' '}
              <img
                src="/static/assets/images/arrow-right.png"
                width="77"
                height="33"
                alt="arrow-right"
                className="arrow-right"
              />
            </p>
          </div>

          <div className="bnt-sec">
            <a
              id="order-pulse-upsell11-mobile"
              href="javascript:void(0)"
              onClick={this.upgrade}
            >
              <img
                src="/static/assets/images/ord-btn.png"
                alt="order-btn"
                width="370"
                height="71"
                className="ord-btn pulse"
              />
            </a>
            <p className="thanks-txt">
              <a
                id="skip-pulse-upsell11-mobile"
                href="javascript:void(0)"
                onClick={this.skipUpsell}
              >
                <img
                  src="/static/assets/images/cut-icon.png"
                  width="15"
                  height="15"
                  alt="cut-icon"
                  className="cut-icon"
                />
                {"No, I don't want better results."}
              </a>
            </p>
          </div>
        </div>
        <SatisfactionBox onSkip={this.skipUpsell} onUpgrade={this.upgrade} />
        <div className="bnt-sec">
          <a
            id="order-pulse-upsell11-mobile"
            href="javascript:void(0)"
            onClick={this.upgrade}
          >
            <img
              src="/static/assets/images/ord-btn.png"
              alt="order-btn"
              width="370"
              height="71"
              className="ord-btn pulse"
            />
          </a>
          <p className="thanks-txt">
            <a
              id="skip-pulse-upsell11-mobile"
              href="javascript:void(0)"
              onClick={this.skipUpsell}
            >
              <img
                src="/static/assets/images/cut-icon.png"
                width="15"
                height="15"
                alt="cut-icon"
                className="cut-icon"
              />
              {"No, I don't want better results."}
            </a>
          </p>
        </div>
        <div id="footer">
          <div className="container">
            <div className="ftr-txt">
              <Footer noLogo>
                <span />
              </Footer>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const Upsell11 = withRouter(Upsell11Component);

export { Upsell11 };
