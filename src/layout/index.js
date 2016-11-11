import React from 'react';
import 'suitcss-base';

import BurgerApp from '../BurgerApp';

import '../scss/base.scss';
import '../scss/util.scss';
import '../scss/btn.scss';
import '../scss/brand.scss';
import '../scss/content.scss';
import '../scss/banner.scss';
import '../scss/btn-group.scss';
import '../scss/popover-container.scss';
import '../scss/map.scss';
import '../scss/popover.scss';

export default function Layout() {
  return <BurgerApp />;
}

Layout.displayName = 'Layout';
