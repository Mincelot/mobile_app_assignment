import React from 'react';
import { Text, StyleSheet, View, ScrollView, TextInput, FlatList, TouchableHighlight, Modal } from 'react-native';
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
    this.state = { pastOrdersArray: [], chefsArray: [], user: {uid: 'null'}, modalVisible: false, 
    chef: {uid: 'null'}, cuisine: {cuisine: 'null' }, date: {date: 'null' }, price: {price: 'null'},
    chef_name: {name: 'null'}};
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
                //chefInfo: infoRef.child(item.chefID),
                //chefName: chefInfo.val().name,
                cuisineName: item.val().cuisine,
                orderDate: item.val().date,
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

  setModalVisible(visible, chefUID, cuisineInfo, dateInfo, priceInfo) {
    this.setState({modalVisible: visible, chef: chefUID, cuisine: cuisineInfo, date: dateInfo, price: priceInfo});
  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  onClickView() {
    NavigatorService.navigate('ViewOrder');
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
          <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
            <Header
              leftComponent={{ icon: 'menu', color: '#fff' }}
              centerComponent={{ text: 'Order', style: {color: '#fff', fontSize: 30, fontStyle: "italic" }}}
              //rightComponent={{ icon: 'home', color: '#fff' }}
              outerContainerStyles={{ backgroundColor: colors.tabNavBackground }}
              />
              <View style={[styles.center, styles.paddingImage]}>
              <Avatar
                xlarge
                containerStyle={[styles.center, styles.paddingImage]}
                source={{uri: "https://i.imgur.com/bE4jFyr.jpg"}}
                activeOpacity={0.7}
              />
              </View>
              
              <View style={[styles.center, styles.paddingImage]}>
                <Text>35$ {this.state.price}</Text>
                <Text>Jan 1st 2018 {this.state.date}</Text>
                <Text>Guy 123 {this.state.chef}</Text>
                <Text> {this.state.cuisine}</Text>
              </View>
              
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Back</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
          <FlatList
            data={this.state.pastOrdersArray}
            keyExtractor={(item, index) => index}
            renderItem={ ({item}) =>
            
              <View style={styles.container}>
              <TouchableHighlight onPress={() => {
                this.setModalVisible(true, item.chefID, item.cuisineName, item.orderDate, item.priceAmount);
              }}
              /*onPress={this.onClickView.bind(this)}*/ >{
                <ListItem
                  /*image={{uri:"https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg"}}>
                  <Text h1>Chef: {item.chefID}</Text>
                  <Text h2>Price: {item.priceAmount}</Text>
                  <Text h3>Cuisine: {item.cuisineName}</Text>*/
                  //large
                    //roundAvatar
                    //avatar={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg"}}
                    title={item.orderDate}
                    subtitle={item.priceAmount}
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
  }, center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  paddingImage: {
    paddingTop: 30,
    paddingBottom: 5
  },
  bigText : {
    backgroundColor: colors.background,
    fontSize: 20,
    padding: 20,
    color: colors.text,
  }
})

export default TabPortfolio;