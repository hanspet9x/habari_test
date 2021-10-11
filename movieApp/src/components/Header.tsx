import React, { ReactNode } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { appStyles, colors } from './../styles/index';
import Icon from 'react-native-vector-icons/MaterialIcons';

export interface HeaderProps {
    title: string;
    action?: ReactNode;
    onBackPress?(): void;
}

const Header = ({ title, action, onBackPress }: HeaderProps) => {
    return (
        <View style={styles.appHeader}>
            <Pressable style={styles.backText} onPress={onBackPress??null}>
                {onBackPress ? <Icon size={30} color="black" name="chevron-left"/> : <></>}
                <Text style={styles.appHeaderTitle}>{title}</Text>
            </Pressable>
            {action}
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    appHeader: {
        height: 65,
        width: '100%',
        elevation: 2,
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: appStyles.layout.paddingLeft,
        paddingRight: appStyles.layout.paddingRight,
        backgroundColor: '#fefefe'
    },

    appHeaderTitle: {
        fontSize: 20,
        fontWeight: "900",
        color: colors.normal
    },

    backText: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }
})
