import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Drawer, Menu } from 'antd';

import { categorias } from './dummyCategorias';

const SideDrawer = ({ onClose, visible, onMenuItemClick }) => {
  return (
    <Drawer
      title="Compre Por Departamento"
      placement="left"
      closable={false}
      onClose={onClose}
      visible={visible}
    >
      <Menu
        style={{
          width: 256,
          padding: '-20px',
          marginLeft: '-25px',
          marginTop: '-10px'
        }}
        mode="inline"
      >
        {categorias.map(categoria => (
          <Menu.Item onClick={onMenuItemClick} key={categoria.id}>
            {/* TODO: trocar o categoria.id por categoria.nameLink()  */}
            <Link to={`/categoria/${categoria.id}`}>
              <span>{categoria.name}</span>
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    </Drawer>
  );
};

SideDrawer.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default SideDrawer;
