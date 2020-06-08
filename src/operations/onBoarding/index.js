import { authIns, firestoreIns } from '../../firebase';
import Message from '../../components/Message';
import firebase from '@react-native-firebase/app';

/**
 * Fetch user details by auth id.
 * @param uid
 * @param sec
 * @returns {Promise<{[p: string]: value, id: *}>}
 */
const fetchUserDataByAuthId = async (uid, sec=false) => {
  try {
    const userData = await firestoreIns
      .collection('users')
      .doc(uid)
      .get();
    const data = userData.data();
    const dayAccess = await fetchDayAccessStatus(uid);
    const hasAccess = dayAccess !== null && !sec ? dayAccess : data.hasAccess;
    return { ...data, id: userData.id, hasAccess };
  } catch (e) {
    Message.error(e.message);
    throw new Error(e);
  }
};

const fetchDayAccessStatus = async uid => {
  try {
    const yesterday = new Date(Date.now() - 86400000);

    const yesterdayFirestore = firebase.firestore.Timestamp.fromDate(yesterday);
    const todayFirestore = firebase.firestore.Timestamp.fromDate(today);

    const data = await firestoreIns
      .collection('dailyLogs')
      .where('userId', '==', uid)
      .where('createdDate', '>', yesterdayFirestore)
      .limit(1)
      .get();

    if (data.docs.length) {
      const accessData = data.docs[0].data();
      return accessData.hasAccess;
    } else {
      throw Error('No results.');
    }
  } catch (e) {
    return null;
  }
};

/**
 * Request otp for sign in.
 * @returns {Promise<{signInRes: *, orgId: *}|*>}
 */
const requestOTP = async phoneNumber => {
  try {
    return await authIns.signInWithPhoneNumber(phoneNumber);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * Confirm code
 * @param otpResponse: Response of above request
 * @param otp: string
 * @returns {Promise<FirebaseAuthTypes.User|*>}
 */
const confirmCode = async (otpResponse, otp) => {
  try {
    return await otpResponse.confirm(otp);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * Log out.
 * @returns {Promise<boolean|*>}
 */
const signOut = async () => {
  try {
    await authIns.signOut();
    return true;
  } catch (e) {
    return e;
  }
};

export { requestOTP, confirmCode, signOut, fetchUserDataByAuthId };
