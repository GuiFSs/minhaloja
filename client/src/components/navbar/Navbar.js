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

  handleLinkClick = link => {
    this.props.history.push(link);
  };

  handleMenuItemClick = e => {
    switch (e.key) {
      case 'carrinho':
        this.props.history.push('/carrinho');
        break;
      case 'logo':
        this.props.history.push('/');
        break;
      case 'sidebar':
        this.handleDrawer();
        break;
      default:
        break;
    }
  };

  render() {
    const { width } = this.state;
    const { categorias } = this.props.categorias;
    let myHeaderContent = (
      <MyHeader
        menuItemClick={this.handleMenuItemClick}
        cartClick={() => this.handleLinkClick('/carrinho')}
        logoClick={() => this.handleLinkClick('/')}
        userClick={() => this.handleLinkClick('/login')}
        clickDrawer={this.handleDrawer}
        width={width}
      />
    );
    myHeaderContent =
      width >= 1025 ? (
        <Affix offsetTop={0}>
          <MyHeader menuItemClick={this.handleMenuItemClick} width={width} />
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
          onMenuItemClick={this.handleDrawer}
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
