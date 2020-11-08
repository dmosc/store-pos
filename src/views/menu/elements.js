import styled from 'styled-components';
import {List} from 'antd';

const ModulesList = styled(List)`
  ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px;
    padding: 4rem;
  }
`;

const ModuleContainer = styled.div`
  width: 100%;
  min-width: 100%;
  height: fit-content;
  text-align: center;
  padding: 100px 0;
  border-radius: 5px;
  font-weight: 600;
  background-color: ${(props) => props.color ?? 'none'};
  box-shadow: 0 0 1rem 0 rgba(136, 152, 170, 0.5);
`;

export {ModulesList, ModuleContainer};
