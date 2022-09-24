import styled, { css } from "styled-components/native";

type ContainerProps = {
  active: boolean;
}

export const Container = styled.View<ContainerProps>`
  ${({ theme, active }) => css`
    width: 6px;
    height: 6px;

    background-color: ${active ? theme.colors.title : theme.colors.shape};
    margin-right: 8px;
    border-radius: 3px;
  `}
`;