import React, { useState } from 'react';
import { StyleSheet, ScrollView, Alert, Text, View } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EnterButton from '../components/EnterButton';
import colors from '../components/Colours';
import NotepadModal from '../components/NotepadModal';
import { useNotepads } from '../components/NotepadProvider';


const NotepadStructure = props => {
  const [notepad, setNotepad] = useState(props.route.params.notepad);
  const { setNotepads } = useNotepads();
  const [showNotepadModal, setShowNotepadModal] = useState(false);
  const headerHeight = useHeaderHeight();
  const [isEdit, setIsEdit] = useState(false);

  const formatTimeDate = ms => {
    const date = new Date(ms);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hrs = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
  
    return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`;
  };

  const deleteNotepad = async () => {
    const result = await AsyncStorage.getItem('notepads');
    let notepads = [];
    if (result !== null) notepads = JSON.parse(result);

    const newNotepads = notepads.filter(n => n.id !== notepad.id);
    setNotepads(newNotepads);
    await AsyncStorage.setItem('notepads', JSON.stringify(newNotepads));
    props.navigation.goBack();
  };
  
  const handleNotepadUpdate = async (title, desc, time) => {
    const result = await AsyncStorage.getItem('notepads');
    let notepads = [];
    if (result !== null) notepads = JSON.parse(result);

    const newNotepads = notepads.filter(n => {
      if (n.id === notepad.id) {
        n.title = title;
        n.desc = desc;
        n.isUpdated = true;
        n.time = time;

        setNotepad(n);
      }
      return n;
    });

    setNotepads(newNotepads);
    await AsyncStorage.setItem('notepads', JSON.stringify(newNotepads));
  };
  const handleOnClose = () => setShowNotepadModal(false);

  const displayDeleteMessage = () => {
    Alert.alert(
      'Delete Note?',
      'Are you sure? This note will be deleted permanently!',
      [
        {
          text: 'No',
          onPress: () => console.log('cancel delete'),
        },
        {
          text: 'Yes',
          onPress: deleteNotepad,
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const openEditNotepadModal = () => {
    setIsEdit(true);
    setShowNotepadModal(true);
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={[styles.container, { paddingTop: headerHeight }]}
      >
        <Text style={styles.datetime}>
          {notepad.isUpdated
            ? `Updated At ${formatTimeDate(notepad.time)}`
            : `Created At ${formatTimeDate(notepad.time)}`}
        </Text>
        <Text style={styles.title}>{notepad.title}</Text>
        <Text style={styles.description}>{notepad.desc}</Text>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <EnterButton
          antIconName='delete'
          style={{ backgroundColor: colors.BTN, marginBottom: 15 }}
          onPress={displayDeleteMessage}
        />
        <EnterButton antIconName='form' onPress={openEditNotepadModal} />
      </View>
      <NotepadModal
        isEdit={isEdit}
        notepad={notepad}
        onClose={handleOnClose}
        onSubmit={handleNotepadUpdate}
        visible={showNotepadModal}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  title: {
    color: colors.MAIN,
    fontSize: 35,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 19,
    opacity: 0.7,
  },
  datetime: {
    fontSize: 15,
    opacity: 0.5,
    textAlign: 'right',
  },
  buttonContainer: {
    bottom: 60,
    right: 20,
    position: 'absolute',
  },
});

export default NotepadStructure;
