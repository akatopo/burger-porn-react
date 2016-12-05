import React, { Component } from 'react';
import { createFocusLostObservable } from './observables';

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
    const { onClick, isExpanded } = this.props;

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
        <a
          href
          target="_blank"
          rel="noopener noreferrer"
          className="bp-btn bp-btn--round"
        >
          <svg className="bp-svg email-icon">
            <use xlinkHref="#email-icon" />
          </svg>
        </a>
        <a
          href
          target="_blank"
          rel="noopener noreferrer"
          className="bp-btn bp-btn--round"
        >
          <svg className="bp-svg twitter-icon">
            <use xlinkHref="#twitter-icon" />
          </svg>
        </a>
        <button className="bp-btn bp-btn--round">
          <svg className="bp-svg facebook-icon">
            <use xlinkHref="#facebook-icon" />
          </svg>
        </button>
      </div>
    );
  }
}
