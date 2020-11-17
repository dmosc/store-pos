import React, {useState} from 'react';
import firebase from 'firebase';
import {Button, Form, Input} from 'antd';
import {LockOutlined, LoginOutlined, UserOutlined} from '@ant-design/icons';

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(usernameOrEmail, password)
      .then(() => {})
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <Form
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '30%',
      }}
      onFinish={handleSubmit}
    >
      <Form.Item style={{marginBottom: 20}}>
        <Input
          prefix={
            <UserOutlined type="user" style={{color: 'rgba(0,0,0,.25)'}} />
          }
          placeholder="Email o nombre de usuario"
          onChange={({target: {value}}) => setUsernameOrEmail(value)}
        />
      </Form.Item>
      <Form.Item style={{marginBottom: 20}}>
        <Input
          prefix={<LockOutlined style={{color: 'rgba(0,0,0,.25)'}} />}
          type="password"
          placeholder="Contraseña"
          onChange={({target: {value}}) => setPassword(value)}
        />
      </Form.Item>
      <Form.Item style={{marginTop: 20}}>
        <Button
          style={{width: '100%'}}
          type="primary"
          htmlType="submit"
          icon={<LoginOutlined style={{color: '#FFFFFF'}} />}
        ></Button>
      </Form.Item>
      <div style={{color: 'red', textAlign: 'center'}}>{error}</div>
    </Form>
  );
};

export default Login;
