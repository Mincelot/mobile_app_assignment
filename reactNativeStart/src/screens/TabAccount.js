import React from 'react';
import { Text, InputField, StyleSheet, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import defaultStyles from '../../src/styles/default';
import colors from '../styles/color';
import { FormLabel, FormInput, Button, Avatar, Icon } from 'react-native-elements';
import firebase from 'firebase';
import { StackNavigator, NavigationActions } from "react-navigation";
import TimerMixin from 'react-timer-mixin';
import { ImagePicker } from 'expo';
import NavigatorService from '../services/navigator';


class TabAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '', tempName: '', email: '', tempEmail: '',
      userUid: null, isEditNameMode: false, isEditEmailMode: false,
      status: '', profilePic: null, progress: 1};
    this.user = null;
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
        const rootRef = firebase.database().ref().child("users");
        const infoRef = rootRef.child('info');
        const userRef = infoRef.child(this.user.uid);
        userRef.update({
          email: this.state.tempEmail
        })
        .then((user) => {
          this.setState({ status: 'Status: Updated Email!' });
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
    firebase.auth().sendPasswordResetEmail(this.state.email)
    .then((user) => {
      this.setState({ status: 'Email Sent.' });
      Alert.alert(
        'Notification',
        'Password reset message has been sent!',
        [
          {text: 'OK', onPress: () => {}}
        ]
      )
    })
    .catch((error) => {
        this.setState({ status: error.message });
        Alert.alert(
          'Notification',
          error.message,
          [
            {text: 'OK', onPress: () => {}}
          ]
        )
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

  _renderNameConfirm() {
    if (this.state.isEditNameMode) {
      return (<View style={this.state.isEditNameMode ? styles.center : {}}>
      <Icon
      reverse
      raised
      name={!this.state.isEditNameMode ? 'edit' : 'check-square-o'}
      type='font-awesome'
      onPress={this.onUpdateName.bind(this)}
      color='#f3753f' />
      </View>);
    } else {
      return null;
    }
  }

  _renderEmailConfirm() {
    if (this.state.isEditEmailMode) {
      return (<View style={this.state.isEditEmailMode ? styles.center : {}}>
      <Icon
      reverse
      raised
      name={!this.state.isEditEmailMode ? 'edit' : 'check-square-o'}
      type='font-awesome'
      onPress={this.onUpdateEmail.bind(this)}
      color='#f3753f' />
      </View>);
    } else {
      return null;
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64 : true
    });

    //console.log(result);

    if (!result.cancelled) {
      this.setState({ profilePic: result.uri });
      //this._uploadAsByteArray(this.convertToByteArray(result.base64), (progress) => {
        //console.log(progress)
        //this.setState({progress})
      //})
      try{
        //Uploads the base64 to firebase as a raw string, with the specified metadata
        firebase.storage().ref().child('UserAccPic/Test.jpg').putString(result.base64).then( () => console.log("done")).catch( (err) => console.log(err) ) ;
      }
      catch(err){
        console.log(err);
      }
    }
  };

  convertToByteArray = (input) => {
    var binary_string = this.atob(input);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes
  }
  
  atob = (input) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

    let str = input.replace(/=+$/, '');
    let output = '';

    if (str.length % 4 == 1) {
      throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
    }
    for (let bc = 0, bs = 0, buffer, i = 0;
      buffer = str.charAt(i++);

      ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
        bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
    ) {
      buffer = chars.indexOf(buffer);
    }

    return output;
  }
  _uploadAsByteArray = async (pickerResultAsByteArray, progressCallback) => {

    try {

      var metadata = {
        contentType: 'image/jpeg',
      };

      var storageRef = firebase.storage().ref('/UserAccPic/test.jpg');
      var uploadTask = storageRef.put(pickerResultAsByteArray, metadata);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function (snapshot) {

        progressCallback && progressCallback(snapshot.bytesTransferred / snapshot.totalBytes)

        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');

      }, function (error) {
        console.log("in _uploadAsByteArray ", error)
      }, function () {
        var downloadURL = uploadTask.snapshot.downloadURL;
        console.log("_uploadAsByteArray ", uploadTask.snapshot.downloadURL)
      });

    } catch (ee) {
      console.log("when trying to load _uploadAsByteArray ", ee)
    }
  };
  render() {
    return (
        <View style={[styles.container, {backgroundColor: '#FDF3E7'}]}>
        <ScrollView>
		  <View style={styles.dividerView}>
            <Text style={[defaultStyles.marginSidesIndent, styles.labelText]}>Account Setting</Text>
            {/*------------------------------------------Avatar settings starts here--------------------------------------*/}
            <View style={[styles.center, styles.paddingImage]}>
            {!this.state.profilePic ?
              <Avatar
                xlarge
                rounded
                containerStyle={[styles.center, styles.paddingImage]}
                icon={{name: 'user', type: 'font-awesome'}}
                onPress={this._pickImage.bind(this)}
                activeOpacity={0.7}
              />
            :
              <Avatar
                xlarge
                rounded
                containerStyle={[styles.center, styles.paddingImage]}
                source={{uri: this.state.profilePic}}
                onPress={this._pickImage.bind(this)}
                activeOpacity={0.7}
              />
            }
            </View>
          </View>
          <View style={styles.dividerView}>
          {/*--------------------------------------------Emails components starts here------------------------------------*/}
          <View style={this.state.isEditEmailMode ? {} : [styles.row, styles.center]}>
              <View>
                {!this.state.isEditEmailMode &&
                <View style={defaultStyles.marginSides}>
                   <TouchableOpacity
                      onPress={this.onUpdateEmail.bind(this)}
                    >                       
                    <FormLabel labelStyle={styles.labelText}>{this.state.email}</FormLabel>
                    </TouchableOpacity>
                </View>
                }
                {this.state.isEditEmailMode &&
                  <View style={[styles.row, styles.center, {borderColor: "#f3753f", borderWidth: 2}]}>
                    <FormInput
                      placeholder='Email'
                      value={this.state.tempEmail}
                      onChangeText={(tempEnter) => this.setState({ tempEmail: tempEnter })}
                    >
                    </FormInput>
                  </View>
                }
              </View>

          {this._renderEmailConfirm.bind(this)()}
			
          </View>
          {/* ------------------------------------------------Names components start here-------------------------------------------------*/}
          </View>
          <View style={styles.dividerView}>
            <View style={this.state.isEditNameMode ? {} : [styles.row, styles.center]}>
              <View>
                {!this.state.isEditNameMode &&
                  <View style={defaultStyles.marginSides}>
                    <TouchableOpacity
                      onPress={this.onUpdateName.bind(this)}
                    >
                                            
                    <FormLabel labelStyle={styles.labelText}>{this.state.name == '' ? 'No Name Given' : this.state.name}</FormLabel>
                    </TouchableOpacity>
                  </View>
                }
                {this.state.isEditNameMode &&
                  <View style={[styles.row, styles.center, {borderColor: "#f3753f", borderWidth: 2}]}>
                    <FormInput
                      placeholder='Account Name'
                      value={this.state.tempName}
                      onChangeText={(tempNameEnter) => this.setState({ tempName: tempNameEnter })}
                    >
                    </FormInput>
                    
                  </View>
                }
                </View>
                {this._renderNameConfirm.bind(this)()}
            </View>
          </View>





          <View style={styles.center}>
            
            <View style={[{paddingTop: 10}]}>
              <TouchableOpacity
                style={styles.myButton}
                onPress={() => {this.passwordReset()}}
              >
                <Text style={{color: '#7E8F7C'}}> Password Reset to Email </Text>
              </TouchableOpacity>
            </View>
            <View style={{paddingTop: 10, paddingBottom: 10}}>
              <TouchableOpacity
                style={styles.myButton}
                onPress={() => {this.logOut()}}
              >
                <Text style={{color: '#7E8F7C'}}> Log Out </Text>
              </TouchableOpacity>

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
  },
  labelText: {
    color: '#7E8F7C', 
    fontSize: 20
  },
  myButton: {
    alignItems: 'center',
    padding: 10,
    borderWidth:2,
    backgroundColor:"#FDF3E7",
    borderColor:"#f3753f",
    borderRadius: 15

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