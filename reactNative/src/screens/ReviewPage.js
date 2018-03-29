import React from 'react';
//import Header from '../components/Header';
import { StyleSheet, View, Alert, Text } from 'react-native';
import colors from '../styles/color';
import defaultStyles from '../../src/styles/default';
import { NavigationActions } from "react-navigation";
import { Header, Icon, Button} from 'react-native-elements';
import firebase from 'firebase';
import NavigatorService from '../services/navigator';
import { connect } from 'react-redux';

class ReviewPage extends React.Component {

backButton() {
    this.props.navigation.dispatch(NavigationActions.back());
  }

  render() {
    return (
        <View style={styles.container}>
        <Header
         leftComponent={<Icon
           name='arrow-back'
           color='#fff'
           size={40}
           onPress={this.backButton.bind(this)}
         />}
         centerComponent={{ text: 'Reviews', style: { color: '#fff', fontSize: 30, fontStyle: "italic" } }}
         outerContainerStyles={{ backgroundColor: colors.tabNavBackground }}
       />
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