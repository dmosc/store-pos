import React from 'react';
import PropTypes from 'prop-types';
import {Input, Typography} from 'antd';
import {TitleContainer} from './elements';

const {Title} = Typography;
const {Search} = Input;

const TableTitle = ({search, setSearch}) => {
  return (
    <TitleContainer>
      <Title level={3}>Órdenes</Title>
      <Search
        style={{width: 250, margin: 'auto 0px auto auto'}}
        allowClear
        value={search}
        placeholder="Buscar órden"
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
};

export default TableTitle;
