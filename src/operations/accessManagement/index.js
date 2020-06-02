import { firestoreIns } from '../../firebase';
import AsyncStorage from '@react-native-community/async-storage';
import { GenericError } from '../utils';
import { ROLE_ID } from '../constants';

/**
 * Fetch all employees
 * @returns {Promise<{id: *}[]>}
 */
const fetchAllEmployees = async () => {
  try {
    const orgId = await AsyncStorage.getItem('orgId');
    const res = await firestoreIns
      .collection('users')
      .where('orgId', '==', orgId)
      .where('roleId', '==', ROLE_ID.EMPLOYEE)
      .where('active', '==', true)
      .get();

    return res.docs.map(item => {
      return { ...item.data(), id: item.id };
    });
  } catch (e) {
    GenericError();
  }
};

export { fetchAllEmployees };
