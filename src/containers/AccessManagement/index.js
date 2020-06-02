import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { defaultHeaderStyle, headerStyle } from '../../utils';
import EmployeeList from './EmployeeList';
import QRScanner from './QRScanner';

const AccessManagementStack = createStackNavigator();

const AccessManagement = () => {
  return (
    <AccessManagementStack.Navigator
      initialRouteName="Access Management"
      screenOptions={headerStyle}>
      <AccessManagementStack.Screen
        name="Access Management"
        component={EmployeeList}
      />
      <AccessManagementStack.Screen
        options={defaultHeaderStyle}
        name="Identify Employee"
        component={QRScanner}
      />
    </AccessManagementStack.Navigator>
  );
};

export default AccessManagement;
