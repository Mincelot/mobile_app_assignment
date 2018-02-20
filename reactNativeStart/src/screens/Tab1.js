import React from 'react';
import Header from '../components/Header';
import { View } from 'react-native';
import defaultStyles from '../../src/styles/default';
// import appConstants from '../constants/appConstants';
import firebase from 'firebase';

const appConstants = require('../constants/appConstants');
const textIntro = "Examplar Setup for " + appConstants.APP_NAME + "!";

// var user = firebase.auth().currentUser;

class Tab1 extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { name: 'Placeholder' };
    firebase.auth().onAuthStateChanged( user => {
      if (user) { this.setState({ name: user.email }); }
    });
  }
  // componentDidMount() {
      // let user = firebase.auth().currentUser;
      // if (user) {
      //   // User is signed in.
      //   this.setState({ name: user.email });
      //   // this.state = {name: user.email};
      // } else {
      //   // No user is signed in.
      // }
  // }
  render() {
    return (
        <View style={{ margin: 10 }}>
          <Header text={textIntro}></Header>
          <Header text={this.state.name}></Header>
        </View>
    ); 
  }
}
export default Tab1;