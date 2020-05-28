import { firestoreIns } from '../../firebase';
import AsyncStorage from '@react-native-community/async-storage';
import { GenericError } from '../utils';

/**
 * Fetch all active protocols
 * @returns {Promise<{id: *}[]|*>}
 */

const fetchAllProtocols = async () => {
  try {
    const orgId = await AsyncStorage.getItem('orgId');
    const res = await firestoreIns
      .collection('protocols')
      .where('orgId', '==', orgId)
      .where('active', '==', true)
      .orderBy('updatedDate', 'desc')
      .get();

    return res.docs.map(item => {
      return { ...item.data(), id: item.id };
    });
  } catch (e) {
    GenericError();
  }
};

/**
 * Fetch protocol details
 * @param protocolId
 * @returns {Promise<{id: *}[]|*>}
 */

const fetchProtocolDetails = async protocolId => {
  try {
    const res = await firestoreIns
      .collection('steps')
      .where('protocolId', '==', protocolId)
      .get();

    return res.docs.map(item => {
      return { ...item.data(), id: item.id };
    });
  } catch (e) {
    GenericError();
  }
};

export { fetchAllProtocols, fetchProtocolDetails };
