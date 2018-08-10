import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Layout, Icon } from 'antd';

const Footer = Layout.Footer;

const style = {
  marginRight: '50px',
  display: 'inline-block'
};
const styleIcons = {
  display: 'inline-block',
  padding: '3px',
  marginRight: '5px'
};

class MyFooter extends Component {
  render() {
    return (
      <Footer style={{ background: '#bdbdbd' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={style}>
            <h2>Atendimento</h2>
            <Link to="/meus-pedidos">Meus Pedidos</Link>
            {' | '}
            <Link to="fale-conosco">Fale Conosco</Link>
          </div>
          <div style={style}>
            <h2>Dúvidas</h2>
            <Link to="/duvidas">Dúvidas Frequentes</Link>
          </div>
          <div style={{ ...style }}>
            <h2>Redes Sociais</h2>
            <div style={{ fontSize: '20px' }}>
              <Link to="/foicebook" style={styleIcons}>
                <Icon type="facebook" />
              </Link>
              <Link to="/twitter" style={styleIcons}>
                <Icon type="twitter" />
              </Link>
              <Link to="/youtube" style={styleIcons}>
                <Icon type="youtube" />
              </Link>
              <Link
                target="_blank"
                to="https://github.com/GuiFSs"
                style={styleIcons}
              >
                <Icon type="github" />
              </Link>
              <Link to="/instagram" style={styleIcons}>
                <Icon type="instagram" />
              </Link>
            </div>
          </div>
        </div>
      </Footer>
    );
  }
}

export default MyFooter;
