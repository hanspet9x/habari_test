import React, { ReactNode } from 'react'
import { StyleSheet, Text, View } from 'react-native'

type Props  = {
    title: string;
    body: ReactNode;
}
const TitleBody = (props: Props) => {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.body}>{props.body}</Text>
        </View>
    )
}

export default TitleBody

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        padding: 2,
        alignItems: 'center'
    },
    title: {
        fontSize: 12,
        marginRight: 5,
        fontWeight: 'bold',
        color: 'darkgray',
        fontStyle: 'italic'
    },

    body: {
        fontSize: 18,
        color: 'black'
    }
})
