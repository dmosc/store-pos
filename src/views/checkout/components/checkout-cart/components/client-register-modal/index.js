import React, {useState} from 'react';
import {Button, Form, Input, Modal} from 'antd';
import PropTypes from 'prop-types';
import {PlusOutlined} from '@ant-design/icons';

const ClientRegisterModal = ({
  showClientRegisterModal,
  setShowClientRegisterModal,
  cellphone,
  setCellphone,
  setClient,
}) => {
  const [loading, setLoading] = useState(false);

  const registerClient = (clientInfo) => {
    setLoading(true);

    // Register user
    const clientToSet = {...clientInfo, debt: 0};

    setLoading(false);
    setShowClientRegisterModal(false);
    setCellphone(undefined);
    setClient(clientToSet);
  };

  return (
    <Modal
      title="Registrar nuevo cliente"
      visible={showClientRegisterModal}
      footer={null}
      onCancel={() => setShowClientRegisterModal(false)}
    >
      <Form initialValues={{cellphone}} onFinish={registerClient}>
        <Form.Item
          label="Nombre(s)"
          name="firstName"
          rules={[{required: true, message: 'Un nombre es necesario!'}]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Apellido(s)"
          name="lastName"
          rules={[{required: true, message: 'Un apellido es necesario!'}]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Correo electrónico"
          name="email"
          rules={[{required: true, message: 'Un correo es necesario!'}]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Celular"
          name="cellphone"
          rules={[{required: true, message: 'Un celular es necesario!'}]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            icon={<PlusOutlined style={{color: '#FFFFFF'}} />}
            loading={loading}
          >
            {(loading && 'Espere...') || 'Registrar'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

ClientRegisterModal.propTypes = {
  showClientRegisterModal: PropTypes.bool.isRequired,
  setShowClientRegisterModal: PropTypes.func.isRequired,
  cellphone: PropTypes.string,
  setCellphone: PropTypes.func.isRequired,
  setClient: PropTypes.func.isRequired,
};

export default ClientRegisterModal;
