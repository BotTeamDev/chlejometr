import React from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
// import {  } from '../../actions';

import './mainPage.sass';

class MainPage extends React.Component {
  state = {
    percent: { value: '', isActive: false },
    milliliters: { value: '', isActive: false },
    shotsCounter: 0
  };

  isActiveToggle = type => {
    const { state } = this;
    state[type].isActive = !state[type].isActive;
    this.setState({ state });
  };

  valueChage = (e, type) => {
    const { state } = this;
    state[type].value = e;
    this.setState({ state });
  };

  nextShot = () => {
    const { percent, milliliters } = this.state;
    if (percent.value && milliliters.value)
      this.setState({ shotsCounter: this.state.shotsCounter + 1 });
  };

  render() {
    const { percent, milliliters, shotsCounter } = this.state;
    return (
      <>
        <div className="mainPage">
          <nav className="mainPage__nav">miejsce na nav</nav>
          <section className="mainPage__topSection">
            <h1 className="mainPage__h1">Drink Up!</h1>
            <div className="mainPage__settings">
              <div className="mainPage__module">
                <p className="mainPage__p">Alcohol %</p>

                <div className="mainPage__editPole">
                  {percent.isActive ? (
                    <input
                      type="number"
                      value={percent.value}
                      className="mainPage__input"
                      onChange={e => {
                        this.valueChage(e.target.value, 'percent');
                      }}
                    />
                  ) : (
                    <p className="mainPage__input">{percent.value}</p>
                  )}
                  <p className="mainPage__unitP">%</p>

                  <button
                    className="mainPage__btn"
                    onClick={() => {
                      this.isActiveToggle('percent');
                    }}
                  >
                    {/* icon edit */}
                    <i
                      className={`fas fa-pen mainPage__icon ${
                        !percent.isActive ? 'mainPage__icon--active' : ''
                      }`}
                    ></i>
                    {/* icon submit */}
                    <i
                      className={`fas fa-check mainPage__icon ${
                        percent.isActive ? 'mainPage__icon--active' : ''
                      }`}
                    ></i>
                  </button>
                </div>
              </div>

              <div className="mainPage__module">
                <p className="mainPage__p">Glass volume</p>
                <div className="mainPage__editPole">
                  {milliliters.isActive ? (
                    <input
                      type="number"
                      value={milliliters.value}
                      className="mainPage__input"
                      onChange={e => {
                        this.valueChage(e.target.value, 'milliliters');
                      }}
                    />
                  ) : (
                    <p className="mainPage__input">{milliliters.value}</p>
                  )}
                  <p className="mainPage__unitP">ml</p>

                  <button
                    className="mainPage__btn"
                    onClick={() => {
                      this.isActiveToggle('milliliters');
                    }}
                  >
                    {/* icon edit */}
                    <i
                      className={`fas fa-pen mainPage__icon ${
                        !milliliters.isActive ? 'mainPage__icon--active' : ''
                      }`}
                    ></i>
                    {/* icon submit */}
                    <i
                      className={`fas fa-check mainPage__icon ${
                        milliliters.isActive ? 'mainPage__icon--active' : ''
                      }`}
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          </section>

          <button
            className="mainPage__mainBtn"
            onClick={() => {
              this.nextShot();
            }}
          ></button>

          <section className="mainPage__bottomSection">
            <h2 className="mainPage__h2">Estimate Statistics</h2>
            <div className="mainPage__bottomSectionMain">
              <div className="mainPage__row">
                <p className="mainPage__bottomSectionP">Shots/Drinks</p>
                <p className="mainPage__bottomSectionP">{shotsCounter}</p>
              </div>
              <div className="mainPage__row">
                <p className="mainPage__bottomSectionP">Alcohol drunk</p>
                <p className="mainPage__bottomSectionP">408ml</p>
              </div>
              <div className="mainPage__row">
                <p className="mainPage__bottomSectionP">Alcohol in blood</p>
                <p className="mainPage__bottomSectionP">?‰</p>
              </div>
              <div className="mainPage__row">
                <p className="mainPage__bottomSectionP">Time to sober</p>
                <p className="mainPage__bottomSectionP">~6h</p>
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ gameData }) => ({ gameData });
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
