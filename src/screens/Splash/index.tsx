import React from 'react';
import { Text, Button, Dimensions } from 'react-native';
import * as S from './styles';

import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

const WIDTH = Dimensions.get('window').width;

export function Splash() {
  const animation = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(animation.value, {
            duration: 300,
            easing: Easing.bounce
          })
        },
      ]
    }
  });

  function handleAnimationPosition() {
    animation.value = Math.random() * (WIDTH - 100);
  }

  return (
    <S.Container>
      <Animated.View style={[{ width: 100, height: 100, backgroundColor: 'red' }, animatedStyles]} />
      <Button title="Mover" onPress={handleAnimationPosition}></Button>
    </S.Container>
  )
}