/* global window: false */

import React from 'react';
import uri from 'urijs';

export default function MailButton({
  burgerName,
  placeName,
}) {
  const href = uri('mailto:')
    .search({
      subject: `${burgerName} @ ${placeName}`,
      body: `${burgerName}\n${window.location.href}`,
    });

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bp-btn bp-btn--round"
    >
      <svg className="bp-svg email-icon">
        <use xlinkHref="#email-icon" />
      </svg>
    </a>
  );
}
