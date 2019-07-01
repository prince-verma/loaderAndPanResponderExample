import React from 'react';
import PropsTypes from 'prop-types';
import { Animated, Platform } from 'react-native';
import styles, { getCircleStyle } from './loaderStyles';

export default class DoubleCircleLoader extends React.Component {
  static props = {
    duration: PropsTypes.number,
    size: PropsTypes.number,
    spacing: PropsTypes.number,
    colors: PropsTypes.array,
  };

  value = new Animated.Value(0);

  componentDidMount() {
    this.runAnimation();
  }

  runAnimation = () => {
    let { duration = 700 } = this.props;

    const animation = Animated.sequence([
      Animated.timing(this.value, { toValue: 1, duration: duration }),
      Animated.timing(this.value, { toValue: 0, duration: duration })
    ]);

    Animated.loop(animation, { useNativeDriver: true }).start();
  };

  render() {
    let { size = 20, spacing = 10, colors = [] } = this.props;
    colors = colors && colors.length === 6
      ? colors
      : ['#f51b47', '#ff3300', '#0369ff', '#03993d', '#007a5c', '#1475d1',];
    const outerRotation = this.value.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
    const innerRotation = this.value.interpolate({ inputRange: [0, 1], outputRange: ['720deg', '0deg'] });
    const color = this.value.interpolate({
      inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1,],
      outputRange: colors
    });
    const outerCircleStyle = [
      styles.center,
      getCircleStyle(size),
      {
        borderWidth: 2,
        borderColor: color,
        borderTopWidth: Platform.OS === 'ios' ? 2 : 0,
        borderTopColor: 'transparent',
      },
      {
        transform: [{ rotate: outerRotation }]
      }];
    const innerCircleStyle = [
      getCircleStyle(size - spacing),
      {
        borderWidth: 2,
        borderColor: color,
        borderBottomWidth: Platform.OS === 'ios' ? 2 : 0,
        borderBottomColor: 'transparent',
      },
      {
        transform: [{ rotate: innerRotation }]
      }];

    return (
      <Animated.View style={outerCircleStyle}>
        <Animated.View style={innerCircleStyle} />
      </Animated.View>
    );
  }
}
