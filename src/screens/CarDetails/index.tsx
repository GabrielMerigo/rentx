import { StatusBar } from 'expo-status-bar'
import { Acessory } from '../../components/Acessory'
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

export function CarDetails() {
  return (
    <S.Container>
      <S.Header>
        <BackButton onPress={() => { }} />
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
          <Acessory name="380km/h" icon={SpeedSvg} />
          <Acessory name="3.2s" icon={AccelerationSVG} />
          <Acessory name="800 HP" icon={ForceSvg} />
          <Acessory name="Gasoline" icon={GasolineSvg} />
          <Acessory name="Auto" icon={ExchangeSvg} />
          <Acessory name="2 people" icon={PeopleSvg} />
        </S.Acessories>

        <S.About>
          Este é automóvel desportivo.
          Surgiu do lendário touro de lide indultado na praça Real Maestranza de Sevilla.
          É um belíssimo carro para quem gosta de acelerar.
        </S.About>
        <S.About>
          Este é automóvel desportivo.
          Surgiu do lendário touro de lide indultado na praça Real Maestranza de Sevilla.
          É um belíssimo carro para quem gosta de acelerar.
        </S.About>
        <S.About>
          Este é automóvel desportivo.
          Surgiu do lendário touro de lide indultado na praça Real Maestranza de Sevilla.
          É um belíssimo carro para quem gosta de acelerar.
        </S.About>
      </S.Content>

      <S.Footer>
        <Button color="red" title="Confirmar" />
      </S.Footer>
    </S.Container>
  )
}