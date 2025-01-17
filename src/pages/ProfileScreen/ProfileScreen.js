import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import Header from '../../components/Header';
import { logout } from "../../store/slices/userSlice";
import { fontSize, spacing } from '../../utils/dimensions';
import { deleteToken } from '../../utils/secureStore';

const ProfileScreen = ({ navigation }) => {
    const { email, name } = useSelector((state) => state.user);
    const { colors } = useTheme();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleLogout = async () => {
        setLoading(true);
        try {
            await deleteToken("userToken");
            dispatch(logout());
            navigation.reset({
              index: 0,
              routes: [{ name: "LoginScreen" }],
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 2 * spacing.xl }}
        >
            <Header />

            {/* Profile Image Container */}
            <View style={styles.profileImageContainer}>
                <Image
                    source={{
                        uri: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
                    }}
                    style={styles.profileImage}
                />
            </View>

            {/* Profile Details Container */}
            <View style={styles.nameContainer}>
                <Text style={[styles.name, { color: colors.textPrimary }]}>{name}</Text>
                <Text style={[styles.email, { color: colors.textSecondary }]}>{email}</Text>
            </View>

            {/* Logout Button */}
            <TouchableOpacity
                style={[
                    styles.logoutButton,
                    { borderColor: colors.orange },
                ]}
            >
                <Button mode="contained" onPress={handleLogout} loading={loading}>
                  {loading ? "Logging out..." : "Logout"}
                </Button>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing.md,
        backgroundColor: '#fff',
    },
    profileImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: spacing.md,
    },
    profileImage: {
        height: 140,
        width: 140,
        borderRadius: 70,
    },
    nameContainer: {
        alignItems: 'center',
        marginVertical: spacing.ls,
        marginTop: spacing.md,
    },
    name: {
        fontFamily: 'semiBold',
        fontSize: fontSize.lg,
    },
    email: {
        fontFamily: 'regular',
        fontSize: fontSize.md,
    },
    logoutButton: {
        marginTop: spacing.lg
    }
});
