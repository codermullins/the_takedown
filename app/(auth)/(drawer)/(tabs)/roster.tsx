import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { FC, useState } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';
import { rosterList } from '../../../../model/db';
import { router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

interface ItemProps {
  fName: string;
  lName: string;
  weightClass: number
  grade: string;
}

const Item: FC<ItemProps> = ({ fName, lName, weightClass, grade }) => (
  
  <View style={styles.item}>
    <View style={{position: 'absolute'}}>
      <Image
          style={styles.proPic}
          source={require('../../../../assets/images/logo.png')}
          resizeMode='cover'/></View>
    <Text style={styles.name}>{lName}, {fName}</Text>
    <Text style={styles.weightClass}>{weightClass}</Text>
    <View>
      <Text style={styles.grade}>{grade}</Text>
    </View>
  </View>
);


const RosterScreen: FC = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('')
  const [filterData, setFilteredData] = useState(rosterList)
 

  const onAddPressed = (): void => {
    // navigation.navigate('AddScreen');
  };

  const searchFunction = (text: string): void => {
    setSearchText(text)

    const filtered: any[] = rosterList.filter(item => 
      item.lName.toLowerCase().includes(text.toLowerCase())
    )

    setFilteredData(filtered)
  }
  

  return (
    <SafeAreaView style={styles.container}>
        <Text style={{fontFamily: 'bold', fontSize: 30, marginTop: -50, alignSelf: 'center'}}>
          Roster
        </Text>
        <TextInput style={styles.searchInput}
        placeholder='Search'
        value={searchText}
        onChangeText={searchFunction}/>
      <FlatList
        data={filterData.sort((a,b) => a.weightClass < b.weightClass ? -1 : a.weightClass > b.weightClass ? 1: 0)}
        keyExtractor={(item, index) => '_listtItem_' + index}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              const {id, lName} = item
              router.push({ pathname: `/athleteProfileScreen`, params: {...item}})
            }}>
            <Item
              lName={item.lName}
              fName={item.fName}
              weightClass={item.weightClass}
              grade={item.grade}
            />
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: 'red',
          alignItems: 'center',
          justifyContent: 'center',
          width: 50,
          alignSelf: 'flex-end',
          right: 20,
          height: 50,
          backgroundColor: 'red',
          borderRadius: 100,
          bottom: 5,
        }}
        onPress={onAddPressed}>
        <Text style={{ color: 'white' }}>ADD</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default RosterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: 'grey',
    padding: 25,
    marginVertical: 8,
    marginHorizontal: 16,
    alignContent: 'space-between',
    borderRadius: 10,
  },
  name: {
    fontSize: 32,
    position: 'absolute',
    marginLeft: 60,
  },
  weightClass: {
    fontSize: 32,
    fontWeight: 'bold',
    position: 'absolute',
    alignSelf: 'flex-end',
    padding: 10,
  },
  grade: {
    fontSize: 20,
    bottom: -15,
    marginLeft: -10,
    marginTop: 5
  },
  proPic: {
    height: 50,
    maxWidth: 50,
    resizeMode: 'contain',
  },
  searchInput: {
    alignSelf: 'center',
    width: '80%',
    borderWidth: 0.5,
    borderColor: 'grey',
    marginBottom: 10,
    paddingVertical: 7,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
});