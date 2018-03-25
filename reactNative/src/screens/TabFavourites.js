import React from 'react';
import { Text, StyleSheet, View, ScrollView, TextInput, FlatList, TouchableHighlight, Modal, Alert } from 'react-native';
import defaultStyles from '../../src/styles/default';
import colors from '../styles/color';
import { Divider, Avatar, List, ListItem, Header, Card, PricingCard,Button } from 'react-native-elements';
import NavigatorService from '../services/navigator';
import firebase from 'firebase';

class TabFavourites extends React.Component {
  constructor(props){
    super(props);
    this.state = { favsArray: [], user: {uid: 'null'}};
    this.mounted = false;
  }
  componentDidMount() {
      firebase.auth().onAuthStateChanged( user => {
      if (user) {
        this.setState({ user: user}); 
      }
      

    });
    
    this.mounted = true;
  }
  componentWillUnmount(){
    this.mounted = false;
  }
  getListOfFav(){
      const rootRef = firebase.database().ref().child("users");
      const infoRef = rootRef.child('info');
      const userRef = infoRef.child(this.state.user.uid);
      const favourites = userRef.child('Favourites');
      // Retrieve the favourite list for the user
      let favIDsTemp = [];
      favourites.once('value')
      .then((snapshot) => {
        snapshot.forEach((item) => {
          favIDsTemp.push({
            favID: item.key,
            fav: item.val()
          });
        });
          // For each id that is stored in a user's favourite, find the corresponding name and email for that user
        let favTemp = [];
        let usersTemp = [];
        infoRef.once('value')
        .then((snapshot2) => {
          snapshot2.forEach((item) =>{
            usersTemp.push({
              uid: item.key,
              name: item.val().name,
              email: item.val().email
            })
          })

          for (i=0; i < usersTemp.length; i++){
            for (j=0; j < favIDsTemp.length; j++){
              if (usersTemp[i].uid == favIDsTemp[j].favID && favIDsTemp[j].fav){
                favTemp.push(usersTemp[i]);
              }
            }
          }
          if (this.mounted){
            this.setState({ favsArray: favTemp });  
          } 
        })
        .catch((error) => {
          Alert.alert(
            'Notification',
            error.message,
            [
              {text: 'OK', onPress: () => {}}
            ]
          )
        })
          
        })
        .catch((error) => {
          Alert.alert(
            'Notification',
            error.message,
            [
              {text: 'OK', onPress: () => {}}
            ]
          )
        })
  }
  onClickView(item){
    var tempData = this.state.favsArray;
    let selectedUserUid = '';
    for (let i = 0; i < tempData.length; i++) {
      if (tempData[i].uid == item.uid) {
        selectedUserUid = tempData[i].uid;
      }
    }
    // this.props.navigation.state
    this.props.navigation.dispatch({ type: 'ViewPortfolio', selectedUserUid: selectedUserUid });
  }
  render() {
    return (
        <View style={[styles.container, {backgroundColor: colors.backgroundSecondary}]}>
          <Header
            centerComponent={{ text: 'Favourites', style: {color: '#fff', fontSize: 30, fontStyle: "italic" }}}
            outerContainerStyles={{ backgroundColor: colors.tabNavBackground }}
          />
          {this.getListOfFav()}

          <ScrollView>
          <FlatList
                data={this.state.favsArray}
                keyExtractor={(item, index) => index}
                renderItem={({item}) =>
                <TouchableHighlight onPress={this.onClickView.bind(this, item)}>
                  <ListItem
                    large
                    title={item.name}
                    subtitle={item.email}
                  />
                </TouchableHighlight>
                }
              />
          </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }

});

export default TabFavourites;