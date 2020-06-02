import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { headerStyle } from '../../utils';
import EmployeeList from './EmployeeList';

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
    </AccessManagementStack.Navigator>
  );
};

export default AccessManagement;
