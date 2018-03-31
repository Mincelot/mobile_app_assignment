import React from 'react';
//import Header from '../components/Header';
import { StyleSheet, View, Alert, Text, FlatList, ScrollView, Image } from 'react-native';
import colors from '../styles/color';
import defaultStyles from '../../src/styles/default';
import { NavigationActions } from "react-navigation";
import { Header, Icon, Button, ListItem, Card, List, Divider } from 'react-native-elements';
import firebase from 'firebase';
import NavigatorService from '../services/navigator';
import { connect } from 'react-redux';


const users = [
 {
    name: 'brynn',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
 },
 {
     name: 'lola',
     avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
  }

]


class ReviewPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {reviews: []};
        if (this.props && this.props.navigation && this.props.navigation.state && this.props.navigation.state.params) {
          // this.isViewMode = this.props.navigation.state.params.isView ? true : false;
          this.userUidPassedIn = this.props.navigation.state.params.selectedUserUid;
          this.loggedInClient = this.props.navigation.state.params.loggedInClient;
        }
        this.unsubscribe = null;
        this.user = null;
      }

    componentDidMount() {
        this.unsubscribe = firebase.auth().onAuthStateChanged( user => {
          if (user) {
            this.setState({ user: user });
            //this.getClientName(user.uid);

            const rootRef = firebase.database().ref().child("users");
            const infoRef = rootRef.child('info');
            const userRef = infoRef.child(this.userUidPassedIn);
            const reviews = userRef.child('reviews');
            //const chefs = infoRef.orderByChild("isAccountTypeClient").equalTo(false).limitToLast(100);
            //alert(reviews);
            reviews.once('value')
            .then((snapshot) => {
              let reviewsTemp = [];
                snapshot.forEach((item) => {
                  reviewsTemp.push({
                    date: item.val().date,
                    review: item.val().review,
                    reviewer: item.val().reviewer
                  });
                });
                this.setState({ reviews: reviewsTemp });
            })
            .catch((error) => {
              this.setState({ status: error.message });
            })

            //alert(this.state.reviews[0]);

          }


        });
      }

    backButton() {
        this.props.navigation.dispatch(NavigationActions.back());
     }


    // Gets Chef info based on uid
   /* getChefReview(chefID) {
        const rootRef = firebase.database().ref().child("users");
        const infoRef = rootRef.child('info');
        const chefRef = infoRef.child(chefID);
        const chefName = chefRef.child('name');

        var chefsActualName = '';

        chefName.once('value')
        .then((snapshot) => {
          if  (snapshot.val()) {
            chefsActualName = snapshot.val();
            this.setState({chef_name: chefsActualName});
          }
        })
    }*/

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
           <ScrollView>
               <FlatList
                data={this.state.reviews}
                extraData={this.state}
                keyExtractor={(item, index) => index}
                renderItem={({item}) =>
                    <Card style={{card: {backgroundColor: '#696969'}}}>
                      <View style={{padding: 10 }}>
                      <Text style={{color: colors.navyBlue}}>{item.review}</Text>
                      </View>
                      <Divider/>
                      <View style={{padding: 10 }}>
                      <Text style={{color: colors.tabNavBackground}}>{item.date}</Text>
                      <Text style={{color: colors.tabNavBackground}}>by {item.reviewer}</Text>
                      </View>
                    </Card>}
               />
           </ScrollView>
       </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingBottom: 15
    }
});

export default ReviewPage;