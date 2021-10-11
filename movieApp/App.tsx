/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { View, Text } from 'react-native'
import { Provider } from 'react-redux';
import StackScreens from './src/navigation';
import { navigationRef } from './src/navigation/action';
import { store } from './src/store/store';

const App = () => {

 
  return (
    <NavigationContainer ref={navigationRef}>
      <Provider store={store}>
        <StackScreens />
      </Provider>
    </NavigationContainer>
  )
}

export default App
