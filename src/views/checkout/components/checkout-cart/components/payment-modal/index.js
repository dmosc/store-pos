import React, {useEffect, useState} from 'react';
import {Button, Form, InputNumber, Modal} from 'antd';
import {fixDecimals} from 'utils/functions';
import {connect} from 'react-redux';
import {createOrder} from '../../../../../../redux/Actions/dashActions';
import PropTypes from 'prop-types';

const {confirm} = Modal;

const PaymentModal = ({
  cartSummary,
  showPaymentModal,
  setCart,
  setShowPaymentModal,
  createOrder,
  cart,
  client,
  setClient,
}) => {
  const [payment, setPayment] = useState({cash: 0, card: 0});
  const [balance, setBalance] = useState(cartSummary.total || 0);

  useEffect(() => {
    setBalance(fixDecimals(cartSummary.total - payment.cash - payment.card));
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
        createOrder(cartSummary, cart, client);
        setCart([]);
        setClient('');
        setShowPaymentModal(false);
        setPayment({cash: 0, card: 0});
      },
      onCancel: () => {},
    });
  };
  const balanceToDisplay = balance < 0 ? `(${Math.abs(balance)})` : balance;

  return (
    <Modal
      title={`Cargo pendiente: $${balanceToDisplay}`}
      visible={showPaymentModal}
      okText="Finalizar cobro"
      cancelText="Cancelar"
      onCancel={() => {
        setShowPaymentModal(false);
      }}
      footer={null}
    >
      <Form.Item label="Cantidad con efectivo">
        <InputNumber
          step={0.1}
          style={{width: '100%'}}
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          parser={(value) => value.replace(/\$\s?|[a-zA-Z]|(,*)/g, '')}
          onChange={(cash) => setPayment({...payment, cash})}
        />
      </Form.Item>
      <Form.Item label="Cantidad con tarjeta">
        <InputNumber
          step={0.1}
          style={{width: '100%'}}
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          parser={(value) => value.replace(/\$\s?|[a-zA-Z]|(,*)/g, '')}
          onChange={(card) => setPayment({...payment, card})}
        />
      </Form.Item>
      <Button
        type="primary"
        block
        style={{margin: '5px 0px'}}
        disabled={payment.card + payment.cash < cartSummary.total}
        onClick={submitPayment}
      >
        Finalizar compra
      </Button>
    </Modal>
  );
};

PaymentModal.propTypes = {
  cartSummary: PropTypes.object.isRequired,
  showPaymentModal: PropTypes.bool.isRequired,
  setCart: PropTypes.func.isRequired,
  setShowPaymentModal: PropTypes.func.isRequired,
  createOrder: PropTypes.func.isRequired,
  cart: PropTypes.array.isRequired,
  client: PropTypes.string.isRequired,
  setClient: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    createOrder: (summary, cart, client) =>
      dispatch(createOrder(summary, cart, client)),
  };
};

export default connect(null, mapDispatchToProps)(PaymentModal);
