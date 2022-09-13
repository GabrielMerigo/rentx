import { StatusBar } from 'expo-status-bar'
import { Accessory } from '../../components/Accessory'
import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'
import * as S from './styles'

import { Button } from '../../components/Button'
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components'
import { useNavigation, useRoute } from '@react-navigation/native'
import { getAccessoryIcon } from '../../utils/getAccessory';
import { CarsType } from '../Home'
import api from '../../services/api'
import { Alert } from 'react-native'

export type RouteParams = {
  car: CarsType;
  dates: any;
}

export function SchedulingDetails() {
  const theme = useTheme();
  const { navigate, goBack } = useNavigation();

  const route = useRoute();
  const { car, dates } = route.params as RouteParams;
  const rentTotal = Number(dates.length * car.rent.price);

  async function handleConfirmRental() {
    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);
    const unavailable_dates = [
      ...schedulesByCar.data.unavailable_dates,
      ...dates
    ];

    await api.post('/schedules_byuser', {
      user_id: 1,
      car
    });

    try {
      await api.put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates
      })

      navigate('SchedulingComplete' as never, {} as never);
    } catch (err) {
      Alert.alert('Não foi possivel realizar essa operação...');
    }


  }

  return (
    <S.Container>
      <S.Header>
        <BackButton onPress={() => goBack()} />
      </S.Header>

      <S.CarImages>
        <ImageSlider
          imagesUrl={car.photos}
        />
      </S.CarImages>

      <S.Content>
        <S.Details>
          <S.Description>
            <S.Brand>{car.brand}</S.Brand>
            <S.Name>{car.name}</S.Name>
          </S.Description>

          <S.Rent>
            <S.Period>{car.rent.period}</S.Period>
            <S.Price>$ {car.rent.price}</S.Price>
          </S.Rent>
        </S.Details>

        <S.Accessories>
          {car.accessories.map(accessory => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}

        </S.Accessories>

        <S.RentalPeriod>
          <S.CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </S.CalendarIcon>

          <S.DateInfo>
            <S.DateTitle>DE</S.DateTitle>
            <S.DateValue>{dates[0]}</S.DateValue>
          </S.DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.shape}
          />

          <S.DateInfo>
            <S.DateTitle>DE</S.DateTitle>
            <S.DateValue>{dates[1]}</S.DateValue>
          </S.DateInfo>
        </S.RentalPeriod>

        <S.RentalPrice>
          <S.RentalPriceLabel>TOTAL</S.RentalPriceLabel>
          <S.RentalPriceDetails>
            <S.RentalPriceQuota>{`$ ${car.rent.price} x${dates.length} daily`}</S.RentalPriceQuota>
            <S.RentalPriceTotal>$ {rentTotal}</S.RentalPriceTotal>
          </S.RentalPriceDetails>
        </S.RentalPrice>


      </S.Content>

      <S.Footer>
        <Button color={theme.colors.success} title="Rent Now" onPress={handleConfirmRental} />
      </S.Footer>
    </S.Container>
  )
}