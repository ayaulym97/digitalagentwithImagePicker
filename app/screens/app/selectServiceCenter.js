import React, { Component } from 'react';
import {
  View,
  Text,
  AsyncStorage,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { Theme } from '../../uitls/theme';
import { StylePanel } from '../../uitls/styles';
import { Footer, SearchInput} from '../../components';
import { base_url } from '../../config/const';
export default class SelectServiceCenter extends Component {
  state = {
    searchTxt: '',
  };
  district = this.props.navigation.getParam('district', 'default');
  async componentDidMount() {
    const token = await AsyncStorage.getItem('id_token');
    console.log('TOKEN', token);
    console.log('District', this.district);
    try {
      axios
        .get(base_url + `/api/con/byregion/` + this.district, {
          headers: { Authorization: token },
        })
        .then(res => {
          console.log('CON', res.data.cons);
          const cons = res.data.cons;
          this.setState({ cons });
        });
    } catch (error) {
      console.log('err', error);
    }
  }
  handleSearchBar = searchTxt => {
    this.setState({
      searchTxt,
    });
    console.log('42', searchTxt);
  };
  handleServiceCenter = item => {
    console.log('CON_ID', item._id);
    this.props.navigation.navigate('Estimate', { cons: item });
  };
  render() {
    var data = this.state.cons;
    var searchString = this.state.searchTxt.trim().toLowerCase();
    if (searchString.length > 0) {
      data = data.filter(i => {
        return i.name.toLowerCase().match(searchString);
      });
    }
    return (
      <View style={StylePanel.selectContainer}>
        <View style={ StylePanel.upView}>
          <SearchInput
            value={this.state.searchTxt}
            onChangeText={searchTxt => this.handleSearchBar(searchTxt)}
          />

          <Text style={StylePanel.header}>Выберите ЦОН</Text>
        </View>
        <View style={StylePanel.downView}>
          {data ? (
            
            <FlatList
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.cityContainer}
                  onPress={() => this.handleServiceCenter(item)}>
                  <Text 
                  style={styles.cityTxt}
                  >{item.name}</Text>
                  <Icon
                    name={'ios-arrow-forward'}
                    size={24}
                    color={Theme.colors.gray63}
                  />
                </TouchableOpacity>
              )}
            />
          ) : (
            <ActivityIndicator size="large" color={Theme.colors.yellow} />
          )}
        </View>
        <Footer footerStyle={StylePanel.footerStyle} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  upView: {
    flex: 1,
  },
  cityContainer: {
    width: '92%',
    marginHorizontal: '4%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.gray42,
  },
  cityTxt: {
    width:"95%",
    color: 'white',
    fontSize: Theme.fonts.sizes.p6,
  },
});