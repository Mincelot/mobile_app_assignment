import React from 'react';
import Header from '../components/Header';
import { Text, StyleSheet, View } from 'react-native';
import { StackNavigator } from "react-navigation";
import { FormLabel, FormInput,Button,ButtonGroup, CheckBox, SocialIcon } from 'react-native-elements';
import ReadyForNavigation from '../services/navigatingAccountType';

import firebase from 'firebase';


class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', name: '',
      status: '', selectedIndex: 0, loading: false, isAccountTypeClient: true };
  }

  onGoBack(){
    this.props.navigation.navigate('LogInPage');
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
        .then((userReturn) => {
          this.setState({ status: 'Success. Welcome!', loading: false });
          ReadyForNavigation.readyForNavigation(user.uid, this.props.navigation);
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
        <View><Text style={{color:'red'}}>{this.state.status}</Text></View>
    
        <View style={{width:'95%'}}>
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

        <View style={{ alignItems: 'center', marginBottom: 15,width:'95%' }}>
            <FormLabel>Are you a...</FormLabel>
            <ButtonGroup
                onPress={this.onChangeAccountState.bind(this)}
                selectedIndex={selectedIndex}
                buttons={['Client', 'Server']}
                disableSelected= {true}
                containerStyle={{ height: 60, backgroundColor:'white' }}
                selectedButtonStyle={{ backgroundColor: '#1E90FF' }}
                selectedTextStyle={{ color: 'white' }}
            />
        </View>

        <View style={styles.buttonContainer}>
          <View>
            <Button
              title="Back"
              onPress={this.onGoBack.bind(this)}
              borderRadius={5}
            />
          </View>
          <View>
            <Button 
              title="Sign Up"
              onPress={this.onSignUp.bind(this)}
              borderRadius={5}
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
      padding: 5,
      backgroundColor:"#FDF3E7"
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
    }, 
    Button:{
      borderRadius:10,
      backgroundColor:'blue'
    },
    ButtonGroup:{
      borderRadius:10
    },
    accountContainer: {
      flex: 1
    },
  
  });
  
  export default RegisterPage;