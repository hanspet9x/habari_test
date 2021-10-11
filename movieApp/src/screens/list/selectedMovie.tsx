import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux';
import MovieDescription from '../../components/movies/MovieDescription';
import ScreenWrapper from '../../components/ScreenWrapper';
import { useUserData } from '../../hooks/userHooks';
import { RootStackParamList } from '../../navigation/interfaces'
import { favoriteService } from '../../services/favorites';
import { IGlobalState } from './../../interfaces/app';

type ModalSelectedMovieProps = NativeStackScreenProps<RootStackParamList, "ModalSelectedMovie">;

const SelectedMovie = ({ navigation }: ModalSelectedMovieProps) => {
    const { selectedMovie } = useSelector((state: IGlobalState) => state);
    const [user, auth] = useUserData();

    const addToFavourite = async () => {
        if (!user.hasSession) {

            Alert.alert("Alert", "Kindly authenticate before process", [
                {
                    text: "Authenticate",
                    onPress: auth
                },
                {
                    text: "Close"
                }
            ])
        } else {
            if (selectedMovie?.id) {
                const response = await favoriteService().addToFavourites(user.accountId, selectedMovie?.id, "movie");
                console.log(response);
                if (response) {
                    Alert.alert("Alert", response.status_message);
                } else {
                    Alert.alert("Error", "Try again.");
                }
            } else {
                Alert.alert("Error", "Media Id not found.");
            }
        }
    }

    return (
        <ScreenWrapper title={selectedMovie?.title ?? "Movie Title"} onBackPress={() => navigation.navigate("Home")}
            action={<Button title="Add to favourite" onPress={addToFavourite} />}>
            {selectedMovie ? <MovieDescription data={selectedMovie} /> : <></>}
        </ScreenWrapper>
    )
}

export default SelectedMovie

const styles = StyleSheet.create({})
