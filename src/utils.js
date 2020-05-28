import colors from './theme/colors';
import { Dimensions, Platform } from 'react-native';

export const headerStyle = {
  headerStyle: {
    backgroundColor: colors.primary,
  },
  headerTintColor: colors.white,
  headerTitleStyle: {
    color: colors.white,
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: 0,
    alignSelf: 'center',
  },
};

export const defaultHeaderStyle = {
  headerTitleStyle: {},
};

/**
 * Screen Height and Width
 */

export const screenWidth = Math.round(Dimensions.get('window').width);
export const screenHeight = Math.round(Dimensions.get('window').height);

/**
 * Identify OS
 */

export const IS_IOS = Platform.OS === 'ios';

/**
 * Get Time from seconds passed since midnight
 * @param storedTime
 * @returns {string}
 */
export const getTimeFromSeconds = storedTime => {
  const hours = Math.floor(storedTime / 3600);
  const leaves = storedTime - hours * 3600;
  const minutes = Math.floor(leaves / 60);
  return `${hours}:${minutes}`;
};
