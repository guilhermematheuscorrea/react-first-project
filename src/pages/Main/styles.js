import styled from 'styled-components';

export const Title = styled.h1`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 24px;
  color: ${(props) => (props.error ? '#ff0000' : '#7159c1')};

  small {
    font-size: 14px;
    color: #333;
  }
`;
