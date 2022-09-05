import React from "react";
import { TouchableOpacityProps } from "react-native";
import * as S from './styles';

type ButtonProps = {
  title: string;
  color?: string;
} & TouchableOpacityProps

export function Button({ title, color, ...rest }: ButtonProps) {
  return (
    <S.Container {...rest}>
      <S.Title>{title}</S.Title>
    </S.Container>
  )
}