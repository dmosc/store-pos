import React from 'react';
import {Button, Form, InputNumber} from 'antd';
import {LoginOutlined} from '@ant-design/icons';

const TurnInit = ({turnInit}) => {
  return (
    <Form layout="vertical" onFinish={turnInit}>
      <Form.Item
        name="initialCash"
        rules={[{required: true, message: 'Ingrese efectivo en caja!'}]}
        label="Efectivo en caja"
      >
        <InputNumber
          step={0.1}
          style={{width: '100%'}}
          parser={(value) => value.replace(/\$\s?|[a-zA-Z]|(,*)/g, '')}
        />
      </Form.Item>
      <Form.Item>
        <Button
          block
          type="primary"
          htmlType="submit"
          icon={<LoginOutlined style={{color: '#FFFFFF'}} />}
        >
          Iniciar turno
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TurnInit;
