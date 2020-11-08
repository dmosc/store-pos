import React, {useState} from 'react';
import {Button, Input, InputNumber, List, Modal} from 'antd';
import PropTypes from 'prop-types';
import {
  PaymentMethodContainer,
  PaymentMethodList,
  PaymentModalFooter,
} from './elements';
import {PAYMENT_METHODS, PAYMENT_TYPES} from 'utils/constants';
import {couponMock} from '../../../../demo-data';

const {confirm} = Modal;

const PaymentModal = ({
  showPaymentModal,
  setShowPaymentModal,
  payment,
  setPayment,
}) => {
  const [paymentMethod, setPaymentMethod] = useState(undefined);
  const [paymentContent, setPaymentContent] = useState(undefined);

  const submitPayment = () => {
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
        }

        setPaymentMethod(undefined);
        setShowPaymentModal(false);
        setPayment({...payment, [paymentMethod]: paymentContentToSet});
      },
      onCancel: () => {},
    });
  };

  return (
    <Modal
      title="Seleccionar un método de pago"
      visible={showPaymentModal}
      onCancel={() => {
        setPaymentMethod(undefined);
        setShowPaymentModal(false);
      }}
      footer={
        <PaymentModalFooter>
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
            <Button
              onClick={() => {
                setPaymentMethod(undefined);
                setShowPaymentModal(false);
              }}
            >
              Cancelar
            </Button>
            <Button disabled={!paymentMethod} onClick={submitPayment}>
              Continuar
            </Button>
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
              color={
                !paymentMethod || method.type === paymentMethod
                  ? method.color
                  : '#D9D9D9'
              }
              onClick={() => setPaymentMethod(method.type)}
            >
              {method.name}
            </PaymentMethodContainer>
          </List.Item>
        )}
      />
    </Modal>
  );
};

PaymentModal.propTypes = {
  showPaymentModal: PropTypes.bool.isRequired,
  setShowPaymentModal: PropTypes.func.isRequired,
  payment: PropTypes.object.isRequired,
  setPayment: PropTypes.func.isRequired,
};

export default PaymentModal;
