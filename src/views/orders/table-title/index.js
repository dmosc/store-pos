import React from 'react';
import PropTypes from 'prop-types';
import {Input, Typography} from 'antd';
import {TitleContainer} from './elements';

const {Title} = Typography;
const {Search} = Input;

const TableTitle = ({search, setSearch}) => {
  return (
    <TitleContainer>
      <Title style={{margin: 'auto 10px'}} level={3}>
        Ordenes
      </Title>
      <Search
        style={{width: 250, margin: 'auto 10px auto auto'}}
        allowClear
        value={search}
        placeholder="Buscar Orden"
        onChange={({target: {value}}) => setSearch(value)}
      />
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
