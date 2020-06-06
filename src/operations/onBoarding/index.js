import { authIns, firestoreIns } from '../../firebase';
import Message from '../../components/Message';

/**
 * Fetch user details by auth id.
 * @param uid
 * @returns {Promise<{[p: string]: value, id: *}>}
 */
const fetchUserDataByAuthId = async uid => {
  try {
    const userData = await firestoreIns
      .collection('users')
      .doc(uid)
      .get();
    return { ...userData.data(), id: userData.id };
  } catch (e) {
    Message.error(e.message);
    throw new Error(e);
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
