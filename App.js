import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Addition from './components/Addition';
import Bathroom from './components/Bathroom';
import Deck from './components/Deck';

const Tab = createMaterialTopTabNavigator();

export default function App() {

  return (
    <>
      <NavigationContainer>
        <Tab.Navigator style={{paddingTop: 25}}>
          <Tab.Screen name="Addition" component={Addition} />
          <Tab.Screen name="Bathroom" component={Bathroom} />
          <Tab.Screen name="Deck" component={Deck} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}