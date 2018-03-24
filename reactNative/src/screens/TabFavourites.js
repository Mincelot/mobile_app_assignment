import React from 'react';
import { Text, StyleSheet, View, ScrollView, TextInput, FlatList, TouchableHighlight, Modal } from 'react-native';
import defaultStyles from '../../src/styles/default';
import colors from '../styles/color';
import { Divider, Avatar, List, ListItem, Header, Card, PricingCard,Button } from 'react-native-elements';
import NavigatorService from '../services/navigator';
import firebase from 'firebase';

class TabFavourites extends React.Component {
  constructor(props){
    super(props);
    this.state = { favsArray: [], user: {uid: 'null'}, status: ''};
  }
  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged( user => {
      if (user) {
        this.setState({ user: user });

        const rootRef = firebase.database().ref().child("users");
        const infoRef = rootRef.child('info');
        const userRef = infoRef.child(user.uid);
        const favourites = userRef.child('favourites');
        // Retrieve the favourite list for the user
        let favIDsTemp = [];
        favourites.once('value')
        .then((snapshot) => {
          snapshot.forEach((item) => {
            favIDsTemp.push({
              favID: item.val().favID
            });
          });
        })
        .catch((error) => {
          this.setState({ status: error.message });
        })

          // For each id that is stored in a user's favourite, find the corresponding name and email for that user
        let favTemp = [];
        favIDsTemp.forEach((favID) => {
          let chefRef = info.Ref.child(favID);
          chefRef.once('value')
          .then((snapshot) => {
            if (snapshot.val() && snapshot.val().name && snapshot.val().email) {
              favTemp.push({
                chefID: favID,
                name: snapshot.val().name,
                email: snapshot.val().email
              })
            }
          })
          .catch((error) => {
            this.setState({ status: error.message });
          })
        })

        this.setState({ favsArray: favTemp });
      }
      

    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    return (
        <View style={[styles.container, {backgroundColor: colors.backgroundSecondary}]}>
          <Header
            centerComponent={{ text: 'Favourites', style: {color: '#fff', fontSize: 30, fontStyle: "italic" }}}
            outerContainerStyles={{ backgroundColor: colors.tabNavBackground }}
          />

          <ScrollView>
          <FlatList
                data={this.state.favsArray}
                keyExtractor={(item, index) => index}
                renderItem={({item}) =>
                <TouchableHighlight onPress={this.onClickView.bind(this, item)}>
                  <ListItem
                    large
                    roundAvatar
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