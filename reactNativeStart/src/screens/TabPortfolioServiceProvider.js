import React from 'react';
import { Text, StyleSheet, View, ScrollView, TextInput } from 'react-native';
import defaultStyles from '../../src/styles/default';
import colors from '../styles/color';
import { Card } from 'react-native-elements';

class TabPortfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: ''};
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
        <Card
          image={{uri:"https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg"}}>
          <TextInput
            style={{height: 40}}
            placeholder="Description.."
            onChangeText={(text) => this.setState({text})}
          />
        </Card>
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