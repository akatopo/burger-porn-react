import React from 'react';

const baseButtonClasses = 'bp-loveButton bp-btn bp-btn--round';
export default function LoveButton({
  totalLoves,
  isLoved,
  onClick,
}) {
  return (
    <button className={`${baseButtonClasses} ${(isLoved ? 'is-toggled' : '')}`} onClick={onClick}>
      <div className="bp-btn-label">{isLoved ? totalLoves + 1 : totalLoves}</div>
      <svg className="bp-svg love-icon">
        <use xlinkHref="#love-icon" />
      </svg>
    </button>
  );
}
