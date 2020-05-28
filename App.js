import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider, Snackbar } from 'react-native-paper';
import theme from './src/theme';
import { authIns } from './src/firebase';
import colors from './src/theme/colors';
import AsyncStorage from '@react-native-community/async-storage';
import { fetchUserDataByAuthId } from './src/operations/onBoarding';
import Loader from './src/components/Loader';
import Message from './src/components/Message';
import Navigation from './src/navigation';

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');

  async function onAuthStateChanged(user) {
    if (user) {
      const userDetails = await fetchUserDataByAuthId(user.uid);
      const {
        orgId,
        roleId,
        id,
        name,
        hasAccess,
        entryTime,
        exitTime,
      } = userDetails;
      await AsyncStorage.setItem('orgId', orgId);
      await AsyncStorage.setItem('userId', id);
      await AsyncStorage.setItem('roleId', roleId.toString());
      await AsyncStorage.setItem(
        'userDetails',
        JSON.stringify({ name, hasAccess, entryTime, exitTime }),
      );
    }
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = authIns.onAuthStateChanged(onAuthStateChanged);

    Message.setConfig({
      showError: msg => {
        setSnackBarMessage(msg);
        setSnackBarVisible(true);
      },
      showSuccess: msg => {
        setSnackBarMessage(msg);
        setSnackBarVisible(true);
      },
    });
    return subscriber;
  }, []);

  if (initializing) return <Loader />;

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <StatusBar backgroundColor={colors.text} />
        <Navigation user={user} />
        <Snackbar
          visible={snackBarVisible}
          onDismiss={() => {
            setSnackBarVisible(false);
            setSnackBarMessage('');
          }}
          style={{
            backgroundColor: colors.text,
          }}
          action={{
            label: 'Close',
            onPress: () => {
              setSnackBarVisible(false);
              setSnackBarMessage('');
            },
          }}>
          {snackBarMessage}
        </Snackbar>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App;
