import React, { Component } from 'react';
import { connect } from 'react-redux';
import FeedProdutos from './feedProdutos/FeedProdutos';
import { getAllProdutos, getProdutosByCategoria } from '../../actions/produtos';
import Spinner from '../layout/Spinner';
import { deformLink } from '../../utils/format';

import { Layout } from 'antd';
const { Content } = Layout;

class MyContent extends Component {
  comparePathAndUpdateProdutos = () => {
    const { path, params } = this.props.match;
    if (path === '/') {
      this.props.getAllProdutos();
    } else if (path === '/categoria/:nome') {
      this.props.getProdutosByCategoria(deformLink(params.nome));
    }
  };

  componentDidMount() {
    this.comparePathAndUpdateProdutos();
  }

  componentDidUpdate(nextProps) {
    if (this.props.match.url !== nextProps.match.url) {
      this.comparePathAndUpdateProdutos();
    }
  }

  produtoClicked = (produtoId, nomeProduto) => {
    this.props.history.push(`/produto/${produtoId}/${nomeProduto}`);
  };

  render() {
    const { produtos, loading } = this.props.produtos;
    let feed = loading ? (
      <Spinner />
    ) : (
      <FeedProdutos produtos={produtos} produtoClicked={this.produtoClicked} />
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
