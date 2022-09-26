import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { BackButton } from '../../../components/BackButton'
import { Button } from '../../../components/Button';
import Input from '../../../components/Input';

import { Bullet } from '../../Bullet';

import * as S from './styles'
import * as Yup from 'yup';

export function SignUpFirstStep(){
  const { goBack, navigate } = useNavigation();
  const { control, getValues } = useForm();

  async function handleNextStep(){
    try {
      const schema = Yup.object().shape({ 
        driver_license: Yup.string().required('Driver License is required'),
        email: Yup.string().email('E-mail is invalid').required('E-mail is required'),
        name: Yup.string().required('Name is required')
      })

      const { name, email, driver_license } = getValues();
      await schema.validate({ name, email, driver_license })

      navigate('SignUpSecondStep' as never, { user: { name, email, driver_license } } as never);
    } catch (error) {
      if(error instanceof Yup.ValidationError){
        return Alert.alert('Attention', error.message);
      }
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
              <Bullet  />
            </S.Steps>
          </S.Header>

          <S.Title>
            Create your{'\n'}account
          </S.Title>

          <S.Subtitle>
            Register quickly and easily
          </S.Subtitle>

          <S.Form>
            <S.FormTitle>1. Dados</S.FormTitle>
            <Input
              name="name"
              control={control}
              iconName='user' 
              placeholder='Name'
            />
            <Input
              name="email"
              control={control}
              iconName='mail' 
              placeholder='E-mail'
              keyboardType='email-address'
            />
            <Input
              name="driver_license"
              control={control}
              iconName='credit-card' 
              placeholder='CNH'
              keyboardType='numeric'
            />
          </S.Form>

          <Button
            title='Next'
            onPress={() => handleNextStep()}
          />
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}