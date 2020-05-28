import { firestoreIns } from '../../firebase';
import AsyncStorage from '@react-native-community/async-storage';
import { GenericError } from '../utils';

/**
 * Fetch all alerts
 * @returns {Promise<{id: *}[]>}
 */
const fetchAlerts = async () => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    const roleId = await AsyncStorage.getItem('roleId');
    const res = await firestoreIns
      .collection('notifications')
      .where('audience', 'in', [userId, roleId.toString(), 'ALL'])
      .orderBy('createdDate', 'desc')
      .get();

    return res.docs.map(item => {
      return { ...item.data(), id: item.id };
    });
  } catch (e) {
    GenericError();
  }
};

export { fetchAlerts };
