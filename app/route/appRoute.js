import React from 'react';
import { createStackNavigator } from 'react-navigation';
import {
  SelectCity,
  SelectDistrict,
  SelectServiceCenter,
  Estimate,
  WaitForResponse,
  WannaBeContacted,
  AfterEightPm,
  Called,
  Uncalled,
} from '../screens/app';
import { Image, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Theme } from '../uitls/theme';
const app = createStackNavigator(
  {
    SelectCity: {
      screen: SelectCity,
      navigationOptions: {
        headerLeft: null,
      },
    },
    SelectDistrict: {
      screen: SelectDistrict,
    },
    SelectServiceCenter: {
      screen: SelectServiceCenter,
    },
    Estimate: {
      screen: Estimate,
    },
    WannaBeContacted: {
      screen: WannaBeContacted,
    },
    AfterEightPm: {
      screen: AfterEightPm,
    },
    WaitForResponse: {
      screen: WaitForResponse,
      navigationOptions: {
        headerLeft: null,
      },
    },
    Called: {
      screen: Called,
      navigationOptions: {
        headerLeft: null,
      },
    },
    Uncalled: {
      screen: Uncalled,
      navigationOptions: {
        headerLeft: null,
      },
    },
  },
  {
    initialRouteName: 'SelectCity',
    navigationOptions: {
      headerStyle: {
        backgroundColor: Theme.colors.gray26,
        borderBottomWidth: 0,
      },
      headerBackImage: (
        <Icon
          name={'ios-arrow-round-back'}
          size={32}
          color="white"
          style={{
            marginLeft: Platform.OS === 'ios' ? 16 : 0,
          }}
        />
      ),
      headerTitle: (
        <Image
          resizeMode={'contain'}
          style={{ width: '0.186%', height: 20, flex: 1 }}
          source={require('../../assets/logo.png')}
        />
      ),
    },
  }
);

export default app;