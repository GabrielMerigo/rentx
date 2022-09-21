import React from "react";
import { ActivityIndicator, TouchableOpacityProps } from "react-native";
import theme from "../../styles/theme";
import * as S from './styles';

type ButtonProps = {
  title: string;
  color?: string;
  disabled?: boolean;
  loading?: boolean;
  light?: boolean;
} & TouchableOpacityProps

export function Button({ 
  title, 
  color, 
  loading, 
  light, 
  disabled = false, 
  ...rest 
}: ButtonProps) {
  return (
    <S.Container 
      {...rest}
      disabled={disabled} 
      color={color} 
      style={{ opacity: (disabled === true || loading === true) ? 0.5 : 1 }}
    >
    {loading
      ? <ActivityIndicator color={theme.colors.shape} />
      : <S.Title light={light}>{title}</S.Title>
    }

    </S.Container>
  )
}