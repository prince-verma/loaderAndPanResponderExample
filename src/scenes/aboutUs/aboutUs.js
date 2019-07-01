import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '50%',
  },
  verticalBar: {
    width: 2,
    height: 30,
    backgroundColor: '#FFF'
  },
  progressContainer: {
    height: 100,
    width: '100%',
    flexDirection: 'row'
  },
  left: {
    flex: 3,
    backgroundColor: '#000',
  },
  right: {
    flex: 9,
    backgroundColor: '#FFF',
  },
  timeContainer: {
    flex: 3,
    backgroundColor: '#F00'
  },
  animatedTopContainer: {
    backgroundColor: '#000',
    flex: 9,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  },
  barContainer: {
    position: 'absolute',
    borderRadius: 10,
    height: 10,
    left: 0, right: 0,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

function VerticalBar() {
  return (
    <View style={styles.verticalBar}/>
  )
}

export default class AboutUs extends React.Component {
  value = new Animated.Value(0);

  componentDidMount() {
    // this.runAnimation();
  }

  runAnimation = () => {
    let { duration = 3000 } = this.props;
    const animation =
      Animated.sequence([
        Animated.timing(this.value, { toValue: 1, duration: duration })
      ]);

    Animated.loop(animation, { useNativeDriver: true, }).start();
  };

  render() {
    const leftFlex = this.value.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });
    const rightFlex = this.value.interpolate({ inputRange: [0, 1], outputRange: [1, 0] });
    const leftBarStyle = {
      flex: leftFlex,
      borderRadius: leftFlex === 1 ? 10 : 0,
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      backgroundColor: 'red',
    };
    const rightBarStyle = {
      flex: rightFlex,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      backgroundColor: 'green',
    };
    const circleContainerStyle = {
      height:50, width:50,

    };

    return (
      <View style={styles.container}>
        <View style={styles.progressContainer}>
          <View style={styles.left}/>
          <View style={styles.right}>
            <View style={styles.timeContainer}/>
            <View style={styles.animatedTopContainer}>
              <VerticalBar/>
              <VerticalBar/>
              <VerticalBar/>
              <VerticalBar/>
              <VerticalBar/>
              <VerticalBar/>
              <VerticalBar/>
              <View style={styles.barContainer}>
                <Animated.View style={leftBarStyle}/>
                <Animated.View style={rightBarStyle}/>
              </View>
              <Animated.View style={circleContainerStyle}>
                <View style={{}}/>
              </Animated.View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
