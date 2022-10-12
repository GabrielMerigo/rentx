import { useNavigation, useIsFocused } from "@react-navigation/native";
import { FlatList, StatusBar } from "react-native";
import React from "react";
import { useQuery } from "react-query";
import { BackButton } from "../../components/BackButton";
import api from "../../services/api";
import theme from "../../styles/theme";
import { CarsType } from "../Home";
import { AntDesign } from '@expo/vector-icons';
import { format, parseISO } from 'date-fns';

import * as S from "./styles";
import { CarCard } from "../../components/CarCard";
import { LoadAnimation } from "../../components/LoadAnimation";
import { Car as ModelCar } from '../../database/model/Car';


type CarProps = {
  id: string;
  user_id: string;
  car: CarsType;
  startDate: string;
  endDate: string;
}

type DataProps = {
  id: string;
  car: ModelCar;
  start_date: string;
  end_date: string;
}

export function MyCars() {
  const { goBack } = useNavigation();
  const screenFocused = useIsFocused();

  const { data: cars, isLoading } = useQuery<DataProps[]>(
    ['cars_users', screenFocused],
    async () => {
      const response = await api.get('/rentals');
      const dataFormatted = response.data.map((data: DataProps) => {
        return {
          car: data.car,
          start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
          end_date: format(parseISO(data.end_date), 'dd/MM/yyyy')
        }
      })
      return dataFormatted;
    }
  );

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

        <S.SubTitle>
          Conforto, segurança e praticidade
        </S.SubTitle>
      </S.Header>

      <S.Content>
        <S.Appointments>
          <S.AppointmentsTitle>Agendamentos feitos</S.AppointmentsTitle>
          <S.AppointmentsQuantity>{cars?.length}</S.AppointmentsQuantity>
        </S.Appointments>

        {isLoading ? (
          <LoadAnimation />
        ) : (
          <FlatList
            data={cars}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <S.CarWrapper key={item.id}>
                <CarCard data={item.car} />
                <S.CarFooter>
                  <S.CarFooterTitle>Period</S.CarFooterTitle>
                  <S.CarFooterPeriod>
                    <S.CarFooterDate>{item.start_date}</S.CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <S.CarFooterDate>{item.end_date}</S.CarFooterDate>
                  </S.CarFooterPeriod>
                </S.CarFooter>
              </S.CarWrapper>
            )}
          />
        )}

      </S.Content>
    </S.Container>
  )
}