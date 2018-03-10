import React from 'react';
import { Text, StyleSheet, View, ScrollView, TextInput, FlatList,
   Modal, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import defaultStyles from '../../src/styles/default';
import colors from '../styles/color';
import { Card,Header, Icon, Button, FormInput } from 'react-native-elements';
import firebase from 'firebase';

class TabPortfolioServiceProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {picFolders: [], modalVisible: false, tempUrl: ''}; //folder has text + picUrl 
    this.isViewMode = this.props.isView ? true : false;
    // this.userid = this.props.userId
    this.user = null;
    this.userUidPassedIn = this.props.selectedUserUid;
    this.unsubscribe = null;
  }
  componentWillMount() {
    if (!this.isViewMode) {
      this.unsubscribe = firebase.auth().onAuthStateChanged( user => {
        if (user) {
          this.user = user;
          const rootRef = firebase.database().ref().child("users");
          const infoRef = rootRef.child('info');
          const userRef = infoRef.child(this.user.uid);
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

      });
    } else {
      this.user = user;
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
  
  onTextChange(item, returnText) {
    // this.setState({ testDescription: returnText });
    var tempPicFolders = this.state.picFolders;
    for (let i = 0; i < tempPicFolders.length; i++) {
      if (tempPicFolders[i] == item) {
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

  uploadPicture(){
    this.setState({ modalVisible: false ,picFolders: [...this.state.picFolders,{ picture: this.state.tempUrl, description: ''} ]}, () => {
      this.setState({ tempUrl : '' });
    });   
  }

  setModalVisible() {
    this.setState({modalVisible: false});
  }

  render() {
    return (
      <View style={styles.container}>
      <Text>{this.isViewMode ? 'TEST22' : 'Yes'}</Text>
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
            {this.isViewMode && //view mode false = chef user 
          <Header
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
                    <TextInput
                      style={{height: 40}}
                      placeholder="Description..."
                      value={item.description} //original text 
                      //returnText is the new one, and we assign it back to item.description
                      onChangeText={this.onTextChange.bind(this, item)}
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
              <View style={{height: '100%', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                <View style={styles.centeredDialog}>
                  <Text style={[styles.labelText, {fontSize: 14}]}>Please enter the direct link of your picture:</Text>
                  <FormInput
                    placeholder='Tap here to edit'
                    value={this.state.tempUrl ? this.state.tempUrl : ''}
                    onChangeText={(newUrl) => this.setState({ tempUrl: newUrl })}
                  >
                  </FormInput>
                  <View style={[{display: 'flex'}, {flexDirection: 'row'}, {justifyContent: 'space-between'}]}>
                  <TouchableOpacity
                      style={[styles.myButton]}
                      onPress={this.uploadPicture.bind(this)}>
                      <Text style={{color: '#7E8F7C'}}> Confirm </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={styles.myButton}
                      onPress={this.setModalVisible.bind(this)}>
                      <Text style={{color: '#7E8F7C'}}> Cancel </Text>
                  </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
            }
            </View>
          <View>     
            {this.isViewMode && //view mode false = chef user  
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
    alignItems: 'center',
    padding: 10,
    borderWidth:2,
    backgroundColor:"#FDF3E7",
    borderColor:"#f3753f",
    borderRadius: 15

  },
  centeredDialog: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: '30%',
    backgroundColor: '#FDF3E7',
    borderWidth:2,
    borderColor:"#f3753f",
    borderRadius: 10
  },
  form: {
    flex: 1,
    justifyContent: 'space-between',
  },

});

export default TabPortfolioServiceProvider;