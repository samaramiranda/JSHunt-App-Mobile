import React, { Component } from 'react';
import api from '../services/api'

import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default class Main extends Component {
  static navigationOptions = {
    title: 'JSHunt'
  };
  
  state = {
    productInfo: {}, //todas as outras informações sobre pagina
    docs: [], //array da quantidade de produtos que tenho
    page: 1, //paginas da api, começa por padrão com 1 
  };

  componentDidMount() { //carrega conteudo automaticamente assim que ele é a pagina é iniciada
    this.loadProducts();
  }

  loadProducts = async (page = 1) => { //quando chamar a função eu vou esperar antes o parametro de page
    const response = await api.get(`/products?page=${page}`); //para retornar os dados da pagina que estou
    const { docs, ...productInfo } = response.data;
    console.log(docs);

    this.setState({ docs: [...this.state.docs, ...docs], //estou usando spread para pegar o que tenho no states.docs e somando com o novos itens carregados
      productInfo,
      page //atualiazando o numero da pág entro do state para não carregar infinitamente
    }); 
  };

  loadMore = () => { //função para carregar mais produtos quando chegar ao fim da página
    const { page, productInfo } = this.state;

    if (page === productInfo.pages) return; //se a página que estou atualmente é igual ao total de páginas não faço nada
  
    const pageNumber = page+1; //senão eu pego a página atual e dou um +1 nela

    this.loadProducts(pageNumber);
  };

  renderItem = ({ item }) => ( //renderiza todos os itens em tela
    <View style={styles.productContainer}>
      <Text style={styles.productTitle}> {item.title} </Text>
      <Text style={styles.productDescription}> {item.description} </Text>

      <TouchableOpacity 
        style={styles.productButton} 
        onPress={() => {
          //para acessar as propriades dos componentes. Navigation é próprio do react. Navigate é para navegar para próx tela e mostrar as informações
          this.props.navigation.navigate("Product", { product: item }) 
        }}
        >
      <Text style={styles.productButtonText}>Acessar</Text> 
      </TouchableOpacity> 
    </View>
  );

  render() {
    return (
      <View style={styles.container}> 
        <FlatList //faz uma listagem dos produtos, assim como o map
          contentContainerStyle={styles.list} //para quando quero estilizar o conteudo dentro da flatlist
          data={this.state.docs}
          keyExtractor={item => item._id} //id unico de cada produto
          renderItem={this.renderItem} //renderiza cada um dos itens em tela
          onEndReached={this.loadMore}  //função automatimente disparada quando eu chegar no fim da lista
          onEndReachedThreshold= {0.1} //qual o percentual do fim da lista que quero chegar para começar a carregar mais itens (em numero decimal)
        />
      </View>
    );
  };
};

const styles = StyleSheet.create({ //estilização da pagina que foi declarada assim
  container: {
    flex: 1,
    backgroundColor: "#fafafa"
  },

  list: {
    padding: 20
  },

  productContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 20,
    marginBottom: 20
  },

  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333"
  },

  productDescription: {
    fontSize: 16,
    color: "#999",
    marginTop: 5,
    lineHeight: 24
  },

  productButton: {
    height: 42,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#da552f",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },

  productButtonText: {
    fontSize: 16,
    color: "#da552f",
    fontWeight: "bold"
  }
});