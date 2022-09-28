import React, { useEffect } from "react";
import { BackHandler, StatusBar, StyleSheet } from "react-native";
import Logo from '../../assets/logo.svg'
import { RFValue } from 'react-native-responsive-fontsize'

import * as S from './styles';
import { CarCard } from "../../components/CarCard";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "react-query";

import theme from "../../styles/theme";
import api from '../../services/api';

import { useSharedValue } from 'react-native-reanimated';
import { LoadAnimation } from "../../components/LoadAnimation";

type AccessoryType = {
  id: string;
  name: string,
  type: string,
}

export type CarsType = {
  about: string
  brand: string,
  fuel_type: string,
  id: string,
  name: string,
  period: string,
  price: number,
  thumbnail: string,
  accessories: AccessoryType[],
  photos: {
    id: string;
    photo: string;
  }[];
}

type ItemList = {
  item: CarsType
}

export function Home() {
  const { navigate } = useNavigation();

  const { data: cars, isLoading } = useQuery<CarsType[]>('cars', async () => {
    const response = await api.get('/cars');
    return response.data;
  });

  function handleCarDetails(car: CarsType) {
    navigate('CarDetails' as never, { car } as never);
  }

  return (
    <S.Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor='transparent'
      />

      <S.Header>
        <S.HeaderContent>
          <Logo
            width={RFValue(108)}
            height={RFValue(12)}
          />
          {!isLoading && (
            <S.TotalCars>
              Total of {cars?.length} cars
            </S.TotalCars>
          )}
        </S.HeaderContent>
      </S.Header>

      {isLoading ? (
        <LoadAnimation />
      ) : (
        <S.CarList
          data={cars}
          keyExtractor={(item: CarsType) => String(item.id)}
          renderItem={({ item }: ItemList) => <CarCard onPress={() => handleCarDetails(item)} {...item} />}
        />
      )}
    </S.Container>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.main
  }
})