import React from "react";

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg'

import * as S from './styles';
import { useWindowDimensions } from "react-native";
import { ConfirmButton } from "../../components/ConfirmButton";
import { StatusBar } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

type Params = {
  title: string
  message: string
  nextScreenRoute: string;
}

export function Confirmation() {
  const route = useRoute();
  const { width } = useWindowDimensions();
  const { navigate } = useNavigation();
  const { title, message, nextScreenRoute } = route.params as Params;

  function handleConfirm() {
    navigate(nextScreenRoute as never, {} as never);
  }

  return (
    <S.Container>
      <StatusBar barStyle="light-content" translucent backgroundColor={"transparent"} />

      <LogoSvg width={width} />

      <S.Content>
        <DoneSvg width={80} height={80} />
        <S.Title>{title}</S.Title>

        <S.Message>
          {message}
        </S.Message>
      </S.Content>

      <S.Footer>
        <ConfirmButton title="OK" onPress={handleConfirm} />
      </S.Footer>
    </S.Container>
  )
}