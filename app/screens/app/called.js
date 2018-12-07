import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Theme } from "../../uitls/theme";
import { StylePanel } from "../../uitls/styles";
import { Footer, Button, IntroPage } from "../../components";
import { scale } from "../../uitls";
export default class Called extends Component {
  handlePress = () => {
    this.props.navigation.navigate("SelectCity");
  };
  render() {
    return (
      <View style={styles.container}>
        <Image
          resizeMode={"contain"}
          style={styles.image}
          source={require("../../../assets/thanksIcon.png")}
        />
        <View style={styles.txtView}>
          <Text style={styles.title}>
            Спасибо,что воспользовались приложением!
          </Text>
        </View>
        <Button
          text={"Вернуться"}
          sendBtn={StylePanel.sendBtn}
          onPress={() => this.handlePress()}
        />
        <Footer footerStyle={styles.footerStyle} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  footerStyle: {
    height: 45,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "10%"
  },
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: Theme.colors.bcground
  },
  txtView: {
    flex: 2,
    paddingTop: 50,
    paddingHorizontal: "5%",
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: 220,
    height: 193,
    marginTop: 95
  },
  title: {
    fontSize: 28,
    color: Theme.colors.yellow,
    textAlign: "center",
    fontWeight: "100"
  }
});
