import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col, Input, Button, InputNumber } from 'antd';
// import PropTypes from 'prop-types'
import { getCarrinho, removeProdutoFromCart } from '../../actions/carrinho';
import Spinner from '../layout/Spinner';
import { formatPreco, formatParcela } from '../../utils/format';

class Carrinho extends Component {
  state = {
    mostrarOpcoesFrete: false,
    produtosPreco: {},
    valorTotal: 0
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    let { produtosPreco, valorTotal } = prevState;
    nextProps.carrinho.produtos.map(produto => {
      if (!prevState.produtosPreco[produto._id]) {
        valorTotal += produto.preco;
        produtosPreco[produto._id] = produto.preco;
      }
    });
    return Object.keys(produtosPreco).length > 0
      ? { produtosPreco, valorTotal }
      : { ...prevState };
  }

  componentDidMount() {
    this.props.getCarrinho();
  }
  atualizarValorTotal = () => {
    const produtosPreco = {};
    let valorTotal = 0;
    this.props.carrinho.produtos.map(produto => {
      valorTotal += produto.preco;
      return (produtosPreco[produto._id] = produto.preco);
    });
    this.setState({ produtosPreco, valorTotal });
  };

  handleCalcularFrete = value => {
    this.setState({ mostrarOpcoesFrete: true });
  };

  handleRemoveProduto = async id => {
    await this.props.removeProdutoFromCart(id);
    this.props.getCarrinho();
    this.atualizarValorTotal();
  };

  handleProdutoQtdeChange = (qtde, id, precoProduto) => {
    this.setState(prevState => {
      const produtosPreco = {
        ...prevState.produtosPreco,
        [id]: qtde * precoProduto
      };
      let valorTotal = 0;
      for (let produto in produtosPreco) {
        valorTotal += produtosPreco[produto];
      }
      return {
        produtosPreco,
        valorTotal
      };
    });
  };

  render() {
    const { mostrarOpcoesFrete, produtosPreco, valorTotal } = this.state;
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
            {/* <Row>
              <Col xs={{ offset: 1, span: 5 }}>Produto</Col>
              <Col xs={5}>Quantidade</Col>
              <Col xs={{ span: 5 }}>Preco</Col>
            </Row> */}
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32, xl: 40 }}>
              <Col style={{ padding: '-10px' }} sm={24} lg={16}>
                {produtos.map(produto => (
                  <Row key={produto._id}>
                    <Col>
                      <Card>
                        <Row>
                          <Col xs={4}>
                            <img
                              style={{ width: '100%' }}
                              src={produto.imagens ? produto.imagens[0] : ''}
                              alt={produto.nome}
                            />
                          </Col>
                          <Col xs={{ span: 5 }} sm={{ offset: 1, span: 4 }}>
                            <InputNumber
                              min={1}
                              max={6}
                              defaultValue={1}
                              onChange={qtde =>
                                this.handleProdutoQtdeChange(
                                  qtde,
                                  produto._id,
                                  produto.preco
                                )
                              }
                            />
                            <span
                              onClick={() =>
                                this.handleRemoveProduto(produto._id)
                              }
                              className="remover-produto-carrinho"
                              style={{}}
                            >
                              remover
                            </span>
                          </Col>
                          <Col
                            xs={{ offset: 4, span: 11 }}
                            sm={{ offset: 1, span: 4 }}
                          >
                            <p>
                              R${' '}
                              {produtosPreco[produto._id]
                                ? formatPreco(produtosPreco[produto._id])
                                : produto.preco}
                            </p>
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
                <div style={{ textAlign: 'center' }}>
                  <h1>Resumo do pedido</h1>
                  <h2>R$ {formatPreco(valorTotal)}</h2>
                  <p>{valorTotal > 0 && formatParcela(valorTotal, 8)}</p>
                  <Button style={{ width: '100%' }} type="primary">
                    Continuar
                  </Button>
                </div>
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
  { getCarrinho, removeProdutoFromCart }
)(Carrinho);
