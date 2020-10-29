import React, {useEffect, useState} from 'react';
import {useDebounce} from 'use-debounce';
import {Breadcrumb, Card, Col, Row, Typography} from 'antd';
import {categoriesList, productsList} from './demo-data';
import Filters from './components/filters';
import Products from './components/products';
import CheckoutCart from './components/checkout-cart';
import {TAX} from 'utils/constants';
import {fixDecimals} from 'utils/functions';

const {Title} = Typography;

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartSummary, setCartSummary] = useState({
    subtotal: 0,
    discounts: 0,
    tax: 0,
    total: 0,
  });
  const [filters, setFilters] = useState({search: '', category: undefined});
  const debouncedFilters = useDebounce(filters, 1000);

  useEffect(() => {
    // Fetch available categories for store.
    setCategories(categoriesList); // This is the mocked data.
  }, []);

  useEffect(() => {
    // Fetch available products for store.
    // Use variable debouncedFilters to delay request.
    setProducts(productsList); // This is the mocked data.
  }, [debouncedFilters]);

  useEffect(() => {
    let subtotal = 0;
    let discounts = 0;
    let tax = 0;
    let total = 0;
    if (cart.length !== 0) {
      for (const {product, units} of cart) {
        subtotal += product.price * units;
        discounts +=
          (product.hasDiscount ? product.price * product.hasDiscount : 0) *
          units;
      }

      subtotal = fixDecimals(subtotal);
      discounts = fixDecimals(discounts);
      tax = fixDecimals((subtotal - discounts) * TAX);
      total = fixDecimals(subtotal - discounts + tax);
    }

    setCartSummary({subtotal, discounts, tax, total});
  }, [cart]);

  const addProductToCart = (productToSet) => {
    let cartToSet;
    if (cart.some(({product}) => product.id === productToSet.id)) {
      cartToSet = cart.map(({product, units}) => {
        if (product.id === productToSet.id) return {product, units: units + 1};
        else return {product, units};
      });
    } else {
      cartToSet = [{product: productToSet, units: 1}, ...cart];
    }

    setCart(cartToSet);
  };

  const modifyProductUnits = (productId, amount) => {
    const cartToSet = [];
    for (const {product, units} of cart) {
      if (product.id === productId) {
        if (units + amount > 0)
          cartToSet.push({product, units: units + amount});
      } else {
        cartToSet.push({product, units});
      }
    }

    setCart(cartToSet);
  };

  return (
    <Row>
      <Col span={16} style={{padding: 10}}>
        <Breadcrumb>
          <Breadcrumb.Item>Menú</Breadcrumb.Item>
          <Breadcrumb.Item>Tienda</Breadcrumb.Item>
        </Breadcrumb>
        <Row style={{height: '6vh', marginBottom: 10}}>
          <Filters
            filters={filters}
            setFilters={setFilters}
            categories={categories}
          />
        </Row>
        <Row style={{marginBottom: 10, height: '72vh'}}>
          <Products products={products} addProductToCart={addProductToCart} />
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
        <CheckoutCart
          cart={cart}
          cartSummary={cartSummary}
          setCart={setCart}
          modifyProductUnits={modifyProductUnits}
        />
      </Col>
    </Row>
  );
};

export default Checkout;
