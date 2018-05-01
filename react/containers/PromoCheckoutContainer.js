import React from 'react';
import { Footer } from 'react/components/common';
import { PromoCheckoutPaymentForm } from 'react/components/promo/desktop';
import { packages } from 'helpers';

class PromoCheckoutContainer extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <div className="secone">
          <div className="container">
            <div className="s1inner">
              <div className="chktop">
                <img
                  src="/static/promo/desktop/images/ck-logo.png"
                  alt=""
                  className="ck-logo"
                />
                <img
                  src="/static/promo/desktop/images/chktop.png"
                  alt=""
                  className="chktop-img"
                />
                <img
                  src="/static/promo/desktop/images/ck-seal.png"
                  alt=""
                  className="ck-ab"
                />
              </div>
              <div className="chk-lft">
                <p className="chklft-hding">
                  SELECT YOUR PACKAGE TODAY &amp; SAVE MORE!
                </p>
                {packages.map(pack => (
                  <div key={pack.id} className="pkg">
                    <a
                      href="javascript:void(0);"
                      className=""
                      data-productid="154"
                    >
                      <div className="pkg-hdbox">
                        <p className="pkg-hding">{pack.title}</p>
                        <div className="freeship">
                          <p>Free Shipping</p>
                        </div>
                      </div>
                      <div className="pkg-contbox">
                        <div className="pkg-contboxlft">
                          <img
                            src={`/static/promo/desktop/images/${
                              pack.desktopImg
                            }`}
                            alt=""
                            className="pkg-btl"
                          />
                        </div>
                        <div className="pkg-contboxrgt">
                          <p className="pkgtype-hding">most popular package</p>
                          <p className="pkgcont-hding">REGULAR PRICE $345.00</p>
                          <p className="pkgcont-price" data-price="195.00">
                            $39.00<span>/ea</span>
                          </p>
                          <div className="select-btn" />
                          <div
                            className="select-btn-selected"
                            style={{ display: 'none' }}
                          />
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
                <div className="summary-box">
                  <p className="smry-hding">Order Summary</p>
                  <div className="clearall" />
                  <div className="smry-lft">
                    <p className="smry-lfttxt">
                      Your Order is estimated
                      <br /> to arrive by Wednesday,
                      <br /> <span>May 6, 2018</span>
                    </p>{' '}
                    <img
                      src="/static/promo/desktop/images/smryimg.png"
                      alt=""
                      className="smryimg"
                    />{' '}
                  </div>
                  <div className="smry-rgt">
                    <ul className="smrylist">
                      <li>
                        american science
                        <br /> <span id="pkg-name">Buy 1 Month Supply</span>
                      </li>
                      <li id="" style={{ fontWeight: 400 }} />
                      <li>Shipping and Handling</li>
                      <li id="shp">$0.00</li>
                      <li>Total</li>
                      <li id="total" style={{ fontWeight: 600 }}>
                        $69.00
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="chk-rgt">
                <div className="chkfrm-top">
                  <div className="sldrtxt" id="fades">
                    <p style={{ opacity: 0.0959537 }}>
                      <img src="/static/promo/desktop/images/eye.png" alt="" />{' '}
                      13 others are viewing this offer right now!
                    </p>
                    <p style={{ display: 'none' }}>
                      <img src="/static/promo/desktop/images/eye.png" alt="" />{' '}
                      25 people purchased this in the last hour
                    </p>
                  </div>
                </div>
                <PromoCheckoutPaymentForm />
                <div className="chkfrm-btm">
                  <img
                    src="/static/promo/desktop/images/chk-frmbtm.png"
                    alt=""
                  />
                </div>
                <div className="clearall" />
                <div className="moneyback-box">
                  <img
                    src="/static/promo/desktop/images/moneyback.jpg"
                    alt=""
                    className="moneyback-seal"
                  />
                  <p className="moneyback-txt1">100% Money Back Guarantee </p>
                  <p className="moneyback-txt">
                    Your purchase is insured by our 90 Day Money Back Guarantee,
                    which ensures that if you are completely satisfied with the
                    results, we will refund your money, no questions asked.{' '}
                  </p>
                </div>
                <img
                  src="/static/promo/desktop/images/shop.png"
                  alt=""
                  className="shop"
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export { PromoCheckoutContainer };
