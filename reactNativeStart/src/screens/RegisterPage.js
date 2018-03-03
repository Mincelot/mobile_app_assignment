import React from 'react';
import Header from '../components/Header';
import { Text, StyleSheet, View } from 'react-native';
import { StackNavigator } from "react-navigation";
import { FormLabel, FormInput,Button,ButtonGroup, CheckBox, SocialIcon } from 'react-native-elements';

import firebase from 'firebase';


class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', name: '', status: '', selectedIndex: 0,loading: false, isAccountTypeClient: true };
        // console.ignoredYellowBox = ['Setting a timer'];
      }

      onSignUp() {
        this.setState({ status: '', loading: true });
        const { email, password } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((user) => {
            // Upload name change
            const rootRef = firebase.database().ref().child("users");
            const infoRef = rootRef.child('info');
            const uidRef = infoRef.child(user.uid);
            // https://firebase.google.com/docs/reference/js/firebase.User
            // nameRef.push();
            uidRef.set({
              email: this.state.email,
              name: this.state.name,
              isAccountTypeClient: this.state.isAccountTypeClient
            })
            .then((user) => {
              this.setState({ status: 'Success. Welcome!', loading: false });
              this.props.navigation.navigate('TabIndexPage');
            })
            .catch((error) => {
              this.setState({ status: error.message });
            })
          })
          .catch((error) => {
            this.setState({ status: error.message, loading: false});
          })
      }

      onChangeAccountState(selectedIndex) {
        this.setState({selectedIndex})
        if (selectedIndex == 0){
            this.setState({
                isAccountTypeClient: true
              });
        }
        else if (selectedIndex == 1) {
            this.setState({
                isAccountTypeClient: false
              });
        }   
      }

      //  {/* User/Client by default, and give ability to choose Cater Personell */}
    render() {
        const { selectedIndex } = this.state
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
          <FormLabel>Display Name</FormLabel>
          <FormInput
            value={this.state.name}
            onChangeText={name => this.setState({ name })}
            />
        </View>
        <View style={{alignItems: 'center', marginBottom: 15 }}>
            <FormLabel>Are you a...</FormLabel>
            <ButtonGroup
                onPress={this.onChangeAccountState.bind(this)}
                selectedIndex={selectedIndex}
                buttons={['Client', 'Chef']}
                disableSelected= {true}
                containerStyle={{height: 60}}
                selectedButtonStyle={{backgroundcolor:'blue'}}
            />
        </View>
        <View style={styles.buttonContainer}>
          <View>
            <Button 
              title="Sign Up"
              onPress={this.onSignUp.bind(this)}
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
  
  export default RegisterPage;