import styled from 'styled-components';

const ProductsListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 10px;
  margin: 0;
`;

export {ProductsListContainer};
