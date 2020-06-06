import React, { useEffect, useState } from 'react';
import { defaultHeaderStyle, headerStyle } from '../utils';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import commonStyles from '../theme/commonStyles';
import colors from '../theme/colors';

import icHomeActive from '../icons/ic-home-active.png';
import icHomeInactive from '../icons/ic-home-inactive.png';
import icProtocolActive from '../icons/ic-protocol-active.png';
import icProtocolInactive from '../icons/ic-protocol-inactive.png';
import icGrievanceActive from '../icons/ic-grievance-active.png';
import icGrievanceInactive from '../icons/ic-grievance-inactive.png';
import icLogsActive from '../icons/ic-logs-active.png';
import icLogsInactive from '../icons/ic-logs-inactive.png';

import Login from '../containers/onBoarding/Login';
import NewGrievanceReport from '../containers/Grievances/NewGrievanceReport';
import Home from '../containers/Home';
import Protocol from '../containers/Protocol';
import Grievances from '../containers/Grievances';
import RequestOtp from '../containers/onBoarding/RequestOtp';
import AccessManagement from '../containers/AccessManagement';

const Stack = createStackNavigator();
const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();

import { TransitionPresets } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { ROLE_ID } from '../operations/constants';

const RootTabNav = () => {
  const [roleId, setRoleId] = useState(null);

  useEffect(() => {
    async function getRoleId() {
      const roleId = await AsyncStorage.getItem('roleId');
      setRoleId(parseInt(roleId));
    }
    getRoleId();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? icHomeActive : icHomeInactive;
          } else if (route.name === 'Protocols') {
            iconName = focused ? icProtocolActive : icProtocolInactive;
          } else if (route.name === 'Grievances') {
            iconName = focused ? icGrievanceActive : icGrievanceInactive;
          } else if (route.name === 'Access Management') {
            iconName = focused ? icLogsActive : icLogsInactive;
          }

          return <Image source={iconName} style={commonStyles.iconStyle} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.accent,
        showLabel: false,
      }}>
      <Tab.Screen name="Home" component={Home} />
      {roleId === ROLE_ID.SECURITY && (
        <Tab.Screen name="Access Management" component={AccessManagement} />
      )}
      <Tab.Screen name="Protocols" component={Protocol} />
      <Tab.Screen name="Grievances" component={Grievances} />
    </Tab.Navigator>
  );
};

const Navigation = ({ user }) => (
  <NavigationContainer>
    {!user ? (
      <Stack.Navigator
        headerMode={'none'}
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,
        }}>
        <Stack.Screen name="RequestOtp" component={RequestOtp} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    ) : (
      <RootStack.Navigator
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,
        }}>
        <RootStack.Screen
          name="HomeStack"
          component={RootTabNav}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="New grievance report"
          component={NewGrievanceReport}
          options={{ ...headerStyle, ...defaultHeaderStyle }}
        />
      </RootStack.Navigator>
    )}
  </NavigationContainer>
);

export default Navigation;
