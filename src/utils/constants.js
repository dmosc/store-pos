const TAX = 0.16;

const PAYMENT_TYPES = {
  cash: 'cash',
  card: 'card',
  coupon: 'coupon',
};

const PAYMENT_METHODS = [
  {name: 'EFECTIVO', type: PAYMENT_TYPES.cash, color: '#3FAB35'},
  {name: 'TARJETA', type: PAYMENT_TYPES.card, color: '#5985F3'},
  {name: 'CUPÓN', type: PAYMENT_TYPES.coupon, color: '#FF0000'},
];

export {TAX, PAYMENT_TYPES, PAYMENT_METHODS};
