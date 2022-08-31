import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  ${({ theme }) => css`
    flex: 1;
    justify-content: center;
    align-items: center;

    background: ${theme.colors.main};
  `}
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: 30px;
    font-family: ${theme.fonts.secondary_400};
  `}
`;