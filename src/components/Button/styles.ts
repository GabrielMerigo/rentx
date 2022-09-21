import { TouchableOpacityProps } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css, DefaultTheme } from "styled-components/native";

type ContainerProps = {
  color: string;
  light: boolean;
} & TouchableOpacityProps;

const wrapperModifiers = {
  light: (theme: DefaultTheme) => css`
    color: ${theme.colors.header};
  `,
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  ${({ theme, color }) => css`
    width: 100%;

    padding: 19px;
    align-items: center;
    justify-content: center;

    background-color: ${color ? color : theme.colors.main};
  `}
`;

export const Title = styled.Text<Pick<ContainerProps, 'light'>>`
  ${({ theme, light }) => css`
    font-family: ${theme.fonts.primary_500};
    font-size: ${RFValue(15)}px;
    color: ${theme.colors.shape};

    ${light && wrapperModifiers.light(theme)}
  `}
`;