import React from 'react';
import Header from '../components/Header';
import { View } from 'react-native';
import defaultStyles from '../../src/styles/default';
// import appConstants from '../constants/appConstants';
const appConstants = require('../constants/appConstants');

const textIntro = "Examplar Setup for " + appConstants.APP_NAME + "!";

class Tab1 extends React.Component {
  render() {
    return (
        <View style={{ margin: 10 }}>
          <Header text={textIntro}></Header>
        </View>
    ); 
  }
}
export default Tab1;