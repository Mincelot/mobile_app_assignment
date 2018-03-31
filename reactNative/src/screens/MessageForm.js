import React from 'react';
//import Header from '../components/Header';
import { StyleSheet, View, Alert, Text } from 'react-native';
import colors from '../styles/color';
import defaultStyles from '../../src/styles/default';
import { NavigationActions } from "react-navigation";
import { Header, Icon, Button, FormLabel, FormInput} from 'react-native-elements';
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
        <View style={styles.boxAround}>
          <Header
            leftComponent={<Icon
              name='arrow-back'
              color='#fff'
              size={40}
              onPress={this.backButton.bind(this)}
            />}
            centerComponent={{ text: 'Message Form', style: { color: '#fff', fontSize: 30, fontStyle: "italic" } }}
            outerContainerStyles={{ backgroundColor: colors.tabNavBackground }}
         />
        </View>
        {/* <Text>hello</Text> */}


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
        </View>


      </View>


      


    ); 
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: colors.background
    },

    buttonColor: {
      backgroundColor: colors.alternatePurple
    },
    buttonContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row'
    },
       boxAround: {
         margin: 10,
         borderRadius: 4,
         borderWidth: 0.5,
         borderColor: '#d6d7da',
       }
});

export default MessageForm;