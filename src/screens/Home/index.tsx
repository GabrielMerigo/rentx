import React, { useCallback } from "react";
import { StatusBar } from "react-native";
import Logo from '../../assets/logo.svg'
import { RFValue } from 'react-native-responsive-fontsize'
import { useNetInfo } from '@react-native-community/netinfo';

import * as S from './styles';
import { CarCard } from "../../components/CarCard";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useQuery } from "react-query";
import { synchronize } from '@nozbe/watermelondb/sync';

import api from '../../services/api';

import { LoadAnimation } from "../../components/LoadAnimation";
import { database } from "../../database";
import { Car as ModelCar } from "../../database/model/Car";

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
  item: ModelCar
}

export function Home() {
  const { navigate } = useNavigation();
  const netInfo = useNetInfo();

  const { data: cars, isLoading } = useQuery('cars', async () => {
    const carCollection = database.get<ModelCar>('cars');
    const carsResponse = await carCollection.query().fetch();

    return carsResponse as unknown as ModelCar[];
  });

  function handleCarDetails(car: CarsType) {
    navigate('CarDetails' as never, { car } as never);
  }

  async function offlineSynchronize(){
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const { data } = await api.get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);
        const { changes, latestVersion } = data;

        return { changes, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        await api.post('/users/sync', user);
      }
    })
  }

  useFocusEffect(useCallback(() => {
    if(netInfo.isConnected === true){
      offlineSynchronize();
    }
  }, [netInfo.isConnected]));


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
          keyExtractor={(item: any) => String(item.id)}
          renderItem={({ item }: ItemList) => <CarCard data={item} onPress={() => handleCarDetails(item)} />}
        />
      )}
    </S.Container>
  )
}