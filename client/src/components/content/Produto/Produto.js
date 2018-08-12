import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { Row, Col, Rate, Carousel, Icon, Divider, Button } from 'antd';
import './Produto.css';

import { getOneProduto } from '../../../actions/produtos';
import Spinner from '../../layout/Spinner';

class Produto extends Component {
  state = {
    iconFaceRate: '',
    mediaEstrelas: 0
  };

  async componentDidMount() {
    await this.props.getOneProduto(this.props.match.params.produtoId);
    const { mediaEstrelas } = this.props.produtos.produto.avaliacao;
    this.setState({
      iconFaceRate: this.changeRateIcon(mediaEstrelas),
      mediaEstrelas: mediaEstrelas
    });
  }

  // set the valorRate when clicked
  handleRateChange = value => {
    const icon = this.changeRateIcon(value);
    this.setState({ mediaEstrelas: value, iconFaceRate: icon });
  };

  handleRateHover = value => {
    if (value === undefined) return;
    const icon = this.changeRateIcon(value);
    this.setState({ iconFaceRate: icon });
  };

  handleRateMouseOut = () => {
    const icon = this.changeRateIcon(this.state.mediaEstrelas);
    this.setState({ iconFaceRate: icon });
  };

  changeRateIcon = value => {
    let icon = '';
    if (value >= 4) icon = 'smile-o';
    else if (value >= 2) icon = 'meh-o';
    else icon = 'frown-o';
    return icon;
  };

  formatarPreco = preco => {
    return preco
      .toFixed(2)
      .toString()
      .split('.')
      .join(',');
  };

  formatarParcela = (preco, parcelas) => {
    return `${parcelas}x de R$ ${this.formatarPreco(preco / parcelas)}`;
  };

  handleComprar = e => {
    e.preventDefault();
    this.props.history.push('/carrinho/esse-e-para-ser-meu-carrinhoId');
  };

  render() {
    const { iconFaceRate } = this.state;
    const { produto, loading } = this.props.produtos;

    return (
      <div style={{ padding: '25px' }}>
        {loading ? (
          <Spinner />
        ) : (
          <Row>
            <Col style={{ maxHeight: '500px' }} sm={24} md={12}>
              <Carousel autoplaySpeed={5000} autoplay={true} arrows={true}>
                {produto.imagens
                  ? produto.imagens.map((imagem, index) => (
                      <div key={index}>
                        <img
                          style={{
                            display: 'block',
                            margin: 'auto',
                            width: '70%'
                          }}
                          src={imagem}
                          alt={produto.nome}
                        />
                      </div>
                    ))
                  : null}
              </Carousel>
            </Col>
            <Col style={{ marginTop: '60px' }} sm={24} md={12}>
              <h1>{produto.nome}</h1>
              <small>Cód. do Produto: {produto._id}</small>
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
                  value={
                    produto.avaliacao ? produto.avaliacao.mediaEstrelas : null
                  }
                />
                <small>
                  ({produto.avaliacao ? produto.avaliacao.numAvaliacoes : null})
                </small>{' '}
                <Icon style={{ fontSize: '20px' }} type={iconFaceRate} />
              </div>
              <Divider />
              <h1 style={{ textAlign: 'center' }}>
                R$ {produto.preco ? this.formatarPreco(produto.preco) : null}
              </h1>
              <div style={{ textAlign: 'center' }}>
                <Button
                  style={{ width: '70%' }}
                  onClick={this.handleComprar}
                  type="primary"
                >
                  comprar
                </Button>
              </div>
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  produtos: state.produtos
});

export default connect(
  mapStateToProps,
  { getOneProduto }
)(Produto);
