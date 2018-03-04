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
      <View style={styles.container}>
        <ScrollView>
        <List>
          {
            hypotheticalList.map((key, value) => (
              <ListItem
                key={value}
                large
                roundAvatar
                avatar={{uri:key.picture}}
                title={key.order}
                subtitle={key.chef}
              />
            ))
          }
        </List>
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


export default TabPortfolio;