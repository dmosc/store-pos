import React, {useState} from 'react';
import shortid from 'shortid';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import PropTypes from 'prop-types';
import {buildBreadcrumb} from 'utils/functions';
import {EditOutlined} from '@ant-design/icons';
import {Button, Card, Col, Row, Table, Tag, Tooltip, Typography} from 'antd';
import TitleTable from './table-title';
import {Container} from './elements';
import {useLocation} from 'react-router-dom';
import ProductModal from './components/newProductModal';

const {Title} = Typography;

const Products = ({products}) => {
  const [search, setSearch] = useState('');
  const [showProductModal, setShowProductModal] = useState(false);
  const location = useLocation();

  const columns = [
    {
      title: 'SKU',
      dataIndex: 'SKU',
      key: 'SKU',
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },

    {
      title: 'Categorias',
      key: 'categories',
      dataIndex: 'categories',
      // eslint-disable-next-line react/display-name
      render: (categories) => (
        <>
          {categories.map((category) => {
            return (
              <Tag color="green" key={shortid.generate()}>
                {category}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Precio',
      dataIndex: 'price',
      key: 'price',
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
  if (products !== undefined) {
    return (
      <Container>
        {buildBreadcrumb(['menu', location.pathname.substring(1)])}
        <Card>
          <Table
            scroll={{y: 340}}
            title={() => (
              <TitleTable
                search={search}
                setSearch={setSearch}
                setShowProductModal={setShowProductModal}
              />
            )}
            dataSource={products.map((product) => ({
              key: products.id,
              ...product,
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
        <ProductModal
          showProductModal={showProductModal}
          setShowProductModal={setShowProductModal}
        />
      </Container>
    );
  }
  return null;
};

Products.propTypes = {
  products: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    products: state.firestore.ordered.Productos,
    profile: state.firebase.profile,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    // if (props.profile.userID === undefined) return [];

    return [
      {
        collection: 'Productos',
        where: ['companyID', '==', 'prueba'],
      },
    ];
  }),
)(Products);
