import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TMovieResult } from '../../interfaces/movies'
import { colors } from '../../styles';
import { uris } from '../../services/urls';
import TitleBody from '../titlebody';
import ElasticView from '../ElasticView';

type Props = {
    data: TMovieResult;
    style?: {}
}
const MovieCard = (props: Props) => {

    const [imagePath, setimagePath] = useState(require('./../../assets/img/imdb.png'));

    useEffect(() => {
        const loadImage = async () => {
            try {
                const status = await Image.prefetch(uris.postalImage(props.data.poster_path));
                if (status) {
                    setimagePath({ uri: uris.postalImage(props.data.poster_path) });
                }
            } catch (error) {

            }
        }
        loadImage();
    }, []);


    return (
        <View style={[styles.wrapper, props.style ?? {}]}>
            <Image source={imagePath} style={styles.image} resizeMode="cover" resizeMethod="resize" />
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>{props.data.title}</Text>
                <TitleBody title="Release Date:" body={props.data.release_date} />
                <TitleBody title="Vote Average:" body={props.data.vote_average} />

            </View>
        </View>
    )
}

export default MovieCard

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 20,
        backgroundColor: 'lightgray',
        borderWidth: 1,
        borderRadius: 6
    },

    titleWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: 5
    },

    title: {
        fontSize: 18,
        color: colors.normal,
        fontWeight: 'bold'
    },

    image: {
        width: '100%',
        height: 300
    },
    date_vote: {
        display: 'flex',

    }
})
