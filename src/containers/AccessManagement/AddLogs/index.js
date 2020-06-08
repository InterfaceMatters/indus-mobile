import React, { useState, useEffect } from 'react';
import commonStyles from '../../../theme/commonStyles';
import { ScrollView, TextInput, View } from 'react-native';
import colors from '../../../theme/colors';
import { Button, ToggleButton } from 'react-native-paper';
import { Text } from '../../../components/Typography';
import { RequiredError } from '../../../operations/utils';
import { fetchUserDataByAuthId } from '../../../operations/onBoarding';
import {
  fetchUserDataByPhoneNumber,
  submitLog,
} from '../../../operations/accessManagement';
import Loader from '../../../components/Loader';
import AccessCard from '../components/AccessCard';
import { MAX_TEMP } from '../../../operations/constants';

const AddLogs = ({ route, navigation }) => {
  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState(null);
  const [temperature, setTemperature] = useState('');
  const [maskStatus, setMaskStatus] = useState('');

  const { uid, phoneNumber } = route.params;

  const fetchEmployeeData = async () => {
    const employeeDetails = uid
      ? await fetchUserDataByAuthId(uid, true)
      : await fetchUserDataByPhoneNumber(phoneNumber);
    if (employeeDetails !== null) {
      setEmployee(employeeDetails);
      setLoading(false);
    } else {
      navigation.goBack();
    }
  };

  useEffect(() => {
    async function fetchData() {
      await fetchEmployeeData();
    }
    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <ScrollView
      contentContainerStyle={{
        ...commonStyles.screenContainer,
        ...commonStyles.screenContainer2,
      }}>
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
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>{employee.hasAccess ? (
        <View>
          <Button
            mode="contained"
            disabled={
              temperature === '' ||
              maskStatus === '' ||
              (parseFloat(temperature) > MAX_TEMP || maskStatus === 'no')
            }
            color={colors.primary}
            style={{
              width: '100%',
            }}
            uppercase={false}
            contentStyle={{
              height: 49,
            }}
            onPress={async () => {
              if (temperature !== '' && maskStatus !== '') {
                setLoading(true);
                await submitLog({
                  maskStatus,
                  temperature,
                  userId: employee.authId,
                  hasAccess: true,
                });
                setLoading(false);
                navigation.goBack();
              } else {
                RequiredError();
              }
            }}>
            <Text style={{ ...commonStyles.buttonLabel, color: colors.white }}>
              Provide Access
            </Text>
          </Button>
          <Button
            mode="contained"
            disabled={
              temperature === '' ||
              maskStatus === '' ||
              (parseFloat(temperature) < MAX_TEMP && maskStatus === 'yes')
            }
            color={colors.error}
            style={{
              marginTop: 8,
              width: '100%',
            }}
            uppercase={false}
            contentStyle={{
              height: 49,
            }}
            onPress={async () => {
              if (temperature !== '' && maskStatus !== '') {
                setLoading(true);
                await submitLog({
                  maskStatus,
                  temperature,
                  userId: employee.authId,
                  hasAccess: false,
                });
                setLoading(false);
                navigation.goBack();
              } else {
                RequiredError();
              }
            }}>
            <Text style={{ ...commonStyles.buttonLabel, color: colors.white }}>
              Revoke Access
            </Text>
          </Button>
        </View>
      ) : (
        <Button
          mode="contained"
          color={colors.white}
          style={{
            width: '100%',
          }}
          uppercase={false}
          contentStyle={{
            height: 49,
          }}
          onPress={async () => {
            navigation.goBack();
          }}>
          <Text style={{ ...commonStyles.buttonLabel }}>Done</Text>
        </Button>
      )}
      </View>
    </ScrollView>
  );
};

export default AddLogs;
