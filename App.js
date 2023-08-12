import { Text, View } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Addition from './screens/Addition';
import Bathroom from './screens/Bathroom';
import Deck from './screens/Deck';

const Tab = createMaterialTopTabNavigator();

export default function App() {

  const navTheme = DefaultTheme;
  navTheme.colors.background = 'white';

  return (
    <>
      <NavigationContainer theme={navTheme}>
        <Tab.Navigator 
          screenOptions={{
            tabBarActiveTintColor: 'green',
            tabBarInactiveTintColor: 'gray',
            tabBarLabelStyle:{
              fontSize: 18,
              fontWeight: '600'
            }
          }}
          style={{paddingTop: 28, backgroundColor: '#fff700'}}>
          <Tab.Screen name="Addition" component={Addition} />
          <Tab.Screen name="Bathroom" component={Bathroom} />
          <Tab.Screen name="Deck" component={Deck} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}