import { KeyboardAvoidingView, StatusBar, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import React, { useState } from "react";

import { Button } from '../../components/Button';

import * as S from './styles';
import * as Yup from 'yup';

import theme from "../../styles/theme";
import { useForm } from 'react-hook-form';
import Input from "../../components/Input";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/auth";

export type FormDataSignIn = {
  email: string;
  password: string;
}


export function SignIn(){
  const { signIn } = useAuth();
  const { control, getValues } = useForm<FormDataSignIn>();
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const { navigate } = useNavigation();

  async function handleSignIn(){
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail required')
          .email('Type an email valid'),
        password: Yup.string()
          .required('Password required')
      })
  
      const { email, password } = getValues();
  
      await schema.validate({ email, password });
      Alert.alert('Everything OK!');

      signIn({
        email,
        password
      })

    } catch (error: any) {
      Alert.alert('Atention', error.message)
    }
  }

  function handleSignUp(){
    navigate('SignUpFirstStep' as never, { } as never);
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
              control={control as any} 
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
              control={control as any} 
              secureTextEntry={!!isPasswordVisible}
            />
          </S.Form>

          <S.Footer>
            <Button
              // disabled={}
              title="Login"
              onPress={() => handleSignIn()}
              loading={false}
            />

            <Button
              color={theme.colors.background_secondary}
              title="Criar conta Gratuita"
              onPress={() => handleSignUp()}
              light
            />
          </S.Footer>
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}