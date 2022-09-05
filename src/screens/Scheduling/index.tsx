import { BackButton } from '../../components/BackButton';
import theme from '../../styles/theme';
import * as S from './styles';

import ArrowSvg from '../../assets/arrow.svg';
import { StatusBar } from "react-native";
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';


export function Scheduling() {
  return (
    <S.Container>
      <S.Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor='transparent'
        />

        <BackButton color={theme.colors.background_secondary} />

        <S.Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </S.Title>

        <S.RentalPeriod>
          <S.DateInfo>
            <S.DateTitle>DE</S.DateTitle>
            <S.DateValue>22/09/2022</S.DateValue>
          </S.DateInfo>

          <ArrowSvg />

          <S.DateInfo>
            <S.DateTitle>ATÉ</S.DateTitle>
            <S.DateValue>22/09/2022</S.DateValue>
          </S.DateInfo>
        </S.RentalPeriod>
      </S.Header>

      <S.Content>
        <Calendar />
      </S.Content>

      <S.Footer>
        <Button title="Confirm" />
      </S.Footer>

    </S.Container>
  );
}