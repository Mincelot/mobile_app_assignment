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
    this.state = { favsArray: [], user: {uid: 'null'}};
  }
  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged( user => {
      if (user) {
        this.setState({ user: user });

        const rootRef = firebase.database().ref().child("users");
        const infoRef = rootRef.child('info');
        const userRef = infoRef.child(user.uid);
        const favourites = userRef.child('favourites');

        favourites.once('value')
        .then((snapshot) => {
          let favsTemp = [];
          snapshot.forEach((item) => {
            favsTemp.push({
              chefID: item.val().chef
            });
          });
          this.setState({ favsArray: favsTemp });
        })
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