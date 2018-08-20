import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { setPagamento } from '../../actions/pagamento';

class Pagamento extends Component {
  componentDidMount() {
    this.props.setPagamento(this.props.carrinho);
  }
  render() {
    const { produtos, valorTotal } = this.props.pagamento;
    console.log(this.props.pagamento);
    return (
      <div>
        <Row>
          <Col xs={24} md={12}>
            <div>
              {produtos.length} produtos <span>{valorTotal}</span>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <h1>Endereco</h1>
          </Col>
        </Row>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  pagamento: state.pagamento
});
export default connect(
  mapStateToProps,
  { setPagamento }
)(Pagamento);
