import { Image, StyleSheet, Text, View } from 'react-native';

import React from 'react';
import { useLocalSearchParams } from 'expo-router';

export const AthleteProfileScreen = () => {
  const item = useLocalSearchParams()

  return (
    
    <View style={styles.root}>
      <View style={styles.container}>
        <Image
          style={styles.proPic}
          source={require('../../../../assets/images/logo.png')}
          resizeMode='cover'/>
      <Text style={styles.athName}>{item.fName} {item.lName}</Text>
      <Text>School</Text>
      <Text>
      <Text style={{fontWeight: 'bold'}}>Weight Class: </Text>{item.weightClass}</Text>
      <Text><Text style={{fontWeight: 'bold'}}>Grade: </Text>{item.grade}</Text>
      <Text><Text style={{fontWeight: 'bold'}}>Email: </Text>{item.email}</Text>
      <Text><Text style={{fontWeight: 'bold'}}>Record: </Text>{item.win}-{item.lose}</Text>
      </View>
    </View>
  );
};

export default AthleteProfileScreen;

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 5,

  },
  container: {
    alignItems: 'center',
  },
  proPic: {
    height: 250,
    resizeMode: 'center',
  },
  athName: {
    fontWeight: 'bold',
    fontSize: 50
  }
});