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
      <div className="bp-btn-label">
        {lengthFilter(String(isLoved ? totalLoves + 1 : totalLoves))}
      </div>
      <svg className="bp-svg love-icon">
        <use xlinkHref="#love-icon" />
      </svg>
    </button>
  );

  function lengthFilter(s) {
    const loveDispatcher = new Array(6);

    loveDispatcher[4] =
    loveDispatcher[5] = (_s) => `${Math.round(+_s / 100) / 10}K`;
    loveDispatcher[6] = (_s) => `${_s.substr(0, 3)}K`;

    return (loveDispatcher[s.length] || ((x) => x))(s);
  }
}
