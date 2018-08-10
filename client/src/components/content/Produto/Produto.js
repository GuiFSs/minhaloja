import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import './Produto.css';

import { Row, Col, Rate, Carousel, Icon, Divider, Button } from 'antd';

import { produtos } from '../feedProdutos/dummyData';

class Produto extends Component {
  state = {
    produto: {},
    iconFaceRate: ''
  };

  componentDidMount() {
    const produto = this.getQueryParams(this.props.match.params);
    this.setState({
      produto,
      iconFaceRate: this.changeRateIcon(produto.valorRate)
    });
  }

  getQueryParams = params => {
    let response = {};
    produtos.map(item => {
      if (item.categoriaId.toString() === params.categoriaId) {
        if (item.produtoId.toString() === params.produtoId) {
          response = { ...item };
        }
      }
      return item;
    });
    return response;
  };

  // set the valorRate when clicked
  handleRateChange = value => {
    const { produto } = this.state;
    produto.valorRate = value;
    const icon = this.changeRateIcon(value);
    this.setState({ produto, iconFaceRate: icon });
  };

  handleRateHover = value => {
    if (value === undefined) return;
    const icon = this.changeRateIcon(value);
    this.setState({ iconFaceRate: icon });
  };

  handleRateMouseOut = () => {
    const icon = this.changeRateIcon(this.state.produto.valorRate);
    this.setState({ iconFaceRate: icon });
  };

  changeRateIcon = value => {
    let icon = '';
    if (value >= 4) icon = 'smile-o';
    else if (value >= 2) icon = 'meh-o';
    else icon = 'frown-o';
    return icon;
  };

  handleComprar = e => {
    e.preventDefault();
    this.props.history.push('/carrinho/esse-e-para-ser-meu-carrinhoId');
  };

  render() {
    const { produto, iconFaceRate } = this.state;
    return (
      <div style={{ padding: '25px' }}>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32, xl: 40 }}>
          <Col sm={24} md={14}>
            <Carousel autoplaySpeed={5000} autoplay={true} arrows={true}>
              {produto.imagens
                ? produto.imagens.map((imagem, index) => (
                    <div key={index}>
                      <img
                        style={{
                          display: 'block',
                          margin: 'auto'
                        }}
                        src={imagem}
                        alt={produto.produto}
                      />
                    </div>
                  ))
                : null}
            </Carousel>
          </Col>
          <Col style={{ marginTop: '60px' }} sm={24} md={10}>
            <h1>{produto.produto}</h1>
            <small>Cód. do Produto: {produto.produtoId}</small>
            <br />
            <div onMouseOut={this.handleRateMouseOut}>
              Avalie o Produto:{' '}
              <Rate
                allowClear={false}
                onChange={this.handleRateChange}
                onHoverChange={this.handleRateHover}
                on
                style={{ fontSize: '15px' }}
                allowHalf
                value={produto.valorRate}
              />
              <Icon style={{ fontSize: '20px' }} type={iconFaceRate} />
            </div>
            <Divider />
            <h1 style={{ textAlign: 'center' }}>
              R${' '}
              {produto.valor
                ? produto.valor
                    .toString()
                    .split('.')
                    .join(',')
                : null}
            </h1>
            <Button
              onClick={this.handleComprar}
              style={{ width: '100%' }}
              type="primary"
            >
              comprar
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Produto;
