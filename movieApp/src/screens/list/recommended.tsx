import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MovieListContainer from '.'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/interfaces';

type Props = NativeStackScreenProps<RootStackParamList, "RecommendedMovieView">;

const RecommendedMovies = (props: Props) => {
    return (
        <View></View>
    )
}

export default RecommendedMovies

const styles = StyleSheet.create({

})
