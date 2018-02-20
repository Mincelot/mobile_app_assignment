import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import defaultStyles from '../../src/styles/default';
import colors from '../styles/color';

class Tab2 extends React.Component {
  render() {
    return (
        <View style={[styles.container, {backgroundColor: colors.backgroundSecondary}]}>
          <Text style={defaultStyles.text}>Open up App.js to start working on your app!</Text>
          <Text style={defaultStyles.text}>Changes you make will automatically reload!!</Text>
        </View>
    ); 
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }

});

export default Tab2;