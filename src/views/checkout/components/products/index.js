import React from 'react';
import {Card, Typography} from 'antd';
import {ProductsListContainer} from './elements';
import PropTypes from 'prop-types';

const {Meta} = Card;
const {Text} = Typography;

const Products = ({products, addProductToCart, filters}) => {
  return (
    <Card style={{width: '100%', height: '100%', overflow: 'scroll'}}>
      <ProductsListContainer>
        {products.map((product) => {
          if (
            filters.category === 'Todo' ||
            product.categories.includes(filters.category)
          ) {
            return (
              <Card key={product.id} onClick={() => addProductToCart(product)}>
                <Meta
                  title={
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Text style={{fontSize: '15px'}}>{product.name}</Text>
                      <Text>{`$${product.price}`}</Text>
                    </div>
                  }
                  description={`SKU: ${product.SKU}`}
                />
              </Card>
            );
          }
        })}
      </ProductsListContainer>
    </Card>
  );
};

Products.propTypes = {
  products: PropTypes.array.isRequired,
  addProductToCart: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
};

export default Products;
