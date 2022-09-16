import React from 'react';

import * as S from './styles';
import LottieView from 'lottie-react-native';

import loadingCar from '../../assets/load_animated.json';

export function LoadAnimation() {
  return (
    <S.Container>
      <LottieView
        source={loadingCar}
        autoPlay
        resizeMode='contain'
        style={{ height: 200 }}
        loop
      />
    </S.Container>
  )
}