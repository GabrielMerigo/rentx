import SpeedSvg from '../assets/speed.svg';
import AccelerationSVG from '../assets/acceleration.svg';
import ForceSvg from '../assets/force.svg';
import GasolineSvg from '../assets/gasoline.svg';
import ExchangeSvg from '../assets/exchange.svg';
import PeopleSvg from '../assets/people.svg';
import EletricMotor from '../assets/energy.svg';
import HybridMotor from '../assets/hybrid.svg';

export const getAccessoryIcon = (type: string) => {
  console.log(type)
  switch(type){
    case 'speed':
      return SpeedSvg;
    case 'acceleration': 
      return AccelerationSVG;
    case 'turning_diameter':
      return ForceSvg;
    case 'gasoline_motor':
      return GasolineSvg;
    case 'exchange':
      return ExchangeSvg
    case 'seats':
      return PeopleSvg
    case 'electric_motor':
      return EletricMotor
    case 'electric':
        return EletricMotor
    case 'hybrid_motor':
      return HybridMotor
    default:
      return PeopleSvg
  }
}