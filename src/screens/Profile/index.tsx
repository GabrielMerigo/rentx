import { useNavigation } from '@react-navigation/native';
import { BackButton } from '../../components/BackButton';
import { Feather } from '@expo/vector-icons';
import theme from '../../styles/theme';
import { useState } from 'react';
import Input from '../../components/Input';
import { useForm } from 'react-hook-form';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useAuth } from '../../hooks/auth';
import { Button } from '../../components/Button';

import * as S from './styles';
import * as ImagePicker from 'expo-image-picker';
import * as Yup from 'yup';
import { useNetInfo } from '@react-native-community/netinfo';

export function Profile(){
  const { goBack } = useNavigation();
  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] = useState(true);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(true);
  const [isRepeatNewPasswordVisible, setIsRepeatNewPasswordVisible] = useState(true);
  const { control, getValues } = useForm();
  const netInfo = useNetInfo();

  const { user, signOut, updateUser } = useAuth();
  const [avatar, setAvatar] = useState(user.avatar);

  function handleBack(){
    goBack();
  }

  async function handleSelectAvatar() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1
    })

    if(result.cancelled) return;

    if(result.uri) {
      setAvatar(result.uri);
    }
  }

  async function handleProfileUpdate(){
    try {
      const schema = Yup.object().shape({ 
        driver_license: Yup.string().required('Driver License is required'),
        name: Yup.string().required('Name is required')
      });

      const { name, driver_license } = getValues();
      const dataForm = { name, driver_license };

      await updateUser({
        id: user.id,
        user_id: user.user_id,
        email: user.email,
        name,
        driver_license,
        avatar,
        token: user.token
      });

      Alert.alert('Profile updated!')

    } catch (error) {
      if(error instanceof Yup.ValidationError){
        Alert.alert('Opa', error.message);
      }else{
        Alert.alert('It was not possible update your profile! Please try again.')
      }
    }
  }

  function handleSignOut(){
    Alert.alert(
      'Are you sure you want to sign out?',
      'Remember, if you sign out, you will need internet to connect again.',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: 'Confirm',
          onPress: () => signOut()
        }
      ]
    )
  }

  function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
    if(netInfo.isConnected === false && optionSelected === 'passwordEdit') {
      return Alert.alert('You are offline', 'To change your password, connect to the Internet');
    }

    setOption(optionSelected);
  }

  return (
    <KeyboardAvoidingView behavior="position">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.Container>
          <S.Header>
            <S.HeaderTop>
              <BackButton color={theme.colors.shape} onPress={handleBack} />
              <S.HeaderTitle>Editar Perfil</S.HeaderTitle>
              <S.LogoutButton onPress={handleSignOut}>
                <Feather name="power" size={24} color={theme.colors.shape} />
              </S.LogoutButton>
            </S.HeaderTop>
            <S.PhotoContainer>
              {!!avatar && <S.Photo source={{ uri: avatar }} />}
              <S.PhotoButton onPress={handleSelectAvatar}>
                <Feather 
                  name="camera" 
                  size={24}
                  color={theme.colors.shape}
                />
              </S.PhotoButton>
            </S.PhotoContainer>
          </S.Header>

          <S.Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <S.ContentHeader>
              <S.Option onPress={() => handleOptionChange('dataEdit')} active={option === 'dataEdit'}>
                <S.OptionTitle active={option === 'dataEdit'}>Data</S.OptionTitle>
              </S.Option>
              <S.Option onPress={() => handleOptionChange('passwordEdit')} active={option === 'passwordEdit'}>
                <S.OptionTitle active={option === 'passwordEdit'}>Change Password</S.OptionTitle>
              </S.Option>
            </S.ContentHeader>
            {option === 'dataEdit' ? (
                <S.Section>
                  <Input
                    name="name"
                    control={control}
                    iconName="user"
                    placeholder="Name"
                    autoCorrect={false}
                    defaultValue={user.name}
                  />
                  <Input
                    name="email"
                    control={control}
                    editable={false}
                    iconName="mail"
                    defaultValue={user.email}
                  />
                  <Input
                    name="driver_license"
                    control={control}
                    iconName="credit-card"
                    placeholder="CNH"
                    defaultValue={user.driver_license}
                  />
                </S.Section>
            ) : (
              <S.Section>
                <Input
                  name="current_password"
                  control={control}
                  iconName="lock"
                  placeholder="Current Password"
                  autoCorrect={false}
                  isPassword
                  isPasswordVisible={isCurrentPasswordVisible}
                  setIsPasswordVisible={setIsCurrentPasswordVisible}
                  secureTextEntry={!!isCurrentPasswordVisible}
                />
                <Input
                  name="new_password"
                  control={control}
                  iconName="lock"
                  placeholder="New Password"
                  autoCorrect={false}
                  isPassword
                  isPasswordVisible={isNewPasswordVisible}
                  setIsPasswordVisible={setIsNewPasswordVisible}
                  secureTextEntry={!!isNewPasswordVisible}
                />
                <Input
                  name="repeat_new_password"
                  control={control}
                  iconName="lock"
                  placeholder="Repeat New Password"
                  autoCorrect={false}
                  isPassword
                  isPasswordVisible={isRepeatNewPasswordVisible}
                  setIsPasswordVisible={setIsRepeatNewPasswordVisible}
                  secureTextEntry={!!isRepeatNewPasswordVisible}
                />
              </S.Section>
            )}

            <Button
              title="Salvar alterações"
              onPress={handleProfileUpdate}
            />
          </S.Content>
        </S.Container>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}