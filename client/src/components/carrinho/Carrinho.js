import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col, Input, Button } from 'antd';
// import PropTypes from 'prop-types'
import { getCarrinho } from '../../actions/carrinho';
import Spinner from '../layout/Spinner';
class Carrinho extends Component {
  state = {
    mostrarOpcoesFrete: false
  };

  componentDidMount() {
    this.props.getCarrinho();
  }

  handleCalcularFrete = value => {
    console.log(value);
    this.setState({ mostrarOpcoesFrete: true });
  };

  render() {
    const { mostrarOpcoesFrete } = this.state;
    const { produtos, loading } = this.props.carrinho;
    return (
      <div>
        {loading ? (
          <Spinner />
        ) : (
          <div style={styles.container}>
            <h1>Meu Carrinho</h1>
            <h3>Produtos</h3>
            <Row>
              <Col sm={24} md={16}>
                <Input.Search
                  style={styles.inputSearch}
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
                {produtos.map(produto => (
                  <Row key={produto._id}>
                    <Col>
                      <Card style={{ padding: '5px' }}>
                        <ul>
                          <li style={styles.li}>
                            <img
                              style={{ width: '100px' }}
                              src={produto.imagens ? produto.imagens[0] : ''}
                              alt={produto.nome}
                            />
                          </li>
                          <li style={styles.li}>
                            <h3>{produto.npme}</h3>
                          </li>
                          <li style={styles.li}>
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
        )}
      </div>
    );
  }
}

const styles = {
  container: { padding: '15px', margin: '10px' },
  li: { display: 'inline-block', marginRight: '30px' },
  inputSearch: {
    width: '100%',
    marginRight: '20px',
    marginBottom: '20px'
  }
};

const mapStateToProps = state => ({
  carrinho: state.carrinho
});

export default connect(
  mapStateToProps,
  { getCarrinho }
)(Carrinho);
