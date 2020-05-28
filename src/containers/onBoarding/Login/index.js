import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles';
import { Heading, Text } from '../../../components/Typography';
import colors from '../../../theme/colors';
import { TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import commonStyles from '../../../theme/commonStyles';
import { confirmCode } from '../../../operations/onBoarding';
import Message from '../../../components/Message';
import Loader from '../../../components/Loader';

const Login = ({ route, navigation }) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const { otpResponse } = route.params;

  if (loading) return <Loader />;

  return (
    <SafeAreaView style={styles.container}>
      <Heading style={{ color: colors.white }}>Verify phone number</Heading>
      <Text style={{ color: colors.white }}>
        Enter the OTP sent to you phone number registered with your organization
      </Text>
      <TextInput
        style={{ marginTop: 32, ...commonStyles.textInput, ...styles.input }}
        mode="outlined"
        keyboardType={'numeric'}
        placeholder="Enter OTP"
        value={otp}
        maxLength={6}
        placeholderTextColor={colors.white}
        onChangeText={text => setOtp(text)}
      />
      <Button
        mode="contained"
        disabled={!otp || otp.length < 6}
        color={colors.white}
        style={{ marginTop: 32 }}
        uppercase={false}
        contentStyle={styles.submitButtonContent}
        onPress={async () => {
          try {
            setLoading(true);
            await confirmCode(otpResponse, otp);
            // navigation.navigate('Home');
          } catch (e) {
            setLoading(false);
            Message.error('Incorrect OTP.');
          }
        }}>
        <Text style={{ color: colors.primary, ...commonStyles.buttonLabel }}>
          Sign in to your organization
        </Text>
      </Button>
    </SafeAreaView>
  );
};

export default Login;
