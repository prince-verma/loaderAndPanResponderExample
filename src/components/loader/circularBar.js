import React from 'react';
import PropsTypes from 'prop-types';
import { View, Animated, Easing } from 'react-native';
import styles, { getCircleStyle } from './loaderStyles';

export default class LoadingBar extends React.Component {
  static props = {
    duration: PropsTypes.number,
    size: PropsTypes.number,
    colors: PropsTypes.array,
  };

  value = new Animated.Value(-1);

  componentDidMount() {
    this.runAnimation();
  }

  runAnimation = () => {
    let { duration = 1000 } = this.props;
    const animation = Animated.sequence([
      Animated.timing(this.value, { toValue: 0, duration: duration, easing: Easing.linear() }),
      Animated.timing(this.value, { toValue: 1, duration: duration, easing: Easing.linear() }),
    ]);

    Animated.loop(animation, { useNativeDriver: true }).start();
  };

  render() {
    let { size = 100, circleSize = 5, numberOfCircles = 5, colors = [] } = this.props;
    const barWidth = (circleSize + 2) * numberOfCircles;
    colors = colors && colors.length === 6
      ? colors
      : ['#f51b47', '#ff3300', '#0369ff', '#03993d', '#007a5c', '#1475d1',];
    const width = this.value.interpolate({ inputRange: [-1, 0, 1], outputRange: [barWidth, size, barWidth] });
    const color = this.value.interpolate({ inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1,], outputRange: colors });
    const circles = [];
    const barContainerStyle = [styles.center, { width: size, }];
    const innerContainerStyle = [styles.circularBarInnerContainerStyle, { width: width, height: circleSize, }];

    for (let i = 0; i < numberOfCircles; i++) {
      circles.push(<Circle key={`${i}`} size={circleSize} color={color} />);
    }

    return (
      <View style={barContainerStyle}>
        <Animated.View style={innerContainerStyle}>
          {circles}
        </Animated.View>
      </View>
    );
  }
}

function Circle({ size = 5, color }) {
  const style = [getCircleStyle(size), { backgroundColor: color }];
  return (
    <Animated.View style={style} />
  );
}
