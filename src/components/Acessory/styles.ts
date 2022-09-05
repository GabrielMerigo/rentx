import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

export const Container = styled.View`
  ${({ theme }) => css`
    width: 109px;
    height: 92px;

    justify-content: center;
    align-items: center;

    background-color: ${theme.colors.background_secondary};
    padding: 16px;
    margin-bottom: 8px;
  `}
`;

export const Name = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.primary_500};
    color: ${theme.colors.text};
    font-size: ${RFValue(13)}px;
  `}
`;