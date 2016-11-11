/* global window:false */

import React from 'react';

import LoveButton from './LoveButton';
import LocationGroup from './LocationGroup';
import ShareGroup from './ShareGroup';

import './scss/burger-container.scss';

export default function BurgerContainer({
  burger,
  isLoved,
  isShareGroupExpanded,
  isLocationGroupExpanded,
  onLoveButtonClicked,
  onShareButtonClicked,
  onLocationButtonClicked,
  onLocationGroupFocusLost,
  onShareGroupFocusLost,
}) {
  const ingredients = burger.ingredients
    .map((i, index) => (<li key={index}>{i}</li>));

  return (
    <div
      className="bp-burgerContainer"
      style={getBackgroundContainerStyle(burger.pictures)}
    >
      <div className="bp-brand u-allCaps">
        Burger<span className="bp-brand-highlight">Porn</span>
      </div>
      <div className="bp-content bp-content--left">
        <h2 className="u-allCaps bp-banner bp-banner--primary bp-banner--leftDockRounded">
          {burger.name}
        </h2>
        <ul className="bp-banner bp-banner--secondary bp-banner--leftDockRounded u-inlineBlock">
          {ingredients}
        </ul>
      </div>
      <div className="bp-content bp-content--right">
        <div className="bp-btnGroup bp-btnGroup--horizontal">
          <LoveButton
            totalLoves={burger.love.length}
            onClick={onLoveButtonClicked}
            isLoved={isLoved}
          />
          <LocationGroup
            onClick={onLocationButtonClicked}
            onFocusLost={onLocationGroupFocusLost}
            isExpanded={isLocationGroupExpanded}
            loc={burger.loc}
          />
          <ShareGroup
            onClick={onShareButtonClicked}
            onFocusLost={onShareGroupFocusLost}
            isExpanded={isShareGroupExpanded}
          />
        </div>
      </div>
    </div>
  );
}

function getBackgroundContainerStyle(pictures) {
  const physicalPixelWidth = getDevicePixelRatio() * /* $(window).width() */1920;
  const url = /* '/' + */ pickBestPicture(pictures, physicalPixelWidth).url;

  return {
    background: `url(${url}) no-repeat center center fixed`,
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
