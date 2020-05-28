import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProtocolList from './ProtocolList';
import {defaultHeaderStyle, headerStyle} from '../../utils';
import ProtocolDetails from './ProtocolDetails';

const ProtocolStack = createStackNavigator();

const Protocol = () => {
  return (
    <ProtocolStack.Navigator
      initialRouteName="Protocols"
      screenOptions={headerStyle}>
      <ProtocolStack.Screen name="Protocols" component={ProtocolList} />
      <ProtocolStack.Screen
        name="Protocol details"
        options={
            defaultHeaderStyle
        }
        component={ProtocolDetails}
      />
    </ProtocolStack.Navigator>
  );
};

export default Protocol;
