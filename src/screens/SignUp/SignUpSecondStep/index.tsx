import { useNavigation, useRoute } from '@react-navigation/native'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { BackButton } from '../../../components/BackButton'
import { Button } from '../../../components/Button';
import Input from '../../../components/Input';
import theme from '../../../styles/theme';
import { Bullet } from '../../Bullet';
import * as S from './styles';


type Params = {
  user : {
    name: string;
    email: string;
    driver_license: string;
  }
}

export function SignUpSecondStep() {
  const { goBack } = useNavigation();
  const { control, getValues } = useForm();

  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isPasswordRepeatVisible, setIsPasswordRepeatVisible] = useState(true);
  const route = useRoute();
  const { user } = route.params as Params;

  function handleRegister(){
    const { password, repeat_password } = getValues();

    if(!password || !repeat_password){
      return Alert.alert('You answer the password and repeat password')
    }

    if(!password !== !repeat_password){
      return Alert.alert('Passwords are not equal')
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.Container>
          <S.Header>
            <BackButton onPress={() => goBack()} />
            <S.Steps>
              <Bullet active />
              <Bullet />
            </S.Steps>
          </S.Header>

          <S.Form>
            <S.FormTitle>2. Password</S.FormTitle>
            <Input
              isPassword
              isPasswordVisible={isPasswordVisible}
              setIsPasswordVisible={setIsPasswordVisible}
              name="password"
              control={control}
              iconName='lock'
              placeholder='Password'
              secureTextEntry={!!isPasswordVisible}
            />
            <Input
              isPassword
              isPasswordVisible={isPasswordRepeatVisible}
              setIsPasswordVisible={setIsPasswordRepeatVisible}
              name="repeat_password"
              control={control}
              iconName='lock'
              placeholder='Repeat Password'
              secureTextEntry={!!isPasswordRepeatVisible}
            />
          </S.Form>

          <Button
            onPress={() => handleRegister()}
            color={theme.colors.success}
            title='Register'
          />
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}