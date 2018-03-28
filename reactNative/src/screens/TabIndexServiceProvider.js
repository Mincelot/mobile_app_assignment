import React from 'react';
import Header from '../components/Header';
import { StyleSheet, View } from 'react-native';
import { RootServiceProvider } from '../routing/tabRouterServiceProvider';
import colors from '../styles/color';
import firebase from 'firebase';

class TabIndexServiceProvider extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <View style={styles.container}>
          <RootServiceProvider />
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

export default TabIndexServiceProvider;