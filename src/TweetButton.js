/* global window: false */

import React from 'react';
import uri from 'urijs';

export default function TweetButton({
  burgerName,
  placeName,
}) {
  const webIntentUrl = 'https://twitter.com/intent/tweet';
  const hashTags = ['burgerporn'];
  const href = uri(webIntentUrl)
    .search({
      text: `${burgerName} @ ${placeName}`,
      hashtags: hashTags.join(','),
      url: window.location.href,
    });

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bp-btn bp-btn--round"
    >
      <svg className="bp-svg twitter-icon">
        <use xlinkHref="#twitter-icon" />
      </svg>
    </a>
  );
}
