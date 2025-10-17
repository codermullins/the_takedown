import { Image, StyleSheet, Text, View } from 'react-native'

import { AlphabetList } from 'react-native-section-alphabet-list'
import {Colors} from '@/constants/Colors'
import {defaultStyles} from './../../constants/Styles';
import { rosterList } from '@/model/db'

const NewChat = () => {
    const data = rosterList.map((contact, index) => ({
        value: `${contact.lName} ${contact.fName}`,
        name: `${contact.lName} ${contact.fName}`,
        key: `${contact.lName} ${contact.fName}-${index}`,
    }))

    return (
        <View style={{ flex: 1, paddingTop: 100, backgroundColor: Colors.lightGray}}>
        <AlphabetList 
            data={data}
            stickySectionHeadersEnabled
            indexLetterStyle={{
                color: 'blue', 
                fontSize: 12
            }}
            indexContainerStyle={{
                width: 30,
                backgroundColor: Colors.lightGray,
            }}
            renderCustomItem={(item: any) => (
                <>
                    <View style={styles.listItemContainer}>
                    <Image
                        style={styles.proPic}
                            source={require('../../assets/images/logo.png')}
                            resizeMode='cover'/>
                    <View>
                        <Text style={{ color: '#000', fontSize: 14 }}>{item.value}</Text>
                    
                    </View>
                    </View>
                    <View style={[defaultStyles.separator, {marginLeft: 50}]}></View>
                </>
            )}
            renderCustomSectionHeader={(section) => (
                <View style={styles.sectionHeader}>
                    <Text style={{ color: Colors.dark.background }}>{section.title}</Text>
                </View>
            )}
            style={{ marginLeft: 30}}

        />
        </View>
    )
}

export default NewChat

const styles = StyleSheet.create({
    listItemContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        height: 50,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    proPic: {
        height: 30,
        width: 30,
        borderRadius: 15
      },
    sectionHeader: {
        height: 30,
        backgroundColor: Colors.lightGray,
        justifyContent: 'center',
        paddingHorizontal: 15,
        marginTop: 10
    }
})