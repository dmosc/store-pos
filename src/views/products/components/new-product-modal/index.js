import React, {useState, useEffect} from 'react';
import firebase from 'firebase';
import {Button, Form, Input, Modal, Select} from 'antd';
import PropTypes from 'prop-types';

const ClientRegisterModal = ({showProductModal, setShowProductModal}) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories.
    const mockCategories = ['Bufandas', 'Zapatos', 'Guisos'];
    setCategories(mockCategories);
  }, []);

  const addProduct = (info) => {
    const db = firebase.firestore();

    db.collection('Productos')
      .doc()
      .set({
        SKU: info.SKU,
        name: info.name,
        categories: [info.category[0]],
        price: info.price,
        companyID: 'prueba',
        inventory: 100,
        hasDiscount: 0,
      })
      .then(() => {
        form.resetFields();
        setShowProductModal(false);
      });
  };

  return (
    <Modal
      title="Registrar nuevo cliente"
      visible={showProductModal}
      footer={null}
      onCancel={() => setShowProductModal(false)}
    >
      <Form onFinish={addProduct} form={form}>
        <Form.Item
          label="SKU"
          name="SKU"
          rules={[{required: true, message: 'Ingrese el SKU'}]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Nombre"
          name="name"
          rules={[{required: true, message: 'Ingrese nombre de producto'}]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Precio"
          name="price"
          rules={[{required: true, message: 'Ingrese precio de producto'}]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Categoría"
          name="category"
          rules={[{required: true, message: 'Ingrese categoria del producto'}]}
        >
          <Select mode="tags" style={{width: '100%'}}>
            {categories.map((category) => (
              <Select.Option key={category}>{category}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Registrar
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

ClientRegisterModal.propTypes = {
  showProductModal: PropTypes.bool.isRequired,
  setShowProductModal: PropTypes.func.isRequired,
};

export default ClientRegisterModal;
