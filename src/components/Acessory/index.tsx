import React from 'react';
import { SvgProps } from 'react-native-svg';

import * as S from './styles';

type AcessoryProps = {
  name: string;
  icon: React.FC<SvgProps>;
}

export function Acessory({ name, icon: Icon }: AcessoryProps) {

  return (
    <S.Container>
      <Icon width={32} height={32} />
      <S.Name>{name}</S.Name>
    </S.Container>
  )
}