import styled from 'styled-components';

const FiltersContainer = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const FiltersBar = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;

  > * {
    margin: 5px;
  }
`;

export {FiltersContainer, FiltersBar};
