import React from 'react';
import { Text, StyleSheet, View, ScrollView, TextInput, FlatList } from 'react-native';
import { Divider, Avatar, List, ListItem, Header, Card } from 'react-native-elements';
import defaultStyles from '../../src/styles/default';
import colors from '../styles/color';
import firebase from 'firebase';

class OrderPage extends React.Component {
    constructor(props) {
      super(props);
      //this.state = { pastOrdersArray: [], chefsArray: [], user: {uid: 'null'}};
      // this.user = null;
    }

    /*componentDidMount() {
        this.unsubscribe = firebase.auth().onAuthStateChanged( user => {
          if (user) {
            // this.user = user;
            this.setState({ user: user });
    
            const rootRef = firebase.database().ref().child("users");
            const infoRef = rootRef.child('info');
            const userRef = infoRef.child(user.uid);
            const pastOrders = userRef.child('pastOrders');
            //const filterData = infoRef.orderByChild("isAccountTypeClient").equalTo(false).limitToLast(100);
            const chefs = infoRef.orderByChild("isAccountTypeClient").equalTo(false).limitToLast(100);
    
            pastOrders.once('value')
            .then((snapshot) => {
              let ordersTemp = [];
              //var pictures = [];
              // if (snapshot.val()) {
                snapshot.forEach((item) => {
                  // console.log(child.key, child.val()); 
                  ordersTemp.push({
                    chefID: item.val().chef,
                    //chefname: infoRef.child(item.chefID).name,
                    cuisineName: item.val().cuisine,
                    priceAmount: item.val().price
                  });
                  /*pictures.push({
                  });
                });
                this.setState({ pastOrdersArray: ordersTemp });
              // }
            })
            .catch((error) => {
              this.setState({ status: error.message });
            })
          }
    
        });
      }*/
  
    render() {
      return (
        <View style={styles.container}>
        <Header
          //leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'Order1', style: {color: '#fff', fontSize: 30, fontStyle: "italic" }}}
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