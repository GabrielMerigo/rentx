import * as S from './styles';
import GasolineSvg from '../../assets/gasoline.svg'
import { TouchableOpacityProps } from 'react-native';

type CarCardProps = {
  brand: string;
  name: string;
  rent: {
    period: string;
    price: number;
  },
  thumbnail: string;
} & TouchableOpacityProps;

export function CarCard({ brand, name, rent, thumbnail, ...rest }: CarCardProps) {
  return (
    <S.Container {...rest}>
      <S.Details>
        <S.Brand>{brand}</S.Brand>
        <S.Name>{name}</S.Name>

        <S.About>
          <S.Rent>
            <S.Period>{rent.period}</S.Period>
            <S.Price>$ {rent.price}</S.Price>
          </S.Rent>

          <S.Type>
            <GasolineSvg />
          </S.Type>
        </S.About>

      </S.Details>
      <S.CarImage resizeMode="contain" source={{ uri: thumbnail }}></S.CarImage>
    </S.Container>
  );
}