import React, { Component } from 'react';
import { createFocusLostObservable } from './observables';
import TweetButton from './TweetButton';
import EmailButton from './EmailButton';

const baseButtonGroupClasses =
  'bp-btnGroup bp-btnGroup--vertical bp-btnGroup--expandable';

export default class ShareGroup extends Component {
  componentDidMount() {
    createFocusLostObservable(this.groupRef)
      .forEach((/* target */) => {
        if (this.props.isExpanded) {
          this.props.onFocusLost();
        }
      });
  }

  render() {
    const { onClick, isExpanded, burgerData } = this.props;

    return (
      <div
        className={`${baseButtonGroupClasses} ${(isExpanded ? 'is-expanded' : '')}`}
        ref={(node) => (this.groupRef = node)}
      >
        <button className="bp-btn bp-btn--round" onClick={onClick}>
          <svg className="bp-svg share-icon">
            <use xlinkHref="#share-icon" />
          </svg>
        </button>
        <EmailButton
          burgerName={burgerData.name}
          placeName={burgerData.loc.name}
        />
        <TweetButton
          burgerName={burgerData.name}
          placeName={burgerData.loc.name}
        />
        {/* <button className="bp-btn bp-btn--round">
          <svg className="bp-svg facebook-icon">
            <use xlinkHref="#facebook-icon" />
          </svg>
        </button> */}
      </div>
    );
  }
}
