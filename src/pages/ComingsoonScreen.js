import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import Button from '../components/Button';
import Header from '../components/Header';
import { spacing } from '../utils/dimensions';

const ComingsoonScreen = ({ navigation }) => {
    const { colors } = useTheme();

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={[
                styles.centerContent,
                { paddingBottom: 2 * spacing.xl },
            ]}
        >
            <Header />

            {/* Coming Soon Image Container */}
            <View style={styles.comingSoonImageContainer}>
                <Image
                    source={require("../../assets/items/coming-soon.png")}
                    style={styles.comingSoonImage}
                />
            </View>

            {/* Back Button */}
            <TouchableOpacity
                style={[
                    styles.backButton,
                    { borderColor: colors.orange },
                ]}
            >
                <Button mode="contained" onPress={() => navigation.goBack()} >
                    Back
                </Button>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default ComingsoonScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing.md,
        backgroundColor: '#fff',
    },
    centerContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    comingSoonImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: spacing.md,
    },
    comingSoonImage: {
        height: 240,
        width: 240,
    },
    backButton: {
        width: '100%',
        marginTop: spacing.md,
    },
});
