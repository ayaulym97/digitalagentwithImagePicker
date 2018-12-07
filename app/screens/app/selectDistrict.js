import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import axios from "axios";
import { SelectPage } from "../../components";
import { base_url } from "../../config/const";
export default class SelectDistrict extends Component {
  state = {
    searchTxt: ""
  };
  city = this.props.navigation.getParam("city", "default");
  async componentDidMount() {
    const token = await AsyncStorage.getItem("id_token");
    console.log("TOKEN", token);
    console.log("City", this.city);
    try {
      axios
        .get(base_url + `/api/region/bycity/` + this.city, {
          headers: { Authorization: token }
        })
        .then(res => {
          console.log("CITY", res.data.regions);
          const regions = res.data.regions;
          this.setState({ regions });
        });
    } catch (error) {
      console.log("err", error);
    }
  }

  handleSearchBar = searchTxt => {
    this.setState({
      searchTxt
    });
    console.log("RER", searchTxt);
  };
  handleDistrict = item => {
    this.props.navigation.navigate("SelectServiceCenter", { district: item });
  };
  render() {
    var data = this.state.regions;
    var searchString = this.state.searchTxt.trim().toLowerCase();
    if (searchString.length > 0) {
      data = data.filter(i => {
        return i.name.toLowerCase().match(searchString);
      });
    }
    return (
      <SelectPage
        searchTxt={this.state.searchTxt}
        onChangeSearchTxt={searchTxt => this.handleSearchBar(searchTxt)}
        header="Выберите район"
        data={data}
        onPressCity={item => this.handleDistrict(item._id)}
      />
    );
  }
}
