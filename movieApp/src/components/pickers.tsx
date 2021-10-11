import React, { ReactNode, useState } from 'react'
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../styles'
import Header from './Header'

type ItemProps<T> = {item: T, index: number}
type Props<T> = {
    show: boolean;
    data: Array<T>;
    onItemSelected(item: ItemProps<T>): void;
    onHide(show: boolean):void;
    onRenderItem(item: T):ReactNode;
    title?: string;
}

const Pickers = <T,>(props: Props<T>) => {

    const onItemSelected = (data: ItemProps<T>) => {
        props.onItemSelected(data);
        props.onHide(false);
    }
    return (
        <Modal presentationStyle="overFullScreen" visible={props.show}>
            <Header title={props.title ?? "Choose"} />
            <View style={styles.wrapper}>
                <View >
                {
                    props.data.map((item, i: number) => <TouchableOpacity style={styles.pressable} key={i} onPress={()=>onItemSelected({index: i, item: item})}>{props.onRenderItem(item)}</TouchableOpacity>)
                }
                </View>
            </View>
        </Modal>
    )
}

export const PickerText = ({text}: {text: string}) => {
    return <Text style={styles.text}>{text}</Text>
}
export default Pickers

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        padding: 10
    },
    pressable: {
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        padding: 10
    },
    text: {
        fontSize: 25,
        color: colors.normal
    }
})
