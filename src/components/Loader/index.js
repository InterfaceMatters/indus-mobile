import React from "react";
import { ActivityIndicator, withTheme } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import colors from "../../theme/colors";

function Loader() {
    return (
        <Card style={styles.loaderContainer}>
            <View style={styles.activityContainer}>
                <ActivityIndicator
                    animating={true}
                    size={'large'}
                    color={colors.primary}
                />
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    loaderContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        padding: 10,
        right: 0,
        zIndex: 999,
    },
    activityContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default withTheme(Loader);
