import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Header, { HeaderProps } from './Header'
import { appStyles } from './../styles/index';

interface Props extends HeaderProps {
    
}


const ScreenWrapper: FC<Props> = (props) => {
    return (
        <View style={styles.wrapper}>
            <Header title={props.title} action={props.action} onBackPress={props.onBackPress} />
            <View style={styles.childrenStyle}>
                {props.children}
            </View>
        </View>
    )
}

export default ScreenWrapper

const styles = StyleSheet.create({
    wrapper :{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },

    childrenStyle: {
        flex: 1,
        marginTop: 10,
        paddingLeft: appStyles.layout.paddingLeft,
        paddingRight: appStyles.layout.paddingRight
    }
})
