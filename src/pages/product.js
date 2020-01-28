import React from 'react';
import { WebView } from 'react-native-webview';

//quando não tem mais de um método posso criar em forma de função em vez de classe
//padrão de variável que não é classe não pode ter estado
const Product = ({ navigation }) => (
  <WebView source={{ uri: navigation.state.params.product.url }}></WebView> //a primeira chave indico que é js e a segunda que é objeto
);

//navegação para pagina do produto
//colocando o  titulo do produto como titulo da pág
Product.navigationOptions = ({ navigation }) => ({
  title: navigation.state.params.product.title //para ter acesso ao titulo do produto
});
    
export default Product;