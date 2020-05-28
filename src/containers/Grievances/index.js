import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { defaultHeaderStyle, headerStyle } from '../../utils';
import GrievanceList from './GrievanceList';
import GrievanceDetails from './GrievanceDetails';

const GrievanceStack = createStackNavigator();

const Grievances = () => {
  return (
    <GrievanceStack.Navigator
      initialRouteName="Grievances"
      screenOptions={headerStyle}>
      <GrievanceStack.Screen name="Grievances" component={GrievanceList} />
      <GrievanceStack.Screen
        options={defaultHeaderStyle}
        name="Grievance report"
        component={GrievanceDetails}
      />
    </GrievanceStack.Navigator>
  );
};

export default Grievances;
