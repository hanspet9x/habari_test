import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ScreenWrapper from '../../components/ScreenWrapper'
import { useUserData } from '../../hooks/userHooks';

const MovieFavorites = () => {

    const [hasSession] = useUserData();


    const sessionView = <Text>Get Access</Text>

    return (
        <ScreenWrapper title="Favourites" action={hasSession? undefined : sessionView}>
            
        </ScreenWrapper>
    )
}

export default MovieFavorites

const styles = StyleSheet.create({})
