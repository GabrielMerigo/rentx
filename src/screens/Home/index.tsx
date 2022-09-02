import React from "react";
import { StatusBar } from "react-native";
import Logo from '../../assets/logo.svg'
import { RFValue  } from 'react-native-responsive-fontsize'

import * as S from './styles';
import { CarCard } from "../../components/CarCard";

export function Home(){
  const carData = {
    brand: 'Audi',
    name: 'Audi TT',
    rent: {
      period: '1 week',
      price: 15000
    },
    thumbnail: 'https://png.monster/wp-content/uploads/2020/11/2018-audi-rs5-4wd-coupe-angular-front-5039562b.png'
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
            Total of 12 cars
          </S.TotalCars>
        </S.HeaderContent>
      </S.Header>

      <S.CarList 
        data={[1, 3, 4, 0, 6, 7, 9]}
        keyExtractor={item => String(item)}
        renderItem={({ item }) => <CarCard {...carData} />}
      />
      


    </S.Container>
  )
}