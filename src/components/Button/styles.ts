import { TouchableOpacityProps } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

type ContainerProps = {
  color: string;
} & TouchableOpacityProps;

export const Container = styled.TouchableOpacity<ContainerProps>`
  ${({ theme, color }) => css`
    width: 100%;

    padding: 19px;
    align-items: center;
    justify-content: center;

    background-color: ${color ? color : theme.colors.main};
  `}
`;

export const Title = styled.Text`
  ${({ theme  }) => css`
    font-family: ${theme.fonts.primary_500};
    font-size: ${RFValue(15)}px;
    color: ${theme.colors.shape};
  `}
`;