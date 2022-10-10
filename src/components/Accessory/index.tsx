import React from 'react';
import { SvgProps } from 'react-native-svg';
import theme from '../../styles/theme';

import * as S from './styles';

type AcessoryProps = {
  name: string;
  icon: any;
}

export function Accessory({ name, icon: Icon }: AcessoryProps) {
  return (
    <S.Container>
      <Icon width={32} height={32} fill={theme.colors.header}/>
      <S.Name>{name}</S.Name>
    </S.Container>
  )
}