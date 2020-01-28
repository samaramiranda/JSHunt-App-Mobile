import { createStackNavigator } from 'react-navigation';

import Main from './pages/main';
import Product from './pages/product';

export default createStackNavigator( //paginas que uso no app
  {
    Main,
    Product
  },
  {
  navigationOptions: { //estilização do header padrão do react
    headerStyle: {
      backgroundColor: "#da552f"
    },
    headerTintColor: "#fff"
  },
});