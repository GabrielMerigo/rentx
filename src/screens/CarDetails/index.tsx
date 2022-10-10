import { StatusBar, StyleSheet } from "react-native";
import { Accessory } from '../../components/Accessory'
import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'
import * as S from './styles'

import { Button } from '../../components/Button'
import { useNavigation, useRoute } from '@react-navigation/native'
import theme from '../../styles/theme'
import { CarsType } from '../Home'
import { getAccessoryIcon } from '../../utils/getAccessory'
import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

export type RouteParams = {
  car: CarsType;
}

export function CarDetails() {
  const { navigate, goBack } = useNavigation();
  const route = useRoute();
  const { car } = route.params as RouteParams;

  function handleConfirmRental() {
    navigate('Scheduling' as never, { car } as never);
  }

  const scrollY = useSharedValue(0);
  const scrollHander = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      ),
    }
  });

  const sliderCarStyleAnimations = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 150],
        [1, 0],
        Extrapolate.CLAMP
      )
    }
  });

  return (
    <S.Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor='transparent'
      />

      <Animated.View style={[headerStyleAnimation]}>
        <S.Header style={styles.back}>
          <BackButton style={styles.back} onPress={() => goBack()} />
        </S.Header>

        <Animated.View style={sliderCarStyleAnimations}>
          <S.CarImages>
            <ImageSlider
              imagesUrl={
                !!car.photos ?
                  car.photos : [{ id: car.thumbnail, photo: car.thumbnail }]
              }
            />
          </S.CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        style={{
          paddingHorizontal: 24,
          paddingTop: 10,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHander}
        scrollEventThrottle={16}
      >
        <S.Details>
          <S.Description>
            <S.Brand>{car.brand}</S.Brand>
            <S.Name>{car.name}</S.Name>
          </S.Description>

          <S.Rent>
            <S.Period>{car.period}</S.Period>
            <S.Price>$ {car.price}</S.Price>
          </S.Rent>
        </S.Details>

        <S.Accessories>
          {car.accessories && car.accessories.map(acessory => (
            <Accessory
              key={acessory.type}
              name={acessory.name}
              icon={getAccessoryIcon(acessory.type)}
            />
          ))}
        </S.Accessories>

        <S.About>
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
        </S.About>
      </Animated.ScrollView>

      <S.Footer>
        <Button color={theme.colors.main} title="Choose Rental Period" onPress={handleConfirmRental} />
      </S.Footer>
    </S.Container>
  )
}

const styles = StyleSheet.create({
  back: {
    zIndex: 1
  }
})