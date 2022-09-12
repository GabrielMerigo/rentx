import { StatusBar } from 'expo-status-bar'
import { Accessory } from '../../components/Accessory'
import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'
import * as S from './styles'

import { Button } from '../../components/Button'
import { useNavigation, useRoute } from '@react-navigation/native'
import theme from '../../styles/theme'
import { CarsType } from '../Home'
import { getAccessoryIcon } from '../../utils/getAccessory'

export type RouteParams = {
  car: CarsType;
}

export function CarDetails({ }) {
  const { navigate, goBack } = useNavigation();
  const route = useRoute();
  const { car } = route.params as RouteParams;

  function handleConfirmRental() {
    navigate('Scheduling' as never, {
      car
    } as never);
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
              key={acessory.type}
              name={acessory.name}
              icon={getAccessoryIcon(acessory.type)}
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