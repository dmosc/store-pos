import styled from 'styled-components';
import {List} from 'antd';

const PaymentMethodList = styled(List)`
  ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const PaymentMethodContainer = styled.div`
  width: 100%;
  height: fit-content;
  text-align: center;
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  border-radius: 5px;
  font-weight: 600;
  background-color: ${(props) => (props.selected ? 'transparent' : '#D9D9D9')};
  box-shadow: 0 0 1rem 0 rgba(136, 152, 170, 0.5);
`;

const PaymentModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

export {PaymentMethodList, PaymentMethodContainer, PaymentModalFooter};
