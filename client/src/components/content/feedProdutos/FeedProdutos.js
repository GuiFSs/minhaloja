import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Row, Col, Rate } from 'antd';

import { connect } from 'react-redux';
import { getAllProdutos } from '../../../actions/produtos';
import Spinner from '../../layout/Spinner';

class FeedProdutos extends Component {
  state = {
    produtos: []
  };
  produtoClicked = (categoriaId, produtoId) => {
    this.props.history.push(`/produto/${categoriaId}/${produtoId}`);
  };

  async componentDidMount() {
    await this.props.getAllProdutos();
    this.setState({ produtos: this.props.produtos.produtos });
  }

  componentWillReceiveProps(nextProps, prevState) {
    return nextProps.produtos;
  }

  formatarPreco = (preco, parcelas) => {
    return `${parcelas}x de ${(preco / parcelas)
      .toFixed(2)
      .toString()
      .split('.')
      .join(',')}`;
  };

  render() {
    const { produtos } = this.state;
    const { loading } = this.props.produtos;

    return (
      <div>
        <Row gutter={{ md: 8 }}>
          {loading ? (
            <Spinner size="large" />
          ) : (
            produtos.map(produto => (
              <Col key={produto._id} xs={12} sm={8} md={6} lg={4}>
                <Card
                  onClick={() =>
                    this.produtoClicked(produto.categoria, produto._id)
                  }
                  hoverable
                  style={{
                    height: '385px',
                    marginBottom: '5px'
                  }}
                  cover={<img alt={produto.nome} src={produto.imagens[0]} />}
                >
                  <p
                    style={{
                      fontSize: '14px',
                      fontWeight: 'normal',
                      margin: 0,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      lineHeight: '17px',
                      whiteSpace: 'normal'
                    }}
                  >
                    {produto.nome}
                  </p>
                  <Rate
                    style={{ fontSize: '12px' }}
                    allowHalf
                    disabled
                    defaultValue={produto.avaliacao.mediaEstrelas}
                  />
                  <small>({produto.avaliacao.numAvaliacoes})</small>
                  <h2 style={{ marginBottom: '5px' }}>R$: {produto.preco}</h2>
                  <span style={{ fontSize: '12px' }}>
                    {this.formatarPreco(produto.preco, 8)}
                  </span>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  produtos: state.produtos
});

export default connect(
  mapStateToProps,
  { getAllProdutos }
)(withRouter(FeedProdutos));
