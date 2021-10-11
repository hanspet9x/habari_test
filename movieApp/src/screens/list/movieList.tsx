import React, { useEffect, useState } from 'react'
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MovieCard from '../../components/movies/MovieCard';
import { TAction } from '../../interfaces/app';
import { TMovieResult, TMoviesResponse, TMovieSortProps, TMovies } from '../../interfaces/movies'
import { useAppDispatch } from '../../store/store';
import { sortArrayOfObjects } from './../../utils/index';
import { useNavigation } from '@react-navigation/core';
import { MovieListProps } from '.';
import { appNavigate } from '../../navigation/action';
import { routes } from '../../navigation/routes';
import { getMovieListApi } from '../../services/movie.list';

type TMovieList = {
    sortBy: TMovieSortProps;
    isRecommended: boolean;
    selectedMovie: number;
}
const MovieList = (props: TMovieList) => {
    const dispatch = useAppDispatch<TAction>();
    
    const [list, setList] = useState<TMovies>({} as TMovies);

    useEffect(() => {
        const list = async () => {
            try {

                let lists: TMoviesResponse | null;

                if (props.isRecommended) {
                    lists = await getMovieListApi().getRecommendedMovies(props.selectedMovie);
                }else {
                    lists = await getMovieListApi().getPlayingMovies(1);
                }

                if (lists) {
                    setList(sortArrayOfObjects(lists.results, props.sortBy, "string"))
                } else {
                    Alert.alert("Error", "An Error as occured.");
                }
            } catch (error) {
                console.error(error);
            }
        }

        list();
    }, []);

    useEffect (() => {
        if(list.length) {
            const sorted = sortArrayOfObjects(list, props.sortBy, props.sortBy === "title" ? "string" : "any")
            setList((sort) => sorted)
        }
    }, [props.sortBy])
    const test = (item: TMovieResult) => {
        
        <Text>{item.release_date}</Text>
    }


    const onMovieSelected = (data: TMovieResult) => {
        dispatch({type: "selectedMovie", payload: {selectedMovie: data}});
       appNavigate("ModalSelectedMovie")
    }

    return (
        <FlatList removeClippedSubviews={true} data={list} renderItem={({item}) => (
            <TouchableOpacity onPress={()=>onMovieSelected(item)}>
                <MovieCard data={item}  />
            </TouchableOpacity>
        )}  extraData={list}/>
    );
}

export default MovieList

const styles = StyleSheet.create({})
