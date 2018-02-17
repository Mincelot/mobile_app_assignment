import React from 'react';
import { Text, View, FlatList, ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import defaultStyles from '../../src/styles/default';
import colors from '../styles/color';
import Header from '../components/Header';


const mockData1 = require('../data/data1');



class Tab3 extends React.Component {
  buttonPress() {
    
  }
  render() {
    return (
      <View style={styles.container}>
        <Header text="External Libraries listed below used in project. Also testing scrollview collision with navbar bellow">
        </Header>
        <Button
            title='Buttom Example'
            textStyle={defaultStyles.buttonText}
            buttonStyle={defaultStyles.buttonFace}
        />
        <ScrollView>
          <View style={[{backgroundColor: colors.backgroundSecondary}, styles.list]}>
            <FlatList
              data={mockData1.mockData1}
              renderItem={({item}) => <Text style={[styles.bigText, defaultStyles.marginSides]}>{item.key}</Text>}
            />
          </View>
        </ScrollView>
      </View>
    ); 
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    marginBottom: 10
  },
  bigText : {
    backgroundColor: colors.background,
    fontSize: 30,
    padding: 20,
    color: colors.text,
    marginBottom: 1,
    borderBottomColor: 'black',
    borderBottomWidth: 1
  }

});

export default Tab3;