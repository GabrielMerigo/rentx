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
import { useNavigation, useRoute } from '@react-navigation/native'
import theme from '../../styles/theme'
import { CarsType } from '../Home'

type RouteParams = {
  car: CarsType;
}

export function CarDetails({ }) {
  const { navigate, goBack } = useNavigation();
  const route = useRoute();
  const { car } = route.params as RouteParams;

  function handleConfirmRental() {
    navigate('Scheduling' as never, {} as never);
  }

  const getIcon = (icon: string) => {
    let iconSvg = {
      'speed': AccelerationSVG,
      'acceleration': AccelerationSVG,
      'turning_dia_meter': ForceSvg,
      'gasoline_motor': GasolineSvg,
      'exchange': ExchangeSvg,
      'seats': PeopleSvg
    }[icon];

    return iconSvg;
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
          {car.accessories.map(acessory => (
            <Accessory
              name={acessory.name}
              icon={AccelerationSVG}
            />
          ))}
        </S.Accessories>

        <S.About>
          {car.about}
        </S.About>
      </S.Content>

      <S.Footer>
        <Button color={theme.colors.main} title="Choose Rental Period " onPress={handleConfirmRental} />
      </S.Footer>
    </S.Container>
  )
}