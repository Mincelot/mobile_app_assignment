import React from 'react';
import { Text, StyleSheet, View, ScrollView, TextInput, FlatList,
   Modal, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import defaultStyles from '../../src/styles/default';
import colors from '../styles/color';
import { NavigationActions } from "react-navigation";
import { Card, Header, Icon, Button, FormInput } from 'react-native-elements';
import firebase from 'firebase';

class TabPortfolioServiceProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {picFolders: [], modalVisible: false, tempUrl: '', tempDescription: '', descriptionModalVisible: false}; //folder has text + picUrl 
    this.isViewMode = false;
    this.userUidPassedIn = '';
    this.currentUser = '';
    this.numPicFolders = 0;
    if (this.props && this.props.navigation && this.props.navigation.state && this.props.navigation.state.params) {
      this.isViewMode = this.props.navigation.state.params.isView ? true : false;
      this.userUidPassedIn = this.props.navigation.state.params.selectedUserUid;
    }
    this.unsubscribe = null;
  }
  componentWillMount() {
    if (!this.isViewMode) {
      this.unsubscribe = firebase.auth().onAuthStateChanged( user => {
        if (user) {
          this.currentUser = user;
          const rootRef = firebase.database().ref().child("users");
          const infoRef = rootRef.child('info');
          const userRef = infoRef.child(user.uid);
          const picRef = userRef.child('picFolder');
          picRef.once('value')

          .then((snapshot) => {
            this.numPicFolders = snapshot.numChildren();
            console.log(this.numPicFolders);
            var picTemp = [];
            if (snapshot.val()){
              snapshot.forEach((item) => {
                picTemp.push({
                  description: item.val().text,
                  picture: item.val().picUrl
                });
              });
              this.setState({ picFolders: picTemp});
            }
          })
          .catch((error) => {
            this.setState({ status: error.message });
          })
        }

      });
    } else {
      const rootRef = firebase.database().ref().child("users");
      const infoRef = rootRef.child('info');
      const userRef = infoRef.child(this.userUidPassedIn);
      const picRef = userRef.child('picFolder');
      picRef.once('value')

      .then((snapshot) => {
        var picTemp = [];
        if (snapshot.val()){
          snapshot.forEach((item) => {
            picTemp.push({
              description: item.val().text,
              picture: item.val().picUrl
            });
          });
          this.setState({ picFolders: picTemp});
        }
      })
      .catch((error) => {
        this.setState({ status: error.message });
      })
    }
  }
  
  onTextChange(pic, returnText) {
    // this.setState({ testDescription: returnText });
    var tempPicFolders = this.state.picFolders;
    for (let i = 0; i < tempPicFolders.length; i++) {
      if (tempPicFolders[i].picture == pic) {
          tempPicFolders[i].description = returnText;
          this.setState({picFolders: tempPicFolders});
      }
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe != null) {
      this.unsubscribe();
    }
  }
 
  //maybe change to this for D3. 
  // addDescriptionModal(){
  //   if(this.state.tempUrl){
  //     console.log('in add description');
  //     this.setState({descriptionModalVisible: true});
  //     console.log(this.state.tempUrl);
  //     let newPicUrl = this.state.tempUrl;
  //     this.setState({tempUrl: ''});
  //     console.log(newPicUrl);
  //     <View> 
  //       {this.descriptionModalVisible &&  
  //         <Modal
  //           animationType="fade"
  //           transparent={true}
  //           visible={this.state.descriptionModalVisible}
  //           onRequestClose={() => {
  //             alert('Modal has been closed.');
  //           }}>
  //           <View style={{height: '100%', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
  //             <View style={styles.centeredDialog}>
  //               <Text style={[styles.labelText, {fontSize: 14}]}>Describe your dish!</Text>
  //               <FormInput
  //                 placeholder='Tap here to edit'
  //                 value={this.state.tempDescription ? this.state.tempDescription : ''}
  //                 onChangeText={(newDescription) => this.setState({ tempDescription: newDescription })}
  //               >
  //               </FormInput>
  //               <View style={[{display: 'flex'}, {flexDirection: 'row'}, {justifyContent: 'space-between'}]}>
  //               <TouchableOpacity
  //                   style={[styles.myButton]}
  //                   onPress={this.onTextChange.bind(this,newPicUrl)}>
  //                   <Text style={{color: '#7E8F7C'}}> Confirm </Text>
  //               </TouchableOpacity>
  //               <TouchableOpacity
  //                   style={styles.myButton}
  //                   onPress={this.setState({descriptionModalVisible: false})}>
  //                   <Text style={{color: '#7E8F7C'}}> Cancel </Text>
  //               </TouchableOpacity>
  //               </View>
  //             </View>
  //           </View>
  //         </Modal>  
  //       }    
  //     </View>
  //   }
  // }

//Uploads picture+description on firebase and the screen.
uploadPictureAndDescription(){
    const rootRef = firebase.database().ref().child("users");
    const infoRef = rootRef.child('info');
    const userRef = infoRef.child(this.currentUser.uid);
    const picRef = userRef.child('picFolder');

    let folderNum = this.numPicFolders + 1; //increases the number of folders
    this.numPicFolders = this.numPicFolders + 1;

    //console.log(folderNum);
    let folderName = 'picFolder'+folderNum; //creates the name of the folder
    //console.log(folderName);
    picRef.update({
      folderName: null
    })
    //create the path to the next picture.
    const picPath = picRef.child(folderName);
    //console.log(picPath);
    if (this.state.tempUrl){
      
      picPath.set({
        picUrl: this.state.tempUrl,
        
        text: this.state.tempDescription
        
      })
      .then((user) => {
        this.setState({ status: 'Status: Uploaded picture!', descriptionModalVisible: true });

      })
      .catch((error) => {
        this.setState({ status: error.message });
      })
      this.setState({ modalVisible: false ,picFolders: 
        [...this.state.picFolders,{ picture: this.state.tempUrl, description: this.state.tempDescription} ]}, () => {
         this.setState({ tempUrl : '' , tempDescription: ''});
      });
      Alert.alert(
        'Notification',
        'Upload successful!',
        [
          {text: 'OK', onPress: () => {}}
        ]
      )
    }
    
  }

  setModalVisibleFalse() {
    this.setState({modalVisible: false});
  }

  backButton() {
    this.props.navigation.dispatch(NavigationActions.back());
  }

  render() {
    return (
      <View style={styles.container}>
        <View> 
          {!this.isViewMode && //view mode false = chef user 
          <Header
            centerComponent={{ text: 'My Portfolio', style: { color: '#fff', fontSize: 30, fontStyle: "italic" } }}
            rightComponent={<Icon
              name='control-point'
              color='#fff'
              size={40}
              onPress={() => {this.setState({ modalVisible: true})}}
            /> }
            outerContainerStyles={{ backgroundColor: colors.tabNavBackground }}
          />
          } 
        </View>
        <View>     
          {this.isViewMode && //view mode true = client user 
            <Header
              leftComponent={<Icon
                name='arrow-back'
                color='#fff'
                size={40}
                onPress={this.backButton.bind(this)}
              />}
              centerComponent={{ text: 'Portfolio', style: { color: '#fff', fontSize: 30, fontStyle: "italic" } }}        
              outerContainerStyles={{ backgroundColor: colors.tabNavBackground }}  
            />
          } 
        </View>
        {/* <View> */}
        {/* <Animated.View style={{ marginBottom: this.keyboardHeight }}> */}
        <KeyboardAvoidingView behavior="padding" style={styles.form} keyboardVerticalOffset={
              Platform.select({
                  ios: () => 5,
                  android: () => 7
              })()
          }>
        <ScrollView style={{marginBottom: 20}} keyboardShouldPersistTaps='always'>
          {/* <Animated.View style={[{ paddingBottom: this.keyboardHeight }]}> */}
          {/* <Text>{this.isViewMode ? 'ViewMode' : 'EditMode, Erase this after.'}</Text> */}
          <View>     
            {!this.isViewMode && //view mode false = chef user  
              <FlatList
                data={this.state.picFolders}
                extraData={this.state}
                keyExtractor={(item, index) => index}
                renderItem={({item}) =>
                <View style={styles.container}>
                  <Card
                    image={{uri:item.picture}}>
                    <TextInput //only for editing the description
                      style={{height: 40}}
                      placeholder="Description..."
                      value={item.description} //original text 
                      //returnText is the new one, and we assign it back to item.description
                      onChangeText={this.onTextChange.bind(this, item.picture)}
                    />
                  </Card>
                </View>}  
              />
            }  
          </View> 
          <View>
            {!this.isViewMode &&
            <Modal
              animationType="fade"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                alert('Modal has been closed.');
              }}>
              <View style={{height: '100%', width: '100%', backgroundColor: colors.clear}}>
                <View style={styles.centeredDialog}>
                  <Text style={[styles.labelText, {fontSize: 14}]}>Please enter the direct link to your picture:</Text>
                  <FormInput
                    //backgroundColor= {colors.tabNavIconOn}
                    placeholder='Tap to add URL of image'
                    value={this.state.tempUrl ? this.state.tempUrl : ''}
                    onChangeText={(newUrl) => this.setState({ tempUrl: newUrl })}
                  >
                  </FormInput>
                  <FormInput
                    placeholder='Tap to add description'
                    value={this.state.tempDescription ? this.state.tempDescription : ''}
                    onChangeText={(newDescription) => this.setState({tempDescription: newDescription})}
                  >
                  </FormInput>
                  <View style={[{display: 'flex'}, {flexDirection: 'row'}, {justifyContent: 'space-between'}]}>
                  <TouchableOpacity
                      style={[styles.myButton]}
                      onPress={this.uploadPictureAndDescription.bind(this)}>
                      <Text style={{color: '#7E8F7C'}}> Confirm </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={styles.myButton}
                      onPress={this.setModalVisibleFalse.bind(this)}>
                      <Text style={{color: '#7E8F7C'}}> Cancel </Text>
                  </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
            }
            </View>
          <View>     
            {this.isViewMode && //view mode true = client user  
            <View>
              {/* Needs a passed unique UID from the search page to be passed in order for this to show data. */}
              <FlatList
              data={this.state.picFolders}
              keyExtractor={(item, index) => index}
              renderItem={({item}) =>
              <View style={styles.container}>
                <Card
                  image={{uri:item.picture}}>
                  <Text>
                    {item.description}
                  </Text>
                </Card>
              </View>}  
            />
            </View>
            } 
          </View>                   

          {/* </Animated.View> */}
        </ScrollView>
        </KeyboardAvoidingView>
        {/* </View> */}
        {/* </Animated.View> */}
      </View>
    ); 
  }
} 

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  myButton: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 15,
    borderWidth:2,
    backgroundColor: colors.background,
    borderColor:colors.tabNavIconOn,
    borderRadius: 15

  },
  centeredDialog: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: '30%',
    backgroundColor: colors.background,
    borderWidth:2,
    borderColor: colors.tabNavIconOn,
    borderRadius: 10
  },
  form: {
    flex: 1,
    justifyContent: 'space-between',
  },

});

export default TabPortfolioServiceProvider;