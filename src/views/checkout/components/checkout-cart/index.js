import React, {useState} from 'react';
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

const {Text, Title} = Typography;
const {confirm} = Modal;

const AddProduct = () => {
  const [SKU, setSKU] = useState(undefined);

  const addProductWithSKU = () => {
    // Fetch product with SKU and add it to cart.
  };

  return (
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
  );
};

const CheckoutCart = ({cart, cartSummary, setCart, modifyProductUnits}) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [client, setClient] = useState('');
  const deleteCart = () => {
    confirm({
      title: `¿Estás seguro de que deseas eliminar el contenido del carrito?`,
      okType: 'danger',
      okText: 'Continuar',
      cancelText: 'Cancelar',
      onOk: async () => setCart([]),
      onCancel: () => {},
    });
  };

  return (
    <Card
      title="Carrito"
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
          header={<AddProduct />}
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
                    <Text>{`x${units} = ${(product.price * units).toFixed(
                      2,
                    )}`}</Text>
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
          <Input
            style={{marginTop: 10}}
            prefix={<PhoneOutlined />}
            placeholder="Celular del cliente"
            onChange={({target: {value}}) => setClient(value)}
          />
          <Button
            type="primary"
            block
            style={{margin: '5px 0px'}}
            disabled={cartSummary.total === 0}
            onClick={() => setShowPaymentModal(true)}
          >
            Proceder al pago
          </Button>
        </Card>
      </CheckoutCartContainer>
      <PaymentModal
        cart={cart}
        setClient={setClient}
        client={client}
        cartSummary={cartSummary}
        showPaymentModal={showPaymentModal}
        setCart={setCart}
        setShowPaymentModal={setShowPaymentModal}
      />
    </Card>
  );
};

CheckoutCart.propTypes = {
  cart: PropTypes.array.isRequired,
  cartSummary: PropTypes.object.isRequired,
  setCart: PropTypes.func.isRequired,
  modifyProductUnits: PropTypes.func.isRequired,
};

export default CheckoutCart;
