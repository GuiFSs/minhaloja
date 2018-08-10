import React, { Component } from 'react';
import { Card, Row, Col, Input, Button } from 'antd';
// import PropTypes from 'prop-types'

const produtos = [
  { imagem: 'image', name: 'pc gamer', preco: 3500.0 },
  { imagem: 'image', name: 'pc gamer', preco: 3500.0 }
];

class Carrinho extends Component {
  state = {
    mostrarOpcoesFrete: false
  };

  handleCalcularFrete = value => {
    console.log(value);
    this.setState({ mostrarOpcoesFrete: true });
  };

  render() {
    const { mostrarOpcoesFrete } = this.state;
    return (
      <div style={style.container}>
        <h1>Meu Carrinho</h1>
        <h3>Produtos</h3>
        <Row>
          <Col sm={24} md={16}>
            <Input.Search
              style={{
                width: '100%',
                marginRight: '20px',
                marginBottom: '20px'
              }}
              placeholder="Informe seu CEP"
              enterButton="CALCULAR FRETE"
              onSearch={this.handleCalcularFrete}
              type="number"
            />
          </Col>
          <Col sm={24} md={8}>
            {mostrarOpcoesFrete ? (
              <ul>
                <li>economica: R$ 17,00 | 7 dias úteis</li>
                <li>Premium: R$ 17,00 | 3 dias úteis</li>
              </ul>
            ) : null}
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32, xl: 40 }}>
          <Col sm={24} md={16}>
            {produtos.map((produto, index) => (
              <Row key={index}>
                <Col>
                  <Card>
                    <ul style={{ display: 'inline-block' }}>
                      <li
                        style={{ display: 'inline-block', marginRight: '30px' }}
                      >
                        <h3>{produto.imagem}</h3>
                      </li>
                      <li
                        style={{ display: 'inline-block', marginRight: '30px' }}
                      >
                        <h3>{produto.name}</h3>
                      </li>
                      <li
                        style={{ display: 'inline-block', marginRight: '30px' }}
                      >
                        <h3>{produto.preco}</h3>
                      </li>
                    </ul>
                  </Card>
                </Col>
              </Row>
            ))}
          </Col>
          <Col
            style={{ backgroundColor: '#f3f3f3', padding: '10px' }}
            sm={24}
            md={8}
          >
            <h1>Resumo do pedido</h1>
            <h2>Total: R$ 1835,55</h2>
            <Button style={{ width: '100%' }} type="primary">
              Continuar
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

const style = {
  container: { padding: '15px', margin: '10px' }
};

export default Carrinho;
