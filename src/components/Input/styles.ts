import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

export const Container = styled.TextInput`
  ${({ theme }) => css`
    width: 100%;
    height: 56px;
    background-color: ${theme.colors.background_secondary};
    flex: 1;
    color: ${theme.colors.text};
    font-family: ${theme.fonts.primary_400};
    font-size: ${RFValue(15)}px;

    padding: 0 20px;
  `}
`;

export const IconContainer = styled.View`
  ${({ theme }) => css`
    height: 56px;
    width: 55px;
    justify-content: center;
    align-items: center;

    margin-right: 1px;
    background-color: ${theme.colors.background_secondary};
  `}
`;

export const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;