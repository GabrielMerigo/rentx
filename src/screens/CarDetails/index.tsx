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

import { Car as ModelCar } from '../../database/model/Car';
import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNetInfo } from "@react-native-community/netinfo";

export type RouteParams = {
  car: CarsType;
}

export function CarDetails() {
  const [carUpdated, setCarUpdated] = useState<CarsType>({} as CarsType);

  const { navigate, goBack } = useNavigation();
  const route = useRoute();
  const { car } = route.params as RouteParams;
  const netInfo = useNetInfo();

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

  useEffect(() => {
    async function fetchOnlineData(){
      const res = await api.get(`/cars/${car.id}`);
      setCarUpdated(res.data)
    }

    if(netInfo.isConnected === true){
      fetchOnlineData();
    }
  }, [netInfo.isConnected])

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
                !!carUpdated.photos ?
                  carUpdated.photos : [{ id: car.thumbnail, photo: car.thumbnail }]
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
            <S.Price>$ {netInfo.isConnected === true ? car.price : '...'}</S.Price>
          </S.Rent>
        </S.Details>

        <S.Accessories>
          {carUpdated.accessories && carUpdated.accessories.map(acessory => (
            <Accessory
              key={acessory.type}
              name={acessory.name}
              icon={getAccessoryIcon(acessory.type)}
            />
          ))}
        </S.Accessories>

        <S.About>
          {car.about}
        </S.About>
      </Animated.ScrollView>

      <S.Footer>
        <Button disabled={!netInfo.isConnected} color={theme.colors.main} title="Choose Rental Period" onPress={handleConfirmRental} />
        {netInfo.isConnected === false &&
          <S.OfflineInfo>You need conect to see more details.</S.OfflineInfo>
        }
      </S.Footer>
    </S.Container>
  )
}

const styles = StyleSheet.create({
  back: {
    zIndex: 1
  }
})