import React from "react";
import { StatusBar } from "react-native";
import Logo from '../../assets/logo.svg'
import { RFValue  } from 'react-native-responsive-fontsize'

import * as S from './styles';
import { CarCard } from "../../components/CarCard";

export function Home(){
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

      <CarCard />

    </S.Container>
  )
}