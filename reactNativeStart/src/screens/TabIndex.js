import React from 'react';
import Header from '../components/Header';
import { StyleSheet, View } from 'react-native';
import { Root } from '../routing/tabRouter';
import colors from '../styles/color';

class TabIndex extends React.Component {
  render() {
    return (
        <View style={styles.container}>
            <Root />
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

export default TabIndex;