import React from 'react';
import PropsTypes from 'prop-types';
import { View, Animated } from 'react-native';
import styles, { getCircleStyle } from './loaderStyles';


export default function RunningCirclesLoader({ circleSize = 10, numberOfCircles = 5, color = '#ff0000' }) {
  const circles = [];

  for (let i = 0; i < numberOfCircles; i++) {
    circles.push(
      <Circle
        key={`${i}`}
        color={color}
        circleSize={circleSize}
        duration={1000 + i * 50}
      />
    );
  }

  return (
    <View style={styles.runningLoaderContainer}>
      {circles}
    </View>
  );
}

RunningCirclesLoader.propTypes = {
  numberOfCircles: PropsTypes.number,
  circleSize: PropsTypes.number,
  color: PropsTypes.string,
};

class Circle extends React.Component {
  static props = {
    duration: PropsTypes.number,
    circleSize: PropsTypes.number,
    color: PropsTypes.string,
  };

  scale = new Animated.Value(0);

  componentDidMount() {
    this.runAnimation();
  }

  runAnimation = () => {
    let { duration = 1000 } = this.props;
    const useNativeDriver = true;

    const animation = Animated.sequence([
      Animated.timing(this.scale, { toValue: 1, duration: duration / 2, useNativeDriver }),
      Animated.timing(this.scale, { toValue: 0.2, duration: duration / 2, useNativeDriver })
    ]);
    Animated.loop(animation).start();
  };

  render() {
    const { color = '#ff0000', circleSize = 10 } = this.props;
    const musicBarStyle = [getCircleStyle(circleSize), { transform: [{ scale: this.scale }] }];

    return (
      <Animated.View style={[...musicBarStyle, { backgroundColor: color }]} />
    );
  }
}
