import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import Pickers, { PickerText } from '../../components/pickers'
import ScreenWrapper from '../../components/ScreenWrapper'
import { TMovieSortProps } from '../../interfaces/movies'
import { colors } from '../../styles'
import MovieList from './movieList'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomStackParamList, RootStackParamList } from '../../navigation/interfaces'

export type MovieListProps = NativeStackScreenProps<BottomStackParamList, "List">;

const MovieListContainer = (props: MovieListProps) => {
    const {isRecommended, selectedMovieId} = props.route.params;
    const [sortBy, setSortBy] = useState<TMovieSortProps>("title");
    const [showPicker, setShowPicker] = useState(false);
    const sortData: Array<TMovieSortProps> = ["release_date", "title", "vote_average"];

    const onSort = () => {
    
        setShowPicker(true);
    }

    const sort = <Button  onPress={onSort} title="Sort"/>

    const onRenderItem = (item: TMovieSortProps) => {
        return <PickerText text={item} />
    }
    return (
        <ScreenWrapper title="Movie List" action={sort}>
            <MovieList sortBy={sortBy} isRecommended={isRecommended} selectedMovie={selectedMovieId} />
            <Pickers onItemSelected={({item})=>setSortBy(item)} 
            onRenderItem={onRenderItem} 
            show={showPicker} 
            onHide={setShowPicker} data={sortData} />
        </ScreenWrapper>
    )
}

export default MovieListContainer

const styles = StyleSheet.create({
    sort: {
        fontWeight: 'bold',
        color: colors.accent
    }
})
