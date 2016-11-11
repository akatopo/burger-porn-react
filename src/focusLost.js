/* global document:false, window:false */

import Rx from 'rx-lite';

const bodyClick = Rx.Observable.fromEvent(document.body, 'click');

export default createObservable;

/////////////////////////////////////////////////////////////

function createObservable(parentNode) {
  return bodyClick
    .pluck('target')
    .filter((target) => !hasParent(parentNode, target));
}

function hasParent(parentElement, el) {
  return (el && el.isSameNode(parentElement)) ||
  (el && hasParent(parentElement, el.parentElement));
}
