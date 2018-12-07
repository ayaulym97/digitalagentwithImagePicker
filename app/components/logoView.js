import React from "react";
import { scale } from '../uitls/index';
import { View,Image,StyleSheet} from "react-native";
const LogoView = ({logostyle}) => {
  return (
    <View style={logostyle}>
            <Image 
      resizeMode={'contain'} 
      style={styles.image} 
      source={require("../../assets/logo.png")} />
        </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height:30,
    marginHorizontal:"35%"
  },
});
export default LogoView;