import React from 'react';
import { Text, StyleSheet, View, ScrollView, TextInput, FlatList } from 'react-native';
import defaultStyles from '../../src/styles/default';
import colors from '../styles/color';
import { Card } from 'react-native-elements';
import { Divider, Avatar, List, ListItem } from 'react-native-elements';


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
    this.state = { text: ''};
  }
  render() {
    return (
      <View style={styles.conatiner}>
        <ScrollView>
        <View style={[{backgroundColor: colors.backgroundSecondary}, styles.list]}>
          <List containerStyle={{marginBottom: 300}}>
          {
            hypotheticalList.map((key, value) => (
              <View style={[styles.border, styles.rowAlign]}>
                    <View style={styles.avatar}>
                      <Avatar
                        large
                        source={{uri:key.picture}}
                        activeOpacity={0.7}
                      />
                    </View>
                    <View style={{flex: 1, flexWrap: 'wrap'}}>
                      <Text style={[styles.bigText]}>Name: {key.order}</Text>
                      <Text style={[styles.bigText]}>Chef: {key.chef}</Text>
                      <Text style={[styles.bigText]}>Price:</Text>
                    </View>
              </View>

              /*<ListItem style={styles.avatar}
                key={value}
                  large
                  avatar={{uri:key.picture}}
                title={key.order}
                subtitle={
                  <View style={styles.subtitleView}>
                    <Text style={styles.font}>{key.chef}</Text>
                  </View>
                }        
              />*/
            ))
          }
          </List>
        </View>
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