import { firestoreIns, storageIns } from '../../firebase';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from '@react-native-firebase/app';
import Message from '../../components/Message';
import { GenericError, getUserDetails } from '../utils';

/**
 * Fetch all grievances
 * @returns {Promise<{id: *}[]|*>}
 */

const fetchAllGrievances = async () => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    const res = await firestoreIns
      .collection('grievances')
      .where('createdBy', '==', userId)
      .orderBy('createdDate', 'desc')
      .get();

    return res.docs.map(item => {
      return { ...item.data(), id: item.id };
    });
  } catch (e) {
    return e;
  }
};

/**
 * Fetch tags
 * @returns {Promise<*|T>}
 */
const fetchTags = async () => {
  try {
    const type = 'grievances';
    const response = await firestoreIns
      .collection('tags')
      .doc(type)
      .get();
    return response.data();
  } catch (e) {
    return e;
  }
};

/**
 * Submit grievance
 * @param file
 * @param description
 * @param title
 * @param tags
 * @returns {Promise<{id: *}|*>}
 */
const submitGrievance = async ({ file, description, title, tags }) => {
  try {
    const orgId = await AsyncStorage.getItem('orgId');
    const currentTime = firebase.firestore.FieldValue.serverTimestamp();
    const userId = await AsyncStorage.getItem('userId');
    const { name } = await getUserDetails();
    let fileUrl = null;

    if (file) {
      const protocolRef = storageIns.ref().child('grievances');

      const fileRef = protocolRef.child(`/${file.fileName}`);

      const uploadRes = await fileRef.putFile(file.uri);
      fileUrl = await storageIns
        .ref(uploadRes.metadata.fullPath)
        .getDownloadURL();
    }

    const res = await firestoreIns.collection('grievances').add({
      title,
      orgId,
      description,
      ...(fileUrl
        ? { fileUrls: firebase.firestore.FieldValue.arrayUnion(fileUrl) }
        : null),
      ...(tags ? { tags } : null),
      createdDate: currentTime,
      updatedDate: currentTime,
      createdBy: userId,
      createdByName: name,
    });
    Message.success('Grievance added successfully.');
    return { id: res.id };
  } catch (e) {
    GenericError();
  }
};

export { fetchAllGrievances, fetchTags, submitGrievance };
