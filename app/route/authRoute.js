import { createStackNavigator } from 'react-navigation';
import { SignUp, CodeConfirm } from '../screens/auth';
const auth = createStackNavigator(
  {
    SignUp: {
      screen: SignUp,
    },
    CodeConfirm: {
      screen: CodeConfirm,
    },
  },
  {
    navigationOptions: {
      header: null,
    },
  }
);
export default auth;