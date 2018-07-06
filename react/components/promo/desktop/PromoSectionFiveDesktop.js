import React from 'react';
import { connect } from 'react-redux';
import { AuthActions } from 'redux/actions';
import moment from 'moment';
import axios from 'axios';

import Control_411715 from './media-section/control.js';
import Treatment_711416 from './media-section/Treatment_411716.js';
import Treatment_711417 from './media-section/Treatment_411717.js';

const format = input => {
  if (input === 0 || input < 0) return '00';
  return input < 10 ? `0${input}` : `${input}`;
};

class PromoSectionFiveDesktop extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hours: '00',
      minutes: '04',
      seconds: '33',
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.updateTime();
    }, 1000);

    this.postCampaignActivatedEvent();
  }

  postCampaignActivatedEvent = () => {
    const { localStorage } = window;
    localStorage.setItem(
      'abtastyParams',
      JSON.stringify(this.props.abtastyParams),
    );
    const body = {
      campaign_id: '306753',
      variation_id: this.props.abtastyParams.variationId,
      tracking_data: {
        device_type: 'DESKTOP',
        ip: this.props.abtastyParams.ip,
        origin: 'Promo Desktop Media',
        timestamp: moment().format(),
        visitor_id: this.props.abtastyParams.visitorId,
      },
    };
    axios.post('/abtasty', {
      ...body,
      action: 'campaign_activated_event',
    });
  };

  updateTime() {
    let seconds = parseInt(this.state.seconds, 10) - 1;
    let minutes = parseInt(this.state.minutes, 10);
    let hours = parseInt(this.state.hours, 10);
    if (seconds <= 0) {
      seconds = 59;
      minutes -= 1;
    }
    if (minutes <= 0) {
      minutes = 59;
      hours -= 1;
      if (hours < 0) hours = 0;
    }
    this.setState({
      seconds: format(seconds),
      minutes: format(minutes),
      hours: format(hours),
    });
  }

  render() {
    const { hours, minutes, seconds } = this.state;
    return (
      <div className="section5">
        <div className="container position">
          <p className="s5hding">
            <span>In The Media</span>
            <br />CBD Benefits Has Global Media Buzzing{' '}
          </p>{' '}
          <i className="s5hdimg sprite4 sprite-s5hd" />
          <p className="s5-txt1 bdfont">
            The press is catching onto the amazing benefits of Cannabidiol
            (CBD). The incredibly powerful benefits of CBD Oil have been widely
            featured across print &amp; media in 2018.
          </p>
          <i className="s5-line sprite4 sprite-s5-line" />
          {
            this.props.abtastyParams && this.props.abtastyParams.variationId === '411715' ?
            <Control_411715 {...this.state} /> : null
          }

          {
            this.props.abtastyParams && this.props.abtastyParams.variationId === '411716' ?
            <Treatment_711416 {...this.state} /> : null
          }

          {
            this.props.abtastyParams && this.props.abtastyParams.variationId === '411717' ?
            <Treatment_711417 {...this.state} /> : null
          }

          {
            this.props.abtastyParams && (this.props.abtastyParams.variationId !== '411715'
              && this.props.abtastyParams.variationId !== '411716'
              && this.props.abtastyParams.variationId !== '411717') ?
            <Control_411715 {...this.state} /> : null
          }

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  abtastyParams: state.auth.abtastyParams,
});

export default connect(mapStateToProps, { ...AuthActions })(PromoSectionFiveDesktop);
