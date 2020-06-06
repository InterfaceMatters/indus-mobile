import React, { useState, useEffect } from 'react';
import commonStyles from '../../../theme/commonStyles';
import { ScrollView, TextInput, View } from 'react-native';
import colors from '../../../theme/colors';
import { Button, ToggleButton } from 'react-native-paper';
import { Text } from '../../../components/Typography';
import { RequiredError } from '../../../operations/utils';
import { fetchUserDataByAuthId } from '../../../operations/onBoarding';
import { fetchUserDataByPhoneNumber } from '../../../operations/accessManagement';
import Loader from '../../../components/Loader';
import AccessCard from '../components/AccessCard';

const AddLogs = ({ route }) => {
  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState(null);
  const [temperature, setTemperature] = useState('');
  const [maskStatus, setMaskStatus] = useState('');

  const { uid, phoneNumber } = route.params;

  const fetchEmployeeData = async () => {
    const employeeDetails = uid
      ? await fetchUserDataByAuthId(uid)
      : await fetchUserDataByPhoneNumber(phoneNumber);
    setEmployee(employeeDetails);
    setLoading(false);
    return null;
  };

  useEffect(() => {
    async function fetchData() {
      await fetchEmployeeData();
    }
    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <View
      style={{
        ...commonStyles.screenContainer,
        ...commonStyles.screenContainer2,
      }}>
      <ScrollView>
        <AccessCard employeeDetails={employee} />
        {employee.hasAccess && (
          <View style={{ marginTop: 16 }}>
            <Text style={{ color: colors.accent }}>
              Record employee’s body temperature
            </Text>
            <TextInput
              style={{
                ...commonStyles.textInput,
                backgroundColor: colors.surface,
                marginTop: 8,
              }}
              placeholder="Temperature ºF *"
              value={temperature}
              keyboardType={'numeric'}
              onChangeText={text => setTemperature(text)}
            />
            <Text style={{ color: colors.accent, marginTop: 16 }}>
              Is the employee wearing a mask?
            </Text>
            <ToggleButton.Row
              onValueChange={value => setMaskStatus(value)}
              value={maskStatus}
              style={{ marginTop: 8 }}>
              <ToggleButton
                value={'yes'}
                icon={'check'}
                color={colors.white}
                style={{
                  backgroundColor:
                    maskStatus === 'yes' ? colors.primary : colors.accent,
                  marginRight: 8,
                }}
              />
              <ToggleButton
                value={'no'}
                icon={'close'}
                color={colors.white}
                style={{
                  backgroundColor:
                    maskStatus === 'no' ? colors.error : colors.accent,
                }}
              />
            </ToggleButton.Row>
          </View>
        )}
      </ScrollView>
      {employee.hasAccess && (
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
      )}
    </View>
  );
};

export default AddLogs;
