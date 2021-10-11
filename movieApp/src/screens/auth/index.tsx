import React from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/interfaces';
import { uris } from '../../services/urls';
import { WebViewProgressEvent } from 'react-native-webview/lib/WebViewTypes';
import { postData } from './../../services/fetch';
import { authService } from '../../services/auth/index';
import { useUserData } from '../../hooks/userHooks';

type AuthViewProps = NativeStackScreenProps<RootStackParamList, "AuthApprovalView">;

const AuthApprovalView = ({ route, navigation }: AuthViewProps) => {
    const update = useUserData()[2];
    const handleProgress = async (e: WebViewProgressEvent) => {
        if (e.nativeEvent.url === uris.tokenApproved) {
            const accesstoken = await authService().getAccessToken();
            if (accesstoken) {
                update({ accountId: accesstoken?.account_id, hasSession: true },
                    { accessToken: accesstoken?.access_token, requestToken: route.params.requestToken });

                Alert.alert("Alert", "You approved Movie Inc.", [
                    {
                        text: 'ok',
                        onPress: () => navigation.goBack()
                    }
                ])
            }

        }
    }
    return (
        <WebView source={{ uri: uris.tokenApproval(route.params.requestToken) }}
            onLoadProgress={(e) => handleProgress(e)}
        />
    )
}

export default AuthApprovalView

const styles = StyleSheet.create({})
