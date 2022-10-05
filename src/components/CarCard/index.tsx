import * as S from './styles';
import { TouchableOpacityProps } from 'react-native';
import { getAccessoryIcon } from '../../utils/getAccessory';
import { Car as ModelCar } from "../../database/model/Car";

type CarCardProps = {
  data: ModelCar
} & TouchableOpacityProps;

export function CarCard({ data, ...rest }: CarCardProps) {
  const MotorIcon = getAccessoryIcon(data.fuel_type);

  return (
    <S.Container {...rest}>
      <S.Details>
        <S.Brand>{data.brand}</S.Brand>
        <S.Name>{data.name}</S.Name>

        <S.About>
          <S.Rent>
            <S.Period>{data.period}</S.Period>
            <S.Price>$ {data.price}</S.Price>
          </S.Rent>

          <S.Type>
            <MotorIcon />
          </S.Type>
        </S.About>

      </S.Details>
      <S.CarImage resizeMode="contain" source={{ uri: data.thumbnail }}></S.CarImage>
    </S.Container>
  );
}