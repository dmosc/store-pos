import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  .ant-table-content {
    overflow-x: scroll;
  }
`;

const TurnsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export {Container, TurnsContainer};
