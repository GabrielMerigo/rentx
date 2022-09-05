import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  ${({ theme }) => css`
    flex: 1;
    background: ${theme.colors.shape};
  `}
`;


export const Header = styled.SafeAreaView`
  ${({ theme }) => css`
    width: 100%;
    height: 325px;
    
    background-color: ${theme.colors.header};

    justify-content: center;
    padding: 25px;
    
    padding-top: 60px;
  `}
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.shape};
    font-family: ${theme.fonts.secondary_600};
    font-size: ${RFValue(34)}px;
    
    margin-top: 24px;
  `}
`;

export const RentalPeriod = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin: 32px 0;
`;

export const DateInfo = styled.View`
  width: 30%;
`;

export const DateTitle = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.text};
    font-family: ${theme.fonts.secondary_500};
    font-size: ${RFValue(12)}px;
  `}
`;

type DateValueProps = {
  selected: boolean;
}

export const DateValue = styled.Text<DateValueProps>`
  ${({ theme, selected }) => css`
    color: ${theme.colors.shape};
    font-family: ${theme.fonts.primary_500};
    font-size: ${RFValue(15)}px;

    ${!selected && css`
      border-bottom-width: 1px;
      border-bottom-color: ${theme.colors.text};
      padding-bottom: 5px;
    `}
  `}
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 24
  },
  showVerticalScrollIndicator: false
})``;

export const Footer = styled.View`
  padding: 24px;
`;