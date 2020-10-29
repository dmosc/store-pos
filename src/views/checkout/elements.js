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

export {RowContainer, PaymentMethodsContainer};
