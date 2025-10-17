import { FlatList, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'

import ChatRow from '@/components/ChatRow';
import React from 'react'
import { Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import chats from '@/model/chats.json'
import {defaultStyles} from '@/constants/Styles';

function chat() {
  return (
    <View>
      <ScrollView contentInsetAdjustmentBehavior='automatic' contentContainerStyle={{ paddingBottom: 40}}>
        <FlatList 
        data={chats} 
        scrollEnabled={false}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={[defaultStyles.separator, { marginLeft: 90}]}/> }
        renderItem={({ item }) => <ChatRow {...item} />}
        />
      </ScrollView>
    </View>
  )

}

export default chat


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 500,
  },

});