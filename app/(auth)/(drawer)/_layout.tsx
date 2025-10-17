import { DrawerContentComponentProps, DrawerItem } from '@react-navigation/drawer'
import { Image, StatusBar, StyleSheet } from 'react-native'

import { Drawer } from 'expo-router/drawer'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import React from 'react'
import ScreenHeader from '../screenHeader'
import { router } from 'expo-router'

const ScreenDrawer = () => {
    const CustomDrawer = (props: DrawerContentComponentProps) => {
        return (
        < >
        <Image
          style={styles.proPic}
          source={require('../../../assets/images/logo.png')}
        />
            <DrawerItem
                label={'Home'}
                onPress={() => router.push('/(auth)/(drawer)/(tabs)/home')}/>
            <DrawerItem
                label={'News'}
                onPress={() => router.push('/(auth)/(drawer)/(tabs)/news')}/>
            <DrawerItem
                label={'Chat'}
                onPress={() => router.push('/(auth)/(drawer)/(tabs)/chats')}
                />
            <DrawerItem
                label={'Schedule'}
                onPress={() => router.push('/(auth)/(drawer)/(tabs)/schedule')}/>
        </>
    )

    }
    return (
        <GestureHandlerRootView style={{ flex: 1, marginTop: StatusBar.currentHeight || 0}}>
            <Drawer screenOptions={{headerShown: false}} drawerContent={(props) => <CustomDrawer {...props}/>}></Drawer>
        </GestureHandlerRootView>
    )
}


export default ScreenDrawer

const styles = StyleSheet.create({

    proPic: {
      height: 50,
      maxWidth: 50,
      resizeMode: 'contain',
    },
  });