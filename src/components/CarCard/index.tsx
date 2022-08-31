import * as S from './styles';
import GasolineSvg from '../../assets/gasoline.svg'

export function CarCard(){
  return (
    <S.Container>
      <S.Details>
        <S.Brand>AUDI</S.Brand>
        <S.Name>$ 5 Coupé</S.Name>

        <S.About>
          <S.Rent>
            <S.Period>Per day</S.Period>
            <S.Price>R$ 120</S.Price>
          </S.Rent>

          <S.Type>
            <GasolineSvg />
          </S.Type>
        </S.About>

      </S.Details>
      <S.CarImage source={{ uri: 'https://img2.gratispng.com/20180609/aqk/kisspng-audi-rs5-car-audi-a5-audi-a3-audi-rs-5-5b1b9890115d44.9152453915285351840711.jpg'}}></S.CarImage>
    </S.Container>
  );
}