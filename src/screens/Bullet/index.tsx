import * as S from './styles';

type BulletProps = {
  active?: boolean;
}

export function Bullet({ active = false }: BulletProps){
  return (
    <S.Container active={active} />
  )
}