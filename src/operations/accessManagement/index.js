import { firestoreIns } from '../../firebase';
import AsyncStorage from '@react-native-community/async-storage';
import { GenericError } from '../utils';
import { ROLE_ID } from '../constants';
import Message from '../../components/Message';
import firebase from '@react-native-firebase/app';

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

/**
 * Fetch employee details by phoneNumber
 * @param phoneNumber
 * @returns {Promise<null|{[p: string]: value}>}
 */

const fetchUserDataByPhoneNumber = async phoneNumber => {
  try {
    const userData = await firestoreIns
      .collection('users')
      .where('phoneNumber', '==', phoneNumber)
      .get();
    if (userData.docs.length) {
      return { ...userData.docs[0].data() };
    } else {
      throw Error('Record not found. Please enter correct phone number.');
    }
  } catch (e) {
    Message.error(e.message);
    return null;
  }
};

/**
 * Submit log
 * @param temperature
 * @param maskStatus
 * @param userId
 * @param hasAccess
 * @returns {Promise<void>}
 */

const submitLog = async ({ temperature, maskStatus, userId, hasAccess }) => {
  const currentTime = firebase.firestore.FieldValue.serverTimestamp();
  const securityUserId = await AsyncStorage.getItem('userId');

  try {
    await firestoreIns.collection('dailyLogs').add({
      createdDate: currentTime,
      updatedDate: currentTime,
      createdBy: securityUserId,
      temperature: parseFloat(temperature),
      maskStatus,
      userId,
      hasAccess,
    });
    Message.success('Added successfully.');
  } catch (e) {
    Message.error(e.message);
  }
};

export { fetchAllEmployees, fetchUserDataByPhoneNumber, submitLog };
