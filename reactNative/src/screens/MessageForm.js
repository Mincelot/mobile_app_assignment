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
    this.numOfRequests = 0;
    this.formFilled = false;
  }


  componentWillMount() {
  
    const rootRef = firebase.database().ref().child("users");
    const infoRef = rootRef.child('info');
    const userRef = infoRef.child(this.userUidPassedIn);

    userRef.once('value')
    .then((snapshot) => {
      //if no jobReq exist, create the folder for this user.
      if(!snapshot.hasChild('jobRequests')){
        userRef.update({
          jobRequests: this.numOfRequests
        })
        // userRef.set({jobRequests: this.numOfRequests});
      }
      else{ //otherwise check how many requests already exist
        const jobRef = userRef.child('jobRequests');
        jobRef.once('value')
        .then((snapshot) => {
          this.numOfRequests = snapshot.numChildren();
        })
        .catch((error) => {
          this.setState({ status: error.message });
        })
      }
    })

    
  }

  backButton() {
    this.props.navigation.dispatch(NavigationActions.back());
  }

  sendMessage(){
    //alert('hello');
    this.formFilled = true;
    const rootRef = firebase.database().ref().child("users");
    const infoRef = rootRef.child('info');
    const userRef = infoRef.child(this.userUidPassedIn); //user id of chef who gets the job request
    const jobRef = userRef.child('jobRequests');

    let jobNum = this.numOfRequests + 1; //increases the number of jobs
    this.numOfRequests = this.numOfRequests + 1; //update number of requests.
    let jobName = 'requestNum'+jobNum; //creates the name of the folder

    jobRef.update({
      jobName: null
    })
    //create the path to the next job.
    const jobPath = jobRef.child(jobName);

    //alert(jobPath);

    if (this.formFilled){
      
      jobPath.set({
        cuisine: this.state.cuisine, 
        date: this.state.date,
        partySize: this.state.partySize,
        price: this.state.price
        
      })

      .then((stuff) => {
        Alert.alert(
          'Notification',
          'Job Request Sent!',
          [
            {text: 'OK', onPress: () => {}}
          ]
        )
      })
      .catch((error) => {
        Alert.alert(
          'Notification',
          'Failed to send request.',
          [
            {text: 'OK', onPress: () => {}}
          ]
        )
      })
    }
  }

  // changeFormAndSend(){
  //   //alert('sending..')
  //   this.setState({ formFilled: true });
  //   this.sendMessage.bind(this);
  // }


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
              //secureTextEntry={true}
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
              onPress={this.sendMessage.bind(this)}
              // onPress={()=>{
              //   //alert('press failed');
              //    this.changeFormAndSend.bind(this)
              //   
              //   }}
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