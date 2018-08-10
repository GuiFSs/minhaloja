import React, { Component } from 'react';
import FeedProdutos from './feedProdutos/FeedProdutos';
import { Layout } from 'antd';

import { produtos } from '../content/feedProdutos/dummyData';

const { Content } = Layout;

export default class MyContent extends Component {
  state = {
    produtos: [],
    currentParams: ''
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    let newProdutos = [];
    produtos.map(produto => {
      if (produto.categoriaId === nextProps.match.params.categoriaId) {
        newProdutos.push(produto);
      }
      return produto;
    });
    return { produtos: newProdutos };
  }

  getContentFromParams = params => {
    let response = [];
    produtos.map(produto => {
      if (produto.categoriaId === params.categoriaId) {
        response.push(produto);
      }
      return produto;
    });
    return response;
  };

  componentDidMount() {
    this.setState({
      produtos: this.getContentFromParams(this.props.match.params)
    });
  }

  render() {
    const { produtos } = this.state;
    return (
      <Content
        style={{
          background: '#fff',
          padding: 24,
          margin: 0,
          minHeight: 280
        }}
      >
        <FeedProdutos produtos={produtos} />
      </Content>
    );
  }
}
