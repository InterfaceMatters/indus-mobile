import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const authIns = auth();
const firestoreIns = firestore();
const storageIns = storage();

export { authIns, firestoreIns, storageIns };
