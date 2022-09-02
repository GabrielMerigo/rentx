import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FlatList } from 'react-native';

export const Container = styled.View`
  ${({ theme }) => css`
    flex: 1;

    background: ${theme.colors.shape};
  `}
`;

export const Header = styled.View`
  ${({ theme }) => css`

    width: 100%;
    height: 113px;

    background-color: ${theme.colors.header};
    justify-content: flex-end;
    padding: 32px 24px;
  `}
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;


export const TotalCars = styled.Text`
  ${({ theme }) => css`
    font-size: ${RFValue(15)};
    background-color: ${theme.fonts.primary_400};
    color: ${theme.colors.text};
  `}
`;

export const CarList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 24
  },
  showVerticalScrollIndicator: false
})``;