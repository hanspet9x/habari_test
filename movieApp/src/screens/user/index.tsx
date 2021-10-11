import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import TitleBody from '../../components/titlebody';
import { useUserData } from '../../hooks/userHooks'

const UserProfile = () => {

    const [user] = useUserData();
    return (
        <View>
            <TitleBody title="User Id: " body={user.accountId} />
            <TitleBody title="User Session: " body={user.hasSession? "True" : "False"} />
        </View>
    )
}

export default UserProfile

const styles = StyleSheet.create({})
