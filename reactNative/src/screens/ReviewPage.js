import React from 'react';
import Header from '../components/Header';
import { StyleSheet, View, Alert } from 'react-native';
import colors from '../styles/color';
import { NavigationActions } from "react-navigation";
import NavigatorService from '../services/navigator';
import { connect } from 'react-redux';

class ReviewPage extends React.Component {
  render() {
    return (
        <View style={styles.container}>
          <Text>hello</Text>
        </View>
    ); 
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background
    }
});

export default ReviewPage;