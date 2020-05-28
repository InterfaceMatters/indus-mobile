import Message from '../components/Message';
import AsyncStorage from '@react-native-community/async-storage';

const GenericError = () =>
  Message.error('Problems fetching data. Please try again later.');

const RequiredError = () => Message.error('Fields marked as * are required.');

const getUserDetails = async () => {
  const userId = await AsyncStorage.getItem('userId');
  const userDetails = await AsyncStorage.getItem('userDetails');
  return {
    userId,
    ...(JSON.parse(userDetails)),
  };
};

export { GenericError, RequiredError, getUserDetails };
