import { StatusBar } from 'expo-status-bar'
import { Accessory } from '../../components/Accessory'
import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'
import * as S from './styles'

import SpeedSvg from '../../assets/speed.svg';
import AccelerationSVG from '../../assets/acceleration.svg';
import ForceSvg from '../../assets/force.svg';
import GasolineSvg from '../../assets/gasoline.svg';
import ExchangeSvg from '../../assets/exchange.svg';
import PeopleSvg from '../../assets/people.svg';
import { Button } from '../../components/Button'
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components'
import { useNavigation } from '@react-navigation/native'

export function SchedulingDetails() {
  const theme = useTheme();
  const { navigate, goBack } = useNavigation();

  function handleConfirmRental() {
    navigate('SchedulingComplete' as never, {} as never);
  }


  return (
    <S.Container>
      <S.Header>
        <BackButton onPress={() => goBack()} />
      </S.Header>

      <S.CarImages>
        <ImageSlider
          imagesUrl={['https://png.monster/wp-content/uploads/2020/11/2018-audi-rs5-4wd-coupe-angular-front-5039562b.png']}
        />
      </S.CarImages>

      <S.Content>
        <S.Details>
          <S.Description>
            <S.Brand>Lamborghini</S.Brand>
            <S.Name>Huracan</S.Name>
          </S.Description>

          <S.Rent>
            <S.Period>Per day</S.Period>
            <S.Price>$ 100</S.Price>
          </S.Rent>
        </S.Details>

        <S.Acessories>
          <Accessory name="380km/h" icon={SpeedSvg} />
          <Accessory name="3.2s" icon={AccelerationSVG} />
          <Accessory name="800 HP" icon={ForceSvg} />
          <Accessory name="Gasoline" icon={GasolineSvg} />
          <Accessory name="Auto" icon={ExchangeSvg} />
          <Accessory name="2 people" icon={PeopleSvg} />
        </S.Acessories>

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
            <S.DateValue>18/06/2021</S.DateValue>
          </S.DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.shape}
          />

          <S.DateInfo>
            <S.DateTitle>DE</S.DateTitle>
            <S.DateValue>18/06/2021</S.DateValue>
          </S.DateInfo>
        </S.RentalPeriod>

        <S.RentalPrice>
          <S.RentalPriceLabel>TOTAL</S.RentalPriceLabel>
          <S.RentalPriceDetails>
            <S.RentalPriceQuota>$ 90 x3 daily</S.RentalPriceQuota>
            <S.RentalPriceTotal>$ 260</S.RentalPriceTotal>
          </S.RentalPriceDetails>
        </S.RentalPrice>


      </S.Content>

      <S.Footer>
        <Button color={theme.colors.success} title="Rent Now" onPress={handleConfirmRental} />
      </S.Footer>
    </S.Container>
  )
}