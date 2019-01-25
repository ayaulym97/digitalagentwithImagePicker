import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import axios from "axios";
import { SelectPage } from "../../components";
import { base_url } from "../../config/const";
export default class SelectDistricts extends Component {
  state = {
    searchTxt: ""
  };
  city = this.props.navigation.getParam("city", "default");
  vedom = this.props.navigation.getParam("vedom", "default");
  async componentDidMount() {
    const token = await AsyncStorage.getItem("id_token");
    this.setState({ token });
    const {districts } = this.state;

    try {
      axios
        .get(base_url + `/api/region/bycity/` + this.vedom + "/" + this.city, {
          headers: { Authorization: token }
        })
        .then(res => {
          this.setState({ districts: res.data.regions });
          console.log("districts", districts);
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
    this.props.navigation.navigate("SelectServiceCenter", {
      district: item,
      vedom: this.vedom
    });
  };
  render() {
    const { districts, searchTxt } = this.state;
    var data = districts;
    var searchString = searchTxt.trim().toLowerCase();
    if (searchString.length > 0) {
      data = data.filter(i => {
        return i.name.toLowerCase().match(searchString);
      });
    }
    return (
      <SelectPage
        type={"district"}
        vedom={this.vedom}
        searchTxt={searchTxt}
        onChangeSearchTxt={searchTxt => this.handleSearchBar(searchTxt)}
        header="Выберите район"
        data={data}
        onPressCity={item => this.handleDistrict(item._id)}
      />
    );
  }
}
