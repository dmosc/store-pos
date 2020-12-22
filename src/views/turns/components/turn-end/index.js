import React from 'react';
import {Button, Form, Divider, Typography} from 'antd';
import {fixDecimals} from 'utils/functions';
import {LogoutOutlined} from '@ant-design/icons';

const {Title, Text} = Typography;

const TurnEnd = ({turn, date, turnEnd}) => {
  return (
    <Form layout="vertical" onFinish={turnEnd}>
      <Form.Item style={{marginBottom: 0}}>
        <Divider orientation="right" style={{marginTop: 0}}>
          <Text strong>Resumen</Text>
        </Divider>
        <Title level={5}>{`Turno inició: ${
          turn?.start.toLocaleTimeString() || 0
        }`}</Title>
        <Title level={5}>{`Turno termina: ${date.toLocaleTimeString()}`}</Title>
        <Title level={5}>{`Transacciones: ${turn?.transactions || 0}`}</Title>
        <Title level={5}>{`Efectivo inicial: $${fixDecimals(
          turn?.initialCash || 0,
        )}`}</Title>
      </Form.Item>
      <Form.Item>
        <Divider orientation="right">
          <Text strong>Corte de caja</Text>
        </Divider>
        <Title level={5}>{`Efectivo: $${fixDecimals(turn?.cash || 0)}`}</Title>
        <Title level={5}>{`Tarjeta: $${fixDecimals(turn?.card || 0)}`}</Title>
        <Title level={5}>{`Deuda: $${fixDecimals(turn?.debt || 0)}`}</Title>
        <Title level={5}>{`Cupones: $${fixDecimals(turn?.coupon || 0)}`}</Title>
        <Title level={4}>{`Total: $${fixDecimals(turn?.total || 0)}`}</Title>
      </Form.Item>
      <Form.Item>
        <Button
          block
          type="primary"
          htmlType="submit"
          icon={<LogoutOutlined style={{color: '#FFFFFF'}} />}
        >
          Terminar turno
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TurnEnd;
