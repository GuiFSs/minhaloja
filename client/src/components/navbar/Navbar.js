import React, { Component } from 'react';

import { Layout, Breadcrumb, Affix } from 'antd';
import MyHeader from './header/MyHeader';
import SideDrawer from './listaDepartamento/SideDrawer';
import { connect } from 'react-redux';

import { getAllCategorias } from '../../actions/categorias';
import { getProdutosByCategoria } from '../../actions/produtos';

class Navbar extends Component {
  state = {
    visible: false,
    width: window.innerWidth
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.props.getAllCategorias();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth });
  };

  handleDrawer = () => {
    this.setState(prevState => ({ visible: !prevState.visible }));
  };

  handleDrawerAndFetchProdutos = categoriaNome => {
    this.props.getProdutosByCategoria(categoriaNome);
    this.setState(prevState => ({ visible: !prevState.visible }));
  };

  handleUserClick = () => {
    this.props.history.push('/login');
  };

  handleLogoClick = () => {
    this.props.history.push('/');
  };

  handleCartClick = () => {
    this.props.history.push('/carrinho/esse-e-para-ser-meu-carrinhoId');
  };

  render() {
    const { width } = this.state;
    const { categorias } = this.props.categorias;
    let myHeaderContent = (
      <MyHeader
        cartClick={this.handleCartClick}
        logoClick={this.handleLogoClick}
        userClick={this.handleUserClick}
        clickDrawer={this.handleDrawer}
        width={width}
      />
    );
    myHeaderContent =
      width >= 1025 ? (
        <Affix offsetTop={0}>
          <MyHeader
            cartClick={this.handleCartClick}
            logoClick={this.handleLogoClick}
            userClick={this.handleUserClick}
            clickDrawer={this.handleDrawer}
            width={width}
          />
        </Affix>
      ) : (
        myHeaderContent
      );

    return (
      <Layout>
        {myHeaderContent}
        <SideDrawer
          categorias={categorias}
          onClose={this.handleDrawer}
          onMenuItemClick={this.handleDrawerAndFetchProdutos}
          visible={this.state.visible}
        />
        <Layout style={{ padding: '0 24px 5px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  categorias: state.categorias
});

export default connect(
  mapStateToProps,
  { getAllCategorias, getProdutosByCategoria }
)(Navbar);
