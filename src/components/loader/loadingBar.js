import React from 'react';
import PropsTypes from 'prop-types';
import { View, Animated } from 'react-native';

export default class LoadingBar extends React.Component {
  static props = {
    duration: PropsTypes.number,
    size: PropsTypes.number,
    barHeight: PropsTypes.number,
    barWidth: PropsTypes.number,
    color: PropsTypes.string,
    containerColor: PropsTypes.string,
  };

  value = new Animated.Value(0);

  componentDidMount() {
    this.runAnimation();
  }

  runAnimation = () => {
    let { duration = 1000 } = this.props;
    const animation =
      Animated.sequence([
        Animated.timing(this.value, { toValue: 0.5, duration: duration }),
        Animated.timing(this.value, { toValue: 1, duration: duration })
      ]);

    Animated.loop(animation, { useNativeDriver: true, }).start();
  };

  render() {
    const { size = 100, barHeight = 3, barWidth = 20, containerColor = '#FFF', color = '#1475D1' } = this.props;
    const left = this.value.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, size - barWidth - 2, 0] });
    const barContainerStyle = {
      margin: 2,
      width: size, height: barHeight,
      justifyContent: 'center',
      backgroundColor: containerColor,
    };
    const barStyle = {
      left,
      backgroundColor: color,
      width: barWidth,
      height: barHeight,
    };

    return (
      <View style={barContainerStyle}>
        <Animated.View style={barStyle} />
      </View>
    );
  }
}
