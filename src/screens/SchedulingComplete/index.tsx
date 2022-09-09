import React from "react";

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg'

import * as S from './styles';
import { useWindowDimensions } from "react-native";
import { ConfirmButton } from "../../components/ConfirmButton";
import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function SchedulingComplete() {
  const { width } = useWindowDimensions();
  const { navigate } = useNavigation();

  function handleConfirm() {
    navigate('Home' as never, {} as never);
  }

  return (
    <S.Container>
      <StatusBar barStyle="light-content" translucent backgroundColor={"transparent"} />

      <LogoSvg width={width} />

      <S.Content>
        <DoneSvg width={80} height={80} />
        <S.Title>Carro alugado!</S.Title>

        <S.Message>
          Agora você só precisa ir {"\n"}
          até a concessionária da RENTX {"\n"}
          e pegar o seu automóvel.
        </S.Message>
      </S.Content>

      <S.Footer>
        <ConfirmButton title="OK" onPress={handleConfirm} />
      </S.Footer>
    </S.Container>
  )
}