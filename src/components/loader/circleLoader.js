import React from 'react';
import PropsTypes from 'prop-types';
import { Animated, Easing, Platform } from 'react-native';
import styles, { getCircleStyle } from './loaderStyles';

export default class CircleLoader extends React.Component {
  static props = {
    duration: PropsTypes.number,
    size: PropsTypes.number,
    colors: PropsTypes.array,
  };

  value = new Animated.Value(0);

  componentDidMount() {
    this.runAnimation();
  }

  runAnimation = () => {
    let { duration = 1000 } = this.props;

    const animation = Animated.timing(this.value, { toValue: 1, duration: duration, easing: Easing.linear() });

    Animated.loop(animation, { useNativeDriver: true }).start();
  };

  render() {
    let { size = 20, colors = [] } = this.props;
    colors = colors && colors.length === 6
      ? colors
      : ['#f51b47', '#ff3300', '#0369ff', '#03993d', '#007a5c', '#1475d1',];
    const outerRotation = this.value.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
    const innerRotation = this.value.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
    const color = this.value.interpolate({
      inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1,],
      outputRange: colors
    });
    const circleStyle = [
      styles.center,
      getCircleStyle(size),
      {
        borderWidth: 2,
        borderColor: color,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
      },
      {
        transform: [{ rotate: outerRotation }]
      }];

    return (
      <Animated.View style={[...circleStyle,{
        borderColor: 'transparent',
        borderTopColor: color,
        borderLeftColor: color,
      }]}>
        <Animated.View style={[...circleStyle, {
          transform: [{ rotate: innerRotation }]
        }]} />
      </Animated.View>
    );
  }
}
