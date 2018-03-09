import React from 'react';
import { Text, StyleSheet, View, ScrollView, TextInput, FlatList, TouchableHighlight } from 'react-native';
import defaultStyles from '../../src/styles/default';
import colors from '../styles/color';
import { Divider, Avatar, List, ListItem, Header, Card } from 'react-native-elements';
import NavigatorService from '../services/navigator';
import firebase from 'firebase';


const hypotheticalList = [
        {
          order: 'Order 1',
          picture: 'https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg',
          chef: 'Chef 1'
        },
        {
          order: 'Order 2',
          picture: 'https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg',
          chef: 'Chef 2'
        },
      ]

class TabPortfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pastOrdersArray: [], chefsArray: [], user: {uid: 'null'}};
    // this.user = null;
  }

  componentDidMount() {
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
              });*/
            });
            this.setState({ pastOrdersArray: ordersTemp });
          // }
        })
        chefs.once('value')
        .then((snapshot) => {
          let chefsTemp = [];
          //var pictures = [];
          // if (snapshot.val()) {
            snapshot.forEach((item) => {
              // console.log(child.key, child.val()); 
              chefsTemp.push({
                chefIDOfficial: item.val().uid,
                chefName: item.val().name
                //chefname: infoRef.child(item.chefID).name,
                //cuisineName: item.val().cuisine,
                //priceAmount: item.val().price
              });
              /*pictures.push({
              });*/
            });
            this.setState({ chefsArray: chefsTemp });
          // }
        })
        .catch((error) => {
          this.setState({ status: error.message });
        })
      }

    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onClickView() {
    NavigatorService.navigate('ViewPortfolio');
  }

  render() {
    return (
      <View style={styles.container}>
      <Header
        //leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'Past Orders', style: {color: '#fff', fontSize: 30, fontStyle: "italic" }}}
        //rightComponent={{ icon: 'home', color: '#fff' }}
        outerContainerStyles={{ backgroundColor: colors.tabNavBackground }}
        />
        <ScrollView>
          <View>
            
          <FlatList
            data={this.state.pastOrdersArray}
            keyExtractor={(item, index) => index}
            renderItem={ ({item}) =>
              <View style={styles.container}>
              <TouchableHighlight onPress={this.onClickView.bind(this)}>{
                <ListItem
                  /*image={{uri:"https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg"}}>
                  <Text h1>Chef: {item.chefID}</Text>
                  <Text h2>Price: {item.priceAmount}</Text>
                  <Text h3>Cuisine: {item.cuisineName}</Text>*/
                  large
                    roundAvatar
                    avatar={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg"}}
                    title={item.chefID}
                    subtitle={item.cuisineName}
                    />
              }
              </TouchableHighlight>
              </View>
            } 
          /> 
          </View>
        </ScrollView>
      </View>
    ); 
  }
} 

styles = StyleSheet.create({ 
  container: {
    flex: 1
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey'
  },
  font: {
    fontSize: 30
  },
  avatar: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 15,
    paddingRight: 5,
  }, 
  rowAlign: {
    flexDirection: 'row',
    // alignItems: 'flex-start',
    // justifyContent: 'flex-end'
  },
  border: {
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },
  bigText : {
    backgroundColor: colors.background,
    fontSize: 20,
    padding: 20,
    color: colors.text,
  }
})

export default TabPortfolio;