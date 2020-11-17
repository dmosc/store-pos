import React, {useEffect, useState} from 'react';
import {Button, Input, InputNumber, List, Modal, Typography} from 'antd';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  PaymentMethodContainer,
  PaymentMethodList,
  PaymentModalFooter,
} from './elements';
import {PAYMENT_METHODS, PAYMENT_TYPES} from 'utils/constants';
import {fixDecimals} from 'utils/functions';
import {createOrder} from 'redux/Actions/dashActions';
import {couponMock} from '../../../../demo-data';

const {confirm} = Modal;
const {Text} = Typography;

const PaymentModal = ({
  showPaymentModal,
  setShowPaymentModal,
  payment,
  setPayment,
  cart,
  client,
  resetCheckout,
  cartSummary,
  newOrder,
}) => {
  const [balance, setBalance] = useState(cartSummary.total || 0);
  const [paymentMethod, setPaymentMethod] = useState(undefined);
  const [paymentContent, setPaymentContent] = useState(undefined);

  useEffect(() => {
    const balanceToSet =
      cartSummary.total -
      (payment.cash + payment.card + payment.coupon + payment.debt);
    setBalance(fixDecimals(balanceToSet));
  }, [payment, cartSummary]);

  const submitPayment = () => {
    confirm({
      title: `¿Estás seguro de que deseas finalizar la compra?`,
      content: 'Una vez finalizada ya no será posible modificarla.',
      okType: 'danger',
      okText: 'Continuar',
      cancelText: 'Cancelar',
      onOk: async () => {
        // Register transaction...
        newOrder(cartSummary, cart, client);
        resetCheckout();
      },
      onCancel: () => {},
    });
  };

  const addPayment = () => {
    confirm({
      title: `¿Estás seguro de agergar el pago?`,
      content: 'Una vez agregado, ya no podrá removerse.',
      okType: 'danger',
      okText: 'Continuar',
      cancelText: 'Cancelar',
      onOk: async () => {
        let paymentContentToSet = paymentContent;
        if (paymentMethod === PAYMENT_TYPES.coupon) {
          // Validate coupon and fetch its monetary value.
          // paymentContent contains the introduced coupon.
          const coupon = {...couponMock};
          paymentContentToSet = coupon.value;
        } else if (paymentMethod === PAYMENT_TYPES.debt) {
          paymentContentToSet = balance;
        }

        setPaymentMethod(undefined);
        setPayment({...payment, [paymentMethod]: paymentContentToSet});
      },
      onCancel: () => {},
    });
  };

  const balanceToDisplay = balance < 0 ? `(${Math.abs(balance)})` : balance;

  return (
    <Modal
      title={
        <div
          style={{display: 'flex', flexDirection: 'column', marginBottom: 0}}
        >
          <Text strong>{`${
            balanceToDisplay >= 0 ? 'Pendiente' : 'Cambio'
          }: $${balanceToDisplay}`}</Text>
          <Text disabled>{`Último pago: `}</Text>
        </div>
      }
      visible={showPaymentModal}
      onCancel={() => {
        setPaymentMethod(undefined);
        setShowPaymentModal(false);
      }}
      footer={
        <PaymentModalFooter>
          {paymentMethod &&
            paymentMethod === PAYMENT_TYPES.debt &&
            addPayment()}
          {paymentMethod &&
            (paymentMethod === PAYMENT_TYPES.cash ||
              paymentMethod === PAYMENT_TYPES.card) && (
              <InputNumber
                step={0.1}
                style={{width: '50%'}}
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|[a-zA-Z]|(,*)/g, '')}
                onChange={(value) => setPaymentContent(value)}
              />
            )}
          {paymentMethod && paymentMethod === PAYMENT_TYPES.coupon && (
            <Input
              style={{width: '50%'}}
              placeholder="Ingresar código del cupón"
              onChange={(value) => setPaymentContent(value)}
            />
          )}
          <div>
            {balance <= 0 && (
              <Button type="primary" onClick={submitPayment}>
                Finalizar
              </Button>
            )}
            {balance > 0 && (
              <>
                <Button
                  onClick={() => {
                    setPaymentMethod(undefined);
                    setShowPaymentModal(false);
                  }}
                >
                  Cancelar
                </Button>
                <Button disabled={!paymentMethod} onClick={addPayment}>
                  Continuar
                </Button>
              </>
            )}
          </div>
        </PaymentModalFooter>
      }
    >
      <PaymentMethodList
        size="small"
        dataSource={PAYMENT_METHODS}
        renderItem={(method) => (
          <List.Item>
            <PaymentMethodContainer
              selected={!paymentMethod || method.type === paymentMethod}
              onClick={() => setPaymentMethod(method.type)}
            >
              {method.icon({
                style: {
                  width: '100%',
                  fontSize: 'x-large',
                  marginBottom: 10,
                  color: method.color,
                },
              })}
              <Text>{method.name}</Text>
            </PaymentMethodContainer>
          </List.Item>
        )}
      />
    </Modal>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    newOrder: (summary, cart, client) =>
      dispatch(createOrder(summary, cart, client)),
  };
};

PaymentModal.propTypes = {
  showPaymentModal: PropTypes.bool.isRequired,
  setShowPaymentModal: PropTypes.func.isRequired,
  payment: PropTypes.object.isRequired,
  setPayment: PropTypes.func.isRequired,
  cart: PropTypes.array.isRequired,
  client: PropTypes.object.isRequired,
  resetCheckout: PropTypes.func.isRequired,
  cartSummary: PropTypes.object.isRequired,
  newOrder: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(PaymentModal);
