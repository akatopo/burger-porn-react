/* global window:false */

import React, { Component } from 'react';
import LoveButton from './LoveButton';
import LocationGroup from './LocationGroup';
import ShareGroup from './ShareGroup';
import { createWindowResizeObservable } from './observables';
import './scss/burger-container.scss';

export default class BurgerContainer extends Component {
  componentDidMount() {
    if (!this.props.burger.data) {
      this.props.fetchBurger(this.props.id);
    }
    createWindowResizeObservable({ debounceMs: 100 })
      .forEach((innerWidth) => this.props.onWindowResized(innerWidth));
  }

  componentWillUpdate(nextProps) {
    const nextId = nextProps.id;
    if (nextId !== this.props.id) {
      this.props.fetchBurger(nextId);
    }
  }

  render() {
    const {
      burger,
      isLoved,
      isShareGroupExpanded,
      isLocationGroupExpanded,
      windowWidth,
      onLoveButtonClicked,
      onShareButtonClicked,
      onLocationButtonClicked,
      onLocationGroupFocusLost,
      onShareGroupFocusLost,
      /*id,*/
    } = this.props;

    if (burger.isFetching) {
      return <div />;
    }

    if (!burger.data) {
      return <div />;
    }

    const burgerData = burger.data;

    const ingredients = burgerData.ingredients
      .map((i, index) => (<li key={index}>{i}</li>));

    return (
      <div
        className="bp-burgerContainer u-flex u-flexCol"
        style={getBackgroundContainerStyle(burgerData.pictures, windowWidth)}
      >
        <div className="bp-brand u-allCaps">
          Burger<span className="bp-brand-highlight">Porn</span>
        </div>
        <div className="u-flex u-flexExpandTop u-flexCol u-sm-flexRow">
          <div>
            <div className="bp-bannerContainer">
              <h2>
                <span className="bp-banner bp-banner--primary bp-banner--leftDockRounded u-allCaps">
                  {burgerData.name}
                </span>
              </h2>
            </div>
            <div className="bp-bannerContainer">
              <ul
                className="
                  bp-banner
                  bp-banner--secondary
                  bp-banner--leftDockRounded
                  u-display-inlineBlock
                "
              >
                {ingredients}
              </ul>
            </div>
          </div>
          <div className="u-sm-flexExpandLeft u-sm-flexAlignSelfEnd u-flexAlignSelfCenter">
            <div className="bp-btnGroup bp-btnGroup--horizontal">
              <LoveButton
                totalLoves={burgerData.totalLove}
                onClick={onLoveButtonClicked}
                burgerId={burgerData.id}
                isLoved={isLoved}
              />
              <LocationGroup
                onClick={onLocationButtonClicked}
                onFocusLost={onLocationGroupFocusLost}
                isExpanded={isLocationGroupExpanded}
                loc={burgerData.loc}
              />
              <ShareGroup
                onClick={onShareButtonClicked}
                onFocusLost={onShareGroupFocusLost}
                isExpanded={isShareGroupExpanded}
                burgerData={burgerData}
              />
            </div>
          </div>
        </div>
        {
          // <div className="bp-panel" />
        }
      </div>
    );
  }

}

function getBackgroundContainerStyle(pictures, width = 1920) {
  if (!pictures) {
    return undefined;
  }

  const physicalPixelWidth = getDevicePixelRatio() * width;
  const url = pickBestPicture(pictures, physicalPixelWidth).url;

  return {
    backgroundImage: `url(${url})`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
  };
}

function pickBestPicture(pictures, width) {
  if (pictures.length === 0) {
    return undefined;
  }

  const res = pictures.reduce((bestPicture, picture) => {
    const currentBestWidthDifference = Math.abs(bestPicture.width - width);
    const newWidthDifference = Math.abs(picture.width - width);

    return newWidthDifference < currentBestWidthDifference ?
      picture :
      bestPicture;
  });

  return res;
}

// Based on: https://github.com/imulus/retinajs/blob/c528fe9359b4b97f507617440c1a7d6c3d2b31df/src/retina.js#L50

function getDevicePixelRatio() {
  let pixelRatio = 1;
  const mediaQuery = `
    (-webkit-min-device-pixel-ratio: 1.5),
    (min--moz-device-pixel-ratio: 1.5),
    (-o-min-device-pixel-ratio: 3/2),
    (min-resolution: 1.5dppx)
  `;

  if (window.devicePixelRatio) {
    pixelRatio = window.devicePixelRatio;
  }
  else if (window.matchMedia && window.matchMedia(mediaQuery).matches) {
    pixelRatio = 2; // best guess?
  }
  return pixelRatio;
}
