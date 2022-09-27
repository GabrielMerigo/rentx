import * as S from './styles';
import GasolineSvg from '../../assets/gasoline.svg'
import { TouchableOpacityProps } from 'react-native';
import { getAccessoryIcon } from '../../utils/getAccessory';

type CarCardProps = {
  brand: string;
  name: string;
  period: string;
  price: number;
  thumbnail: string;
  fuel_type: string;
} & TouchableOpacityProps;

export function CarCard({ brand, period, price, name, thumbnail, fuel_type, ...rest }: CarCardProps) {
  const MotorIcon = getAccessoryIcon(fuel_type);

  return (
    <S.Container {...rest}>
      <S.Details>
        <S.Brand>{brand}</S.Brand>
        <S.Name>{name}</S.Name>

        <S.About>
          <S.Rent>
            <S.Period>{period}</S.Period>
            <S.Price>$ {price}</S.Price>
          </S.Rent>

          <S.Type>
            <MotorIcon />
          </S.Type>
        </S.About>

      </S.Details>
      <S.CarImage resizeMode="contain" source={{ uri: thumbnail }}></S.CarImage>
    </S.Container>
  );
}