import {Platform} from 'react-native';

const typography = {
  default: {
    regular: {
      fontFamily: 'Chivo-Regular',
    },
    medium: {
      fontFamily: 'Chivo-Bold',
    },
    light: {
      fontFamily: 'Chivo-Light',
    },
    thin: {
      fontFamily: 'Chivo-Regular',
    },
  },
};

typography.ios = typography.default;
typography.android = typography.default;

export default function configureTypography() {
  return Platform.select({...typography})
};
