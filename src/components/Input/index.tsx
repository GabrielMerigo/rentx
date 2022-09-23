import { Control, Controller, FieldValues } from 'react-hook-form';
import { Feather } from '@expo/vector-icons';
import { TextInputProps } from 'react-native';
import theme from '../../styles/theme';
import * as S from './styles';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useState } from 'react';

type InputProps = {
  name: string;
  control: Control<FieldValues, any>;
  iconName: React.ComponentProps<typeof Feather>['name']
  isPassword?: boolean;
  isPasswordVisible?: boolean;
  setIsPasswordVisible?: React.Dispatch<React.SetStateAction<boolean>>
  rules: {
    required: string
  }
} & TextInputProps

function Input({ 
  name, 
  control, 
  rules, 
  iconName, 
  isPassword, 
  isPasswordVisible, 
  setIsPasswordVisible,
  ...rest 
}: InputProps){

  function handlePasswordVisibilityChange(){
    setIsPasswordVisible!(!isPasswordVisible);
  }


  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value, onChange } }) => (
        <S.Wrapper>
          <S.IconContainer>
            <Feather name={iconName} size={24} color={theme.colors.text_detail} />
          </S.IconContainer>
          <S.Container value={value} onChangeText={onChange} {...rest} />
          {isPassword && <BorderlessButton onPress={handlePasswordVisibilityChange}>
            <S.IconContainer>
              <Feather name={isPasswordVisible ? 'eye' : 'eye-off'} size={24} color={theme.colors.text_detail} />
            </S.IconContainer>
            </BorderlessButton> 
          }
        </S.Wrapper>
      )}
    />
  )
}

export default Input;