import React from 'react';
import { Animated, PanResponder, Dimensions } from 'react-native';
import styles from './chatHeadStyles';

export default class ChatHead extends React.Component {
  constructor(props) {
    super(props);

    this.pan = new Animated.ValueXY({ x: 0, y: 0 });
    this._animatedValue = { x: 0, y: 0 };
    this.panListener = this.pan.addListener((value) => this._animatedValue = value);

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponderCapture: () => false,
      onPanResponderGrant: (evt, gestureState) => {
        this.pan.setOffset({ x: this._animatedValue.x, y: this._animatedValue.y });
        this.pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([null, { dx: this.pan.x, dy: this.pan.y }]),
      onPanResponderRelease: this.handlePanResponderRelease,
      onPanResponderTerminate: this.handlePanResponderRelease
    });
  }

  componentWillUnmount(): void {
    this.panListener && this.pan.removeListener(this.panListener);
  }

  handlePanResponderRelease = (e, gestureState) => {
    const { width } = Dimensions.get('window');
    const chatHeadWidth = 80;
    const chatHeadLeftOffset = 2;
    const chatHeadTopOffset = 10;
    const decidingPoint = width / 2 - chatHeadWidth / 2;
    const { dx, dy } = gestureState;
    let x = 0, y = dy;

    if (( dx >= 0 && dx <= decidingPoint ) || ( dx <= 0 && dx >= -1 * decidingPoint )) {
      x = 0;
    } else if (dx > 0 && dx > decidingPoint) {
      x = width - chatHeadWidth - chatHeadLeftOffset * 2;
    } else if (( dx < 0 && dx < decidingPoint )) {
      x = -1 * ( width - chatHeadWidth - chatHeadLeftOffset * 2 );
    } else {
      x = 0;
    }
    
    Animated.spring(this.pan, { toValue: { x, y } }).start();
  };

  render() {
    const chatHeadStyle = [
      styles.chatHead,
      { transform: this.pan.getTranslateTransform() },
    ];

    return (
      <Animated.View
        style={chatHeadStyle}
        {...this.panResponder.panHandlers} />
    );
  }
}
