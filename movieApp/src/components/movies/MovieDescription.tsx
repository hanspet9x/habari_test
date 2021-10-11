import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, ScrollView, Button } from 'react-native'
import { TMovieCast, TMovieCasts, TMovieResult, TMoviesGenreCast } from '../../interfaces/movies'
import { getMovieListApi } from '../../services/movie.list'
import { colors } from '../../styles'
import TitleBody from '../titlebody'
import MovieCard from './MovieCard'
import { appStyles } from './../../styles/index';
import { appNavigate } from '../../navigation/action'
import { TRecommended } from '../../navigation/interfaces'


const MovieDescription = ({ data }: { data: TMovieResult }) => {


    const [genresCasts, setGenresCasts] = useState<TMoviesGenreCast>({ genres: [], casts: [] })

    useEffect(() => {
        const getGenre = async () => {
            const genresCasts = await getMovieListApi().getMovieGenreAndCast(data.id);
            if (genresCasts?.casts && genresCasts.genres) {
                setGenresCasts(genresCasts);
            }
        }
        getGenre();
    }, []);

    const RenderCasts = ({ data }: { data: TMovieCast }) => (
        <View style={styles.casts}>
            <Text style={styles.realName}>{data.name} --- </Text>
            <Text style={styles.castName}>{data.character}</Text>
        </View>
    )

    const handleClick = () => {
        appNavigate("RecommendedMovieView", { isRecommended: true, selectedMovieId: data.id } as TRecommended)
    }

    return (
      
            <View style={styles.wrapper}>

                <FlatList ListHeaderComponent={() => (
                    <>
                        <MovieCard data={data} style={styles.movieCard} />
                        <TitleBody title="Rating:" body={new String(data.vote_average).replace(".", "") + "%"} />
                        <TitleBody title="Year of release:" body={new Date(data.release_date).getFullYear()} />
                        <TitleBody title="Genres:" body={genresCasts.genres?.map((genre, i) => <Text style={styles.genre} key={i}>{genre.name + " "}</Text>)} />
                        <Text>Overview:</Text>
                        <Text style={styles.description}>{data.overview}
                            <Text style={{ color: colors.link }} onPress={handleClick}> View similar movies (recommended)</Text>
                        </Text>
                        <Text style={appStyles.title}>Casts:</Text>
                    </>
                )} data={genresCasts.casts} renderItem={({ item }) => <RenderCasts data={item} />} keyExtractor={(item, index) => item.name + index} />
            </View>
    )
}

export default MovieDescription

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'white',
        borderRadius: 6,
        padding: 10,
        marginBottom: 0
    },
    movieCard: {
        borderWidth: 0,
        backgroundColor: 'white'
    },
    description: {
        color: colors.normal
    },
    genre: {
        padding: 2,
        color: '#aaaacc',
    },

    realName: {
        color: colors.normal
    },

    castName: {
        color: colors.accent
    },

    casts: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10

    }

})
