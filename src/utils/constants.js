import React from 'react';
import {
  CreditCardOutlined,
  DollarOutlined,
  ScissorOutlined,
  TagOutlined,
} from '@ant-design/icons';

const TAX = 0.16;

const PAYMENT_TYPES = {
  cash: 'cash',
  card: 'card',
  coupon: 'coupon',
  debt: 'debt',
};

const PAYMENT_METHODS = [
  {
    name: 'EFECTIVO',
    type: PAYMENT_TYPES.cash,
    color: '#3FAB35',
    // eslint-disable-next-line react/display-name
    icon: (props) => <DollarOutlined {...props} />,
  },
  {
    name: 'TARJETA',
    type: PAYMENT_TYPES.card,
    color: '#5985F3',
    // eslint-disable-next-line react/display-name
    icon: (props) => <CreditCardOutlined {...props} />,
  },
  {
    name: 'CUPÓN',
    type: PAYMENT_TYPES.coupon,
    color: '#FF0000',
    // eslint-disable-next-line react/display-name
    icon: (props) => <ScissorOutlined {...props} />,
  },
  {
    name: 'DEUDA',
    type: PAYMENT_TYPES.debt,
    color: '#6041D1',
    // eslint-disable-next-line react/display-name
    icon: (props) => <TagOutlined {...props} />,
  },
];

export {TAX, PAYMENT_TYPES, PAYMENT_METHODS};
