import { RFValue } from "react-native-responsive-fontsize";
import styled, { css, DefaultTheme } from "styled-components/native";

const wrapperModifiers = {
  isFocus: (theme: DefaultTheme) => css`
    border-bottom-width: 2px;
    border-bottom-color: ${theme.colors.main};
  `
}

type WrapperProps = {
  isFocus: boolean;
}

export const Input = styled.TextInput<WrapperProps>`
  ${({ theme, isFocus }) => css`
    width: 100%;
    height: 56px;
    background-color: ${theme.colors.background_secondary};
    flex: 1;
    color: ${theme.colors.text};
    font-family: ${theme.fonts.primary_400};
    font-size: ${RFValue(15)}px;
    padding: 0 20px;

    ${isFocus && wrapperModifiers.isFocus(theme)};
  `}
`;

export const IconContainer = styled.View<WrapperProps>`
  ${({ theme, isFocus }) => css`
    height: 56px;
    width: 55px;
    justify-content: center;
    align-items: center;

    margin-right: 1px;
    background-color: ${theme.colors.background_secondary};
    ${isFocus && wrapperModifiers.isFocus(theme)};
  `}
`;

export const Wrapper = styled.View<WrapperProps>`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
  `}
`;