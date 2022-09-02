import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import theme from "../../styles/theme";

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background_secondary};
`

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  position: absolute;
  margin-top: 40px;
  margin-left: 24px;
`

export const CarImages = styled.View`
  margin-top: ${RFValue(45)}px;
`

export const Content = styled.ScrollView.attrs({
  contentContainer: {
    padding: 24,
    alignItems: 'center'
  },
  showVerticalScrollIndicator: false
})``;

export const Details = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Description = styled.View``;

export const Brand = styled.Text``;

export const Name = styled.Text``;

export const Rent = styled.View``;

export const Period = styled.Text``;

export const Price = styled.Text``;
