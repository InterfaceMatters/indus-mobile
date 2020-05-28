import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: colors.primary,
    justifyContent: 'center',
    paddingRight: 48,
    paddingLeft: 48,
  },
  input: {
    height: 49,
    width: '100%',
    borderWidth: 2,
    fontSize: 16,
    borderRadius: 2,
    borderColor: 'rgba(255,255,255,0.5)',
    backgroundColor: `rgba(255,255,255,0.2)`,
    color: colors.white
  },
  submitButtonContent: {
    height: 49,
    width: '100%',
  },
});

export default styles;
