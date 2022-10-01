import { useNavigation } from '@react-navigation/native';
import { BackButton } from '../../components/BackButton';
import { Feather } from '@expo/vector-icons';
import theme from '../../styles/theme';
import * as S from './styles';
import { useState } from 'react';
import Input from '../../components/Input';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useAuth } from '../../hooks/auth';
import * as ImagePicker from 'expo-image-picker';

export function Profile(){
  const { goBack } = useNavigation();
  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] = useState(true);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(true);
  const [isRepeatNewPasswordVisible, setIsRepeatNewPasswordVisible] = useState(true);
  const { control } = useForm();

  const { user } = useAuth();
  const [avatar, setAvatar] = useState(user.avatar);

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

  function handleBack(){
    goBack();
  }

  function handleSignIn(){
    
  }

  function handleSignOut(){
    
  }

  return (
    <KeyboardAvoidingView behavior="position">
      <TouchableWithoutFeedback>
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
              <S.Option onPress={() => setOption('dataEdit')} active={option === 'dataEdit'}>
                <S.OptionTitle active={option === 'dataEdit'}>Data</S.OptionTitle>
              </S.Option>
              <S.Option onPress={() => setOption('passwordEdit')} active={option === 'passwordEdit'}>
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
                    name="cnh"
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
          </S.Content>
        </S.Container>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}