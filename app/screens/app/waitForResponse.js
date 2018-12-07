import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Easing,
  StyleSheet,
  AsyncStorage
} from "react-native";
import axios from "axios";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Footer } from "../../components";
import { Theme } from "../../uitls/theme";
import { base_url } from "../../config/const";
import { StylePanel } from "../../uitls/styles";
export default class WaitForResponse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      remainingTime: 59,
      minute: 4,
      fill: 0,
      solved: false
    };
  }
  componentDidMount() {
    this.countFill();
    this.countdownTimer();
    this.countdownMinute();
  }
  review = this.props.navigation.getParam("review", "default");
  countFill() {
    this.circularProgress.animate(100, 300000, Easing.quad);
  }

  countdownTimer() {
    clearInterval(timer);
    var timer = setInterval(() => {
      if (!this.state.remainingTime) {
        clearInterval(timer);
        return false;
      }
      if (this.state.remainingTime < 2 && this.state.minute != 0) {
        this.setState({
          remainingTime: 60
        });
      }
      this.setState({
        remainingTime: this.state.remainingTime - 1
      });
    }, 1000);
  }
  countdownMinute() {
    clearInterval(minute);
    var minute = setInterval(() => {
      if (!this.state.minute) {
        clearInterval(minute);
        return false;
      }
      this.setState(prevState => {
        return { minute: prevState.minute - 1 };
      });
    }, 60000);
  }
  handleUncalled = () => {
    this.postAdgs();
    this.props.navigation.navigate("Uncalled");
  };
  async postAdgs() {
    const token = await AsyncStorage.getItem("id_token");
    console.log("TOKEN_ADGS", token);
    axios
      .post(
        base_url + "/api/review/sendtoadgs/" + this.review,
        {},
        { headers: { Authorization: token } }
      )
      .then(response => {
        console.log("61", response);
      })
      .catch(error => {
        console.log(error, 66);
      });
  }
  render() {
    return (
      <View style={StylePanel.container}>
        <View style={styles.upView}>
          <AnimatedCircularProgress
            style={{ marginTop: 30, marginHorizontal: "15%" }}
            ref={ref => (this.circularProgress = ref)}
            size={250}
            width={18}
            rotation={0}
            fill={this.state.fill}
            tintColor={Theme.colors.yellow}
            backgroundColor={Theme.colors.gray26}
          >
            {() => (
              <Text style={styles.timeTxt}>
                0{this.state.minute}:{this.state.remainingTime < 10 ? 0 : null}
                {this.state.remainingTime}
              </Text>
            )}
          </AnimatedCircularProgress>
        </View>
        <View style={styles.downView}>
          {this.state.remainingTime === 0 && this.state.minute === 0 ? (
            <View styles={styles.subDownView}>
              {this.state.solved ? (
                <React.Fragment>
                  <Text style={styles.subDownTxt}>Решили вопрос?</Text>
                  <View
                    style={{ flex: 1, flexDirection: "row", marginTop: 10 }}
                  >
                    <TouchableOpacity
                      style={styles.sendBtnYes}
                      onPress={() => this.props.navigation.navigate("Called")}
                    >
                      <Text style={styles.sendBtnTxtYes}>Да</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.sendBtnNo}
                      onPress={() => this.handleUncalled()}
                    >
                      <Text style={styles.sendBtnTxtNo}>Нет</Text>
                    </TouchableOpacity>
                  </View>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Text style={styles.subDownTxt}>Вам позвонили?</Text>
                  <View
                    style={{ flex: 1, flexDirection: "row", marginTop: 10 }}
                  >
                    <TouchableOpacity
                      style={styles.sendBtnYes}
                      onPress={() => this.setState({ solved: true })}
                    >
                      <Text style={styles.sendBtnTxtYes}>Да</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.sendBtnNo}
                      onPress={() => this.handleUncalled()}
                    >
                      <Text style={styles.sendBtnTxtNo}>Нет</Text>
                    </TouchableOpacity>
                  </View>
                </React.Fragment>
              )}
            </View>
          ) : (
            <View styles={styles.subDownView}>
              <Text style={styles.subDownTxt}>Ваша жалоба принята!</Text>
              <Text style={styles.waitTxt}>
                Дождитесь 5 минут, чтобы получить ответ от представителей ЦОНа.
              </Text>
            </View>
          )}
        </View>
        <Footer footerStyle={styles.footerStyle} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.bcground
  },
  upView: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  },
  downView: {
    flex: 1,
    paddingTop: 60
  },
  subDownView: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  },
  footerStyle: {
    position: "absolute",
    bottom: 20,
    flex: 1,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "5%"
  },
  timeTxt: {
    fontSize: 36,
    color: Theme.colors.yellow,
    fontWeight: "200"
  },
  subDownTxt: {
    fontSize: 26,
    textAlign: "center",
    color: Theme.colors.yellow,
    width: "90%",
    marginHorizontal: "5%",
    fontWeight: "100"
  },
  waitTxt: {
    fontSize: 14,
    textAlign: "center",
    color: "white",
    width: "90%",
    marginHorizontal: "5%",
    marginTop: 20
  },
  sendBtnYes: {
    width: "40%",
    height: 45,
    backgroundColor: Theme.colors.yellow,
    marginHorizontal: "5%",
    marginVertical: 10,
    justifyContent: "center",
    alignContent: "center"
  },
  sendBtnNo: {
    width: "40%",
    height: 45,
    borderColor: Theme.colors.yellow,
    borderWidth: 1,
    marginHorizontal: "5%",
    marginVertical: 10,
    justifyContent: "center",
    alignContent: "center"
  },
  sendBtnTxtYes: {
    color: Theme.colors.bcground,
    fontSize: Theme.fonts.sizes.p6,
    textAlign: "center"
  },
  sendBtnTxtNo: {
    color: Theme.colors.yellow,
    fontSize: Theme.fonts.sizes.p6,
    textAlign: "center"
  }
});
