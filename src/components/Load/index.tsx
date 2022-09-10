import { ActivityIndicator } from "react-native";
import theme from "../../styles/theme";

export default function Loader() {
  return <ActivityIndicator size="large" style={{ flex: 1 }} color={theme.colors.main} />;
}