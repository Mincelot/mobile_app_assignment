import React from 'react';
import { Text, InputField, StyleSheet, View, ScrollView } from 'react-native';
import defaultStyles from '../../src/styles/default';
import colors from '../styles/color';
import { FormLabel, FormInput, Button, Avatar, Icon } from 'react-native-elements';
import firebase from 'firebase';
import { StackNavigator, NavigationActions } from "react-navigation";
import TimerMixin from 'react-timer-mixin';
import NavigatorService from '../services/navigator';


class TabAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '', tempName: '', email: '', tempEmail: '',
      userUid: null, isEditNameMode: false, isEditEmailMode: false,
      status: '', isUserImage: false};
    this.user = null;
  }
  onLaunchUploadPhoto() {
    this.setState({ isUserImage: !this.state.isUserImage });
  }
  onUpdateName() {
    if (this.state.isEditNameMode) {
      if (this.state.tempName != this.state.name) {
        // this.user.updateProfile({
        //   displayName: this.state.tempName,
        // }).then((user) => {
        //   this.setState({ status: 'Updated User Display Name!' });
        // })
        // .catch((error) => {
        //     this.setState({ status: error.message });
        // })
        const rootRef = firebase.database().ref().child("users");
        const infoRef = rootRef.child('info');
        const userRef = infoRef.child(this.user.uid);
        // https://firebase.google.com/docs/reference/js/firebase.User
        // nameRef.push();
        userRef.update({
          name: this.state.tempName
        })
        .then((user) => {
          this.setState({ status: 'Status: Updated User Name!' });
        })
        .catch((error) => {
          this.setState({ status: error.message });
        })
      }
    }

    this.setState({ name: this.state.tempName, isEditNameMode: !this.state.isEditNameMode });
  }
  onUpdateEmail() {
    if (this.state.isEditEmailMode) {
      if (this.state.tempEmail != this.state.email) {
        this.user.updateEmail(this.state.tempEmail)
        .then((user) => {
          this.setState({ status: 'Updated User Email!' });
        })
        .catch((error) => {
            this.setState({ status: error.message });
        })
      }
    }

    this.setState({ email: this.state.tempEmail, isEditEmailMode: !this.state.isEditEmailMode });
  }
  logOut() {
    firebase.auth().signOut()
    .then(function() {
      // Sign-out successful.
      NavigatorService.navigate('LogInPage');
    }, function(error) {
      // An error happened.
    });
  }
  navigateOut() {
    NavigatorService.navigate('LogInPage');
  }
  emailVerification() {
    this.user.sendEmailVerification()
    .then((user) => {
      this.setState({ status: 'Email Sent.' });
    })
    .catch((error) => {
        this.setState({ status: error.message });
    })
  }
  passwordReset() {
    auth.sendPasswordResetEmail(this.state.email)
    .then((user) => {
      this.setState({ status: 'Email Sent.' });
    })
    .catch((error) => {
        this.setState({ status: error.message });
    })
  }
  componentWillMount() {
    // firebase.database().ref()
    firebase.auth().onAuthStateChanged( user => {
      if (user) {
        // this.setState({ email: user.email, userInfo: user });
        this.setState({ userUid: user.uid, email: user.email, tempEmail: user.email });
        this.user = user;

        const rootRef = firebase.database().ref().child("users");
        const infoRef = rootRef.child('info');
        const userRef = infoRef.child(user.uid);

        userRef.once('value')
        .then((snapshot) => {
          if (snapshot.val() && snapshot.val().name) {
            this.setState({ name: snapshot.val().name, tempName: snapshot.val().name });
          }
        })
        .catch((error) => {
          this.setState({ status: error.message });
        })
      }

    });
    // var user = firebase.auth().currentUser;

    // if (user != null) {
      // this.setState({ userUid: user.uid, email: user.email, tempEmail: user.email });
      // this.user = user;

      // const rootRef = firebase.database().ref().child("users");
      // const infoRef = rootRef.child('info');
      // const userRef = infoRef.child(user.uid);

      // userRef.once('value').then(function(snapshot) {
      //   if (snapshot.val() && snapshot.val().name) {
      //     this.setState({ name: snapshot.val().name, tempName: snapshot.val().name });
      //   }
      // });
  }
  render() {
    return (
        <View style={[styles.container, {backgroundColor: colors.backgroundSecondary}]}>
        <ScrollView>
          {this.state.status != '' && 
          <View style={styles.dividerView}>
            <View style={[defaultStyles.marginSides, {alignItems: 'center', justifyContent: 'center'}]}>
                <FormLabel labelStyle={{color: 'green', fontSize: 16 }}>
                  {this.state.status}
                </FormLabel>
            </View>
          </View>
          }
          <View style={styles.dividerView}>
          <View style={this.state.isEditEmailMode ? {} : styles.row}>
              <View>
                <Text style={[defaultStyles.marginSidesIndent, defaultStyles.text]}>
                  Email
                </Text>
                {!this.state.isEditEmailMode &&
                <View style={defaultStyles.marginSides}>
                  <FormLabel labelStyle={{color: 'white', fontSize: 15}}>{this.state.email}</FormLabel>
                </View>
                }
                {this.state.isEditEmailMode &&
                  <View style={[defaultStyles.marginSidesFormInput]}>
                    <FormInput
                      placeholder='Account Name'
                      value={this.state.tempEmail}
                      onChangeText={(tempEnter) => this.setState({ tempEmail: tempEnter })}
                    >
                    </FormInput>
                  </View>
                }
              </View>
              <View style={this.state.isEditEmailMode ? defaultStyles.marginSidesIndent : styles.alignRight}>
                {/* <Button
                  small
                  icon={{name: !this.state.isEditEmailMode ? 'edit' : 'check-square-o', type: 'font-awesome'}}
                  onPress={this.onUpdateName.bind(this)}
                  backgroundColor='#517fa4'
                  title={!this.state.isEditEmailMode ? 'Edit' : 'Save'} /> */}
                <Icon
                  reverse
                  raised
                  name={!this.state.isEditEmailMode ? 'edit' : 'check-square-o'}
                  type='font-awesome'
                  onPress={this.onUpdateEmail.bind(this)}
                  color='#517fa4' />
              </View>
            </View>
          </View>
          <View style={styles.dividerView}>
            <View style={this.state.isEditNameMode ? {} : styles.row}>
              <View>
                <Text style={[defaultStyles.marginSidesIndent, defaultStyles.text]}>
                  Name
                </Text>
                {!this.state.isEditNameMode &&
                  <View style={defaultStyles.marginSides}>
                    <FormLabel labelStyle={{color: 'white', fontSize: 15}}>{this.state.name == '' ? 'No Name Given' : this.state.name}</FormLabel>
                  </View>
                }
                {this.state.isEditNameMode &&
                  <View style={[defaultStyles.marginSidesFormInput]}>
                    <FormInput
                      placeholder='Account Name'
                      value={this.state.tempName}
                      onChangeText={(tempNameEnter) => this.setState({ tempName: tempNameEnter })}
                    >
                    </FormInput>
                  </View>
                }
                </View>
              <View style={this.state.isEditNameMode ? defaultStyles.marginSidesIndent : styles.alignRight}>
                {/* <Button
                  small
                  icon={{name: !this.state.isEditNameMode ? 'edit' : 'check-square-o', type: 'font-awesome'}}
                  onPress={this.onUpdateName.bind(this)}
                  backgroundColor='#517fa4'
                  title={!this.state.isEditNameMode ? 'Edit' : 'Save'} /> */}
                <Icon
                  reverse
                  raised
                  name={!this.state.isEditNameMode ? 'edit' : 'check-square-o'}
                  type='font-awesome'
                  onPress={this.onUpdateName.bind(this)}
                  color='#517fa4' />
              </View>
            </View>
          </View>
          <View style={styles.dividerView}>
            <Text style={[defaultStyles.marginSidesIndent, defaultStyles.text]}>Portfolio Photo</Text>
            <View style={[styles.center, styles.paddingImage]}>
            {!this.state.isUserImage ?
              <Avatar
                xlarge
                rounded
                containerStyle={[styles.center, styles.paddingImage]}
                icon={{name: 'user', type: 'font-awesome'}}
                onPress={this.onLaunchUploadPhoto.bind(this)}
                activeOpacity={0.7}
              />
            :
              <Avatar
                xlarge
                rounded
                containerStyle={[styles.center, styles.paddingImage]}
                source={{uri: "https://i.imgur.com/ubjTfy4.jpg"}}
                onPress={this.onLaunchUploadPhoto.bind(this)}
                activeOpacity={0.7}
              />
            }
            </View>
          </View>
          <View style={styles.center}>
            <View>
              <Button
                medium
                icon={{name: 'envelope-square', type: 'font-awesome'}}
                onPress={this.emailVerification.bind(this)}
                backgroundColor='#517fa4'
                title="Resend Email Verification" />
            </View>
            <View style={{paddingTop: 10}}>
              <Button
                  medium
                  icon={{name: 'envelope-square', type: 'font-awesome'}}
                  onPress={this.passwordReset.bind(this)}
                  backgroundColor='#517fa4'
                  title="Password Reset to Email" />
            </View>
            <View style={{paddingTop: 10, paddingBottom: 10}}>
              <Button
                  medium
                  icon={{name: 'sign-out', type: 'font-awesome'}}
                  onPress={this.logOut.bind(this)}
                  backgroundColor='#517fa4'
                  title="Log Out" />
            </View>
          </View>
          </ScrollView>
        </View>
    ); 
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
  },
  // containerRow: {
  //   flex: 1,
  //   flexDirection: 'row'
  // },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row:{
    flexDirection: 'row',
  },
  alignRight: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  paddingImage: {
    paddingTop: 30,
    paddingBottom: 5
  },
  dividerView: {
    paddingBottom: 20
  }

});

export default TabAccount;

// <Button
//   medium
//   icon={{name: !this.state.isEditMode ? 'edit' : 'check-square-o', type: 'font-awesome'}}
//   onPress={this.onUpdateName.bind(this)}
//   backgroundColor='#517fa4'
//   title={!this.state.isEditMode ? 'Edit' : 'Save'} />

//   <View style={styles.dividerView}>
//   <Text style={[defaultStyles.marginSidesIndent, defaultStyles.text]}>Location</Text>
//   <View style={defaultStyles.marginSidesFormInput}>
//     <FormInput
//       placeholder='Location'
//       value={this.state.location}
//     >
//     </FormInput>
//   </View>
// </View>



  // Upload name change
  // const rootRef = firebase.database().ref().child("users");
  // const infoRef = rootRef.child('info');
  // const nameRef = infoRef.child(this.state.userUid);
  // // https://firebase.google.com/docs/reference/js/firebase.User
  // // nameRef.push();
  // nameRef.set({
  //   uid: this.state.userUid,
  //   name: this.state.tempName
  // })
  // .then((user) => {
  //   this.setState({ status: 'Status: Updated User Info!' });
  // })
  // .catch((error) => {
  //   this.setState({ status: error.message });
  // })