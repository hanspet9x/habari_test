
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AuthApprovalView from '../screens/auth';
import MovieListContainer from '../screens/list';
import RecommendedMovies from '../screens/list/recommended';
import SelectedMovie from '../screens/list/selectedMovie';
import BottomStackViews from './bottomStackViews';
import { RootStackParamList } from './interfaces';
import { routes } from './routes';

const StackScreens = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        <Stack.Navigator initialRouteName={"Home"} screenOptions={{ headerShown: false }}>
            <Stack.Group>
                <Stack.Screen name={"Home"} component={BottomStackViews} />
            </Stack.Group>
            <Stack.Group screenOptions={{presentation: 'modal'}}>
                <Stack.Screen name={"ModalSelectedMovie"} component={SelectedMovie} />
                <Stack.Screen name={"AuthApprovalView"} component={AuthApprovalView} />
                <Stack.Screen name={"RecommendedMovieView"} component={MovieListContainer} />
                
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default StackScreens

const styles = StyleSheet.create({});
