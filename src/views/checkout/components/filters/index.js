import React from 'react';
import {FiltersBar, FiltersContainer} from './elements';
import {Avatar, Input, Select} from 'antd';
import {RedditOutlined} from '@ant-design/icons';
import PropTypes from 'prop-types';

const {Search} = Input;
const {Option} = Select;

const Filters = ({filters, setFilters, categories}) => {
  return (
    <FiltersContainer>
      <FiltersBar>
        <Select
          style={{width: '100%'}}
          placeholder="Filtrar por categoría"
          allowClear
          onSelect={(category) => setFilters({...filters, category})}
          onClear={() => setFilters({...filters, category: 'Todo'})}
        >
          {categories.map((category) => (
            <Option key={category.id} value={category.name}>
              {category.name}
            </Option>
          ))}
        </Select>
        <Search
          placeholder="Buscar producto"
          style={{width: '100%'}}
          onChange={({target: {value: search}}) =>
            setFilters({...filters, search})
          }
        />
      </FiltersBar>
      <Avatar shape="square" size="large" icon={<RedditOutlined />} />
    </FiltersContainer>
  );
};

Filters.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
};

export default Filters;
