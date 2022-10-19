import React, { useState, useEffect } from 'react';
import {SafeAreaView, StyleSheet, View, Text, TouchableWithoutFeedback, FlatList, StatusBar, Keyboard, } from 'react-native';
import colors from '../components/Colours';
import EnterButton from '../components/EnterButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotepads } from '../components/NotepadProvider';
import Notepad from '../components/Notepad';
import NotepadMissing from '../components/NotepadMissing';
import NotepadModal from '../components/NotepadModal';
import SearchField from '../components/SearchField';

const MainPage = ({ navigation, user }) => {
  const [address, setAddress] = useState('');
  const [resultMissing, setResultMissing] = useState(false);
  const [searchInquiry, setSearchInquiry] = useState('');
  const [modalEvident, setModalEvident] = useState(false);

  const { notepads, setNotepads, findNotepads } = useNotepads();

  const openNotepad = notepad => {
    navigation.navigate('NotepadStructure', { notepad });
  };

  const findAddress = () => {
    const hrs = new Date().getHours();
    if (hrs === 0 || hrs < 12) return setAddress('Morning');
    if (hrs === 1 || hrs < 17) return setAddress('Afternoon');
    setAddress('Evening');
  };

  useEffect(() => {
    findAddress();
  }, []);

  const handleOnSubmission = async (title, desc) => {
    const notepad = { id: Date.now(), title, desc, time: Date.now() };
    const updatedNotepads = [...notepads, notepad];
    setNotepads(updatedNotepads);
    await AsyncStorage.setItem('notepads', JSON.stringify(updatedNotepads));
  };

  const reverseNotepads = alterData(notepads);

  const handleOnNotepadSearch = async text => {
    setSearchInquiry(text);
    if (!text.trim()) {
      setSearchInquiry('');
      setResultMissing(false);
      return await findNotepads();
    }
    const filteredNotepads = notepads.filter(notepad => {
      if (notepad.title.toLowerCase().includes(text.toLowerCase())) {
        return notepad;
      }
    });

    if (filteredNotepads.length) {
      setNotepads([...filteredNotepads]);
    } else {
      setResultMissing(true);
    }
  };

  const handleOnErase = async () => {
    setSearchInquiry('');
    setResultMissing(false);
    await findNotepads();
  };

  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor={colors.LIGHT} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.header}>{`Good ${address} ${user.name}`}</Text>
          {notepads.length ? (
            <SearchField
              value={searchInquiry}
              onChangeText={handleOnNotepadSearch}
              containerStyle={{ marginVertical: 20 }}
              onClear={handleOnErase}
            />
          ) : null}

          {resultMissing ? (
            <NotepadMissing />
          ) : (
            <FlatList
              data={reverseNotepads}
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: 'space-between',
                marginBottom: 17,
              }}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <Notepad onPress={() => openNotepad(item)} item={item} />
              )}
            />
          )}

          {!notepads.length ? (
            <View
              style={[
                StyleSheet.absoluteFillObject,
                styles.emptyHeaderContainer,
              ]}
            >
              <Text style={styles.emptyHeader}>Add your notes</Text>
            </View>
          ) : null}
        </SafeAreaView>
      </TouchableWithoutFeedback>
      <EnterButton
        onPress={() => setModalEvident(true)}
        antIconName='plussquare'
        style={styles.addButton}
      />
      <NotepadModal
        visible={modalEvident}
        onClose={() => setModalEvident(false)}
        onSubmit={handleOnSubmission}
      />
    </>
  );
};

const alterData = data => {
  return data.sort((a, b) => {
    const aInt = parseInt(a.time);
    const bInt = parseInt(b.time);
    if (aInt < bInt) return 1;
    if (aInt == bInt) return 0;
    if (aInt > bInt) return -1;
  });
};

const styles = StyleSheet.create({
    header: {
      marginLeft: 10,
      fontSize: 35,
      fontWeight: 'bold',
    },
    container: {
      flex: 1,
      zIndex: 1,
      paddingHorizontal: 25,
    },
    addButton: {
      position: 'absolute',
      bottom: 55,
      right: 20,
      zIndex: 1,
    },
    emptyHeader: {
      fontWeight: 'bold',
      fontSize: 35,
      opacity: 0.35,
      textTransform: 'uppercase',
    },
    emptyHeaderContainer: {
      flex: 1,
      zIndex: -1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  
  export default MainPage;
  