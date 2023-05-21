import { StatusBar } from 'expo-status-bar';
import { styled } from 'nativewind';
import { ImageBackground } from 'react-native';
import bgBlur from "../src/assets/bg-blur.png";
import Stripes from "../src/assets/sprites.svg";
import { BaiJamjuree_700Bold } from "@expo-google-fonts/bai-jamjuree";
import { Roboto_400Regular, Roboto_700Bold, useFonts } from "@expo-google-fonts/roboto";
import { Slot, SplashScreen, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import * as SecurityStore from "expo-secure-store"

const StyledStripes = styled(Stripes)

export const Layout = () => {
  const [isUserLogged, setIsUserLogged] = useState<null | boolean>(null)

  const [hasLoaded] = useFonts({
    BaiJamjuree_700Bold,
    Roboto_400Regular,
    Roboto_700Bold,
  })

  useEffect(() => {
    SecurityStore.getItemAsync("token")
      .then(token => {
        setIsUserLogged(!!token)
      })
  }, [])

  if (!hasLoaded)
    return <SplashScreen />

  return (
    <ImageBackground
      source={bgBlur}
      imageStyle={{ position: "absolute", left: "-100%" }}
      className='relative bg-gray-900 flex-1'
    >
      <StatusBar style="light" translucent />
      <StyledStripes className='absolute left-2' />

      <Stack screenOptions={{
        headerShown: false,
        animation: "fade",
        contentStyle: {
          backgroundColor: "transparent"
        }
      }} >
        <Stack.Screen name='index' redirect={!!isUserLogged} />
        <Stack.Screen name='memories' />
        <Stack.Screen name='new' />

      </Stack>
    </ImageBackground>
  )
}

export default Layout