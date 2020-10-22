import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {PlusOutlined} from '@ant-design/icons';
import {Input, Typography, Button} from 'antd';
import {TitleContainer} from './elements';

const {Title} = Typography;
const {Search} = Input;

const TableTitle = ({search, setSearch}) => {
  return (
    <TitleContainer>
      <Title style={{margin: 'auto 10px'}} level={3}>
        Distribuidores
      </Title>
      <Search
        style={{width: 250, margin: 'auto 10px auto auto'}}
        allowClear
        value={search}
        placeholder="Buscar Distribuidor"
        onChange={({target: {value}}) => setSearch(value)}
      />
      <Link to="/services/new">
        <Button type="primary" icon={<PlusOutlined />}>
          Distribuidor
        </Button>
      </Link>
    </TitleContainer>
  );
};

TableTitle.defaultProps = {
  search: '',
};

TableTitle.propTypes = {
  setSearch: PropTypes.func.isRequired,
  search: PropTypes.string,
};

export default TableTitle;
