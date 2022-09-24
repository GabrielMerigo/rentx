import { useNavigation } from '@react-navigation/native'
import { BackButton } from '../../../components/BackButton'
import { Bullet } from '../../Bullet';
import * as S from './styles'

export function SignUpFirstStep(){
  const { goBack } = useNavigation();

  return (
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
      </S.Form>
    </S.Container>
  )
}