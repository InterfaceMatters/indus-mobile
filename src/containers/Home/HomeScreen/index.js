import React, { useState, useEffect } from 'react';
import commonStyles from '../../../theme/commonStyles';
import { FlatList, View } from 'react-native';
import ListCard from '../../../components/ListCard';
import Loader from '../../../components/Loader';
import { fetchAlerts } from '../../../operations/home';
import EmptyComponent from '../../EmptyComponent';
import { Text } from '../../../components/Typography';
import colors from '../../../theme/colors';
import AccessCard from '../components/AccessCard';
import { screenWidth } from '../../../utils';
import { getUserDetails } from '../../../operations/utils';
import QrScreen from '../components/QrScreen';

const HomeScreen = () => {
  const [alertList, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState({});
  const [qrScreen, setQRScreen] = useState(false);

  const fetchAlertList = async () => {
    const result = await fetchAlerts();
    setAlerts(result);
    setLoading(false);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await getUserDetails();
      setUserDetails(response);
      await fetchAlertList();
    }
    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <View style={{ ...commonStyles.screenContainer, paddingTop: 0 }}>
      <View
        style={{
          backgroundColor: colors.primary,
          height: 110,
          position: 'absolute',
          top: 0,
          width: screenWidth,
        }}
      />
      <AccessCard
        userDetails={userDetails}
        handleQRCodePress={() => setQRScreen(true)}
      />
      <Text
        style={{
          color: colors.accent,
          paddingLeft: 20,
          marginBottom: 8,
          marginTop: 24,
        }}>
        ALERTS
      </Text>
      <FlatList
        data={alertList}
        renderItem={({ item, index }) => (
          <ListCard
            handlePress={() => {
              console.log('Pressed.');
            }}
            key={index}
            title={item.title}
            leftContent={new Date(
              item.createdDate.seconds * 1000,
            ).toLocaleTimeString()}
            rightContent={new Date(
              item.createdDate.seconds * 1000,
            ).toLocaleDateString()}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        refreshing={loading}
        onRefresh={() => {
          setLoading(true);
          fetchAlertList();
        }}
        ListEmptyComponent={<EmptyComponent />}
      />

      <QrScreen
        visible={qrScreen}
        handleClose={() => setQRScreen(false)}
        userId={userDetails.userId}
      />
    </View>
  );
};

export default HomeScreen;
