import React, {useState} from 'react';
import shortid from 'shortid';
import {distribuidoresList} from './demo-data';
import moment from 'moment';
import {EditOutlined} from '@ant-design/icons';
import {Table, Tag, Card, Col, Row, Typography, Tooltip, Button} from 'antd';
import TitleTable from './table-title';
import {Container} from './elements';

const {Title} = Typography;

const Distribuidores = () => {
  const [search, setSearch] = useState('');

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ultima Compra',
      dataIndex: 'lastOrder',
      key: 'lastOrder',
      render: (startDate) => moment(startDate).format('ll'),
    },

    {
      title: 'Productos',
      key: 'products',
      dataIndex: 'products',
      // eslint-disable-next-line react/display-name
      render: (products) => (
        <>
          {products.map((producto) => {
            return (
              <Tag color="green" key={shortid.generate()}>
                {producto}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Acciones',
      key: 'action',
      // eslint-disable-next-line react/prop-types
      // eslint-disable-next-line react/display-name
      render: () => (
        <Tooltip title="Editar usuario">
          <Button shape="circle" icon={<EditOutlined />} />
        </Tooltip>
      ),
    },
  ];
  if (distribuidoresList !== undefined) {
    return (
      <Container>
        <Card>
          <Table
            scroll={{y: 340}}
            title={() => <TitleTable search={search} setSearch={setSearch} />}
            dataSource={distribuidoresList.map((distribuidor) => ({
              key: distribuidor.id,
              ...distribuidor,
            }))}
            columns={columns}
          />
        </Card>
        <div style={{padding: '10px'}} />
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
      </Container>
    );
  }
  return null;
};

export default Distribuidores;
