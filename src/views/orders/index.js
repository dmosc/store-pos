import React, {useState} from 'react';
import shortid from 'shortid';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import {buildBreadcrumb} from 'utils/functions';
import {Card, Col, Row, Table, Tag, Typography} from 'antd';
import TitleTable from './table-title';
import {Container} from './elements';
import {useLocation} from 'react-router-dom';

const {Title} = Typography;

const Orders = ({orders}) => {
  const [search, setSearch] = useState('');
  const location = useLocation();

  const columns = [
    {
      title: 'Fecha',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (createdDate) => moment(createdDate).format('ll'),
    },
    {
      title: 'Cliente',
      dataIndex: 'client',
      key: 'client',
    },

    {
      title: 'Productos',
      key: 'cart',
      dataIndex: 'cart',
      // eslint-disable-next-line react/display-name
      render: (cart) => (
        <>
          {cart.map((cart) => {
            return (
              <Tag color="green" key={shortid.generate()}>
                {cart.product.name}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (total) => '$' + total,
    },
  ];
  if (orders !== undefined) {
    return (
      <Container>
        {buildBreadcrumb(['menu', location.pathname.substring(1)])}
        <Card>
          <Table
            scroll={{y: 340}}
            title={() => <TitleTable search={search} setSearch={setSearch} />}
            dataSource={orders.map((order) => ({
              key: order.id,
              ...order,
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

Orders.propTypes = {
  orders: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    orders: state.firestore.ordered.Ordenes,
    profile: state.firebase.profile,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    // if (props.profile.userID === undefined) return [];

    return [
      {
        collection: 'Ordenes',
        where: ['companyID', '==', 'prueba'],
      },
    ];
  }),
)(Orders);
