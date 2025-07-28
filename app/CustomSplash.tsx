// app/CustomSplash.tsx
import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const CustomSplash = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/splash3.png')}
                style={styles.image}
                resizeMode="contain"
            />
        </View>
    );
};

export default CustomSplash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D3372C', // splash3.png arka planına benzer kırmızı ton
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width,
        height,
        resizeMode: 'contain',
    },
});