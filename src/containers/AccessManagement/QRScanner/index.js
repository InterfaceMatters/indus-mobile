import React, { useState, useEffect } from 'react';
import commonStyles from '../../../theme/commonStyles';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';
import Loader from '../../../components/Loader';
import colors from '../../../theme/colors';
import EmptyComponent from '../../../components/EmptyComponent';
import { Card } from 'react-native-paper';
import icQrCode from '../../../icons/qr-code.png';
import { SubHeading, Text } from '../../../components/Typography';
import QRCodeScanner from 'react-native-qrcode-scanner';
import QrScreen from '../../Home/components/QrScreen';

const QRScanner = () => {
  const [loading, setLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState([]);
  const [qrScanner, setQRScanner] = useState([]);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <Loader />;

  return (
    <View
      style={{
        ...commonStyles.screenContainer,
        ...commonStyles.screenContainer2,
      }}>
      <TextInput
        style={{ ...commonStyles.textInput, backgroundColor: colors.surface }}
        mode="outlined"
        keyboardType={'numeric'}
        placeholder="Phone number"
        value={phoneNumber}
        maxLength={10}
        onChangeText={text => setPhoneNumber(text)}
      />
      <EmptyComponent text={'OR'} style={{ marginTop: 16 }} />

      <QrScreen
        mode={'scan'}
        visible={qrScanner}
        handleClose={() => setQRScanner(false)}
      />

      <Card style={{ marginTop: 16 }} onPress={() => setQRScanner(true)}>
        <Card.Content style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View>
            <Image source={icQrCode} style={{ height: 66, width: 66 }} />
          </View>
          <View style={{ marginLeft: 12 }}>
            <SubHeading>Scan QR code</SubHeading>
            <Text style={{ color: colors.accent }}>
              To check employee access status
            </Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default QRScanner;
