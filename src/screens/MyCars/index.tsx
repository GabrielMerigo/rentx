import { useNavigation } from "@react-navigation/native";
import { FlatList, StatusBar } from "react-native";
import React from "react";
import { useQuery } from "react-query";
import { BackButton } from "../../components/BackButton";
import api from "../../services/api";
import theme from "../../styles/theme";
import { CarsType } from "../Home";
import { AntDesign } from '@expo/vector-icons';

import * as S from "./styles";
import { CarCard } from "../../components/CarCard";
import { LoadAnimation } from "../../components/LoadAnimation";


type CarProps = {
  id: string;
  user_id: string;
  car: CarsType;
  startDate: string;
  endDate: string;
}

export function MyCars() {
  const { goBack } = useNavigation();

  const { data: cars, isLoading } = useQuery<CarProps[]>('cars_users', async () => {
    const response = await api.get('/schedules_byuser?user_id=1');
    return response.data;
  });

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
              <S.CarWrapper>
                <CarCard {...item.car} />
                <S.CarFooter>
                  <S.CarFooterTitle>Period</S.CarFooterTitle>
                  <S.CarFooterPeriod>
                    <S.CarFooterDate>{item.startDate}</S.CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <S.CarFooterDate>{item.endDate}</S.CarFooterDate>
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