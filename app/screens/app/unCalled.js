import React, { Component } from "react";
import { View, Text, Image, Platform, StyleSheet } from "react-native";
import firebase from "react-native-firebase";
import { scale } from "../../uitls/index";
import { Theme } from "../../uitls/theme";
import { StylePanel } from "../../uitls/styles";
import { Footer, Button } from "../../components";
export default class Uncalled extends Component {
  handlePress = () => {
    this.props.navigation.navigate("SelectCity");
  };
  render() {
    firebase.analytics().setCurrentScreen("ADGS PAGE");
    return (
      <View style={StylePanel.container}>
        <View style={styles.slide}>
          <Image
            resizeMode={"contain"}
            style={styles.image}
            source={require("../../assets/adgsIcon.png")}
          />
        </View>

        <View
          style={{
            flex: 1,
            marginTop: 45,
            alignItems: "center"
          }}
        >
          <Text style={styles.title}>Ваша жалоба отправлена!</Text>
          <Text style={styles.subTitle}>
            В Агентство Республики Казахстан по делам государственной службы и
            противодействию коррупции(
            <Text style={{ color: "#FCB415" }}>АДГСПК РК</Text>) !
          </Text>
          <Text style={styles.subTitle}>
            Результат Вашей жалобы будет известен после проверки учреждение.
          </Text>
        </View>
        <Button
          text={"Вернуться на главную"}
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "10%"
  },

  slide: {
    flex: 1,
    paddingTop: 36,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: scale(90 * 2.5),
    height: scale(80 * 2.5)
  },
  text: {
    width: "100%",
    justifyContent: "center",
    alignContent: "center"
  },
  title: {
    fontSize: Theme.fonts.sizes.h1,
    color: Theme.colors.yellow,
    textAlign: "center",
    marginBottom: 16,
    fontFamily: Platform.OS === "android" ? "sans-serif-light" : undefined,
    fontWeight: "100"
  },
  subTitle: {
    // marginTop: 16,
    fontSize: scale(13),
    color: "white",
    textAlign: "center",
    width: "98%",
    marginHorizontal: 14
  }
});
