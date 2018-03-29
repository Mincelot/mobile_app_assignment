import React from 'react';
import Header from '../components/Header';
import { StyleSheet, View } from 'react-native';
import colors from '../styles/color';

class MessageForm extends React.Component {
  render() {
    return (
        <View style={styles.container}>
           
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

export default MessageForm;