import React from 'react';
import {Button, Form, InputNumber, Modal} from 'antd';
import PropTypes from 'prop-types';

const ProductQuantityModal = ({
  currentProduct,
  setCurrentProduct,
  modifyProductUnits,
}) => {
  const onFinish = (values) => {
    modifyProductUnits(currentProduct.id, values.units);
    setCurrentProduct(undefined);
  };

  return (
    <Modal
      visible={currentProduct !== undefined}
      footer={null}
      title={`Modificando unidades de ${currentProduct?.name}`}
      onCancel={() => setCurrentProduct(undefined)}
    >
      <Form onFinish={onFinish}>
        <Form.Item
          name="units"
          rules={[
            {
              required: true,
              message: 'Es necesario ingresar un número entero!',
            },
          ]}
        >
          <InputNumber
            autoFocus
            label="Unidades"
            style={{width: '75%'}}
            placeholder="Ingrese unidades del producto"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Modificar
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

ProductQuantityModal.propTypes = {
  currentProduct: PropTypes.object,
  setCurrentProduct: PropTypes.func.isRequired,
  modifyProductUnits: PropTypes.func.isRequired,
};

ProductQuantityModal.defaultProps = {
  currentProduct: undefined,
};

export default ProductQuantityModal;
