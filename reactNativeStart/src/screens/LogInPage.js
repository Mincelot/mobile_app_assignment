import React from 'react';
import Header from '../components/Header';
import { Text, StyleSheet, View } from 'react-native';
import { StackNavigator } from "react-navigation"
import { FormLabel, FormInput, Button } from 'react-native-elements'; 

import firebase from 'firebase';
const firebaseConstant = require('../constants/firebase');

firebase.initializeApp(firebaseConstant.FIREBASE_CONFIG);

class LogInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: '', status: '', loading: false}
  }
  onSignUp() {
    this.setState({ status: '', loading: true });
    const { email, password } = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.setState({ status: 'Success. Welcome!', loading: false });
        this.props.navigation.navigate('TabIndexPage');
      })
      .catch((error) => {
        this.setState({ status: error.message, loading: false});
      })
  }
  onSignIn() {
    this.setState({ status: '', loading: true });
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.setState({ status: 'Success. Welcome back!', loading: false });
        this.props.navigation.navigate('TabIndexPage');
      })
      .catch((error) => {
        this.setState({ status: error.message, loading: false });
      })
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <FormLabel>Email</FormLabel>
          <FormInput 
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            />
          <FormLabel>Password</FormLabel>
          <FormInput 
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            />
        </View>
        <View><Text>{this.state.status}</Text></View>
        <View style={styles.buttonContainer}>
          <View>
            <Button 
              title="Sign Up"
              onPress={this.onSignUp.bind(this)}
              />
          </View>
          <View>
            <Button 
              title="Log In"
              onPress={this.onSignIn.bind(this)}
              />
          </View>
        </View>
      </View>
    ); 
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row'
  }

});

export default LogInPage;