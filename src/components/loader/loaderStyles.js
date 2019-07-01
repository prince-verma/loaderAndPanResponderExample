import { StyleSheet } from 'react-native';

export function getCircleStyle(size) {
  return ({
    width: size, height: size, borderRadius: size / 2, margin: 1
  });
}

export default StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  runningLoaderContainer: {
    flexDirection: 'row'
  },
  circularBarInnerContainerStyle: {
    marginVertical: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 5,
  },
  circle10: getCircleStyle(10),
  circle20: getCircleStyle(20),
  circle30: getCircleStyle(30),
  circle40: getCircleStyle(40),
  circle50: getCircleStyle(50),
  circle60: getCircleStyle(60),
});
