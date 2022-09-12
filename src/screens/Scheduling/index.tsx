import { BackButton } from '../../components/BackButton';
import theme from '../../styles/theme';
import * as S from './styles';

import ArrowSvg from '../../assets/arrow.svg';
import { StatusBar } from "react-native";
import { Button } from '../../components/Button';
import { Calendar, DayProps, generateInterval, MarkedDateProps } from '../../components/Calendar';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

export function Scheduling() {
  const [lastData, setLastData] = useState<DayProps>({} as DayProps);
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
  const { navigate, goBack } = useNavigation();

  function handleConfirmRental() {
    navigate('SchedulingDetails' as never, {} as never);
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastData.timestamp ? date : lastData;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastData(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);
  }


  return (
    <S.Container>
      <S.Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor='transparent'
        />

        <BackButton onPress={() => goBack()} color={theme.colors.background_secondary} />

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
        <Calendar
          markedDates={markedDates}
          onDayPress={handleChangeDate as any}
        />
      </S.Content>

      <S.Footer>
        <Button title="Confirm" onPress={handleConfirmRental} />
      </S.Footer>

    </S.Container>
  );
}