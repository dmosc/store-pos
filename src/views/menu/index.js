import React from 'react';
import {ModuleContainer, ModulesList} from './elements';
import {
  ShoppingCartOutlined,
  BarcodeOutlined,
  CodeSandboxOutlined,
} from '@ant-design/icons';
import {Link} from 'react-router-dom';

const modules = [
  {
    name: 'Tienda',
    route: '/checkout',
    icon: (
      <ShoppingCartOutlined
        style={{
          width: '100%',
          color: '#6000FF',
          fontSize: 'xxx-large',
          marginBottom: 10,
        }}
      />
    ),
  },
  {
    name: 'Productos',
    route: '/productos',
    icon: (
      <CodeSandboxOutlined
        style={{
          width: '100%',
          color: '#097A6C',
          fontSize: 'xxx-large',
          marginBottom: 10,
        }}
      />
    ),
  },
  {
    name: 'Ordenes',
    route: '/ordenes',
    icon: (
      <BarcodeOutlined
        style={{
          width: '100%',
          color: '#097A6C',
          fontSize: 'xxx-large',
          marginBottom: 10,
        }}
      />
    ),
  },
];

const Menu = () => {
  return (
    <ModulesList
      size="small"
      dataSource={modules}
      renderItem={(module) => (
        <Link to={module.route}>
          <ModuleContainer>
            {module.icon}
            {module.name}
          </ModuleContainer>
        </Link>
      )}
    />
  );
};

export default Menu;
