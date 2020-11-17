import React from 'react';
import PropTypes from 'prop-types';
import {PlusOutlined} from '@ant-design/icons';
import {Button, Input, Typography} from 'antd';
import {TitleContainer} from './elements';

const {Title} = Typography;
const {Search} = Input;

const TableTitle = ({search, setSearch, setShowProductModal}) => {
  return (
    <TitleContainer>
      <Title style={{margin: 'auto 10px'}} level={3}>
        Productos
      </Title>
      <Search
        style={{width: 250, margin: 'auto 10px auto auto'}}
        allowClear
        value={search}
        placeholder="Buscar Prodructo"
        onChange={({target: {value}}) => setSearch(value)}
      />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setShowProductModal(true)}
      >
        Producto
      </Button>
    </TitleContainer>
  );
};

TableTitle.defaultProps = {
  search: '',
};

TableTitle.propTypes = {
  setSearch: PropTypes.func.isRequired,
  search: PropTypes.string,
  setShowProductModal: PropTypes.func.isRequired,
};

export default TableTitle;
