import styled from 'styled-components';

const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1px;
`;

const PaymentMethodsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  > * {
    margin: 5px;
  }
`;

const ProductsListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  grid-gap: 20px;
  margin: 30px 0;
`;

const FiltersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  > * {
    margin: 5px;
  }
`;

export {
  RowContainer,
  PaymentMethodsContainer,
  ProductsListContainer,
  FiltersContainer,
};
