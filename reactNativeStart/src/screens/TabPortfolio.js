
import React from 'react';
import { Text, StyleSheet, View, ScrollView, TextInput, FlatList, TouchableHighlight, } from 'react-native';
import defaultStyles from '../../src/styles/default';
import colors from '../styles/color';
import { Divider, Avatar, List, ListItem, Header, Card } from 'react-native-elements';
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
    this.state = { searchParam : '', data: [], selectedService: 'All', status: '' };
    this.dataBackup = [];
  }
  componentDidMount() {
      const rootRef = firebase.database().ref().child("users");
      const infoRef = rootRef.child('info');
      const filterData = infoRef.orderByChild("isAccountTypeClient").equalTo(true).limitToLast(100);
      filterData.once('value')
      .then((snapshot) => {
        var dataTemp = [];
        snapshot.forEach((item) => {
          dataTemp.push({
            name: item.val().name,
            email: item.val().email
          });
        });
        this.dataBackup = dataTemp;
        this.setState({ data: dataTemp });
      })
      .catch((error) => {
        this.setState({ status: error.message });
      })
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
          <List containerStyle={{marginBottom: 20}}>
            {
              hypotheticalList.map((l, i) => (
                <ListItem
                  roundAvatar
                  avatar={{uri:"https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg"}}
                  key={i}
                  title={l.name}
                />
              ))
            }
          </List>

          <FlatList
                data={this.state.data}
                keyExtractor={(item, index) => index}
                renderItem={({item}) =>
                //<TouchableHighlight onPress={this.onClickView.bind(this)}>
                /*{ <View style={[styles.border, styles.rowAlign]}>
                    <View style={styles.avatar}>
                      <Avatar
                        large
                        rounded
                        source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg"}}
                        activeOpacity={0.7}
                      />
                    </View>
                    <View style={{flex: 1, flexWrap: 'wrap'}}>
                      <Text style={[styles.bigText]}>Name: {item.name}</Text>
                      <Text style={[styles.bigText]}>Speciality:</Text>
                      <Text style={[styles.bigText]}>Email: {item.email}</Text>
                    </View>
                  </View> }*/
                  <ListItem
                    large
                    roundAvatar
                    avatar={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg"}}
                    title={item.name}
                    subtitle={item.email}
                  />
                //</TouchableHighlight>
                }
              />
          <Card
            image={{uri:"https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg"}}>
            <Text h1>Chef:</Text>
            <Text h2>Price:</Text>
            <Text h3>Cuisine:</Text>

          </Card>
          <FlatList

          data={this.state.pastOrdersArray}
          keyExtractor={(item, index) => index}
          renderItem={({item}) =>
          
          <Card
            image={{uri:"https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg"}}>
            <Text h1>Chef: {item.chefID}</Text>
            <Text h2>Price: {item.priceAmount}</Text>
            <Text h3>Cuisine: {item.cuisineName}</Text>

          </Card>} 
          /> 
        
        </ScrollView>
      </View>
    ); 
  }
} 

styles = StyleSheet.create({
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
  container: {
    flex: 1
  },
  bigText : {
    backgroundColor: colors.background,
    fontSize: 20,
    padding: 20,
    color: colors.text,
  }
})

export default TabPortfolio;