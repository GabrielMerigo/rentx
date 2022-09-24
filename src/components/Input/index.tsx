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
  setIsPasswordVisible?: React.Dispatch<React.SetStateAction<boolean>>;
} & TextInputProps

function Input({ 
  name, 
  control,
  iconName, 
  isPassword, 
  isPasswordVisible, 
  setIsPasswordVisible,
  ...rest 
}: InputProps){
  const [isFocus, setIsFocus] = useState(false);
  function handlePasswordVisibilityChange(){
    setIsPasswordVisible!(!isPasswordVisible);
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <S.Wrapper>
          <S.IconContainer isFocus={isFocus} value={value}>
            <Feather 
              name={iconName} 
              size={24} 
              color={value?.length > 3 || isFocus ? theme.colors.main : theme.colors.text_detail} 
            />
          </S.IconContainer>
          <S.Input
            isFocus={isFocus}
            value={value} 
            onChangeText={(e: any) => {
              onChange(e)
            }}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            {...rest}
          />
          {isPassword && (
              <BorderlessButton onPress={handlePasswordVisibilityChange}>
                <S.IconContainer isFocus={isFocus}>
                  <Feather
                    name={isPasswordVisible ? 'eye' : 'eye-off'} 
                    size={24} 
                    color={theme.colors.text_detail}
                  />
                </S.IconContainer>
              </BorderlessButton>
            )
          }
        </S.Wrapper>
      )}
    />
  )
}

export default Input;