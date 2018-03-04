import React from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import defaultStyles from '../../src/styles/default';
import colors from '../styles/color';
import { FormLabel, FormInput, Button, CheckBox } from 'react-native-elements';

class TabPortfolioServiceProvider extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
            <Text style={defaultStyles.text}>Open up App.js to start working on your app!</Text>
            <Text style={defaultStyles.text}>Changes you make will automatically reload!!</Text>
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

export default TabPortfolioServiceProvider;