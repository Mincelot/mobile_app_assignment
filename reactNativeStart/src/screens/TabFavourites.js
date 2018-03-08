import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import defaultStyles from '../../src/styles/default';
import colors from '../styles/color';

class TabFavourites extends React.Component {
  render() {
    return (
        <View style={[styles.container, {backgroundColor: colors.backgroundSecondary}]}>
          <Text style={defaultStyles.text}>TabFavourites Page!</Text>
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

export default TabFavourites;