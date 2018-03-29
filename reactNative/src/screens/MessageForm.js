import React from 'react';
import Header from '../components/Header';
import { Text, StyleSheet, View } from 'react-native';
import { StackNavigator, NavigationActions } from "react-navigation";
import { FormLabel, FormInput,Button,ButtonGroup, CheckBox, SocialIcon } from 'react-native-elements';
import ReadyForNavigation from '../services/navigatingAccountType';
>>>>>>> 20a8616fa5e0f6633d1f236ed99fcd4971cd6eb4
import colors from '../styles/color';
import defaultStyles from '../../src/styles/default';
import { NavigationActions } from "react-navigation";
import { Header, Icon, Button} from 'react-native-elements';
import firebase from 'firebase';
import NavigatorService from '../services/navigator';
import { connect } from 'react-redux';

class MessageForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {cuisine: '', date: '', partySize: '', price: ''}; 
    if (this.props && this.props.navigation && this.props.navigation.state && this.props.navigation.state.params) {
      // this.isViewMode = this.props.navigation.state.params.isView ? true : false;
      this.userUidPassedIn = this.props.navigation.state.params.selectedUserUid;
      this.loggedInClient = this.props.navigation.state.params.loggedInClient;
    }
    this.unsubscribe = null;
  }

  backButton() {
    this.props.navigation.dispatch(NavigationActions.back());
  }

  render() {
    return (
      <View style={styles.container}>
        <View><Text style={{color:'red'}}>{this.state.status}</Text></View>
    
          <View style={{width:'95%'}}>
            <FormLabel labelStyle={styles.textColor}>Date</FormLabel>
            <FormInput 
              value={this.state.date}
              onChangeText={date => this.setState({ date })}
              />
            <FormLabel labelStyle={styles.textColor}>Cuisine</FormLabel>
            <FormInput 
              secureTextEntry={true}
              value={this.state.cuisine}
              onChangeText={cuisine => this.setState({ cuisine })}
              />
            <FormLabel labelStyle={styles.textColor}>Number of people</FormLabel>
            <FormInput
              value={this.state.partySize}
              onChangeText={partySize => this.setState({ partySize })}
              />
            <FormLabel labelStyle={styles.textColor}>Price</FormLabel>
            <FormInput
              value={this.state.price}
              onChangeText={price => this.setState({ price })}
              />
        </View>

        <View style={styles.buttonContainer}>
          <View>
            <Button 
              buttonStyle={styles.buttonColor}
              title="Send"
              onPress={this.backButton.bind(this)}
              borderRadius={5}
              />
          </View>
          <View>
            <Button 
              buttonStyle={styles.buttonColor}
              title="Back"
              onPress={this.backButton.bind(this)}
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
    backgroundColor: colors.backgroundColor
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  accountContainer: {
    flex: 1
  },
  buttonColor: {
    backgroundColor: colors.alternatePurple
  },
  textColor: {
    color: 'black'
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerStyle: {
    // color: colors.backgroundColor,
    fontSize: 36, 
    fontWeight: 'bold'
  }

});

export default MessageForm;