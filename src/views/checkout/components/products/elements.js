import styled from 'styled-components';
import {Typography} from 'antd';

const {Paragraph} = Typography;

const ProductsListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 10px;
  margin: 0;
`;

const ProductName = styled(Paragraph)`
  font-size: 1em;
  height: 3em;
  white-space: normal;
  word-wrap: break-word;
  font-weight: bolder;
`;

export {ProductsListContainer, ProductName};
