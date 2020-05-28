import { DefaultTheme } from 'react-native-paper';
import colors from './colors';
import configureTypography from './typography';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors,
  fonts: configureTypography(),
};

export default theme;
