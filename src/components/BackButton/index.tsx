import React from 'react';

import { MaterialIcons } from '@expo/vector-icons';

import * as S from './styles';
import { useTheme } from 'styled-components';
import { TouchableWithoutFeedbackProps } from 'react-native';

type BackButtonProps = {
  color?: string;
} & TouchableWithoutFeedbackProps

export function BackButton({ color, ...rest }: BackButtonProps){
  const theme = useTheme();

  return (
    <S.Container {...rest}>
      <MaterialIcons 
        name="chevron-left"
        size={24}
        color={color ? color : theme.colors.text}
      />
    </S.Container>
  )
}