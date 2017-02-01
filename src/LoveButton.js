import React from 'react';

const baseButtonClasses = 'bp-loveButton bp-btn bp-btn--round';
export default function LoveButton({
  totalLoves,
  isLoved,
  burgerId,
  onClick,
}) {
  const onClickWithId = onClick.bind(undefined, burgerId, isLoved);

  return (
    <button className={`${baseButtonClasses} ${(isLoved ? 'is-toggled' : '')}`} onClick={onClickWithId}>
      <div className="bp-btn-label">{isLoved ? totalLoves + 1 : totalLoves}</div>
      <svg className="bp-svg love-icon">
        <use xlinkHref="#love-icon" />
      </svg>
    </button>
  );
}
