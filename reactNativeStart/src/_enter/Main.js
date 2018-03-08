import React from 'react';
import { LogIn } from '../routing/router';
import { StyleSheet, View, Platform, StatusBar, StatusBarIOS } from 'react-native';
import NavigatorService from '../services/navigator';

// Styles
import defaultStyles from '../styles/default';
import colors from '../styles/color';

class Main extends React.Component {
  render() {
    return (
        <View style={[styles.container, {backgroundColor: colors.background}]}>
            <LogIn ref={navigatorRef => {
                    NavigatorService.setContainer(navigatorRef); 
                    }} />
        </View> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      ios: {
        paddingTop: StatusBarIOS.currentHeight ? StatusBarIOS.currentHeight : 22,
      },
      android: {
        paddingTop: StatusBar.currentHeight
      },
    }),
  }
});

export default Main;