import { StyleSheet } from 'react-native';
import colors from './colors';

const commonStyles = StyleSheet.create({
  textInput: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 8,
    paddingTop: 8,
    fontFamily: 'Chivo-Regular',
    height: 49,
    fontSize: 16,
    borderRadius: 2,
  },
  buttonLabel: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: '500',
    letterSpacing: 0,
  },
  screenContainer: {
    paddingTop: 16,
    marginBottom: 8,
    flex: 1,
  },
  screenContainer2: {
    paddingRight: 20,
    paddingLeft: 20
  },
  iconStyle: {
    width: 24,
    height: 24,
  },
  smallIcon: {
    width: 20,
    height: 20,
  },
  imageStyle: {
    height: 132,
    width: 132,
    marginTop: 16,
    marginRight: 16,
  },
});

export default commonStyles;
