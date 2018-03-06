import React from 'react';
import { Text, StyleSheet, View, ScrollView, TextInput, FlatList } from 'react-native';
import defaultStyles from '../../src/styles/default';
import colors from '../styles/color';
import { Card } from 'react-native-elements';
import firebase from 'firebase';
import TabPortfolioServiceProvider from './TabPortfolioServiceProvider';
// import { FlatList } from 'react-native-gesture-handler';

class MiddleManPortfolioServiceProvider extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TabPortfolioServiceProvider isEdit="true"></TabPortfolioServiceProvider>
      </View>
    ); 
  }
} 

const styles = StyleSheet.create({
  container: {
    flex: 1
  }

});

export default MiddleManPortfolioServiceProvider;