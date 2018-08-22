import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { setPagamento } from '../../actions/pagamento';
import { formatPreco } from '../../utils/format';
import Spinner from '../layout/Spinner';

class Pagamento extends Component {
  componentDidMount() {
    if (!this.props.autenticacao.isAutenticado) {
      this.props.history.push('/login');
      return;
    }
    this.props.setPagamento(this.props.carrinho);
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
            <Col xs={24} md={12}>
              <div>
                {produtos.length} produtos{' '}
                <span className="vizualizar-produtos" style={styles}>
                  vizualizar produtos
                </span>{' '}
                <span style={{ float: 'right' }}>
                  R$: {formatPreco(valorTotal)}
                </span>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <h3>endereço de entrega</h3>
              <div />
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
