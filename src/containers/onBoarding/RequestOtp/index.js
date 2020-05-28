import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles';
import { Heading, Text } from '../../../components/Typography';
import colors from '../../../theme/colors';
import { TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import commonStyles from '../../../theme/commonStyles';
import { requestOTP } from '../../../operations/onBoarding';
import Message from '../../../components/Message';
import Loader from '../../../components/Loader';

const RequestOtp = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  if (loading) return <Loader />;

  return (
    <SafeAreaView style={styles.container}>
      <Heading style={{ color: colors.white }}>Let’s get started</Heading>
      <Text style={{ color: colors.white }}>
        Enter your phone number registered with your organization
      </Text>
      <TextInput
        style={{ ...styles.input, marginTop: 32, ...commonStyles.textInput }}
        mode="outlined"
        keyboardType={'numeric'}
        placeholder="Phone number"
        value={phoneNumber}
        maxLength={10}
        placeholderTextColor={colors.white}
        onChangeText={text => setPhoneNumber(text)}
      />
      <Button
        mode="contained"
        disabled={!phoneNumber || phoneNumber.length < 10}
        color={colors.white}
        style={{ marginTop: 32 }}
        uppercase={false}
        contentStyle={styles.submitButtonContent}
        onPress={async () => {
          try {
            setLoading(true);
            const response = await requestOTP(`+91${phoneNumber}`);
            setLoading(false);
            navigation.navigate('Login', { otpResponse: response });
          } catch (e) {
            setLoading(false);
            Message.error('Mobile number not registered.');
          }
        }}>
        <Text
          style={{
            color: colors.primary,
            ...commonStyles.buttonLabel,
          }}>
          Continue
        </Text>
      </Button>
      <Text style={{ color: colors.white, marginTop: 24, textAlign: 'center' }}>
        By signing in, you agree to our Terms & Conditions
      </Text>
    </SafeAreaView>
  );
};

export default RequestOtp;
