import React from 'react';
import { Text, View } from 'react-native';
import styles from '../../styles';
import { ABOUT_US } from '../../utilities';
import { Loader, ChatHead, showSnackBar } from '../../components';

function Seperator() {
  return <View style={{ width: 300, height: 2, backgroundColor: '#000', margin: 4 }}/>;
}

export default class Profile extends React.Component {
  goToAboutUS = () => {
    const { navigation } = this.props;
    navigation.navigate(ABOUT_US);
  };

  openDrawer = () => {
    const { navigation } = this.props;
    navigation.openDrawer();
  };

  render() {
    return (
      <View style={[styles.center, styles.f1]}>
        <ChatHead/>
        <Text>My Profile</Text>
        <Text onPress={this.openDrawer}>Open Drawer</Text>
        <Text onPress={this.goToAboutUS}>go to About us screen </Text>
        {/*<Seperator/>*/}
        {/*<Loader type={-1} color={'#FF00FF'}/>*/}
        {/*<Seperator/>*/}
        {/*<Loader type={0} circleSize={15} color={'#00BFFF'}/>*/}
        {/*<Seperator/>*/}
        {/*<Loader type={1} size={40}/>*/}
        {/*<Seperator/>*/}
        {/*<Loader type={2} size={50} spacing={15}/>*/}
        {/*<Seperator/>*/}
        {/*<Loader type={3}/>*/}
        {/*<Seperator/>*/}
        {/*<Loader type={4}/>*/}
        {/*<Seperator/>*/}
      </View>
    );
  }
}
