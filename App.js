import React from 'react';
import {View} from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import RootNavigator from './src/Navigator';
import MyNetInfo from './src/helpers/NetInfo';
import Dimensions from 'Dimensions';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

console.disableYellowBox = true;

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style = {{width:DEVICE_WIDTH, height:DEVICE_HEIGHT}}>
          <RootNavigator/>
          <MyNetInfo/>
        </View>
      </Provider>
    );
  }
}