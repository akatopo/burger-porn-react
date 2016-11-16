import React from 'react';
import ChartMonitor from 'redux-devtools-chart-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import LogMonitor from 'redux-devtools-log-monitor';
import SliderMonitor from 'redux-slider-monitor';
import { createDevTools } from 'redux-devtools';

let devTools;

export default () => devTools || createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
    changeMonitorKey="ctrl-m"
    defaultIsVisible={false}
  >
    <LogMonitor />
    <SliderMonitor />
    <ChartMonitor />
  </DockMonitor>
);
