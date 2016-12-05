/* global document:false, window:false */

import Rx from 'rx-lite';

const bodyClick = Rx.Observable.fromEvent(document.body, 'click');

const windowResize = Rx.Observable.fromEvent(window, 'resize');

export { createFocusLostObservable, createWindowResizeObservable };

/////////////////////////////////////////////////////////////

function createFocusLostObservable(parentNode) {
  return bodyClick
    .pluck('target')
    .filter((target) => !hasParent(parentNode, target));
}

function createWindowResizeObservable({ debounceMs = 500 }) {
  return windowResize
    .map(() => window.innerWidth)
    .debounce(debounceMs);
}

function hasParent(parentElement, el) {
  return (el && el.isSameNode(parentElement)) ||
  (el && hasParent(parentElement, el.parentElement));
}
