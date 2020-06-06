import React, { useState, useEffect } from 'react';
import commonStyles from '../../../theme/commonStyles';
import { ScrollView, TextInput, View } from 'react-native';
import colors from '../../../theme/colors';
import { Button } from 'react-native-paper';
import { Text } from '../../../components/Typography';
import { RequiredError } from '../../../operations/utils';
import { fetchUserDataByAuthId } from '../../../operations/onBoarding';
import { fetchUserDataByPhoneNumber } from '../../../operations/accessManagement';

const AddLogs = ({ route }) => {
  const [loading, setLoading] = useState(true);
  const [temperature, setTemperature] = useState('');
  const [maskStatus, setMaskStatus] = useState('');

  const { uid, phoneNumber } = route.params;

  const fetchEmployeeData = async () => {
    const employeeDetails = uid
      ? await fetchUserDataByAuthId(uid)
      : await fetchUserDataByPhoneNumber(phoneNumber);
    console.log(employeeDetails);
    setLoading(false);
    return null;
  };

  useEffect(() => {
    async function fetchData() {
      await fetchEmployeeData();
    }
    fetchData();
  }, []);

  return (
    <View
      style={{
        ...commonStyles.screenContainer,
        ...commonStyles.screenContainer2,
      }}>
      <ScrollView>
        <Text style={{ color: colors.accent }}>
          Record employee’s body temperature
        </Text>
        <TextInput
          style={{
            ...commonStyles.textInput,
            backgroundColor: colors.surface,
            marginTop: 8,
          }}
          placeholder="Temperature *"
          value={temperature}
          onChangeText={text => setTemperature(text)}
        />
        <Text style={{ color: colors.accent, marginTop: 8 }}>
          Is the employee wearing a mask?{' '}
        </Text>
      </ScrollView>
      <Button
        mode="contained"
        disabled={temperature === '' || maskStatus === ''}
        color={colors.primary}
        style={{ position: 'absolute', bottom: 0, left: 20, width: '100%' }}
        uppercase={false}
        contentStyle={{
          height: 49,
        }}
        onPress={async () => {
          if (temperature !== '' && maskStatus !== '') {
            setLoading(true);
            // await submitLog();
            setLoading(false);
            navigation.goBack();
          } else {
            RequiredError();
          }
        }}>
        <Text style={{ ...commonStyles.buttonLabel, color: colors.white }}>
          Done
        </Text>
      </Button>
    </View>
  );
};

export default AddLogs;
