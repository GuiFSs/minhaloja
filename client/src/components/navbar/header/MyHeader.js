import React from 'react';
import PropTypes from 'prop-types';

import './MyHeader.css';

import { Layout, Menu, Input, Icon, Badge } from 'antd';

const { Search } = Input;
const { Header } = Layout;

const MyHeader = props => {
  const { width, menuItemClick } = props;

  const style = { background: 'none', marginRight: '-10px' };
  let headerStyle = {};
  headerStyle = width <= 670 ? { height: '100px' } : { height: '60px' };

  const porDepartamento = (
    <div>
      {width < 970 ? (
        <Icon type="menu-fold" />
      ) : (
        <span>
          <Icon type="menu-fold" /> Compre por Departamento
        </span>
      )}
    </div>
  );

  const shoppingItem = (
    <Menu.Item style={style} key="carrinho">
      <Badge count={2}>
        <Icon
          type="shopping-cart"
          style={{ fontSize: '20px', color: '#fff' }}
        />
      </Badge>
    </Menu.Item>
  );
  const userItem = (
    <Menu.Item style={style} key="user">
      <Icon type="user" style={{ fontSize: '20px' }} />
    </Menu.Item>
  );

  return (
    <Header style={headerStyle} className="header">
      <Menu
        onClick={menuItemClick}
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '44px' }}
      >
        <Menu.Item style={style} key="sidebar">
          {porDepartamento}
        </Menu.Item>
        <Menu.Item style={style} key="logo">
          Minha Logo
        </Menu.Item>
        {width <= 670 ? userItem : null}
        {width <= 670 ? shoppingItem : null}
        <Menu.Item className="search-item" style={{ ...style }} key="search">
          <Search
            placeholder="ex: notebooks, celulares"
            onSearch={value => console.log(value)}
            style={{ width: '100%' }}
          />
        </Menu.Item>
        {width > 670 ? userItem : null}
        {width > 670 ? shoppingItem : null}
      </Menu>
    </Header>
  );
};

MyHeader.propTypes = {
  width: PropTypes.number.isRequired,
  menuItemClick: PropTypes.func.isRequired
};

export default MyHeader;
