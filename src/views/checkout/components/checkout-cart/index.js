import React, {useEffect, useState} from 'react';
import {Button, Card, Input, List, Modal, Typography} from 'antd';
import {
  DeleteOutlined,
  MinusOutlined,
  NumberOutlined,
  PhoneOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  AddProductContainer,
  CheckoutCartContainer,
  RowContainer,
} from './elements';
import PaymentModal from './components/payment-modal';
import PropTypes from 'prop-types';
import {clientMock} from '../../demo-data';
import {fixDecimals} from 'utils/functions';
import {createOrder} from '../../../../redux/Actions/dashActions';
import {connect} from 'react-redux';

const {Text, Title} = Typography;
const {confirm} = Modal;

const AddProduct = ({setClient}) => {
  const [SKU, setSKU] = useState(undefined);
  const [cellphone, setCellphone] = useState(undefined);

  const getClient = () => {
    // Fetch client info and use setClient to set its info.
    setClient(clientMock);
    setCellphone(undefined);
  };

  const addProductWithSKU = () => {
    // Fetch product with SKU and add it to cart.
  };

  return (
    <>
      <AddProductContainer>
        <Input
          style={{width: '80%', marginBottom: 5}}
          prefix={<PhoneOutlined />}
          value={cellphone}
          placeholder="Celular del cliente"
          onChange={({target: {value}}) => setCellphone(value)}
        />
        <Button
          type="primary"
          icon={<PlusOutlined style={{color: '#FFFFFF'}} />}
          onClick={getClient}
          disabled={!cellphone}
        />
      </AddProductContainer>
      <AddProductContainer>
        <Input
          style={{width: '80%'}}
          prefix={<NumberOutlined />}
          placeholder="SKU"
          onChange={({target: {value}}) => setSKU(value)}
        />
        <Button
          type="primary"
          icon={<PlusOutlined style={{color: '#FFFFFF'}} />}
          onClick={addProductWithSKU}
          disabled={!SKU}
        />
      </AddProductContainer>
    </>
  );
};

const CheckoutCart = ({
  cart,
  cartSummary,
  setCart,
  client,
  setClient,
  modifyProductUnits,
}) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [payment, setPayment] = useState({cash: 0, card: 0, coupon: 0});
  const [balance, setBalance] = useState(cartSummary.total || 0);

  useEffect(() => {
    setBalance(fixDecimals(payment.cash + payment.card + payment.coupon));
  }, [payment, cartSummary]);

  const resetCheckout = () => {
    setCart([]);
    setClient({debt: 0});
    setShowPaymentModal(false);
    setPayment({cash: 0, card: 0, coupon: 0});
  };

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
        resetCheckout();
      },
      onCancel: () => {},
    });
  };

  const deleteCart = () => {
    confirm({
      title: `¿Estás seguro de que deseas cancelar la compra?`,
      okType: 'danger',
      okText: 'Continuar',
      cancelText: 'Cancelar',
      onOk: async () => resetCheckout(),
      onCancel: () => {},
    });
  };

  const balanceToDisplay = balance < 0 ? `(${Math.abs(balance)})` : balance;

  return (
    <Card
      title={client.firstName ? `Carrito de ${client.firstName}` : 'Carrito'}
      style={{height: '100%'}}
      extra={
        <Button
          type="danger"
          icon={<DeleteOutlined style={{color: '#FFFFFF'}} />}
          onClick={deleteCart}
          disabled={cart.length === 0}
        />
      }
    >
      <CheckoutCartContainer>
        <List
          header={<AddProduct setClient={setClient} />}
          style={{height: '50vh', overflow: 'scroll', marginBottom: 30}}
          dataSource={cart}
          renderItem={({product, units}) => (
            <List.Item
              key={product.id}
              actions={[
                <Button
                  key={1}
                  type="danger"
                  icon={<MinusOutlined style={{color: '#FFFFFF'}} />}
                  onClick={() => modifyProductUnits(product.id, -1)}
                />,
                <Button
                  key={1}
                  type="primary"
                  icon={<PlusOutlined style={{color: '#FFFFFF'}} />}
                  onClick={() => modifyProductUnits(product.id, 1)}
                />,
              ]}
            >
              <List.Item.Meta
                title={product.name}
                description={
                  <div style={{display: 'flex', flexDirection: 'column'}}>
                    <Text disabled>{product.description}</Text>
                    <Text>
                      {`x${units} = ${(product.price * units).toFixed(2)}`}
                    </Text>
                  </div>
                }
              />
            </List.Item>
          )}
        />
        <Card>
          <RowContainer>
            <Title level={5}>Subtotal</Title>
            <Text>{`$${cartSummary.subtotal}`}</Text>
          </RowContainer>
          <RowContainer>
            <Title level={5}>Deuda</Title>
            <Text>
              {client.debt >= 0
                ? `$${client.debt}`
                : `($${Math.abs(client.debt)})`}
            </Text>
          </RowContainer>
          <RowContainer>
            <Title level={5}>Descuentos</Title>
            <Text>{`$${cartSummary.discounts}`}</Text>
          </RowContainer>
          <RowContainer>
            <Title level={5}>I.V.A</Title>
            <Text>{`$${cartSummary.tax}`}</Text>
          </RowContainer>
          <RowContainer>
            <Title level={4}>Total</Title>
            <Text strong>{`$${cartSummary.total}`}</Text>
          </RowContainer>
          <RowContainer>
            <Text disabled>Pagado</Text>
            <Text strong>{`$${balanceToDisplay}`}</Text>
          </RowContainer>
          <RowContainer>
            <Text disabled>Cambio</Text>
            <Text strong>{`$${
              balanceToDisplay > cartSummary.total
                ? fixDecimals(balanceToDisplay - cartSummary.total)
                : 0
            }`}</Text>
          </RowContainer>
          <Button
            type="secondary"
            block
            style={{margin: '5px 0px'}}
            disabled={cartSummary.total === 0}
            onClick={() => setShowPaymentModal(true)}
          >
            Realizar pago
          </Button>
          <Button
            type="primary"
            block
            style={{margin: '5px 0px'}}
            onClick={submitPayment}
          >
            Finalizar compra
          </Button>
        </Card>
      </CheckoutCartContainer>
      <PaymentModal
        showPaymentModal={showPaymentModal}
        setShowPaymentModal={setShowPaymentModal}
        payment={payment}
        setPayment={setPayment}
      />
    </Card>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createOrder: (summary, cart, client) =>
      dispatch(createOrder(summary, cart, client)),
  };
};

AddProduct.propTypes = {
  setClient: PropTypes.func.isRequired,
};

CheckoutCart.propTypes = {
  cart: PropTypes.array.isRequired,
  cartSummary: PropTypes.object.isRequired,
  setCart: PropTypes.func.isRequired,
  client: PropTypes.object,
  setClient: PropTypes.func.isRequired,
  modifyProductUnits: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(CheckoutCart);
