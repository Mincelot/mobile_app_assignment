import React from 'react';
import { Text, View, FlatList, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';
import { Button, ButtonGroup, ListItem } from 'react-native-elements';
import defaultStyles from '../../src/styles/default';
import colors from '../styles/color';
import firebase from 'firebase';
import { NavigationActions } from "react-navigation";

class TabMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = { msgData: [], requestData: [], isViewMsg: true, selectedIndex: 0 };
    this.dataBackup = [];
    this.dataBackupRequests = [];
  }
  onChangeView(selectedIndex) {
    this.setState({selectedIndex});
    if (selectedIndex == 0) {
        this.setState({ isViewMsg: true });
    }
    else if (selectedIndex == 1) {
        this.setState({ isViewMsg: false });
    }
  }
  loadNameForRequests() {
    this.counter = 0;
    for (let i = 0; i < this.dataBackupRequests.length; i++) {
      const rootRef = firebase.database().ref().child("users");
      const infoRef = rootRef.child('info');
      const userRef = infoRef.child(this.dataBackupRequests[i].uid);

      userRef.once('value')
        .then((snapshot) => {
          if (snapshot.val()) {
            // this.setState({ name: snapshot.val().name, tempName: snapshot.val().name });
            // var dataTemp = [];
            // snapshot.forEach((item) => {
              // dataTemp.push({
            this.dataBackupRequests[i].name = snapshot.val().name;
            this.counter++;
            if (this.counter == this.dataBackupRequests.length) {
              this.loadFinalDest();
            }
          }
        })
        .catch((error) => {
          this.counter++;
          if (this.counter == this.dataBackupRequests.length) {
            this.loadFinalDest();
          }
        })
    }
  }
  loadFinalDest() {
    // filter into two lists based on if approved.
    let requestList = [];
    let msgList = [];
    for (let i = 0; i < this.dataBackupRequests.length; i++) {
      if (this.dataBackupRequests[i].approval) {
        msgList.push(this.dataBackupRequests[i]);
      } else {
        requestList.push(this.dataBackupRequests[i]);
      }
    }
    this.setState({ requestData: requestList, msgData: msgList });
  }
  loadImages() {
    this.counter2 = 0;
    for (let t = 0; t < this.dataBackupRequests.length; t++) {
      const rootRefStorage = firebase.storage().ref('Data');
      const userRefStorage = rootRefStorage.child(this.dataBackupRequests[t].uid);
      const profilePicRefStorage = userRefStorage.child('ProfilePictures');
      const imageRefStorage = profilePicRefStorage.child('profilePic');
      imageRefStorage.getDownloadURL()
      .then((url) => {
        this.counter2++;
        this.dataBackupRequests[t].portfolioUri = url;
        if (this.counter2 == this.dataBackupRequests.length) {
          this.loadFinalDest();
        }
      })
      .catch((error) => {
        this.counter2++;
        if (this.counter2 == this.dataBackupRequests.length) {
          this.loadFinalDest();
        }
      });
    }
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged( user => {
      if (user) {
        this.user = user;

        const rootRef = firebase.database().ref().child("users");
        const infoRef = rootRef.child('info');
        const userRef = infoRef.child(user.uid);
        const requestRef = userRef.child('requests');
        // const picRef = userRef.child('picFolder');

        requestRef.on('value', (snapshot) => {
        // .then((snapshot) => {
          if (snapshot.val()) {
            // this.setState({ name: snapshot.val().name, tempName: snapshot.val().name });
            var dataTemp = [];
            snapshot.forEach((item) => {
              dataTemp.push({
                uid: item.key,
                dateRequest: item.val().requestDate,
                name: '',
                approval: item.val().approval,
                isMsgKeeper: item.val().isMsgKeeper,
                portfolioUri: ''
              });
            });
            this.dataBackupRequests = dataTemp;
            this.loadImages();
            this.loadNameForRequests();
            
            // this.setState({ msgData: dataTemp });
            // this.setState({ requestData: dataTemp });
          }
        })
      }

    });
  }
  acceptRequest(item) {
    const rootRef = firebase.database().ref().child("users");
    const infoRef = rootRef.child('info');
    const uidRef = infoRef.child(this.user.uid);
    const requestRef = uidRef.child('requests');
    const requestUserRef = requestRef.child(item.uid);
    requestUserRef.update({
      approval: true
    })
    .then((userReturn) => {
    })
    .catch((error) => {
    })


    let requestList = this.state.requestData;
    let msgList = this.state.msgData;
    for (let i = 0; i < requestList.length; i++) {
      if (requestList[i].uid == item.uid) {
        requestList.splice(i, 1);
      }
    }
    msgList.push(item);
    this.setState({ requestData: requestList, msgData: msgList });
  }
  onOpenMsg(item) {
    // this.props.navigation.dispatch(NavigationActions.back());

    // var tempData = this.state.data;
    // let selectedUserUid = '';
    // for (let i = 0; i < tempData.length; i++) {
    //   if (tempData[i].uid == item.uid) {
    //     selectedUserUid = tempData[i].uid;
    //   }
    // }

    this.props.navigation.dispatch({ type: 'ViewConversation',
     selectedUserUid: item.uid, isMsgKeeper: item.isMsgKeeper == true });
  }
  render() {
    return (
      <View style={styles.container}>
        <ButtonGroup
            onPress={this.onChangeView.bind(this)}
            selectedIndex={this.state.selectedIndex}
            buttons={['Messages', 'Requests']}
            disableSelected= {true}
            containerStyle={{ height: 60, backgroundColor:'white' }}
            selectedButtonStyle={{ backgroundColor: colors.navyBlue }}
            selectedTextStyle={{ color: 'white' }}
            />
            <View style={styles.boxAround}>
              <ScrollView>
                <View>
                  {this.state.isViewMsg && 
                    <View>
                      <FlatList
                        data={this.state.msgData}
                        extraData={this.state}
                        keyExtractor={(item, index) => index}
                        renderItem={({item}) =>
                        <TouchableHighlight onPress={this.onOpenMsg.bind(this, item)}>
                          <ListItem
                            large
                            roundAvatar
                            avatar={item.portfolioUri != '' ? {uri: item.portfolioUri} : {}}
                            title={item.name}
                            // subtitle={item.isMsgKeeper == true ? 'true' : 'false'}
                          />
                        </TouchableHighlight>
                        }
                      />
                    </View>
                  }
                  {!this.state.isViewMsg &&
                    <View>
                        <FlatList
                          data={this.state.requestData}
                          extraData={this.state}
                          keyExtractor={(item, index) => index}
                          renderItem={({item}) =>
                          <TouchableHighlight onPress={this.acceptRequest.bind(this, item)}>
                            <ListItem
                              large
                              roundAvatar
                              avatar={item.portfolioUri != '' ? {uri: item.portfolioUri} : {}}
                              title={item.name}
                              subtitle={item.dateRequest}
                            />
                          </TouchableHighlight>
                          }
                        />
                    </View>
                  }
                </View>
              </ScrollView>
          </View>
      </View>
    ); 
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  boxAround: {
    margin: 10,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  }


});

export default TabMessages;