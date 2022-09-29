import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css, DefaultTheme } from "styled-components/native";

export const Container = styled.View`
  ${({ theme }) => css`
    flex: 1;
    background-color: ${theme.colors.background_primary};
  `}
`;

export const Header = styled.View`
  ${({ theme }) => css`
    width: 100%;
    height: 227px;
    background-color: ${theme.colors.header};
    padding: 0 24px;
    align-items: center;
  `}
`;

export const HeaderTop = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: ${getStatusBarHeight() + 32}px;
`;

export const HeaderTitle = styled.Text`
  ${({ theme }) => css`
    font-size: ${RFValue(25)}px;
    font-family: ${theme.fonts.secondary_600};
    color: ${theme.colors.background_secondary};
  `}
`;

export const LogoutButton = styled.TouchableOpacity`

`;

export const PhotoContainer = styled.View`
  ${({ theme }) => css`
    width: 180px;
    height: 180px;
    border-radius: 90px;
    margin-top: 48px;

    background-color: ${theme.colors.shape};
  `}
`;

export const Photo = styled.Image`
  width: 180px;
  height: 180px;
  border-radius: 90px;
`;

export const PhotoButton = styled.TouchableOpacity`
  ${({ theme }) => css`
    width: 40px;
    height: 40px;

    background-color: ${theme.colors.main};
    justify-content: center;
    align-items: center;

    position: absolute;
    bottom: 10px;
    right: 10px;
  `}
`;

type OptionProps = {
  active: boolean;
};

export const Content = styled.View`
  flex: 1;
  padding: 0 24px;
  margin-top: 122px;
`;

export const ContentHeader = styled.View`
  ${({ theme }) => css`
    border-bottom-width: 1px;
    border-bottom-color: ${theme.colors.line};

    flex-direction: row;
    justify-content: space-around;

    margin-bottom: 24px;
  `}
`;

const wrapperModifiers = {
  activeTitle: (theme: DefaultTheme) => css`
    font-family: ${theme.fonts.secondary_600};
    color: ${theme.colors.header};
  `,
  activeOption: (theme: DefaultTheme) => css`
    border-bottom-width: 3px;
    border-bottom-color: ${theme.colors.main};
    padding-bottom: 14px;
  `
}

export const Option = styled.TouchableOpacity<OptionProps>`
  ${({ active, theme }) => css`
    ${active && wrapperModifiers.activeOption(theme)}
  `}
`;


export const OptionTitle = styled.Text<OptionProps>`
  ${({ theme, active }) => css`
    font-size: ${RFValue(20)}px;
    font-family: ${theme.fonts.secondary_500};
    color: ${theme.colors.text_detail};

    ${active && wrapperModifiers.activeTitle(theme)}
  `}
`;
