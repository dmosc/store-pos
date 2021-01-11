import React, {useState} from 'react';
import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  List,
  message,
  Modal,
  Tooltip,
  Typography,
} from 'antd';
import {
  DeleteOutlined,
  LoginOutlined,
  MinusOutlined,
  EditOutlined,
  PhoneOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  AddProductContainer,
  CheckoutCartContainer,
  RowContainer,
} from './elements';
import PaymentModal from './components/payment-modal';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import ClientRegisterModal from './components/client-register-modal';
import ProductQuantityModal from './components/product-quantity-modal';

const {Text, Title} = Typography;
const {confirm} = Modal;
const db = firebase.firestore();

const AddProduct = ({setClient, addProductToCart}) => {
  const [SKU, setSKU] = useState(undefined);
  const [cellphone, setCellphone] = useState(undefined);
  const [showClientRegisterModal, setShowClientRegisterModal] = useState(false);

  const getClient = () => {
    db.collection('Clientes')
      .where('phone', '==', cellphone)
      .onSnapshot(function (querySnapshot) {
        let clientToSet;
        querySnapshot.forEach(function (doc) {
          clientToSet = doc.data();
        });
        if (!clientToSet) {
          message.info(`El número ${cellphone} no está registrado!`);
          setShowClientRegisterModal(true);
        } else {
          message.success(`Bienvenido ${clientToSet.firstName}!`);
          setClient(clientToSet);
          setCellphone(undefined);
        }
      });
  };

  const addProductWithSKU = () => {
    db.collection('Productos')
      .where('SKU', '==', SKU)
      .onSnapshot(function (querySnapshot) {
        let productToSet;
        querySnapshot.forEach(function (doc) {
          productToSet = doc.data();
        });
        if (!productToSet) {
          message.error(`No existe ningún producto con el SKU ${SKU}`);
        } else {
          message.success(`Producto ${SKU} agregado exitosamente!`);
          addProductToCart(productToSet);
        }
      });
    setSKU(undefined);
  };

  return (
    <>
      <AddProductContainer>
        <Tooltip
          title="Verificar cliente con celular o inicar registro"
          trigger="focus"
        >
          <Input
            style={{width: '80%', marginBottom: 5}}
            prefix={<PhoneOutlined />}
            value={cellphone}
            placeholder="Celular del cliente"
            onChange={({target: {value}}) => setCellphone(value)}
          />
        </Tooltip>
        <Button
          type="primary"
          icon={<LoginOutlined style={{color: '#FFFFFF'}} />}
          onClick={getClient}
          disabled={!cellphone}
        />
      </AddProductContainer>
      <AddProductContainer>
        <Form onFinish={addProductWithSKU} layout="inline">
          <Form.Item>
            <Input
              prefix={<EditOutlined />}
              placeholder="SKU"
              name="SKU"
              value={SKU}
              onChange={({target: {value}}) => setSKU(value)}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              icon={<PlusOutlined style={{color: '#FFFFFF'}} />}
              onClick={addProductWithSKU}
              disabled={!SKU}
            />
          </Form.Item>
        </Form>
      </AddProductContainer>
      <ClientRegisterModal
        showClientRegisterModal={showClientRegisterModal}
        setShowClientRegisterModal={setShowClientRegisterModal}
        cellphone={cellphone}
        setCellphone={setCellphone}
        setClient={setClient}
      />
    </>
  );
};

const CheckoutCart = ({
  cart,
  cartSummary,
  setCart,
  client,
  useDebt,
  setClient,
  setUseDebt,
  modifyProductUnits,
  addProductToCart,
}) => {
  const [payment, setPayment] = useState({
    cash: 0,
    card: 0,
    coupon: 0,
    debt: 0,
  });
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(undefined);

  const resetCheckout = () => {
    setCart([]);
    setClient({debt: 0});
    setShowPaymentModal(false);
    setUseDebt(true);
    setPayment({cash: 0, card: 0, coupon: 0, debt: 0});
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

  return (
    <Card
      title={client.firstName ? `Carrito de ${client.firstName}` : 'Carrito'}
      style={{height: '100%'}}
      extra={
        <Button
          type="danger"
          icon={<DeleteOutlined style={{color: '#FFFFFF'}} />}
          onClick={deleteCart}
        />
      }
    >
      <CheckoutCartContainer>
        <List
          header={
            <AddProduct
              setClient={setClient}
              addProductToCart={addProductToCart}
            />
          }
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
                  onClick={() => modifyProductUnits(product.id, units - 1)}
                />,
                <Button
                  key={1}
                  type="secondary"
                  icon={<EditOutlined />}
                  onClick={() => setCurrentProduct(product)}
                />,
                <Button
                  key={1}
                  type="primary"
                  icon={<PlusOutlined style={{color: '#FFFFFF'}} />}
                  onClick={() => modifyProductUnits(product.id, units + 1)}
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
            <Title level={4}>Total</Title>
            <Text strong>{`$${cartSummary.total}`}</Text>
          </RowContainer>
          <RowContainer>
            <Checkbox checked={!useDebt} onChange={() => setUseDebt(!useDebt)}>
              Ignorar deuda
            </Checkbox>
          </RowContainer>
          <Button
            type="secondary"
            block
            disabled={cartSummary.total === 0}
            onClick={() => setShowPaymentModal(true)}
          >
            Proceder al pago
          </Button>
        </Card>
      </CheckoutCartContainer>
      <PaymentModal
        showPaymentModal={showPaymentModal}
        setShowPaymentModal={setShowPaymentModal}
        payment={payment}
        setPayment={setPayment}
        cart={cart}
        client={client}
        resetCheckout={resetCheckout}
        cartSummary={cartSummary}
      />
      <ProductQuantityModal
        currentProduct={currentProduct}
        setCurrentProduct={setCurrentProduct}
        modifyProductUnits={modifyProductUnits}
      />
    </Card>
  );
};

AddProduct.propTypes = {
  setClient: PropTypes.func.isRequired,
  addProductToCart: PropTypes.func.isRequired,
};

CheckoutCart.propTypes = {
  cart: PropTypes.array.isRequired,
  cartSummary: PropTypes.object.isRequired,
  setCart: PropTypes.func.isRequired,
  client: PropTypes.object,
  setClient: PropTypes.func.isRequired,
  modifyProductUnits: PropTypes.func.isRequired,
  addProductToCart: PropTypes.func.isRequired,
};

export default CheckoutCart;
