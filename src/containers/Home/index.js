import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { headerStyle } from '../../utils';
import HomeScreen from './HomeScreen/index';

const HomeStack = createStackNavigator();

const Home = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home" screenOptions={headerStyle}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

export default Home;
