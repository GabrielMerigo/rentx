import { BackButton } from '../../components/BackButton';
import theme from '../../styles/theme';
import * as S from './styles';

import ArrowSvg from '../../assets/arrow.svg';
import { Alert, StatusBar } from "react-native";
import { Button } from '../../components/Button';
import { Calendar, DayProps, generateInterval, MarkedDateProps } from '../../components/Calendar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { format } from 'date-fns';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { RouteParams } from '../CarDetails';

type RentalPeriod = {
  startFormatted: string;
  endFormatted: string;
}

export function Scheduling() {
  const [lastDataSelected, setLastDataSelected] = useState<DayProps>({} as DayProps);
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
  const { navigate, goBack } = useNavigation();
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

  const route = useRoute();
  const { car } = route.params as RouteParams;

  function handleConfirmRental() {
    if (!rentalPeriod.startFormatted || !rentalPeriod.endFormatted) {
      return Alert.alert('Selecione o intervalo para alugar...')
    }
    navigate('SchedulingDetails' as never, {
      car,
      dates: Object.keys(markedDates)
    } as never);
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastDataSelected.timestamp ? date : lastDataSelected;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastDataSelected(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy')
    })
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
          Choose a rental {'\n'}
          start and end date {'\n'}
        </S.Title>

        <S.RentalPeriod>
          <S.DateInfo>
            <S.DateTitle>FROM THE</S.DateTitle>
            <S.DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.startFormatted}
            </S.DateValue>
          </S.DateInfo>

          <ArrowSvg />

          <S.DateInfo>
            <S.DateTitle>TO THE</S.DateTitle>
            <S.DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </S.DateValue>
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
        <Button disabled={!rentalPeriod.startFormatted} title="Confirm" onPress={handleConfirmRental} />
      </S.Footer>

    </S.Container>
  );
}