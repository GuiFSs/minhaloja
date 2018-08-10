import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Row, Col, Rate } from 'antd';
import { produtos as dummyProdutos } from './dummyData';

class FeedProdutos extends Component {
  state = {
    produtos: []
  };
  produtoClicked = (categoriaId, produtoId) => {
    this.props.history.push(`/produto/${categoriaId}/${produtoId}`);
  };

  componentDidMount() {
    this.setState({ produtos: this.props.produtos });
  }

  componentWillReceiveProps(nextProps, prevState) {
    return nextProps.produtos;
  }

  render() {
    let { produtos } = this.props;
    if (produtos.length <= 0) {
      produtos = [...dummyProdutos];
    }
    return (
      <div>
        {/* gutter={{ xs: 8, sm: 16, md: 24, lg: 32, xl: 40 }} */}
        <Row>
          {produtos.map(item => (
            <Col key={item.produtoId} xs={12} sm={8} md={6} lg={4}>
              <Card
                onClick={() =>
                  this.produtoClicked(item.categoriaId, item.produtoId)
                }
                hoverable
                style={{
                  height: '385px',
                  marginBottom: '5px'
                }}
                cover={<img alt={item.produto} src={item.imagens[0]} />}
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
                  {item.produto}
                </p>
                <Rate
                  style={{ fontSize: '12px' }}
                  allowHalf
                  disabled
                  defaultValue={item.valorRate}
                />
                <small>({item.quantProdRate})</small>
                <h2 style={{ marginBottom: '5px' }}>R$: {item.valor}</h2>
                <span style={{ fontSize: '12px' }}>
                  {item.parcelaDescricao}
                </span>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default withRouter(FeedProdutos);
