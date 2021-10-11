import React, { FC, ReactNode, useEffect, useState } from 'react'
import { Animated, Button, StyleSheet, Text, Pressable, useWindowDimensions, View } from 'react-native'

interface Props {
    title: string;
    footer: ReactNode;
}

const ElasticView: FC<Props> = (props) => {
    const {height} = useWindowDimensions();
    const [state, setState] = useState(false);
    const value = new Animated.Value(0);

    const onPress = () => {
        if (!state) {

            setState(true);
        }
    }

    useEffect(() => {
        Animated.timing(value, {
            useNativeDriver: true,
            delay: 1000,
            toValue: state ? 1 : 0
        }).start();
    }, [state])

    const onBack = () => {
        setState(false);
    }

    const animStyle = {
        transform: [
            { scaleY: value.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }) }
        ],
        opacity: value,
    }

    const wrapperStyle = {
        top: 0,
        left: 0,
        flex: 1
    }

    return (
        <Pressable onPress={onPress}>
            <View style={[styles.wrapper, state ? {position: "relative", top: 0, left: 0, height: height} : {}]}>
                <Animated.View style={styles.header}>
                    {state ? (
                        <>
                            <Text>{props.title}</Text>
                            <Button title="Back" onPress={onBack} />
                        </>
                    ): null}
                </Animated.View>
                <View style={styles.body}>
                    <View style={styles.content}>
                        {props.children}
                    </View>
                    <Animated.View style={styles.footer}>
                        {state ? props.footer : null}
                    </Animated.View>
                </View>
            </View>
        </Pressable>
    )
}

export default ElasticView

const styles = StyleSheet.create({
    wrapper: {
        
    },

    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    body: {

    },
    footer: {

    },
    content: {

    }
})
