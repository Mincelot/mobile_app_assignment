import React from 'react';
import { Text, StyleSheet, View, ScrollView, TextInput, FlatList, TouchableHighlight, Modal } from 'react-native';
import defaultStyles from '../../src/styles/default';
import colors from '../styles/color';
import { Divider, Avatar, List, ListItem, Header, Card, PricingCard } from 'react-native-elements';
import NavigatorService from '../services/navigator';
import firebase from 'firebase';

class TabPortfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pastOrdersArray: [], chefsArray: [], user: {uid: 'null'}, modalVisible: false, 
    chef: '', cuisine: '' , date: '', price: '',chef_name: ''};
    this.user = null;
  }

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged( user => {
      if (user) {
        this.setState({ user: user });

        const rootRef = firebase.database().ref().child("users");
        const infoRef = rootRef.child('info');
        const userRef = infoRef.child(user.uid);
        const pastOrders = userRef.child('pastOrders');
        const chefs = infoRef.orderByChild("isAccountTypeClient").equalTo(false).limitToLast(100);

        pastOrders.once('value')
        .then((snapshot) => {
          let ordersTemp = [];
            snapshot.forEach((item) => {
              ordersTemp.push({
                chefID: item.val().chef,
                cuisineName: item.val().cuisine,
                orderDate: item.val().date,
                priceAmount: item.val().price

              });
            });
            this.setState({ pastOrdersArray: ordersTemp });
        })

        chefs.once('value')
        .then((snapshot) => {
          let chefsTemp = [];
            snapshot.forEach((item) => {
              chefsTemp.push({
                chefIDOfficial: item.val().uid,
                chefName: item.val().name
              });
            });
            this.setState({ chefsArray: chefsTemp });
        })
        .catch((error) => {
          this.setState({ status: error.message });
        })
      }
      

    });
  }
// Gets Chef info based on uid 
  getChefName(chefID) {
    const rootRef = firebase.database().ref().child("users");
    const infoRef = rootRef.child('info');
    const chefRef = infoRef.child(chefID);
    const chefName = chefRef.child('name');
    
    var chefsActualName = '';

    chefName.once('value')
    .then((snapshot) => {
      if  (snapshot.val()) {
        chefsActualName = snapshot.val();
        this.setState({chef_name: chefsActualName});
      }
    })
  }

  setModalVisible(visible, chefUID, cuisineInfo, dateInfo, priceInfo) {
    this.setState({modalVisible: visible, chef: chefUID, cuisine: cuisineInfo, date: dateInfo, price: priceInfo});
  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  // Should send be able to click on chef name and send to portfolio
  onClickView() {
    NavigatorService.navigate('ViewPortfolio');
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
        centerComponent={{ text: 'Past Orders', style: {color: '#fff', fontSize: 30, fontStyle: "italic" }}}
        outerContainerStyles={{ backgroundColor: colors.tabNavBackground }}
        />

        <ScrollView>
          <View>
            <Modal
              animationType="fade"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                alert('Modal has been closed.');
              }}>
              <View style={{marginTop: 22, height: '100%', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                <View style={styles.centeredModal}>
                  <PricingCard
                    color= {colors.tabNavBackground}
                    containerStyle= {styles.containerBorder}
                    title={this.state.date}
                    price={this.state.price}
                    info={[this.state.cuisine + ' cuisine','With ' + this.state.chef_name]}
                    button={{ title: 'See All Orders', icon: 'format-align-justify' }}
                    onButtonPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}
                  />
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
                    this.getChefName(item.chefID);
                    }}
                  >{
                    <ListItem
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
  },
  centeredModal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: '20%',
  }, 
  containerBorder: {
    borderRadius: 10
  }
})

export default TabPortfolio;