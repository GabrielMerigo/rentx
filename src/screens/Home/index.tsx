import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import Logo from '../../assets/logo.svg'
import { RFValue } from 'react-native-responsive-fontsize'

import * as S from './styles';
import { CarCard } from "../../components/CarCard";
import { useNavigation } from "@react-navigation/native";
import api from '../../services/api';
import { useQuery } from "react-query";
import Loader from "../../components/Load";
import { Ionicons } from "@expo/vector-icons";
import theme from "../../styles/theme";


type AccessoryType = {
  name: string,
  type: string,
}

export type CarsType = {
  about: string
  accessories: AccessoryType[],
  brand: string,
  fuel_type: string,
  id: string,
  name: string,
  photos: string[],
  rent: {
    period: string,
    price: number,
  },
  thumbnail: string,
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

  function handleOpenMyCars() {
    navigate('MyCars' as never);
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

          <S.TotalCars>
            Total of {cars?.length} cars
          </S.TotalCars>
        </S.HeaderContent>
      </S.Header>

      {isLoading ? (
        <Loader />
      ) : (
        <S.CarList
          data={cars}
          keyExtractor={(item: CarsType) => String(item.id)}
          renderItem={({ item }: ItemList) => <CarCard onPress={() => handleCarDetails(item)} {...item} />}
        />
      )}

      <S.MyCarsButton onPress={handleOpenMyCars}>
        <Ionicons
          name="ios-car-sport"
          size={38}
          color={theme.colors.shape}
        />
      </S.MyCarsButton>

    </S.Container>
  )
}