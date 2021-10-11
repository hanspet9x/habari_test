import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MovieListContainer from './../screens/list/index';
import MovieFavorites from './../screens/favourites/index';
import { routes } from './routes';
import { BottomStackParamList } from './interfaces';
import UserProfile from '../screens/user';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BottomStackViews = () => {
    const Tab = createBottomTabNavigator<BottomStackParamList>();
    return (
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name="List" component={MovieListContainer} initialParams = {
                {isRecommended: false, selectedMovieId: 0}
            } options={{ tabBarLabel: 'List', }} />
            <Tab.Screen name="Favorites" component={MovieFavorites} options={{ tabBarLabel: 'Favourites' }} />
            <Tab.Screen name="User" component={UserProfile} options={{ tabBarLabel: 'User' }} />
        </Tab.Navigator>
    )
}

export default BottomStackViews

const styles = StyleSheet.create({})
