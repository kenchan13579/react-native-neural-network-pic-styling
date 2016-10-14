import React, { Component } from 'react';
import CameraView from './components/views/camera/cameraView';
import {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  Text,
  View
} from 'react-native';

class App extends Component {
  render() {
    return (
      <NavigatorIOS 
        initialRoute={{
          component: CameraView,
          title: 'aMain'
        }}
        navigationBarHidden={true}
        style={{flex: 1}}
       />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('ui', () => App);
