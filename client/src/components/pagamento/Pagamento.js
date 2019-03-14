import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { setPagamento } from '../../actions/pagamento';
import { formatPreco } from '../../utils/format';
import Spinner from '../layout/Spinner';

class Pagamento extends Component {
  async componentDidMount() {
    if (!this.props.autenticacao.isAutenticado) {
      this.props.history.push('/login');
      return;
    }
    await this.props.setPagamento(this.props.carrinho);
    if (this.props.pagamento.produtos.length === 0) {
      this.props.history.push('/');
    }
  }
  render() {
    const { produtos, valorTotal, loading } = this.props.pagamento;
    console.log(loading);

    return (
      <div style={styles.container}>
        {loading ? (
          <Spinner />
        ) : (
          <Row gutter={{ md: 24 }}>
            <Col xs={12} md={6}>
              {produtos.length} produto{produtos.length > 1 ? 's ' : ' '}
              <span className='vizualizar-produtos' style={styles}>
                vizualizar produtos
              </span>
              <br />
              {/* TODO: caulcular frete e colocar aqui a cidade*/}
              frete para {'COTIA'}
            </Col>
            <Col xs={12} md={6}>
              <span>R$: {formatPreco(valorTotal)}</span>
              {/* TODO: caulcular frete e colocar aqui o preco */}
              <br />
              <span>R$: {'14,27'}</span>
            </Col>
            <Col xs={24} md={12}>
              <h3>endereço de entrega</h3>
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

const styles = {
  container: {
    padding: '10px 0 0 20px'
  }
};

const mapStateToProps = state => ({
  pagamento: state.pagamento,
  autenticacao: state.autenticacao
});
export default connect(
  mapStateToProps,
  { setPagamento }
)(Pagamento);
