import React from 'react';
import { ActivityIndicator } from 'react-native';
import RunningCirclesLoader from './runningCirclesLoader';
import DoubleCircleLoader from './doubleCircleLoader';
import CircleLoader from './circleLoader';
import LoadingBar from './loadingBar';
import CircularBar from './circularBar';

export default function Loading({ type, ...others }) {
  switch (type) {
    case 0:
      return <RunningCirclesLoader {...others} />;
    case 1:
      return <CircleLoader {...others} />;
    case 2:
      return <DoubleCircleLoader {...others} />;
    case 3:
      return <CircularBar {...others} />;
    case 4:
      return <LoadingBar {...others} />;
    default :
      return <ActivityIndicator {...others} />;
  }
}
