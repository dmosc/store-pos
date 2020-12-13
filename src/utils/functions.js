import {
  BarcodeOutlined,
  CodeSandboxOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import {Breadcrumb} from 'antd';
import React from 'react';

const fixDecimals = (number = 0) => {
  if (typeof number !== 'number') return 0;
  return parseFloat(number.toFixed(2));
};

const paths = new Map([
  [
    'menu',
    <>
      <HomeOutlined />
      <Link to="/">Menú</Link>
    </>,
  ],
  [
    'checkout',
    <>
      <ShoppingCartOutlined />
      <Link to="/checkout">Tienda</Link>
    </>,
  ],
  [
    'productos',
    <>
      <CodeSandboxOutlined />
      <Link to="/distributors">Productos</Link>
    </>,
  ],
  [
    'ordenes',
    <>
      <BarcodeOutlined />
      <Link to="/distributors">Órdenes</Link>
    </>,
  ],
]);

const buildBreadcrumb = (locations) => {
  return (
    <Breadcrumb style={{marginBottom: 5}}>
      {locations.map((location) => {
        if (paths.has(location)) {
          return (
            <Breadcrumb.Item key={location}>
              {paths.get(location)}
            </Breadcrumb.Item>
          );
        }
        return undefined;
      })}
    </Breadcrumb>
  );
};

export {fixDecimals, buildBreadcrumb};
