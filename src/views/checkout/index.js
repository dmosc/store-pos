import React from 'react';
import {
  List,
  Avatar,
  Card,
  Col,
  Row,
  Typography,
  Button,
  Input,
  Select,
} from 'antd';
import {
  MailOutlined,
  CreditCardOutlined,
  PlusOutlined,
  MinusOutlined,
  RedditOutlined,
  DollarOutlined,
} from '@ant-design/icons';
import {
  FiltersContainer,
  PaymentMethodsContainer,
  ProductsListContainer,
  RowContainer,
} from './elements';
import {categories, productsList} from './demo-data';

const {Title, Text} = Typography;
const {Search} = Input;
const {Meta} = Card;
const {Option} = Select;

const Checkout = () => {
  return (
    <Row>
      <Col span={16} style={{padding: 10}}>
        <Row style={{height: '10vh', marginBottom: 20}}>
          <Card style={{width: '100%'}}>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Avatar shape="square" size="large" icon={<RedditOutlined />} />
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <Text strong>{`Dinero en caja: $100`}</Text>
                <Text strong>{`Transacciones del día: 15`}</Text>
              </div>
            </div>
          </Card>
        </Row>
        <Row style={{marginBottom: 10, height: '70vh'}}>
          <Card style={{width: '100%', height: '100%', overflow: 'scroll'}}>
            <FiltersContainer>
              <Select
                mode="tags"
                style={{width: '50%'}}
                placeholder="Filtrar por categoría"
                allowClear
              >
                {categories.map((category) => (
                  <Option key={category}>{category}</Option>
                ))}
              </Select>
              <Search placeholder="Buscar producto" style={{width: '50%'}} />
            </FiltersContainer>
            <ProductsListContainer>
              {productsList &&
                productsList.map((product) => (
                  <Card
                    key={product.id}
                    cover={
                      <img
                        alt={product.name}
                        src={product.image}
                        height={100}
                      />
                    }
                  >
                    <Meta
                      title={
                        <div
                          style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Text>{product.name}</Text>
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'flex-start',
                            }}
                          >
                            <Text>{`$${product.price}`}</Text>
                            <Text disabled>{`x ${product.unit}`}</Text>
                          </div>
                        </div>
                      }
                      description={product.description}
                    />
                  </Card>
                ))}
            </ProductsListContainer>
          </Card>
        </Row>
        <Row gutter={[15, 15]} style={{height: '15vh'}}>
          <Col span={12}>
            <Card style={{textAlign: 'center', height: '100%'}}>
              <Title strong level={2}>
                AD
              </Title>
            </Card>
          </Col>
          <Col span={12}>
            <Card style={{textAlign: 'center', height: '100%'}}>
              <Title strong level={2}>
                AD
              </Title>
            </Card>
          </Col>
        </Row>
      </Col>
      <Col span={8} style={{height: '100vh'}}>
        <Card title="Carrito" style={{height: '100%'}}>
          <div
            style={{
              height: '85vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <List
              style={{height: '50vh', overflow: 'scroll', marginBottom: 30}}
              dataSource={productsList}
              renderItem={(product) => (
                <List.Item
                  key={product.id}
                  actions={[
                    <Button
                      key={1}
                      type="danger"
                      icon={<MinusOutlined style={{color: '#FFFFFF'}} />}
                    />,
                    <Button
                      key={1}
                      type="primary"
                      icon={<PlusOutlined style={{color: '#FFFFFF'}} />}
                    />,
                  ]}
                >
                  <List.Item.Meta
                    title={product.name}
                    description={
                      <div style={{display: 'flex', flexDirection: 'column'}}>
                        <Text disabled>{product.description}</Text>
                        <Text>x2 = 340</Text>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
            <Card>
              <RowContainer>
                <Title level={5}>Subtotal</Title>
                <Text>$100</Text>
              </RowContainer>
              <RowContainer>
                <Title level={5}>Descuentos</Title>
                <Text>$100</Text>
              </RowContainer>
              <RowContainer>
                <Title level={5}>I.V.A</Title>
                <Text>$100</Text>
              </RowContainer>
              <RowContainer>
                <Title level={4}>Total</Title>
                <Text strong>$100</Text>
              </RowContainer>
              <Input
                style={{marginTop: 10}}
                prefix={<MailOutlined />}
                placeholder="Email o nombre de usuario"
              />
              <PaymentMethodsContainer>
                <Button
                  style={{
                    width: '100%',
                    marginLeft: 0,
                    background: 'orange',
                    borderColor: 'orange',
                  }}
                  icon={<CreditCardOutlined style={{color: '#FFFFFF'}} />}
                />
                <Button
                  style={{
                    width: '100%',
                    marginRight: 0,
                    background: 'green',
                    borderColor: 'green',
                  }}
                  icon={<DollarOutlined style={{color: '#FFFFFF'}} />}
                />
              </PaymentMethodsContainer>
            </Card>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default Checkout;
