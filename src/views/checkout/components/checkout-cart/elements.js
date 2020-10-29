import styled from 'styled-components';

const CheckoutCartContainer = styled.div`
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1px;
`;

const AddProductContainer = styled.div`
  display: flex;
  justify-content: space-between;

  > * {
    margin: 0 5px;
  }
`;

export {RowContainer, CheckoutCartContainer, AddProductContainer};
