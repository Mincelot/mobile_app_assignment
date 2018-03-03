import React from 'react';
import Header from '../components/Header';
import { Text, StyleSheet, View } from 'react-native';
import { StackNavigator } from "react-navigation";
import { FormLabel, FormInput, Button, CheckBox, SocialIcon } from 'react-native-elements';

import firebase from 'firebase';
const firebaseConstant = require('../constants/firebase');

firebase.initializeApp(firebaseConstant.FIREBASE_CONFIG);

class LogInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', name: '', status: '', loading: false, isAccountTypeClient: true };
    console.ignoredYellowBox = ['Setting a timer'];
  }
  onSignUp() {
    // this.setState({ status: '', loading: true });
    // const { email, password } = this.state;
    // firebase.auth().createUserWithEmailAndPassword(email, password)
    //   .then((user) => {
    //     // Upload name change
    //     const rootRef = firebase.database().ref().child("users");
    //     const infoRef = rootRef.child('info');
    //     const uidRef = infoRef.child(user.uid);
    //     // https://firebase.google.com/docs/reference/js/firebase.User
    //     // nameRef.push();
    //     uidRef.set({
    //       email: this.state.email,
    //       name: this.state.name,
    //       isAccountTypeClient: this.state.isAccountTypeClient
    //     })
    //     .then((user) => {
    //       this.setState({ status: 'Success. Welcome!', loading: false });
    //       this.props.navigation.navigate('TabIndexPage');
    //     })
    //     .catch((error) => {
    //       this.setState({ status: error.message });
    //     })
    //   })
    //   .catch((error) => {
    //     this.setState({ status: error.message, loading: false});
    //   })
    this.props.navigation.navigate('RegisterPage');
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
  onPass() {
    // this.props.navigation.navigate('TabIndexPage');
    firebase
      .auth()
      .signInWithEmailAndPassword("testSim@gmail.com", "Password1")
      .then(user => {
        this.setState({ status: "Success. Welcome!", loading: false });
        this.props.navigation.navigate("TabIndexPage");
    })
    .catch(error => {
        this.setState({ status: error.message, loading: false });
    });
  }
  onChangeAccountState() {
    this.setState({ isAccountTypeClient: !this.state.isAccountTypeClient });
  }
  onFacebookSignIn() {

  }
  //  {/* User/Client by default, and give ability to choose Cater Personell */}
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
          {/* <FormLabel>Display Name</FormLabel>
          <FormInput
            value={this.state.name}
            onChangeText={name => this.setState({ name })}
            /> */}
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
        <View>
          <SocialIcon
            style={{ padding: 20}}
            title='Sign In With Facebook'
            button
            onPress={this.onFacebookSignIn.bind(this)}
            type='facebook'
          />
        </View>
        {/* <View style={{alignItems: 'center', marginBottom: 15 }}>
            <FormLabel>Account Type</FormLabel>
            <CheckBox
              title={this.state.isAccountTypeClient ? 'Client Account' : 'Catoring Account'}
              onPress={this.onChangeAccountState.bind(this)}
              checked={this.state.isAccountTypeClient}
            />
        </View> */}
        <View style={styles.accountContainer}>
          <View>
            <Button
              title="By-pass login. Button for test purposes Only."
              onPress={this.onPass.bind(this)}
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
  }, 
  accountContainer: {
    flex: 1
  }

});

export default LogInPage;