import React from 'react';
import Header from '../components/Header';
import { Text, View, FlatList, ScrollView, StyleSheet, TouchableHighlight, Picker } from 'react-native';
import { FormLabel, FormInput, Button, Avatar, SearchBar, ListItem } from 'react-native-elements';
import NavigatorService from '../services/navigator';
import colors from '../styles/color';
import defaultStyles from '../../src/styles/default';
// import appConstants from '../constants/appConstants';
import firebase from 'firebase';

const mockData1 = require('../data/data1');

class TabSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchParam : '', data: [], dataBackup: [], selectedService: 'All', loading: false};
  }
  componentDidMount() {
      const rootRef = firebase.database().ref().child("users");
      const infoRef = rootRef.child('info');
      const filterData = infoRef.orderByChild("isAccountTypeClient").equalTo(false).limitToLast(100);
      filterData.once('value')
      .then((snapshot) => {
        var dataTemp = [];
        snapshot.forEach((item) => {
          // console.log(child.key, child.val()); 
          dataTemp.push({
            name: item.val().name,
            email: item.val().email
          });
          // console.log("intVal",this.intVal);
        });
        this.setState({ data: dataTemp, dataBackup: dataTemp });
      })
      .catch((error) => {
        this.setState({ status: error.message });
      })
  }
  onClearText() {

  }
  onChangeSelectedFilter(itemValue, itemIndex) {
    if (itemValue != this.state.selectedService) {
      if (itemValue != 'All') {
        // take new value, and search by it
        const rootRef = firebase.database().ref().child("users");
        const infoRef = rootRef.child('info');
        // const filterData = infoRef.orderByChild("isAccountTypeClient").equalTo(false).limitToLast(10);
        const filteredDataByServiceType = infoRef.orderByChild("serviceType").equalTo(itemValue);
        filteredDataByServiceType.once('value')
        .then((snapshot) => {
          var dataTemp = [];
          snapshot.forEach((item) => {
            // console.log(child.key, child.val()); 
            dataTemp.push({
              name: item.val().name,
              email: item.val().email
            });
            // console.log("intVal",this.intVal);
          });
          this.setState({ data: dataTemp });
        })
        .catch((error) => {
          this.setState({ status: error.message });
        })
      } else {
        const rootRef = firebase.database().ref().child("users");
        const infoRef = rootRef.child('info');
        const filterData = infoRef.orderByChild("isAccountTypeClient").equalTo(false).limitToLast(10);
        filterData.once('value')
        .then((snapshot) => {
          var dataTemp = [];
          snapshot.forEach((item) => {
            // console.log(child.key, child.val()); 
            dataTemp.push({
              name: item.val().name,
              email: item.val().email
            });
            // console.log("intVal",this.intVal);
          });
          this.setState({ data: dataTemp, dataBackup: dataTemp });
        })
        .catch((error) => {
          this.setState({ status: error.message });
        })
      }
      this.setState({selectedService: itemValue});
    }
  }
  onChangeText() {
    // this.setState{( searchParam: value )};
  }
  onClickView() {
    NavigatorService.navigate('ViewPortfolio');
  }
  onChangeSearchText(newSearchString) {
    // Needs no server call. Essentially just filtering the data from the available filters.
    // Applying filtration without server call would appear to be almost instantenous,
    // with bigger data sets which would only involve fetching a limited number instead of
    // all the data, such as the first 100 users, might require an additional query.
    let newData = [];
    newData = this.state.dataBackup.filter(function (el) {
      return el.name.indexOf(newSearchString) > -1 ||
             el.email.indexOf(newSearchString) > -1;
    });
    this.setState({data : newData});
  }
  render() {
    return (
        <View style={styles.container}>
          {/* <SearchBar
            round
            onChangeText={(searchParamTemp) => this.setState({ searchParam: searchParamTemp })}
            onClearText={this.onClearText.bind(this)}
            placeholder='Seach by name...' /> */}
          <SearchBar
            lightTheme
            round
            onChangeText={this.onChangeSearchText.bind(this)}
            onClearText={this.onClearText.bind(this)}
            placeholder='Seach by name or email...' />
          <View>
            <Picker
              selectedValue={this.state.selectedService}
              onValueChange={this.onChangeSelectedFilter.bind(this)}
              >
              <Picker.Item label="View All" value="All" />
              <Picker.Item label="Bartender" value="Bartender" />
              <Picker.Item label="Chef" value="Chef" />
            </Picker>
          </View>
          <ScrollView>
            <View style={[{backgroundColor: colors.backgroundSecondary}, styles.list]}>
              <FlatList
                data={this.state.data}
                keyExtractor={(item, index) => index}
                renderItem={({item}) =>
                <TouchableHighlight onPress={this.onClickView.bind(this)}>
                {/* <View style={[styles.border, styles.rowAlign]}>
                    <View style={styles.avatar}>
                      <Avatar
                        large
                        rounded
                        source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg"}}
                        activeOpacity={0.7}
                      />
                    </View>
                    <View style={{flex: 1, flexWrap: 'wrap'}}>
                      <Text style={[styles.bigText]}>Name: {item.name}</Text>
                      <Text style={[styles.bigText]}>Speciality:</Text>
                      <Text style={[styles.bigText]}>Email: {item.email}</Text>
                    </View>
                  </View> */}
                  <ListItem
                    large
                    roundAvatar
                    avatar={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg"}}
                    title={item.name}
                    subtitle={item.email}
                  />
                </TouchableHighlight>
                }
              />
            </View>
          </ScrollView>
        </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rowAlign: {
    flexDirection: 'row',
    // alignItems: 'flex-start',
    // justifyContent: 'flex-end'
  },
  list: {
    marginBottom: 1
  },
  border: {
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },
  avatar: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 15,
    paddingRight: 5,
  },
  bigText : {
    backgroundColor: colors.background,
    fontSize: 20,
    padding: 20,
    color: colors.text,
  }

});
export default TabSearch;