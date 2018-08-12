import React, { Component } from 'react';
import { connect } from 'react-redux';
import FeedProdutos from './feedProdutos/FeedProdutos';
import { getAllProdutos, getProdutosByCategoria } from '../../actions/produtos';
import Spinner from '../layout/Spinner';

import { Layout } from 'antd';
import objectEquals from '../../utils/objectEquals';
const { Content } = Layout;

class MyContent extends Component {
  state = {
    test: 'oi'
  };
  // componentDidMount() {
  //   this.comparePathAndUpdateProdutos();
  // }

  // static getDerivedStateFromProps(props, state)

  comparePathAndUpdateProdutos = () => {
    const { path, params } = this.props.match;
    if (path === '/') {
      this.props.getAllProdutos();
    } else if (path === '/categoria/:nome') {
      this.props.getProdutosByCategoria(params.nome);
    }
  };

  componentDidMount() {
    this.comparePathAndUpdateProdutos();
  }

  // shouldComponentUpdate(nextProps) {
  //   return (
  //     !objectEquals(
  //       nextProps.produtos.produtos,
  //       this.props.produtos.produtos
  //     ) && nextProps.produtos.produtos.length !== 0
  //   );
  // }

  produtoClicked = (produtoId, nomeProduto) => {
    this.props.history.push(`/produto/${produtoId}/${nomeProduto}`);
  };

  formatarPreco = preco => {
    return preco
      .toFixed(2)
      .toString()
      .split('.')
      .join(',');
  };

  formatarParcela = (preco, parcelas) => {
    return `${parcelas}x de R$ ${this.formatarPreco(preco / parcelas)}`;
  };

  render() {
    const { produtos, loading } = this.props.produtos;
    let feed = loading ? (
      <Spinner />
    ) : (
      <FeedProdutos
        produtos={produtos}
        formatarParcela={this.formatarParcela}
        formatarPreco={this.formatarPreco}
        produtoClicked={this.produtoClicked}
      />
    );
    return (
      <Content
        style={{
          background: '#fff',
          padding: 24,
          margin: 0,
          minHeight: 280
        }}
      >
        {feed}
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  produtos: state.produtos
});

export default connect(
  mapStateToProps,
  { getAllProdutos, getProdutosByCategoria }
)(MyContent);
