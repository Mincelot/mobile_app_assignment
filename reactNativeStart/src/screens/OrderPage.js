import React from 'react';
import { Text, StyleSheet, View, ScrollView, TextInput, FlatList } from 'react-native';
import defaultStyles from '../../src/styles/default';
import colors from '../styles/color';
import { Card } from 'react-native-elements';
import firebase from 'firebase';

class OrderPage extends React.Component {
    constructor(props) {
      super(props);
      //this.state = { pastOrdersArray: [], chefsArray: [], user: {uid: 'null'}};
      // this.user = null;
    }
  
    render() {
      return (
        <View>
        <Header
          //leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'Past Orders', style: {color: '#fff', fontSize: 30, fontStyle: "italic" }}}
          //rightComponent={{ icon: 'home', color: '#fff' }}
          outerContainerStyles={{ backgroundColor: colors.tabNavBackground }}
          />
         
        </View>
      ); 
    }
  } 
const styles = StyleSheet.create({
  container: {
    flex: 1
  }

});

export default OrderPage;