import { ActivityIndicator, View } from 'react-native';
import { Stack, useRouter, useSegments } from "expo-router";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { useEffect, useState } from 'react'

import { Colors } from '@/constants/Colors'
import { Provider } from 'react-redux'
import {store} from './store/store';

export default function RootLayout() {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>()
  const router = useRouter()
  const segments = useSegments()

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    console.log('onAuthStateChanged', user)
    setUser(user)
    if (initializing) setInitializing(false)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  }, [])

  useEffect(() => {
    if(initializing) return

    const inAuthGroup = segments[0] === '(auth)'

    if (user && !inAuthGroup) {
      router.replace('/(auth)/(drawer)/(tabs)/home')
    } else if (!user && inAuthGroup){
      router.replace('/')

    }
  }, [user, initializing])

  if (initializing)
    return (
  <View style={{
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  }}>
    <ActivityIndicator size="large" />
    </View>
    )


    return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false}}/>
      <Stack.Screen name="(auth)/(drawer)" options={{ headerShown: false}}/>
      <Stack.Screen name='register' options={{ headerShown: false}} />
      <Stack.Screen name="(modals)/new-chat" 
      options={{ 
        presentation: 'modal',
        title: 'New Chat',
        headerTransparent: true,
        headerBlurEffect: 'regular',
        headerStyle: {
          backgroundColor: Colors.dark.tabIconSelected,
        },
        headerSearchBarOptions: {
          placeholder: 'Search Name',
          hideWhenScrolling: false
        }
       }}/>
    </Stack>
  );

}


