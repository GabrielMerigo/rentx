import { KeyboardAvoidingView, StatusBar, TouchableWithoutFeedback, Keyboard } from "react-native";
import React, { useState } from "react";

import { Button } from '../../components/Button';

import * as S from './styles';
import * as Yup from 'yup';

import theme from "../../styles/theme";
import { useForm } from 'react-hook-form';
import Input from "../../components/Input";

export type FormDataSignIn = {
  email: string;
  password: string;
}

export function SignIn(){
  const schema = Yup.object().shape({
    email: Yup.string()
      .required('E-mail required')
      .email('Digite um e-mail válido'),
    password: Yup.string()
      .required('password required')
  });

  const { control, getValues, handleSubmit } = useForm();
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  function handleSignIn(){
    // handleSubmit()
    console.log(getValues());
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.Container>
          <StatusBar 
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />

          <S.Header>
            <S.Title>
              Estamos{"\n"}quase lá.
            </S.Title>
            <S.Subtitle>
              Faça seu login para começar{"\n"}
              uma experiência incrível.
            </S.Subtitle>
          </S.Header>

          <S.Form>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              iconName="mail"
              placeholder="E-mail" 
              name="email" 
              control={control} 
              rules={{
                required: "Email Required"
              }} 
            />
            
            <Input
              isPasswordVisible={isPasswordVisible}
              setIsPasswordVisible={setIsPasswordVisible}
              isPassword
              autoCorrect={false}
              autoCapitalize="none"
              iconName="lock"
              placeholder="Password" 
              name="password" 
              control={control} 
              secureTextEntry={!!isPasswordVisible}
              rules={{
                required: "Email Required"
              }} 
            />
          </S.Form>

          <S.Footer>
            <Button
              // disabled={}
              title="Login"
              onPress={() => {}}
              loading={false}
            />

            <Button
              color={theme.colors.background_secondary}
              title="Criar conta Gratuita"
              onPress={() => {}}
              light
            />
          </S.Footer>
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}