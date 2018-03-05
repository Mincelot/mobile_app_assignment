import React from 'react';
import { Text, StyleSheet, View, ScrollView, TextInput, FlatList } from 'react-native';
import defaultStyles from '../../src/styles/default';
import colors from '../styles/color';
import { Card } from 'react-native-elements';
import firebase from 'firebase';
// import { FlatList } from 'react-native-gesture-handler';

class TabPortfolioServiceProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {picFolders: [] }; //folder has text + picUrl 
    this.user = null;
  }
  componentWillMount() {
    firebase.auth().onAuthStateChanged( user => {
      if (user) {
        this.user = user;
        const rootRef = firebase.database().ref().child("users");
        const infoRef = rootRef.child('info');
        const userRef = infoRef.child(this.user.uid);
        const picRef = userRef.child('picFolder');
        
        picRef.once('value')

        .then((snapshot) => {
          var picTemp = [];
          if (snapshot.val()){
            snapshot.forEach((item) => {
              // console.log(child.key, child.val()); 
              picTemp.push({
                text: item.val().text,
                picture: item.val().picUrl
              });
            });
            this.setState({ picFolders: picTemp});
          }
        })
        .catch((error) => {
          this.setState({ status: error.message });
        })
      }

    });
  }
  onTextChange(returnText, item){
    var tempPicFolders = this.state.picFolders;
    for(var i=0; i<tempPicFolders.length; i++ ){
      if(tempPicFolders[i] == item){
          tempPicFolders[i].text = returnText;
      }
    }
    this.state.picFolders = tempPicFolders;
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView> 
          <FlatList
            data={this.state.picFolders}
            keyExtractor={(item, index) => index}
            renderItem={({item}) =>
            <Card
              image={{uri:item.picture}}>
              <TextInput
                style={{height: 40}}
                placeholder="Description..."
                value={item.text} //original text 
                //returnText is the new one, and we assign it back to item.text
                onChangeText={this.onTextChange(item)}
              />
            </Card>} 
          />           
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