import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import * as S from './styles';

type ConfirmButtonProps = {
  title: string;
} & TouchableOpacityProps;

export function ConfirmButton({ title = "OK", ...rest }: ConfirmButtonProps) {
  return (
    <S.Container {...rest}>
      <S.Title>{title}</S.Title>
    </S.Container>
  )
}