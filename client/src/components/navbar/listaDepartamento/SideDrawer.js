import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Drawer, Menu } from 'antd';

const SideDrawer = ({ onClose, visible, onMenuItemClick, categorias }) => {
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
        {categorias
          ? categorias.map(categoria => (
              <Menu.Item
                onClick={() => onMenuItemClick(categoria.nome)}
                key={categoria._id}
              >
                {/* TODO: trocar o categoria.id por categoria.nameLink()  */}
                <Link to={`/categoria/${categoria.nome.split(' ').join('-')}`}>
                  <span onClick={() => console.log('item clicked')}>
                    {categoria.nome}
                  </span>
                </Link>
              </Menu.Item>
            ))
          : null}
      </Menu>
    </Drawer>
  );
};

SideDrawer.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  categorias: PropTypes.array.isRequired
};

export default SideDrawer;
