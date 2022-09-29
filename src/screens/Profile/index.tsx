import { useNavigation } from '@react-navigation/native';
import { BackButton } from '../../components/BackButton';
import { Feather } from '@expo/vector-icons';
import theme from '../../styles/theme';
import * as S from './styles';
import { useState } from 'react';

export function Profile(){
  const { goBack } = useNavigation();
  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');

  function handleBack(){
    goBack();
  }

  function handleSignIn(){
    
  }

  function handleSignOut(){
    
  }

  return (
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
          <S.Photo source={{ uri: 'https://avatars.githubusercontent.com/u/72055874?v=4' }} />
          <S.PhotoButton>
            <Feather 
              name="camera" 
              size={24}
              color={theme.colors.shape}
            />
          </S.PhotoButton>
        </S.PhotoContainer>
      </S.Header>

      <S.Content>
        <S.ContentHeader>
          <S.Option onPress={() => setOption('dataEdit')} active={option === 'dataEdit'}>
            <S.OptionTitle active={option === 'dataEdit'}>Data</S.OptionTitle>
          </S.Option>
          <S.Option onPress={() => setOption('passwordEdit')} active={option === 'passwordEdit'}>
            <S.OptionTitle active={option === 'passwordEdit'}>Change Password</S.OptionTitle>
          </S.Option>
        </S.ContentHeader>
      </S.Content>
    </S.Container>
  )
}