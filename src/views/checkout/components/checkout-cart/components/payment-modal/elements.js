import styled from 'styled-components';
import {List} from 'antd';

const PaymentMethodList = styled(List)`
  ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;
  }
`;

const PaymentMethodContainer = styled.div`
  width: 100%;
  height: fit-content;
  text-align: center;
  padding: 30px 15px;
  border-radius: 5px;
  color: #ffffff;
  font-weight: 600;
  background-color: ${(props) => props.color ?? 'none'};
`;

const PaymentModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

export {PaymentMethodList, PaymentMethodContainer, PaymentModalFooter};
