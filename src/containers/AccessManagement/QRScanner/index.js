import React, { useState, useEffect } from 'react';
import commonStyles from '../../../theme/commonStyles';
import { Image, TextInput, View } from 'react-native';
import Loader from '../../../components/Loader';
import colors from '../../../theme/colors';
import EmptyComponent from '../../../components/EmptyComponent';
import { Button, Card } from 'react-native-paper';
import icQrCode from '../../../icons/qr-code.png';
import { SubHeading, Text } from '../../../components/Typography';
import QrScreen from '../../Home/components/QrScreen';
import { RequiredError } from '../../../operations/utils';

const QRScanner = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [qrScanner, setQRScanner] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <Loader />;

  const onScan = async uid => {
    navigation.navigate('Access Status', { uid });
  };

  return (
    <View
      style={{
        ...commonStyles.screenContainer,
        ...commonStyles.screenContainer2,
      }}>
      <QrScreen
        mode={'scan'}
        visible={qrScanner}
        handleClose={() => setQRScanner(false)}
        onScan={onScan}
      />

      <Card onPress={() => setQRScanner(true)}>
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

      <EmptyComponent text={'OR'} style={{ marginTop: 16 }} />

      <TextInput
        style={{
          ...commonStyles.textInput,
          backgroundColor: colors.surface,
          marginTop: 16,
        }}
        mode="outlined"
        keyboardType={'numeric'}
        placeholder="Phone number"
        value={phoneNumber}
        maxLength={10}
        onChangeText={text => setPhoneNumber(text)}
      />

      <Button
        mode="contained"
        disabled={phoneNumber.length < 10}
        color={colors.primary}
        style={{ marginTop: 8 }}
        uppercase={false}
        contentStyle={{
          height: 49,
        }}
        onPress={async () => {
          if (phoneNumber) {
            navigation.navigate('Access Status', {
              phoneNumber: `+91${phoneNumber}`,
            });
          } else {
            RequiredError();
          }
        }}>
        <Text style={{ ...commonStyles.buttonLabel, color: colors.white }}>
          Submit
        </Text>
      </Button>
    </View>
  );
};

export default QRScanner;
