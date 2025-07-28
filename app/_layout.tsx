import { Asset } from 'expo-asset';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import CustomSplash from './CustomSplash';

//SplashScreen.preventAutoHideAsync(); // Native splash ekranda kalsın

export default function RootLayout() {
  const [customSplashVisible, setCustomSplashVisible] = useState(true);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const loadAssets = useCallback(async () => {
    const images = [

      require('../assets/images/splash3.png'),
    ];
    const cacheImages = images.map((img) => Asset.fromModule(img).downloadAsync());

    try {
      await Promise.all(cacheImages);
      setAssetsLoaded(true);
    } catch (e) {
      console.warn('Asset yüklenemedi', e);
    }
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      loadAssets();
    }
  }, [fontsLoaded]);

  // Custom splash 2.5 saniye boyunca gösterilsin
  useEffect(() => {
    if (fontsLoaded && assetsLoaded) {
      const timer = setTimeout(() => {
        setCustomSplashVisible(false);
        SplashScreen.hideAsync(); // Native splash tamamen gizlenir
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [fontsLoaded, assetsLoaded]);

  if (customSplashVisible || !fontsLoaded || !assetsLoaded) {
    return <CustomSplash />; // BURADA ARTIK ZORLA GÖSTERİLİYOR
  }

  return (

    <Slot

    />

  );
}