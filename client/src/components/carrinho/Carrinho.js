import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col, Input, Button, Select } from 'antd';
// import PropTypes from 'prop-types'
import { getCarrinho } from '../../actions/carrinho';
import Spinner from '../layout/Spinner';
import { formatPreco } from '../../utils/format';

const { Option } = Select;
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
              <Col sm={24} lg={16}>
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
            <Row>
              <Col sm={18}>Produto</Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32, xl: 40 }}>
              <Col style={{ padding: '-10px' }} sm={24} lg={16}>
                {produtos.map(produto => (
                  <Row key={produto._id}>
                    <Col>
                      <Card>
                        <Row>
                          <Col xs={5}>
                            <img
                              style={{ width: '100%' }}
                              src={produto.imagens ? produto.imagens[0] : ''}
                              alt={produto.nome}
                            />
                          </Col>
                          <Col
                            xs={{ offset: 2, span: 4 }}
                            sm={{ offset: 1, span: 3 }}
                          >
                            <Select
                              // value={state.currency}
                              // size={size}
                              style={{ width: '100%' }}
                              // onChange={this.handleCurrencyChange}
                            >
                              <Option value="1">1</Option>
                              <Option value="2">2</Option>
                              <Option value="3">3</Option>
                              <Option value="4">4</Option>
                              <Option value="5">5</Option>
                              <Option value="6">6</Option>
                            </Select>
                          </Col>
                          <Col
                            xs={{ offset: 2, span: 11 }}
                            sm={{ offset: 1, span: 4 }}
                          >
                            <p>R$ {formatPreco(produto.preco)}</p>
                          </Col>
                          <Col xs={24} sm={{ span: 10 }}>
                            <p>{produto.nome}</p>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  </Row>
                ))}
              </Col>
              <Col
                style={{
                  backgroundColor: '#f3f3f3',
                  padding: '10px',
                  marginTop: '15px',
                  marginLeft: 'auto'
                }}
                sm={24}
                lg={8}
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
  container: { padding: '2px', margin: '10px' },
  // li: { display: 'inline-block', paddingRight: '5%' },
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
